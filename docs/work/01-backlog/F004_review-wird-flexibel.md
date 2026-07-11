---
id: F004
type: feature
parent: none
blocked-by: [F006]
priority: v1
---

# Review wird aufgewertet und flexibel

Der Review (Implementation- und Build-Ebene) wird von fest im Skill verdrahteten Achsen zu
einer **konventions-getriebenen, erweiterbaren** Sache: welche Aspekte ein Review abdeckt,
steht in zentralen Konventionen, die ein Projekt ergänzen/anpassen kann. **Simplify** ist der
erste neue Aspekt. Setzt auf F006s Konventions-Mechanismus auf (daher `blocked-by: F006`).

(Früher I004 „Review deckt Einfachheit ab" — von Issue zu Feature hochgestuft, weil der Umbau
mehrere Slices umfasst.)

## Outcome

- **Aspekte in zentralen Konventionen, nicht im Skill-Body.** `docs/agent-conventions/review-*.md`
  listet, welche Aspekte ein Review abdeckt; ein Projekt kann Achsen ergänzen oder anpassen.
- **Reviews inline** am Ende von `implement` (Issue-Diff → `review-implementation.md`) und
  `build` (integrierter Feature-Diff → `review-build.md`); der separate
  `review-implementation`-Skill wird **aufgelöst** (weniger Skills, Wiederholung bewusst
  akzeptiert). `review-feature` bleibt vorerst ein eigener Skill.
- **Simplify-Achse:** Wiederverwendung (existiert das anderswo in der Codebasis schon?),
  Vereinfachung, Effizienz, Flughöhe (liegt die Logik auf der richtigen Ebene?). Nur
  Qualitäts-Linse — jagt **keine** Bugs (das bleibt beim Korrektheits-Review). Gilt auf beiden
  Scopes (Issue-Diff und integrierter Feature-Diff).
- **`coding-conventions.md`** als **separate** zentrale Konvention: cape's Clean-Code-Baseline
  (aus dem alten `review-implementation`-Skill in eine geshippte Referenz herausgezogen) plus
  Verweis auf die Coding-Guidelines des Projekts mit dem Hinweis, dass sie **ebenso** gelten.
  Konsumiert von `implement` (schreibt danach) und vom Standards-Aspekt des Reviews (prüft
  dagegen). Querschnittig = zentral; tier-spezifischer Stil bleibt lokal.

## Feste Kern-Achsen je Review (cape-Baseline)

- `review-implementation.md` — Issue-Ebene: **Standards**, **Spec** (+ Simplify).
- `review-build.md` — integriertes Feature: **passt das Ganze zur Feature-Spec**,
  **Cross-Issue-Integration** (+ Standards/Simplify nach Bedarf). Der Grund fürs zweite Review:
  integriert kann falsch sein, obwohl jedes Issue einzeln sauber war.

## Setup

`/cape:setup` legt die Review-Konventionen und `coding-conventions.md` an. Für die
Coding-Standards: Projekt-Guidelines finden, ihren **normativen Status**
(verpflichtend/Empfehlung) klarstellen, Ungedecktes aus der Baseline **propose-and-confirm**
ergänzen — **re-runnable** und **diff-and-confirm statt blind überschreiben**, damit ein
Re-Run keinen handgepflegten Guideline-Text still verwirft.

## Offen / beim `/feature` zu schärfen

- Genaue feste vs. projekt-konfigurierbare Achsen je Review.
- **Wo cape die Clean-Code-Baseline als geshippte Referenz ablegt**, nachdem der
  `review-implementation`-Skill aufgelöst ist (heute liegt sie inline in dessen Body).
- Berührt `skills_source/` (implement, build, Auflösung von review-implementation) → braucht
  einen Plugin-Versions-Bump.

## Verwandt

- **F006** — liefert den Konventions-Mechanismus (setup scaffoldet zentrale Konventionen,
  `CONTEXT.md`-Pointer, Skills konsultieren sie). Vorbedingung.
