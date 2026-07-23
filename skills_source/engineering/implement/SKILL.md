---
name: implement
description: Implement a single issue — using TDD if appropriate, then review. Use when implementation of an issue is needed by user or agent.
when_to_use: Also when the user says "bau das Issue".
---

Implement the one issue you've been handed until it is done.

If you don't know where issues live, explain to user that setup is incomplete and ask to run `/cape:setup`.

Before you plan, read the `CLAUDE.md` of every tier the issue names (see CONTEXT.md for tiers and their paths).

Use /cape:tdd for coding tasks where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite before you review.

Once implementing is done, run /cape:review-implementation.

**Loop until review is clean:** address every finding, then re-review — repeat until a review comes back clean.
A finding is settled when it is either fixed or consciously dismissed (a judgement call you've decided against); only hard violations and accepted findings gate the loop.

The issue is done only when

- the review returns nothing left to act on
- AND when its ticket in the tracker has been updated with implementation notes (be brief!) and status.

Commit your work to the current branch.
