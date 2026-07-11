---
parent: F006
blocked-by: [I030]
---

# Konsultations-Nudge + zentrale Konventionen: die Eval grün fahren

## What to build

Die zwei expliziten Level-2→Level-3-Touchpoints und die zentralen Konventionen, die die
Skills konsultieren — und der Nachweis über dasselbe Harness aus I030, dass der Nudge
**nötig** (Baseline verpuffte) und **hinreichend** (mit Nudge greift er, ohne falschen Tier
zu leaken) ist.

Ende-zu-Ende umfasst der Slice:

- **`/implement`-Nudge:** liest vor dem Handeln die Konventionen jedes vom Issue benannten
  Tiers, aufgelöst über die konventionelle `CLAUDE.md`-Position — auch für Entscheidungen,
  die fallen, *bevor* die Dateien dieses Tiers angefasst werden. Konsultiert die Vereinigung
  der Konventionen aller benannten Tiers; nicht berührte Tiers dürfen nicht leaken.
- **`/split`-Nudge:** benennt die Tiers (und Bounded Contexts), die jeder erzeugte Issue
  berührt — Prosa im Issue, kein Schema.
- **`/cape:setup`-Scaffolding:** legt in `docs/agent-conventions/` die zentralen Konventionen
  an, die Skills konsultieren — `tracker.md`, `implementation-review.md` und
  `coding-conventions.md` — und schreibt in `CONTEXT.md` „Central conventions are defined in
  files in docs/agent-conventions." Coding-Konventionen re-runnable seeden: Projekt-Guidelines
  finden, normativen Status klarstellen, Ungedecktes aus der cape-Baseline propose-and-confirm
  ergänzen.
- **`context-format.md`-Update:** der kanonische `CONTEXT.md`-Vertrag bekommt die Sektion für
  den Pointer auf die zentralen Konventionen (Domäne-Sektion + Tier-Index bleiben F028 — nicht
  anfassen).
- **I004-Umverdrahtung:** die inline in `review-implementation` liegende Smell-Baseline zieht
  nach `coding-conventions.md` (geshippte Referenz, aus der `setup` schöpft).
  `review-implementation` liest seine Achsen aus `implementation-review.md` (statt inline);
  sein Standards-Aspekt prüft gegen `coding-conventions.md`. `implement` liest die Review-
  Aspekte **vorab** und baut von Anfang an darauf hin (schreibt Tests laufend zur
  Coverage-Vorgabe, statt die Lücke am Ende zu entdecken). Testabdeckung-Schwelle bleibt ein
  Level-3-Projektwert — cape backt keine Zahl.
- **Mit-Nudge-Läufe ausführen** über dieselbe Matrix und belegen, dass die Eval grün wird.

## Test seam & SUT

Dieselbe Naht wie I030 — das Eval-Harness über ein generiertes Fixture —, jetzt mit dem
Konsultations-Nudge aktiv, gemessen auf Recall und Precision.

- **Innerhalb der SUT:** der `/implement`-Fluss **mit** Nudge, die `/cape:setup`-Ausgabe, die
  Auflösung der Pointer auf die zentralen Konventionen, die aktive Konsultation vor dem
  Handeln.
- **Außerhalb / gestellt:** wie I030 — `/feature`, Modell-Stochastik (N Läufe), Level 1.
- **Isolation:** wie I030 — ephemerer tmpdir, cape aus lokalem Checkout.

## Acceptance criteria

- [ ] `/cape:setup` legt in einem frischen Repo `docs/agent-conventions/` mit `tracker.md`,
      `implementation-review.md` und `coding-conventions.md` an, und `CONTEXT.md` enthält
      „Central conventions are defined in files in docs/agent-conventions."
- [ ] `context-format.md` ist um die Pointer-auf-zentrale-Konventionen-Sektion ergänzt; die
      Domäne-Sektion und der Tier-Index bleiben unangetastet (F028).
- [ ] `review-implementation` liest seine Achsen aus `implementation-review.md`; die
      Smell-Baseline liegt in `coding-conventions.md`, nicht mehr inline; `implement`
      konsultiert beide vorab.
- [ ] **Recall (mit Nudge, frontend-only):** der Frontend-Canary erscheint in den
      geschriebenen Dateien, der Backend-Canary nicht — statistisch über N Läufe (z. B. 9/10
      vs. ~0/10).
- [ ] **Cross-Tier (mit Nudge):** eine Frontend-Konvention prägt ein zuerst geschriebenes
      Backend-Artefakt; beide Canaries erscheinen an der jeweils richtigen Stelle.
- [ ] Der Vergleich Baseline (I030) vs. mit-Nudge belegt: der Nudge ist nötig (Baseline
      verpuffte) und hinreichend (mit Nudge greift er ohne Tier-Leckage).
