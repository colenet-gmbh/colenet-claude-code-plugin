---
parent: F006
blocked-by: []
---

# Eval-Harness + Baseline-Gate: die Hypothese belegen

## What to build

Ein Eval-Harness, das `/implement` headless über ein generiertes Wegwerf-Fixture fährt und
die **geschriebenen Dateien** deterministisch auf Canaries prüft — und der erste Lauf damit:
das **Baseline-Gate** ohne Konsultations-Nudge, der die Hypothese belegt (oder widerlegt).

Ende-zu-Ende umfasst der Slice:

- **Fixture-Generator** aus statischen Templates: ein Wegwerf-Repo mit je einer `CLAUDE.md`
  in `frontend/` und `backend/`, jede trägt eine Konvention mit fake-präfixiertem Canary
  (`CAPE_CANARY_*`), plus Issues mit unterspezifizierter Anweisung, die der jeweilige Canary
  eindeutig auflöst. Konstellationen: frontend-only, backend-only, cross-tier.
- **`claude -p`-Runner**: fährt `/implement` headless über das Fixture, cape aus dem
  **lokalen Checkout** geladen (nicht dem ungepinnten Marketplace) → hermetisch,
  reproduzierbar. Fixture in ephemerem tmpdir, nie im echten Checkout; Workdir gitignored.
  Bootstrap mit I027 teilen, nicht doppelt bauen.
- **Canary-Scorer**: wörtlicher Match (`grep`) der Canaries in den geschriebenen Dateien,
  kein LLM-Judge. Anwesenheits-/Abwesenheits-Matrix je Konstellation, Aggregation als Rate
  über N Läufe.
- **Baseline-Lauf ausführen** — `/implement` **ohne** den Konsultations-Nudge über die
  Matrix, N Läufe je Zelle. Ergebnis ist der Entscheidungspunkt: zeigt sich die Lücke
  (Canary-Rate unter Zielschwelle), ist die Hypothese belegt und I031 wird gebaut; zeigt sie
  sich nicht (Level 1 liest `CLAUDE.md` schon selbst proaktiv), wird **gestoppt und neu
  untersucht**, nicht implementiert.

Die Größe der Lücke ist modell-abhängig; über Modelle hinweg beobachten, kein Defekt.

## Test seam & SUT

**Eine Naht:** das Eval-Harness, das `claude -p` über ein generiertes Fixture fährt und die
von `/implement` geschriebenen Dateien auf Canaries prüft.

- **Innerhalb der SUT:** Fixture-Generator, Runner, Scorer, Matrix, Raten-Aggregation — und
  der `/implement`-Fluss **ohne** Nudge (die Baseline).
- **Außerhalb / gestellt:** `/feature` (erzeugt hier keinen Gegenstand), die Modell-Stochastik
  (statistisch über N Läufe behandelt), Claude Code selbst (Level 1).
- **Isolation:** ephemerer tmpdir, cape aus lokalem Checkout → hermetisch. Kein externer
  Input, kein Secret (Eval-Hygiene: statische Templates, harmloser selbstgeschriebener
  Prompt, Session-Auth).

## Acceptance criteria

- [ ] Fixture-Generator erzeugt aus statischen Templates ein Repo mit `frontend/CLAUDE.md`
      und `backend/CLAUDE.md`, jede mit einem `CAPE_CANARY_*`-Token, plus Issues für die drei
      Konstellationen (frontend-only / backend-only / cross-tier).
- [ ] `claude -p`-Runner fährt `/implement` headless über ein Fixture, cape aus dem lokalen
      Checkout, in einem ephemeren tmpdir — der echte cape-Checkout wird nicht angefasst.
- [ ] Canary-Scorer misst den Verbatim-Match je Konstellation und aggregiert über N Läufe zu
      einer Rate (z. B. 1/10), nicht als Einzel-Pass/Fail.
- [ ] Baseline-Lauf (ohne Nudge) ist ausgeführt; das Ergebnis liegt als Rate je Zelle vor.
- [ ] **Gate:** Die Baseline zeigt die erwartete Lücke (zutreffender Canary spürbar unter der
      Zielschwelle) → Hypothese belegt, I031 freigegeben. Falls nicht: dokumentiert gestoppt
      und zur Neuuntersuchung zurückgegeben — nicht weitergebaut.
