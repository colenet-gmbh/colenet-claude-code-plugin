# capd — Colenet Agentic Product Development

> colenet's Claude Code harness for **agentic product development in teams**.

This plugin bundles the best practices of the consultants and engineers at
[colenet](https://www.colenet.de) — a specialist in agile consulting, software
development, and agile training — as reusable Claude Code skills.

Invoked as `/capd:<skill>`.

## Status

Early stage (`v0.5.0`). capd is a **guided workflow** — from an idea to a built
slice — plus standalone **utility skills**. capd is **self-contained**: it owns its stack
and declares no runtime plugin dependencies.

## Skills

capd groups skills into two classes: **workflow skills** form the guided path — the
**Main Flow** — and build on each other; **utility skills** are generic and usable
anywhere. New to capd? Run `/capd:ask-capd` — it routes you to the right step. See
[`GLOSSARY.md`](GLOSSARY.md) for the vocabulary.

### Workflow skills — the capd workflow

```text
brainstorm → grill-with-docs → feature → split → build
```

| Skill | Invocation | Purpose |
|-------|-----------|---------|
| `brainstorm` | `/capd:brainstorm` | Refine a rough idea into a fully-formed design — one question at a time, exploring alternatives, validating in sections. The first step. |
| `grill-with-docs` | `/capd:grill-with-docs` | Relentless interview that sharpens the design and builds durable docs as it goes — a `CONTEXT.md` glossary and sparing ADRs. |
| `feature` | `/capd:feature` | Turn the sharpened idea into a durable, versioned feature spec (`docs/features/F###-slug.md`) — capd's single source of truth. |
| `split` | `/capd:split` | Break the feature into dependency-ordered vertical slices (tracer bullets), recorded as Markdown in the repo. |
| `build` | `/capd:build` | Implement one slice test-first (red-green-refactor), public interfaces only, then commit. Lean, single-flow — not an orchestration engine. |

### Utility skills

| Skill | Invocation | Purpose |
|-------|-----------|---------|
| `grill-me` | `/capd:grill-me` | Stress-test any plan or design: Claude grills you one question at a time down the decision tree. Standalone, usable anytime. |
| `ask-capd` | `/capd:ask-capd` | Router — finds the right capd skill for where you are and walks the workflow. |

> Ported and synthesized skills credit their sources in
> [`ATTRIBUTION.md`](ATTRIBUTION.md): `grill-me`, `brainstorm`, `grill-with-docs`, `split`
> (ports) and `feature`, `build` (syntheses).

## Installation

Via the colenet marketplace (recommended):

```text
/plugin marketplace add colenet-gmbh/colenet-claude-code-marketplace
/plugin install capd@colenet
```

Locally for development/testing:

```bash
claude --plugin-dir /path/to/colenet-claude-code-plugin
```

## Usage

Invoke the skill directly:

```text
/capd:grill-me
```

…or trigger it casually — the skill's trigger phrases fire on things like
"grill me", "grill mich", or "tear my plan apart".

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

Want to add a skill or extend `capd`? See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the
setup, conventions, and quality checks.

## Marketplace

This plugin is distributed via the separate
[`colenet-claude-code-marketplace`](https://github.com/colenet-gmbh/colenet-claude-code-marketplace)
repository. Future colenet plugins get their own repositories and are referenced there
as well.

## License

MIT © colenet GmbH — see [`LICENSE`](LICENSE). Adopted third-party content is listed
separately in [`ATTRIBUTION.md`](ATTRIBUTION.md).
