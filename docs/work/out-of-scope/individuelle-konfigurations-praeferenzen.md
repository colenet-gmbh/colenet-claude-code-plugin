---
type: out-of-scope
since: 2026-07-15
status: für den Moment (revidierbar)
---

# Individuelle Konfigurations-Präferenzen sind out of scope

**Auslöser:** Carstens Wunsch nach einem optionalen „Caveman"-/Kompakt-Modus für knappere
Ausgaben (Feedback 0.7.x).

## Entscheidung

Die Unterstützung **individueller Konfigurations-Präferenzen** — wie geschwätzig, in welchem
Ton, in welchem Format cape kommuniziert — ist **kein cape-Feature**. Für den Moment als out
of scope festgehalten; nicht zwingend für immer.

## Warum (Guardian-Begründung)

- **Persönliche Präferenz, keine Methode.** cape bündelt colenets Best Practices *für agentic
  product engineering im Team* — Vorgehen, Flow, Handwerk. Ausführlichkeit ist Geschmack
  (Claude Code liefert bewusst auch die *gegenteilige* Präferenz aus: „Explanatory",
  „Learning"). Ein Präferenz-Regler lehrt kein Vorgehen.
- **Level-1-Sache, cape ist Level 2.** Output Styles sind ein natives Claude-Code-Feature auf
  Nutzer-/Projektebene. Ein Output Style ist zudem ein **globaler** System-Prompt-Eingriff
  (einer aktiv, überschreibt die Wahl des Nutzers) — das Gegenteil von capes Wesen: kleine,
  komponierbare Skills, die jedes Setup ergänzen.

## In scope bleibt (der berechtigte Kern)

- **Knappe, auf den Punkt gebrachte Ausgabe als Qualitätsbar für capes eigene Skills** —
  cape schwätzt von Haus aus nicht, statt einen Modus zum Einschalten anzubieten. (Eigenes
  Issue; Haltung schon vorhanden in F008 und `writing-great-skills`.)
- **README-Zeile**, die Nutzer mit globalem Kompakt-Wunsch auf Claude Codes Output Styles
  verweist — cape liefert selbst keinen aus.
