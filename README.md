# cape — Colenet Agentic Product Engineering

> colenet's Claude Code harness for **agentic product development in teams**.

This plugin bundles the best practices of the consultants and engineers at
[colenet](https://www.colenet.de) — a specialist in agile consulting, software
development, and agile training — as reusable Claude Code skills.

Install it, then run **`/cape:setup`** once per repo — that scaffolds the docs the skills
expect. The skills load straight from the installed plugin as `cape:<name>`
(`/cape:ask-cape`, `/cape:feature`, …). See [Installation](#installation).

## Status

Early stage (`v0.7.2`). cape is a **guided flow** from an idea to a built, approved slice,
plus standalone **utility skills** usable anywhere. It is **self-contained**: it owns its
stack and declares no runtime plugin dependencies.

## Skills

The plugin exposes one command directly, **`/cape:setup`** (it scaffolds the docs the
skills expect — see [Installation](#installation)); every skill below loads from the plugin
as `cape:<name>`. After setup, run [`/cape:ask-cape`](skills_source/meta/ask-cape/SKILL.md) —
it explains how the flow fits together and routes you to the right skill. See
[`GLOSSARY.md`](GLOSSARY.md) for the shared vocabulary. The full catalogue (each callable as
`/cape:<skill>`):

### Engineering — the guided flow and its disciplines

| Skill | Purpose |
|-------|---------|
| `grill-with-docs` | Relentless interview that sharpens a plan or design and builds durable docs (glossary, ADRs) as it goes. |
| `feature` | Synthesize a grilled conversation into a reviewed, two-part feature spec. |
| `review-feature` | Review a feature spec along parallel axes (Architecture, Security) before it's split. |
| `split` | Break a reviewed spec into independently-grabbable, vertically-sliced issues. |
| `implement` | Build one written-out issue in a fresh context — TDD at the seams, then review. |
| `build` | Orchestrate a whole feature — drive its issues to done, one `implement` each, then review the integrated result. |
| `review-implementation` | Review an implementation's changes since a fixed point (Standards, Spec). |
| `architect` | Shape and keep structure clean — software/codebase design, domain modelling, arc42 docs. Also fires inside other skills as they need it. |
| `tdd` | Test-driven development — red-green-refactor, tests at the seams. |
| `diagnosing-bugs` | Diagnosis loop for hard bugs and perf regressions — build a tight red-capable repro, then hypothesise and fix. |

### Utility — off the flow, reach for anytime

| Skill | Purpose |
|-------|---------|
| `grill-me` | The relentless interview, stateless — for a plan or design that doesn't live in a repo. |
| `grilling` | The shared interview engine the grill skills build on. |
| `prototype` | Build a throwaway prototype to answer a design question. |
| `handoff` | Compact the current conversation into a handoff document to continue in a fresh session. |
| `triage` | Backlog management — sort not-yet-worked-up items into agent-ready briefs, moved along the work board as they're worked up. |

### Meta — about cape itself

| Skill | Purpose |
|-------|---------|
| `ask-cape` | Router — finds the right cape skill for your situation and explains the flow. |
| `writing-great-skills` | Reference for writing and editing skills well — the authoring standard for cape skills. |

> Ported and synthesized skills credit their sources in
> [`ATTRIBUTION.md`](ATTRIBUTION.md).

## Installation

Via the colenet marketplace (recommended):

```text
/plugin marketplace add colenet-gmbh/colenet-claude-code-marketplace
/plugin install cape@colenet
```

Then, in each repo where you want to use cape, scaffold the docs the skills expect:

```text
/cape:setup
```

This creates the `docs/work/` board, the issue tracker record, and `CONTEXT.md` with the
arc42 glossary — commit them so the scaffolding is pinned in the repo. The skills
themselves load straight from the installed plugin as `cape:<name>`; nothing is copied into
the repo.

Locally for development/testing:

```bash
claude --plugin-dir /path/to/colenet-claude-code-plugin
```

## Usage

Invoke a skill by its namespaced name:

```text
/cape:ask-cape
```

…or trigger it casually — each skill's trigger phrases fire on natural wording in German
or English. Pull a newer version with `/plugin update`.

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
