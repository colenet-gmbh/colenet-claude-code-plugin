---
id: I019
type: issue
parent: none
blocked-by: []
priority: next
---

# cape ships its skills as native plugin skills (retire the vendoring)

Skills load directly from the installed plugin instead of being copied into each repo's
`.claude/skills/`. `cape:setup` keeps only its doc-scaffolding role. Skills are named
`cape:<name>`; that prefix is correct — cape is used as a whole framework, not a grab-bag
of individual skills.

## Changes

1. **`.claude-plugin/plugin.json`** — add a `skills` array listing each bucket:
   `["./skills_source/engineering/", "./skills_source/meta/", "./skills_source/utility/"]`.
   Bump `version` to `0.7.5`.
2. **`scripts/sync-harness.sh`** — delete. Remove the now-empty `scripts/` if nothing else
   lives there.
3. **`skills_source/meta/update-cape/`** — delete. Updates now run via `/plugin update`.
4. **`commands/setup.md`** — drop part 1 (vendoring). Keep parts 2–4 (board, issue
   tracker, CONTEXT.md, glossary). Update the description to drop the "vendor skills"
   framing.
5. **Inter-skill references** — walk every `/name` reference in the skill bodies and, per
   site, decide: a real call from one skill into another (e.g. `implement` → `tdd`,
   `build` → `implement`, `feature` → `split`) becomes the explicit `cape:<name>`; plain
   explanatory prose stays short form. `ask-cape` keeps the short form throughout (it is
   read as text) and gains a footer note: skills are `cape:<name>` in the plugin, updates
   run via `/plugin update`.
6. **Setup gate** — every skill that reads `CONTEXT.md`, the `docs/work/` board, or other
   scaffolded config gets one dry sentence and stops if it's missing, adapting Matt's
   wording: *"… should have been provided to you — run `/cape:setup` if not."* One rule,
   no exceptions — doc-writing skills included.
7. **Docs & rules** — rewrite everything describing the `skills_source`-vs-`skills` trick
   and "flat, un-prefixed" names: `CLAUDE.md`, `.claude/rules/skill-authoring.md`,
   `.claude/rules/plugin-development.md`, `README`. In `skill-authoring.md` add: a new
   bucket must be added to the `skills` array in `plugin.json` or it won't load. Fix the
   glossary's "Harness (three layers)" entry, which still calls cape "vendored into a repo".
8. **Dogfooding** — this repo consumes cape as a locally-loaded plugin, not vendored
   copies. Delete `.claude/skills/` — but only after local plugin loading works, or we
   remove the skills we're working with. Settle the load mechanism (`--plugin-dir` vs.
   local marketplace; the untracked `.claude/settings.json` may be the place to pin it).

## Notes

- **Breaking, shipped as a patch** — dropping the bare names is technically breaking; patch
  is deliberate (cape is pre-1.0, effectively only colenet uses it).
- Revisit I004: model-context name collisions only arose from bare vendored names, so with
  native plugin skills that concern may no longer apply.
