---
name: split
description: Breaks a feature spec into independently buildable, dependency-ordered vertical slices (tracer bullets) — recorded as Markdown in the repo, not in a tracker. The decomposition step of the capd spine, after feature and before build. Use when the user wants to slice a feature into tasks, plan the build order, or says "split", "in Slices zerlegen", "Feature aufteilen", "Tasks schneiden", "vertical slices", or "break this down".
---

Break a feature spec into small, independently buildable pieces. This is the
**decomposition step of the capd spine**, after `feature` and before `build`.

## Read the source

Read the feature spec (`docs/features/F<NNN>-<slug>.md`), plus `CONTEXT.md` and any ADRs
in the touched area. Use the project's own glossary vocabulary.

## Draft vertical slices (tracer bullets)

- Each slice is a **thin vertical slice** cutting end-to-end through **all** layers
  (data, logic, interface, tests) — **not** a horizontal layer.
- Each completed slice is **demoable and verifiable on its own**.
- Do prefactoring first: *make the change easy, then make the easy change.*

## Quiz the user

Present the breakdown as a numbered list. Per slice: a short **title**, what it delivers,
and **blocked-by** dependencies. Ask — one question at a time — whether the granularity
is right and the dependencies are correct. Iterate until the user approves.

## Record the slices as Markdown

Ground truth is the repo, not a tracker. Record the approved slices in **dependency
order** in a `## Slices` section of the feature file (or as child files
`docs/features/F<NNN>-<slug>/S<NN>-<slug>.md`). Per slice write:

- **What to build** — the end-to-end behavior (no file paths or code snippets; they go stale).
- **Acceptance criteria** — as a checklist / Gherkin.
- **Blocked by** — the slices it depends on, or "none — can start immediately".

A ticket/tracker, if the team uses one, is an **optional index** pointing back to these files.

## Completion

Done when ordered, approved slices are recorded and the feature `status` is `ready` (or
`in-progress`). Then offer the next step: `build`, one slice at a time.

## Rules

- **NEVER** slice horizontally (all of one layer as a "slice").
- **NEVER** invent file paths or code in the slice text.

## Attribution

Port of **`to-issues`** from [`mattpocock/skills`](https://github.com/mattpocock/skills)
by **Matt Pocock** (MIT). Changes by colenet: records slices as **Markdown in the repo**
(capd's ground truth) instead of publishing to an issue tracker; added German triggers;
wired into the capd spine. See [`ATTRIBUTION.md`](../../ATTRIBUTION.md).
