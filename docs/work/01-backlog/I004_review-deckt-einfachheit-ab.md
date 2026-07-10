---
id: I004
type: issue
parent: none
blocked-by: [F006]
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

## Als zentrale Konvention, nicht hartkodiert

Die konkreten Review-Aspekte werden **nicht** in den Skill-Body geschrieben, sondern als
zentrale „review"-Konvention (`docs/agent-conventions/`) festgehalten; `/review-implementation`
(und `/review-feature`) konsultieren sie. So kann ein Projekt seine Review-Achsen erweitern
oder anpassen, statt dass sie in cape festzementiert sind. Deshalb hängt dieses Issue an
**F006** (Mechanismus für zentrale Konventionen + `CONTEXT.md`-Pointer). Die Simplify-Achse
ist dann ein Eintrag in dieser Konvention, kein Skill-Edit.

## Notes

- Überschneidet sich teilweise mit der Fowler-Baseline der Standards-Achse (Duplicated Code,
  Speculative Generality); die eigenständigen Ergänzungen sind "existiert anderswo bereits?"
  und "richtige Flughöhe?".
- Berührt `skills_source/` (review-implementation) — braucht beim Bau einen
  Plugin-Versions-Bump.
