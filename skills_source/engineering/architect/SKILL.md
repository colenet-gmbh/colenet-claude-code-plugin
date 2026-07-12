---
name: architect
description: Shape structure well and keep it clean — software/codebase design, domain modelling, arc42 documentation, and deepening an existing codebase. Activate when designing or restructuring a module's interface or seam, judging whether a design is good, pinning down domain terms or recording an ADR, writing architecture docs, or scanning a codebase for deepening opportunities — and when another skill needs any of these while it works. Several aspects can be active at once.
---

# Architect

**Architect** is a verb: to shape structure — and keep it clean. Structure shows up in more than one place, so this is not a single procedure but a set of **aspects** you activate when they're relevant. More than one can be active at once — designing a module while sharpening the domain term it's named after — and the set grows over time.

Activate an aspect by reading its file when the work calls for it.

The `CONTEXT.md` map (glossary, ADRs, arc42 pointers) should have been provided to you — run `/cape:setup` if it's missing.

## Aspects

- **Codebase design** — [codebase-design.md](codebase-design.md). The software design vocabulary and principles (deep modules at its core, room for more). Reach for it whenever you design or judge a module's interface, decide where a seam goes, or make code more testable. Techniques: deepening a cluster ([deep-modules-deepening.md](deep-modules-deepening.md)); exploring alternative interfaces ([design-it-twice.md](design-it-twice.md)).
- **Domain modelling** — [domain-modeling.md](domain-modeling.md). The active discipline of building and sharpening the domain model: challenge terms, invent scenarios, write the glossary and ADRs down the moment they crystallise. Formats: [context-format.md](context-format.md), [adr-format.md](adr-format.md).
- **arc42 documentation** — [arc42.md](arc42.md). Where architecture docs live and how to fill them lazily. The domain glossary (the ubiquitous language) is chapter 8; the documentation/tooling glossary is chapter 12; ADRs are chapter 9 (referenced from there).
- **Deepening an existing codebase** — [improve-codebase.md](improve-codebase.md). The deliberate review: scan for friction, present deepening candidates as a visual report, then grill through the one the user picks (report scaffold: [improve-codebase-report.md](improve-codebase-report.md)). Picking a candidate _generates an idea_ you can take into the main flow at `/grill-with-docs`.

## How it's reached

`architect` is model-invoked, so other skills activate it mid-work — `/tdd` reaches for the codebase-design aspect at a design decision; `/feature` and `/review-feature` draw on the same vocabulary for their architecture concerns. You can also invoke it by hand for deliberate architectural work — most often the deepening review.
