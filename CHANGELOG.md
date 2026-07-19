# Changelog

All notable changes to the `cape` plugin are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **`session-retro` skill** — a new **utility** skill: a structured retrospective on
  collaboration and process after a development session, deliberately scoped away from
  code quality or subject-matter learning. Invocable manually (`/session-retro`) or
  proactively suggested on a session's closing signal after substantial work; distills
  1–3 concrete improvements into `feedback`-type memories so they carry into future
  sessions.

### Fixed

- **Findable handoffs (I043)** — a new `handoff-dir` pointer in `CONTEXT.md` gives handoffs a
  stable, session-independent home, so the receiving session finds them by topic instead of
  guessing a random temp path. `/cape:setup` also points the root `CLAUDE.md` at `CONTEXT.md`.

## [0.8.1] - 2026-07-14

### Fixed

- **README version drift** — the README carried the version a second time, hardcoded in prose
  (`v0.7.6`), beside the single source of truth in `plugin.json`. The release checklist bumps
  only `plugin.json`, so that number silently rotted. Removed it — "Early stage" carries the
  meaning without a value that goes stale; `plugin.json` stays the only place a version lives.

### Added

- **arc42: guardrail concept & improvement loops** — chapter 8 defines a **guardrail** (a QA
  backstop that ideally never fires, presupposing a convention rather than replacing it), and
  chapter 4 adds **improvement loops**: a guardrail firing is the signal to improve, with the fix
  routed to the layer it belongs to (preferring the local project layer over cape itself).

## [0.8.0] - 2026-07-13

### Added

- **`/research` skill (F001 / I032)** — a new **utility** skill ported from Matt Pocock's
  `research` (v1.1.0, MIT). It delegates reading legwork to a background agent: investigate
  a question against high-trust **primary sources** (official docs, source code, specs,
  first-party APIs) and leave a **cited Markdown note** in the repo, at the location
  `CONTEXT.md` points to. It is the feeder upstream of `/grill-with-docs`; its `description`
  distinguishes it from `deep-research` (broad multi-source web reports). Surfaced in
  `ask-cape` and the README.

- **Convention consultation — the F6 mechanism (F006 / I030 / I031)** — cape skills now
  surface a repo's own conventions before acting, so a Level-2 framework reaches the
  progressive-disclosure quality of a harness hand-built for the repo:
  - **`/cape:setup`** writes `CONTEXT.md` as a **pointer map** with three logical labels —
    `arc-docs`, `ADR-dir`, `conventions-dir` — resolved to their paths in that one place, and
    creates the central conventions cape depends on (the issue tracker first).
  - **`/cape:setup` also detects the repo's tiers** and records them under a `## Tiers` section
    (name → path) — a detected, open list, never a fixed set of keys.
  - **`/split`** names the **tiers (and bounded contexts) each issue touches**, picked from that
    `## Tiers` list (a new "Tiers & contexts touched" section in the issue template).
  - **`/implement`** resolves each named tier to its path through the registry and reads that
    tier's nested `CLAUDE.md` **up front, before it plans** — catching decisions (a colour, an
    id scheme) made *before* the owning tier's files are touched, which Claude Code's native
    lazy loading misses. Only the named tiers (no wrong-tier leakage); dispatched sub-agents
    inherit the obligation.
  - Proven **hypothesis-first** by an eval: a without-cape baseline as a stop-gate (I030), then
    the nudge shown to close the gap (I031).
  - Grounded in **ADR 0002** (conventions are local or central).

- **arc42 architecture documentation** — cape documents itself in arc42, an exemplar of its own
  conventions: chapter 1 (introduction & goals), 4 (solution strategy), 8 (crosscutting
  concepts, holding the domain glossary), 11 (risks — eval/QA infrastructure as a base
  challenge), 12 (documentation & tooling glossary). Chapter 9 references the ADRs.

- **ADR 0003** — not-model-invokable skills are named only in `ask-cape`, so the model doesn't
  anticipate downstream steps and lose focus.

### Changed

