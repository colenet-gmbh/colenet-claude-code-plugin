---
id: I045
type: issue
priority: later
status: needs-triage
---

# Context-Map-Format vom architect-Skill trennen (Map ≠ Domäne)

## Erkannt beim

F021 (Statuszeile) — beim Klären, welches Format `/cape:setup` kennen muss, fiel auf, dass
die Formate im architect-Skill Map und Domäne vermischen.

## Befund

`skills_source/engineering/architect/context-format.md` ist **überwiegend die Format-Spec
der Context-Map** (die drei festen Pointer auf arc-docs/ADR-dir/conventions + die erkannten
**Tiers** nach Pfad + Single/Multi-Context). Das **Domain-Glossar-Format** ist darin nur
*ein* Abschnitt.

Pointer und Tiers gehören konzeptionell **nicht** in den architect. Der architect besitzt
die Formate, die Design-Urteil brauchen — das Domain-Glossar (ubiquitäre Sprache) und ADRs.
Die mechanische Pointer-/Tier-Struktur ist **Orientierung/Setup**, nicht Architektur:
`/cape:setup` erzeugt die Map (Pointer + erkannte Tiers), viele Skills lesen sie.

Zusätzlich fehlt in cape's eigenem Domain-Glossar (arc42 Kap. 8) der Begriffs-Eintrag, der
die Trennung festhält: **Context map** = `CONTEXT.md` (Pointer + Tiers, kein Vokabular),
**Domain glossary** = die ubiquitäre Sprache. cape reserviert „Context" für die Map; was
andere Ansätze „Context" nennen, ist bei cape das Domain-Glossar. Tier-Erkennung ist ein
Map-Belang, kein Domänen-Belang.

## Realization job

- `context-format.md` **splitten**: die Vokabular-Regeln raus in ein neues
  `domain-glossary-format.md` (bleibt beim architect — das ist Domäne). Die Map-Spec
  (Pointer + Tiers + Single/Multi-Context) verlässt den architect.
- **Home der Map-Spec entscheiden** (offener Punkt): gehört sie zum Setup-Command, zu einer
  eigenen Orientierungs-/Map-Datei, oder wohin? Sie darf **nicht** dupliziert werden — eine
  Quelle (der frühere F021-Befund: Setup soll das Format nicht nochmal inline führen).
- Verweise in `architect/SKILL.md` nachziehen (lädt heute `context-format.md`,
  `adr-format.md`).
- Den Begriffs-Eintrag in `docs/arc42/08_crosscutting-concepts.md` ergänzen:

  > ### Context map
  >
  > | Concept | What it is |
  > |---|---|
  > | Context map | `CONTEXT.md` — a pointer file: where the durable facts live (arc-docs, ADR-dir, conventions) plus the repo's **tiers** by path. Holds no vocabulary itself. |
  > | Domain glossary | the ubiquitous language (this chapter) — the terms themselves. What some approaches call the "Context"; cape reserves "Context" for the map and calls the vocabulary the Domain glossary. |
  >
  > The **Context map** points *to* the **Domain glossary**, never contains it. Detecting the **tiers** is a map concern (where a tier lives), not a domain one.

## Bezug

Hängt mit dem F021-Setup-Umbau zusammen (Setup-Thema „Orientierung" vs. „Dokumentation"):
sobald die Map-Spec einen klaren Home hat, weiß Setup, worauf es sich beim Anlegen der Map
stützt, ohne ein Format zu duplizieren.
