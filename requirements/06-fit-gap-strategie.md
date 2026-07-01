# capd — Fit/Gap & Strategie-Skizze (Ergebnis Prompt 3)

> Ergebnis von **Prompt 3 (Fit/Gap, Zielgruppe & Strategie)**. Prompt 3 war als
> Grilling-Session gedacht; hier ist sie **im Alleingang synthetisiert** — ich stelle die
> Leitfragen und setze je eine begründete Empfehlung. Punkte, die wirklich deine/colenets
> Entscheidung brauchen, sind als **[offen]** markiert. Baut auf `05-richtung-capd-v1.md`
> und dem tatsächlich gebauten Stand (v0.5.0) auf. Arbeitsmaterial, Deutsch.

## Ausgangs-Widerspruch, den wir auflösen müssen

Der ursprüngliche Prompt-3-Hypothese sagte: **Zielgruppe = große Enterprise-Teams
(z. B. Allianz), Hebel = das ganze Team, nicht die Einzelperson.** Prompt 1 ist bewusst
auf **Einzelperson zuerst** gelandet. Das ist **kein** Widerspruch, sondern zwei Höhen
derselben Strategie — und genau das ist der Kern dieser Skizze.

## 1. Zielgruppe — wer ist capd v1 für?

- **Nutzer (wer tippt `/capd:…`):** die **Einzelperson im Dev-Team** — Entwickler:innen
  und technische Consultants bei colenet und beim Kunden, die KI-augmentiert arbeiten wollen.
- **Käufer/Nutznießer (wessen Problem es löst):** **agile Enterprise-Teams**, die von
  *agil* auf *agil + KI* wollen — und colenet als Beratungshaus, das diesen Übergang begleitet.
- **Auflösung:** v1 hebelt die Einzelperson (Wedge), der Value skaliert später aufs Team
  (Phase 2). Empfehlung: **so lassen.** Die Einzelperson ist der glaubwürdigste, kleinste
  Einstieg; „Team-Geschwindigkeit" ist das Versprechen, nicht der v1-Scope.
- **[offen]** Ist der *erste konkrete* Nutzerkreis (a) colenet-intern (Dogfooding, weckt
  Bedarf) oder (b) direkt ein Kundenteam? *Empfehlung: (a) zuerst intern* — capd soll
  intern Bedarf wecken, bevor es beim Kunden steht.

## 2. Wertversprechen

- **Für die Einzelperson:** ein **geführter, kohärenter Faden** von der Idee zum gebauten
  Slice (`brainstorm → grill-with-docs → feature → split → build`) statt „Vibe Coding" —
  Qualität, Markdown-Wahrheit im Repo, Mensch-im-Loop.
- **Für colenet:** ein **eigenes, kuratiertes** Artefakt, das Orientierung gibt, intern
  den Bedarf für agentic engineering weckt und nach außen colenets Kompetenz *zeigt* statt
  behauptet.
- **Für den Kunden:** eine **Launch-Ramp** — niedrigschwelliger, sofort nutzbarer Einstieg
  in KI-augmentierte agile Arbeit.

## 3. Abgrenzung (was capd bewusst NICHT ist)

- **Kein** zweites Orchestrierungs-Framework (→ `we`), **keine** Gadget-Sammlung, **nichts**
  Projekt-/Kundenspezifisches (→ lokales `.claude/`). (DoD-Regeln, gelten weiter.)
- **Kein Produkt zum Verkaufen.** capd ist ein **Türöffner**, kein Umsatzträger. Es darf
  deshalb **nicht** werblich oder komplex werden — der Wert ist die gelebte Qualität.

## 4. Fit/Gap — capd heute vs. was die Zielgruppe braucht

**Was capd heute IST (v0.5.0):** 7 Skills (die Spine + `ask-capd` + `grill-me`),
self-contained (keine Runtime-Dependency), Governance (CI/pre-commit, DoD-Guardian,
Attribution, Statusline), kuratiert und klein.

| Bedarf für ein erstes Kundengespräch | Status | Gap-Bewertung |
|---|---|---|
| Sofort nutzbarer, kohärenter Faden | **da** (Spine v0.5.0) | Fit |
| „In 5 Minuten produktiv" — Onboarding/Getting-Started | fehlt | **Gap** — schließen |
| Ein durchgespieltes End-to-End-Beispiel (Idee→Slice) | fehlt | **Gap** — schließen |
| Englische, aufgeräumte Doku (Repo-Regel: Englisch) | `requirements/` noch Deutsch | **Gap** — vor Außenauftritt übersetzen |
| Team-Ebene (Rollen, Guardrails, Höhenstufen) | bewusst vertagt | **kein Gap für v1** (Phase 2) |
| „Produktentwicklungs­geschwindigkeit" messbar machen | fehlt | später; nicht v1-kritisch |

**Bewusst KEIN Gap (nicht bauen für v1):** Council/Orchestrierungs-Engine (→ `we`),
Rollen-Pipeline, Enterprise-Integrationen (Jira/Tracker als Pflicht), Metriken-Dashboards.

## 5. Strategie — die kommerzielle Brücke

capd ist ein **Open-Source-Plugin**, das Kunden sofort ausprobieren können und das colenets
Erfahrung mit agentic engineering **demonstriert**. Wer es ernsthaft einführen will, braucht
danach **colenet-Beratung und Agile-Coaches**, um seine Teams auf dieses Level zu heben —
das ist der Geschäftshebel. Damit die Brücke trägt, **ohne** dass das Plugin komplex oder
werblich wird:

- capd bleibt **klein und ehrlich nützlich** — der beste Vertrieb ist ein Tool, das man
  gern benutzt.
- Die **Team-/Skalierungs-Schicht** (Phase 2: Rollen, Guardrails, Höhen) ist genau der
  Punkt, an dem Beratung ansetzt — das ist die natürliche Grenze zwischen „Plugin gratis"
  und „Transformation mit colenet".
- **Scrum Master als Steward** (schon in der DoD angelegt): sie halten capd im Team lebendig
  und sind der interne Multiplikator.
- **Kein** Sales-Text und **kein** Beratungs-Hinweis im Plugin. Der Wert spricht für sich.

## 6. Verdikt

**Passt die v1-Basis zur Zielgruppe? Ja** — für den Einzelperson-Wedge. Die
Team-Geschwindigkeit ist bewusst Phase 2 und zugleich der Beratungs-Hebel.

**Minimal fehlend für ein erstes Kundengespräch** (empfohlene nächste kleine Schritte,
noch nicht jetzt gebaut):

1. Ein **Getting-Started** (README-Abschnitt oder `ask-capd`-Erweiterung): „installier,
   dann lauf die Spine an diesem Beispiel entlang".
2. Ein **durchgespieltes Beispiel-Feature** (idee→`feature`→`split`→`build`) als Referenz.
3. **Englische Übersetzung** der stabilisierten `requirements/` vor jedem Außenauftritt.

**Bewusst nicht** für das erste Gespräch: Team-Rollen, Orchestrierung, Metriken,
Tracker-Zwang.

## 7. Entschieden

1. **Intern zuerst** (Dogfooding), dann Kunde.
2. Konkreter Pilot/Zeitpunkt: bewusst offen gelassen — für jetzt unkritisch.
3. **Beratungs-Brücke: gar nicht im Plugin sichtbar** — kein Sales-, kein Beratungs-Hinweis.
