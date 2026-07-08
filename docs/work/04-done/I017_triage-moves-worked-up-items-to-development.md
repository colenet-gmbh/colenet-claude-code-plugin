---
id: I017
type: enhancement
status: ready-for-agent
parent: none
blocked-by: []
priority: v1
---

# Triage moves worked-up items to 02-development

## What to build

Align `/triage` with the board-as-energy model (see `docs/work/CLAUDE.md`): an item that
triage works up into a **result** — a `ready-for-agent` agent-brief — moves from
`01-backlog` to `02-development`. Items merely under consideration (`needs-triage`,
`needs-info`) stay in `01-backlog`; `wontfix` goes to `04-done` / `out-of-scope` as today.

## Notes

- Touches `skills_source/` (triage) — needs a plugin version bump when built.
- Sibling of I002 (ask-cape's triage join wording); both make the triage onramp coherent.

## Agent Brief

**Type:** enhancement
**Summary:** `/triage` must move an item to `docs/work/02-development/` the moment it
produces a worked-up result (an agent brief), matching the board's "columns are energy
invested" model — not leave the file in `01-backlog`.

**Current behaviour:** `/triage`'s "Apply the outcome" step writes the agent brief into the
file for `ready-for-agent` (and `ready-for-human`) but does **not** move the file — it stays
in `docs/work/01-backlog/`. Only `wontfix` moves (to `04-done` / `out-of-scope`). This
contradicts `docs/work/CLAUDE.md`, which says a worked-up **result** belongs in
`02-development` while items merely under consideration stay in the backlog. The friction
is real: implementing I002 required moving its file to `02-development` by hand because the
skill never told triage to.

**Desired behaviour:** when `/triage` applies an outcome that produces a carried-forward
result, it moves the file out of `01-backlog` into `docs/work/02-development/`:

- `ready-for-agent` — write the brief **and** move the file to `02-development`.
- `ready-for-human` — same: it produces the same worked-up brief (plus the reason it can't
  be delegated), so it is equally a result and moves to `02-development`.
- `needs-triage`, `needs-info` — stay in `01-backlog` (still under consideration, nothing
  carried forward yet).
- `wontfix` — unchanged: `04-done` (already implemented) or `out-of-scope` (rejected
  enhancement) as today.

Keep the skill internally coherent: the intro ("Items live as files in
`docs/work/01-backlog/`") and the "Show what needs attention" scan describe the **incoming**
queue, which is correct — worked-up items have left it. Adjust wording only where leaving it
unchanged would now read as contradictory.

**Key interfaces:**

- `/triage` skill text (source: `skills_source/utility/triage/SKILL.md`) — the "Apply the
  outcome" step (`status` state machine) gains the move-to-`02-development` action for the
  result-producing states. Edit the **source**, not the git-ignored vendored copy under
  `.claude/skills/`.
- Stay consistent with the board model in `docs/work/CLAUDE.md` (columns = energy invested)
  and with `ask-cape`'s description of where the triage on-ramp rejoins the flow (I002).

**Acceptance criteria:**

- [ ] `/triage` moves a `ready-for-agent` item's file from `01-backlog` to `02-development`
      when it writes the brief.
- [ ] `/triage` moves a `ready-for-human` item's file to `02-development` too.
- [ ] `needs-triage` and `needs-info` items stay in `01-backlog`.
- [ ] `wontfix` behaviour is unchanged (`04-done` / `out-of-scope`).
- [ ] The intro and "Show what needs attention" wording stay coherent with items leaving
      the backlog once worked up.
- [ ] `.claude-plugin/plugin.json` `version` bumped (PATCH) — a shipped skill's text changed.
- [ ] README / CHANGELOG checked; updated only if they restate where triaged items live.

**Out of scope:**

- No change to the `status` values themselves or the triage roles — only *where the file
  lives* per outcome.
- No change to `wontfix` handling.
- Do not introduce an external tracker or labels; state stays a frontmatter line on the file.
- Do not edit the vendored `.claude/skills/` copy (git-ignored, regenerated from source).
