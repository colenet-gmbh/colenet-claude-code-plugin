---
id: F014
type: feature
priority: next
---

# capes Issue-Tracker ist konfigurierbar und kann GitHub Issues nutzen

## Outcome

`/cape:setup` verdrahtet lokale Dateien nicht länger fest als Tracker: der Tracker ist
konfigurierbar, und GitHub Issues ist ein unterstütztes Backend. Feedback echter Nutzer
landet dort, sobald cape im Einsatz ist.

## Realization job

Die Tracker-Abstraktion (heute `docs/agent-conventions/tracker.md`) konfigurierbar machen
und eine GitHub-Issues-Integration dahinter ergänzen.

## Open points

- **Vorbedingung: der File-Tracker selbst muss zuerst vollständig sein.** Dieses Feature
  ist rein die Backend-Erweiterung um GitHub Issues — es setzt voraus, dass `/cape:setup`
  den File-Tracker schon mit vollständigen Templates ausstattet (Issue, Feature, Agent-
  Brief), nicht nur mit einer einzelnen Tracker-Beschreibungsdatei. Diese Vervollständigung
  ist kein Teil von F014, sondern gehört vorgelagert (vermutlich zu F006).
- **Das Backlog-als-Eingangsschlange-Modell bewahren.** Die Eingangsschlange *ist* das
  Backlog (siehe [`../CLAUDE.md`](../CLAUDE.md)): rohe Items warten dort und wandern erst
  dann nach Development, wenn die Ausarbeitung ein Ergebnis liefert. Die
  GitHub-Issues-Integration muss diesen Übergang bewahren, statt eine separate Inbox wieder
  einzuführen.

## Stand aus Feedback-Grilling (0.7.x, Leiv/Carsten/Bastian)

Bastian übernimmt das Thema Tracker & Issues. Erarbeiteter Ansatz zum Mitgeben:

- **Vorbild: Matts Setup-Skill** (`../../../../skills/skills/engineering/setup-matt-pocock-skills/`,
  lokal in Pascals Harness). Es macht genau das, was F014 will, und ist erprobt: das Issue
  lebt **komplett im Tracker** (kein Split Inhalt/Status). Setup erkundet das Repo
  (`git remote -v`/`.git/config`), schlägt den passenden Tracker vor und hält in *einer*
  kleinen Datei (`docs/agents/issue-tracker.md`) fest, wie man mit ihm redet. Vorlagen je
  Backend: `issue-tracker-{github,gitlab,local}.md`. Skills sprechen neutrale Verben
  ("Issue anlegen", "Ticket holen", "Status ändern"), die Datei übersetzt sie in konkrete
  Befehle (`gh …`/`glab …`/Dateioperation).
- **Backends:** GitHub, GitLab, lokale Dateien, "anderer" (als Prosa beschrieben).
- **capes Ordner-als-Status-Board wird zur „lokale Dateien"-Variante** — eine Option von
  mehreren, nicht mehr das feste Modell.
- **Löst Bastians Branch-Schutz-Schmerz:** mit echtem Tracker ist ein Statuswechsel ein
  API-Call (`gh issue edit/close`) — kein Commit, kein PR pro Übergang. Der PR-pro-Übergang
  existierte nur, weil cape allen das Datei-Ordner-Modell aufzwang.
- **Offener Design-Punkt:** Wo leben die Workflow-Regeln *rund um* den Weg eines Issues
  (Branch mit Ticketnummer, Conventional Commits, Status-Übergänge „Start → In Progress,
  PR → Code Review", Bug-vs-Feature)? Carstens andere Hälfte des Schmerzes — der Tracker
  allein deckt sie nicht ab. Empfehlung aus dem Grilling: in dieselbe Tracker-Datei, damit
  „so läuft ein Issue hier durch" an einem Ort steht statt in zwei synchron zu haltenden.
- **Attribution beachten**, falls Matts Vorlagen übernommen werden (siehe
  `.claude/rules/attribution.md`) — Herkunft prüfen (Matt Pocock vs. colenet-intern).
