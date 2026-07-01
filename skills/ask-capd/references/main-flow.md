# The capd Main Flow

One guided path from an idea to a shipped slice. It runs in two modes and is tracked on a
simple file-based board in the project's `docs/features/`.

## Two modes

- **HITL** (human-in-the-loop) — the human contributes decisively. An active dialogue, one
  question at a time with a recommended answer, aimed at reaching human↔agent alignment
  efficiently, or helping the human reach their own clarity.
- **AFK** (away-from-keyboard) — the agent works autonomously for a long stretch. The human
  only returns at consequence boundaries (PR/merge) or when the agent genuinely escalates.

The flow is designed as **one long HITL stretch, then one long AFK stretch**, with human
gates only where they add decisive value.

## The board (`docs/features/`)

The **folders are the columns** — one `ls` shows exactly the features in that state,
nothing else:

```text
docs/features/
  _counter.txt        # last assigned feature number
  01-backlog/         # raw external inputs, unrefined, as they arrive
  02-development/     # energy is being invested — the Main Flow runs here
  03-approval/        # built, awaiting the human's approval of the result
  04-done/            # approved — the pile, out of the way
```

- **IDs (`F<NNN>`)** are assigned in **arrival order** via `_counter.txt` (read → increment
  → create `F<NNN>-<slug>.md` → write back, in one commit). The ID is a stable identifier,
  **not** a workflow position — the **folder** gives the position. F007 and F041 can both
  sit in `02-development/`; that is normal.
- **State = folder** (single source of truth). A transition is a `git mv` into the next
  column; the agent does this during the AFK run. The frontmatter `status` mirrors the
  folder, updated in the same move-commit, so a file read alone still describes itself.
- **Backlog → development** the moment work starts (first `brainstorm`/`grill-with-docs`).

## The steps

| # | Step (skill) | Mode | Column | What |
|---|---|---|---|---|
| 1 | `brainstorm` | HITL | 02-development | shape the fuzzy idea |
| 2 | `grill-with-docs` | HITL | 02-development | sharpen relentlessly; build `CONTEXT.md` + ADRs |
| 3 | `feature` | AFK | 02-development | synthesize the two-part feature spec |
| 4 | `software-architect` (**review**) | AFK | 02-development | architecture review of the concept → findings + ADRs |
| 5 | **sign-off** | HITL | 02-development | human approves the *concept* before building |
| 6 | `split` | AFK | 02-development | decompose into vertical slices |
| 7 | `build` | AFK | 02-development → 03-approval | implement each slice test-first, then move to approval |
| 8 | **approval** | HITL | 03-approval → 04-done | human approves the *built result* |

## Terms (see also `GLOSSARY.md`)

- **review** — an internal QA step by an agent lens *within* development (architecture now;
  code review and security later, then automated). Not a board state.
- **sign-off** — the human approving the **concept** (step 5), before building.
- **approval** — the human approving the **built result** (step 8), the `03-approval` gate.
- **acceptance criteria** — the machine-verified yardstick (Gherkin) written in `feature`;
  verified by tests in `build`. Distinct from *approval*, which is the human's broader
  judgment on the delivered feature.
