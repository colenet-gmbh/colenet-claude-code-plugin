---
name: build
description: Orchestrate building a whole feature — drive its issues to done, one /implement per issue in its own fresh context, spinning off new issues as they surface, then review the integrated result.
disable-model-invocation: true
---

# Build

Orchestrate the build of a **whole feature**: its reviewed spec (`docs/work/02-development/F<id>_<slug>.md`) plus the written-out issues on the board (`docs/work/02-development/I<id>_<slug>.md`, `parent: F<id>`). You are the **orchestrator** — you drive the issues to done; you do **not** implement them yourself.

Run `/build` in a **fresh context** (a new session, not the planning thread that produced the spec). Read the spec and the issue set first. Use the domain glossary and respect the ADRs in the area (via the `CONTEXT.md` map).

The `CONTEXT.md` map and the `docs/work/` board should have been provided to you — run `/cape:setup` if they're missing.

## Drive the issues to done

Work the issues in **dependency order** — an issue's "Blocked by" must be done first. For each issue:

- Dispatch it to **`cape:implement` in its own fresh context** (a sub-agent), handing it the one written-out issue plus the parent feature spec — never your live orchestration thread. `/implement` runs `/tdd` and loops `/review-implementation` until clean, then commits. When it's clean, move the issue file to `docs/work/04-done/`.
- When a completed issue **surfaces work that wasn't planned**, split it off **dynamically**: write the new issue out (same shape as the other issues), slot it into the dependency order, and drive it too. This dynamic spin-off is what makes the orchestrator more than a fixed batch.

Independent, unblocked issues may run concurrently — but only where they don't touch the same code; otherwise drive them one at a time.

**Never change an existing acceptance criterion or test without asking the user.** This binds every dispatched sub-agent too.

## Review the integrated result

Per-issue review already happened inside each `/implement`. Once all issues are done, review the **integrated feature** as a whole: run `cape:review-implementation` over the full feature diff — it covers Standards and Spec (does the integrated result match the feature spec?). **Loop until clean**, dispatching any fixes as issues.

(Open: whether the feature-level review should become its own thing, distinct from the per-issue review. For now it is the same skill at feature scope.)

## Close out

Run the project's quality gate — build, lint, full test suite (the exact commands live in the project's `CLAUDE.md`). When the gate is green **and** the integrated review is clean, move the feature file to **`docs/work/03-approval/`** and present it to the user for sign-off — summarise what was built, the issues completed, and anything new that surfaced. The human moving it to **`docs/work/04-done/`** (or approving) is what makes the feature truly done; you stop at `03-approval`.
