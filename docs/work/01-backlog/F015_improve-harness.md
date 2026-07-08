---
id: F015
type: feature
priority: next
---

# cape can improve the harness from real usage — /improve-harness

## Outcome

There is a skill, `/improve-harness`, callable at **any time**. It looks at the last flow
or the current session, spots potential to improve the harness, and applies the improvement
at the **right layer** — preferring the local project layer over mutating cape-provided
skills.

## Layer discipline (the defining constraint)

Every improvement is placed in the correct harness layer (see the
[glossary](../arc42/12_glossary.md) — "Harness (three layers)"):

- **Claude Code** — not ours to change.
- **cape** — never quietly rebuild a vendored cape skill locally (that forks it and loses
  updates); a genuinely general improvement is **graduated back into cape**.
- **Project-specific working instructions** (local layer, e.g. `docs/work/`, per-repo
  `CLAUDE.md`) — prefer improving here when the improvement is project-specific.

## Realization job

- Design how the skill reads the last flow / current session and surfaces improvement
  candidates.
- Design the layer-routing: detect which layer an improvement belongs to, and route
  local-vs-graduate-to-cape accordingly.

## Open points / sources

- **Fabian** has built something like this — reference his approach.
- **Pascal** has a similar thing in OpenBrain — reference that.
- Attribution: if any adopted source turns out external (non-colenet), credit it per
  `ATTRIBUTION.md`.
- Keep the boundary clean vs `/architect` deepening (improves the **codebase**) and F013
  quality-keeping loops (keep the **codebase** healthy): `/improve-harness` targets the
  **harness itself**, not the product code.
