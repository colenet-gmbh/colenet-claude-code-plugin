---
id: I041
type: issue
priority: now  # 2 — Quick Win, reduziert Verwirrung
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

## Entschieden (Grilling 2026-07-23)

- **Zwei Arten** (revidiert nach Approval-Feedback 2026-07-23; ursprünglich drei):
  - **Domain glossary** — die ubiquitäre Sprache des Projekts, arc42 Kapitel 8.
  - **Environment glossary** — die Umgebung, nicht die Domäne, arc42 Kapitel 12
    (neuer Name, ersetzt „documentation & tooling glossary").
  - Skills können zusätzlich **lokale Glossare** tragen (z. B.
    `writing-great-skills/GLOSSARY.md`, Design-Vokabular in `codebase-design.md`) — die
    sind Teil des jeweiligen Skills, keine cape-Glossar-Art.
- **Wo die Arten benannt werden: Kapitel 8.** Glossare sind zentral für agentisches
  Engineering — die Arten sind Domänenvokabular des Harness, keine Doku-Meta-Begriffe.
  Glossar-Einträge genügen, kein ADR (Vokabular, keine Architekturentscheidung).
- **`GLOSSARY.md` im Repo-Root** (Altbestand 0.7.x, nirgends referenziert) wird komplett
  nach Kapitel 8 gemerged und gelöscht — alle Einträge, auch coding standards und
  architecture documentation, sind Domänenbegriffe.

## Herkunft

Feedback-Grilling 0.7.x, Leivs Glossar-Thema — der **Präzisierungs**-Faden. Getrennt von
Leivs konkretem *Interpretations*-Problem (siehe Diskussion; braucht ein konkretes Beispiel,
bevor es ein eigenes Work-Item wird).

## Umsetzung (2026-07-23)

Umgesetzt auf `feat/i46-glossar-referenzen` (zusammen mit I046, Commits 0a7c53e + 4d5bd14).
Kapitel 8 definiert die drei Arten unter „### Glossary"; Kapitel 12 heißt im Intro jetzt
environment glossary; das Root-`GLOSSARY.md` ist vollständig nach Kapitel 8 gemerged und
gelöscht. Zwei-Achsen-Review gelaufen, Befunde (verlorene Details beim Merge) behoben.
