---
id: I046
type: issue
priority: next
---

# Glossar-Referenzen glattziehen

## Was zu tun ist

Die Verweise **auf** die Glossare sind quer durch Skills und Docs uneinheitlich — mal per
logischem Label, mal hartkodierter Pfad, mal auf das falsche der mehreren Glossare. In einem
Durchgang alle Referenzen glattziehen: einheitlich benennen, auf das jeweils richtige Glossar
zeigen, über das Label / `CONTEXT.md` auflösen statt einen Pfad hartzukodieren.

Setzt auf I041 auf (dort werden die Glossar-**Arten** benannt); hier geht es um die
**konsistente Verwendung** dieser Benennung in allen Referenzen. Getrennt von I042 (Qualität
beim *Erfassen* der Domänenbegriffe).

## Entschieden (Grilling 2026-07-23)

- **Kanonische Referenzform:** Art-Name + Auflösung über die Map — „the domain glossary
  (locate via `CONTEXT.md`)". Keine hartkodierten Kapitel-Pfade in Skills (im Nutzer-Repo
  kann das Glossar woanders liegen). Ausnahme: **Skill glossaries** liegen im Skill selbst
  und werden direkt verlinkt.
- **`CONTEXT.md` führt zwei benannte Pointer:** `domain-glossary` und
  `environment-glossary`. Beide dürfen auf dieselbe Datei zeigen, wenn das Projekt nur ein
  Glossar hat. Nachziehen in: capes eigener `CONTEXT.md`, der Format-Referenz
  `architect/context-format.md`, `commands/setup.md` (Scaffolding) und dem Eval-Scaffold
  `evals/conventions/templates/scaffold/CONTEXT.md` (dort ist der Verweis heute falsch:
  `12_glossary.md` als „ubiquitous language").

## Bestandsaufnahme

Referenzen quer durch `skills_source/` (ask-cape, split, feature, build, triage,
grill-with-docs, architect: domain-modeling, improve-codebase, improve-codebase-report,
context-format, architecture-documentation, SKILL.md), `commands/setup.md`, `CONTEXT.md`,
`docs/arc42/04+08+12`, `docs/adr/0002` und das Eval-Scaffold. Formen: nur Label, Label +
hartkodierter Kapitel-Pfad (mehrfach in `domain-modeling.md`), lose Nennung („the
glossary") ohne Ziel.

## Umsetzung (2026-07-23)

Umgesetzt auf `feat/i46-glossar-referenzen` (zusammen mit I041, Commits 0a7c53e + 4d5bd14).
`CONTEXT.md` (cape, Format-Referenz, setup-Template, Eval-Scaffold) trägt die Pointer
`domain-glossary` + `environment-glossary`; alle Skill-/Doc-Referenzen nennen die Art und
lösen über `CONTEXT.md` auf, hartkodierte Kapitel-Pfade nur noch, wo sie die kanonischen
Ziele definieren. Eval-Fixture: Glossar nach `08_crosscutting-concepts.md` umbenannt
(Test angepasst, Suite grün). Review sauber.
