---
id: F028
type: feature
priority: later
---

# Bounded-Context-Support: Domain-Seam für große Domänen skalierbar machen

Der Domain-Seam aus F006 (Domänen-Begriffe, referenziert über `CONTEXT.md`) soll von einer
kleinen Domäne bis zu einer sehr großen mitwachsen. Für große Domänen mit mehreren Bounded
Contexts (DDD) muss das Vokabular auf mehrere Glossare aufgeteilt werden können, ohne die
**Progressive Disclosure** zu verlieren — man liest nur das Glossar des Kontexts, den man
gerade braucht, nicht alle.

## Outcome

cape bildet Domänen-Wissen skalierbar ab:

- **Kleine Domäne** → ein Glossar, an das die Domain-Sektion der `CONTEXT.md` zeigt.
- **Große Domäne** → mehrere Glossare, je Bounded Context eins, alle aus der Domain-Sektion
  der `CONTEXT.md` verlinkt; jedes Glossar wird nur gelesen, wenn der jeweilige Kontext
  angefasst wird.

Damit übernimmt die Domain-Sektion der `CONTEXT.md` den ersten Job der bisherigen separaten
`CONTEXT-MAP.md` (welche Kontexte gibt es, wo liegt welches Glossar) — die separate Datei
entfällt.

## Beziehungen zwischen Kontexten → arc42

Die bisherige `CONTEXT-MAP.md` hatte einen **zweiten** Job: die Beziehungen zwischen Bounded
Contexts (wer emittiert welches Event, welche Typen werden geteilt). Das ist **echter
Inhalt, kein Pointer**, und gehört damit nicht in die bewusst dünn gehaltene `CONTEXT.md`.
Es wandert nach arc42 (Bausteinsicht), wo Bereichsgrenzen und ihr Zusammenspiel ohnehin
hingehören. Verzahnung mit F008 (angemessene Komplexität in der Architektur).

## Abgrenzung

- Der Lese-/Konsultations-Pfad und der Zwei-Kübel-Schnitt der Konventionen sind **F006** —
  dieses Feature baut nur den Domain-Seam nach oben offen aus.
- `CONTEXT.md` bleibt reine Pointer-Map; die Skalierung steckt darin, dass sie auf 1..N
  Glossare *zeigt*, nicht dass sie Inhalt aufnimmt.
- Fachlicher **Bounded Context** (DDD) und technischer **Bereich** (Frontend/Backend) sind
  zwei orthogonale Achsen und dürfen nicht vermischt werden — dieses Feature betrifft nur die
  fachliche Achse.

## Offene Punkte

- Konkrete Darstellung mehrerer Kontexte in der Domain-Sektion einer einzigen `CONTEXT.md`.
- Wie werden die Kontext-Beziehungen in arc42 festgehalten (Format, welches Kapitel)?
- Migration der bestehenden Konvention in `context-format.md` (`CONTEXT-MAP.md` entfernen,
  Domain-Sektion einführen) — betrifft auch `/cape:setup` und die `architect`-Skills.

## Verwandt

- **F006** (cape nutzt Repo-Regeln) — liefert `CONTEXT.md` als einzige Tür + die drei Seams.
- **F008** (angemessene Komplexität in der Architektur) — Zielort der Kontext-Beziehungen (arc42-Doku).
- **F010** (projektspezifische Vorgaben).
