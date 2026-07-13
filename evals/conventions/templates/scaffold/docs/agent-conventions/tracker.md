# Issue tracker: local files

Issues live as markdown files in this repo, on the `docs/work/` board. No external tracker
yet — that choice will become configurable; for now it is local files.

## Board

Columns are folders; the folder a file sits in **is** its state:
`docs/work/01-backlog` → `02-development` → `03-approval` → `04-done`.

- Features: `docs/work/<column>/F<NNN>_<slug>.md`
- Issues: `docs/work/<column>/I<NNN>_<slug>.md`, carrying `parent: F<NNN>` and `blocked-by`.

## Numbering

`F`/`I` is a **type marker only**; the number is a **single shared counter** across both,
so no two items ever share a number. The next free number lives in `docs/work/.next-id`.
To create an item: read that file, use the number, write back the incremented value. The
number is capture order, not priority.

## "Publish to the issue tracker"

Write a new `F…`/`I…` file into the right column. Create nothing external.

## "Fetch the relevant issue"

Read the file by id or path (the user usually passes one directly). To change state, move
the file between columns.
