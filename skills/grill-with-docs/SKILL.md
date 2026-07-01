---
name: grill-with-docs
description: A relentless one-question-at-a-time interview that sharpens a plan or design AND builds durable docs as it goes — a CONTEXT.md glossary plus sparing ADRs. The alignment step of the capd workflow, after brainstorm and before feature. Use when the user wants to pin down terminology, harden a design, capture decisions, or says "grill with docs", "schärfen und dokumentieren", "Domänenmodell", "Glossar aufbauen", "ubiquitous language", "ADR", or "sharpen and document".
---

Sharpen the plan by interviewing the user relentlessly — **and** write down what gets
resolved, so the understanding survives the session. This is the **alignment step of the
capd workflow**, after `brainstorm` and before `feature`.

## Run the interview

- Interview **one question at a time**, waiting for each answer before the next — never
  batch. For each question, give your recommended answer and invite the user's.
- Walk down each branch of the decision tree, resolving dependencies one by one.
- If a question can be answered by exploring the codebase, explore it instead of asking.
  (This is capd's `grill-me` engine, applied with documentation.)

## Build the glossary (CONTEXT.md)

- Maintain a `CONTEXT.md` glossary at the repo root — **glossary only**, never a spec or
  scratchpad and no implementation details.
- Update it **inline** as terms crystallize; do not batch.
- Call out conflicts immediately: "Your glossary defines X as Y, but you seem to mean Z."

## Record decisions (ADRs), sparingly

Create an ADR in `docs/adr/` **only** when a decision is all three of:

1. **hard to reverse** (real cost to change later),
2. **surprising without context** (a future reader will ask "why this way?"), and
3. **the result of a real trade-off** (genuine alternatives existed).

## Completion

Done when shared understanding is reached, `CONTEXT.md` reflects the resolved terms, and
qualifying decisions have ADRs. Then offer the next step: `feature`.

## Attribution

Port of **`grill-with-docs`** (and the glossary/ADR discipline from **`domain-modeling`**)
from [`mattpocock/skills`](https://github.com/mattpocock/skills) by **Matt Pocock** (MIT).
Changes by colenet: added German trigger phrases; folded the grilling engine inline;
wired into the capd workflow. See [`ATTRIBUTION.md`](../../ATTRIBUTION.md).
