---
id: I036
type: issue
blocked-by: []
---

# `build`-Skill: sauberer Abschluss — Ergebnis in der Feature-Datei und klares Schluss-Bild

## Kontext

Aufgekommen beim ersten echten `/build`-Lauf (F001). Der Build lief inhaltlich durch, aber
der *Abschluss* hakelt an drei Stellen — alle darüber, dass hinterher schwer zu erkennen ist,
was eigentlich das Ergebnis war.

## What to build

Der Close-out-Teil der `build`-Skill (`skills_source/engineering/build/SKILL.md`) bekommt drei
verbindliche Schritte:

1. **Ergebnis-Zusammenfassung in die Feature-Datei.** Nach dem Build schreibt `build` unter den
   ursprünglichen Plan eine ordentliche Zusammenfassung des *umgesetzten Ergebnisses* — so
   enthält die Feature-Datei später beides: den Plan als Ausgangspunkt und, darunter, was
   tatsächlich gebaut wurde. (Für F001 schon manuell nachgeholt als Abschnitt „Build-Ausgang";
   die Skill muss es künftig selbst erzwingen.)
2. **Klares Schluss-Bild im Chat.** Am Ende liefert `build` zwingend eine kompakte
   Ergebnis-Übersicht statt nur den letzten Zwischenschritt: was gebaut wurde, was **jeder**
   abschließende Check ergab (auch die, die zwischendurch hakten oder mehrere Anläufe
   brauchten), und was offen/blockiert bleibt. Der Mensch soll das Ergebnis erfassen können,
   ohne durch den ganzen Arbeitsverlauf mit Fehlversuchen und Zwischentests scrollen zu müssen.
3. **Teil-Fertigstellung regeln.** Wenn Kind-Issues blockiert (z. B. durch ein anderes Feature)
   oder bewusst zurückgestellt sind, sagt die Skill klar, was „fertig" dann heißt und in welche
   Spalte Feature und Issues wandern. Dabei den **Widerspruch zwischen `build`-Skill und
   `docs/work/CLAUDE.md`** auflösen: die Skill schiebt das Feature nach `03-approval` und Issues
   nach `04-done`, die Board-Doku sagt aber „Feature bleibt in `02-development`, bis alle Issues
   durch sind" und `04-done` sei rein menschlich (HITL). Eine der beiden Quellen muss nachziehen,
   damit der Abschluss nicht mehrdeutig ist (beim F001-Lauf lief deshalb der Stop-Hook mehrfach an).

## Acceptance criteria

- [ ] `build` schreibt am Ende eine Ergebnis-Zusammenfassung unter den Plan in die Feature-Datei
      (fester Close-out-Schritt, nicht optional).
- [ ] `build` liefert am Ende ein kompaktes Chat-Schluss-Bild: Gebautes, Ausgang jedes
      Abschluss-Checks, Offenes/Blockiertes — ohne dass man den Verlauf rekonstruieren muss.
- [ ] Teil-Fertigstellung (blockierte/zurückgestellte Kind-Issues) ist in der Skill definiert.
- [ ] Der Widerspruch `build`-Skill ↔ `docs/work/CLAUDE.md` zu `03-approval`/`04-done` ist
      aufgelöst; beide Quellen sagen dasselbe.
