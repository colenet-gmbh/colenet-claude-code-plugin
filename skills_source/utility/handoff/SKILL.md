---
name: handoff
description: Compact the current conversation into a handoff document for another agent to pick up.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---

Write a handoff document summarising the current conversation so a fresh agent can continue the work.

Save it into the **handoff-dir**: resolve that pointer in the repo's `CONTEXT.md` to its concrete path and write there — not into the current workspace. If `CONTEXT.md` has no `handoff-dir` pointer, run `/cape:setup` first (it creates the directory and records the pointer). Name the file after the topic in kebab-case (`statusline-prototype.md`), so a later session finds the handoff by its subject rather than by guessing a path.

Include a "suggested skills" section in the document, which suggests skills that the agent should invoke.

Do not duplicate content already captured in other artifacts (specs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.

Redact any sensitive information, such as API keys, passwords, or personally identifiable information.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the doc accordingly.
