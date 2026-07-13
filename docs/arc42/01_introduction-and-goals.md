# Introduction and Goals

## What cape is

cape (Colenet Agentic Product Engineering) is colenet's Claude Code harness of composable
skills for agentic product engineering in teams. It is a **Level-2 framework**: a
project-independent core a team brings into any project and adapts there. It sits between two
other layers of the harness.

| Layer | What it is | Owned by |
|---|---|---|
| Level 1 | Claude Code — the vendor harness | Anthropic (not ours to change) |
| **Level 2** | **cape** — the shared, curated baseline of skills | colenet (reused across projects) |
| Level 3 | a project's own rules, conventions, stack, ways of working | each project |

## The core goal

A bespoke Level-3 harness fits its project perfectly but cannot be reused; a Level-2 framework
is reusable but generic. cape's defining goal is to be **both at once**:

> A Level-2 framework must reach the same **progressive-disclosure quality** as a bespoke
> Level-3 harness — surfacing the *specifically relevant* project rules into the model's
> context, at the right moment, as well as a hand-built harness would. As few as possible, as
> many as necessary.

This is the tension **reusability vs. fit**, made concrete. cape resolves it by baking the
*method* (its skills) and letting each project supply the *specifics* (its rules), which the
skills consult situationally instead of having them hard-wired.

## Quality goals

| Priority | Goal | What it means |
|---|---|---|
| 1 | Progressive-disclosure quality | The relevant project rules reach the model; the irrelevant don't dilute it. A generic framework matches a bespoke harness's fit. |
| 2 | Reusability | One curated core, brought to any project and updated centrally — never forked per project. |
| 3 | Verifiability | cape is prompt-shaped software; its behaviour claims are proven by evals, not asserted. |

## Stakeholders

| Role | Who | Expectation |
|---|---|---|
| Guardian | cape maintainers | Keep the red thread; veto drift from the mission. |
| Teams | colenet engineering teams | Bring cape into a project, adapt it, get Level-3-quality generically. |
| Scrum Masters | per team | Steward how their team uses and extends cape. |
