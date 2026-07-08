#!/usr/bin/env bash
# Structural validation for the cape plugin.
# Runs locally (./scripts/validate-plugin.sh) and in CI. python3 stdlib only.
#
# Optional version-bump check: set CAPE_BASE_REF to a git ref (e.g. origin/main)
# and the script additionally fails if .claude-plugin/plugin.json version was not
# increased versus that ref — but only when the diff touches plugin-shipping files
# (skills_source/, commands/, scripts/, .claude-plugin/, statusline/, settings.json).
# Pure working material (requirements/), contributor docs, and CI do not force a bump.
# Used by the CI 'validate' job on pull requests.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Read the manifest as it exists on the base ref (empty if unset/absent).
BASE_MANIFEST=""
if [[ -n "${CAPE_BASE_REF:-}" ]]; then
    BASE_MANIFEST="$(git -C "$ROOT" show "${CAPE_BASE_REF}:.claude-plugin/plugin.json" 2>/dev/null || true)"
fi

# Whether the diff vs base ref touches plugin-shipping files (skills_source/,
# commands/, scripts/, .claude-plugin/, statusline/, settings.json). Only these
# force a version bump; pure working material (requirements/), contributor docs,
# and CI do not. Defaults to "changed" (require bump) when detection is uncertain,
# so a real plugin change is never silently shipped without a bump.
PLUGIN_CHANGED=1
if [[ -n "${CAPE_BASE_REF:-}" ]]; then
    DIFF="$(git -C "$ROOT" diff --name-only "${CAPE_BASE_REF}..HEAD" 2>/dev/null || true)"
    if [[ -n "$DIFF" ]] && ! grep -E '^(skills_source/|commands/|scripts/|\.claude-plugin/|statusline/|settings\.json$)' >/dev/null <<<"$DIFF"; then
        PLUGIN_CHANGED=0
    fi
fi

CAPE_BASE_MANIFEST="$BASE_MANIFEST" CAPE_PLUGIN_CHANGED="$PLUGIN_CHANGED" python3 - "$ROOT" <<'PY'
import json, os, re, sys
from pathlib import Path

root = Path(sys.argv[1])
errors = []
def err(msg): errors.append(msg)

SEMVER = re.compile(r"\d+\.\d+\.\d+")
KEBAB = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")

# --- plugin.json ---------------------------------------------------------
manifest = root / ".claude-plugin" / "plugin.json"
data = None
if not manifest.exists():
    err(".claude-plugin/plugin.json is missing")
else:
    try:
        data = json.loads(manifest.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        err(f"plugin.json is not valid JSON: {e}")

if data is not None:
    if not KEBAB.fullmatch(data.get("name", "")):
        err(f"plugin.json: name '{data.get('name')}' is not kebab-case")
    if not SEMVER.fullmatch(data.get("version", "")):
        err(f"plugin.json: version '{data.get('version')}' is not MAJOR.MINOR.PATCH")
    if not data.get("description"):
        err("plugin.json: description is empty or missing")

# --- skills --------------------------------------------------------------
def parse_frontmatter(text):
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return None
    fm = {}
    for line in lines[1:]:
        if line.strip() == "---":
            return fm
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    return None  # no closing delimiter

# Skills live under skills_source/, grouped into bucket subfolders. Each bucket is a
# path in the manifest's skills[] array, which Claude Code scans one level deep for
# <name>/SKILL.md; the skill loads as cape:<name>. See CLAUDE.md. The bucket names
# aren't fixed here: a skill is any dir with a SKILL.md, and the name is that dir's
# basename. That basename must be unique across buckets (the bucket is not part of the
# name).
skills_dir = root / "skills_source"
skill_files = list(skills_dir.rglob("SKILL.md")) if skills_dir.exists() else []
if not skill_files:
    err("no skills found under skills_source/")

seen_names = {}
for sf in skill_files:
    rel = sf.relative_to(skills_dir)
    if len(rel.parts) < 2:
        err(f"{sf.relative_to(root)}: a skill needs its own directory "
            f"(skills_source/.../<name>/SKILL.md)")
        continue
    dir_name = rel.parts[-2]          # the skill dir, whatever bucket depth it sits at
    bucket = "/".join(rel.parts[:-2]) or "(root)"
    if dir_name in seen_names:
        err(f"{sf.relative_to(root)}: duplicate skill name '{dir_name}' (also under "
            f"'{seen_names[dir_name]}') — skill names must be unique across buckets")
    seen_names[dir_name] = bucket
    fm = parse_frontmatter(sf.read_text(encoding="utf-8"))
    if fm is None:
        err(f"{sf.relative_to(root)}: missing or malformed YAML frontmatter")
        continue
    if fm.get("name", "") != dir_name:
        err(f"{sf.relative_to(root)}: frontmatter name '{fm.get('name')}' "
            f"!= directory '{dir_name}'")
    if not KEBAB.fullmatch(dir_name):
        err(f"{sf.relative_to(root)}: skill directory '{dir_name}' is not kebab-case")
    if not fm.get("description"):
        err(f"{sf.relative_to(root)}: frontmatter description is empty or missing")

# --- internal doc links --------------------------------------------------
link_re = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
docs = [root / "README.md", root / "CLAUDE.md", root / "CONTRIBUTING.md"]
docs += list((root / ".claude" / "rules").glob("*.md"))
for doc in docs:
    if not doc.exists():
        continue
    for target in link_re.findall(doc.read_text(encoding="utf-8")):
        t = target.split("#", 1)[0].strip()
        if not t or t.startswith(("http://", "https://", "mailto:")):
            continue
        if not (doc.parent / t).resolve().exists():
            err(f"{doc.relative_to(root)}: broken relative link -> {target}")

# --- version bump (only when a base manifest is provided) ----------------
base_raw = os.environ.get("CAPE_BASE_MANIFEST", "").strip()
plugin_changed = os.environ.get("CAPE_PLUGIN_CHANGED", "1") == "1"
if base_raw and data is not None and not plugin_changed:
    print("  ok: no plugin-shipping files changed (skills/, .claude-plugin/, "
          "statusline/, settings.json); version bump not required")
elif base_raw and data is not None:
    def ver(v):
        m = SEMVER.fullmatch(v or "")
        return tuple(int(x) for x in v.split(".")) if m else None
    try:
        base_v = ver(json.loads(base_raw).get("version", ""))
    except json.JSONDecodeError:
        base_v = None
    head_v = ver(data.get("version", ""))
    if base_v and head_v and head_v <= base_v:
        err(f"version not increased: base={'.'.join(map(str, base_v))} "
            f"head={'.'.join(map(str, head_v))} — bump it (see "
            f".claude/rules/plugin-development.md)")
    elif base_v and head_v:
        print(f"  ok: version bumped {'.'.join(map(str, base_v))} -> "
              f"{'.'.join(map(str, head_v))}")

# --- report --------------------------------------------------------------
if errors:
    print(f"FAIL: {len(errors)} problem(s) found:")
    for e in errors:
        print(f"  - {e}")
    sys.exit(1)
print(f"OK: manifest valid, {len(skill_files)} skill(s) valid, doc links resolve.")
PY
