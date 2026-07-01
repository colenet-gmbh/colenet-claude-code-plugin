# Prompt 2 — Grundgerüst der capd-Spine (als Loop)

Die Richtung steht: `requirements/05-richtung-capd-v1.md` ist das Ergebnis von Prompt 1
und der **verbindliche Maßstab** für diese Session. **Lies es zuerst** — dort ist die
Skill-Auswahl bereits entschieden und begründet. Hier wird **gebaut, nicht neu gewählt**.
Wenn dich die Umsetzung etwas revidieren lässt, sag es und begründe es — aber lauf nicht
ungefragt in eine andere Richtung.

Baue das Grundgerüst **als Loop mit Qualitätsvorgaben und Abbruchkriterien**, nicht in
einem Rutsch. Erkläre deine Schritte nachvollziehbar — eine Kollegin / ein Kollege
arbeitet sich mit ein.

## Ausgangslage (aus `05` — nicht neu herleiten)

capd v1 = **eine geführte Spine + eine Utility-Klasse**, colenet-eigen, klein, ohne `we`
zu duplizieren.

- **Spine (Workflow-Skills):** `brainstorm` (aus superpowers **wiederverwenden**) →
  `grill-with-docs` (Pocock, portieren) → **`feature`** ★ (neu) → `split` (Pocock,
  portieren) → **`build`** ★ (neu, schlank).
- **Utility:** `grill-me` (vorhanden).
- **Bright Line für `build`** und die Out-of-Scope-Liste (`we`-Engine,
  `writing-skills`/`retro`, Fabians Höhenstufen, Spaniers Stack-Spezifika): siehe `05`.

## Phase 0 — die vier offenen Punkte entscheiden (zuerst, eine Frage nach der anderen, je mit Empfehlung)

Erst wenn diese vier stehen, wird gebaut:

1. **superpowers-Dependency bleibt?** (für `brainstorm`-Reuse — revidiert bewusst die
   frühere „eigener Stack"-Wahl) — *Empfehlung: ja, bleibt.*
2. **Ground Truth für `split`:** Markdown-Kind-Dateien vs. Tracker-Issues — *Empfehlung:
   Markdown, konsistent mit der `feature`-Datei; ein Tracker bleibt optionaler Index.*
3. **Router/Spine-Skill jetzt oder vertagen?** — *Empfehlung: dünner user-invoked Router
   (`ask-capd`-Muster), aber erst wenn ≥4 Skills stehen.*
4. **Namensgebung:** Workflow-/Router-Kommando und `feature`-Datei-Konvention
   (`docs/features/F###-slug.md`?) — *Empfehlung entlang Spaniers wandernder Feature-Datei.*

## Phase 1 — Struktur/Skelett zuerst

- **Ordner-Layout:** Skills bleiben **flach** (`skills/<name>/SKILL.md`, genau eine Ebene
  tief). Die zwei Klassen (Workflow/Utility) sind **README-Kategorien, keine Ordner** —
  Claude Code lädt Skills nur eine Ebene tief (siehe `.claude/rules/skill-authoring.md`).
- README-Skill-Tabelle nach Klassen gruppieren; `CHANGELOG.md`-Eintrag anlegen;
  `plugin.json` gemäß der Dependency-Entscheidung aus Phase 0 vorbereiten.
- Die **Bright Line für `build`** als Regel festhalten (in der `build`-SKILL.md bzw.
  `.claude/rules/`), damit sie später nicht verwässert.

## Phase 2 — Skills im Loop (einfachste/sicherste zuerst, `build` zuletzt)

Empfohlene Reihenfolge: `grill-with-docs` → `feature` → `split` → (Router, falls
beschlossen) → `build`. **`build` ist der riskanteste, schwerste Schritt** — eigener,
strenger Checkpoint; wenn er den Scope sprengt, **vertagen wir ihn in einen eigenen
Prompt** (das ist erlaubt und erwünscht).

Wiederhole pro Skill:

1. Begründe kurz die Rolle des Skills im Faden (aus `05`, nicht neu erfinden).
2. Schreibe ihn nach `.claude/rules/skill-authoring.md`: lean body, third-person
   `description` mit **DE+EN-Triggern**, korrekte **Invocation** (Disziplin
   model-invoked, Einstiege/Utilities user-invoked), progressive disclosure.
3. Extern bezogen (`grill-with-docs`/`split` portiert; `feature`/`build` Synthese) →
   **Attribution** nach `.claude/rules/attribution.md` (Eintrag in `ATTRIBUTION.md` + Footer).
4. Validieren: `bash scripts/validate-plugin.sh` und `pre-commit run --all-files` grün.
5. **Checkpoint mit mir:** passt der Skill so, bevor der nächste kommt?

Nutze vorhandene Skills, wo sie helfen — `superpowers:brainstorming` (jetzt selbst ein
Spine-Baustein), `superpowers:writing-plans`, `superpowers:test-driven-development` und
die `plugin-dev`-Skills.

## Qualitätsvorgaben (jeder Skill)

- DoD aus `.claude/rules/dod.md` erfüllt, **Guardian-Check bestanden** — insbesondere:
  dupliziert `build` nicht `we`? (→ Bright Line).
- Konventionen aus `skill-authoring.md` + `attribution.md`.
- `pre-commit run --all-files` / CI `validate` grün.
- README-Skill-Tabelle (nach Klassen gruppiert) und `CHANGELOG.md` aktuell.
- Version in `.claude-plugin/plugin.json` gebumpt (CI erzwingt es auf PRs, die
  plugin-shipping-Dateien berühren).

## Abbruchkriterien

Der Loop endet, wenn:

- die vereinbarten Skills als PR vorliegen (gemerged oder bereit zum Mergen),
- CI `validate` grün ist, Version gebumpt, README + `CHANGELOG.md` aktuell,
- die **Bright Line für `build`** nachweislich eingehalten ist (kein `we`-Nachbau),
- und wir beide den Scope für diese Basis abnehmen.

Kein Skill landet ohne Freigabe in einem PR. Wenn der Scope entgleitet — besonders bei
`build` — **stopp mich, wir verkleinern oder vertagen.**
