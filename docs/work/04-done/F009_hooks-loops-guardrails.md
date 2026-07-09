---
id: F009
type: feature
status: wontfix
priority: next
---

# cape provides the three-layer guardrail mechanics

## Outcome

cape gives teams the three-layer guardrail mechanics — Claude Code hook → git hook → CI —
so quality rules are enforced at every layer, not just trusted to the agent.

## Resolution — absorbed into F015

Not a standalone feature. The three-layer guardrail approach is **documented knowledge**,
not something cape implements upfront: layers 2 and 3 (git hook / CI) are off-the-shelf
(`pre-commit`, GitHub Actions), and only layer 1 (the Claude Code hook pattern) is
cape-shaped. It now lives as the seed **guardrail strategy** inside F015 `/improve-harness`
(glossary + strategy files), applied reactively when the harness does not grip — not built
in advance. See F015 for the full content and the Spanier reference.
