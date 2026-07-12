---
id: F001
type: feature
priority: v1
---

# cape enthält die wertvollen Ideen aus Matt Pococks Framework

## Outcome

cape hat alles Erhaltenswerte aus Matt Pococks Skill-Framework aufgenommen — bewusst
kuratiert, nicht en bloc kopiert. Jede Übernahme ist attribuiert (`ATTRIBUTION.md`) und als
eigenes Issue realisiert; jede bewusste Nicht-Übernahme ist begründet.

## Vorgehen (vereinbart)

Ungewöhnlicher, dialogischer Weg statt stiller Datei-für-Datei-Prüfung:

1. **Sichtung** (unten) — Claude gleicht Matt v1.1.0 gegen den heutigen cape-Stand ab und
   sortiert jeden Skill in: schon abgedeckt / echter Kandidat / außerhalb cape.
2. **Grilling-Session** — Pascal und Claude gehen die Kandidatenliste in einer
   `cape:grilling`-Runde systematisch durch; jede Entscheidung (aufnehmen / verwerfen /
   später) wird direkt hier im Feature festgehalten.
3. **Erst wenn alle Kandidaten durchgegrillt sind**, wird der Zuschnitt in Issues separat
   festgelegt — nicht pro Entscheidung mitten in der Session. So liegen zuerst alle
   Erkenntnisse vor.

## Sichtung — Matt `mattpocock/skills` v1.1.0 vs. cape (Stand 0.7.8)

Grundlage: Klon auf Tag `v1.1.0`, alle `SKILL.md`-Frontmatter beider Repos abgeglichen.

### A) Schon abgedeckt (kein Handlungsbedarf, ggf. Re-Sync prüfen)

| Matt v1.1.0 | cape | Anmerkung |
|---|---|---|
| `ask-matt` | `ask-cape` | Router-Muster übernommen |
| `code-review` | `review-implementation` (+ `review-feature`) | cape teilt in zwei Achsen-Reviews |
| `codebase-design`, `domain-modeling`, `improve-codebase-architecture` | `architect` | in einen Skill zusammengezogen |
| `diagnosing-bugs` | `diagnosing-bugs` | |
| `grill-me`, `grilling`, `grill-with-docs` | gleichnamig | |
| `implement`, `tdd` | `implement`, `tdd` (+ cape-eigenes `build`) | |
| `to-issues`/`to-tickets` | `split` | siehe Re-Sync-Punkt |
| `prototype`, `handoff`, `triage`, `writing-great-skills`, `teach` | gleichnamig | `teach` gerade in 0.7.8 aufgenommen |

cape-eigen, ohne Matt-Pendant: `feature`, `build`, `split` (Fluss-Layer).

### B) Echte Kandidaten — in der Grilling-Session zu entscheiden

- **`research`** (engineering) — ✅ **AUFGENOMMEN (Entscheidung in dieser Session).** Feeder
  stromaufwärts von `grill-with-docs`: delegierte Beinarbeit gegen Primärquellen, zitierte
  Notiz ins Repo. Kein Grund dagegen, viele plausible Einsatzsituationen, klarer Fluss-Fit.
  Bei der Umsetzung: Abgrenzung zu `deep-research` in der `description` schärfen; Ablageort
  an cape-Konvention (CONTEXT.md / `docs/`) koppeln.
- **`resolving-merge-conflicts`** (engineering) — Loop zum Auflösen laufender
  Merge-/Rebase-Konflikte. ⏸️ **ZURÜCKGESTELLT (Entscheidung in dieser Session):** erst
  integrieren, wenn cape explizit teamfähig gemacht wird. Merge-Konflikte entstehen im
  parallelen Arbeiten mehrerer — bis cape diesen Team-Aspekt bewusst adressiert, hat der
  Skill keinen tragenden Platz. Dann wieder aufgreifen.
- **`wizard`** (in-progress) — interaktiver Bash-Wizard, der einen Menschen durch eine
  manuelle Prozedur führt. ➡️ **NICHT übernommen (Entscheidung in dieser Session).**
