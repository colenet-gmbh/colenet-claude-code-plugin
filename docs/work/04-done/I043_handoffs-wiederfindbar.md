---
id: I043
type: issue
priority: next
---

# Handoffs so ablegen, dass sie wiedergefunden werden

## Outcome

Ein Handoff, das eine Session schreibt, findet eine spätere Session zuverlässig wieder —
ohne Raten. Der Ablageort ist sessionunabhängig, in `CONTEXT.md` als Pointer verankert, und
jede Session weiß über die Root-`CLAUDE.md`, dass sie dort nachschauen kann.

## Problem

Das `handoff`-Skill schreibt heute nach „the temporary directory of the user's OS". Auf dem
Mac ist das `$TMPDIR` = `/var/folders/xx/…/T/` — ein pro-Boot zufälliger, unmerkbarer Pfad.
Nichts sagt einer frischen Session, wo Handoffs liegen, und der Dateiname kodiert das Thema
nicht, also ist ein bestimmtes Handoff nicht auffindbar. Genau daran ist ein Lese-Versuch
(„lies das Handoff zum Statusline-Prototyp") gescheitert.

## Entscheidungen (agent-ready)

1. **Handoff-Dir wird ein Pointer in `CONTEXT.md`** — neues logisches Label `handoff-dir`
   neben `arc-docs`/`ADR-dir`/`conventions-dir`, aufgelöst auf einen konkreten Pfad. Der Pfad
   darf die Session **nicht** kodieren (Handoffs gehen von einer Session zur nächsten).
   Umkonfigurierbar durch Editieren von `CONTEXT.md`.
2. **`/cape:setup` legt das Verzeichnis an und trägt den Pointer ein**, OS-abhängig:
   - Mac/Linux: `/tmp/cape-handoffs/` (das OS räumt `/tmp` selbst auf — kein aktives
     Aufräumen nötig).
   - Windows: ein OS-typisches Temp-Verzeichnis (z. B. unter `%TEMP%`). Kein garantiertes
     Auto-Cleanup — akzeptiert; wer es anders will, ändert `CONTEXT.md`.
3. **`/cape:setup` schreibt eine Wegweiser-Zeile in die Root-`CLAUDE.md`** (find-or-create,
   nie doppelt) — bisher fasst setup keine `CLAUDE.md` an. Wortlaut sinngemäß:
   > Read `CONTEXT.md` first — it maps where the project's and the cape harness's key files
   > and directories live.

   Das ist bewusst **allgemein** (nicht handoff-spezifisch): die `CLAUDE.md` ist in jeder
   Session geladen und zeigt auf `CONTEXT.md` als Landkarte; der konkrete Handoff-Pfad steht
   einzig dort.
4. **`handoff`-Skill schreibt in den `handoff-dir` aus `CONTEXT.md`**, Dateiname = Themen-Slug
   in kebab-case (`statusline-prototype.md`), damit man ein Handoff nach Thema wiederfindet.
   Ersetzt die vage „temporary directory of the user's OS"-Formulierung.
5. **Kein aktives Aufräumen** im Skill — Altlasten sind hier nicht wichtig; Verlass auf das
   OS (Mac/Linux) genügt.

## Abgrenzung

- **Kein neuer ADR.** Das ist eine Anwendung von ADR 0002 („Pointer leben in `CONTEXT.md`,
  `/cape:setup` schreibt sie"), keine neue Entscheidung.
- Glossar bekommt einen Eintrag **Handoff** (separat, in diesem Zug erledigt).

## Akzeptanzkriterien

- `CONTEXT.md`-Setup-Vorlage und die reale Repo-`CONTEXT.md` tragen `handoff-dir`.
- `/cape:setup` legt den Ordner OS-abhängig an, trägt den Pointer ein und ergänzt die
  `CLAUDE.md`-Zeile (idempotent, re-run-sicher).
- `handoff`-Skill schreibt nach `handoff-dir` mit Themen-Slug-Dateinamen.
- Ein frisch gestartetes „lies das Handoff zu X" findet die Datei über den Pfad in
  `CONTEXT.md`.
