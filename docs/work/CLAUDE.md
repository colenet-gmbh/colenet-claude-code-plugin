# Working on the board

Conventions for the work items under `docs/work/`. For the board mechanics — columns,
file naming, how state is a folder — see [`../agents/issue-tracker.md`](../agents/issue-tracker.md).
Terms (`Feature`, `Issue`, `Definition of Done`) are defined in the
[glossary](../arc42/12_glossary.md).

## What goes on the board

- **Features are framed as outcomes, never activities.** A feature names a desired
  end-state of cape — "cape has / contains / does X" — not the work to get there.
  "Extract the value from Spanier's harness" is *not* an item; the item is the feature
  *"cape contains the value-adding ideas from Spanier's approach"*, and the file sweep is
  a **job within** realizing it. Investigating, verifying, and porting are always jobs
  inside a feature, not their own item types.
- **A feature is big enough to split into several issues.** If a piece of work is a single
  grabbable slice, it is an **issue**, not a feature.
- **Questions get no board item.** A question that must be answered to realize a feature
  lives as an **open point inside that feature**, never as its own card.
- **Some features graduate into the Definition of Done.** Once reached, they become a
  standing invariant — e.g. "cape installs and is usable end to end": a later feature is
  only done when that state still holds.

## Columns are energy invested, not kind of work

The column an item sits in reflects **how much energy has gone into it**, not what type of
work it is:

- `01-backlog` — raw or merely under consideration. Incoming items *and*
  curated-but-not-yet-started features both wait here. Looking at an item, or evaluating it
  without producing a worked-up result, leaves it here — including the triage states
  `needs-triage` and `needs-info` (you are still waiting, nothing is carried forward yet).
- `02-development` — someone has produced a **result** by working it up: a triaged
  agent-ready brief, or a feature spec being written and built. Triaging, grilling,
  specifying, and building all belong here **once they yield something carried forward**.

So the **incoming queue *is* the backlog** — there is no separate inbox. An item moves to
`02-development` when work-up produces a result, not the moment you glance at it.

## Numbering and priority

- **The number is capture order, not priority.** `F007` was captured after `F006`; it says
  nothing about which is built first.
- **Priority is its own field** in the item's frontmatter, set and re-set independently of
  the id.
