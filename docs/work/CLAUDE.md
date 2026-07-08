# Working on the board

Conventions for the work items under `docs/work/`. For the board mechanics — columns,
file naming, how state is a folder — see [`../agents/issue-tracker.md`](../agents/issue-tracker.md).
Terms (`Feature`, `Issue`, `Definition of Done`) are defined in the glossary (locate via CONTEXT.md).

Board items as internal working material that is not shipped with the plugin may be written in German.

## What goes on the board

- **Features are framed as outcomes, not activities.** Investigating, verifying, adding something or porting are jobs inside a feature, not some type of issue.
- **A feature is big enough to split into several issues.** If a piece of work is a single
  grabbable slice, it is an **issue**, not a feature.
- **Questions get no board item.** A question that must be answered to realize a feature
  lives as an **open point inside that feature**, never as its own card.

## Columns are energy invested, not kind of work

The column an item sits in reflects **how much energy has gone into it**, not what type of
work it is:

- `01-backlog` — raw or merely under consideration. Incoming items *and*
  created-but-not-thought-through items both sit here. Looking at an item, or evaluating it
  without producing a worked-up result, leaves it here — including the triage states
  `needs-triage` and `needs-info` (you are still waiting, nothing is carried forward yet).
- `02-development` — someone has produced an intermediate **result** by putting effort into it: a triaged
  agent-ready brief, or a feature spec being written and built. Triaging, grilling,
  specifying, and building all belong here **once they yield something carried forward**.
- `03-approval` — the agent is convinced nothing needs to be done anymore. It is up to the user to make a final decision whether the item is done (HITL).
- `04-done` — items where NOTHING remains to be done. ALL necessary energy has gone into them.

## Numbering and priority

- The number is capture order, not priority.
- We may use the priority field in frontmatter to assign some rough priority like (now, next, later or a release in the roadmap).
