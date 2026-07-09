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

Die Tracker-Abstraktion (heute `docs/agents/issue-tracker.md`) konfigurierbar machen und
eine GitHub-Issues-Integration dahinter ergänzen.

## Open points

- **Das Backlog-als-Eingangsschlange-Modell bewahren.** Die Eingangsschlange *ist* das
  Backlog (siehe [`../CLAUDE.md`](../CLAUDE.md)): rohe Items warten dort und wandern erst
  dann nach Development, wenn die Ausarbeitung ein Ergebnis liefert. Die
  GitHub-Issues-Integration muss diesen Übergang bewahren, statt eine separate Inbox wieder
  einzuführen.
