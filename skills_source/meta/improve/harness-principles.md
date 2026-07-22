# Harness principles

Reference for the `improve` skill: the layer model, the principles, and a few recipes used
when building a project harness on top of cape. Read it to pick measures that fix the root
cause on the right layer.

## Glossary

**Harness** - Supporting structure in the form of prompts, tools, skills, hooks that enable an LLM to effectively act as an agent.

**Level 1 harness** - the vendor harness (like Claude Code). Provides builtin prompts, tools and contains lots of Level 3 "callbacks" so you can customize the behavior (e.g. reading CLAUDE.md).

**Level 2 harness** — project and context-independent framework (e.g. cape), a curated set of skills, configurations, usage principles and workflows.

**Level 3 harness** — the project-specific configuration, e.g. project-level skills, CLAUDE.md contents, coding guidelines, claude or git hooks, etc. All the "stuff" you add to improve the performance of the coding agent in THIS project.

## Principles

### Progressive disclosure

The leading principle. Surface only the rules that matter, at the moment they matter — as
few as possible, as many as necessary. Most "the agent didn't have X when it decided"
frictions are disclosure gaps: the fix is to make X reach the model at the right point — a
sharper pointer, the right placement, a `CONTEXT.md` entry, local vs. central. How the docs
are structured, what `CONTEXT.md` points at, and where a rule lives all follow from this.

### cape is shared

Your focus is the Level 3 harness of your project, utilizing Level 2 and Level 1 capabilities.
cape skills are not yours to modify — a genuinely general improvement becomes a proposal to
the cape community (a GitHub issue against the cape repository), never a local change.

### Proportionality

Size the measure to the problem; reach for the lightest apparatus that fits. A one-line
clarification for a wording gap; a new skill only for a *recurring* pattern, never a single
case.

### No guardrail without a signpost

A guardrail is a check that ideally never fires; it only backs up guidance that already
tells the right way. Never add a hard check without first adding — or confirming — the
guidance it enforces.

### Prefer committable solutions

A committed fix benefits every user of the repo. Prefer a change to a shared, committed
harness element over a personal note; use memory only for individual interaction
preferences, never to steer process.

## Recipes

### Three-layer guardrail

Enforce the same rule at three escalating stages:

1. Claude Code hook — before the action.
2. git hook (`pre-commit`) — before the commit.
3. CI — before the merge.

### Canary

To check that a structured procedure was actually followed — not just nominally run — hide
a **canary** inside it and verify its presence afterwards. Example: a deploy script takes a
parameter whose correct value is only discoverable by reading the deployment guide; a run
without it reveals the guide was skipped.

### Graduate a feedback

A `feedback` memory is a sign friction happened — read it as input, never write your result
back to memory. Because feedbacks are individual, their home is the harness: move the lesson
into a committed harness element (a convention, a skill edit, a guardrail) and delete the
memory.
