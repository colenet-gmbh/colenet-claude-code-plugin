# Changelog

All notable changes to the `cape` plugin are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.5] - 2026-07-08

### Changed

- **Skills now load natively from the installed plugin** as `cape:<name>`, retiring the
  per-repo vendoring. The manifest declares each bucket in a `skills` array; Claude Code
  scans it one level deep. `/cape:setup` keeps only its doc-scaffolding role, and updates
  reach users via `/plugin update`.
- Inter-skill dispatches now use the explicit `cape:<name>` form (e.g. `implement` →
  `cape:tdd` / `cape:review-implementation`, `build` → `cape:implement`, `feature` →
  `cape:review-feature` / `cape:split`) so a skill resolves the skill it calls; plain
  explanatory mentions keep the short form.
- Workflow skills that depend on the scaffolding now carry a dry `run /cape:setup` hint for
  when `CONTEXT.md` or the `docs/work/` board is missing.
- Docs and rules (`CLAUDE.md`, `skill-authoring.md`, `plugin-development.md`, README,
  `CONTRIBUTING.md`, glossary) rewritten to describe native plugin loading instead of
  vendoring.
- Board item IDs now use one shared counter across `F` and `I` (prefix marks type only),
  with the next free number kept in `docs/work/.next-id`. `/cape:setup` creates that file
  when scaffolding the work board. Documented in `docs/work/CLAUDE.md` and the issue-tracker
  doc.

### Removed

- `scripts/sync-harness.sh` and the `update-cape` skill — both belonged to the vendoring
  mechanism, which no longer exists.

## [0.7.4] - 2026-07-08

### Changed

- `triage` now moves a worked-up item along the board: when it produces a result — a
  `ready-for-agent` or `ready-for-human` brief — the file moves `01-backlog` →
  `02-development`, matching the board-as-energy model. Items still under consideration
  (`needs-triage`, `needs-info`) stay in the backlog; `wontfix` is unchanged.
- `triage` is reframed as **backlog management**: it applies to any not-yet-worked-up item
  regardless of origin, not only bug reports and requests "you didn't create". The only
  carve-out is work that is already agent-ready (e.g. issues `/split` produced).

## [0.7.3] - 2026-07-08

### Changed

- `ask-cape` now names *where* the `/triage` on-ramp rejoins the main flow by item size —
  a single slice joins at `/implement`, a feature-sized item via grilling → `/feature` →
  `/split` → `/build`. Removes the imprecise wording that implied a triaged item could go
  straight to `/build`.

## [0.7.2] - 2026-07-07

### Added

- **Per-repo vendoring** so skills are callable with flat, un-prefixed names
  (`/ask-cape`, `/feature`, …) instead of `/cape:<skill>`. The plugin exposes one command,
  **`/cape:setup`**, which vendors the skills into a repo's `.claude/skills/` (via the
  self-locating `scripts/sync-harness.sh`) and scaffolds the docs the workflow expects: the
  `docs/work/` board, `docs/agents/issue-tracker.md` (local files), and `CONTEXT.md` with
  the arc42 glossary. `update-cape` re-syncs to a newer installed version as a reviewable
  diff.
