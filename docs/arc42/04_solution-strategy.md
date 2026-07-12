# Solution Strategy

How cape reaches its goal (chapter 1): a Level-2 framework that reaches the
progressive-disclosure quality of a bespoke Level-3 harness. Grounding decision:
[ADR 0002](../adr/0002-conventions-are-local-or-central.md).

## Progressive Disclosure

The core move: in each situation, surface only the rules that matter and skip the rest — **as
few as possible, as many as necessary**. Too many or wrong rules dilute the model's focus, and
the relevant ones get missed.

## Conventions: local or central

A project's rules live where they belong. A **local** convention belongs to a place in the
code — a tier — and lives in that tier's nested `CLAUDE.md`. A **central** convention belongs
nowhere in particular and lives in `docs/agent-conventions/`, reached via `CONTEXT.md`. (Terms:
domain glossary, chapter 8.)

## Two explicit touchpoints

Level 1 (Claude Code) loads a nested `CLAUDE.md` only once a file in its subtree is touched —
too late to shape a decision made earlier. So cape reaches into project rules at exactly two
explicit points, and no others:

1. **`/cape:setup`** prepares the central conventions and points at them from `CONTEXT.md`.
2. **the acting skill** (`/implement`) consults the touched tiers' local conventions **before
   acting**.

Beyond these, cape builds on Level 1's native loading — **no parallel store**.

## Verification via evals

cape is prompt-shaped software: its behaviour claims can't be read off the code, only observed.
So they are proven by **evals** — run the flow, measure the output — not asserted. The eval
infrastructure this demands is a standing concern (chapter 11).
