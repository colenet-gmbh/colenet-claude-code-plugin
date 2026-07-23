# Changelog

All notable changes to the `cape` plugin are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **`/improve` focuses on the user's project (I047)** — the improvement mode and
  `improvement-conventions.md` are gone. Improvements always land in the project's own
  harness; genuinely general ones become suggested GitHub issues to the cape community.
  The agent now suggests `/improve` when it senses friction; the user starts it.
- **`/improve` gets an explicit approval gate** — confirming the friction analysis is not
  approval to change anything; the skill now shows the concrete measure (what, where,
  wording) and waits for a go before touching a file.
- **`/implement` slimmed** — done = review clean + ticket updated (status, brief notes).
- **Setup and README sharpened** — `/cape:setup` is leaner and hands users to `/ask-cape`
  when done; the README explains cape's user-in-control invocation model.
- **Three named glossary kinds (I041)** — "glossary" alone was overloaded; the domain
  glossary now defines **domain glossary** (chapter 8), **environment glossary** (chapter 12,
  formerly "documentation & tooling glossary"), and **skill glossary** (vocabulary a skill
  ships to be practiced, linked directly in the skill). The legacy root `GLOSSARY.md` was
  merged into chapter 8 and removed.
- **Consistent glossary references (I046)** — skills now reference glossaries by kind and
  resolve them via `CONTEXT.md`, which gains two named pointers, `domain-glossary` and
  `environment-glossary` (they may target the same file in single-glossary projects).
  `/cape:setup`, the `CONTEXT.md` format reference, and the eval fixture follow suit; the
  fixture's glossary was mislabeled as chapter 12 and is now the domain glossary.

## [0.9.0] - 2026-07-22

### Added

- **`/improve` skill (F015)** — keeps the *harness* good, the counterpart to `/architect`
  keeping the *codebase* good. Run it when a flow or session showed friction: it finds the
  friction, traces the root cause, and applies a proportional fix on the right layer.
  Sources credited in [`ATTRIBUTION.md`](ATTRIBUTION.md).

### Changed

- **One green gate for contributors** — a single `make check` runs the exact checks CI
  runs, so a PR is opened only once it is already green locally.
- **Lighter board flow** — board files and `requirements/**` commit straight to `develop`
  without a pull request; PRs stay for code and shipped changes.

## [0.8.2] - 2026-07-19

### Added

- **Optional status line, installed by `/cape:setup`** — model, directory, branch and rate
  limits, plus a context-window graphic whose colour signals whether you're still in the
  "smart zone".

### Changed

- **`/cape:setup` reorganised around themes** — work tracking, documentation, orientation,
  and the optional status line, so it's clearer what is being set up.

### Fixed

- **Findable handoffs (I043)** — a `handoff-dir` pointer in `CONTEXT.md` gives handoffs a
  stable, session-independent home, so the receiving session finds them by topic.

## [0.8.1] - 2026-07-14

### Fixed

- **README version drift** — the README carried a second, hardcoded version beside the
  single source of truth in `plugin.json` and silently rotted; removed.

### Added

- **arc42: guardrail concept & improvement loops** — a guardrail is a QA backstop that
  ideally never fires; when one fires, that is the signal to improve, with the fix routed
  to the layer it belongs to.

## [0.8.0] - 2026-07-13

### Added

- **`/research` skill (F001 / I032)** — delegates reading legwork to a background agent:
  investigate a question against primary sources and leave a cited note in the repo,
  feeding `/grill-with-docs` upstream. Ported from Matt Pocock's `research` (MIT).
- **Convention consultation (F006)** — cape skills now surface a repo's own conventions
  before acting: `/cape:setup` writes `CONTEXT.md` as a pointer map and detects the repo's
  tiers, `/split` names the tiers each issue touches, and `/implement` reads the named
  tiers' conventions up front, before it plans. Proven hypothesis-first by an eval.
- **arc42 architecture documentation** — cape documents itself in arc42, an exemplar of
  its own conventions.
- **ADR 0003** — not-model-invokable skills are named only in `ask-cape`, so the model
  doesn't anticipate downstream steps and lose focus.

### Changed

- **Skills reference doc locations by logical label, not hardcoded path** — `CONTEXT.md`
  is the single place labels resolve to paths, so skills stay portable.
- **ADR 0003 applied** — references to not-model-invokable skills removed from the
  affected skills.
- **Matt v1.1.0 backports (F001 / I033)** — targeted upstream improvements cape was
  missing: `grilling` gains a decisions-to-the-human rule and a confirmation gate,
  `writing-great-skills` two new steering failure modes, `split` an Expand–Contract rule
  for wide refactors, `tdd` the seam definition.
- **Release model & SemVer levels** — day-to-day work integrates on `develop`; a release
  is a single `develop → main` PR carrying the one version bump.

## [0.7.8] - 2026-07-10

### Added

- **`teach` skill** — turns the current directory into a stateful, multi-session teaching
  workspace with a mission, curated resources, and self-contained HTML lessons. Ported
  from Matt Pocock's `teach`.

## [0.7.6] - 2026-07-09

### Changed

- **The bundled status line is withdrawn entirely**, pending a future feature that ships
  it with proper testing; the script stays in the repo but is dormant.
