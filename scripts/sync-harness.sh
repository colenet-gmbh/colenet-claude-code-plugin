#!/usr/bin/env bash
# Vendor the cape harness skills into a repo's .claude/skills/ so they are callable
# with flat, un-prefixed names (/skill-name) instead of the plugin form /cape:skill.
#
# Self-locating: finds its own source in the plugin cache by glob, so it works
# identically from a plugin command, a vendored project skill, or a plain shell — it
# never relies on ${CLAUDE_PLUGIN_ROOT} being expanded in a Markdown body.
#
# Usage:  sync-harness.sh [PROJECT_DIR]     (default: $PWD)
# Dev:    CAPE_HARNESS_SRC=/path/to/skills sync-harness.sh [PROJECT_DIR]
set -euo pipefail

PLUGIN_NAME="cape"
PROJECT_DIR="${1:-$PWD}"

# 1. Locate the source skills dir.
#    Skills ship under skills_source/ (NOT skills/) so the plugin loader never registers
#    them as active plugin skills — they come alive only once vendored into a repo's
#    .claude/skills/ as flat project skills. Cache layout (verified on macOS):
#    ~/.claude/plugins/cache/<marketplace>/<plugin>/<version>/skills_source/
#    CAPE_HARNESS_SRC overrides for dev mode (e.g. running against --plugin-dir).
SRC="${CAPE_HARNESS_SRC:-}"
if [ -z "$SRC" ]; then
  SRC="$(find "$HOME/.claude/plugins/cache" -type d -path "*/${PLUGIN_NAME}/*/skills_source" \
          2>/dev/null | sort -V | tail -1)"
fi
if [ -z "$SRC" ] || [ ! -d "$SRC" ]; then
  echo "ERROR: could not locate ${PLUGIN_NAME} skills in the plugin cache." >&2
  echo "       Is the plugin installed? For dev mode, set CAPE_HARNESS_SRC=/path/to/skills." >&2
  exit 1
fi

if [ ! -d "$PROJECT_DIR" ]; then
  echo "ERROR: project dir does not exist: $PROJECT_DIR" >&2
  exit 1
fi
if ! git -C "$PROJECT_DIR" rev-parse --git-dir >/dev/null 2>&1; then
  echo "WARNING: $PROJECT_DIR is not a git repo — the sync won't be reviewable as a diff." >&2
fi

TARGET="$PROJECT_DIR/.claude/skills"
MARKER="$TARGET/.harness-version"
mkdir -p "$TARGET"

# 2. Enumerate the upstream skills (a skill = a directory containing SKILL.md), at ANY
#    depth. skills_source/ groups skills into bucket subfolders; the buckets are flattened
#    away on vendor so the vendored .claude/skills/ stays one level deep — the only layout
#    Claude Code discovers. Bucket names aren't referenced here; any subfolder works.
names=()
srcs=()
while IFS= read -r skill_md; do
  dir="$(dirname "$skill_md")"
  names+=("$(basename "$dir")")
  srcs+=("$dir")
done < <(find "$SRC" -name SKILL.md | sort)
if [ "${#names[@]}" -eq 0 ]; then
  echo "ERROR: no skills (SKILL.md) found under $SRC" >&2
  exit 1
fi
# Flat vendoring needs unique skill names across buckets.
dups="$(printf '%s\n' "${names[@]}" | sort | uniq -d)"
if [ -n "$dups" ]; then
  echo "ERROR: duplicate skill name(s) across buckets — flat vendoring needs unique names:" >&2
  echo "$dups" >&2
  exit 1
fi
current=("${names[@]}")

# 3. Read what a previous sync placed here, so we can scope cleanup to harness skills
#    only — never touch project skills the developer authored in .claude/skills/.
prev_version=""
prev_skills=""
if [ -f "$MARKER" ]; then
  prev_version="$(sed -n 's/^version=//p' "$MARKER")"
  prev_skills="$(sed -n 's/^skills=//p' "$MARKER")"
fi

# 4. Copy each skill folder flat (mirror per-skill so upstream-removed *files* within a
#    skill disappear, without a global --delete that would wipe unrelated skills). Source
#    is the skill's bucket path; target drops the bucket.
for i in "${!names[@]}"; do
  rsync -a --delete "${srcs[$i]}/" "$TARGET/${names[$i]}/"
done

# 5. Remove skills that this harness placed before but upstream no longer ships.
for old in $prev_skills; do
  keep=""
  for name in "${current[@]}"; do [ "$old" = "$name" ] && keep=1 && break; done
  if [ -z "$keep" ] && [ -d "$TARGET/$old" ]; then
    rm -rf "${TARGET:?}/$old"
    echo "removed (dropped upstream): $old"
  fi
done

# 6. Record what we synced (version + skill list) for the next run's diff & cleanup.
VERSION="$(basename "$(dirname "$SRC")")"
{
  echo "plugin=$PLUGIN_NAME"
  echo "version=$VERSION"
  echo "skills=${current[*]}"
} > "$MARKER"

if [ -n "$prev_version" ] && [ "$prev_version" != "$VERSION" ]; then
  echo "Synced ${PLUGIN_NAME}: ${prev_version} -> ${VERSION} (${#current[@]} skills) into ${TARGET}"
elif [ -n "$prev_version" ]; then
  echo "Already at ${PLUGIN_NAME}@${VERSION} (${#current[@]} skills); re-synced ${TARGET}"
else
  echo "Synced ${PLUGIN_NAME}@${VERSION} (${#current[@]} skills) into ${TARGET}"
fi
echo "Review the git diff in .claude/skills/ and commit it."
