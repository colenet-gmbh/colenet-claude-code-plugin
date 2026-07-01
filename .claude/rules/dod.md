# Rule: Definition of Done & scope guardrail

This is the **plugin guardian check**. Run it on every proposed skill or change to
`capd`. It defines the plugin's red thread and gives Claude explicit authority to **veto**
additions that drift from it (see the guardian role in [`../../CLAUDE.md`](../../CLAUDE.md)).

## Mission — the red thread

`capd` helps teams that **already work in an agile way** bring AI support into how they
work — a launch ramp for adopting AI-assisted work in an agile context. It bundles
colenet's consulting, training, and engineering best practices as small, composable
skills that complement any setup.

What `capd` is **not**:

- **Not** a generic AI-gadget collection unrelated to agile teamwork.
- **Not** a competing orchestration framework (the `we` plugin already covers
  Vision→Saga→Epic→Story→Build orchestration — don't reinvent it).
- **Not** a home for project-, client-, or repo-specific automation. Those belong in a
  user's **local** `.claude/` in their own project — `capd` is the shared, curated,
  general baseline. Colenet colleagues graduate genuinely general skills *into* `capd`
  over time; project-specific ones stay local.

Scrum Masters are expected to keep an eye on `capd` and steward how their teams use and
extend it.

## The `build` bright line

capd's own `build` skill (planned) is a **lean, single-flow executor**, not an
orchestration engine. It must stay on the near side of this line:

- **Allowed:** implement one slice with TDD discipline, then commit; optionally a light
  role-lens review via preamble injection; human-in-the-loop at commit/PR/merge.
- **Forbidden — that is `we`'s territory:** a persistent orchestration engine (durable
  state machine, resume, worker pool, multi-runtime/agent dispatch, council).

When a team genuinely needs multi-worker orchestration, route them to the `we` plugin.
Guarding this line is part of the veto below.

## Definition of Done — a change may ship only when ALL hold

1. **Fits the mission** — serves agile teamwork and/or adopting AI-assisted work in an
   agile context (see the guardrail below).
2. **General & reusable** — not tied to one project, client, or repository.
3. **Follows the conventions** — [`skill-authoring.md`](skill-authoring.md) (lean body,
   third-person description, German + English triggers, progressive disclosure).
4. **Attributed** — external sources credited per [`attribution.md`](attribution.md).
5. **Documented & released** — README skill table + `CHANGELOG.md` updated, version
   bumped per [`plugin-development.md`](plugin-development.md).
6. **Green** — `pre-commit run --all-files` / the `validate` CI check passes.

## Guardrail — the veto questions

Before accepting a new skill or substantial change, Claude MUST answer these. A "no" on
1–4 is a **veto**:

1. Does it serve the mission (agile teamwork + AI adoption)? — off-topic → veto.
2. Is it general/reusable, or project/client-specific? — project-specific → veto, and
   advise: "this belongs in your local `.claude/`, not in `capd`."
3. Does it avoid duplicating `we`'s orchestration? — reinvention → veto, advise reuse.
4. Does it meet the quality/attribution/docs bar (DoD above)? — if not → block until met.

## When you veto

Do not just refuse. As guardian and development advisor:

1. State the veto plainly and name the principle it violates.
2. Explain *why* it pulls the plugin off its red thread.
3. Offer a fitting path forward — a narrower general version that would fit, keeping it as
   a local project skill, or directing orchestration needs to `we`.

The goal is a plugin that grows deliberately and keeps its focus — quality and a clear
red thread over breadth.
