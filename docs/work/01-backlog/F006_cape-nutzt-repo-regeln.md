---
id: F006
type: feature
priority: v1
---

# cape integriert projektspezifische Regeln, Technologie-Entscheidungen usw

ein Harness besteht aus drei Schichten oberhalb des LLMs. Die unterste Schicht ist der Vendor Specific Harness, das ist zum Beispiel sowas wie Claude Code Darauf aufsetzend gibt es einen projektübergreifenden Harness, eine Kombination von Skills, Hooks, Guidelines etc. die einen generischen Rahmen definieren, wie man als Engineer mit Codebasis arbeitet das ist so was wie cape und dann gibt es eine dritte darauf aufsetzende spezifische ebene in, der festgelegt wird, wie in diesem Projekt gearbeitet wird, wie werden Commit-Messages geschrieben, welche Technologie wird verwendet, welcher Bug-Tracker wird wie gemacht, wann wird released, etc.

in diesem Feature geht es darum, die zweite und die dritte Ebene zusammenzubringen. Damit CAPEF gut funktionieren kann, muss es projektspezifische Regeln aufgreifen, zum Beispiel wenn es programmiert und diese Regeln anpassen und weiterentwickeln können.

## Outcome

Skills wie /implement, /architect/, /tdd, /grill-with-docs nutzen und entwickeln (direkt oder indirekt) aktiv spezifische Regeln, Guidelines, Ways-of-Working und Konventionen weiter, die spezifisch für das aktuelle Projekt sind.

## Mechanismus (entschieden)

Der Ort dafür ist `docs/agent-conventions/`: ein fester, von `/cape:setup` angelegter
Ordner mit benannten Dateien (z. B. `tracker.md`), auf die Level-2-Skills verweisen, um eine
projektspezifische Festlegung abzurufen. Ablauf-Konventionen (z. B. wie ein Build-Review
abläuft) und inhaltliche Standards (z. B. Commit-Message-Stil) landen im selben Ordner —
derselbe Abrufmechanismus, kein separates Verzeichnis pro Art.

## Open points

- **File-Tracker-Templates.** `/cape:setup` muss den File-Tracker mit vollständigen
  Templates ausstatten — nicht nur `tracker.md`, sondern auch Vorlagen für Issue, Feature
  und Agent-Brief. Vorbedingung für F014 (GitHub-Issues-Backend).
- **Bereichsgebundene Konventionen.** Level-3-Vorgaben gelten nicht immer projektweit,
  sondern oft nur für einen Bereich: Frontend hat eigene Frameworks und Arbeitsweisen,
  Backend andere. Genau dieses schichtspezifische Know-how ist der eigentliche Kern hinter
  Spaniers Rollen-Agents (Frontend-/Backend-Dev). Klären, wie `docs/agent-conventions/`
  bereichsgebundene Festlegungen fasst und wie ein Level-2-Skill die *richtigen* aufgreift,
  je nachdem, welche Schicht er gerade anfasst. Verwandt mit F026 (Slicing) — dort geht es
  um den Schnitt, hier um das bereichsspezifische Wissen.
