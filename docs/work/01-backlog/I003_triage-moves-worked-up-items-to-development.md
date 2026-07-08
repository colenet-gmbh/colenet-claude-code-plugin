---
id: I003
type: issue
parent: none
blocked-by: []
priority: v1
---

# Triage moves worked-up items to 02-development

## What to build

Align `/triage` with the board-as-energy model (see `docs/work/CLAUDE.md`): an item that
triage works up into a **result** — a `ready-for-agent` agent-brief — moves from
`01-backlog` to `02-development`. Items merely under consideration (`needs-triage`,
`needs-info`) stay in `01-backlog`; `wontfix` goes to `04-done` / `out-of-scope` as today.

## Notes

- Touches `skills_source/` (triage) — needs a plugin version bump when built.
- Sibling of I002 (ask-cape's triage join wording); both make the triage onramp coherent.
