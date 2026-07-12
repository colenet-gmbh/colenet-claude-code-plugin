---
name: research
description: Delegate reading legwork to a background agent — investigate a question against high-trust primary sources (official docs, source code, specs, first-party APIs) and leave the findings as a cited Markdown note in the repo. Use when engineering work needs docs, API, or codebase facts gathered before building, or the user says "recherchiere das", "schau in den Docs nach", "lies dich in X ein", "research this", "gather the facts on", "read up on". For a broad, multi-source web report with adversarial fact-checking, reach for deep-research instead; cape:research is the lighter, repo-bound feeder that leaves a note behind.
---

# Research

Spin up a **background agent** to do the research, so you keep working while it reads.

Its job:

1. Investigate the question against **primary sources** — official docs, source code,
   specs, first-party APIs — not a secondary write-up of them. Follow every claim back to
   the source that owns it.
2. Write the findings to a single Markdown file, **citing each claim's source** (link or
   exact path). A claim without a traceable source doesn't go in the note.
3. Save it where the repo already keeps such notes. Locate that place via `CONTEXT.md`
   (the docs map `/cape:setup` scaffolds) — the research area it points to under `docs/`.
   If `CONTEXT.md` names no such place, put it somewhere sensible under `docs/` and say
   where.

## Attribution

Ported from Matt Pocock's [`research`](https://github.com/mattpocock/skills) skill
(v1.1.0, MIT). See [`ATTRIBUTION.md`](../../../ATTRIBUTION.md).
