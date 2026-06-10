# capd — Colenet Agentic Product Development

> colenet's Claude Code harness for **agentic product development in teams**.

This plugin bundles the best practices of the consultants and engineers at
[colenet](https://www.colenet.de) — a specialist in agile consulting, software
development, and agile training — as reusable Claude Code skills.

Invoked as `/capd:<skill>`.

## Status

Early stage (`v0.1.0`). Currently contains **one** skill. The role model
(Scrum Master / Product Owner / Team) is not yet decided — the architecture is
intentionally kept open for it.

## Included skills

Grouped by category.

### Productivity

| Skill | Invocation | Purpose |
|-------|-----------|---------|
| `grill-me` | `/capd:grill-me` | Stress-test for plans & designs: Claude grills you systematically, one question at a time, down the entire decision tree until you reach shared understanding. Ideal for refinement, design reviews, and as a sounding board. |

> `grill-me` is a port from [`mattpocock/skills`](https://github.com/mattpocock/skills)
> (MIT, © Matt Pocock) — details in [`ATTRIBUTION.md`](ATTRIBUTION.md).

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

### Dependencies

`capd` depends on [`superpowers`](https://github.com/obra/superpowers)
(Jesse Vincent, MIT) — declared in `plugin.json` as
`superpowers@claude-plugins-official` and **installed automatically** with this plugin.
Every user of `capd` gets the full superpowers skill library (TDD, debugging,
brainstorming, planning, collaboration workflows). It resolves from the built-in
`claude-plugins-official` marketplace, so no extra setup is required.

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
