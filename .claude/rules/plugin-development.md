# Rule: Plugin development & releases

Plugin-level lifecycle for `capd`: versioning, releasing, and how updates reach users.
For skill content see [`skill-authoring.md`](skill-authoring.md); for external sources
see [`attribution.md`](attribution.md).

## How updates reach users

- Claude Code refreshes auto-update-enabled marketplaces at startup and notifies users of
  available updates (`/reload-plugins`); users can also run `/plugin update`.
- **`plugin.json` `version` is the single source of truth.** The marketplace entry
  carries **no** version, so there is nothing to keep in sync. On refresh Claude Code
  reads `plugin.json` from our unpinned GitHub source; an update is detected only when
  that version increases — pushing code without bumping it ships nothing to
  already-installed users. Bumping the version is mandatory for every release.

## Dependencies

- Declare plugin dependencies in `plugin.json` under `dependencies`. **Always qualify
  with the marketplace** (`name@marketplace`) — a bare name resolves against *this*
  plugin's own marketplace (`@colenet`), so `"superpowers"` is looked up as
  `superpowers@colenet` and fails. Use e.g. `"superpowers@claude-plugins-official"`.
- The marketplace must be one users have (the built-in `claude-plugins-official` is
  always present); otherwise the dependency cannot be resolved and the plugin fails to
  load.

## Versioning (SemVer)

`MAJOR.MINOR.PATCH` — a convention, not enforced by Claude Code (any increase counts as
"an update"):

- **PATCH** — fixes, wording, refactors; no behavior change for users.
- **MINOR** — new skill or new capability, backward compatible.
- **MAJOR** — breaking change (renamed/removed skill, changed invocation, new required
  dependency).

## Release checklist

Run this for every change that should reach users:

1. Bump `version` in `.claude-plugin/plugin.json` (SemVer). **This is the only place.**
2. Open a PR and merge it (`main` is protected). Users with auto-update enabled receive
   the new version at their next startup; others via `/plugin update`.
3. (Optional) Record the change in `CHANGELOG.md`.

The marketplace repo only needs a push when its **listing** changes (description,
keywords) — not for a version bump.

CI enforces the bump on pull requests that touch **plugin-shipping files**
(`skills/`, `.claude-plugin/`, `statusline/`, `settings.json`): the `validate` check
fails if `plugin.json` `version` is not greater than on the base branch. PRs that only
change working material (`requirements/`), contributor docs, CI, or scripts do not
require a bump. Direct pushes to `main` bypass this gate (admins only) — use them only
for changes that should not bump.

## Do not

- Do not push behavior changes without a version bump — installed users will not receive
  them.
- Do not re-add a `version` to the marketplace entry — `plugin.json` is the single source
  of truth. (The `claude plugin tag` release flow would require both to match; we don't
  use it.)
- Do not switch to commit-SHA versioning (omitting `version`) for this plugin: we ship
  explicit releases, not every-commit updates.
