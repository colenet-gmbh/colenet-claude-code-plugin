# Changelog

All notable changes to the `capd` plugin are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-10

### Added

- Initial release of `capd` (Colenet Agentic Product Development).
- `grill-me` skill — ported from [`mattpocock/skills`](https://github.com/mattpocock/skills)
  (MIT, © Matt Pocock); see [`ATTRIBUTION.md`](ATTRIBUTION.md).
- `superpowers` declared as an auto-installed dependency in `plugin.json`.
- Development conventions in `.claude/rules/`: `skill-authoring.md`, `attribution.md`,
  `plugin-development.md`.
- Structural validation (`scripts/validate-plugin.sh`) run in CI on every push and PR.
