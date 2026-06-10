#!/usr/bin/env bash
# Structural validation for the capd plugin.
# Runs locally (./scripts/validate-plugin.sh) and in CI. python3 stdlib only.
#
# Optional version-bump check: set CAPD_BASE_REF to a git ref (e.g. origin/main)
# and the script additionally fails if .claude-plugin/plugin.json version was not
# increased versus that ref. Used by the CI 'validate' job on pull requests.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Read the manifest as it exists on the base ref (empty if unset/absent).
BASE_MANIFEST=""
if [[ -n "${CAPD_BASE_REF:-}" ]]; then
    BASE_MANIFEST="$(git -C "$ROOT" show "${CAPD_BASE_REF}:.claude-plugin/plugin.json" 2>/dev/null || true)"
fi

CAPD_BASE_MANIFEST="$BASE_MANIFEST" python3 - "$ROOT" <<'PY'
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

skills_dir = root / "skills"
skill_files = list(skills_dir.rglob("SKILL.md")) if skills_dir.exists() else []
if not skill_files:
    err("no skills found under skills/")

for sf in skill_files:
    rel = sf.relative_to(skills_dir)
    if len(rel.parts) != 2:
        err(f"{sf.relative_to(root)}: skills must be one level deep "
            f"(skills/<name>/SKILL.md); nested skills are not discovered")
        continue
    dir_name = rel.parts[0]
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
base_raw = os.environ.get("CAPD_BASE_MANIFEST", "").strip()
if base_raw and data is not None:
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
