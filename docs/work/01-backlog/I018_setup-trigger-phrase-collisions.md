---
id: I018
type: issue
parent: none
blocked-by: []
priority: next
---

# Setup detects trigger-phrase collisions with installed skills

## What to build

`/setup` checks whether skills are already installed (e.g. from superpowers) whose
trigger-phrases overlap with cape's skills, and surfaces the collisions instead of letting
them pass silently. On a collision it drives a deliberate resolution rather than ignoring it.

## Notes

- Depends on the `setup` skill, which is still planned — not blocked by another board item,
  so `blocked-by: []`.
- Open point (part of this issue): *how* to handle a collision — warn / prioritise /
  namespace / put it to the user to resolve. Decide the approach before building.
- Origin: raised 2026-07-08.
