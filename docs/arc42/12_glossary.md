# Glossary

The project's ubiquitous language — one entry per term. Seeded and sharpened during
`/grill-with-docs` and `/architect` domain modelling.

## Feature

A desired **end-state** of cape — phrased as an outcome ("cape has / contains / does X"),
never as an activity. A feature is big enough that realizing it means several issues.
Investigating, verifying, and porting are **jobs within** realizing a feature, not
separate work items. Some features, once reached, graduate into the Definition of Done as
a standing invariant (see [Definition of Done](#definition-of-done)).

## Issue

One independently-grabbable **vertical slice** of a feature's realization — a tracer
bullet through all layers, with its own test seam. The unit `/implement` picks up.

## Convention

A rule for how work is done in this repo that a cape skill must respect to do its job
well. A convention is in cape's scope **only** when honouring it improves the output
quality of some skill — a rule no skill needs to work better is not cape's concern. Every
convention cape cares about is either **local** or **central**:

- **Local convention** — belongs to a place in the code and lives there, in that place's
  nested `CLAUDE.md`. The place is usually a **tier** (a section of the stack with its own
  tech and rules, e.g. frontend or backend). Examples: frontend styling, a tier's test
  practice.
- **Central convention** — belongs to no single place, so it lives centrally in
  `docs/agent-conventions/`, reachable by a stable path. Examples: which issue tracker is
  used, the release process, the review checklist.

## Harness (three layers)

Everything that shapes how the agent works. It falls into three layers, and any
improvement belongs in the layer that owns it:

1. **Claude Code** itself — not ours to change.
2. **cape** — colenet's shared, curated baseline of skills, loaded from the installed
   plugin as `cape:<name>`. A cape skill must **not** be quietly rebuilt locally (that forks
   it and loses updates); a genuinely general improvement is **graduated back into cape**
   instead.
3. **Project-specific working instructions** — the local layer: per-repo `CLAUDE.md`, the
   `docs/work/` board conventions, project directives. Where an improvement is
   project-specific, it belongs here.

## Definition of Done

The standing set of invariants a change must satisfy to be considered finished. Some
features graduate into it once reached: "cape installs and is usable end to end" becomes a
DoD invariant, so a new feature is only done when that state still holds.
