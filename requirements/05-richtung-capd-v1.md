# capd v1 — Richtungsentscheidung (Ergebnis Prompt 1)

> Ergebnis von **Prompt 1 (Orientierung & Richtung)**. Dieses Dokument legt fest,
> *was capd v1 werden soll* — Charakter, Umfang, Skill-Kandidaten und bewusste
> Nicht-Ziele. Es ist die **Grundlage für Prompt 2 (Grundgerüst)**. Es wurde noch
> nichts gebaut; hier steht die Richtung, nicht die Umsetzung.
>
> Arbeitsmaterial (nicht plugin-shipping), Deutsch gemäß der temporären Ausnahme in
> `CLAUDE.md`. Baut auf den Steckbriefen [`01`](./01-fabian-we.md)–[`03`](./03-spanier-kvjs.md)
> und der Workflow-Analyse [`04`](./04-workflows-und-philosophien.md) auf.

## Leitbild in einem Satz

capd v1 ist eine **schlanke, geführte Produktentwicklungs-Spine** — „von der Idee zum
gebauten Slice" — colenet-eigen und kuratiert, die **zuerst die Einzelperson im
Dev-Team** KI-augmentiert. Klein genug, um nicht zu überfordern, vollständig genug, um
sich „komplett" anzufühlen und **intern Bedarf für agentic engineering zu wecken** — und
ohne das `we`-Plugin zu duplizieren.

## Charakter — was capd v1 ist und was nicht

**Ist:**
- ein **geführter Workflow** (eine Spine), der aufeinander aufbauende Schritte trägt;
- ein **Komponist**: er nutzt Vorhandenes wieder, wo es schon exzellent ist, statt es
  nachzubauen; er *besitzt* nur, was genuin colenet-eigen ist;
- **Markdown-im-Repo als Wahrheit**, Mensch-im-Loop bei folgenreichen Aktionen.

**Ist nicht:**
- kein **loses Toolset** unverbundener Einzel-Skills;
- kein **zweites Orchestrierungs-Framework** und kein `we`-Nachbau (DoD-Regel);
- keine **generische KI-Gadget-Sammlung**;
- **nichts Projekt-/Stack-Spezifisches** (das bleibt lokal im `.claude/` des Projekts).

## Zwei Skill-Klassen

capd ordnet Skills in **zwei Klassen** — capds schlanke Variante von Pococks
Bucket-Struktur, deckungsgleich mit seiner Invocation-Achse:

| Klasse | Wesen | Invocation (Tendenz) |
|---|---|---|
| **Workflow-Skills** | Teil der geführten Spine; bauen aufeinander auf | Disziplin *model-invoked*, Einstiege *user-invoked* |
| **Utility-Skills** | generisch, standalone, kontextfrei überall einsetzbar | *user-invoked* |

## Die Spine (Workflow-Skills)

```
brainstorm  →  grill-with-docs  →  FEATURE  →  split  →  build
 REUSE          portieren          NEU ★       portieren  NEU ★
(superpowers)  (Pocock)           (Synthese)  (Pocock)   (Synthese)
```

| Skill | Herkunft | capd-Aktion | Rolle im Faden |
|---|---|---|---|
| `brainstorm` | **superpowers** | **wiederverwenden** (nicht bauen) | Ideenraum öffnen |
| `grill-with-docs` | Pocock | **portieren** | schärfen **+ `CONTEXT.md`/ADRs** anlegen |
| **`feature`** ★ | Pocock `to-prd` × Spaniers wandernde `docs/features/`-Datei | **NEU** | PRD-Ebene als versionierte **Markdown-Wahrheit** |
| `split` | Pocock `to-issues` | **portieren/adaptieren** | Feature → unabhängige vertikale Slices |
| **`build`** ★ | Pocock `implement` × Spanier `orchestrator` | **NEU, schlank** | einen Slice per TDD umsetzen |
| (+) Router/Spine-Skill | Pocock `ask-matt`-Muster | **NEU, dünn** | führt durch die Spine (sinnvoll ab >4 Skills) |

★ = colenet-originärer Beitrag. **`feature`** ist der Kern: Er verheiratet Pococks
PRD-Methode mit Spaniers *wandernder Feature-Datei* und trifft damit die Konvergenz
„Markdown im Repo ist die Wahrheit" — Eigenwert, kein Nachbau.

## Utility-Skills

| Skill | Herkunft | Zweck |
|---|---|---|
| `grill-me` | capd (vorhanden) | generisches, kontextfreies Grilling: Refinement, Design-Review, Sounding-Board |

Die Utility-Klasse wächst über Zeit (weitere generische Helfer), unabhängig von der Spine.

## Der `build`-Skill — die Bright Line (Guardian-Guardrail)

`build` ist der riskanteste Punkt für Scope-Creep und grenzt an `we`s Kernland. „Schlank"
ist deshalb eine **feste Grenze**, keine Stimmung. capds `build`:

- läuft **Single-Flow in einer Session** — *kein* SQLite-State-Machine, *kein* Resume,
  *kein* Worker-Pool, *kein* Multi-Runtime-Dispatch (das ist und bleibt `we`s Kernland);
- übernimmt die **Disziplin von Pocock `implement`**: ein Slice, TDD (red→green→refactor),
  dann Commit;
- kann **optional** eine *leichte* Rollen-Review per Präambel-Injektion von Spaniers
  `orchestrator` fahren (z. B. ein Architektur-/Security-Blick) — als Qualitäts-Pass, nicht
  als verpflichtende Multi-Agent-Pipeline;
