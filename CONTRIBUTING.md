# Contributing to capd

Thanks for extending colenet's plugin. This page covers the quality gate. For *what*
to write, see the rules in [`.claude/rules/`](.claude/rules/): skill authoring,
attribution, and the release/versioning workflow.

## Add a new skill

1. Create a directory: `skills/<skill-name>/SKILL.md` (kebab-case).
2. Follow [`.claude/rules/skill-authoring.md`](.claude/rules/skill-authoring.md): lean
   body, third-person description with clear trigger phrases (German **and** English),
   progressive disclosure for details.
3. If the skill is adopted from an external source, record the origin per
   [`.claude/rules/attribution.md`](.claude/rules/attribution.md) in
   [`ATTRIBUTION.md`](ATTRIBUTION.md).
4. Add it to the skill table in the README.
5. Run `pre-commit run --all-files` (green) and release it per
   [`.claude/rules/plugin-development.md`](.claude/rules/plugin-development.md).

## Prerequisites

- `python3` (validation script, pre-commit)
- `node` 18+ (markdownlint)
- [`pre-commit`](https://pre-commit.com/#install) — e.g. `pipx install pre-commit` or
  `pip install --user pre-commit`

## Activate the pre-commit hook (required, once per clone)

The checks run automatically on every commit — **but only after you enable them**:

```bash
pre-commit install
```

Without this step the hooks do not run locally and you will only find out something is
wrong when CI turns red (see below). So do it right after cloning.

Run all checks manually any time:

```bash
pre-commit run --all-files
```

## What the hooks do

| Hook | Checks |
|------|--------|
| `trailing-whitespace` | Removes trailing spaces |
| `end-of-file-fixer` | Normalizes blank lines at end of file |
| `check-json` | `plugin.json` is valid JSON |
| `markdownlint-cli2` | Markdown lint (lenient ruleset in `.markdownlint.yaml`) |
| `validate-plugin` | Manifest schema, skill layout (frontmatter, naming, no nested skills), internal doc links — `scripts/validate-plugin.sh` |

The first three may **auto-fix** files. If a hook changes a file, the commit is aborted;
re-stage the fixed files (`git add -u`) and commit again.

## How CI works — and how you notice a problem

The same hooks run in GitHub Actions
([`.github/workflows/validate.yml`](.github/workflows/validate.yml)) on every push and
pull request. CI does **not** fix anything — it only reports. On pull requests it also
**requires a version bump**: `plugin.json` `version` must be greater than on the base
branch, or the `validate` check fails.

When something is wrong you find out via:

- a **red ✗** next to the commit and in the "Checks" tab of the pull request,
- an **email from GitHub** to the commit author for the failed run,
- the **Actions** tab, where the failing hook and its output are shown.

A red CI run by itself does **not** undo a bad commit on a branch. To make the check
actually block bad merges, enable **branch protection** on `main` with the `validate`
check marked as *required* — then a failing check prevents the merge. Combined with the
local pre-commit hook (fast feedback before the commit) and CI (the non-bypassable
gate), problems are caught at both ends.

## Before opening a pull request

1. `pre-commit run --all-files` is green.
2. New/changed skill follows [`.claude/rules/skill-authoring.md`](.claude/rules/skill-authoring.md);
   external sources are credited per [`.claude/rules/attribution.md`](.claude/rules/attribution.md).
3. README skill table and `CHANGELOG.md` updated.
4. Version bumped per [`.claude/rules/plugin-development.md`](.claude/rules/plugin-development.md).

## Repository layout

```text
colenet-claude-code-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── skills/
│   └── grill-me/
│       └── SKILL.md         # First skill (ported, attributed)
├── .claude/
│   └── rules/               # Conventions for plugin development
│       ├── skill-authoring.md
│       ├── attribution.md
│       └── plugin-development.md
├── scripts/
│   └── validate-plugin.sh   # Structural validation (used in CI)
├── .github/workflows/
│   └── validate.yml         # Runs pre-commit checks on push & PR
├── .pre-commit-config.yaml  # Hook definitions (local + CI)
├── .markdownlint.yaml       # Lenient markdownlint ruleset
├── CONTRIBUTING.md          # This file
├── CLAUDE.md                # Instructions for Claude when working in this repo
├── CHANGELOG.md             # Release history
├── ATTRIBUTION.md           # Third-party licenses & sources
├── LICENSE                  # MIT
└── README.md
```
