# cape reads project conventions that are either local or central

Records how cape (Level 2) interlinks with a repository's own conventions and rules
(Level 3). Resolves F006.

A **convention** is a rule for how work is done in this repo. It matters to cape only when
honouring it improves the output quality of some skill. Every convention cape cares about
is either **local** — it belongs to a place in the code, usually a **tier** (a section of
the stack with its own tech and rules: frontend, backend, a data layer), and lives in that
tier's nested `CLAUDE.md` — or **central** — it belongs to no single place (which issue
tracker is used, the release process, the review checklist) and lives in
`docs/agent-conventions/`.

## Level 1 already links to Level 3, but not enough

Claude Code (Level 1) already reaches Level 3 on its own: it loads a nested `CLAUDE.md`
natively when a file in its subtree is touched, always loads the root `CLAUDE.md`, and
resolves `@import`. Where that native link suffices, cape adds nothing. It falls short in
two ways, and for each cape (Level 2) adds **one explicit touchpoint** — these two, and
currently no other:

1. **Central conventions have no place in the code**, so Level 1's place-based loading
   never reaches them. → **`/cape:setup` prepares them**: it creates every central
   convention cape depends on (the issue tracker is the archetype) and records their
   location as a pointer in `CONTEXT.md`, so a skill reaches them by a stable path.
2. **Local conventions do load natively, but lazily** — only once a file in the subtree is
   touched, which is too late to shape a decision made before that. → **the skill loads them
   explicitly, before it acts**: `/split` names the tiers each issue touches, and `/implement`
   reads those tiers' conventions — resolved via each tier's conventional `CLAUDE.md`
   location — before acting. A vertical slice touches a set of tiers — and few bounded
   contexts, the domain-axis counterpart — so the skill pulls the union up front.

## Why the local touchpoint sits at the acting skill

The local-convention touchpoint lives where the tier is known and about to be written — the
**acting** skill (`/implement`), with the tiers named by `/split`. It is deliberately *not*
placed at the conceptual skills (`/feature`, `/grill-with-docs`): those work above the tier
breakdown — which tiers a slice touches is only fixed at `/split` — and what shapes work at
their altitude are the *placeless* conventions (ADRs and the domain glossary in arc42
chapter 8, and central conventions), which they already read via `CONTEXT.md`. A local
convention is, by the definition above, bound to a place in the code and therefore
implementation-level; consulting it at implementation, not during conceptual design, is the
intended layering, not a gap. Extending the same up-front consultation to further acting
skills is a deliberate, eval-gated step — F006 builds and proves it at `/implement` alone.

## No parallel store, no third touchpoint

Beyond these two explicit references, cape adds **no parallel store**. Local conventions
otherwise ride Level 1's native nested `CLAUDE.md`; a central file may be `@import`ed into
one to be ambient as well. Recording a newly-learned convention needs no dedicated
mechanism — it is proposed inline for human OK and written to its home (a tier's
`CLAUDE.md`, `docs/agent-conventions/`, or the glossary via the existing modelling skills).
Deliberate, retrospective harvesting of conventions is the harness-improvement flow's job
(F015), not this one.
