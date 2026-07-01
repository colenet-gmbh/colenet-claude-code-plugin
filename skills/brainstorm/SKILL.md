---
name: brainstorm
description: Refines a rough idea into a fully-formed design before any code — one question at a time, exploring alternatives, validating the design in sections. The first step of the capd workflow. Use at the start of new work, when an idea is still fuzzy, or when the user says "brainstorm", "lass uns spinnen", "Idee durchdenken", "Konzept entwickeln", "design this", or "think this through". Skip for clear, mechanical tasks.
---

Turn a rough idea into a fully-formed design through collaborative dialogue. This is the
**first step of the Main Flow** and pure **HITL** — you and the user converge together.
When work starts on a raw `docs/features/01-backlog/` item, move it into `02-development/`.

## Understand the idea

- First look at the current project state (relevant files, docs, recent commits).
- Ask questions **one at a time** — never batch them. Prefer multiple-choice questions
  where possible; open-ended is fine too.
- Focus on purpose, constraints, and success criteria.

## Explore approaches

- Propose **2–3 different approaches** with their trade-offs.
- Lead with your recommended option and explain why. Invite the user's view.

## Present the design

- Once you understand what you're building, present the design in **sections of ~200–300
  words**. After each section, ask whether it looks right so far.
- Cover architecture, components, data flow, error handling, and how it will be tested.
- Be ready to go back and clarify when something doesn't fit.
- Apply **YAGNI ruthlessly** — strip features the idea doesn't actually need.

## Capture and hand off

- Capture the validated design as a short sketch — either notes to carry forward, or a
  durable `docs/plans/YYYY-MM-DD-<topic>-design.md` if the user wants one.
- Then offer the next workflow step: `grill-with-docs` to sharpen it and build the glossary
  and ADRs, or `feature` to write the spec directly.

## Rules

- **ALWAYS** one question at a time. **ALWAYS** explore alternatives before settling.
- **ALWAYS** validate the design in sections; be flexible and revisit.
- **NEVER** use this during clear mechanical processes — just do those.

## Attribution

Port of **`brainstorming`** from [`superpowers`](https://github.com/obra/superpowers) by
**Jesse Vincent** (MIT). Changes by colenet: added German trigger phrases; removed
references to superpowers-internal skills and wired the hand-off into the capd workflow.
See [`ATTRIBUTION.md`](../../ATTRIBUTION.md).
