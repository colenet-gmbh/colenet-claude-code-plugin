---
id: F023
type: feature
priority: v2
---

# cape unterstützt das Einrichten von Guardrails auf Level 2, damit sie auf Level 3 leichter umzusetzen sind

## Outcome

Noch unkonkret. Irgendwo in capes Guardrail-Geschichte (siehe F015 `/improve-harness` und
dessen "Drei-Schicht-Guardrails"-Strategie — Claude-Code-Hook → Git-Hook → CI) könnte cape
auf Level 2 mehr tun als "Muster dokumentieren, reaktiv anwenden": z. B. Scaffolding,
Vorlagen, oder ein `/cape:setup`-Schritt, der es einem Level-3-Projekt spürbar leichter
macht, die drei Schichten tatsächlich zu verdrahten, statt das Verdrahten jedes Mal dem
Projekt zu überlassen.

## Realization job

Spaniers Guardrail-Setup (`.githooks/pre-push`, der CI-Migrations-Check) als ein
durchgearbeitetes Beispiel eines Projekts anschauen, das alle drei Schichten für eine
echte Invariante verdrahtet hat. Daraus ableiten, ob es etwas Generisches und Wertvolles
gibt, das cape hier anbieten sollte, und wenn ja, welche Form das annimmt (Scaffolding?
eine Hook-Vorlagen-Bibliothek? ein `/cape:setup`-Schritt?). Es ist genauso möglich, dass
die Antwort "dokumentiertes Muster, reaktiv angewendet, nichts weiter" bleibt — dieses
Feature existiert, um diese Entscheidung bewusst zu treffen, nicht um die Antwort
vorwegzunehmen.

### Konkretes Beispiel: die Migrations-/Generierte-Typen-Invariante

Spaniers Harness erzwingt eine Invariante — "Migrationen und generierte Typen bleiben
synchron zur aktuellen Datenmodell-Config" — an allen drei Schichten für dieselbe Regel,
zunehmend früher abgefangen:

1. **Claude-Code-Hook** (`migrate-reminder.sh`, PostToolUse auf Bash): direkt nachdem der
   Agent in der Session einen Migrations-/Codegen-Befehl ausführt, erinnert er "committe
   auch die Migrations-/Typen-Datei" — sichtbar, aber nicht blockierend.
2. **Git-Hook** (`.githooks/pre-push`): blockiert den Push lokal, wenn Migrationen
   ausstehen oder generierte Typen nicht synchron sind.
3. **CI** (`check-pending-migrations.sh` + `git diff --exit-code payload-types.ts`): führt
   die Codegenerierung erneut aus und vergleicht sie mit der eingecheckten Datei; lässt den
   PR-Build fehlschlagen, falls etwas auseinandergelaufen ist.

Das ist "Shift Left" in Reinform — jetzt nicht zu bauen, nur das durchgearbeitete Beispiel,
von dem dieses Feature später ausgehen soll.

### Konkreter Aspekt: Selbstaktivierung der Git-Hook-Verdrahtung

Spanier aktiviert geteilte Git-Hooks ohne manuellen Schritt: `.githooks/` ist ein normaler,
versionierter Ordner, und `"prepare": "git config core.hooksPath .githooks"` in
`package.json` setzt die Verdrahtung automatisch bei jedem `npm install` — kein Schritt, den
ein Teammitglied vergessen kann. cape hat kein `npm install`, aber `/cape:setup` ist unser
Äquivalent des Selbstaktivierungs-Moments.

Wichtig, **bevor** wir hier irgendetwas bauen: wenn `/cape:setup` künftig `git config
core.hooksPath` setzt und einen `.githooks/`-Ordner anlegt, muss das von Anfang an so
entworfen sein, dass es für **alle** Projekte funktioniert (nicht nur npm-Projekte) — sonst
bauen wir etwas, das später nicht mehr passt und umgebaut werden müsste. Kein Grund, das
Bauen selbst vorzuziehen (bleibt v2/v3), aber der Entwurf muss diese Anforderung von Beginn
an mitdenken, damit nichts verworfen werden muss, was schon in Projekten läuft.
