---
id: I029
type: issue
parent: F001
blocked-by: []
priority: later
---

# Matts `teach`-Skill in cape aufnehmen

## What to build

cape übernimmt Matt Pococks `teach`-Skill (neu in `mattpocock/skills` v1.1.0, unter
`skills/productivity/teach/`) als `cape:teach`, attribuiert nach `attribution.md` und als
Slice von F001.

`teach` macht das aktuelle Verzeichnis zu einem **Lern-Workspace**: eine mehr-Sessions
laufende, zustandsbehaftete Lernbegleitung. Es hält den Lernfortschritt in Dateien
(`MISSION.md` als Grund fürs Lernen, `learning-records/` als „ADRs des Lernens",
`lessons/*.html` als schöne, in sich geschlossene Lektionen, `reference/` als
Nachschlage-Dokumente, `RESOURCES.md`, `assets/` für wiederverwendbare Komponenten). Kern:
Wissen aus vertrauenswürdigen Quellen, Skills durch enge Feedback-Schleifen, Weisheit durch
echte Communities; bewusstes Trennen von Fluency- und Storage-Strength; Lektionen in der
Zone der proximalen Entwicklung.

Der Skill bringt neben `SKILL.md` vier Format-Dateien mit (`MISSION-FORMAT.md`,
`LEARNING-RECORD-FORMAT.md`, `RESOURCES-FORMAT.md`, `GLOSSARY-FORMAT.md`), die per
progressive disclosure verlinkt sind.

## Done

- Skill portiert nach `skills_source/utility/teach/` — `SKILL.md` plus die vier
  Format-Dateien, inhaltlich 1:1 von Matt v1.1.0.
- **Bucket = `utility`.** Kein neuer Bucket, bewusst einfach gehalten (wie besprochen).
  `utility` ist cape's Sammelplatz für allgemeine Helfer (grill-me, handoff, prototype,
  triage); `teach` passt dort rein, `plugin.json` `skills`-Array unverändert.
- **Frontmatter angepasst.** `description` neu mit deutschen + englischen Triggern in
  dritter Person; `disable-model-invocation: true` und `argument-hint` bleiben — `teach`
  ist ein explizit aufgerufener Skill (`/teach`), genau wie triage/handoff das handhaben.
- Attribution: Zeile in `ATTRIBUTION.md` plus Fußnote in `SKILL.md`.
- Release: läuft unter dem offenen Zyklus **0.7.7** (kein eigener Bump), `CHANGELOG.md`
  unter `[0.7.7]` ergänzt.
- `scripts/validate-plugin.sh` grün (18 Skills, Version-Gate ok).

## Notes

- **Mission-Fit entschieden (kein Veto).** Eine der zentralen Herausforderungen für
  Menschen, die in Teams mit KI arbeiten, ist, dass sie sehr schnell sehr viel Neues lernen
  müssen. Lernbegleitung gehört damit zentral zur Mission (KI-Adoption im agilen Kontext,
  Enablement) — nicht als generisches Gadget. Bewusst wird `teach` jetzt *nicht* künstlich
  auf reine Produktarbeit verengt; falls später Bedarf entsteht, lässt sich der Teil in
  auch außerhalb der Produktarbeit nutzbare Skills auslagern. Zusätzlicher Treiber: bei
  colenet gibt es konkrete Nachfrage nach genau diesem Skill — gute Gelegenheit, cape
  bekannter zu machen.
- Matts Repo-Klon (`../../PublicProjects/mattpocock-skills`) wurde für dieses Issue auf Tag
  `v1.1.0` gebracht.
- README hat aktuell keine Skill-Tabelle (flow-basiert), daher dort nichts nachzutragen.
  `teach` ist kein Teil des Hauptflows.
