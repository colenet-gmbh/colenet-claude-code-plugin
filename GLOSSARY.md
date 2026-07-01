# Glossary

Shared vocabulary for the capd plugin. Keep these terms consistent across skills, the
README, and the docs.

## Main Flow

The one guided capd path from an idea to a built, approved slice:

```text
brainstorm → grill-with-docs → feature → software-architect → split → build
```

"Workflow" is used as a synonym. The skills that make it up are the **workflow skills**;
standalone skills off it (e.g. `grill-me`, `ask-capd`) are **utility skills**. Full
mechanics are in `skills/ask-capd/references/main-flow.md`. (Never call it a "spine" — jargon.)

## HITL — human-in-the-loop

The human contributes decisively: an active dialogue, one question at a time with a
recommended answer, aimed at reaching human↔agent alignment efficiently, or helping the
human reach their own clarity. `brainstorm` and `grill-with-docs` are HITL.

## AFK — away-from-keyboard

The agent works autonomously for a long stretch; the human returns only at consequence
boundaries or when the agent genuinely escalates. `feature`, `software-architect`, `split`,
and `build` run AFK. The Main Flow is designed as one long HITL stretch, then one long AFK
one.

## Feature board

The `docs/features/` folders **are** the board columns: `01-backlog` (raw external inputs)
→ `02-development` (work in progress) → `03-approval` (built, awaiting human approval) →
`04-done`. The **folder is the state**; the frontmatter `status` mirrors it. Feature IDs
(`F<NNN>`) are assigned in arrival order via `_counter.txt` and are identifiers, not
workflow positions.

## review

An internal quality-assurance step by an agent lens *within* `02-development` — the
`software-architect` reviews the concept now; code review and security review join later
(then automated). Not a board state.

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

## agent-guidelines

Project-specific **directives for the agent** (not documentation), in `agent-guidelines/`,
one file per review lens (e.g. `architect.md`; later `security.md`). Generic skills read
them when present and fall back to capd's engineering rules otherwise.

## architecture documentation (arc42)

The durable **facts** about the system the architect reasons against — the project's
existing docs, or an [arc42](https://arc42.org) structure that `software-architect`
creates and evolves. ADRs live in arc42 §9. Distinct from `agent-guidelines/` (directives)
and from `docs/features/` (per-feature specs).
