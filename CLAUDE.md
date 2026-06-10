# CLAUDE.md — capd plugin

Instructions for Claude when working **in this repository**. This is about
*developing the plugin itself*, not using it.

## What this repo is

`capd` (Colenet Agentic Product Development) is colenet's Claude Code harness for
agentic product development in teams.
It collects the best practices of our consultants and engineers as Claude Code **skills**.
Guiding idea: start deliberately small, then grow step by step — quality and clean
documentation over breadth.

- **Plugin repo (here):** `colenet-gmbh/colenet-claude-code-plugin`
- **Marketplace repo (separate):** `colenet-gmbh/colenet-claude-code-marketplace` —
  references this plugin via a GitHub source. Future plugins get their own repos.

## Language

- **All repository files are written in English** — code, comments, skills,
  documentation, commit messages. No exceptions.
- Conversation with the user happens in **German**.
- Skill `description`s may still include German trigger phrases alongside the English
  ones, so skills also fire on German wording — these are triggers, not prose.

## Binding rules

Read before doing substantive work — they take precedence over default behavior:

- [`.claude/rules/skill-authoring.md`](.claude/rules/skill-authoring.md) — how skills in
  this plugin are structured and described.
- [`.claude/rules/attribution.md`](.claude/rules/attribution.md) — the obligation to
  credit adopted content.
- [`.claude/rules/plugin-development.md`](.claude/rules/plugin-development.md) —
  versioning, the release checklist, and how updates reach users.

## Change workflow

- **All changes to the plugin go through a pull request.** Direct pushes to `main` are
  blocked by branch protection; create a branch and open a PR.
- `main` requires the `validate` CI check to pass before a PR can be merged. It runs the
  full pre-commit suite (structural validation, markdownlint, JSON) and, on pull
  requests, additionally **enforces a version bump**: `plugin.json` `version` must be
  greater than on the base branch.
- So bump the version on every change that should reach users (see
  [`.claude/rules/plugin-development.md`](.claude/rules/plugin-development.md)) — a PR
  without a bump fails CI and cannot be merged.

## Layout

```text
.claude-plugin/plugin.json   # manifest (name, version, ...)
skills/<name>/SKILL.md        # one directory with a SKILL.md per skill
.claude/rules/                # development conventions (these rules)
ATTRIBUTION.md                # third-party licenses & sources
```

## Adding a new skill — checklist

1. `skills/<skill-name>/SKILL.md` (kebab-case directory).
2. Frontmatter: `name` + `description`. Description in the **third person** with concrete
   trigger phrases (German + English). See `skill-authoring.md`.
3. Keep the body lean; push details into `references/`/`examples/` via progressive
   disclosure if needed.
4. **If externally sourced:** record source + license in `ATTRIBUTION.md` and add a short
   attribution footer in the SKILL.md (mandatory, see `attribution.md`).
5. Release it: bump `version` in `.claude-plugin/plugin.json` (SemVer) — the **only**
   place — then follow the release checklist in
   [`.claude/rules/plugin-development.md`](.claude/rules/plugin-development.md). Without a
   version bump, installed users get no update.
6. Update the skill table in the README.

## Plugin ↔ marketplace consistency

`plugin.json` `version` is the single source of truth — the marketplace entry carries no
version. The marketplace repo only needs updating when the **listing** changes: if
`name`, `description`, `keywords`, or `homepage` change in `.claude-plugin/plugin.json`,
mirror them in `colenet-claude-code-marketplace/.claude-plugin/marketplace.json`.

## What does NOT belong here (yet)

- Do not hard-wire a role model (Scrum Master / PO / Team) — that decision is still
  pending, and the architecture stays open.
- Do not adopt skills without attribution.
- Do not let the plugin and marketplace state drift apart.
