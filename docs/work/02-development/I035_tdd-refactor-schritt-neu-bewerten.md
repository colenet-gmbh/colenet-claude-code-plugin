---
parent: F001
blocked-by: []
---

# Refactor-Schritt in `tdd` neu bewerten

## What to build

Eine bewusste Neubewertung, kein sofortiger Umbau — deshalb ein eigenes Issue, das nur lose an
F001 hängt. Matt hat in v1.1 den Refactor-Schritt aus TDD entfernt: bei ihm ist TDD nur noch
rot→grün, Refactoring gehört in die Review-Stufe (`code-review`), `refactoring.md` ist dorthin
gezogen. cape hat aktuell noch den klassischen Schritt 4 „Refactor" + `refactoring.md` in `tdd`;
`review-implementation` trägt die Fowler-Baseline, treibt aber kein Refactoring, sondern meldet
Smells als Ermessens-Findings.

In F001 wurde entschieden, den Refactor-Schritt **vorerst zu behalten** und diese Entscheidung
**später gezielt neu zu bewerten**. Der Grund, warum es die Neubewertung wert ist: Matt ist ein
erfahrener Entwickler; wenn er Refactoring bewusst verschiebt, könnte der *optimale
Refactoring-Zeitpunkt für ein LLM ein anderer sein als für einen Menschen*. Das ist es wert,
bewusst durchzudenken, statt es reflexhaft mit „kanonisches TDD" abzutun.

## Offener Punkt

Die zu klärende Frage: Bleibt der Refactor-Schritt in `tdd`, oder wandert er (wie bei Matt) in
die Review-Stufe? Entscheidung mit Begründung festhalten; erst danach ggf. der Umbau von `tdd`
und `review-implementation`.

## Acceptance criteria

- [ ] Argumente für/gegen Refactoring-in-`tdd` vs. -in-Review gesammelt, speziell aus
      LLM-Sicht (wann ist der Zeitpunkt für einen Agenten optimal?).
- [ ] Entscheidung dokumentiert (behalten / verschieben) mit Begründung.
- [ ] Falls verschoben: `tdd` und `review-implementation` entsprechend angepasst; falls behalten:
      Entscheidung als bewusst begründet vermerkt, kein weiterer Umbau.
