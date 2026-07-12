---
parent: F001
blocked-by: []
---

# Matt-v1.1-Backports + Kosmetik in bestehende Skills

## What to build

Vier gezielte Verbesserungen, die Matt zwischen v1.0 und v1.1.0 an bereits portierten Skills
gemacht hat und die cape fehlen, plus zwei kosmetische Angleichungen. Alles kleine Edits an
bestehenden Skills — bewusst **ein** Issue, weil jeder Einzelpunkt nur eine minimale
Textänderung ist.

- **`grilling` ⭐ (wertvollster Fund).** Zwei Schärfungen: (1) **Confirmation-Gate** — der
  Agent setzt den Plan erst um, wenn der Mensch das gemeinsame Verständnis bestätigt hat;
  (2) **Fakten vs. Entscheidungen** — Fakten selbst nachschlagen (Codebase erkunden),
  Entscheidungen dem Menschen vorlegen und warten. Dabei die alte pauschale Zeile „If a
  question can be answered by exploring the codebase, explore the codebase instead" **ersetzen**
  — genau die liest sich beim Dispatch aus `feature` & Co. als Freibrief, auch *Entscheidungen*
  selbst zu beantworten.
- **`writing-great-skills`.** Zwei neue Steering-Fehlermodi ergänzen: **Negation** (Verbote
  ziehen das verbotene Verhalten in den Kontext → positiv steuern) und **Negative Space**
  (jede weggelassene Entscheidung wird still an die Priors des Agenten delegiert → Auslassungen
  bewusst lesen). Je ein SKILL-Bullet plus Glossar-Eintrag.
- **`split`.** Den Block **„Wide refactors / Expand-Contract"** aufnehmen: mechanische Änderung
  mit repo-weitem Blast-Radius als expand → Call-Sites batchweise migrieren (je eigenes Ticket,
  CI grün Batch zu Batch) → contract.
- **`tdd`.** Nur die **Seam-Definition** ergänzen: die öffentliche Grenze, an der getestet wird,
  ohne hineinzugreifen; kein Test an einem unbestätigten Seam. (Das Tautologie-Antipattern ist
  schon da; der Refactor-Schritt bleibt vorerst — siehe I035.)
- **Kosmetik `handoff`:** „PRDs" → cape-Vokabular „specs".
- **Kosmetik `ask-cape`:** Matts Wartungsregel adaptieren (Router bei jeder Skill-Änderung neu
  prüfen) — als CLAUDE.md-Disziplin.

## Test seam & SUT

Prosa-Edits an bestehenden Skills. Geprüft strukturell über `pre-commit run --all-files` /
`validate-plugin.sh` (Skills laden weiter, Frontmatter intakt), inhaltlich durch Gegenlesen
gegen Matts v1.1.0-Fassung und den Glossar-Abgleich. Kein Laufzeit-Code.

## Acceptance criteria

- [x] `grilling`: Confirmation-Gate und Fakten-vs-Entscheidungen sind formuliert; die alte
      „explore instead"-Pauschalzeile ist ersetzt, nicht nur ergänzt.
- [x] `writing-great-skills`: Negation und Negative Space als je ein SKILL-Bullet **und** je
      ein Glossar-Eintrag.
- [x] `split`: „Wide refactors / Expand-Contract"-Block vorhanden (expand → batchweise Migration
      je Ticket, CI grün → contract).
- [x] `tdd`: Seam-Definition ergänzt; Refactor-Schritt unangetastet.
- [x] `handoff` spricht durchgängig „specs"; `ask-cape` trägt die Wartungsregel.
- [x] `validate-plugin.sh` grün; README/`CHANGELOG.md`/`version` für die Release-Runde gepflegt.
