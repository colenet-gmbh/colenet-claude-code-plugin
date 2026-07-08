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

## Harness (three layers)

Everything that shapes how the agent works. It falls into three layers, and any
improvement belongs in the layer that owns it:

1. **Claude Code** itself — not ours to change.
2. **cape** — colenet's shared, curated baseline of skills, vendored into a repo. A
   vendored cape skill must **not** be quietly rebuilt locally (that forks it and loses
   updates); a genuinely general improvement is **graduated back into cape** instead.
3. **Project-specific working instructions** — the local layer: per-repo `CLAUDE.md`, the
   `docs/work/` board conventions, project directives. Where an improvement is
   project-specific, it belongs here.

## Definition of Done

The standing set of invariants a change must satisfy to be considered finished. Some
features graduate into it once reached: "cape installs and is usable end to end" becomes a
DoD invariant, so a new feature is only done when that state still holds.
