---
name: feature
description: Synthesizes the already-sharpened understanding into a durable, versioned feature spec — capd's single source of truth for one piece of work. Runs after grill-with-docs, AFK (synthesis, no interview). Use when the user wants to write up a feature, capture requirements and acceptance criteria, draft a PRD or spec, or says "neues Feature", "Feature-Spec", "Anforderungen festhalten", "PRD", "schreib die Spec", "write the spec", or "turn this into a feature".
---

Turn the **already-sharpened** understanding into a **feature spec**: one durable Markdown
file that is the single source of truth for this piece of work. This is the PRD-level step
of the capd Main Flow — it runs **after** `brainstorm`/`grill-with-docs` and **before** the
`software-architect` review.

**AFK — synthesis, not interview.** Do not re-interview the user. Synthesize what was
already resolved in `grill-with-docs` (plus `CONTEXT.md`, ADRs, existing docs) into the
spec. Only if writing it down reveals a genuine gap, escalate that one question back.

## Where it lives

The feature lives at `docs/features/02-development/F<NNN>-<slug>.md` (it moved there from
`01-backlog/` when work started). IDs come from `_counter.txt`; the **folder is the state**
and `status` mirrors it (`backlog | development | approval | done`). See the board mechanics
in `${CLAUDE_PLUGIN_ROOT}/skills/ask-capd/references/main-flow.md`. If this idea has no file
yet, create one with the next `_counter.txt` number.

## What to write

Fill the spec using the canonical structure in
[`references/feature-template.md`](references/feature-template.md). It is deliberately
**two-part**:

- **Part 1 — Concept:** purpose, actors, requirements (US-NN), business rules (GR-NN),
  UI/UX, Gherkin acceptance criteria, **key decisions**, out of scope, non-functional
  requirements. This is the human review surface.
- **Part 2 — Implementation guidance:** data model, API/interfaces, testing decisions &
  seams, and (filled later by `split`) slices. This is the agents' build surface.

When designing Part 2 (data model, interfaces), load the project's architectural directives
if present: `agent-guidelines/architect.md`.

## Rules

- **Markdown in the repo is the truth.** A tracker, if used, is an optional index.
- **No file paths or code in prose** — they go stale. Exception: a small snippet that
  encodes a decision precisely (schema, type shape, state machine), trimmed.
- **Never change existing acceptance criteria** without asking the user.

## Completion

Ready when Part 1 is complete and Part 2 has the data/interface/testing decisions, and open
questions are resolved or listed. Then offer the next step: the `software-architect` review.

## Attribution

Synthesis by colenet: the feature aspects and the mandatory-review discipline are adapted
from Michael Spanier's coding harness `requirement-engineer`; the "conversation → PRD, no
interview" and no-paths-in-prose rules from Matt Pocock's `to-prd` (MIT). See
[`ATTRIBUTION.md`](../../ATTRIBUTION.md).
