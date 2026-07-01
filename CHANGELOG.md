# Changelog

All notable changes to the `capd` plugin are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2026-07-01

### Added

- The **capd workflow spine** (Phase 2): five workflow skills forming a guided path from
  idea to built slice.
  - `brainstorm` — port of `brainstorming` from `superpowers` (MIT, © Jesse Vincent).
  - `grill-with-docs` — port of `grill-with-docs` / `domain-modeling` from
    `mattpocock/skills` (MIT, © Matt Pocock).
  - `feature` — synthesis: Pocock `to-prd` × Michael Spanier's traveling feature-file
    convention (`docs/features/F###-slug.md`); ships a `references/feature-template.md`.
  - `split` — port of `to-issues` from `mattpocock/skills` (MIT); records slices as repo
    Markdown instead of tracker issues.
  - `build` — synthesis: Pocock `tdd` / `implement` × Spanier `fullstack-orchestrator`;
    lean and single-flow, honoring the `build` bright line (not an orchestration engine).
- `ask-capd` — a router skill that walks the spine (pattern inspired by Pocock `ask-matt`).

### Changed

- README skill tables now document the shipped workflow spine and the utility skills.

## [0.4.0] - 2026-07-01

### Changed

- capd now **owns its stack**: removed the `superpowers` runtime dependency from
  `plugin.json`. Building blocks capd needs (e.g. `brainstorm`) are ported into capd with
  attribution rather than pulled in as a dependency.
- README restructured around two skill classes — **workflow** (the guided spine, in
  progress) and **utility** (`grill-me`) — and now documents the planned spine
  (`brainstorm → grill-with-docs → feature → split → build`).
- README and CONTRIBUTING no longer describe `superpowers` as an auto-installed dependency.

### Added

- `.claude/rules/dod.md`: the **`build` bright line** — capd's own `build` stays a lean,
  single-flow executor and must not reimplement `we`'s orchestration engine.

## [0.3.0] - 2026-06-10

### Added

- `.claude/rules/dod.md` — Definition of Done & scope guardrail: the plugin's red thread
  and explicit veto criteria for changes that drift from its mission.
- CLAUDE.md: Claude's role as **plugin guardian & development advisor** with the
  authority to veto off-mission additions and advise on direction.

### Changed

- CONTRIBUTING prerequisites now include the `plugin-dev` plugin; README documents the
  two official plugins `capd` builds on (`superpowers`, `plugin-dev`) and shows a sample
  status line.

## [0.2.2] - 2026-06-10

### Fixed

- Plugin failed to load (`Dependency "superpowers@colenet" is not installed`). A bare
  dependency name resolves against the plugin's **own** marketplace, so `"superpowers"`
  was looked up as `superpowers@colenet`. Qualified it as
  `superpowers@claude-plugins-official` (the built-in marketplace where superpowers
  lives).

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
