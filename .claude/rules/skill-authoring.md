# Rule: Authoring skills

Applies to every `skills_source/<bucket>/<name>/SKILL.md` in this plugin. Skills load
directly from the installed plugin, namespaced as `cape:<name>`; the manifest's `skills`
array declares the bucket paths and Claude Code scans each one level deep. See
[`../../CLAUDE.md`](../../CLAUDE.md).

## Structure

- One directory per skill, kebab-case, inside a bucket subfolder:
  `skills_source/<bucket>/<skill-name>/SKILL.md`. It loads as `cape:<skill-name>`, so the
  `<skill-name>` must be **unique across buckets** — the bucket is not part of the name.
- Frontmatter with exactly `name` and `description`. `name` = directory name.
- Keep the body lean (guideline: < ~2,000 words). Push extensive details, examples, or
  scripts into `references/`, `examples/`, or `scripts/` via progressive disclosure and
  link to them from the body.

## Categories

- Skills **are** grouped into bucket subfolders in the source — a bucket, then the skill
  dir, then `SKILL.md`. Each bucket is a path in the manifest's `skills` array, which Claude
  Code scans one level deep for `<name>/SKILL.md`. **A new bucket must be added to the
  `skills` array in `plugin.json` or its skills won't load.** Never nest a skill *below* its
  own dir (the scan is only one level deep). There is no `category` frontmatter field.
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
- **Re-check the `ask-cape` router.** Any skill you add, rename, or remove — or any change
  to how the skills flow together — must be reflected in `ask-cape`, so the router never
  drifts from the actual skill set.