- hält **Mensch-im-Loop** bei Folge-Aktionen (Commit/PR/Merge).

**Oberhalb dieser Linie** (echtes Multi-Worker-Orchestrieren, Höhenstufen, Council) greift
das Team zu **`we`**. Diese Grenze wird in Prompt 2 explizit in die Skill-Regeln geschrieben.

## Bewusst nicht in v1

| Ausgeschlossen | Grund | Wohin stattdessen |
|---|---|---|
| `we`s Orchestrierungs-Engine / Council / Höhenstufen | DoD: „`we` nicht neu erfinden"; zu schwer | bei echtem Bedarf → `we` |
| `writing-skills` + `retro` | wichtig, aber **kein Einstieg für neue Entwickler** | **Phase 2** |
| Spaniers Stack-Spezifika (Payload/Next, 3-Schicht-CI-Guardrails, Kanbanize) | team-/projektgebunden, nicht generisch | Team-Phase / lokal |
| Fabians `vision`/`saga`/`epic` | strategische PO-Schicht | erst mit Zielgruppe „Berater/PO" |

## Gesetzte Prinzipien (quellenunabhängig, gelten ab v1)

1. **Markdown im Repo ist die Wahrheit** — die `feature`-Datei wandert versioniert durch
   den Workflow; ein Tracker bleibt optionaler Index.
2. **Mensch-im-Loop bei folgenreichen Aktionen** (Commit/PR/Merge).
3. **Eskalation ist explizit, nicht geraten** — kein Auto-Komplexitäts-Routing.
4. **Invocation-Achse** (Pocock): Disziplin model-invoked, Einstiege/Utilities user-invoked.
5. **Authoring-Standard**: Pococks Theorie (`writing-great-skills`) + Spaniers gelebte
   Knappheit (ID-Regeln, Zahlen statt Adjektive) — gilt fürs *Schreiben* der Skills, ist
   selbst aber kein v1-Skill.

## Phasen-Rahmen — die drei Quellen mappen auf deine Phasen

| Phase | Hebel | Primäre Quelle | capd-Konsequenz |
|---|---|---|---|
| **Phase 1 — jetzt** | Einzelperson im Dev-Team | **Pocock** (Disziplinen) + capd-Spine + `brainstorm` aus superpowers | leicht, sofort nutzbar |
| **Phase 2 — später** | Produktentwicklungs­geschwindigkeit des Teams | **Spanier** (Rollen, Guardrails, wandernde Spec) + **Fabian** (Höhen/Orchestrierung, ggf. via `we`) | schwerer; Orchestrierung an `we` delegieren, nicht bauen |

## Herkunft & Attribution (Pflicht bei Umsetzung)

Alle Quellen sind MIT-lizenziert. Bei der Umsetzung in Prompt 2+ verlangt
[`attribution.md`](../.claude/rules/attribution.md) je Skill einen Eintrag in
`ATTRIBUTION.md` + Footer:

- `brainstorm` — **wiederverwendet** aus superpowers (keine Portierung, aber Nennung als Baustein).
- `grill-with-docs`, `split` — **portiert** aus `mattpocock/skills`.
- `feature`, `build` — **Synthesen** (Pocock × Spanier × Fabian) → adaptierte Herkunft nennen.

## Offene Punkte für Prompt 2 (jeweils mit Empfehlung)

1. **superpowers-Dependency bleibt** (für `brainstorm`-Reuse) — *revidiert bewusst die
   frühere „eigener Stack, superpowers fällt weg"-Wahl.* → **bestätigen.**
2. **Ground Truth für `split`**: Markdown-Kind-Dateien vs. Tracker-Issues. → **Empfehlung:
   Markdown**, konsistent mit der `feature`-Datei; Tracker optionaler Index.
3. **Router/Spine-Skill**: eigener Skill vs. reine README-Doku. → **Empfehlung: dünner
   user-invoked Router** (`ask-capd`-Muster), sobald >4 Skills.
4. **Namensgebung**: Plugin-Kommando/Workflow, `feature`-Datei-Konvention (`docs/features/…`?).
5. **`build`-Details**: Rollen-Präambel optional zuschaltbar? Welche Rollen-Lens(en) zuerst?

## Entscheidungs-Historie (wie wir hierher kamen)

- **superpowers**: capd hängt bereits davon ab; es liefert TDD/Debugging/Brainstorm/
  Planning/Code-Review + `writing-skills`. Zunächst „eigener kuratierter Stack",
  dann präzisiert: capd **besitzt den Workflow und die eigenen Schritte** und
  **komponiert** superpowers, wo ein Schritt schon existiert (`brainstorm`).
- **Kein loses Toolset** → ein **geführter Workflow** ist gewünscht.
- **`orchestrate`/`build`**: **nicht** `we` übernehmen, sondern eine **eigene schlanke
  Synthese** aus Pococks `implement` + Spaniers `orchestrator` — innerhalb der Bright Line.
- **`grill-me`** ist ein **Utility-Skill**, kein Workflow-Schritt → eigene Skill-Klasse
  eingeführt (Workflow vs. Utility).

## Nächster Schritt

Prompt 2 (Grundgerüst): die vier offenen Punkte oben entscheiden, dann Ordnerstruktur +
Skill-Gerüste anlegen. Jeder neue/geänderte Skill läuft durch den Guardian-Check in
[`dod.md`](../.claude/rules/dod.md) und die Attribution.
