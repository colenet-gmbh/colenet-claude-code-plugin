# cape — Roadmap

Where cape is headed. Phase 1 is the current focus; the themes under "Next" are parallel
tracks whose order isn't fixed yet; "Later" is the horizon.

## Now — v1: consolidate the synthesis

**Goal:** one internally consistent version that **installs and is usable end to end**, taking
up all the relevant value from Michael Spanier's coding harness and all the value from Matt
Pocock's framework.

- **Installable & usable end to end.** Verify the real path: install the plugin from the
  marketplace, run `/cape:setup` in a fresh repo, confirm the vendored skills work flat and
  the scaffolded docs are right. (So far the sync mechanism is verified only in dev mode
  against the pre-rename cache.)
- **Extract the remaining value — the file sweeps.**
  - Spanier (`../kvjs-app/.claude/`, `docs/`, scripts), file by file: port / generalise /
    move into a repo `CLAUDE.md` / drop. (Spanier is colenet-internal — no attribution.)
  - Matt (`../skills/skills/`), file by file: what value each remaining skill holds and what
    we do with it. Already-adopted skills are listed in `ATTRIBUTION.md`.
- **`brainstorming` follow-up.** The superpowers skill as a whole was dropped (duplicates
  `grill-with-docs` + `feature`), but decide whether any part earns its own place: the
  scope-decompose heuristic, the "no code before an approved design" hard gate, the spec
  self-review checklist, the just-in-time visual companion.
- **Close the consistency-blocking questions.** Is `build`'s integrated review the same as
  `implement`'s review? The full list of onramps and where each joins the main flow; the
  incoming-queue concept.

## Next — development directions (after v1)

Parallel tracks; priority still to be set.

- **Clear rules.** First-class integration of directive-style coding rules (Spanier's terse,
  numbered CC-/PL- form) that the skills consult.
- **Blessed-stack support.** Deep, opinionated support for a **TypeScript frontend** and a
  **Rust backend**, while the generic path stays open for any stack.
- **Issue management → GitHub Issues.** `/cape:setup` currently hardcodes local files; make
  the tracker configurable and integrate GitHub Issues — real users' feedback will land
  there once cape is in use.
- **Solo-developer polish.** Round out the everyday experience for a single developer.
- **arc42 depth.** A solid template plus reliable fill-on-demand, in Spanier's terse,
  to-the-point style — no bla-bla.
- **Hooks, loops & guardrails.** The three-layer guardrail mechanics (hook → git hook → CI).
- **Repo-specific agent directives.** When a concrete project uses particular technologies or
  has its own conventions, a place to put them so the framework finds and uses them
  (per-directory `CLAUDE.md` / agent guidelines).
- **`grill-with-docs`, broader.** Seed and consult more than ADRs and the glossary — the
  wider project documentation.
- **Quality-keeping loops.** Recurring loops that keep aspects healthy over time — improve
  architecture, security, documentation consistency.
- **Deployment principles.** The framework needs *something* on deployment, but it's highly
  project-specific — start with principles only, not a concrete pipeline.

## Open questions — resolve as we go

Deliberately unresolved; decide with experience rather than up front.

- **Vertical vs horizontal slicing.** cape slices vertically today (`split` + `implement`
  per tracer-bullet issue); Spanier slices horizontally / by role at build time (data model
  first, then frontend) and had strong results with it. Gather experience, then: pick one,
  build both with a project-config preference, or find criteria for when each wins. Reading
  Spanier's `fullstack-orchestrator` closely feeds this.
- **Top-level `CONTEXT.md` map vs arc42 `00-index.md`.** Both are maps — draw the boundary
  cleanly (the top-level map spans all doc kinds; the arc42 index only the arc42 chapters).
- **Next review lenses.** After Architecture and Security, which lenses join
  `review-feature` / `review-implementation`? And wire `review-feature`'s Architecture axis
  onto `architect`'s review path.

## Later — cape for Teams

How several people work well on one product together. The team story is the next step beyond
the solo-and-single-repo focus above.
