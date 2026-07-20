---
name: improve
description: improve your agentic coding setup. Use when the agent didn't act or produce the results you expect or you feel there is unnecessary friction.
disable-model-invocation: true
---

If present, read the optional central convention improvement-conventions.md (see CONTEXT.md) for repo-specific guidance and your improvement mode. If absent, your mode is **user** — use cape, don't change it.

## Steps

### 1. Identify scope

The scope determines what to examine as the basis for potential improvements.

- **A** — a very current problem / bug / friction in the current session (if found, focus on it unless user suggests differently)
- **B** — the flow from idea -> ship that just finished (if current session hints at it)
- **C** — general interaction in the current session

If a parameter is passed it may contain a scope indication.

### 2. Identify friction elements

Analyze the scope for friction elements.
If session content reads as personal, skip it. Look only at work and collaboration friction.
Identify up to 5 friction elements. If you identify none, ask the user.

Sources of friction might be:

- a bug or problem detected (that shouldn't happen again!). What happened? When was it caught, and by whom? Agent, User, Production?
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

Use a /grilling session to let the user decide on how to address each issue. Give a helpful recommendation as fix for each issue in line with the harness principles listed below.
When giving a recommendation, pick an appropriate measure that is

- actually suited to remove the root cause (would it have prevented the problem?)
- proportional to the issue addressed
- can actually be implemented (cape itself only if your improvement mode allows).

Measures might be:

- Create new project-specific skill
- Sharpen triggering or improve existing skill
- Add guidance for agent in central or local conventions
- Add guardrail (and include guidance to avoid unnecessary rework)
- convert memory into other harness elements
- any other as appropriate

Prefer a committed harness change over memory — memory is personal and opaque; use it only for individual interaction preferences, never to steer process (see the principles below).

### 6. Apply and commit

Do the changes and commit them.

### 7. Summarize

Give a very brief summary (for each identified issue: Problem / Cause / Measures) and what to expect in the future.

## Reference material

### Collaboration checklist

Friction in the collaboration is as real a signal as a broken build. Run over the session:

- **Correction loops** — did the user have to clarify the same thing more than once?
- **Feedback cycle length** - wrong assumptions/decisions of the agent not caught until much later
- **Confirmation before risk** — was confirmation sought before destructive or large changes, per the repo's own directives?
- **Explanation depth** — did it match the user's stated experience level?
- **Docs kept current** — was project/process documentation updated as the work happened?
- **Session-start context** — did the session begin with a clear picture of what to build?
- **Conventions honoured** — were any stated conventions or guidelines broken?
- **QA proportion** — was testing/review proportionate to the size of the change?
- **Pace** — steps bundled too coarsely, or fragmented too finely?
- **Preferences honoured** — were known preferences from prior sessions or memory respected?

## Harness Guideline

**Principles**:

- Progressive disclosure — surface only the information that matters, right when it matters.
- cape is shared — focus on your project's setup; change cape only where the conventions allow.
- Proportionality — the lightest measure that fits the problem.
- No guardrail without a signpost — a check only backs up guidance that already exists.
- Prefer committable solutions — a committed fix benefits every user of the repo.

**Recipes:**
A few recipe ideas:

- Three-layer guardrail — enforce a rule at hook → pre-commit → CI.
- Canary — hide a marker in a procedure, then check it was followed.
- Graduate a feedback — move a memory lesson into the harness, then delete the memory.
Many more exist. Don't feel restricted to these.

See corresponding sections in harness-principles.md for details.