- `triage` skill — sorts raw incoming items on the `docs/work/` board via a `status:`
  frontmatter state machine, with `docs/work/out-of-scope/` for rejected requests
  (adapted from Matt Pocock's `triage`).
- `diagnosing-bugs` skill — the feedback-loop diagnosis discipline (from Matt Pocock).

### Changed

- Skills now ship under `skills_source/` (grouped into buckets, flattened on vendor), **not**
  `skills/`, so the plugin loader never registers them as active, namespaced plugin skills —
  no namespaced/flat duplication.
- `CONTEXT.md` reworked into a **pointer map**; the domain glossary lives in the arc42
  glossary (`docs/arc42/12_glossary.md`) it points to, not inline.

## [0.7.1] - 2026-07-07

### Changed

- README now lists the actual 15-skill catalogue and no longer duplicates the Main Flow
  (which lives in `ask-cape`); dropped the stale `brainstorm`/`software-architect` entries.
- GLOSSARY brought in line with the shipped skills: points to `ask-cape` for the flow
  instead of a hard-wired chain, `software-architect` → `architect`, `review` now names
  `review-feature`/`review-implementation`, `agent-guidelines` replaced by `coding
  standards`.
- Feature board path corrected to **`docs/work/`** across the workflow skills (`split`,
  `feature`, `build`, `implement`, `review-feature`) and the GLOSSARY.

## [0.6.0] - 2026-07-01

### Added

- `software-architect` skill — establishes/evolves the project's architecture
  documentation (arc42 + ADRs) and reviews a feature concept before build; adapted from
  Michael Spanier's coding harness.
- cape **engineering rules** (`skills/build/references/engineering-rules.md`) —
  opinionated, stack-agnostic code-quality rules enforced by `build`, checked by
  `software-architect`.
- Project-context conventions: a **feature board** in `docs/features/`
  (`01-backlog → 02-development → 03-approval → 04-done`, IDs via `_counter.txt`),
  **`agent-guidelines/`** for project-specific directives, and an arc42 reference.
- `skills/ask-cape/references/main-flow.md` — the canonical Main Flow (board, HITL/AFK,
  and the terms review / sign-off / approval).

### Changed

- Main Flow is now `brainstorm → grill-with-docs → feature → software-architect → split →
  build`, run as one HITL stretch then one AFK stretch; `feature` and `split` became AFK.
- GLOSSARY defines HITL, AFK, the feature board, review, sign-off, approval, and
  acceptance criteria.

## [0.5.1] - 2026-07-01

### Added

- `GLOSSARY.md` — defines the **Main Flow** (the guided path `brainstorm → grill-with-docs
  → feature → split → build`; "workflow" used as a synonym).

### Changed

- Standardized the term for the guided path (the **Main Flow** / workflow) across the
  plugin and docs, replacing the previous jargon term.

## [0.5.0] - 2026-07-01

### Added

- The **cape workflow** (Phase 2): five workflow skills forming a guided path from
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
- `ask-cape` — a router skill that walks the workflow (pattern inspired by Pocock `ask-matt`).

### Changed

- README skill tables now document the shipped workflow and the utility skills.

## [0.4.0] - 2026-07-01

### Changed

- cape now **owns its stack**: removed the `superpowers` runtime dependency from
  `plugin.json`. Building blocks cape needs (e.g. `brainstorm`) are ported into cape with
  attribution rather than pulled in as a dependency.
- README restructured around two skill classes — **workflow** (guided, in
  progress) and **utility** (`grill-me`) — and now documents the planned workflow
  (`brainstorm → grill-with-docs → feature → split → build`).
- README and CONTRIBUTING no longer describe `superpowers` as an auto-installed dependency.

### Added

- `.claude/rules/dod.md`: the **`build` bright line** — cape's own `build` stays a lean,
  single-flow executor and must not reimplement `we`'s orchestration engine.

## [0.3.0] - 2026-06-10

### Added

- `.claude/rules/dod.md` — Definition of Done & scope guardrail: the plugin's red thread
  and explicit veto criteria for changes that drift from its mission.
- CLAUDE.md: Claude's role as **plugin guardian & development advisor** with the
  authority to veto off-mission additions and advise on direction.

### Changed

- CONTRIBUTING prerequisites now include the `plugin-dev` plugin; README documents the
  two official plugins `cape` builds on (`superpowers`, `plugin-dev`) and shows a sample
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

- Initial release of `cape` (Colenet Agentic Product Engineering).
- `grill-me` skill — ported from [`mattpocock/skills`](https://github.com/mattpocock/skills)
  (MIT, © Matt Pocock); see [`ATTRIBUTION.md`](ATTRIBUTION.md).
- `superpowers` declared as an auto-installed dependency in `plugin.json`.
- Development conventions in `.claude/rules/`: `skill-authoring.md`, `attribution.md`,
  `plugin-development.md`.
- Structural validation (`scripts/validate-plugin.sh`) run in CI on every push and PR.
