# Rule: Authoring skills

Applies to every `skills/<name>/SKILL.md` in this plugin.

## Structure

- One directory per skill, kebab-case: `skills/<skill-name>/SKILL.md`.
- Frontmatter with exactly `name` and `description`. `name` = directory name.
- Keep the body lean (guideline: < ~2,000 words). Push extensive details, examples, or
  scripts into `references/`, `examples/`, or `scripts/` via progressive disclosure and
  link to them from the body.

## Categories

- Do **not** nest skills in category folders (`skills/<category>/<name>/SKILL.md`).
  Claude Code only discovers plugin skills exactly one level deep — nested skills are
  not loaded. There is no `category` frontmatter field either.
- Express categories in the **README**: group the skill table under category headings
  (e.g. `### Productivity`). The category is documentation, not structure.

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
