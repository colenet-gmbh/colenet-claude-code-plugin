---
name: split
description: Break a reviewed feature spec into independently-grabbable, vertically-sliced issues — each a tracer bullet with its own test seam and system under test, written out for /implement to pick up.
disable-model-invocation: true
---

# Split

Break a reviewed feature spec (the file `docs/work/02-development/F<id>_<slug>.md`) into **independently-grabbable issues**, each a **tracer-bullet vertical slice**.

Use the domain glossary for titles and descriptions, and respect the ADRs in the area you're touching (locate both via the `CONTEXT.md` map).

The `CONTEXT.md` map and the `docs/work/` board should have been provided to you — run `/cape:setup` if they're missing.

## 1. Read the spec

Read the two-part spec — work from it and the conversation. If the user passes a spec path, use that.

## 2. Look for prefactoring

Explore the codebase for prefactoring that makes the slices easier: **"make the change easy, then make the easy change."** Any prefactoring goes first, as its own slice(s).

## 3. Draft vertical slices

Break the spec into **tracer-bullet** issues. Each slice:

- cuts through **all** layers end-to-end (schema, API, UI, tests) — a thin but COMPLETE path, never a horizontal slice of one layer;
- is demoable or verifiable on its own;
- names its **test seam and system under test (SUT)** — the boundary it is tested *through*, and what is **inside** the SUT versus **outside** it. A seam without its SUT doesn't define a test.
- names the **tiers (and bounded contexts) it touches** — chosen from the `## Tiers` list in `CONTEXT.md` (the canonical set of tiers; prose, no schema) — so `/implement` reads exactly those tiers' `CLAUDE.md` up front.

**Wide refactors are the exception to vertical slicing.** A **wide refactor** is one mechanical change — rename a column, retype a shared symbol — whose **blast radius** fans across the whole codebase, so a single edit breaks thousands of call sites at once and no vertical slice can land green. Don't force it into a tracer bullet; sequence it as **expand–contract**:

- **Expand** — add the new form beside the old so nothing breaks. Its own issue, blocks the rest.
- **Migrate** — move the call sites over in batches sized by blast radius (per package, per directory), each batch its own issue `blocked-by` the expand, keeping CI green batch to batch because the old form still exists.
- **Contract** — delete the old form once no caller remains, in a final issue `blocked-by` every migrate batch.

When even the batches can't stay green alone, keep the sequence but let them share an integration branch, and add a final integrate-and-verify issue `blocked-by` all of them — green is promised only there.

## 4. Quiz the user

Present the breakdown as a numbered list. Per slice show **Title**, **Blocked by**, and **User stories covered**. Ask: is the granularity right (too coarse / too fine)? Are the dependencies correct? Should any slices be merged or split further? Iterate until the user approves.

## 5. Write the issues out

Write each approved slice out as its own issue file `docs/work/02-development/I<id>_<slug>.md`, using the template below, in **dependency order** (blockers first) so "Blocked by" can reference real ids. Each issue carries `parent: F<id>` (the feature it came from) and `blocked-by: [I<id>, …]`. A written-out issue plus its parent feature spec is exactly `/implement`'s contract — so this is the input `/implement` picks up.

Publishing to an external issue tracker is deferred (roadmap A). For now the queue lives in the filesystem: issues wander through `docs/work/01-backlog → 02-development → 03-approval → 04-done`.

```markdown
---
parent: F<id>
blocked-by: [I<id>, …]   # sibling issue ids, or [] if none
---

## What to build
The end-to-end behaviour of this vertical slice — not layer-by-layer implementation. No file paths or code snippets (they go stale). Exception: a prototype snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape) — inline the decision-rich part and note it came from a prototype.

## Tiers & contexts touched
The tiers (and bounded contexts) this slice touches, named from the `## Tiers` list in `CONTEXT.md` — e.g. "frontend and backend". `/implement` reads their `CLAUDE.md` before acting.

## Test seam & SUT
The seam this slice is tested through, and what is inside versus outside its system under test.

## Acceptance criteria
- [ ] Criterion 1
- [ ] Criterion 2
```

Do NOT modify the parent feature file when writing issues.
