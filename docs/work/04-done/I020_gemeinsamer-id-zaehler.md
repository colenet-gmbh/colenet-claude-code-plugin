---
id: I020
type: issue
parent: none
blocked-by: []
priority: next
status: ready-for-agent
---

# Board-IDs nutzen einen gemeinsamen Zähler über F und I, in einer Datei gespeichert

## Problem

Item-Nummern sind in zwei parallele Sequenzen abgedriftet: Features liefen `F001…F015`,
Issues liefen `I001…I005`. Es gab keine Source of Truth für "die nächste Nummer" —
`docs/agents/issue-tracker.md` und `docs/work/CLAUDE.md` sagten nur *"die Nummer ist
Erfassungsreihenfolge"*, und die Nummer wurde ad hoc durch Scannen bestehender IDs je Präfix
abgeleitet, sodass `I001…I005` mit `F001…F005` kollidierten.

## Desired outcome

Das Präfix (`F`/`I`) markiert **nur den Typ**; die Nummer kommt aus **einem gemeinsamen
Zähler**, dessen Source of Truth eine Datei ist, `docs/work/.next-id` (spiegelt, wie Spaniers
Framework den Zähler hält). Keine zwei Board-Items teilen sich je eine Nummer, unabhängig vom
Präfix. Weil Nummern in Erfassungsreihenfolge vergeben werden, bedeutet eine höhere Nummer
immer "später erfasst".

## Decisions (locked)

- **Der Zähler lebt in einer Datei:** `docs/work/.next-id`, hält die nächste freie
  Ganzzahl. Gewählt gegenüber einem abgeleiteten Max-Scan wegen der Explizitheit, passend zu
  Spaniers Ansatz. Name `.next-id` (nicht `.counter`).
- **`/cape:setup` muss `.next-id` erstellen**, wenn es `docs/work/` scaffoldet, geseedet auf
  die erste freie Nummer (`1` für ein frisches Repo).
- **Alle bestehenden Items wurden umnummeriert**, chronologisch nach
  Datei-Erstellungs-Zeitstempel, inklusive der `04-done`-Items — als Teil dieses Issues
  erledigt (siehe unten).

## Realization

- [x] Jedes Board-Item in eine Sequenz umnummerieren nach Geburts-Zeitstempel (F015 behielt
  seine Nummer; alles andere verschob sich). `id:`-Frontmatter passend zu jedem neuen
  Dateinamen aktualisiert.
- [x] `docs/work/.next-id` in diesem Repo erstellen, geseedet auf die nächste freie Nummer
  (21).
- [x] Die Regel in `docs/work/CLAUDE.md` (Numbering-Abschnitt) und
  `docs/agents/issue-tracker.md` festhalten: Präfix = Typ; Nummer = der gemeinsame Zähler,
  gelesen aus `docs/work/.next-id`, der bei jedem neuen Item hochgezählt wird.
- [x] `/cape:setup` (`commands/setup.md`) aktualisieren, sodass es `docs/work/.next-id` auf
  `1` geseedet erstellt, wenn es das Work-Board scaffoldet, und die Numbering-Regel im
  eingebetteten Issue-Tracker-Doc dokumentiert. (Vendoring / `scripts/sync-harness.sh` wurde
  von I019 abgeschafft, also lebt Setup nun vollständig in `commands/setup.md`.) Kein
  Versions-Bump nötig: der Release-Zyklus ist bereits bei `0.7.5` (> `main`s `0.7.2`).

## Notes

- Trade-off akzeptiert: eine Datei ist ein zweites, synchron zu haltendes Ding, und ein
  veraltetes `.next-id` könnte Kollisionen wieder einführen. Abgemildert, indem die Datei bei
  jeder Erfassung stets erst-gelesen-dann-hochgezählt wird.
