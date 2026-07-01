# Feature spec — canonical structure

This is capd's canonical definition of **what a feature is**. `feature` produces a file in
this shape; `grill-with-docs` uses it to know which aspects to clarify; `review` checks it.

The file is deliberately **two-part**: Part 1 is the human review surface — concentrated,
value-oriented, reviewable in a few minutes. Part 2 is the implementation surface for the
agents that build it. The HITL check after `feature`/`review` presents **Part 1**.

Rules that always hold:

- **No file paths or code snippets in prose** — they go stale. Exception: a small snippet
  that encodes a decision more precisely than prose (a schema, a type shape, a state
  machine), trimmed to the decision-rich part.
- **Existing acceptance criteria are never changed without asking the user.**
- One feature per file. Path: `docs/features/F<NNN>-<slug>.md`. Delete sections that
  genuinely do not apply.

```markdown
---
id: F<NNN>
slug: <kebab-case-slug>
status: development   # backlog | development | approval | done
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
---

# F<NNN> — <Feature title>

<!-- ── PART 1 — CONCEPT (human review surface; this is what the HITL check presents) ── -->

## Purpose & context
Why this exists, from the user's perspective. Legal/regulatory basis if relevant.

## Actors
Who interacts with it (roles, systems).

## Requirements / user stories
Numbered. `US-NN: As <actor>, I want <capability>, so that <benefit>.`

## Business rules
`GR-NN` — constraints the system must enforce. Omit if none.

## UI / UX behavior
Key screens, states, interactions. Omit if not user-facing.

## Acceptance criteria
Gherkin: **Given** … **when** … **then** …

## Key decisions
The decisive choices and trade-offs made while defining this feature (incl. a summary of
the architecture review). This is the focus of the human sign-off.

## Out of scope
What this feature explicitly does not cover.

## Non-functional requirements
`NFA-NN` — accessibility (e.g. BITV/WCAG), performance, quality. Omit if none apply.

<!-- ── HITL check on Part 1 → sign-off → the rest runs AFK ── -->

<!-- ── PART 2 — IMPLEMENTATION GUIDANCE (for the agents that build it) ── -->

## Data model
Entities, fields, relationships that change or appear.

## API / interfaces
Interface/contract design. Behavior, not file paths.

## Testing decisions & seams
Where the feature is tested. Prefer existing seams; use the highest seam possible; the
fewer, the better (ideal: one). What makes a good test here.

## Architecture review
Findings from `review` (architect lens): `# | severity | title | status`. Link ADRs.

## Slices
Filled by `split`: dependency-ordered vertical slices (tracer bullets), each with its own
acceptance criteria and blocked-by.

## Change log
| Date | Change |
|------|--------|
| <YYYY-MM-DD> | Created |
```
