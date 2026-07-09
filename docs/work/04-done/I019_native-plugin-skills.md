---
id: I019
type: issue
parent: none
blocked-by: []
priority: next
---

# cape liefert seine Skills als native Plugin-Skills aus (Vendoring abgeschafft)

Skills laden direkt aus dem installierten Plugin, statt in die `.claude/skills/` jedes Repos
kopiert zu werden. `cape:setup` behält nur seine Doc-Scaffolding-Rolle. Skills heißen
`cape:<name>`; dieser Präfix ist korrekt — cape wird als ganzes Framework genutzt, nicht als
Grabbelkiste einzelner Skills.

## Changes

1. **`.claude-plugin/plugin.json`** — ein `skills`-Array ergänzen, das jeden Bucket
   auflistet: `["./skills_source/engineering/", "./skills_source/meta/",
   "./skills_source/utility/"]`. `version` auf `0.7.5` bumpen.
2. **`scripts/sync-harness.sh`** — löschen. Das nun leere `scripts/` entfernen, falls sonst
   nichts darin liegt.
3. **`skills_source/meta/update-cape/`** — löschen. Updates laufen jetzt über
   `/plugin update`.
4. **`commands/setup.md`** — Teil 1 (Vendoring) streichen. Teile 2–4 (Board, Issue-Tracker,
   CONTEXT.md, Glossar) behalten. Die Beschreibung anpassen, das "vendor skills"-Framing
   streichen.
5. **Inter-Skill-Referenzen** — jede `/name`-Referenz in den Skill-Bodies durchgehen und je
   Stelle entscheiden: ein echter Aufruf von einem Skill in einen anderen (z. B. `implement`
   → `tdd`, `build` → `implement`, `feature` → `split`) wird zum expliziten `cape:<name>`;
   reine Erklärprosa bleibt Kurzform. `ask-cape` behält durchgängig die Kurzform (es wird als
   Text gelesen) und bekommt eine Fußnote: Skills heißen `cape:<name>` im Plugin, Updates
   laufen über `/plugin update`.
6. **Setup-Gate** — jeder Skill, der `CONTEXT.md`, das `docs/work/`-Board oder andere
   gescaffoldete Config liest, bekommt einen trockenen Satz und stoppt, wenn es fehlt, in
   Anlehnung an Matts Formulierung: *"… should have been provided to you — run `/cape:setup`
   if not."* Eine Regel, keine Ausnahmen — doc-schreibende Skills eingeschlossen.
7. **Docs & Regeln** — alles umschreiben, was den `skills_source`-vs-`skills`-Trick und
   "flache, un-präfixte" Namen beschreibt: `CLAUDE.md`, `.claude/rules/skill-authoring.md`,
   `.claude/rules/plugin-development.md`, `README`. In `skill-authoring.md` ergänzen: ein
   neuer Bucket muss in das `skills`-Array in `plugin.json` aufgenommen werden, sonst lädt er
   nicht. Den Glossar-Eintrag "Harness (three layers)" korrigieren, der cape noch als "into a
   repo vendored" bezeichnet.
8. **Dogfooding** — dieses Repo konsumiert cape als lokal geladenes Plugin, nicht als
   vendorte Kopien. `.claude/skills/` löschen — aber erst, nachdem lokales Plugin-Laden
   funktioniert, sonst entfernen wir die Skills, mit denen wir arbeiten. Den Lade-Mechanismus
   festlegen (`--plugin-dir` vs. lokaler Marketplace; die ungetrackte `.claude/settings.json`
   könnte der Ort sein, das zu pinnen).

## Notes

- **Breaking, als Patch ausgeliefert** — die bloßen Namen fallenzulassen ist technisch
  breaking; Patch ist bewusst (cape ist pre-1.0, faktisch nutzt nur colenet es).
- I004 nochmal ansehen: Namenskollisionen im Modell-Kontext entstanden nur aus den bloßen
  vendorten Namen, also gilt diese Sorge mit nativen Plugin-Skills womöglich nicht mehr.
