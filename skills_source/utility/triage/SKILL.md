---
name: triage
description: Backlog management — move not-yet-worked-up items through triage roles into agent-ready briefs, whatever their origin. Use when the user wants to sort or work up a backlog of bug reports, feature requests, or ideas, mentions "triage", "triagieren", "Backlog sichten", "Backlog pflegen", "sort the backlog", "manage the backlog", or points at an untriaged item in docs/work/01-backlog.
disable-model-invocation: true
---

# Triage

Triage is **backlog management**: move items that aren't worked up yet — bug reports,
feature requests, ideas, anything sitting raw in the backlog — through a small state
machine until each is either an **agent-ready brief** or closed. Where an item came from
doesn't matter; only that it hasn't been sorted yet. The one thing to skip is what is
**already agent-ready** — e.g. issues already written out as vertical slices — since there's nothing left to
triage.

The `CONTEXT.md` map and the `docs/work/` board should have been provided to you — run
`/cape:setup` if they're missing.

New items arrive as files in `docs/work/01-backlog/`; once triage works one up into a
result, that file moves on (see "Apply the outcome"). State is a **frontmatter line**
on the file — no external tracker, no labels:

```md
---
type: bug | enhancement
status: needs-triage | needs-info | ready-for-agent | ready-for-human | wontfix
---
```

Each triaged item carries exactly one `type` and one `status`. An untriaged file (no
`status`) is treated as `needs-triage`.

## Reference

- [agent-brief.md](agent-brief.md) — how to write a durable, behavioural agent brief.
- [out-of-scope.md](out-of-scope.md) — the `docs/work/out-of-scope/` knowledge base for
  rejected requests.

## The roles

- **type** — `bug` (something is broken) or `enhancement` (new feature or improvement).
- **status** — `needs-triage` (needs evaluation) → `needs-info` (waiting on the reporter)
  → `ready-for-agent` (fully specified, an AFK agent can pick it up) / `ready-for-human`
  (needs human implementation) / `wontfix` (will not be actioned). `needs-info` returns to
  `needs-triage` once the reporter replies.

## Invocation

The user runs `/triage` and says what they want in natural language — interpret and act:
"show me what needs attention", "let's look at the login-timeout report", "move it to
ready-for-agent", "what's ready for agents to pick up?".

## Show what needs attention

Scan `docs/work/01-backlog/`, present oldest first, with a one-line summary each:

1. **Untriaged** — files with no `status`.
2. **`needs-triage`** — evaluation in progress.
3. **`needs-info` with new reporter input** since the last triage notes.

Show counts; let the user pick.

For "what's ready for agents to pick up?", scan `docs/work/02-development/` instead —
that's where worked-up `ready-for-agent` / `ready-for-human` briefs now live.

## Triage one item

1. **Gather context.** Read the whole file and any prior triage notes (don't re-ask
   resolved questions). Explore the codebase in the project's glossary vocabulary
   (via `CONTEXT.md`), respecting ADRs in the area. Run two checks: **(a) redundancy** —
   search for an existing implementation by domain concept, not just the request's wording;
   if it already exists, it's an already-implemented `wontfix`. **(b) prior rejection** —
   read `docs/work/out-of-scope/*.md` and surface any that resembles this request.
2. **Recommend.** Give your `type`/`status` recommendation with reasoning and a short
   codebase summary (including whether it's already built). Wait for direction.
3. **Verify the claim.** Before grilling, check the claim holds: reproduce a bug from the
   reporter's steps. Report confirmed (with the code path), failed, or insufficient detail
   (a strong `needs-info` signal). A confirmed verification makes a far stronger brief.
4. **Grill if needed.** If the request needs fleshing out, run `cape:grilling` together with
   `cape:architect` domain modelling — sharpen it one question at a time, updating the glossary
   and ADRs inline as decisions land.
5. **Apply the outcome**, updating the file's frontmatter `status` and moving the file to
   the column that matches how much energy it now carries (see `docs/work/CLAUDE.md`):
   - `ready-for-agent` — write an agent brief into the file ([agent-brief.md](agent-brief.md)),
     then **move it to `docs/work/02-development/`**: a worked-up brief is a result, not a
     backlog item still under consideration.
   - `ready-for-human` — same brief, plus why it can't be delegated (judgment calls,
     external access, design decisions, manual testing); it is equally a worked-up result,
     so **move it to `docs/work/02-development/`** too.
   - `needs-triage`, `needs-info` — leave the file in `docs/work/01-backlog/`; nothing is
     carried forward yet. For `needs-info`, record triage notes in the file (template below).
   - `wontfix` — move the file to `docs/work/04-done/`. If **already implemented**, point
     to where it lives (do **not** write to out-of-scope). If a **rejected enhancement**,
     record it in `docs/work/out-of-scope/` ([out-of-scope.md](out-of-scope.md)); a
     rejected bug just gets a short explanation.

## Quick override

If the user says "move it to ready-for-agent", trust them: confirm what you'll do, set the
`status`, skip grilling. If moving to `ready-for-agent` without a grilling session, ask
whether they want an agent brief written. Either way, apply the outcome as in step 5 —
including moving the file to `docs/work/02-development/`.

## Needs-info notes template

```md
## Triage Notes

**Established so far:**
- point 1

**Still needed from you:**
- specific, actionable question 1
```

Capture everything resolved during grilling under "established so far" so the work isn't
lost. Questions must be specific, not "please provide more info".
