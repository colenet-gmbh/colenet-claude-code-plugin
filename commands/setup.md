---
description: Set up cape in this repository — vendor the harness skills into .claude/skills/ (flat, un-prefixed names) and scaffold the docs the skills expect (work board, issue tracker, CONTEXT.md, arc42 glossary). Run once per repo.
allowed-tools: Bash, Read, Write, Edit, Glob
---

Set this repository up for cape. Two parts: **vendor** the skills so they're callable
flat (`/ask-cape`, `/feature`, …), then **scaffold** the durable docs the workflow skills
read and write. Every step is **find-or-create** — never overwrite what already exists, so
this is safe to re-run and safe in a repo that already has some of these docs.

## 1. Vendor the skills

Locate the newest installed sync script in the plugin cache and run it against this repo:

```bash
SCRIPT="$(find "$HOME/.claude/plugins/cache" -type f -path "*/cape/*/scripts/sync-harness.sh" 2>/dev/null | sort -V | tail -1)"
[ -z "$SCRIPT" ] && { echo "cape not found in plugin cache — is the plugin installed?" >&2; exit 1; }
bash "$SCRIPT" "${CLAUDE_PROJECT_DIR:-$PWD}"
```

This copies the harness skills into `.claude/skills/` as flat project skills (including
`/update-cape`, which pulls newer versions later). Report what it synced.

## 2. Scaffold the work board

The queue lives in the filesystem — the folder a file sits in is its state. Create the
columns if they're missing, keeping empty ones committable:

```bash
cd "${CLAUDE_PROJECT_DIR:-$PWD}"
for c in 01-backlog 02-development 03-approval 04-done out-of-scope; do
  mkdir -p "docs/work/$c" && [ -e "docs/work/$c/.gitkeep" ] || touch "docs/work/$c/.gitkeep"
done
```

(`out-of-scope/` holds `/triage`'s records of rejected enhancement requests.)

## 3. Record the issue tracker

The tracker choice will be configurable later; for now cape assumes **local files** on the
board above. If `docs/agents/issue-tracker.md` does **not** exist, create it with:

```md
# Issue tracker: local files

Issues live as markdown files in this repo, on the `docs/work/` board. No external tracker
yet — that choice will become configurable; for now it is local files.

## Board

Columns are folders; the folder a file sits in **is** its state:
`docs/work/01-backlog` → `02-development` → `03-approval` → `04-done`.

- Features: `docs/work/<column>/F<NNN>_<slug>.md`
- Issues: `docs/work/<column>/I<NNN>_<slug>.md`, carrying `parent: F<NNN>` and `blocked-by`.

## "Publish to the issue tracker"

Write a new `F…`/`I…` file into the right column. Create nothing external.

## "Fetch the relevant issue"

Read the file by id or path (the user usually passes one directly). To change state, move
the file between columns.
```

## 4. Context map + glossary

cape's `CONTEXT.md` is a **pointer map**, not a glossary: it names the project and points
at where the durable facts live. The domain vocabulary lives in the arc42 glossary.

1. **Glossary** — look for an existing one (`docs/arc42/12_glossary.md`, or any
   `*glossary*.md` under `docs/`). If none exists, create `docs/arc42/12_glossary.md`:

   ```md
   # Glossary

   The project's ubiquitous language — one entry per term. Seeded and sharpened during
   `/grill-with-docs` and `/architect` domain modelling.
   ```

2. **CONTEXT.md** — if a root `CONTEXT.md` (or `CONTEXT-MAP.md`) is missing, create
   `CONTEXT.md` pointing at the glossary you found or created:

   ```md
   # {repo name} — Context

   {One sentence on what this project is.}

   ## Pointers

   - **Glossary** — [docs/arc42/12_glossary.md](docs/arc42/12_glossary.md) — the ubiquitous language.
   - **Architecture** — [docs/arc42/](docs/arc42/) — arc42 docs (domain model §8, decisions index §9).
   - **Decisions** — [docs/adr/](docs/adr/) — the ADRs, one file each.
   ```

   If `CONTEXT.md` already exists, leave it; just make sure it points at the glossary, and
   add the pointer if it's missing.

## 5. Done

Summarise: skills vendored (and the version), board created, issue tracker recorded,
`CONTEXT.md` + glossary in place — noting which were already present and left untouched.
Then remind the user to **review the git diff and commit it**, so the harness and its
scaffolding are pinned in the repo. The skills are now callable flat as `/skill-name`.
