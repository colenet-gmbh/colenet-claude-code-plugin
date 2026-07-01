---
name: ask-capd
description: Routes to the right capd skill and explains the Main Flow, its HITL/AFK rhythm, and the feature board. Use when the user is unsure which capd skill fits, wants an overview of capd, or says "ask capd", "was kann capd", "welcher Skill", "wie fange ich an", "capd help", or "guide me".
---

Help the user find the right capd skill and move along the Main Flow. Read where they are
(which board column their feature is in), then recommend and offer the single next step.

## The Main Flow

One guided path from idea to shipped slice, tracked on a file board in `docs/features/`
(`01-backlog → 02-development → 03-approval → 04-done`). Full mechanics — board, IDs,
HITL/AFK, and the terms — are in [`references/main-flow.md`](references/main-flow.md).

The steps (all within `02-development` until build finishes):

1. **`brainstorm`** (HITL) — shape the fuzzy idea.
2. **`grill-with-docs`** (HITL) — sharpen it; build `CONTEXT.md` + ADRs. Ends the HITL stretch.
3. **`feature`** (AFK) — synthesize the two-part feature spec.
4. **`software-architect`** (AFK) — **review** the concept; findings + ADRs.
5. **sign-off** (HITL) — you approve the concept before building.
6. **`split`** (AFK) — decompose into vertical slices.
7. **`build`** (AFK) — implement test-first, then move the feature to `03-approval`.
8. **approval** (HITL) — you approve the built result; it moves to `04-done`.

## Utility skills (anytime, off the Main Flow)

- **`grill-me`** — stress-test any plan or decision; no codebase needed.

## How to route

- Point the user to the step that matches their feature's column, and **offer to start it**.
- The rhythm is one long **HITL** stretch (1–2), then a long **AFK** stretch (3–8) with two
  human gates: **sign-off** (concept) and **approval** (result).
- If they are mid-flow, name the next step rather than restarting.

## Attribution

Original colenet skill. The router pattern is inspired by **`ask-matt`** from
[`mattpocock/skills`](https://github.com/mattpocock/skills) (Matt Pocock, MIT); no content
was copied. See [`ATTRIBUTION.md`](../../ATTRIBUTION.md).
