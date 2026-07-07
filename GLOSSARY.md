# Glossary

Shared vocabulary for the cape plugin. Keep these terms consistent across skills, the
README, and the docs.

## Main Flow

The one guided cape path from an idea to a built, approved slice. "Workflow" is used as a
synonym. The skills that make it up are the **workflow skills** (`grill-with-docs`,
`feature`, `split`, `implement`/`build`); standalone skills off it (e.g. `grill-me`,
`prototype`, `handoff`) are **utility skills**. The canonical, always-current description
of the flow — order, branches, and how the skills hand off — lives in the
[`ask-cape`](skills_source/meta/ask-cape/SKILL.md) router; don't restate the chain elsewhere, point to
it. (Never call it a "spine" — jargon.)

## HITL — human-in-the-loop

The human contributes decisively: an active dialogue, one question at a time with a
recommended answer, aimed at reaching human↔agent alignment efficiently, or helping the
human reach their own clarity. `grill-with-docs` (and standalone `grill-me`) are HITL.

## AFK — away-from-keyboard

The agent works autonomously for a long stretch; the human returns only at consequence
boundaries or when the agent genuinely escalates. `feature`, `split`, `implement`, and
`build` run AFK. The Main Flow is designed as one long HITL stretch, then one long AFK one.

## Feature board

The `docs/work/` folders **are** the board columns: `01-backlog` (raw external inputs) →
`02-development` (work in progress) → `03-approval` (built, awaiting human approval) →
`04-done`. The **folder a feature or issue sits in is its state** — items move by being
moved between folders. Features are files `F<NNN>_<slug>.md`, the issues `/split` produces
are `I<NNN>_<slug>.md` (carrying `parent: F<NNN>` and `blocked-by`). The IDs are
identifiers, not workflow positions.

## review

An internal quality-assurance step by agent lenses *within* `02-development`, each lens in
its own sub-agent. `review-feature` reviews the spec (Architecture, Security) before it's
split; `review-implementation` reviews the built code (Standards, Spec). Not a board
state.

## sign-off

The human approving the **concept** (after the review, before building). A gate within
development, not a board state.

## approval

The human approving the **built result** — the `03-approval` gate, before `04-done`. The
human's broad judgment on the delivered feature.

## acceptance criteria

The machine-verified yardstick (Gherkin, written in `feature`, verified by tests in
`build`) — "did we build it right". Distinct from *approval*, the human's broader "did we
build the right thing".

## coding standards

Whatever the repo documents about how code should be written — e.g. `CODING_STANDARDS.md`
or `CONTRIBUTING.md`. `review-implementation`'s Standards axis reads these to judge the
built code against the project's own conventions.

## architecture documentation (arc42)

The durable **facts** about the system the architect reasons against — the project's
existing docs, or an [arc42](https://arc42.org) structure that `architect` creates and
evolves lazily (a small project may only ever fill chapters 1, 8, 9, and 12). ADRs live in
arc42 chapter 9, under `docs/adr/`. Distinct from `docs/work/` (per-feature specs and issues).
