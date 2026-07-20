---
id: F015
type: feature
priority: later  # 5
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

- **Zuerst die bestehenden Ansätze zusammenführen** (siehe *Quellen* unten). Mehrere
  Lösungen existieren schon — die Aufgabe ist **Synthese, nicht Auswahl**: die Ziele
  nebeneinanderlegen, harmonisieren und daraus eine **neue, eigene Lösung** entwerfen, nicht
  einen der Ansätze unverändert übernehmen. Wer dieses Issue angeht, muss sich **alle**
  Quellen ansehen, bevor er entwirft.
- Entwerfen, wie der Skill den letzten Flow / die aktuelle Session liest und
  Verbesserungs-Kandidaten aufzeigt.
- Das Schicht-Routing entwerfen: erkennen, zu welcher Schicht eine Verbesserung gehört, und
  entsprechend lokal-vs-nach-cape-graduieren routen.
- Die Glossar- + Strategie-Datei-Struktur entwerfen und mit der obigen Guardrail-Strategie
  seeden.

## Quellen — vor dem Entwurf alle ansehen und zusammenführen

Mehrere Ansätze existieren schon, aus verschiedenen Richtungen. Sie zeigen alle denselben
Bedarf und liefern je ein Stück der Lösung. Genau deshalb ist der Auftrag **Synthese**: Ziele
zusammenziehen, harmonisieren, eine neue Lösung schaffen — nicht einen Ansatz kopieren.

- **`improve-framework`-Skill in Pascals OpenBrain-Repo** (`.claude/skills/improve-framework`).
  Der ausgereifteste Ansatz und die reichste Vorlage für Ablauf und Maßnahmen-Katalog: Rolle
  **„Framework-Architekt"**, **Ursachenanalyse** (Wurzelursache statt Symptom), ein
  **Werkzeugkasten proportionaler Maßnahmen** (Triggering schärfen, Skill-Inhalt anpassen,
  Doku/Regeln klären, neuer Skill, Leitplanke einziehen, Memory-Eintrag, Idee festhalten), das
  Prinzip **„keine Leitplanke ohne Wegweiser"** (deckt sich mit cape's Guardrail-braucht-
  Wegweiser, vgl. F009/F023) und ein **Ideen-Backlog** (`concepts/ideas-framework.md`) für noch
  nicht konkrete Verbesserungen.
- **PR #24 — `session-retro`-Skill** (Leiv Braun, Branch `feat/session-retro-skill`). Ein
  reingekommener Kollegen-PR: ein Skill, der eine Session retrospektiv betrachtet — nah an der
  **Beobachtungs-Hälfte** von `/improve-harness` (auf den letzten Flow / die Session schauen).
  Der PR ist zugleich Lösungsvorschlag *und* Problemhinweis: auch wenn der Code nicht 1:1
  übernommen wird, gehört seine Erkenntnis in die Synthese.
- **Fabians Ansatz** — hat so etwas gebaut; Ansatz referenzieren (Quelle/Ort noch beschaffen).

### Randbedingungen für die Synthese

- Attribution: falls sich eine übernommene Quelle als extern (nicht-colenet) herausstellt,
  gemäß `ATTRIBUTION.md` crediten.
- Die Grenze sauber halten gegenüber der `/architect`-Vertiefung (verbessert die
  **Codebasis**) und F013 Qualitäts-Schleifen (halten die **Codebasis** gesund):
  `/improve-harness` zielt auf den **Harness selbst**, nicht auf den Produktcode.
