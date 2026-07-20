---
name: improve
description: WIP — improve the harness from real usage (F015). Material-collection stage; not the final skill.
disable-model-invocation: true
---

Look up the central convention improvement-conventions.md (see CONTEXT.md) for additional guidance.

## Steps

### 1. Identify scope

Thee scope determines what examine as the basis for potential improvements.
A a very current problem / bug / friction in the current session (if found, focus on it unless user suggests differently)
B the flow from idea -> ship that just finished (if current session hints at it)
C general interaction in the current session


If a parameter is passed it may contain a scope indication.

### 2. List friction elements

Find up to 5 friction elements. Sources might be:
- a bug or problem detected (that shouldn't happen again!). What happend? When was ist caught and by whom? Agent, User, Production?
- Agent sequence of actions. Unnecessary steps? Mis-guided by documentation?
- Collaboration between agent and user (see checklist below)
- Previous friction stored as feedback in memory.

### 3. Confirm with user

Create a shortlist of the most significant items, no more than 3.
Summarise in 2–3 sentences, confirm with the user.

### 4. Root Cause analysis

For each friction item, find the **root cause** — don't fix a symptom, but understand why the process/harness setup did not prevent it.
Read relevant documentation including cape (see SKILL.md of user-invocable skill ask-cape!) central conventions or repo-specific configuration as necessary.

### 5. Let user decide

Use a /grilling session to let the user decide on how to address each issue. Give a helpful recommendation as fix for each issue.
When giving a recommendation, pick an appropriate measure that is
- proportional to the issue addressed
- can actually be implemented (cape skills can only be changed if mentioned in improvement conventions).

Measures might be:
- Create new project-specific skill
- Sharpen triggering or improve existing skill
- Add guidance for agent in central or local conventions
- Add guardrail (always include guidance to avoid )
- convert memory into other harness elements
- any other as appropriate

Prefer adding other harness elements over adding memory. 
Memory entries are purely personal and reduce transparency and understandability of agent behavior. 
Use them extremely sparingly and only for individual preference (like user agent interaction style), not to modify process.
Always prefer solutions that can be committed, so that every user of the repo benefits from the improvement.

### 6. Apply and commit

Do the changes and commit them.

### 7. Summarize

Give a very brief summary (for each identified issue: Problem / Cause / Measures) and what to expect in the future.







Memory is read as input, never written as output: a `feedback` memory is a sign that
friction happened. Feedbacks are individual — their home is the harness. One improvement is
to move a feedback into the harness and delete the memory.

---

## Source A — `improve-framework` (Pascal, OpenBrain `.claude/skills/improve-framework`)

The most mature template. Role: **Framework-Architekt**. Trigger: a process failure or an
insight — a bug found too late, a skill that missed something or mis-/never-triggered,
"das darf nicht nochmal passieren".


**Reference material it adds:**

- `docs/agentic-coding-framework.md` — the standing principles.
- `concepts/ideas-framework.md` — the floating-ideas backlog (checked so a current problem
  can make a parked idea concrete).
- the affected skills, `features/CLAUDE.md`, `docs/definition-of-done.md`, the memory file.
- Principles: self-improving skill · no blame · proportionality · **no guardrail without a
  signpost** · at least one concrete measure per run · always commit.

---

## Source B — `session-retro` (Leiv Braun, PR #24, `feat/session-retro-skill`)

The **observation half**: a retrospective on *how the collaboration went* — deliberately
**not** code quality or subject-matter learning. Trigger: manual `/session-retro`, or a
one-time proactive offer on a session's closing signal after substantial work.

**Flow (phases, one at a time, in dialog):**

1. **What went well?**
2. **What didn't?**
3. **What to improve next time?**
4. **Claude's own observations** — only after phases 1–3; offered as proposals, one at a
   time, from a self-assessment checklist (below).
5. **Distill** — turn phases 1–4 into **1–3 concrete, actionable** improvements (a rule
   Claude can follow now, not a sentiment).

**Reference material it adds:**

- The **self-assessment checklist** for phase 4: repeated correction loops · confirmation
  sought before risky/large changes · explanation depth vs. stated experience · docs kept
  current · good session-start context · conventions broken · QA proportionate to the
  change · pace (bundled vs. fragmented) · known preferences/memory honoured.
- **Output channel:** persist each improvement as a `feedback`-type **memory** (rule / Why
  / How to apply); check for an existing matching memory first; else ask where the project
  tracks working agreements (e.g. `CLAUDE.md`). No transcript of the retro is kept.
- Tone: honest, concrete over vague, collegial.

---

## Source C — `/we:retro` (Fabian, `we` plugin, weside-ai/claude-code-plugin)

The richest on **data-gathering** and **proposal-gating**. A retrospective on an
engineering *cycle*, combining two data sources — session transcript **and** GitHub PR/CI
history — to surface frictions and propose concrete markdown-file edits that prevent
recurrence.

**Flow (steps R1–R9):**

1. **Confirm scope** — which PR/branch to analyse.
2. **Fetch data** — transcript, commits, PR/CI history (if GitHub-authenticated;
   degrades gracefully to transcript + local `git log`).
3. **Triage findings** — classify frictions by **surface**: CI failures, review delays,
   workflow inefficiency, agent iteration.
4. **Propose fixes** — 1–2 changes per friction, with a **placement priority**:
   path-filtered rules preferred over always-loaded docs.
5. **Render report** — print WINS / PAIN / PROPOSALS with diff previews *before any edit*.
6. **Per-item gate** — `y` / `n` / `edit-path` / `skip-for-later` / `stop`.
7. **Apply approved items** — branch, edit, open PR (unless direct-commit repo).
8. **Write retro log** — structured markdown under `docs/retros/` with frontmatter, for
   later pattern detection (`--scan N`).
9. **Closeout** — summary and next steps.

**Reference material / concepts it adds:**

- **Two data sources**, not just the transcript: also GitHub PR/CI history.
- **Friction-by-surface** taxonomy for triage.
- **Placement priority** — where a fix lands is a first-class decision (path-filtered rule
  vs. always-loaded doc); this is a *layer-routing* precedent.
- **Auto-mode (`--auto`)** with three always-confirm exceptions: **plugin-repo edits
  (shipped to all users)**, **contract-changing** proposals, **ambiguous placement**. The
  first is a direct precedent for cape's *graduate-to-cape* sensitivity.
- **Privacy safeguard** (hard rule): if session content reads as personal, skip it —
  analyse only engineering surfaces (tool calls, diffs, CI logs, PR comments, commits).
- **HITL**: the report always prints before any edit; nothing applies silently.
- Retro logs + `--scan N` for recurring-pattern detection. *(Note: this is a persisted
  log/backlog — which F015 has decided against carrying over.)*
- Attribution: `we:retro` is **external (weside-ai, not colenet)** — if any content is
  adopted, credit per `ATTRIBUTION.md`. Also mind the `we`-boundary: adopt the retro
  *pattern*, do not reinvent `we`'s orchestration.

---

## cape-side material the synthesis must honour (not a source flow — the target ground)

- **Three-layer harness** (arc42 ch. 1): Level 1 Claude Code / **Level 2 cape** / Level 3
  project. F015's defining constraint: route each improvement to the right layer; prefer
  the local project layer over editing cape skills; a genuinely general improvement is
  **graduated back into cape**, never silently forked locally.
- **Guardrail** concept (glossary ch. 8): a QA measure that ideally never fires;
  presupposes a **convention** — "no guardrail without a signpost".
- **Seed strategy (from F009):** three-layer guardrails — Claude Code hook → git hook →
  CI; only layer 1 (a PreToolUse warn-don't-block hook) is the cape-shaped pattern.
- Skill-authoring: user-invocable ⇒ `disable-model-invocation: true` ⇒ named only in
  `ask-cape` (ADR 0003).
