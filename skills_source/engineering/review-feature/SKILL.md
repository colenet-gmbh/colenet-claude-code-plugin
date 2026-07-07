---
name: review-feature
description: Review a feature spec along parallel axes — Architecture (does the design fit this codebase's structure, boundaries, and ADRs?) and Security (OWASP, access control, data protection, data minimisation) — extensible with further axes. Runs each axis in its own sub-agent and reports them side by side. Use when a feature spec needs reviewing before it's split into issues, or when the feature step needs its design reviewed.
---

Multi-axis review of a **feature spec** — a design, not yet code. Each axis runs as a **parallel sub-agent** so they don't pollute each other's context; then this skill aggregates their findings. This is the design-side twin of `/review-implementation` (which reviews the code diff).

The axes are **extensible** — add more as the project needs them. Realise them in this order; **Architecture is the first and always runs**.

## Axes

### Architecture (first axis)

Does the design fit the codebase it lands in? Module boundaries and responsibilities, data-flow and hook architecture, dependencies, schema/collection design, and consistency with the existing structure and the ADRs (via the `CONTEXT.md` map). If the `/architect` skill exposes an architecture-review path, this axis uses it.

### Security

OWASP findings, access control, data protection / privacy, data minimisation.

## Process

### 1. Locate the spec

Use the spec path the caller passed, or the feature file in `docs/work/02-development/` (`F<id>_<slug>.md`). Confirm it resolves and is non-empty before spawning sub-agents.

### 2. Spawn one sub-agent per active axis, in parallel

Send a single message with one `Agent` tool call per axis. Use the `general-purpose` sub-agent for each. Give each sub-agent the spec and its axis brief:

- **Architecture brief:** "Report where the design fights this codebase: misplaced responsibilities, boundary violations, dependency tangles, schema/interface designs that will be hard to change, and anything that contradicts a documented ADR. Cite the spec section for each finding. Rank HIGH/CRITICAL first. Under 400 words."
- **Security brief:** "Report security and data-protection risks in the design: OWASP-class issues, missing access control, privacy/data-minimisation problems. Cite the spec section for each finding. Rank HIGH/CRITICAL first. Under 400 words."

### 3. Aggregate

Present one heading per axis, findings verbatim or lightly cleaned, HIGH/CRITICAL first **within** each axis. Do not merge or rerank across axes — keep them separate so one axis can't mask another. End with a one-line summary: findings per axis and the worst issue within each.

The caller (`/feature`) integrates the findings and re-reviews in a loop until clean.
