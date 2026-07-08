---
id: F003
type: feature
priority: v1
---

# cape installs from the marketplace and is usable end to end

## Outcome

The real path works: install the plugin from the marketplace, run `/cape:setup` in a fresh
repo, the vendored skills work flat (`/skill-name`), and the scaffolded docs are correct.
So far the sync mechanism is verified only in dev mode against the pre-rename cache.

## Realization job

Install for real, run `/cape:setup` in a fresh repo, verify the flat skills and the
scaffolded docs. Whatever breaks becomes an issue of this feature.

## Graduates into the Definition of Done

Once reached, this becomes a standing invariant: a later feature is only done when cape
still installs and is usable end to end.
