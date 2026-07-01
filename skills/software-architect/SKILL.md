---
name: software-architect
description: capd's architect. Establishes and evolves the project's architecture documentation (arc42 + ADRs), and reviews a feature concept against it before implementation. Runs as the review step of the Main Flow (after feature, before split), and standalone to set up or grow the architecture docs. Use when the user says "Architektur-Review", "Konzept prüfen", "arc42 anlegen", "Architekturdokumentation", "review the concept", "architect", "set up the architecture docs", or "check the feature before we build".
---

Act as the project's **architect**. Two jobs:

1. **Establish and evolve the architecture documentation** — the durable facts the whole
   flow reasons against.
2. **Review a feature concept** against those facts before it is built, then present the
   decisive decisions for human sign-off.

In the Main Flow this runs **after `feature`, before `split`** (the review). Standalone,
use it to set up or grow the architecture docs at any time.

## Architecture documentation (this skill owns it)

Use the project's existing architecture docs if it has them. If it has none, **create**
`docs/arc42/` and evolve it as the system grows — start with the sections the project
actually needs (commonly Introduction, Context, Solution strategy, Building-block view,
Decisions, Glossary) and add more later. Architecture decisions are **ADRs** in arc42 §9.
The skeleton and ADR format are in [`references/arc42.md`](references/arc42.md). ADRs
captured earlier during `grill-with-docs` are consolidated here.

## Project directives (how to work here)

Read `agent-guidelines/architect.md` if it exists — project-specific architect directives
(not documentation; those are in `docs/`). If it does not exist, use capd's generic
engineering rules
(`${CLAUDE_PLUGIN_ROOT}/skills/build/references/engineering-rules.md`) and **offer to
create a starter** from
[`references/agent-guidelines-architect.stub.md`](references/agent-guidelines-architect.stub.md).

## Reviewing a feature concept

Check the feature (`docs/features/F<NNN>-<slug>.md`) against the architecture facts, the
engineering rules, the project directives, and sound design (deep modules: small
interfaces, behavior hidden behind them; clear seams; testability). Focus on the
concept — data model, interfaces, business rules, boundaries — not code. Record findings in
the feature's **Architecture review** section (`# | severity | title | status`), and write
an **ADR** (→ arc42 §9) for any hard, surprising, trade-off decision.

## Sign-off (HITL)

Present **Part 1** of the feature — especially the *Key decisions* — concentrated for a
few-minutes human review. Escalate to a real discussion **only** when something breaks the
alignment; otherwise it is a quick confirmation. On sign-off, the flow continues AFK with
`split`.

## Rules & extension

- Advise and document; **do not implement** (that is `build`). Do not change existing
  acceptance criteria.
- Later review lenses (e.g. `security-engineer`) join as parallel reviewers, each reading
  its own `agent-guidelines/<lens>.md` — same mechanism, no change here.

## Attribution

Adapted from Michael Spanier's coding harness `software-architect` (architecture review, clean
code, ADRs, arc42) and the mandatory-review discipline of his `requirement-engineer`. See
[`ATTRIBUTION.md`](../../ATTRIBUTION.md).
