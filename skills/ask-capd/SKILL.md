---
name: ask-capd
description: Routes to the right capd skill and walks the capd workflow from idea to built slice. Use when the user is unsure which capd skill fits, wants an overview of capd, or says "ask capd", "was kann capd", "welcher Skill", "wie fange ich an", "capd help", or "guide me".
---

Help the user find the right capd skill and move along the workflow. Read where they are,
then recommend and offer the single next step.

## The workflow — from idea to built slice

1. **`brainstorm`** — the idea is still fuzzy; open it up, explore approaches, shape a design.
2. **`grill-with-docs`** — sharpen the design one question at a time and capture a
   `CONTEXT.md` glossary + ADRs.
3. **`feature`** — write the durable feature spec (`docs/features/F<NNN>-<slug>.md`), the
   single source of truth.
4. **`split`** — break the feature into dependency-ordered vertical slices.
5. **`build`** — implement one slice, test-first, then commit.

## Utility skills (anytime, outside the workflow)

- **`grill-me`** — stress-test any plan or decision; no codebase needed.

## How to route

- Point the user to the step that matches their state, and **offer to start it**.
- Keep context hygiene: sharpen up front (steps 1–3), then build slice by slice (step 5).
- If they are mid-workflow, name the next step rather than restarting.

## Attribution

Original colenet skill. The router pattern is inspired by **`ask-matt`** from
[`mattpocock/skills`](https://github.com/mattpocock/skills) (Matt Pocock, MIT); no content
was copied. See [`ATTRIBUTION.md`](../../ATTRIBUTION.md).
