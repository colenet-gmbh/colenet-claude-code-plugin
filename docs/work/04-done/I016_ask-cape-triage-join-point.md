---
id: I016
type: issue
status: ready-for-agent
parent: none
blocked-by: []
priority: v1
---

# ask-cape names the triage join point precisely

## What to build

Fix the wording in `/ask-cape` (and, if needed, `/triage`) so the triage onramp's merge
point matches the skills' actual contracts:

- a triaged **single slice** becomes a written-out issue joining at `/implement`;
- a **feature-sized** triaged item enters the main flow via the grilling session triage
  already triggers, then `/feature` → `/split` → `/build`.

Remove the imprecise "triage → `/implement` or `/build` directly".

## Notes

- Pure wording, no mechanism change: triage triggering the grilling already *is* the main
  flow starting. Touches `skills_source/` — needs a plugin version bump when built.

## Agent Brief

**Type:** enhancement
**Summary:** `ask-cape` must describe *where* the triage onramp rejoins the main flow by
item size — not imply a triaged item can go straight to `/implement` or `/build`.

**Current behaviour:** `ask-cape`'s On-ramps section says `/triage` "produces agent-ready
issues, which `/implement` (or `/build`) later picks up", implying a single triaged brief
can go directly to `/build`. `/build` actually needs a feature spec plus the issues
`/split` produced, so that direct path does not hold.

**Desired behaviour:** `ask-cape` states the join point by size:

- a triaged **single slice** becomes a written-out issue that joins the main flow at
  `/implement`;
- a **feature-sized** triaged item joins via the grilling session `/triage` already
  triggers, then `/feature` → `/split` → `/build`.

The imprecise "(or `/build`)" direct-pickup wording is gone.

**Key interfaces:**

- `ask-cape` skill text (source: `skills_source/meta/ask-cape/SKILL.md`) — the On-ramps
  section describing where `/triage` output rejoins the flow. Edit the **source**, not the
  git-ignored vendored copy under `.claude/skills/`.
- Stay consistent with `/triage`'s own description (it yields one written-out issue/brief,
  never a whole feature package).

**Acceptance criteria:**

- [ ] `ask-cape` no longer states or implies a triaged item goes directly to `/build`.
- [ ] `ask-cape` describes the single-slice join at `/implement`.
- [ ] `ask-cape` describes the feature-sized join via grilling → `/feature` → `/split` →
      `/build`.
- [ ] The new wording is consistent with the `/triage`, `/implement`, and `/build`
      contracts stated elsewhere in the skill set.
- [ ] `.claude-plugin/plugin.json` `version` bumped (PATCH) — a shipped skill's text changed.
- [ ] README / CHANGELOG checked; updated only if they restate the triage onramp join.

**Out of scope:**

- No behaviour or mechanism change to `/triage`, `/implement`, or `/build` — wording only.
- Do not rewrite the main-flow steps themselves, only how the triage onramp's join reads.
- Do not edit the vendored `.claude/skills/` copy (git-ignored, regenerated from source).
