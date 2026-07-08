---
name: feature
description: Turn the grilled conversation into a reviewed, two-part feature spec — synthesis only, no fresh interview, reviewed until clean, then handed to /split.
disable-model-invocation: true
---

# Feature

Turn what you've already worked out — the grilled conversation and your codebase understanding — into a **reviewed feature spec**. Do NOT re-interview; the interview already happened in `/grill-with-docs`. Synthesise what you know.

Use the project's domain glossary throughout, and respect the ADRs in the area you're touching (locate both via the `CONTEXT.md` map).

The `CONTEXT.md` map and the `docs/work/` board should have been provided to you — run `/cape:setup` if they're missing.

## 1. Sketch the test seams

Sketch the seams at which the feature will be tested. Prefer existing seams to new ones, and the highest seam possible; the fewer across the codebase, the better — ideally one. If new seams are needed, propose them at the highest point. Check with the user that the seams match their expectations.

## 2. Write the spec

Write the spec in **two parts**, using the template below, into the feature's file `docs/work/02-development/F<id>_<slug>.md` — the two-part spec *is* that file. `/split` reads it from there.

- **Top — what & decisions, for human sign-off.** The requirements and the decisions a human should consciously approve before anything is built.
- **Bottom — how, the internal design for implementation.** Everything an agent needs to build it.

Do NOT include file paths or code snippets — they go stale fast. Exception: if a `/prototype` produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline the decision-rich part and note it came from a prototype.

```markdown
# TOP — What & Decisions (sign-off)

## Problem Statement
The problem the user faces, from the user's perspective.

## Solution
The solution, from the user's perspective.

## User Stories
A long, numbered list, extensive enough to cover every aspect of the feature:
1. As an <actor>, I want <feature>, so that <benefit>

## Business Rules
What the system must enforce or validate.

## Acceptance Criteria
Gherkin, Given/When/Then, per behaviour.

## Out of Scope
What this spec deliberately does not cover.

## Key Decisions
The architectural / implementation decisions a human should approve: modules built or modified, the interfaces that change, schema changes, API contracts, technical clarifications.

# BOTTOM — Internal Design (implementation)

## Domain & Data Model
Entities, relationships, schema — in the project's glossary vocabulary.

## Interfaces & API Contracts
The module interfaces and contracts the implementation will expose or consume.

## UI/UX
Screens, fields, validations, how the UI guides the user. (Omit if there's no UI.)

## Test Seams & System under Test
For each seam from step 1: the seam is the boundary you test *through*; the **system under test (SUT)** is what sits behind it — state explicitly what is **inside** the SUT (exercised by the test) and what is **outside** it (dependencies, collaborators, anything stubbed or left alone). A seam without its SUT doesn't define a test.

## Testing Decisions
What makes a good test here (behaviour, not implementation), which modules are tested, prior art in the codebase.

## Further Notes
Anything else worth recording.
```

## 3. Review until clean

Run `cape:review-feature` on the spec. It reviews across parallel axes (Architecture first, then Security, more as they're added), each in its own sub-agent.

**Loop until clean:** integrate every finding into the spec (HIGH/CRITICAL directly), then re-review — repeat until a review comes back clean. A finding is settled when it is fixed or consciously dismissed.

**Never change an existing acceptance criterion without asking the user.**

## 4. Sign-off

Present the finished spec, top part first, and get the user's sign-off on the key decisions before it goes to `cape:split`.
