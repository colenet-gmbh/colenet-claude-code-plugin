---
name: implement
description: Build a single, written-out issue in a fresh context — TDD at the seams, then review. Use when handed one specced issue to implement, or when another skill dispatches an issue to be built.
---

Implement the one issue you've been handed — the file `docs/work/02-development/I<id>_<slug>.md`. Your input is that **written-out issue plus its spec** (the parent feature `F<id>` if it has one; otherwise the issue is its own spec) — never a live planning thread. You always start in a **fresh context**.

The `docs/work/` board should have been provided to you — run `/cape:setup` if it's missing.

Before you plan or act, read the conventions of every **tier the issue names** (`/split` records the touched tiers in the issue). Resolve each named tier to its conventional `CLAUDE.md` position — the `CLAUDE.md` in that tier's own directory — and read it. There is no separate tier index to look up; the directory's `CLAUDE.md` is the convention's home.

Consult the **union** of the named tiers' conventions up front and let them shape **every** decision — including choices you make *before* you touch that tier's files (a colour, an id scheme, a shape decided in one tier but realised first in another). Claude Code loads a tier's `CLAUDE.md` on its own only once you edit a file in its subtree, which is too late for a decision taken earlier; reading the named tiers yourself, up front, closes that gap. Consult **only** the tiers the issue names — never pull in conventions of tiers it does not touch. When you dispatch a sub-agent to build part of the issue, it carries the same obligation: it consults the named tiers' conventions before it acts.

Use `cape:tdd` where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite before you review.

Once done, review the work with `cape:review-implementation`. It reports feedback across parallel axes (Standards, Spec, and more as they're added).

**Loop until clean:** address every finding, then re-review — repeat until a review comes back clean. A finding is settled when it is either fixed or consciously dismissed (a judgement call you've decided against); only hard violations and accepted findings gate the loop. The issue is done only when the review returns nothing left to act on.

Commit your work to the current branch.

Then place the issue file: if `/build` dispatched you, leave placement to it; if you're building a **standalone** issue directly, move it to `docs/work/03-approval/` for the user's sign-off (they move it to `docs/work/04-done/`).
