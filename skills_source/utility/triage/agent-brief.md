# Writing Agent Briefs

An agent brief is the authoritative spec written into an item when it moves to
`ready-for-agent`. The original report and discussion are context; the brief is the
contract an AFK agent works from.

## Principles

- **Durable over precise.** The item may sit for days while the codebase changes. Describe
  interfaces, types, and behavioural contracts; name the types or signatures to look for.
  Never reference file paths or line numbers — they go stale.
- **Behavioural, not procedural.** State *what* the system should do, not *how* to build
  it. Good: "`SkillConfig` should accept an optional `schedule` of type `CronExpression`."
  Bad: "add a field on line 42."
- **Complete acceptance criteria.** Every brief needs concrete, independently verifiable
  criteria so the agent knows when it's done. Good: "`/triage` with no arguments shows a
  summary of items needing attention." Bad: "triage should work."
- **Explicit scope boundaries.** Say what is out of scope, so the agent doesn't gold-plate.

## Template

```md
## Agent Brief

**Type:** bug / enhancement
**Summary:** one line — what needs to happen

**Current behaviour:** what happens now (for a bug, the broken behaviour).
**Desired behaviour:** what should happen after, including edge cases and errors.

**Key interfaces:**
- `TypeName` — what changes and why
- `functionName()` — current vs desired result

**Acceptance criteria:**
- [ ] specific, testable criterion
- [ ] …

**Out of scope:**
- adjacent thing that must NOT be changed here
```

Use the domain glossary's vocabulary for any domain concept you name, so the brief reads in the
project's own language.
