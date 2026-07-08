---
id: I001
type: issue
parent: none
blocked-by: []
priority: v1
---

# Review covers "Maximize Simplicity"

## What to build

Add a third axis, **Simplify**, to `/review-implementation` alongside Standards and Spec:
reuse (does this already exist elsewhere in the codebase?), simplification, efficiency, and
altitude (is the logic at the right level?). It applies at both scopes the skill runs at —
the per-issue diff and the integrated feature diff. Quality lens only; it does **not** hunt
for bugs (that stays with correctness review).

## Notes

- Overlaps partly with the Standards axis's Fowler baseline (Duplicated Code, Speculative
  Generality); the distinct additions are "already exists elsewhere?" and "right altitude?".
- Touches `skills_source/` (review-implementation) — needs a plugin version bump when built.
