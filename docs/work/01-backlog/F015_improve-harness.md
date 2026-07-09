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

## Knowledge the skill draws on — glossary + strategy files

`/improve-harness` should not carry improvement recipes in its own head. It maintains a
small knowledge base it consults when it decides *how* to strengthen the harness:

- a **glossary** (shared harness vocabulary), and
- one **strategy file per recurring improvement pattern** — e.g. guardrails, quality loops.

The reactive principle: strategies are **documented, not pre-implemented**. Nothing here
gets built upfront. Only when we notice the harness does not grip somewhere does
`/improve-harness` reach for the matching strategy and apply it at the right layer.

### Seed strategy: three-layer guardrails (absorbed from F009)

The first strategy file. Content, from concrete research:

- **Three layers, same rule enforced at each:** Claude Code hook → git hook → CI. Layer 2
  (git hook) and layer 3 (CI) are **off-the-shelf** — `pre-commit` and GitHub Actions,
  already in use in this very repo (`.pre-commit-config.yaml`, `validate.yml`). Nothing to
  invent there; a project just wires them up.
- **Only layer 1 (the Claude Code hook) is the cape-shaped piece.** Adopt the *pattern*,
  not project-specific checks: a PreToolUse Bash hook that filters on `git commit`, inspects
  the staged files, and **warns only — does not block** (visible before the commit lives).
  Working reference: Spanier's `block-thumbnail-check.sh` (PreToolUse) and
  `migrate-reminder.sh` (PostToolUse) in `kvjs-app/.claude/hooks/`. Their *content* is
  project-specific (block thumbnails, Payload migrations), so cape ships the pattern only.

## Realization job

- Design how the skill reads the last flow / current session and surfaces improvement
  candidates.
- Design the layer-routing: detect which layer an improvement belongs to, and route
  local-vs-graduate-to-cape accordingly.
- Design the glossary + strategy-file structure, and seed it with the guardrail strategy
  above.

## Open points / sources

- **Fabian** has built something like this — reference his approach.
- **Pascal** has a similar thing in OpenBrain — reference that.
- Attribution: if any adopted source turns out external (non-colenet), credit it per
  `ATTRIBUTION.md`.
- Keep the boundary clean vs `/architect` deepening (improves the **codebase**) and F013
  quality-keeping loops (keep the **codebase** healthy): `/improve-harness` targets the
  **harness itself**, not the product code.
