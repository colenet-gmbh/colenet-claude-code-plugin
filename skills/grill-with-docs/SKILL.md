---
name: grill-with-docs
description: A relentless one-question-at-a-time interview that sharpens a plan or design AND builds durable docs as it goes — a CONTEXT.md glossary plus sparing ADRs. The alignment step of the capd Main Flow, after brainstorm and before feature; this is the HITL work. Use when the user wants to pin down terminology, harden a design, capture decisions, or says "grill with docs", "schärfen und dokumentieren", "Domänenmodell", "Glossar aufbauen", "ubiquitous language", "ADR", or "sharpen and document".
---

Sharpen the plan by interviewing the user relentlessly — **and** write down what gets
resolved, so it survives the session. This is the **alignment step** of the capd Main Flow
(after `brainstorm`, before `feature`) and the last big **HITL** stretch: once shared
understanding is reached, the flow can run AFK.

## Use what already exists

Before asking, read the project's existing documentation and reuse it — do not re-derive
what is already written: `CONTEXT.md` (glossary), the architecture docs (`docs/arc42/` or
whatever the project uses), and ADRs. Point questions at the gaps.

## Know the aspects of a feature

Sharpen toward a *complete* feature. capd's canonical definition of what a feature must
cover lives in `${CLAUDE_PLUGIN_ROOT}/skills/feature/references/feature-template.md` —
use it as the checklist of aspects to resolve (purpose, actors, requirements, business
rules, UI/UX, acceptance criteria, data model, interfaces, non-functional needs). This
skill stays agnostic; the *aspects* come from that reference.

## Run the interview

- Interview **one question at a time**, waiting for each answer — never batch. For each
  question, give your recommended answer and invite the user's.
- Walk down each branch of the decision tree, resolving dependencies one by one.
- If a question can be answered by reading the code or docs, do that instead of asking.

## Build the glossary (CONTEXT.md)

Maintain a `CONTEXT.md` glossary at the repo root — **glossary only**, no spec, no
implementation. Update it inline as terms crystallize; call out conflicts immediately.

## Record decisions (ADRs), sparingly

Write an ADR (in the architecture docs / `docs/adr/`) only when a decision is **hard to
reverse**, **surprising without context**, **and** a real trade-off.

## Completion

Done when shared understanding is reached, `CONTEXT.md` reflects the resolved terms, and
qualifying decisions have ADRs. Then offer the next step: `feature`.

## Attribution

Port of **`grill-with-docs`** (with the glossary/ADR discipline from **`domain-modeling`**)
from [`mattpocock/skills`](https://github.com/mattpocock/skills) by **Matt Pocock** (MIT).
Changes by colenet: German triggers; folded the grilling engine inline; reads existing docs
and the canonical feature aspects; wired into the capd Main Flow. See
[`ATTRIBUTION.md`](../../ATTRIBUTION.md).
