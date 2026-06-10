# Rule: Attribution of adopted content

Whenever a skill (or other content) is ported, copied, or adapted from an external
source, the origin **must** be credited. No exceptions.

## Required steps

1. **`ATTRIBUTION.md`** (plugin root): add an entry with
   - the original name and a link to the source repository,
   - the author,
   - the exact source URL,
   - the license,
   - a short note on the changes colenet made,
   - the reproduced original license text (verbatim, if the license requires it — e.g.
     MIT requires the copyright notice to be retained).
2. **`SKILL.md` footer**: add a short "Attribution" section pointing to the original
   source and license, and link to `ATTRIBUTION.md`.

## License compatibility

- Only adopt content whose license permits reuse and modification (e.g. MIT, Apache-2.0,
  BSD). When in doubt, ask before adopting.
- Retain required notices (MIT/BSD: keep the copyright line; Apache-2.0: preserve
  `NOTICE` content).
- Do not relicense third-party content as colenet's own. The repo's MIT `LICENSE` covers
  colenet's contributions; adopted parts keep their original license, documented in
  `ATTRIBUTION.md`.
