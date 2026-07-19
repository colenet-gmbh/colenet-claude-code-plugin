---
name: session-retro
description: Run a structured retrospective on collaboration and process after a development session — not code quality or subject-matter learning. Invoke manually via /session-retro, or proactively suggest (never start unasked) when the session shows a closing signal after substantial development work, e.g. "that's it for today", "let's call it a day", "good session", "I have to head out", "das war's für heute", "wir machen Schluss für heute", "gute Session", "das reicht für heute", "passt". Skip on a plain goodbye with no prior work, on short one-off questions, or if a retro already ran or was declined this session.
---

# Session Retro

A retrospective on **how the collaboration went**, not on what was built. It runs after a
development session and surfaces what worked, what didn't, and what to change next time —
generalizable across projects, not a critique of this session's code or domain content.

## Trigger

- **Manual:** the user runs `/session-retro`.
- **Proactive:** offer it — never start it unasked — when both hold:
  1. the session shows a closing signal (see the trigger phrases in the description),
  2. substantial development work happened this session (rough guideline: 5+ exchanges
     with real implementation, not a single short question).

  Ask once, as a question, e.g. "Want to close out with a quick retro on how we worked
  together today?" Suggest **at most once per session**. After a decline, or after a retro
  already ran, don't offer again unless the user explicitly asks.

## Scope — deliberately narrow

- **In:** collaboration with Claude (clarity, back-and-forth, pace, depth of explanation,
  tone), process/workflow (planning vs. jumping straight in, correction loops, tool use,
  efficiency).
- **Out:** code/result quality, subject-matter learning progress. Both are off-topic here
  even if raised — redirect gently if the conversation drifts there.

## Flow

Run the phases one at a time, in dialog — do not ask all questions at once. Wait for an
answer before moving to the next phase.

1. **What went well?** — "Looking back, what worked well in how we collaborated today?"
2. **What didn't?** — "And what didn't work, or got in the way?"
3. **What should we improve?** — "What should we do differently next time?"
4. **Claude's own observations** — only after the user has answered all three phases
   above. Add observations the user didn't raise, to round out the picture. Candidates to
   self-assess:
   - Correction loops: did the user have to clarify the same thing more than once?
   - Was confirmation sought before risky or large changes (destructive git commands,
     edits to existing files) per the project's own directives?
   - Did explanation depth match the user's stated experience level?
   - Was project/process documentation kept current throughout?
   - Did Claude start the session with good context and a clear picture of what to build?
   - Were any stated conventions or guidelines broken?
   - Was quality assurance (tests, review) proportionate to the change?
   - Pace: too many steps bundled at once, or too fragmented?
   - Were known preferences from memory or prior sessions honored?

   Offer each observation as a proposal, not a fact — the user confirms or pushes back.
   Raise them one at a time so real discussion stays possible: "I also noticed
   [observation] — does that match your view?"
5. **Distill** — together with the user, turn everything from phases 1–4 into 1–3
   concrete, actionable improvements. Concrete means: a rule Claude can follow starting
   now, not a vague sentiment.

## Output

For each concrete improvement from phase 5, persist it so it actually changes future
behavior — not just this transcript:

- If Claude Code's memory system is available, save it as a `feedback`-type memory (rule,
  **Why**, **How to apply**). Check first whether a matching memory already exists —
  update it instead of creating a duplicate.
- Otherwise, ask the user where this project tracks working agreements (e.g. `CLAUDE.md`)
  and add it there.

Do not keep a transcript or log of the retro conversation itself — only the distilled
improvements are worth keeping; the discussion that led to them is not.

## Tone

Honest without over-apologizing or excessive self-criticism. Concrete over vague
("explained too fast" beats "could be better"). Collegial — a real retro between peers,
not a scorecard.
