# Attribution / Third-Party Licenses

This plugin includes material from external open-source projects. We credit the origin
transparently and reproduce the respective license texts as required.

> **Rule:** Every ported or externally adopted skill must be listed here.
> See [`.claude/rules/attribution.md`](.claude/rules/attribution.md).

---

## `skills/grill-me`

- **Original:** `grill-me` from [`mattpocock/skills`](https://github.com/mattpocock/skills)
- **Author:** Matt Pocock
- **Source:** <https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md>
- **License:** MIT
- **Changes by colenet:** added German trigger phrases to the `description`; instruction
  body unchanged; attribution footer added.

### License text of the original

```
MIT License

Copyright (c) 2026 Matt Pocock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## `skills/brainstorm`

- **Original:** `brainstorming` from [`superpowers`](https://github.com/obra/superpowers)
- **Author:** Jesse Vincent (obra)
- **Source:** <https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md>
- **License:** MIT
- **Changes by colenet:** added German trigger phrases; removed references to
  superpowers-internal skills; wired the hand-off into the capd workflow; added an
  attribution footer.

### License text of the original

```
MIT License

Copyright (c) Jesse Vincent

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## `skills/grill-with-docs`

- **Original:** `grill-with-docs` (with the glossary/ADR discipline from `domain-modeling`)
  from [`mattpocock/skills`](https://github.com/mattpocock/skills)
- **Author:** Matt Pocock
- **Source:** <https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md>
- **License:** MIT (© 2026 Matt Pocock) — full text reproduced in the `skills/grill-me`
  section above.
- **Changes by colenet:** added German triggers; folded the grilling engine inline; wired
  into the capd workflow.

## `skills/split`

- **Original:** `to-issues` from [`mattpocock/skills`](https://github.com/mattpocock/skills)
- **Author:** Matt Pocock
- **Source:** <https://github.com/mattpocock/skills/blob/main/skills/engineering/to-issues/SKILL.md>
- **License:** MIT (© 2026 Matt Pocock) — see the `skills/grill-me` section above.
- **Changes by colenet:** records slices as repo Markdown instead of tracker issues; added
  German triggers; wired into the capd workflow.

## `skills/feature` (synthesis)

- **Sources:**
  - `to-prd` from [`mattpocock/skills`](https://github.com/mattpocock/skills) (Matt Pocock,
    MIT) — the "conversation → PRD" idea.
  - The traveling feature-file convention (`docs/features/F###-slug.md`, status in path and
    frontmatter) from Michael Spanier's coding harness.
- **License:** MIT for the Pocock portion (© 2026 Matt Pocock, text above); the Spanier
  convention is adopted as a pattern.
- **Nature:** original colenet skill synthesizing both; no verbatim copy.

## `skills/build` (synthesis)

- **Sources:**
  - `tdd` and `implement` from [`mattpocock/skills`](https://github.com/mattpocock/skills)
    (Matt Pocock, MIT) — the TDD discipline.
  - `fullstack-orchestrator` from Michael Spanier's coding harness — the preamble-injection
    role review (the orchestrator's engine parts are deliberately omitted).
- **License:** MIT for the Pocock portion (© 2026 Matt Pocock, text above).
- **Nature:** original colenet skill; lean single-flow, honoring the `build` bright line
  in `.claude/rules/dod.md`.

## `skills/ask-capd`

- **Nature:** original colenet skill. The router pattern is inspired by `ask-matt` from
  [`mattpocock/skills`](https://github.com/mattpocock/skills) (Matt Pocock, MIT). No content
  was copied; credited for the idea.

## `skills/software-architect`

- **Adapted from:** the `software-architect` role of Michael Spanier's coding harness
  (architecture review, clean-code enforcement, ADRs, arc42 usage) and the
  mandatory-review-before-build discipline of his `requirement-engineer`.
- **License / scope:** the source is a private customer project; only the generic role,
  the review discipline, and the public [arc42](https://arc42.org) template are adopted —
  no project-specific content or code.
- **Nature:** original colenet skill; establishes/evolves arc42 and reviews the concept.

## `skills/build/references/engineering-rules.md` and the feature board

- **Distilled from:** the Clean-Code rules (CC/PL), frontend and security disciplines
  (FD/SEC), blocking quality gates, and the `docs/features/` board + `_counter.txt`
  convention of Michael Spanier's coding harness; the TDD discipline converges with Matt
  Pocock's `tdd` (MIT).
- **License / scope:** generalized and stack-stripped; no project-specific content or code.
- **Nature:** capd's own opinionated, stack-agnostic engineering rules and lifecycle.
