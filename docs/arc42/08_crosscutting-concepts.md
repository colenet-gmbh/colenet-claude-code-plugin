# Crosscutting Concepts

## Domain glossary

cape's domain is the **harness** itself — the machinery of agentic product engineering in
teams. This is its ubiquitous language: the terms (concepts, actions, qualities — not just
entities) and how they relate. The three layers that frame it (Level 1 / 2 / 3) are in
[chapter 1](01_introduction-and-goals.md).

### Skill

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

### Convention

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

### Guardrail

A guardrail is a quality-assurance measure that, ideally, never fires. The metaphor is the
crash barrier on a road: it saves you from the worse consequences of a mishap, but hitting one
is never routine — it is an alarming event. For any behaviour we want, a **convention** already
prescribes it; the guardrail is only the detection that trips when the convention was not
followed anyway. It therefore presupposes a convention — it is the backstop, never a
replacement for the instruction that comes first.

Guardrails take several forms, for example:

- a **hook** that enforces or checks something (e.g. a PreToolUse hook that warns before a
  commit),
- a **review loop** or an **independent, topic-specific review** that acts as a check on one
  defined concern.

Because a guardrail firing is not routine, in a continuously improving framework each firing
is a signal to improve the framework — strengthen the convention (or the harness) so that the
same guardrail need not trip again.

### Handoff

| Concept | What it is |
|---|---|
| Handoff | The process of handing over some aspect of work to a different session. |
| Handoff document | the document that carries the information transferred from one session to another (often informally called handoff). |
| Handoff-dir | the session-independent directory handoff documents live in; a `CONTEXT.md` pointer |

The handoff is typically initiated by a user triggering the `handoff` skill. This skill writes a
**Handoff document** to the **Handoff-dir**. The document is shortly afterwards read by another session. In the new session a short hint like `Read the handoff regarding xyz` is enough to locate the handoff document.
Handoff documents older than 24h may be considered stale and safely removed. Cleaning the dir regularly makes it easier for sessions to locate the appropriate handoff document.
A **Handoff** document should have an easy-to-identify topic-slug filename, so that a handoff can be found quickly looking at the handoff dir contents.

### Main Flow

The main steps an idea goes through on its way from ideation to becoming part of the finished product. Cape supplies user-invoked skills for each step of the main flow.

Idea created as feature → `triage` →  `grill-with-docs` → `feature` → `split` into multiple issues → `build` (each issue via `implement`).

Not all steps are needed in every case. E.g. for small issues:
Idea created as issues -> `triage` → `grill-with-docs` → `implement`
