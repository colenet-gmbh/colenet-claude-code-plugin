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

### Built on two great official plugins

- **[`superpowers`](https://github.com/obra/superpowers)** (Jesse Vincent, MIT) — a
  **dependency**, declared as `superpowers@claude-plugins-official` and **installed
  automatically** with `capd`. Every user gets its full skill library: TDD, debugging,
  brainstorming, planning, and collaboration workflows. It resolves from the built-in
  `claude-plugins-official` marketplace, so there's no extra setup.
- **`plugin-dev`** (`@claude-plugins-official`) — Claude Code's own plugin-building
  skills (`plugin-structure`, `skill-development`, …). Not required to *use* `capd`, but
  recommended if you **extend** it (see [`CONTRIBUTING.md`](CONTRIBUTING.md)).

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
