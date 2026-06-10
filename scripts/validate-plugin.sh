#!/usr/bin/env bash
# Structural validation for the capd plugin.
# Runs locally (./scripts/validate-plugin.sh) and in CI. python3 stdlib only.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

python3 - "$ROOT" <<'PY'
import json, re, sys
from pathlib import Path

root = Path(sys.argv[1])
errors = []
def err(msg): errors.append(msg)

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
    name = data.get("name", "")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name):
        err(f"plugin.json: name '{name}' is not kebab-case")
    if not re.fullmatch(r"\d+\.\d+\.\d+", data.get("version", "")):
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
    # Must be exactly skills/<name>/SKILL.md — one level deep.
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
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", dir_name):
        err(f"{sf.relative_to(root)}: skill directory '{dir_name}' is not kebab-case")
    if not fm.get("description"):
        err(f"{sf.relative_to(root)}: frontmatter description is empty or missing")

# --- internal doc links --------------------------------------------------
link_re = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
docs = [root / "README.md", root / "CLAUDE.md"]
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

# --- report --------------------------------------------------------------
if errors:
    print(f"FAIL: {len(errors)} problem(s) found:")
    for e in errors:
        print(f"  - {e}")
    sys.exit(1)
print(f"OK: manifest valid, {len(skill_files)} skill(s) valid, doc links resolve.")
PY
