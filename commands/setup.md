---
description: Set up cape in this repository — scaffold the docs the skills expect. Run once per repo.
allowed-tools: Bash, Read, Write, Edit, Glob
---

Set this repository up for cape.
This command **scaffolds** the durable docs the cape skills read and
write. Every step is **find-or-create** — never overwrite what already exists, so this is
safe to re-run and safe in a repo that already has some of these docs.

## 1. Scaffold the work board

The queue lives in the filesystem — the folder a file sits in is its state. Create the
columns if they're missing, keeping empty ones committable:

```bash
cd "${CLAUDE_PROJECT_DIR:-$PWD}"
for c in 01-backlog 02-development 03-approval 04-done out-of-scope; do
  mkdir -p "docs/work/$c" && [ -e "docs/work/$c/.gitkeep" ] || touch "docs/work/$c/.gitkeep"
done
[ -e docs/work/.next-id ] || printf '1\n' > docs/work/.next-id
```

(`out-of-scope/` holds `/triage`'s records of rejected enhancement requests. `.next-id`
holds the single shared item counter — see step 2.)

## 2. Record the issue tracker

The tracker choice will be configurable later; for now cape assumes **local files** on the
board above. `docs/agent-conventions/` holds project-specific directives that cape skills
look up — this is the first file in it. If `docs/agent-conventions/tracker.md` does **not**
exist, create it with:

```md
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
```

## 3. Context map, glossary & tiers

cape's `CONTEXT.md` is a **pointer map**: it names the project and points
at where the durable facts live.

1. **Domain glossary** — look for an existing one (`docs/arc42/08*.md`, or any
   `*glossary*.md` under `docs/`). If none exists, create
   `docs/arc42/08_crosscutting-concepts.md`:

   ```md
   # Crosscutting Concepts

   ## Domain glossary

   The project's ubiquitous language — one entry per term (concepts, actions, qualities).
   Seeded and sharpened during domain modelling.
   ```

2. **CONTEXT.md** — if a root `CONTEXT.md` is missing, create
   `CONTEXT.md`:

   Here is a template the locations of the context pointers are examples and recommendations.
   Try to locate the information in the repo and use these values, otherwise stick to the recommendations.

   ```md
   # {repo name} — Context

   THE central place to look up where things are.

   ## Context Pointers

   - **arc-docs** — `docs/arc42/` — the architecture documentation: goals, solution strategy, and the domain glossary (chapter 8 — the ubiquitous language)
   - **ADR-dir** — `docs/adr/` — one file per decision (arc42 chapter 9 only indexes them)
   - **conventions-dir** — `docs/agent-conventions/` — the central conventions (issue tracker, release process, …)
   - **handoff-dir** — `/tmp/cape-handoffs` — where session handoffs live

   ## Tiers

   A **tier** is a section of the tech stack with its own tech and rules (something like the frontend of an app).

   Tiers in this repo:
   {0..N  `- TIER one line per tier you detect (see below); the names are the repo's own, }
   or `- NONE` if the repo has none
   ```

   If `CONTEXT.md` already exists, make sure it carries all four labels resolved to their paths,
   and add any that are missing, so Cape can find each thing by its stable label. Resolve
   `handoff-dir` as in step 4 below and use that path.

3. **Tiers** — **detect** the repo's tiers and record them under `## Tiers`.
   Look for:
   workspace/monorepo config (`package.json` `workspaces`, `pnpm-workspace.yaml`, a Cargo
   workspace, nx/turbo), distinct top-level app/service/package directories, separate language
   roots (e.g. a TypeScript frontend beside a Rust backend), and any existing nested `CLAUDE.md`.
   Write each TIER as `- **Name** — path/   a few words describing what it is`.
   A single undifferentiated codebase has no tiers —> NONE.
   If the split is ambiguous, propose what you found and let the user confirm.

## 4. Handoff directory

Handoffs written by the `handoff` skill need a fixed spot that `CONTEXT.md` points at (the
`handoff-dir` label from step 3). `mkdir -p` a session-independent dir and use its path as
`handoff-dir`: `/tmp/cape-handoffs/` on Mac/Linux (the OS clears `/tmp` itself, so no cleanup
is needed), or a `%TEMP%`-based dir on Windows. Find-or-create: if `CONTEXT.md` already carries
a `handoff-dir`, leave it — never add a second.

## 5. Point CLAUDE.md at CONTEXT.md

Find-or-create the root `CLAUDE.md`; if it lacks this signpost, add it once (never duplicate):

> Read `CONTEXT.md` to locate central project files and directories unknown to you.

## 6. Done

Summarize what you actually did: e.g. board created, issue tracker recorded, `CONTEXT.md` + glossary in place,
handoff-dir created and pointed at from `CONTEXT.md`, `CLAUDE.md` signpost added — noting which were already
present and left untouched. Then offer to commit the changes.
