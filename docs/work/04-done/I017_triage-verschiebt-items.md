---
id: I017
type: enhancement
status: ready-for-agent
parent: none
blocked-by: []
priority: v1
---

# Triage verschiebt ausgearbeitete Items nach 02-development

## What to build

`/triage` mit dem Board-als-Energie-Modell in Einklang bringen (siehe `docs/work/CLAUDE.md`):
ein Item, das Triage zu einem **Ergebnis** ausarbeitet — einem `ready-for-agent`-Agent-Brief
— wandert von `01-backlog` nach `02-development`. Items, die bloß in Betracht gezogen werden
(`needs-triage`, `needs-info`), bleiben in `01-backlog`; `wontfix` geht wie bisher nach
`04-done` / `out-of-scope`.

## Notes

- Berührt `skills_source/` (triage) — braucht beim Bau einen Plugin-Versions-Bump.
- Geschwister-Item von I002 (ask-capes Triage-Einmündungs-Formulierung); beide machen die
  Triage-Auffahrt kohärent.

## Agent Brief

**Type:** enhancement
**Summary:** `/triage` muss ein Item nach `docs/work/02-development/` verschieben, sobald es
ein ausgearbeitetes Ergebnis (einen Agent-Brief) produziert, passend zum "Spalten sind
investierte Energie"-Modell des Boards — die Datei nicht in `01-backlog` liegen lassen.

**Current behaviour:** Der "Apply the outcome"-Schritt von `/triage` schreibt den Agent-Brief
für `ready-for-agent` (und `ready-for-human`) in die Datei, verschiebt die Datei aber
**nicht** — sie bleibt in `docs/work/01-backlog/`. Nur `wontfix` wird verschoben (nach
`04-done` / `out-of-scope`). Das widerspricht `docs/work/CLAUDE.md`, wo steht, dass ein
ausgearbeitetes **Ergebnis** nach `02-development` gehört, während bloß in Betracht gezogene
Items im Backlog bleiben. Die Reibung ist real: die Umsetzung von I002 erforderte, dessen
Datei von Hand nach `02-development` zu verschieben, weil der Skill Triage das nie sagte.

**Desired behaviour:** wenn `/triage` einen Outcome anwendet, der ein weitergetragenes
Ergebnis produziert, verschiebt es die Datei aus `01-backlog` nach `docs/work/02-development/`:

- `ready-for-agent` — den Brief schreiben **und** die Datei nach `02-development` verschieben.
- `ready-for-human` — dasselbe: es produziert denselben ausgearbeiteten Brief (plus den Grund,
  warum es nicht delegiert werden kann), ist also gleichermaßen ein Ergebnis und wandert nach
  `02-development`.
- `needs-triage`, `needs-info` — bleiben in `01-backlog` (noch in Betracht gezogen, nichts
  weitergetragen).
- `wontfix` — unverändert: `04-done` (bereits umgesetzt) oder `out-of-scope` (abgelehnte
  Enhancement) wie bisher.

Den Skill in sich kohärent halten: die Einleitung ("Items live as files in
`docs/work/01-backlog/`") und der "Show what needs attention"-Scan beschreiben die
**eingehende** Schlange, was korrekt ist — ausgearbeitete Items haben sie verlassen. Die
Formulierung nur dort anpassen, wo sie unverändert nun widersprüchlich läse.

**Key interfaces:**

- `/triage`-Skill-Text (Quelle: `skills_source/utility/triage/SKILL.md`) — der "Apply the
  outcome"-Schritt (`status`-Zustandsautomat) bekommt die
  Verschiebe-nach-`02-development`-Aktion für die ergebnisproduzierenden Zustände. Die
  **Quelle** editieren, nicht die git-ignorierte vendorte Kopie unter `.claude/skills/`.
- Konsistent bleiben mit dem Board-Modell in `docs/work/CLAUDE.md` (Spalten = investierte
  Energie) und mit `ask-cape`s Beschreibung, wo die Triage-Auffahrt wieder in den Flow
  einmündet (I002).

**Acceptance criteria:**

- [ ] `/triage` verschiebt die Datei eines `ready-for-agent`-Items von `01-backlog` nach
      `02-development`, wenn es den Brief schreibt.
- [ ] `/triage` verschiebt die Datei eines `ready-for-human`-Items ebenfalls nach
      `02-development`.
- [ ] `needs-triage`- und `needs-info`-Items bleiben in `01-backlog`.
- [ ] `wontfix`-Verhalten ist unverändert (`04-done` / `out-of-scope`).
- [ ] Die Einleitung und die "Show what needs attention"-Formulierung bleiben kohärent damit,
      dass Items das Backlog verlassen, sobald sie ausgearbeitet sind.
- [ ] `.claude-plugin/plugin.json` `version` gebumpt (PATCH) — der Text eines
      ausgelieferten Skills hat sich geändert.
- [ ] README / CHANGELOG geprüft; nur aktualisiert, falls sie wiedergeben, wo triagierte
      Items liegen.

**Out of scope:**

- Keine Änderung an den `status`-Werten selbst oder den Triage-Rollen — nur *wo die Datei
  liegt* je Outcome.
- Keine Änderung am `wontfix`-Handling.
- Keinen externen Tracker oder Labels einführen; der Zustand bleibt eine Frontmatter-Zeile
  an der Datei.
- Die vendorte `.claude/skills/`-Kopie nicht editieren (git-ignoriert, aus der Quelle
  regeneriert).
