---
name: implement
description: Build a single, written-out issue in a fresh context — TDD at the seams, then review. Use when handed one specced issue to implement, or when another skill dispatches an issue to be built.
---

Implement the one issue you've been handed — the file `work/02-development/I<id>_<slug>.md`. Your input is that **written-out issue plus its spec** (the parent feature `F<id>` if it has one; otherwise the issue is its own spec) — never a live planning thread. You always start in a **fresh context**.

Use `/tdd` where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite before you review.

Once done, review the work with `/review-implementation`. It reports feedback across parallel axes (Standards, Spec, and more as they're added).

**Loop until clean:** address every finding, then re-review — repeat until a review comes back clean. A finding is settled when it is either fixed or consciously dismissed (a judgement call you've decided against); only hard violations and accepted findings gate the loop. The issue is done only when the review returns nothing left to act on.

Commit your work to the current branch.

Then place the issue file: if `/build` dispatched you, leave placement to it; if you're building a **standalone** issue directly, move it to `work/03-approval/` for the user's sign-off (they move it to `work/04-done/`).
