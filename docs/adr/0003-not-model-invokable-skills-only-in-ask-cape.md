# Skills that cannot be model-invoked are named only in ask-cape

Some cape skills carry `disable-model-invocation: true` in their frontmatter: the model
cannot auto-trigger them, they are invoked deliberately by the user or dispatched by
another skill. We decide that these skills are **named only in `ask-cape`** (the router
that maps the flow) — no other skill mentions them.

## Why

Naming a downstream, not-model-invokable step *inside* a skill makes the model anticipate
work that comes after the current one. When it knows more is queued, it concentrates less
on the task in front of it — it drifts toward closing out and gets more superficial. Keeping
the flow map in a single place lets every other skill stay focused on its own job and end
where its job ends.

This was observed directly: a `/split` reference in the `feature` skill (step 4 "before it
goes to split", plus its description and body) pulled focus toward the hand-off and nudged
the work into a convergent, finish-it posture. It was removed; this ADR generalises the
lesson.

`ask-cape` is exempt by role — it *is* the flow map, and it already sets
`disable-model-invocation: true` on itself, so reading the whole chain there does not put a
"next step" into a working skill's context.

**Exemption: reading as reference.** The rule targets *anticipation of downstream work* —
naming a flagged skill as a step that comes later. Directing the agent to **read** a flagged
skill's file as reference material (e.g. `improve` reading `ask-cape`'s SKILL.md to
understand the flow map while root-causing flow friction) creates no next step and is
allowed. Such a reference must use the real file path via `${CLAUDE_PLUGIN_ROOT}`, never a
bare skill name.

## The current not-model-invokable set

Defined by the `disable-model-invocation: true` flag (so the list stays derivable, not a
hand-maintained copy). As of this ADR:

`build`, `feature`, `grill-with-docs`, `grill-me`, `split`, `triage`, `teach`, `handoff`,
`writing-great-skills`, `ask-cape`.

Model-invokable skills (no flag) may still be referenced from other skills — the rule is
only about the not-model-invokable ones, because those are the flow/entry steps whose
mention creates the anticipation.

## Consequence

Any existing cross-reference to a flagged skill from another skill is a bug to remove.
`feature` → `split` is already fixed; `split`'s description still names `/build` (flagged) —
same fix needed. The authoring standard (`writing-great-skills`, `.claude/rules/skill-authoring.md`)
should carry this rule so new skills follow it.