- **README rewritten** around a problem-first opener, a named vision (align up front,
  then hand off), and the main flow as the recognizable route.

## [0.7.5] - 2026-07-08

### Added

- **`/cape:setup` offers to install the bundled status line** as the user's main status
  line, asking first and preserving other settings.

### Changed

- **Skills now load natively from the installed plugin** as `cape:<name>`, retiring the
  per-repo vendoring; `/cape:setup` keeps only its doc-scaffolding role and updates reach
  users via `/plugin update`.
- **Inter-skill dispatches use the explicit `cape:<name>` form**, so a skill reliably
  resolves the skill it calls.
- **Board item IDs use one shared counter** across `F` and `I`, kept in
  `docs/work/.next-id`.

### Removed

- **The vendoring mechanism** — `scripts/sync-harness.sh` and the `update-cape` skill.

## [0.7.4] - 2026-07-08

### Changed

- **`triage` moves worked-up items along the board** — producing a brief moves the file
  `01-backlog` → `02-development`, matching the board-as-energy model.
- **`triage` reframed as backlog management** — it applies to any not-yet-worked-up item
  regardless of origin; only agent-ready work is out.

## [0.7.3] - 2026-07-08

### Changed

- **`ask-cape` names where the `/triage` on-ramp rejoins the main flow** by item size — a
  single slice at `/implement`, a feature-sized item via the full feature route.

## [0.7.2] - 2026-07-07

### Added

- **Per-repo vendoring** — one command, `/cape:setup`, vendors the skills into a repo and
  scaffolds the docs the workflow expects (the `docs/work/` board, the issue-tracker
  record, `CONTEXT.md`).
- **`triage` skill** — sorts raw incoming items on the board (adapted from Matt Pocock).
- **`diagnosing-bugs` skill** — the feedback-loop diagnosis discipline (from Matt Pocock).

### Changed

- **Skills ship under `skills_source/`**, so the plugin loader never registers them as
  duplicate namespaced skills.
- **`CONTEXT.md` reworked into a pointer map**; the domain glossary lives in the arc42
  glossary it points to.

## [0.7.1] - 2026-07-07

### Changed

- **README and GLOSSARY brought in line with the shipped skills** — actual skill
  catalogue, current names, and the corrected `docs/work/` board path across the workflow
  skills.

## [0.6.0] - 2026-07-01

### Added

- **`software-architect` skill** — establishes and evolves the project's architecture
  documentation (arc42 + ADRs) and reviews a feature concept before build; adapted from
  Michael Spanier's coding harness.
- **cape engineering rules** — opinionated, stack-agnostic code-quality rules enforced by
  `build`.
- **Project-context conventions** — a feature board in `docs/features/`,
  `agent-guidelines/` for project directives, and an arc42 reference.

### Changed

- **Main Flow extended** to include `software-architect`, run as one HITL stretch then
  one AFK stretch; the GLOSSARY defines the terms.

## [0.5.1] - 2026-07-01

### Added

- **`GLOSSARY.md`** — defines the **Main Flow**, the guided path from idea to built slice.

### Changed

- **Standardized the term "Main Flow"** across the plugin and docs, replacing the previous
  jargon term.

## [0.5.0] - 2026-07-01

### Added

- **The cape workflow (Phase 2)** — five workflow skills forming a guided path from idea
  to built slice: `brainstorm`, `grill-with-docs`, `feature`, `split`, `build` — ported
  and synthesized from `superpowers`, Matt Pocock's skills, and Michael Spanier's
  conventions (all MIT, credited in `ATTRIBUTION.md`).
- **`ask-cape`** — a router skill that walks the workflow.

### Changed

- **README skill tables document the shipped workflow** and the utility skills.

## [0.4.0] - 2026-07-01

### Changed

- **cape now owns its stack** — removed the `superpowers` runtime dependency; building
  blocks cape needs are ported in with attribution instead.
- **README restructured around two skill classes** — workflow (guided) and utility.

### Added

- **The `build` bright line** in the DoD rule — cape's own `build` stays a lean,
  single-flow executor and must not reimplement `we`'s orchestration engine.

## [0.3.0] - 2026-06-10

### Added

- **Definition of Done & scope guardrail** — the plugin's red thread and explicit veto
  criteria for changes that drift from its mission; CLAUDE.md gives Claude the guardian
  role.

### Changed

- **Contributor docs name the plugins cape builds on** and show a sample status line.

## [0.2.2] - 2026-06-10

### Fixed

- **Plugin failed to load** — a bare dependency name resolves against the plugin's own
  marketplace; qualified it as `superpowers@claude-plugins-official`.

## [0.2.1] - 2026-06-10

### Changed

- **`plugin.json` `version` is the single source of truth** — removed the duplicate
  version from the marketplace entry.

## [0.2.0] - 2026-06-10

### Added

- **Bundled status line script** showing model, branch, directory, context usage, cost,
  and rate limits, wired as the subagent status line while the plugin is enabled.

## [0.1.0] - 2026-06-10

### Added

- **Initial release of `cape`** (Colenet Agentic Product Engineering) — the `grill-me`
  skill (ported from Matt Pocock, MIT), development conventions in `.claude/rules/`, and
  structural validation in CI.
