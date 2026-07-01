---
name: build
description: Implements a signed-off feature's slices test-first (red-green-refactor), following capd's engineering rules and the project's architect guidelines, then moves the feature to approval. The build step of the Main Flow, after split; AFK. Lean and single-flow by design — NOT an orchestration engine. Use when a feature is sliced and ready to implement, or the user says "build", "umsetzen", "implementieren", "bauen", "implement this slice", or "TDD".
---

Implement the feature's slices, one at a time, test-first. This is the **build step** of
the Main Flow (after `split`), and it is **AFK**: work autonomously through the slices; the
human returns only at PR/merge.

> **The bright line (see [`dod.md`](../../.claude/rules/dod.md)).** `build` stays a **lean,
> single-flow executor**. It **NEVER** becomes an orchestration engine — no persistent
> state machine, no resume, no worker pool, no multi-agent dispatch. That is the `we`
> plugin's territory; when a team genuinely needs multi-worker orchestration, route there.

## Set up

Read the feature (in `docs/features/02-development/`), its slices, `CONTEXT.md`, and the
architecture docs. Create the feature branch `feat/F<NNN>-<slug>`.

## Follow the rules

- capd's engineering rules are binding: [`references/engineering-rules.md`](references/engineering-rules.md).
- Load the project's architect directives if present: `agent-guidelines/architect.md`
  (they layer on top of the generic rules).

## Red → green → refactor, one behavior at a time

For each slice, for each behavior:

1. **RED** — write **one** test against the **public interface only**. The expected value
   comes from an **independent source** (a worked example or known-good literal), never
   recomputed from the code. The test reads like a spec.
2. **GREEN** — write the **minimal** code to pass it. Nothing speculative.
3. Run the test and type-checking. **Never refactor while red.**

Once a slice's tests are green, **refactor**: extract duplication (functions over ~20 lines
are a smell), deepen modules, run tests after each step. Check the slice off in the feature
file. Commit per slice.

## Quality gate (blocking)

Before a slice counts as done: format, lint (no warnings), the full test suite, and the
build all pass; new code meets the coverage bar (default ≥ 80% for business logic).

## Finish

When all slices are green and the gates pass, `git mv` the feature to
`docs/features/03-approval/` (status → `approval`) and report what was built. **Human in
the loop** for PR/merge and the final **approval**; on approval it moves to `04-done/`.

## Rules

- **ALWAYS** test the public interface; one test → one implementation step.
- **NEVER** write tautological tests, slice horizontally, or add speculative features.
- **NEVER** modify existing passing tests to make new code fit — ask first.

## Attribution

Synthesis by colenet (all MIT): the TDD discipline of **`tdd`** and **`implement`** from
[`mattpocock/skills`](https://github.com/mattpocock/skills) (Matt Pocock), and the
engineering rules + preamble-injection role review generalized from Michael Spanier's
coding harness. capd deliberately omits its orchestration-engine parts. See
[`ATTRIBUTION.md`](../../ATTRIBUTION.md).
