# Rule: Plugin development & releases

Plugin-level lifecycle for `capd`: versioning, releasing, and how updates reach users.
For skill content see [`skill-authoring.md`](skill-authoring.md); for external sources
see [`attribution.md`](attribution.md).

## How updates reach users

- Claude Code refreshes auto-update-enabled marketplaces at startup and notifies users of
  available updates (`/reload-plugins`); users can also run `/plugin update`.
- **An update is detected only when the `version` number changes.** Our marketplace source
  is an unpinned GitHub repo, but because we set an explicit `version`, Claude Code does
  **not** pick up new commits on their own — pushing code without bumping the version
  ships nothing to already-installed users. Bumping the version is mandatory for every
  release.

## Versioning (SemVer)

`MAJOR.MINOR.PATCH` — a convention, not enforced by Claude Code (any increase counts as
"an update"):

- **PATCH** — fixes, wording, refactors; no behavior change for users.
- **MINOR** — new skill or new capability, backward compatible.
- **MAJOR** — breaking change (renamed/removed skill, changed invocation, new required
  dependency).

## Release checklist

Run this for every change that should reach users:

1. Bump `version` in `.claude-plugin/plugin.json` (SemVer).
2. Bump the **same** version in the marketplace repo entry for `capd`
   (`colenet-claude-code-marketplace/.claude-plugin/marketplace.json`). The two versions
   **must match**.
3. Commit and push **both** repos.
4. Tag the release: from the plugin repo run `claude plugin tag --push`. It creates and
   pushes the tag `capd--vX.Y.Z` and validates that `plugin.json` and the marketplace
   entry agree on the version (it fails if they have drifted).
5. (Optional) Record the change in `CHANGELOG.md`.

Users with auto-update enabled receive it at their next startup; others via
`/plugin update`.

## Do not

- Do not push behavior changes without a version bump — installed users will not receive
  them.
- Do not let `plugin.json` and the marketplace entry versions diverge — the tag step fails
  and update detection becomes ambiguous.
- Do not switch to commit-SHA versioning (omitting `version`) for this plugin: we ship
  explicit, taggable releases, not every-commit updates.
