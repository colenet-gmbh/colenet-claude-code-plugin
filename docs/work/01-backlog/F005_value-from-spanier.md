---
id: F005
type: feature
priority: v1
---

# cape contains the value-adding ideas from Michael Spanier's coding harness

## Outcome

cape has absorbed everything worth keeping from Spanier's Claude Code harness — nothing
valuable is left behind. Spanier is colenet-internal, so no external attribution is
required.

## Realization job

Sweep `../kvjs-app/.claude/` (plus its `docs/` and scripts) file by file. For each file
decide: port into a cape skill, generalise into a repo `CLAUDE.md`, or drop. Each concrete
adoption becomes an issue of this feature as it surfaces.

## Open points

- **Vertical vs horizontal slicing.** cape slices vertically today (`/split` + `/implement`
  per tracer-bullet issue); Spanier slices horizontally / by role at build time (data model
  first, then frontend) with strong results. Reading his `fullstack-orchestrator` closely
  feeds the decision: pick one, support both via a project-config preference, or find
  criteria for when each wins.

## Notes

- Value that is real but too project-specific stays in the user's local `.claude/`, not in
  cape (guardian rule).
