---
description: Set up cape in this repository — work through its themes (work tracking, documentation, orientation, status line). Run once per repo.
allowed-tools: Bash, Read, Write, Edit, Glob
---

Set this repository up for cape by working through four **themes**, scaffolding the docs and
config the skills read and write:

1. **Work tracking** — how work items are captured and moved.
2. **Documentation** — the durable knowledge: ubiquitous language and decisions.
3. **Orientation** — the context map that ties it together.
4. **Status line** (optional) — the live status bar in Claude Code.

Every step is **find-or-create** — never overwrite what exists, so it's safe to re-run.

## 1. Work tracking — board & issue tracker

The queue lives in the filesystem — the folder a file sits in is its state. Find-or-create the
five board columns under `docs/work/`, each with a `.gitkeep` so empty ones commit:
`01-backlog`, `02-development`, `03-approval`, `04-done`, and `out-of-scope` (which holds
`/triage`'s records of rejected enhancement requests). Also create `docs/work/.next-id`
holding `1` if it's missing — the single shared item counter.

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

## 2. Documentation — glossary & decisions

Two things are **essential**: the project's **ubiquitous language** (a domain glossary) and a
home for its **architecture decisions** (ADRs). Minimal is a glossary file plus an ADR
directory; it can grow into a full arc42 set. **Detect what already exists first** and reference it.

1. **Domain glossary** — look for an existing one (`docs/arc42/08*.md`, or any
   `*glossary*.md` under `docs/`). If none exists, create
   `docs/arc42/08_crosscutting-concepts.md`:

   ```md
   # Crosscutting Concepts

   ## Domain glossary

   The project's ubiquitous language — one entry per term (concepts, actions, qualities).
   Seeded and sharpened during domain modelling.
   ```

2. **ADR directory** — find-or-create the directory the map's `ADR-dir` label points at, with a `.gitkeep` so the empty directory commits.

## 3. Orientation — the context map

cape's `CONTEXT.md` is a **pointer map**: it points at where the durable facts live — the index that ties the other themes together.

1. **CONTEXT.md** — if a root `CONTEXT.md` is missing, create it. In the template below the
   pointer locations are examples and recommendations; try to locate each thing in the repo
   and use the real path, otherwise stick to the recommendation:

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

   If it already exists, only **top up** the labels it's missing — never rewrite resolved ones.

2. **Tiers** — **detect** the repo's tiers and record them under `## Tiers`. Look for:
   workspace/monorepo config (`package.json` `workspaces`, `pnpm-workspace.yaml`, a Cargo
   workspace, nx/turbo), distinct top-level app/service/package directories, separate language
   roots (e.g. a TypeScript frontend beside a Rust backend), and any existing nested `CLAUDE.md`.
   Write each TIER as `- **Name** — path/   a few words describing what it is`.
   A single undifferentiated codebase has no tiers → NONE.
   If the split is ambiguous, propose what you found and let the user confirm.

3. **Handoff directory** — handoffs written by the `handoff` skill need a fixed spot that
   `CONTEXT.md` points at (the `handoff-dir` label). `mkdir -p` a session-independent dir and
   use its path: `/tmp/cape-handoffs/` on Mac/Linux (the OS clears `/tmp` itself, so no cleanup
   is needed), or a `%TEMP%`-based dir on Windows. Find-or-create: if `CONTEXT.md` already
   carries a `handoff-dir`, leave it — never add a second.

4. **Point CLAUDE.md at CONTEXT.md** — find-or-create the root `CLAUDE.md`; if it lacks this
   signpost, add it once (never duplicate):

   > Read `CONTEXT.md` to locate central project files and directories unknown to you.

## 4. Status line

cape ships a simple (and project-extensible) Claude Code status line that helps working with multiple branches and keeping context usage and rate limits in sight. It is opt-in: ask whether to install it.

A plugin cannot ship the main `statusLine`, so setup installs it into the project:

1. Copy `${CLAUDE_PLUGIN_ROOT}/statusline/statusline.js` into the repo as
   `.claude/cape-statusline.js` — unless a copy is already there; don't clobber a customized one.

2. Wire it into `.claude/settings.json`
   - If it already has a `statusLine`, clarify the user's intent and proceed accordingly.
   - Otherwise add "statusLine" of type command and reference the copied
     cape-statusline.js using ${CLAUDE_PROJECT_DIR}
   - check for prerequisite Node.js

## Done

Summarize what you actually did, grouped by theme: work board & tracker, documentation
(glossary, ADR-dir), orientation (`CONTEXT.md` + tiers, handoff-dir, `CLAUDE.md` signpost),
status line (installed or skipped) — noting which were already present and left untouched.
Then offer to commit the changes.
