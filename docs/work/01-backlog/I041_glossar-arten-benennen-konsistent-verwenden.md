---
id: I041
type: issue
priority: next
---

# „Glossar" ist mehrdeutig — Arten benennen und in Skills konsistent verwenden

## Beobachtung

Das Wort „glossary/Glossar" steht bei uns für mehrere verschiedene Artefakte:

- **Domain-Glossar** — die ubiquitäre Sprache des Projekts, arc42 Kapitel 8.
- **Doku-/Tooling-Glossar** — die Umgebung, nicht die Domäne, arc42 Kapitel 12.
- **Software-Design-Glossar** — Leading Words für `codebase-design`/Reports
  (`architect/codebase-design.md`, `improve-codebase-report.md`).
- **`writing-great-skills/GLOSSARY.md`** — das „Domain-Modell für gute Skills", also das
  Glossar der Skill-Schreib-Domäne.

Die Haupt-Unterscheidung Domain vs. Doku/Tooling ist bereits gezogen (Kapitel 12 und
`architect/architecture-documentation.md`). Das Wort bleibt aber überladen, und in den Skills
wird „glossary" teils lose verwendet, ohne zu sagen, welches gemeint ist.

## To do

- Die **Arten von Glossar** mit ihren Rollen an *einer* Stelle benennen.
- In den Skills durchgängig konsistent referenzieren — immer klar, welches Glossar gemeint ist.

## Offener Punkt

- **Wo leben diese Einträge?** Doku/Tooling-Begriffe → Kapitel 12; aber „cape *ist* die
  Domäne", also gehört cape-Mechanik nach Kapitel 8. Beim Umsetzen entscheiden.

## Herkunft

Feedback-Grilling 0.7.x, Leivs Glossar-Thema — der **Präzisierungs**-Faden. Getrennt von
Leivs konkretem *Interpretations*-Problem (siehe Diskussion; braucht ein konkretes Beispiel,
bevor es ein eigenes Work-Item wird).