- **`git-guardrails-claude-code`** (misc) — Claude-Code-Hooks, die gefährliche
  git-Kommandos blocken. ➡️ **NICHT übernommen (Entscheidung in dieser Session); als Hinweis
  in F023 (Guardrail-Vorbereitung) aufgenommen.** Muster projekt-agnostisch und relevant für
  Schicht 1, aber Matt blockiert, wo cape warnt — als Referenz dort vermerkt, kein eigener
  Skill.
- **`wayfinder`** (engineering) — riesige Arbeitspakete als Karte von Investigation-Tickets
  planen und auflösen. ✅ **AUFGENOMMEN (Entscheidung in dieser Session)** — mein
  Orchestrierungs-/`we`-Verdacht war falsch: wayfinder ist **keine** Orchestrierung (kein
  persistenter Worker-Pool o. Ä.), sondern Planung. Zwei Auflagen:
  - **Noch nicht in `ask-cape` dokumentieren** — der Skill kommt rein, wird aber im Router
    vorerst nicht beworben.
  - **Aktivierung als eigenes Issue.** Ob wayfinder wirklich *aktiviert* (sichtbar/nutzbar)
    wird, entscheidet ein separates Issue. Es ist **blockiert durch F014** (capes
    Issue-Tracker ist konfigurierbar und kann GitHub Issues nutzen). Grund: wayfinder legt
    seine Investigation-Tickets auf einen Issue-Tracker ab, der dafür erst stehen muss.

### C) Vermutlich außerhalb cape (Begründung fürs Protokoll)

- **`to-spec`** (engineering) — cape deckt Spec-Erzeugung mit `feature` ab; Matts
  to-spec/to-tickets-Aufteilung ist ein anderer Fluss. Bewusste Divergenz, nicht spiegeln —
  außer die Session findet einen konkreten Mehrwert.
- **`setup-matt-pocock-skills`** — Pendant zu `/cape:setup`, nicht übernehmen.
- **misc/tech-spezifisch:** `migrate-to-shoehorn` (TS/shoehorn), `setup-pre-commit`
  (Husky/lint-staged), `scaffold-exercises` — projekt-/tech-gebunden → gehören ins lokale
  `.claude/` des Nutzers, nicht in cape (Mission-Guardrail 2).
- **Writing/personal:** `edit-article`, `obsidian-vault`, `writing-beats`,
  `writing-fragments`, `writing-shape` — Schreib-/Notiz-Workflows, nicht agile Produktarbeit.
- **Von Matt deprecated:** `design-an-interface`, `qa`, `request-refactor-plan`,
  `ubiquitous-language` (letzterer ohnehin in `architect` aufgegangen) — nicht aufnehmen.
- **`claude-handoff`, `loop-me`** (in-progress) — Varianten zu vorhandenem `handoff` bzw.
  Grilling; nur bei klarem Zusatznutzen betrachten.

### D) Re-Sync schon portierter Skills — ebenfalls Teil dieses Features

Nicht nur Neuaufnahmen: Matt hat seit unserer Übernahme mehrere bereits portierte Skills
überarbeitet — der Abgleich, ob diese Verbesserungen nach cape zurückfließen, gehört
ausdrücklich zu F001, nicht zu F015 (Harness verbessern). Kandidaten für den Abgleich:

- `grill-with-docs`, `triage`, `implement`, `tdd`, `diagnosing-bugs`, `handoff`,
  `writing-great-skills`, `ask-cape` — je gegen Matts v1.1.0-Fassung diffen.
- `code-review` → cape hat es in `review-implementation` + `review-feature` geteilt: prüfen,
  ob Matts Änderungen eine der beiden Achsen betreffen.
- `architect` (aus `codebase-design` + `domain-modeling` + `improve-codebase-architecture`)
  — gegen alle drei Quell-Skills abgleichen.
