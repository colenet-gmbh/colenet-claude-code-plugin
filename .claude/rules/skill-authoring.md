# Rule: Authoring skills

Applies to every `skills_source/<name>/SKILL.md` in this plugin. Skills ship under
`skills_source/` (never `skills/`) so the plugin loader doesn't register them as active
plugin skills; `/cape:setup` vendors them into a repo's `.claude/skills/` as flat project
skills. See [`../../CLAUDE.md`](../../CLAUDE.md).

## Structure

- One directory per skill, kebab-case, inside a bucket subfolder:
  `skills_source/<bucket>/<skill-name>/SKILL.md`. The flat `<skill-name>` must be **unique
  across buckets** — `/cape:setup` flattens the bucket away when vendoring.
- Frontmatter with exactly `name` and `description`. `name` = directory name.
- Keep the body lean (guideline: < ~2,000 words). Push extensive details, examples, or
  scripts into `references/`, `examples/`, or `scripts/` via progressive disclosure and
  link to them from the body.

## Categories

- Skills **are** grouped into bucket subfolders in the source — a bucket, then the skill
  dir, then `SKILL.md`. This works only because `/cape:setup` flattens the bucket away on
  vendor; the vendored `.claude/skills/` stays one level deep, the only layout Claude Code
  discovers. Never nest a skill *below* its own dir. There is no `category` frontmatter
  field.
- Mirror the buckets in the **README**: group the skill table under one heading per bucket.
  Name the buckets only where it helps a reader — the README grouping, and `ask-cape` where
  it aids explanation. Don't bake the list into scripts, validation, or these rules.

## description (decides triggering)

- **Third person**, describing *when* the skill applies — not what it "is".
- Include concrete **trigger phrases**, in **German and English**, because colenet works
  in both languages. Example: `… mentions "grill me", "grill mich", "tear my plan apart".`
- No vague descriptions ("helps with planning") — name the triggering situations.

## Body

- Addressed to Claude, in the imperative. An English instruction core is fine; user
  communication happens in German regardless.
- All content in English (see CLAUDE.md). No sensitive data, no hardcoded absolute paths.
  Reference intra-plugin paths via `${CLAUDE_PLUGIN_ROOT}`.

## After creating

- Bump `version` in `.claude-plugin/plugin.json` and in the marketplace entry.
- Update the skill table in the README.
- If externally sourced: attribution per [`attribution.md`](attribution.md).
