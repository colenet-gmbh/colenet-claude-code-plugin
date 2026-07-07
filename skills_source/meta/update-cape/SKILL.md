---
name: update-cape
description: Update the vendored cape harness skills in this repo to the newest installed plugin version. Use when the user wants to pull the latest cape skills, mentions "update cape", "cape aktualisieren", "harness updaten", or after upgrading the cape plugin.
disable-model-invocation: true
---

# Update cape

Re-sync this repo's vendored harness skills (`.claude/skills/`) to the newest cape plugin
version installed in the plugin cache. Manual and explicit by design — no automatic sync —
so every update lands as a reviewable git diff.

Run the same self-locating sync script the plugin ships. It finds its own source in the
cache, so this skill needs no knowledge of the plugin path:

```bash
SCRIPT="$(find "$HOME/.claude/plugins/cache" -type f -path "*/cape/*/scripts/sync-harness.sh" 2>/dev/null | sort -V | tail -1)"
[ -z "$SCRIPT" ] && { echo "cape not found in plugin cache — is the plugin installed and updated?" >&2; exit 1; }
bash "$SCRIPT" "${CLAUDE_PROJECT_DIR:-$PWD}"
```

Then:

- Report the version change the script prints (old → new), or that it was already current.
- If skills were dropped upstream, note which ones the script removed.
- Remind the user to review the git diff under `.claude/skills/` and commit it. If nothing
  changed (already current), there is no diff — say so.

To get a newer version into the cache first, the user updates the plugin itself
(`/plugin update`); this skill then vendors whatever is installed.
