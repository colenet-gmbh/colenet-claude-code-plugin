# arc42 Documentation

Maintain the project's architecture documentation in the **arc42** structure. arc42 is the *container*; fill it **lazily** — only what's decided, only when it's decided — and let the depth scale with the size of the system. A small project may only ever have chapters 1, 8, 9, and 12.

## The twelve chapters

Files live under `docs/arc42/`, one per chapter, plus an index:

| # | Chapter | Holds |
|---|---|---|
| 00 | Index | the map over the chapters (`00-index.md`) |
| 01 | Introduction & Goals | requirements, quality goals, stakeholders |
| 02 | Constraints | technical and organisational constraints |
| 03 | Context & Scope | system boundary, external interfaces |
| 04 | Solution Strategy | the key decisions in one place, briefly |
| 05 | Building Block View | static decomposition into modules |
| 06 | Runtime View | how the blocks collaborate at runtime |
| 07 | Deployment View | infrastructure and mapping onto it |
| 08 | Crosscutting Concepts | the **domain glossary** (the ubiquitous language) lives here, plus recurring patterns |
| 09 | Architecture Decisions | references all **ADRs** in `docs/adr/` |
| 10 | Quality Requirements | quality tree and scenarios |
| 11 | Risks & Technical Debt | known risks, debt |
| 12 | Glossary | the **documentation & tooling** glossary — the surroundings, **not** the domain |

## How it wires into the other aspects

- **Domain glossary** — the ubiquitous language, from the domain-modeling aspect → chapter 8 (`08_crosscutting-concepts.md`).
- **Glossary** — documentation & tooling terms, not the domain → chapter 12, as `12_glossary.md`.
- **ADRs** → live in their own `docs/adr/` directory, one file per decision. Chapter 9 does **not** copy them — it simply **references all ADRs in `docs/adr/`**.

Important arc42 chapters may split their content into sub-files named `NN-x_topic.md` (chapter number + sub-index + slug); the chapter's main file links to them. The top-level `CONTEXT.md` map does not hold this content — it points to where each thing lives.

## Filling it

- Create a chapter file only when you have something to write for it — don't scaffold empty chapters.
- Keep entries terse. arc42 is a reference, not a narrative.
- Seed the cheap early chapters during the interview (`/grill-with-docs`): chapter 1 Goals, chapter 2 Constraints, chapter 8 domain glossary.
- When a decision is hard to reverse, surprising without context, and the result of a real trade-off, record it as an ADR under `docs/adr/` (see [adr-format.md](adr-format.md)); chapter 9 references the directory.
