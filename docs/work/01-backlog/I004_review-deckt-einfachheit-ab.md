---
id: I004
type: issue
parent: none
blocked-by: []
priority: v1
---

# Review deckt "Maximale Einfachheit" ab

## What to build

Eine dritte Achse, **Simplify**, zu `/review-implementation` neben Standards und Spec
ergänzen: Wiederverwendung (existiert das anderswo in der Codebasis bereits?),
Vereinfachung, Effizienz und Flughöhe (liegt die Logik auf der richtigen Ebene?). Sie gilt
auf beiden Scopes, auf denen der Skill läuft — dem Diff pro Issue und dem integrierten
Feature-Diff. Nur Qualitäts-Linse; sie **jagt keine** Bugs (das bleibt beim
Korrektheits-Review).

## Notes

- Überschneidet sich teilweise mit der Fowler-Baseline der Standards-Achse (Duplicated Code,
  Speculative Generality); die eigenständigen Ergänzungen sind "existiert anderswo bereits?"
  und "richtige Flughöhe?".
- Berührt `skills_source/` (review-implementation) — braucht beim Bau einen
  Plugin-Versions-Bump.
