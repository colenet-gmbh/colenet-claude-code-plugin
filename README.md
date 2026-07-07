# cape — Colenet Agentic Product Engineering

> colenet's Claude Code harness for **agentic product development in teams**.

This plugin bundles the best practices of the consultants and engineers at
[colenet](https://www.colenet.de) — a specialist in agile consulting, software
development, and agile training — as reusable Claude Code skills.

Install it, then run **`/cape:setup`** once per repo — that vendors the skills into the
repo so they're callable with flat, un-prefixed names (`/ask-cape`, `/feature`, …). See
[Installation](#installation).

## Status

Early stage (`v0.7.2`). cape is a **guided flow** from an idea to a built, approved slice,
plus standalone **utility skills** usable anywhere. It is **self-contained**: it owns its
stack and declares no runtime plugin dependencies.

## Skills

The plugin exposes exactly one command directly, **`/cape:setup`**; it vendors the skills
below into the repo's `.claude/skills/` as flat project skills (see [Installation](#installation)).
After setup, run [`/ask-cape`](skills_source/meta/ask-cape/SKILL.md) — it explains how the flow
fits together and routes you to the right skill. See [`GLOSSARY.md`](GLOSSARY.md) for the
shared vocabulary. The full catalogue (each callable as `/<skill>` once vendored):

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
| `triage` | Sort raw incoming bug reports and requests into agent-ready briefs on the backlog. |

### Meta — about cape itself

| Skill | Purpose |
|-------|---------|
| `ask-cape` | Router — finds the right cape skill for your situation and explains the flow. |
| `update-cape` | Re-sync the vendored skills to the newest installed plugin version, as a reviewable git diff. |
| `writing-great-skills` | Reference for writing and editing skills well — the authoring standard for cape skills. |

> Ported and synthesized skills credit their sources in
> [`ATTRIBUTION.md`](ATTRIBUTION.md).

## Installation

Via the colenet marketplace (recommended):

```text
/plugin marketplace add colenet-gmbh/colenet-claude-code-marketplace
/plugin install cape@colenet
```

Then, in each repo where you want to use cape, vendor the skills in:

```text
/cape:setup
```

This copies the harness skills into the repo's `.claude/skills/` and commits them there,
so they resolve as flat project skills — the repo pins exactly which harness is active,
independent of what you have installed globally. Skills are deliberately **not** loaded as
active plugin skills (they ship under `skills_source/`), so there is never a namespaced
duplicate in the menu or the model's context.

Locally for development/testing:

```bash
claude --plugin-dir /path/to/colenet-claude-code-plugin
```

## Usage

After `/cape:setup`, invoke a skill by its flat name:

```text
/ask-cape
```

…or trigger it casually — each skill's trigger phrases fire on natural wording in German
or English. Pull a newer plugin version into the repo later with `/update-cape`.

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
