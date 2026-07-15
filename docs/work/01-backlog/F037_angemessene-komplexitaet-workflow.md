---
id: F037
type: feature
priority: next
---

# cape wählt einen komplexitätsangemessenen Workflow

## Outcome

cape fährt einen Ablauf, der zur Arbeit passt — die Lösungsstrategie „Appropriate complexity"
(arc42 Kapitel 4), angewandt auf den Flow statt auf die Architektur. Eine Ein-Zeilen-Änderung
läuft nicht durch `grill-with-docs` → `feature` → `split` → `build`; ein echtes Feature schon.
Die leichte Lane (`implement` — eine Sache, frischer Kontext, TDD, dann Review) und der volle
Flow stehen beide bereit, und cape wählt die angemessene — oder lässt wählen.

## Quellen (Feedback 0.7.x)

- **Bastian:** Spaniers komplexer Feature-Workflow ist für Kleinigkeiten völlig unangemessen.
- **Bastian (Review-Session):** „Braucht die leichte Lane den Orchestrator? Nein — der setzt
  volle Spec + Sub-Issue-Plan voraus. Leichte Lanes nehmen `implement`; der Orchestrator bleibt
  Feature-only." Bestätigt das Design; hier geht es darum, die Wahl bewusst zu treffen statt
  immer den vollen Flow.

## Realization job

- Kriterien/Trigger, an denen cape die angemessene Lane erkennt (aus der Anfrage ableiten,
  nachfragen, oder ein Nudge) — noch zu entwerfen.
- Verankern, wo die Wahl fällt: vermutlich im Router (`ask-cape`), der die Skills aufspannt.

## Abgrenzung

- Es geht um Flow-**Auswahl** (welchen cape-Pfad wir fahren), **nicht** um Orchestrierung.
  Multi-Worker-Orchestrierung ist `we`-Territorium und bleibt jenseits der `build`-Bright-Line
  (`.claude/rules/dod.md`).
- Schwester-Feature: **F008** (angemessene Komplexität in der Architektur) — dieselbe Strategie,
  andere Domäne.
