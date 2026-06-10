# Changelog

All notable changes to the `capd` plugin are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2026-06-10

### Changed

- `plugin.json` `version` is now the single source of truth: removed the per-plugin
  `version` from the marketplace entry, and relaxed the release rule and CLAUDE.md
  accordingly (no more dual version bump).

## [0.2.0] - 2026-06-10

### Added

- Bundled status line script (`statusline/statusline.js`) showing model, branch,
  directory, context-usage bar, RAM, cost, and rate limits.
- Plugin `settings.json` wires it as `subagentStatusLine` (applied automatically while
  the plugin is enabled). The main bottom status bar cannot be set by a plugin — see
  the README for the opt-in.

## [0.1.0] - 2026-06-10

### Added

- Initial release of `capd` (Colenet Agentic Product Development).
- `grill-me` skill — ported from [`mattpocock/skills`](https://github.com/mattpocock/skills)
  (MIT, © Matt Pocock); see [`ATTRIBUTION.md`](ATTRIBUTION.md).
- `superpowers` declared as an auto-installed dependency in `plugin.json`.
- Development conventions in `.claude/rules/`: `skill-authoring.md`, `attribution.md`,
  `plugin-development.md`.
- Structural validation (`scripts/validate-plugin.sh`) run in CI on every push and PR.
