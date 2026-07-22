---
name: improve
description: Improves the project's own agentic-coding harness (skills, conventions, hooks, memory). Suggest invoking it — never auto-run it — when the user expresses discontent that the agent didn't act as expected, a guardrail fired, or the user names friction or wants the setup improved — mentions "improve the flow", "why did you do that", "verbessere das Harness", "das lief nicht rund", "das sollte besser laufen".
---

Suggest concrete improvements to **this project's harness** — the project-specific setup (skills, conventions, hooks, memory) that steers the agent. Assume that the user setup is at least partially based on cape, which cannot be modified directly, since it is an installed plugin.

When an insight is genuinely general, it becomes a proposal to the cape community (step 4).

Follow these steps internally but don't bother the user with them.

## Steps

### 1. Identify friction elements

The user mentioned this reason for calling improve: $ARGUMENTS

Now make your best guess as to why the user invoked improve. There might be an obvious single reason, or several independent sources of friction.
If session content reads as personal, skip it. Look only at work and collaboration friction.

- Is it a very current problem or friction in the preceding part of the current session (e.g. the user sounds frustrated, or a guardrail just fired)? Then that is part of the scope, but there might be other issues.
- the flow from idea -> ship that just finished (maybe the current session hints at that)
- general interaction in the current session
- a routine check without a particular trigger. (There is always something to improve)

If you identify none, ask the user.

Opportunities for improvement might be:

- a guardrail that fired — a failing hook/CI/validation, a rejected commit (a guardrail should never trigger in normal operation, so its firing is evidence a rule is missing, wrong or has been ignored)
- a bug or problem detected (that shouldn't happen again!). What happened? When was it caught, and by whom? Agent, User, Production?
- Agent sequence of actions. Unnecessary steps? Misunderstandings or mis-guided by documentation, configuration, prompting in rules or skills?
- Collaboration between agent and user (see checklist below)
- Feedback stored in memory. Moving it from user-specific memory into the harness is an improvement, too.

### 2. Confirm reasons and ways to address them with the user

Create a shortlist of the most significant items that can be addressed by modifying the harness or changing collaboration flows, no more than 3.

For each friction item, find the **root cause** — don't fix a symptom, but understand why the process/harness setup did not prevent it.
To understand how cape's skills flow together, read `${CLAUDE_PLUGIN_ROOT}/skills_source/meta/ask-cape/SKILL.md`. Also check relevant files like CLAUDE.md, central conventions or other configuration as necessary.

Give a short structured summary and a concrete recommendation for a measure that prevents similar issues in the future.
Ask the user if these are the relevant issues, or if they have others. Unless you see no friction, you proceed up to this point after the user invoked the skill.

### 3. Apply and commit

Do the changes the user wants (including a commit if that is appropriate for the agent in this project).

### 4. Propose general improvements to the cape community

If a fix (or the insight behind it) is genuinely general — it would help any team using
cape, not just this project — suggest sending it to the cape community as a GitHub issue
against the cape repository. Offer this below the actual result; the user decides. Never
change cape skills locally instead.

### 5. Summarize

Give a very brief summary (for each identified issue: Problem / Cause / Measures) and what to expect in the future.
Ask the user if they would like further improvements.

## Reference material

### Appropriate Improvement Measures

When giving a recommendation, pick a measure that is

- actually suited to remove the root cause (would it have prevented the problem?)
- proportional to the issue addressed
- implementable in this project — cape itself is not yours to change (see step 4).

Measures might be:

- Create new project-specific skill
- Sharpen triggering or improve existing skill
- Add guidance for agent in central or local conventions, in CLAUDE.md.
- Add guardrail (and include guidance to avoid unnecessary rework)
- convert memory into other harness elements (because a committed harness change is better than feedback stored in memory which is personal and opaque)
- any other as appropriate
- NOTE: Don't use memory to steer agent process behavior; use it only for individual interaction preferences.

### Collaboration checklist

Friction in the collaboration is as real a signal as a broken build. Are there signs of:

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

Here is a preview of the content in improvement-guide.md. If this sounds interesting, look up the details there.

**Principles**:

- Progressive disclosure — optimize the context the agent sees. Surface only the information that matters, right when it matters.
- cape is shared — sharing suggestions to improve cape, improves the cape experience for everybody
- Proportionality — the lightest measure that fits the problem.
- No guardrail without a signpost — a check only backs up guidance that already exists.
- Prefer committable solutions — a committed fix benefits every user of the repo.

**Improvement Recipes:**
A few very specific recipe ideas:

- Three-layer guardrail — enforce a rule at hook → pre-commit → CI.
- Canary — hide a marker in a procedure, then check it was followed.
- Graduate a feedback — move a memory lesson into the harness, then delete the memory.
- More context against hallucinated facts — ensure the information is present when needed.
- Less context against ignored facts — change workflows to reduce context size.
Many more exist. Don't feel restricted to these.
