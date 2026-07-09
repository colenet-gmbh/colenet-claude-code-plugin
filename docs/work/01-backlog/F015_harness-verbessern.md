---
id: F015
type: feature
priority: next
---

# cape kann den Harness aus echter Nutzung verbessern — /improve-harness

## Outcome

Es gibt einen Skill, `/improve-harness`, **jederzeit** aufrufbar. Er schaut auf den letzten
Flow oder die aktuelle Session, erkennt Potenzial, den Harness zu verbessern, und wendet die
Verbesserung auf der **richtigen Schicht** an — wobei er die lokale Projektschicht dem
Verändern cape-eigener Skills vorzieht.

## Schicht-Disziplin (die definierende Randbedingung)

Jede Verbesserung wird in die korrekte Harness-Schicht platziert (siehe das
[Glossar](../arc42/12_glossary.md) — "Harness (three layers)"):

- **Claude Code** — nicht unsere Sache, das zu ändern.
- **cape** — niemals still einen vendorten cape-Skill lokal nachbauen (das forkt ihn und
  verliert Updates); eine wirklich allgemeine Verbesserung wird **zurück nach cape
  graduiert**.
- **Projektspezifische Arbeitsanweisungen** (lokale Schicht, z. B. `docs/work/`, repo-eigene
  `CLAUDE.md`) — hier verbessern, wenn die Verbesserung projektspezifisch ist.

## Wissen, aus dem der Skill schöpft — Glossar + Strategie-Dateien

`/improve-harness` sollte Verbesserungs-Rezepte nicht im eigenen Kopf tragen. Er pflegt eine
kleine Wissensbasis, die er konsultiert, wenn er entscheidet, *wie* er den Harness stärkt:

- ein **Glossar** (gemeinsames Harness-Vokabular) und
- eine **Strategie-Datei pro wiederkehrendem Verbesserungsmuster** — z. B. Guardrails,
  Qualitäts-Schleifen.

Das reaktive Prinzip: Strategien sind **dokumentiert, nicht vorab implementiert**. Nichts
davon wird im Voraus gebaut. Erst wenn wir bemerken, dass der Harness irgendwo nicht greift,
greift `/improve-harness` zur passenden Strategie und wendet sie auf der richtigen Schicht
an.

### Seed-Strategie: Drei-Schicht-Guardrails (aus F009 übernommen)

Die erste Strategie-Datei. Inhalt, aus konkreter Recherche:

- **Drei Schichten, dieselbe Regel auf jeder erzwungen:** Claude-Code-Hook → Git-Hook → CI.
  Schicht 2 (Git-Hook) und Schicht 3 (CI) sind **von der Stange** — `pre-commit` und GitHub
  Actions, in genau diesem Repo bereits im Einsatz (`.pre-commit-config.yaml`,
  `validate.yml`). Da ist nichts zu erfinden; ein Projekt verdrahtet sie nur.
- **Nur Schicht 1 (der Claude-Code-Hook) ist das cape-förmige Stück.** Das *Muster*
  übernehmen, nicht projektspezifische Checks: ein PreToolUse-Bash-Hook, der auf `git commit`
  filtert, die gestageten Dateien inspiziert und **nur warnt — nicht blockiert** (sichtbar,
  bevor der Commit existiert). Arbeitsreferenz: Spaniers `block-thumbnail-check.sh`
  (PreToolUse) und `migrate-reminder.sh` (PostToolUse) in `kvjs-app/.claude/hooks/`. Ihr
  *Inhalt* ist projektspezifisch (Thumbnails blockieren, Payload-Migrationen), daher liefert
  cape nur das Muster aus.

## Realization job

- Entwerfen, wie der Skill den letzten Flow / die aktuelle Session liest und
  Verbesserungs-Kandidaten aufzeigt.
- Das Schicht-Routing entwerfen: erkennen, zu welcher Schicht eine Verbesserung gehört, und
  entsprechend lokal-vs-nach-cape-graduieren routen.
- Die Glossar- + Strategie-Datei-Struktur entwerfen und mit der obigen Guardrail-Strategie
  seeden.

## Open points / sources

- **Fabian** hat so etwas gebaut — seinen Ansatz referenzieren.
- **Pascal** hat etwas Ähnliches in OpenBrain — das referenzieren.
- Attribution: falls sich eine übernommene Quelle als extern (nicht-colenet) herausstellt,
  gemäß `ATTRIBUTION.md` crediten.
- Die Grenze sauber halten gegenüber der `/architect`-Vertiefung (verbessert die
  **Codebasis**) und F013 Qualitäts-Schleifen (halten die **Codebasis** gesund):
  `/improve-harness` zielt auf den **Harness selbst**, nicht auf den Produktcode.
