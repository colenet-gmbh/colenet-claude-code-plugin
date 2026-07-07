# Out-of-Scope Knowledge Base

`docs/work/out-of-scope/` stores persistent records of **rejected enhancement requests**.
Two purposes: institutional memory (why it was rejected, so the reasoning isn't lost) and
deduplication (when a similar request returns, surface the prior decision instead of
re-litigating it).

One file per **concept**, not per request — group repeat requests under one file. Name it
in short kebab-case: `dark-mode.md`, `plugin-system.md`.

## File format

Write it like a short design note, not a database row — paragraphs and examples that make
the reasoning clear to a first-time reader.

```md
# Dark Mode

This project does not support user-facing theming.

## Why this is out of scope

The rendering pipeline assumes a single palette resolved at build time. Multiple themes
would need a theme context, per-component resolution, and a preference store — a large
change that doesn't fit the project's focus. Theming is a downstream concern.

## Prior requests

- login-theme.md — "Add dark mode" (rejected 2026-06)
- night-mode.md — "Night theme for accessibility"
```

The reason must be substantive and durable — project scope, a technical constraint, a
strategic choice — never a temporary "no time right now" (that's a deferral, not a
rejection).

## Checking it (during triage, step 1)

Read every file in `docs/work/out-of-scope/` and match by **concept similarity**, not
keyword — "night theme" matches `dark-mode.md`. On a match, surface it: "Similar to
`out-of-scope/dark-mode.md` — rejected before because … Still the same view?" The user may
**confirm** (append this request to the file's Prior requests, then close as `wontfix`),
**reconsider** (delete/update the file, let the request proceed), or judge them **distinct**
(proceed normally).

## Writing to it

Only when an **enhancement** is *rejected* as `wontfix`. Not for bugs, and **not** when
something is closed because it's already implemented — recording a built feature here would
poison the dedup checks. If a matching concept file exists, append to its Prior requests;
otherwise create one with the concept, reason, and first request.
