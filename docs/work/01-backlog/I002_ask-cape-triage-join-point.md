---
id: I002
type: issue
parent: none
blocked-by: []
priority: v1
---

# ask-cape names the triage join point precisely

## What to build

Fix the wording in `/ask-cape` (and, if needed, `/triage`) so the triage onramp's merge
point matches the skills' actual contracts:

- a triaged **single slice** becomes a written-out issue joining at `/implement`;
- a **feature-sized** triaged item enters the main flow via the grilling session triage
  already triggers, then `/feature` → `/split` → `/build`.

Remove the imprecise "triage → `/implement` or `/build` directly".

## Notes

- Pure wording, no mechanism change: triage triggering the grilling already *is* the main
  flow starting. Touches `skills_source/` — needs a plugin version bump when built.
