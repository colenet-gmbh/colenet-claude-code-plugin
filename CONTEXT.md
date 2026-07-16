# cape — Context

cape (Colenet Agentic Product Engineering) — colenet's Claude Code harness of composable
skills for agentic product engineering in teams.

## Pointers

- **arc-docs** — `docs/arc42/` — the architecture documentation: goals, solution strategy, and the domain glossary (chapter 8 — the ubiquitous language).
- **ADR-dir** — `docs/adr/` — one file per decision (arc42 chapter 9 only indexes them).
- **conventions-dir** — `docs/agent-conventions/` — the central conventions (issue tracker, release process, …).
- **handoff-dir** — `/tmp/cape-handoffs/` — where session handoffs live, session-independent so a later session finds them by a stable path (the `handoff` skill writes here). OS-dependent, set by `/cape:setup`; reconfigure by editing this line.

## Tiers

None — cape is a skills-and-docs repo; it has no code tiers with their own nested `CLAUDE.md`.