- **Skills reference doc locations by logical label, not hardcoded path** — every skill names
  `arc-docs` / `ADR-dir` / `conventions-dir` and resolves tiers via `## Tiers`; `CONTEXT.md` is
  the single place those labels resolve to concrete paths, so skills stay path-free and portable.

- **Not-model-invokable skills are referenced only in `ask-cape`** (ADR 0003) — removed such
  references from `split`, `feature`, `build`, `implement`, `review-feature`, `architect`, and
  `triage`.

- **Matt v1.1.0 backports into existing skills (F001 / I033)** — targeted improvements Matt
  made between v1.0 and v1.1.0 that cape was missing:
  - **`grilling`** — the old blanket line "If a question can be answered by exploring the
    codebase, explore the codebase instead" is **replaced** by two sharper rules: look up
    *facts* in the codebase, but put every *decision* to the human and wait; and a
    **confirmation gate** — do not enact the plan until the human confirms a shared
    understanding. This matters because cape dispatches `grilling` from `feature` and others,
    where the old line read as licence to answer decisions itself.
  - **`writing-great-skills`** — two new steering failure modes, each a SKILL bullet plus a
    `GLOSSARY.md` entry: **Negation** (prohibitions drag the banned behaviour into context —
    steer positively) and **Negative Space** (every omitted decision is silently delegated to
    the agent's priors — read a draft for its silences and choose each omission).
  - **`split`** — a new **"Wide refactors / Expand–Contract"** rule: a mechanical change with
    repo-wide blast radius is sequenced expand → migrate call sites in batches (each its own
    issue, CI green batch to batch) → contract, instead of being forced into a vertical slice.
  - **`tdd`** — adds the **seam** definition (the public boundary you test at, without
    reaching inside; no test at an unconfirmed seam). The refactor step stays for now (see
    I035).
  - **Cosmetic** — `handoff` now says "specs" instead of "PRDs"; `skill-authoring.md` gains a
    maintenance rule to re-check the `ask-cape` router on any skill add/rename/remove or flow
    change.

- **Redundant links collapsed, a reference file renamed** — in LLM-read skill files, markdown
  links whose visible text was just the target filename collapse to the plain name; the
  architect's `arc42.md` reference is renamed to `architecture-documentation.md` (it teaches the
  arc42 structure — baking the format name into the filename was too rigid).

- **Release model & SemVer levels** — day-to-day work integrates on `develop`; a release is a
  single `develop → main` PR carrying the one version bump. Version positions read as levels of
  significance: PATCH = fixes/optimisations, MINOR = conceptual/structural, MAJOR = maturity
  milestones.

## [0.7.8] - 2026-07-10

### Added

- **`teach` skill** — turns the current directory into a stateful, multi-session teaching
  workspace: a mission that grounds every lesson, curated trusted resources, learning
  records (ADR-style), and beautiful self-contained HTML lessons built from reusable
  components. Ported from Matt Pocock's `teach` (v1.1.0), with the frontmatter adapted to
  cape conventions. Rationale: fast, continuous learning is a core challenge for teams
  adopting AI-assisted work, so enablement belongs in cape (see `I029`).

## [0.7.6] - 2026-07-09

### Changed

- **The bundled status line is withdrawn entirely, pending a future (V2) feature that ships
  it with proper testing.** `/cape:setup` no longer offers to install it as the main (bottom)
  status bar, and the automatic **subagent** status line (previously wired via a plugin
  `settings.json`) is gone too — `settings.json` is removed. The `statusline/statusline.js`
  script stays in the repo but is now dormant; both return once the V2 feature tests them.

- **README rewritten** around a problem-first opener (the failure modes of handing work to
  an agent), a named vision (align up front, then hand off), and the main flow as the
  recognizable route. A "How cape works" section replaces the three-layer harness taxonomy,
  and the status-line section is dropped along with the withdrawn feature.

## [0.7.5] - 2026-07-08

### Added

- **`/cape:setup` offers to install the bundled status line** as the user's main status
  line — it copies the script into `~/.claude/` and merges the `statusLine` setting into
  `~/.claude/settings.json`, asking first and preserving other settings.

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
