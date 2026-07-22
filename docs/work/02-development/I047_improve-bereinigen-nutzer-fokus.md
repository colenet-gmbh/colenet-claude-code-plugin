---
id: I047
type: issue
priority: now
---

# /improve bereinigen: Nutzer-Fokus, Improvement-Modus und -Conventions abschaffen

## Beobachtung (aus echter Nutzung)

Beim Einsatz von `/improve` auf einem fremden Repo war der Agent sehr verwirrt: er
versuchte, die optionalen `improvement-conventions.md` zu laden — unnötig kompliziert.
Erkenntnis aus der Arbeit: `/improve` ist für die **normalen Nutzer** des Frameworks
gedacht, nicht für cape-Entwickler.

## Zielbild

- `/improve` konzentriert sich klar auf **Level 3** — das projektspezifische Harness.
- Der **Improvement-Modus wird abgeschafft**, ebenso die **improvement-conventions.md**.
- Taucht bei einer Verbesserung etwas auf, das am sinnvollsten in einem cape-Skill (oder
  einem anderen cape-Element) landet, macht der Skill **automatisch und ohne
  Modus-Weiche** einfach den Vorschlag, diese Verbesserung als Vorschlag an die
  cape-Community zu schicken.

## Erst bereinigen, dann verbessern

Reihenfolge ist Teil des Auftrags: **zuerst aufräumen**, erst danach inhaltlich
weiterentwickeln.

Bereinigung (sorgfältig alle Referenzen durchgehen):

- `skills_source/meta/improve/SKILL.md` — Laden der improvement-conventions und
  Modus-Logik entfernen (Zeile 7, Schritt 5 „improvement mode allows").
- `skills_source/meta/improve/harness-principles.md` — Abschnitt „Improvement mode"
  entfernen/umbauen; vermutlich fehlt auch ein **einleitender Satz**; Prinzipien nochmal
  prüfen.
- `commands/setup.md` — prüfen, ob Setup improvement-conventions referenziert/scaffoldet.
- `README.md` (~Z. 134 f.) — Improvement-Modus-Erklärung ersetzen.
- `docs/arc42/08_crosscutting-concepts.md` — Konzept „Improvement mode" austragen.
- `docs/agent-conventions/improvement-conventions.md` (dieses Repo) — entfernen bzw.
  Nachfolgeregelung klären.
- `ask-cape`-Router-Text zu `/improve` anpassen (Graduierungs-Formulierung).

Danach:

- Community-Vorschlags-Schritt in den Skill einbauen (immer aktiv, unter dem eigentlichen
  Ergebnis).
- Experiment: **ohne `disable-model-invocation`** fahren, dafür mit einer sinnvollen,
  trigger-starken Description (DE+EN). Achtung: ADR 0003 / ask-cape-Referenzregel neu
  bewerten, wenn der Skill modell-invokierbar wird.

## Kontext

- Verwandt: F015 (harness-verbessern) — dortige Schicht-Disziplin bleibt gültig, aber die
  Modus-Mechanik entfällt.
