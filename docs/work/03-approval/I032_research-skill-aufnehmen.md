---
parent: F001
blocked-by: []
---

# `research`-Skill aus Matt v1.1.0 aufnehmen

## What to build

cape bekommt einen `research`-Skill (engineering-Bucket), portiert aus Matt Pococks
`mattpocock/skills` v1.1.0. Er ist der Feeder **stromaufwärts von `grill-with-docs`:
delegierte Beinarbeit gegen Primärquellen, deren Ergebnis als zitierte Notiz ins Repo
wandert — nicht als flüchtige Chat-Antwort.

Bei der Übernahme (Entscheidungen aus F001):

- **Abgrenzung zu `deep-research` in der `description` schärfen.** Beide recherchieren; die
  Trigger müssen klar trennen, wann welcher greift, damit sie nicht kollidieren.
- **Ablageort an cape-Konvention koppeln.** Die zitierte Notiz landet dort, wohin `CONTEXT.md`
  / `docs/` zeigen — nicht an einem skill-eigenen Default-Ort.
- **Attribution** nach `.claude/rules/attribution.md`: Eintrag in `ATTRIBUTION.md` und
  Attribution-Fußzeile im `SKILL.md`.
- **Nicht in `ask-cape`** vergessen: neuer Skill gehört in die Router-Tabelle und die README.

## Test seam & SUT

Prosa-Skill, kein Laufzeit-Code. Geprüft wird über zwei Nähte:

- **Strukturell:** `pre-commit run --all-files` / `scripts/validate-plugin.sh` — der Skill
  lädt als `cape:research`, Frontmatter und Bucket-Deklaration stimmen.
- **Verhalten:** Trigger lösen `research` (nicht `deep-research`) aus, und der Skill legt
  seine Notiz am CONTEXT.md-Ort ab. Manuell durchspielen; falls die Konventions-Eval
  (I030/I031) sich anbietet, dort andocken statt neu bauen.

## Acceptance criteria

- [x] `skills_source/engineering/research/SKILL.md` existiert, lädt als `cape:research`,
      `validate-plugin.sh` grün.
- [x] `description` grenzt `research` (delegierte Recherche gegen Primärquellen, Notiz ins
      Repo) klar gegen `deep-research` ab; deutsche + englische Trigger.
- [x] Der Skill legt sein Ergebnis am durch `CONTEXT.md` / `docs/` vorgegebenen Ort ab, nicht
      an einem skill-eigenen Default.
- [x] Attribution vollständig: `ATTRIBUTION.md`-Eintrag (Quelle, Autor, URL, Lizenz, Änderung)
      und Fußzeile im `SKILL.md`.
- [x] README-Skill-Tabelle und `ask-cape`-Router führen `research`; `CHANGELOG.md` und
      `plugin.json`-`version` sind für die Release-Runde gepflegt.
