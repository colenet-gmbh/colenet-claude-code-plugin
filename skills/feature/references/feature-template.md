# Feature spec template

Copy this into `docs/features/F<NNN>-<slug>.md` and fill it in. Keep every section
concrete and lean. Delete sections that genuinely do not apply.

```markdown
---
id: F<NNN>
slug: <kebab-case-slug>
status: draft   # draft → ready → in-progress → done
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
---

# F<NNN> — <Feature title>

## Purpose
Why this feature exists, from the user's perspective. One short paragraph.

## Actors
Who interacts with it (roles, systems).

## Requirements
Numbered, testable requirements.

1. …
2. …

## Data model
Entities, fields, relationships that change or appear. Omit if none.

## Business rules
Constraints and rules that must hold. Omit if none.

## UI / UX
Key screens, states, and interactions. Omit if not user-facing.

## Acceptance criteria
Written as Gherkin.

- **Given** … **when** … **then** …

## Decisions
Notable choices with a date and a one-line rationale. Link to ADRs in `docs/adr/` for
hard-to-reverse ones.

## Out of scope
What this feature explicitly does not cover.

## Slices
Filled in by `split`: dependency-ordered vertical slices.

## Change log
| Date | Change |
|------|--------|
| <YYYY-MM-DD> | Created |
```
