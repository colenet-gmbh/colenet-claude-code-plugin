---
name: split
description: Breaks a signed-off feature into independently buildable, dependency-ordered vertical slices (tracer bullets) — recorded as Markdown in the feature file, not a tracker. Runs after the software-architect sign-off, before build; AFK (decomposes autonomously). Use when a feature is approved and needs slicing into build steps, or the user says "split", "in Slices zerlegen", "Feature aufteilen", "Tasks schneiden", "vertical slices", or "break this down".
---

Break the **signed-off** feature into small, independently buildable pieces. This runs
after the `software-architect` sign-off and before `build`. It is **AFK**: decompose
autonomously from the approved spec; only escalate if something is genuinely ambiguous.

## Read the source

Read the feature spec (`docs/features/F<NNN>-<slug>.md`), plus `CONTEXT.md`, the
architecture docs, and any ADRs. Use the project's glossary vocabulary.

## Draft vertical slices (tracer bullets)

- Each slice is a **thin vertical slice** cutting end-to-end through **all** layers (data,
  logic, interface, tests) — **not** a horizontal layer.
- Each completed slice is **demoable / verifiable on its own**.
- Do prefactoring first: *make the change easy, then make the easy change.*

## Record the slices as Markdown

Ground truth is the repo. Record the slices in **dependency order** in the feature file's
`## Slices` section. Per slice:

- **What to build** — the end-to-end behavior (no file paths or code; they go stale).
- **Acceptance criteria** — a checklist / Gherkin.
- **Blocked by** — the slices it depends on, or "none — can start immediately".

A tracker, if the team uses one, is an **optional index** pointing back to these slices.

## Completion

Done when the ordered slices are recorded in the feature file (it stays in `02-development`). Then the
flow continues (still AFK) with `build`, one slice at a time.

## Rules

- **NEVER** slice horizontally (all of one layer as a "slice").
- **NEVER** invent file paths or code in the slice text.

## Attribution

Port of **`to-issues`** from [`mattpocock/skills`](https://github.com/mattpocock/skills)
by **Matt Pocock** (MIT). Changes by colenet: records slices as **Markdown in the repo**
instead of tracker issues; runs **AFK** (no granularity quiz); wired into the capd Main
Flow. See [`ATTRIBUTION.md`](../../ATTRIBUTION.md).
