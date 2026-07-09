---
id: I016
type: issue
status: ready-for-agent
parent: none
blocked-by: []
priority: v1
---

# ask-cape benennt den Triage-Einstiegspunkt präzise

## What to build

Die Formulierung in `/ask-cape` (und, falls nötig, `/triage`) korrigieren, sodass der
Einmündungspunkt der Triage-Auffahrt zu den tatsächlichen Verträgen der Skills passt:

- eine triagierte **einzelne Slice** wird zu einem ausgeschriebenen Issue, das bei
  `/implement` einmündet;
- ein **feature-großes** triagiertes Item betritt den Main-Flow über die Grilling-Session,
  die Triage bereits auslöst, dann `/feature` → `/split` → `/build`.

Das ungenaue "Triage → `/implement` oder `/build` direkt" entfernen.

## Notes

- Reine Formulierung, keine Mechanik-Änderung: dass Triage das Grilling auslöst, *ist*
  bereits der Start des Main-Flows. Berührt `skills_source/` — braucht beim Bau einen
  Plugin-Versions-Bump.

## Agent Brief

**Type:** enhancement
**Summary:** `ask-cape` muss beschreiben, *wo* die Triage-Auffahrt je nach Item-Größe wieder
in den Main-Flow einmündet — nicht andeuten, ein triagiertes Item könne direkt zu
`/implement` oder `/build` gehen.

**Current behaviour:** Der On-ramps-Abschnitt von `ask-cape` sagt, `/triage` "produziert
agent-fertige Issues, die `/implement` (oder `/build`) später aufgreift" und deutet damit an,
ein einzelnes triagiertes Brief könne direkt zu `/build` gehen. `/build` braucht tatsächlich
eine Feature-Spec plus die Issues, die `/split` produziert hat, also hält dieser direkte Pfad
nicht.

**Desired behaviour:** `ask-cape` benennt den Einmündungspunkt nach Größe:

- eine triagierte **einzelne Slice** wird zu einem ausgeschriebenen Issue, das bei
  `/implement` in den Main-Flow einmündet;
- ein **feature-großes** triagiertes Item mündet über die Grilling-Session ein, die
  `/triage` bereits auslöst, dann `/feature` → `/split` → `/build`.

Die ungenaue "(oder `/build`)"-Direkt-Aufgriff-Formulierung ist weg.

**Key interfaces:**

- `ask-cape`-Skill-Text (Quelle: `skills_source/meta/ask-cape/SKILL.md`) — der
  On-ramps-Abschnitt, der beschreibt, wo `/triage`-Output wieder in den Flow einmündet. Die
  **Quelle** editieren, nicht die git-ignorierte vendorte Kopie unter `.claude/skills/`.
- Konsistent bleiben mit `/triage`s eigener Beschreibung (es liefert ein ausgeschriebenes
  Issue/Brief, nie ein ganzes Feature-Paket).

**Acceptance criteria:**

- [ ] `ask-cape` sagt oder impliziert nicht mehr, ein triagiertes Item gehe direkt zu
      `/build`.
- [ ] `ask-cape` beschreibt die Einmündung der einzelnen Slice bei `/implement`.
- [ ] `ask-cape` beschreibt die feature-große Einmündung über Grilling → `/feature` →
      `/split` → `/build`.
- [ ] Die neue Formulierung ist konsistent mit den Verträgen von `/triage`, `/implement` und
      `/build`, wie sie anderswo im Skill-Set festgehalten sind.
- [ ] `.claude-plugin/plugin.json` `version` gebumpt (PATCH) — der Text eines
      ausgelieferten Skills hat sich geändert.
- [ ] README / CHANGELOG geprüft; nur aktualisiert, falls sie die Triage-Auffahrt-Einmündung
      wiedergeben.

**Out of scope:**

- Keine Verhaltens- oder Mechanik-Änderung an `/triage`, `/implement` oder `/build` — nur
  Formulierung.
- Die Main-Flow-Schritte selbst nicht umschreiben, nur wie die Einmündung der
  Triage-Auffahrt gelesen wird.
- Die vendorte `.claude/skills/`-Kopie nicht editieren (git-ignoriert, aus der Quelle
  regeneriert).
