---
id: I020
type: issue
parent: none
blocked-by: []
priority: next
status: ready-for-agent
---

# Board IDs use one shared counter across F and I, stored in a file

## Problem

Item numbers drifted into two parallel sequences: features ran `F001…F015`, issues ran
`I001…I005`. There was no source of truth for "the next number" — `docs/agents/issue-tracker.md`
and `docs/work/CLAUDE.md` only said *"the number is capture order"*, and the number was
derived ad hoc by scanning existing IDs per prefix, so `I001…I005` collided with `F001…F005`.

## Desired outcome

The prefix (`F`/`I`) marks **type only**; the number comes from **one shared counter** whose
source of truth is a file, `docs/work/.next-id` (mirrors how Spanier's framework keeps the
counter). No two board items ever share a number, regardless of prefix. Because numbers are
handed out in capture order, a higher number always means "captured later".

## Decisions (locked)

- **The counter lives in a file:** `docs/work/.next-id`, holding the next free integer.
  Chosen over a derived max-scan for explicitness, matching Spanier's approach. Name
  `.next-id` (not `.counter`).
- **`/cape:setup` must create `.next-id`** when it scaffolds `docs/work/`, seeded to the
  first free number (`1` for a fresh repo).
- **All existing items were renumbered** chronologically by file creation timestamp,
  including the `04-done` items — done as part of this issue (see below).

## Realization

- [x] Renumber every board item into one sequence by birth timestamp (F015 kept its number;
  everything else shifted). `id:` frontmatter updated to match each new filename.
- [ ] Create `docs/work/.next-id` in this repo, seeded to the next free number.
- [ ] State the rule in `docs/work/CLAUDE.md` (Numbering section) and
  `docs/agents/issue-tracker.md`: prefix = type; number = the shared counter read from
  `docs/work/.next-id`, which is incremented on every new item.
- [ ] Update `/cape:setup` (`commands/setup.md` / `scripts/sync-harness.sh`) to create
  `docs/work/.next-id` seeded to `1` when it scaffolds the work board. This touches
  plugin-shipping files → bump `plugin.json` version per the release rules.

## Notes

- The `docs/work/CLAUDE.md:42` numbering example (`F006`/`F007`) still reads correctly: under
  chronological numbering "captured after" is now guaranteed by the number order.
- Trade-off accepted: a file is a second thing to keep in sync, and a stale `.next-id` could
  reintroduce collisions. Mitigate by always reading-then-incrementing the file on capture.
