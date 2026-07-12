# Crosscutting Concepts

## Domain glossary

cape's domain is the **harness** itself — the machinery of agentic product engineering in
teams. This is its ubiquitous language: the terms (concepts, actions, qualities — not just
entities) and how they relate. The three layers that frame it (Level 1 / 2 / 3) are in
[chapter 1](01_introduction-and-goals.md).

### Skills

| Concept | What it is |
|---|---|
| Skill | cape's unit of capability — `skills_source/<bucket>/<name>/SKILL.md`, loaded as `cape:<name>`. |
| Bucket | a group of skills (engineering, meta, utility); each is a path in the manifest's `skills` array. |
| Model-invokable | a skill the model may auto-trigger; a skill with `disable-model-invocation: true` is named only in `ask-cape` (ADR 0003). |

### Work board

| Concept | What it is |
|---|---|
| Feature | a desired outcome, big enough to split into several issues. |
| Issue | one independently-grabbable, vertically-sliced part of a feature. |
| Board | `docs/work/` — columns are folders; the column a file sits in **is** its state: backlog → development → approval → done. |
| Definition of Done | the standing invariants a change must meet to be finished. |

A **Feature** is realized by splitting it into **Issues**; each Issue is built and reviewed;
the whole is finished when it meets the **Definition of Done**.

### Conventions

| Concept | What it is |
|---|---|
| Convention | a rule for how work is done here that a skill must respect. |
| Local convention | belongs to a place in the code — a **tier** — and lives in that tier's nested `CLAUDE.md`. |
| Central convention | belongs nowhere in particular; lives in `docs/agent-conventions/`, reached by a stable path. |
| Tier | a section of the stack with its own tech and rules (frontend, backend, …) — the technical axis. |
| Bounded context | a domain boundary with its own language — the domain axis. |

A vertical slice crosses several **tiers** and few **bounded contexts**. A skill consults the
conventions of the tiers it touches (local) plus the central ones — situationally, via cape's
progressive-disclosure strategy (chapter 4).

### The flow

Idea → `grill-with-docs` → `feature` → `split` → `build` (each issue via `implement`, then
reviewed). `ask-cape` is the map over the skills.
