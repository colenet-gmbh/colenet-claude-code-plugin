---
parent: F006
blocked-by: [I030]
---

# Konsultations-Nudge: die Eval grün fahren

## What to build

Die aktive Konsultation der Tier-Konventionen vor dem Handeln — und der Nachweis über dasselbe
Harness aus I030, dass sie **nötig** (Baseline verpuffte) und **hinreichend** (mit Nudge greift
sie, ohne fremde Tiers zu leaken) ist.

Ende-zu-Ende umfasst der Slice:

- **`/implement`-Nudge:** liest vor dem Handeln die Konventionen jedes vom Issue benannten
  Tiers, aufgelöst über die **konventionelle `CLAUDE.md`-Position** — auch für Entscheidungen,
  die fallen, *bevor* die Dateien dieses Tiers angefasst werden. Konsultiert die Vereinigung
  der Konventionen aller benannten Tiers; nicht berührte Tiers dürfen nicht leaken.
- **`/split`-Nudge:** benennt die Tiers (und Bounded Contexts), die jeder erzeugte Issue
  berührt — Prosa im Issue, kein Schema.
- **`/cape:setup`:** legt in `docs/agent-conventions/` den `tracker.md` an (wie heute) und
  schreibt in `CONTEXT.md` den Pointer auf `docs/agent-conventions/` samt dem Satz „Central
  conventions are defined in files in docs/agent-conventions." Weitere zentrale Konventionen
  legt F6 nicht an.
- **`context-format.md`-Update:** der kanonische `CONTEXT.md`-Vertrag bekommt die Sektion für
  den Pointer auf die zentralen Konventionen. Domäne-Sektion + Tier-Index **nicht anfassen**
  (F028).
- **Mit-Nudge-Läufe ausführen** über dieselbe Matrix wie I030 und belegen, dass die Eval grün
  wird.

**Nicht Teil davon → F004:** Review-Konventionen (`review-*.md`), `coding-conventions.md`, die
Auflösung/Umverdrahtung von `review-implementation`, die Coverage-Vorgabe. Wer das hier findet,
baut es nicht — es gehört in F004.

## Test seam & SUT

Dieselbe Naht wie I030 — das Eval-Harness über ein generiertes Fixture —, jetzt mit dem
Konsultations-Nudge aktiv, gemessen auf Recall und Precision.

- **Innerhalb der SUT:** der `/implement`-Fluss **mit** Nudge, die `/cape:setup`-Ausgabe
  (`tracker.md` + `CONTEXT.md`-Pointer), die aktive Konsultation der Tier-Konventionen vor dem
  Handeln.
- **Außerhalb / gestellt:** wie I030 — `/feature`, der Review-Pfad (F004), Modell-Stochastik
  (N Läufe), Level 1.
- **Isolation:** wie I030 — ephemerer tmpdir, cape aus lokalem Checkout.

## Acceptance criteria

- [ ] `/implement` liest vor dem Handeln die Konventionen der vom Issue benannten Tiers über die
      konventionelle `CLAUDE.md`-Position — die Vereinigung aller benannten Tiers.
- [ ] `/split` benennt in jedem erzeugten Issue die berührten Tiers (Prosa, kein Schema).
- [ ] `/cape:setup` legt in einem frischen Repo `docs/agent-conventions/tracker.md` an, und
      `CONTEXT.md` enthält „Central conventions are defined in files in docs/agent-conventions."
      — keine weiteren Konventionen.
- [ ] `context-format.md` ist um die Pointer-auf-zentrale-Konventionen-Sektion ergänzt;
      Domäne-Sektion und Tier-Index bleiben unangetastet (F028).
- [ ] **Recall (mit Nudge, frontend-only):** der Frontend-Canary erscheint in den geschriebenen
      Dateien, der Backend-Canary nicht — statistisch über N Läufe (z. B. 9/10 vs. ~0/10).
- [ ] **Cross-Tier (mit Nudge):** eine Frontend-Konvention prägt ein zuerst geschriebenes
      Backend-Artefakt; beide Canaries erscheinen an der jeweils richtigen Stelle.
- [ ] Der Vergleich Baseline (I030) vs. mit-Nudge belegt: die Konsultation ist **nötig**
      (Baseline verpuffte) und **hinreichend** (greift ohne Tier-Leckage).
