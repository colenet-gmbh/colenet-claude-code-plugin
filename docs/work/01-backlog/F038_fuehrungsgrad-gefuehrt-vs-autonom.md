---
id: F038
type: feature
priority: next
---

# cape ist im Führungsgrad flexibel — geführt vs. autonom

## Outcome

cape kann variieren, wie stark es den Nutzer führt. Wer neu ist oder das Framework noch nicht
sicher beherrscht, bekommt einen **geführten** Pfad — „das ist dein nächster Schritt". Wer
erfahren ist, nutzt die **volle Autonomie und Flexibilität** der Skills. Der Führungsgrad ist
einstellbar, statt für alle gleich.

## Warum (Feedback 0.7.x + Zielgruppe)

- Unsere Zielgruppe ist teils noch nicht erfahren genug, um die volle Flexibilität zu nutzen.
- Nutzer von Matts Framework fragen wiederkehrend „was soll ich tun, was als Nächstes?" — genau
  diese Frage soll cape für die, die es wollen, aktiv beantworten (die „besser als Matt"-Linse).
- Knüpft an den früheren Onramp-Gedanken an: auch erfahrene Entwickler müssen das Framework
  erst kennenlernen und brauchen einen einfachen Einstieg.

## Realization job

- Vermutlicher Ort: der Router `ask-cape` (spannt die Skills auf) — er kann proaktiv „was als
  Nächstes?" führen statt nur eine Karte zu sein.
- Einen Führungsgrad-Regler entwerfen (geführt ↔ autonom): woran cape ihn festmacht (Setup-
  Präferenz? erkannt an der Nutzung? jederzeit umschaltbar?) — noch offen.

## Abgrenzung

- **Andere Achse als F037** (angemessener Workflow): F037 passt die Schwere des Ablaufs an die
  *Arbeit* an; dieses Feature passt die Menge an *Führung* an den *Erfahrungsgrad des Nutzers*
  an. Verwandt im Erlebnis, aber getrennt zu denken.
- Kein Orchestrierungs-Thema — reine Nutzerführung, diesseits der `build`-Bright-Line.
