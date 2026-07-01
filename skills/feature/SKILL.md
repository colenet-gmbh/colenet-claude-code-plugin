---
name: feature
description: Turns a sharpened idea into a durable, versioned feature spec — capd's single source of truth for one piece of work — as a Markdown file under docs/features/. Use when the user wants to write up a feature, capture requirements and acceptance criteria, draft a PRD or spec, or says "neues Feature", "Feature-Spec", "Anforderungen festhalten", "PRD", "schreib die Spec", "write the spec", or "turn this into a feature".
---

Turn the current, already-sharpened idea into a **feature spec**: one durable Markdown
file that is the single source of truth for this piece of work. The file lives in the
repo, is versioned with git, and **travels** through the rest of the workflow (`split` →
`build`) — so keep it readable and keep it current.

This is the PRD-level step of the capd workflow. It comes **after** alignment
(`brainstorm`, `grill-with-docs`) and **before** `split`.

## Where the spec lives

- Path: `docs/features/F<NNN>-<slug>.md` in the user's project (kebab-case slug).
- `<NNN>` is the next free three-digit number. Look at existing `docs/features/` files to
  find the highest and increment; if the directory is empty, start at `001`.
- The file's frontmatter carries a `status` field (`draft` → `ready` → `in-progress` →
  `done`). Path and status stay in sync as the work moves.

## How to write it

1. **Do not invent.** Draw the content from the current conversation, `CONTEXT.md`, and
   any ADRs. If a decision is missing or fuzzy, ask **one question at a time** with your
   recommended answer — or hand back to `grill-with-docs` to sharpen first.
2. Fill the spec using the template in
   [`references/feature-template.md`](references/feature-template.md). Keep every section
   concrete: numbered requirements, **Gherkin** acceptance criteria, an explicit data
   model and business rules where they apply.
3. Record notable choices in a **Decisions** section with a date; append to the
   **Change log** on every substantive edit.
4. Keep the prose lean. The spec is a working document, not a brochure.

## Completion criteria

The feature is ready to `split` when: purpose and actors are clear, requirements are
enumerated, acceptance criteria are written as Gherkin, open questions are resolved (or
listed explicitly), and `status: ready` is set. Then offer the next step: `split`.

## Rules

- **Markdown in the repo is the truth.** A ticket/tracker, if used, is an optional index
  that points back to this file — never the other way around.
- **Human in the loop.** You draft; the user approves the spec before it moves on.
- One feature per file. If the idea is really several features, say so and create one
  file each.

## Attribution

Synthesis by colenet of two external sources (both MIT):

- **`to-prd`** from [`mattpocock/skills`](https://github.com/mattpocock/skills) (Matt
  Pocock) — the "conversation → PRD" idea.
- The **traveling feature-file** convention (`docs/features/F###-slug.md`, with status in
  the path and frontmatter) from Michael Spanier's `kvjs-app` harness.

See [`ATTRIBUTION.md`](../../ATTRIBUTION.md).
