---
name: build
description: Implements one vertical slice test-first (red-green-refactor) using only public interfaces, then optionally runs a light role-lens review before committing. The build step of the capd spine, after split. Lean and single-flow by design — NOT an orchestration engine. Use when the user wants to implement a slice, build test-first, or says "build", "umsetzen", "implementieren", "bauen", "implement this slice", or "TDD".
---

Implement **one slice** from the feature's `split`, test-first, in a single session on the
current branch. This is the **build step of the capd spine**.

> **The bright line (see [`dod.md`](../../.claude/rules/dod.md)).** `build` stays a **lean,
> single-flow executor**. It **NEVER** becomes an orchestration engine — no persistent
> state machine, no resume, no worker pool, no multi-agent dispatch. That is the `we`
> plugin's territory; when a team genuinely needs multi-worker orchestration, route them there.

## Plan the slice

- Read the slice, plus `CONTEXT.md` and any ADRs. Use the project's glossary vocabulary.
- Confirm the **public interface** and the top behaviors with the user — one question at a
  time. Identify deep modules (small interface, large behavior behind it).

## Red → green → refactor, one behavior at a time

For each behavior in the slice:

1. **RED** — write **one** test against the **public interface only** (no mocking internal
   details). The expected value comes from an **independent source** (a worked example or
   known-good literal), never recomputed from the code. The test reads like a spec.
2. **GREEN** — write the **minimal** code to pass it. Nothing speculative.
3. Run the test; run type-checking. **Never refactor while red.**

Once all the slice's tests are green, **refactor**: extract duplication (functions over
~20 lines are a smell), deepen modules, run tests after each step.

## Quality gate

Run the full test suite once, plus the project's build/lint/format. All green.

## Optional role-lens review (light, serial)

For an architecture, security, or UX pass, use **preamble injection**: read a review
discipline's text, prepend it to a subagent's prompt, and pass it the slice + the code.
One round-trip, serial — not a fan-out. Fold the findings back in. Keep this optional and
lightweight; it is a review pass, not a pipeline.

## Commit and hand off

Commit the slice to the current branch. **Human in the loop** for PR/merge. Update the
slice/feature `status`. Report what was built and which interfaces are new.

## Rules

- **ALWAYS** test the public interface; one test → one implementation step.
- **NEVER** write tautological tests, slice horizontally, or add speculative features.
- **NEVER** modify existing passing tests to make new code fit.

## Attribution

Synthesis by colenet of external sources (all MIT): the TDD discipline of **`tdd`** and
**`implement`** from [`mattpocock/skills`](https://github.com/mattpocock/skills) (Matt
Pocock), and the **preamble-injection role review** from Michael Spanier's `kvjs-app`
`fullstack-orchestrator`. capd deliberately omits that orchestrator's engine parts
(state machine, worker pool, parallel dispatch). See [`ATTRIBUTION.md`](../../ATTRIBUTION.md).
