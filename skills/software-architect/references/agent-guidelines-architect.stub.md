# Architect guidelines (starter)

> Starter for a project's `agent-guidelines/architect.md`. `software-architect` offers to
> create this when it is missing. These are **directives for the agent** when it works
> architecturally (in `feature`, `software-architect`, and `build`) — not documentation of
> the system (that lives in `docs/`). Keep it short and specific to this project; delete
> what does not apply and add what does. It grows over time.

## Patterns to follow

- <e.g. "state lives in the store, components stay presentational">
- <e.g. "all external input is validated at the boundary">

## Things to watch for in this project

- <e.g. "multi-tenant: every query must be tenant-scoped">
- <e.g. "these modules are load-bearing — change their interfaces cautiously">

## Boundaries & deep modules

- <e.g. "the payment adapter is the only place that talks to the provider SDK">

## Local conventions beyond the generic capd engineering rules

- <e.g. "errors surfaced to users go through the `AppError` hierarchy">

<!-- The generic floor (test-first, extract-till-you-drop, strict typing, explicit
     authorization, …) is always in force via capd's engineering rules; list here only what
     is specific to THIS project. -->
