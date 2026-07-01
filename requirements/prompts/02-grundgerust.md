# Prompt 2 — Grundgerüst als Loop aufbauen

Baue jetzt das `capd`-MVP auf — als **Loop mit Qualitätsvorgaben und
Abbruchkriterien**, nicht in einem Rutsch. Die Richtung aus Prompt 1 ist die
Grundlage; wenn wir uns dort anders entschieden haben, nimm das als Maßstab.

## Umfang

Bewusst **einfache Basis**, Entwickler-Scope, kein voll ausgebautes Plugin. Eine Hülle
mit Governance (CI, DoD, Guardian, Attribution) plus 3–5 Hebel-Skills, die du aus den
`requirements/`-Steckbriefen begründest. Zu groß bringt jetzt nichts — wir brauchen
erst mal etwas, das colenet gehört und das man sich ansehen kann.

## Loop

Wiederhole pro Skill:

1. Begründe kurz, warum dieser Skill in die Basis gehört.
2. Schreibe den Skill nach `.claude/rules/skill-authoring.md` (lean body, DE+EN-Trigger,
   progressive disclosure). Extern bezogen → Attribution nach `attribution.md`.
3. Validiere: `bash scripts/validate-plugin.sh` grün.
4. Checkpoint mit mir: ist der Skill so in Ordnung, bevor der nächste kommt?

Nutze die verfügbaren Skills (`superpowers:brainstorming`, `superpowers:writing-plans`,
`superpowers:test-driven-development`), wo sie helfen.

## Qualitätsvorgaben (jeder Skill)

- DoD aus `.claude/rules/dod.md` erfüllt oder erweitert, Guardian-Check bestanden.
- Konventionen aus `skill-authoring.md` und `attribution.md`.
- `pre-commit run --all-files` bzw. CI `validate` grün.
- README-Skill-Tabelle und `CHANGELOG.md` aktuell.
- Version in `.claude-plugin/plugin.json` gebumpt (CI erzwingt es auf PRs).

## Abbruchkriterien

Der Loop endet, wenn:

- die vereinbarten Skills als PR vorliegen (gemerged oder bereit zum Mergen),
- CI `validate` grün ist,
- die Version gebumpt und README + CHANGELOG aktuell sind,
- und wir beide den Scope für diese Basis abnehmen.

Kein Skill landet ohne Freigabe in einem PR. Wenn uns der Scope entgleitet, stopp mich
und wir verkleinern.