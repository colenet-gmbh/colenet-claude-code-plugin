---
id: F003
type: feature
priority: v1
---

# cape installiert aus dem Marketplace und ist durchgängig nutzbar

## Outcome

Der echte Pfad funktioniert: das Plugin aus dem Marketplace installieren, `/cape:setup` in
einem frischen Repo ausführen, die Skills laden nativ als `cape:<name>` (kein Vendoring, kein
Sync mehr — abgeschafft in I019), und die gescaffoldeten Docs sind korrekt.

## Akzeptanzkriterien

1. Install aus dem echten Marketplace (`/plugin install cape@colenet`) läuft fehlerfrei.
2. Nach Install sind alle Skills als `cape:<name>` verfügbar — nicht flach, nicht in
   `.claude/skills/` kopiert.
3. `/cape:setup` in einem frischen Repo (ohne vorhandene Docs) läuft fehlerfrei durch.
4. Scaffold korrekt: `docs/work/{01-backlog,02-development,03-approval,04-done,out-of-scope}/`
   je mit `.gitkeep`; `docs/work/.next-id` = `1`; `docs/agent-conventions/tracker.md`;
   `docs/arc42/12_glossary.md` (oder vorhandenes Glossar gefunden); `CONTEXT.md` mit Pointern.
5. Idempotent — ein zweiter `/cape:setup`-Lauf überschreibt nichts (find-or-create).
6. Kreis schließt sich — ein setup-gate-Skill (I019) findet die erzeugten Docs, statt nach
   Setup zu verlangen.

## Stand

Manuell verifiziert auf einer frühen Version (~0.7.4): echter Marketplace-Install
(`cape@colenet`, user-scope), Skills laden nativ als `cape:<name>`, `/cape:setup` scaffoldet
ein frisches Repo. Kriterien 1–2 laufend bestätigt (diese Session zieht die Skills aus dem
installierten Plugin).

Die laufende Absicherung von 3–6 nach *jeder* Änderung ist als eigenes Issue **I027**
(automatisierter Smoketest, v2) abgespalten — ein manueller Rechner-Test bei jeder Änderung
ist nicht praktikabel.

## Graduiert in die Definition of Done

Erreicht — damit stehende Invariante: ein späteres Feature ist erst dann fertig, wenn cape
weiterhin durchgängig installiert und nutzbar ist (siehe `.claude/rules/dod.md`). I027 macht
diese Invariante automatisiert prüfbar.
