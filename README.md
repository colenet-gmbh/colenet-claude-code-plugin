# capd — Colenet Agentic Product Development

> colenet's Claude Code harness for **agentic product development in teams**.

This plugin bundles the best practices of the consultants and engineers at
[colenet](https://www.colenet.de) — a specialist in agile consulting, software
development, and agile training — as reusable Claude Code skills.

Invoked as `/capd:<skill>`.

## Status

Early stage (`v0.4.0`). capd is being built as a **guided workflow spine** — from an idea
to a built slice — plus standalone **utility skills**. Today it ships one utility skill
(`grill-me`); the workflow spine is in progress. capd is **self-contained**: it owns its
stack and declares no runtime plugin dependencies.

## Skills

capd groups skills into two classes: **workflow skills** form the guided spine and build
on each other; **utility skills** are generic and usable anywhere.

### Utility skills

| Skill | Invocation | Purpose |
|-------|-----------|---------|
| `grill-me` | `/capd:grill-me` | Stress-test for plans & designs: Claude grills you systematically, one question at a time, down the entire decision tree until you reach shared understanding. Ideal for refinement, design reviews, and as a sounding board. |

> `grill-me` is a port from [`mattpocock/skills`](https://github.com/mattpocock/skills)
> (MIT, © Matt Pocock) — details in [`ATTRIBUTION.md`](ATTRIBUTION.md).

### Workflow skills — the capd spine (in progress)

The spine guides a single developer from idea to a built slice. Planned steps, added one
at a time and **not yet shipped**:

```text
brainstorm → grill-with-docs → feature → split → build
```

See [`requirements/`](requirements/) for the direction and its rationale.

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
