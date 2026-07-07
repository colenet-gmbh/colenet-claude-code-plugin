# cape — Colenet Agentic Product Engineering

> colenet's Claude Code harness for **agentic product development in teams**.

This plugin bundles the best practices of the consultants and engineers at
[colenet](https://www.colenet.de) — a specialist in agile consulting, software
development, and agile training — as reusable Claude Code skills.

Invoked as `/cape:<skill>`.

## Status

Early stage (`v0.6.0`). cape is a **guided Main Flow** — from an idea to a built, approved
slice — plus standalone **utility skills**. Work is tracked on a file board in
`docs/features/` (`01-backlog → 02-development → 03-approval → 04-done`), and the flow runs
one long **HITL** (human-in-the-loop) stretch, then one long **AFK** (away-from-keyboard)
stretch. cape is **self-contained**: it owns its stack and declares no runtime plugin
dependencies.

## Skills

cape groups skills into two classes: **workflow skills** form the guided path — the
**Main Flow** — and build on each other; **utility skills** are generic and usable
anywhere. New to cape? Run `/cape:ask-cape` — it routes you to the right step. See
[`GLOSSARY.md`](GLOSSARY.md) for the vocabulary.

### Workflow skills — the Main Flow

```text
brainstorm → grill-with-docs → feature → software-architect → split → build
```

| Skill | Invocation | Purpose |
|-------|-----------|---------|
| `brainstorm` | `/cape:brainstorm` | Refine a rough idea into a fully-formed design — one question at a time, exploring alternatives. HITL; the first step. |
| `grill-with-docs` | `/cape:grill-with-docs` | Relentless interview that sharpens the design and builds durable docs — a `CONTEXT.md` glossary and sparing ADRs. HITL. |
| `feature` | `/cape:feature` | Synthesize the sharpened understanding into a durable, two-part feature spec. AFK. |
| `software-architect` | `/cape:software-architect` | Review the concept and establish/evolve the architecture docs (arc42, ADRs) before building; present the key decisions for sign-off. AFK. |
| `split` | `/cape:split` | Break the feature into dependency-ordered vertical slices (tracer bullets), recorded as Markdown. AFK. |
| `build` | `/cape:build` | Implement each slice test-first (red-green-refactor), following cape's engineering rules, then move to approval. AFK. |

### Utility skills

| Skill | Invocation | Purpose |
|-------|-----------|---------|
| `grill-me` | `/cape:grill-me` | Stress-test any plan or design: Claude grills you one question at a time down the decision tree. Off the Main Flow, usable anytime. |
| `ask-cape` | `/cape:ask-cape` | Router — finds the right cape skill for where you are and explains the Main Flow. |

> Ported and synthesized skills credit their sources in
> [`ATTRIBUTION.md`](ATTRIBUTION.md).

## Installation

Via the colenet marketplace (recommended):

```text
/plugin marketplace add colenet-gmbh/colenet-claude-code-marketplace
/plugin install cape@colenet
```

Locally for development/testing:

```bash
claude --plugin-dir /path/to/colenet-claude-code-plugin
```

## Usage

Invoke a skill directly:

```text
/cape:ask-cape
```

…or trigger it casually — each skill's trigger phrases fire on natural wording in German
or English.

## Status line

The plugin bundles a status line (`statusline/statusline.js`, requires `node`) showing
model, git branch, directory, a context-usage bar, RAM, cost, and rate limits. While the
plugin is enabled it is applied automatically as the **subagent** status line.

```text
Opus 4.8 │ main │ colenet-claude-code-plugin │ ███░░░░░░░ 37% │ RAM 12% │ $37.177 │ 5h:23% 7d:15%
```

Claude Code does not let a plugin set the **main** (bottom) status bar — only your own
settings can. To use this status line as your main bar, copy the script and point your
`~/.claude/settings.json` at it:

```json
{
  "statusLine": { "type": "command", "command": "node ~/.claude/statusline.js" }
}
```

## Contributing

Want to add a skill or extend `cape`? See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the
setup, conventions, and quality checks.

## Marketplace

This plugin is distributed via the separate
[`colenet-claude-code-marketplace`](https://github.com/colenet-gmbh/colenet-claude-code-marketplace)
repository. Future colenet plugins get their own repositories and are referenced there
as well.

## License

MIT © colenet GmbH — see [`LICENSE`](LICENSE). Adopted third-party content is listed
separately in [`ATTRIBUTION.md`](ATTRIBUTION.md).
