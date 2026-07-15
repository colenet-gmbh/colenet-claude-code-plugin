---
id: I040
type: issue
priority: next
---

# Trigger-Breite-Prinzip in writing-great-skills aufnehmen, Handwerk aus der Regel prunen

Zwei kleine, zusammengehörige Schritte:

## 1. Sorgfältige Zeile in `writing-great-skills` (Abschnitt „Invocation")

Das Prinzip aus dem Feedback-Grilling festhalten:

> Triggerbreite ist eine bewusste Wahl. Eng getriggert = situativ, echte Progressive
> Disclosure (nur geladen, wenn relevant); breit getriggert = faktisch ein immer präsenter,
> klar umrissener Abschnitt des System-Prompts. Beides legitim — aber breit nur, wenn das
> Verhalten wirklich immer präsent sein soll *und* der Scope eng und klar ist. Fehlerfall:
> ein *situatives* Verhalten mit breitem Trigger — immer geladen, verwässert den Fokus, ohne
> den Nutzen.

Schließt eine echte Lücke: der Skill behandelt bisher die Dauerlast der **Description**, aber
nicht, dass ein **breit getriggerter Body** faktisch ebenfalls dauernd lädt. Vertieft den
bestehenden Abschnitt, dupliziert nicht.

## 2. Pruning in `.claude/rules/skill-authoring.md`

Der Abschnitt „description (decides triggering)" ist **Handwerk** und damit `writing-great-
skills`' Revier. Auf einen Verweis eindampfen, statt die Craft-Regeln in der Regel zu doppeln.
Die Regel behält nur cape-spezifische Struktur & Prozess (Buckets, `skills`-Array, eindeutige
Namen, `${CLAUDE_PLUGIN_ROOT}`, Attribution, Nachlauf-Schritte, `ask-cape`-Router).

## Herkunft

Feedback-Grilling 0.7.x, aus der Verortung von Leivs `context-first` → F039 (grilling klärt
auch das Warum). Grundsatz: ein breit getriggerter Skill ist ein getarnter, aber klar
umrissener System-Prompt-Abschnitt — bewusst wählen, nicht aus Versehen.
