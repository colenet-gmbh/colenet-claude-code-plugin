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

### Glossary

"Glossary" alone is ambiguous — cape distinguishes three kinds. Name the kind whenever you
reference one.

| Concept | What it is |
|---|---|
| Domain glossary | the project's ubiquitous language — arc42 chapter 8. Reached via the `domain-glossary` pointer in `CONTEXT.md`. |
| Environment glossary | terms of the surroundings — documentation conventions, tooling — **not** the domain; arc42 chapter 12. Reached via the `environment-glossary` pointer in `CONTEXT.md`. |
| Skill glossary | the vocabulary needed to practice one particular skill; lives inside that skill and is linked directly (e.g. `writing-great-skills/GLOSSARY.md`, the software design glossary in `architect/codebase-design.md`, the topic glossaries `teach` generates). |

In a project with only one glossary, the `domain-glossary` and `environment-glossary`
pointers may target the same file.

### Work board

| Concept | What it is |
|---|---|
| Feature | a desired outcome, big enough to split into several issues. |
| Issue | one independently-grabbable, vertically-sliced part of a feature. |
| Board | `docs/work/` — columns are folders; the column a file sits in **is** its state: backlog → development → approval → done. |
| Definition of Done | the standing invariants a change must meet to be finished. |

A **Feature** is realized by splitting it into **Issues**; each Issue is built and reviewed;
the whole is finished when it meets the **Definition of Done**. Features are files
`F<NNN>_<slug>.md`, issues `I<NNN>_<slug>.md` (carrying `parent: F<NNN>` and `blocked-by`);
the IDs are identifiers, not workflow positions.

### Review & gates

| Concept | What it is |
|---|---|
| review | an internal quality-assurance step by agent lenses *within* `02-development`, each lens in its own sub-agent (`review-feature`: Architecture, Security; `review-implementation`: Standards, Spec). Not a board state. |
| sign-off | the human approving the **concept** — after the review, before building. A gate within development, not a board state. |
| approval | the human approving the **built result** — the `03-approval` gate, before `04-done`. The human's broad judgment on the delivered feature. |
| acceptance criteria | the machine-verified yardstick (Gherkin, written in `feature`, verified by tests in `build`) — "did we build it right". Distinct from *approval*, the human's broader "did we build the right thing". |

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

"Workflow" is used as a synonym. The skills that make up the flow are the **workflow
skills** (`grill-with-docs`, `feature`, `split`, `implement`/`build`); standalone skills
off it (e.g. `grill-me`, `prototype`, `handoff`) are **utility skills**. The canonical,
always-current description of the flow — order, branches, and how the skills hand off —
lives in the `ask-cape` router; don't restate the chain elsewhere, point to it. (Never
call it a "spine" — jargon.)

Not all steps are needed in every case. E.g. for small issues:
Idea created as issues -> `triage` → `grill-with-docs` → `implement`

### HITL & AFK

| Concept | What it is |
|---|---|
| HITL — human-in-the-loop | the human contributes decisively: an active dialogue, one question at a time with a recommended answer, aimed at reaching human↔agent alignment efficiently, or helping the human reach their own clarity. `grill-with-docs` (and standalone `grill-me`) are HITL. |
| AFK — away-from-keyboard | the agent works autonomously for a long stretch; the human returns only at consequence boundaries or when the agent genuinely escalates. `feature`, `split`, `implement`, and `build` run AFK. |

The Main Flow is designed as one long HITL stretch, then one long AFK one.

### Project artefacts

| Concept | What it is |
|---|---|
| coding standards | whatever the repo documents about how code should be written — e.g. `CODING_STANDARDS.md` or `CONTRIBUTING.md`. `review-implementation`'s Standards axis judges the built code against them. |
| architecture documentation (arc42) | the durable **facts** the architect reasons against — the project's existing docs, or an [arc42](https://arc42.org) structure that `architect` creates and evolves lazily (a small project may only ever fill chapters 1, 8, 9, and 12). ADRs live in arc42 chapter 9, under the ADR-dir. Distinct from `docs/work/` (per-feature specs and issues). |