- `split` (aus `to-issues`) — Matt hat Planung zu `to-spec` + `to-tickets` vereinheitlicht;
  prüfen, ob daraus etwas in `split` einfließt (ohne cape's eigenen Fluss zu spiegeln).

Der Zuschnitt in Issues (wie viele, wie gruppiert) wird separat festgelegt.

#### Re-Sync-Befund (richtige Linse: Matts v1.0 → v1.1.0, aus seinem CHANGELOG)

Maßgeblich ist Matts *eigene* Weiterentwicklung (sein CHANGELOG 1.0.0 → 1.1.0), gefiltert
auf „hat cape noch nicht". Nicht der Diff gegen unsere angepasste Fassung — der vermischt
seine Änderungen mit unseren Anpassungen.

Schon drin oder bewusst anders — **nichts zu tun:** `code-review`→`review-implementation`
(Fowler-Smell-Baseline schon übernommen), `teach` (reuse-first schon in v1.1.0-Stand),
`prototype` (bereits model-invoked), `tdd`-Tautologie-Antipattern (schon in `tests.md` +
SKILL.md), `triage`-PR-Handling (bewusst verworfen — cape macht kein PR/Tracker-Handling).
`diagnosing-bugs` hat Matt in v1.1 **nicht** angefasst → kein Re-Sync-Thema.

Echte Backport-Kandidaten (Matt-v1.1-Verbesserung UND cape fehlt sie):

- **`grilling`** ⭐ — Matt schärft es doppelt: (1) **Confirmation-Gate** (Agent setzt den
  Plan erst um, wenn der Mensch das gemeinsame Verständnis bestätigt) und (2) **Fakten vs.
  Entscheidungen**: Fakten nachschlagen (Codebase erkunden), Entscheidungen dem Menschen
  vorlegen und warten. cape hat noch Matts alte pauschale Zeile „If a question can be
  answered by exploring the codebase, explore the codebase instead" (SKILL.md Z. 10) — genau
  die, die er ersetzt hat, weil sie beim Aufruf aus einem anderen Skill heraus als Freibrief
  gelesen wird, auch *Entscheidungen* selbst zu beantworten. Da cape `grilling` aus `feature`
  & Co. dispatcht, ist das hochrelevant. Klarster, wertvollster Fund.
- **`writing-great-skills`** — zwei neue Steering-Fehlermodi, beide fehlen cape:
  **Negation** („Elefant" — Verbote ziehen das verbotene Verhalten in den Kontext; positiv
  steuern) und **Negative Space** („Leere" — jede weggelassene Entscheidung wird still an die
  Priors des Agenten delegiert; Auslassungen bewusst lesen). Je SKILL-Bullet + Glossar-
  Eintrag, verbatim übernehmbar.
- **`split`** — Matts `to-tickets` bekam einen Block **„Wide refactors / Expand-Contract"**,
  den cape gar nicht hat: eine mechanische Änderung mit repo-weitem Blast-Radius als expand →
  call-sites batchweise migrieren (je eigenes Ticket, CI grün Batch zu Batch) → contract.
  Echte, wiederverwendbare Slicing-Regel.
- **`tdd`** (klein) — nur die **Seam**-Definition fehlt („die öffentliche Grenze, an der du
  testest, ohne hineinzugreifen; kein Test an unbestätigtem Seam"). Tautologie-Antipattern
  ist schon da.

**✅ Entscheidung dieser Session:** alle vier Kandidaten (grilling, writing-great-skills,
split, tdd-Seam) werden übernommen.

#### Entscheidung: Refactor-Schritt vorerst behalten, später prüfen (eigenes Issue)

Matt hat in v1.1 den Refactor-Schritt aus TDD entfernt: TDD ist bei ihm nur noch rot→grün,
Refactoring gehört in die Review-Stufe (`code-review`), `refactoring.md` ist dorthin gezogen.
cape hat aktuell den klassischen Schritt 4 „Refactor" + `refactoring.md` in `tdd`;
`review-implementation` trägt die Fowler-Baseline, treibt aber kein Refactoring, sondern
meldet Smells als Ermessens-Findings.

**Entscheidung dieser Session:** den Refactor-Schritt **vorerst in `tdd` behalten** (nicht
Teil der vier Backports), diese Entscheidung aber **später gezielt neu bewerten**. Grund:
Matt ist ein erfahrener Entwickler; wenn er Refactoring bewusst verschiebt, könnte der
*optimale Refactoring-Zeitpunkt für ein LLM ein anderer sein als für einen Menschen*. Das
ist es wert, bewusst nachzudenken, statt es reflexhaft mit „kanonisches TDD" abzutun.

Kosmetik / optional: `ask-cape` — Matt ergänzte eine Wartungsregel (Router bei jeder
Skill-Änderung neu prüfen); als CLAUDE.md-Disziplin adaptierbar. `handoff` sagt noch „PRDs"
statt cape-Vokabular „specs".

## Nebenbefund: `skills_source/` → `skills/` (zurückgestellt)

In der Session aufgekommen: Matt legt seine Skills unter `skills/` ab, cape unter
`skills_source/`. Idee, das anzugleichen — **vorerst zurückgestellt**. Faktenlage
(Claude-Code-Doku, geprüft): technisch ginge ein Umbenennen gefahrlos, **aber** ein
`skills/`-Verzeichnis wird von Claude Code immer automatisch (eine Ebene tief) gescannt;
da wir zusätzlich die Buckets im Manifest deklarieren, warnt Claude Code ab v2.1.140, dass
der Default-Scan ignoriert wird (`claude plugin list`, `/plugin`-Detail). Skills laden
korrekt, aber jeder Nutzer sähe eine überflüssige Warnung. Genau deshalb heißt es
`skills_source/`. „Wirklich flach ohne Buckets" wäre warnungsfrei, würde aber die
Bucket-Gruppierung (README, `ask-cape`) aufgeben — größere Sache. Entscheidung: erstmal
lassen.

## Zuschnitt in Issues

Die Grilling-Session ist durch, der Zuschnitt ist festgelegt und als Issues am Board — jedes
trägt `parent: F001` und ist von dort aus (bzw. von `/build`) über diesen Up-Link auffindbar;
hier wird die Liste bewusst **nicht** doppelt geführt, damit sie nicht driftet, wenn `/build`
dynamisch weitere Issues nachlegt. Bewusst **nicht** jede Textänderung als eigenes Issue —
die eigentlichen Aufnahmen/Backports sind lauter Mini-Edits und bündeln sich; nur die zwei
bewusst *später* und *lose* hängenden Punkte (Wayfinder, `tdd`-Refactor-Neubewertung) sind
eigene Karten.

Das Feature ist damit als Spec fertig; die verbleibende Energie liegt in den Kind-Issues.
`/build F001` treibt sie in Abhängigkeitsreihenfolge zu Ende.

## Build-Ausgang (2026-07-12, `/build F001`)

Alles Baubare ist getrieben und liegt zur Abnahme:

- **I032** (research-Skill) und **I033** (v1.1-Backports + Kosmetik) — gebaut, integrierter
  Review (Standards + Spec) sauber, `validate` + `pre-commit` grün, in `03-approval`.
- **I034** (wayfinder) — durch **F014** blockiert; nichts von `/build` erledigbar, bleibt
  in `02-development`.
- **I035** (tdd-Refactor-Neubewertung) — bewusst zurückgestellt, als separater Request zu
  behandeln; bleibt in `02-development`.

`/build` hat damit seinen treibbaren Umfang abgeschlossen und F001 nach `03-approval`
gestellt. Das heißt nicht „done": I034 und I035 stehen aus. Der Mensch entscheidet, ob
F001 hier ruht, bis F014 steht und I035 drankommt, oder anders geführt wird — und zieht es
erst dann nach `04-done`.
