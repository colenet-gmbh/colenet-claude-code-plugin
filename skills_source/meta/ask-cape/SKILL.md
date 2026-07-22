---
name: ask-cape
description: Ask which cape skill or flow fits your situation. A router over the skills in this repo.
disable-model-invocation: true
---

# Ask Cape

You don't remember every skill, so ask.

A **flow** is a path through the skills. Most work runs along one **main flow**; on-ramps merge onto it, and a few skills stand alone.

## The main flow: idea → ship

The route most work travels. You have an idea and want it built, reviewed, and shipped.

1. **`/grill-with-docs`** — sharpen the idea by interview. Start here when you **have a codebase**: it's stateful, seeding and retaining what it learns in the documentation referenced in the `CONTEXT.md` map — like arc42 and the glossary. (No codebase? Use `/grill-me` — see Standalone.)
2. **Branch — can you settle every question in conversation?** If a question needs a runnable answer (state, business logic, a UI you have to see), detour through a prototype, bridged by **`/handoff`** in both directions (see Crossing sessions):
   - **`/handoff`** out, then open a fresh session against that file,
   - **`/prototype`** to answer the question with throwaway code,
   - **`/handoff`** back what you learned, and reference it from the original idea thread.
3. **Branch — a whole feature, or a single issue?**
   - **A whole feature** → **`/feature`** → **`/split`** → **`/build`**:
     - **`/feature`** turns the thread into a **reviewed spec** — by designing its architecture and checking it through various review lenses; creating a spec with the key decisions on top for **human sign-off**, the internal design below.
     - **`/split`** splits the spec into independently-grabbable, vertically-sliced issues.
     - **`/build`** orchestrates the implementation of the feature by driving the issues to done, internally calling **`/implement`** per issue and dynamically handling upcoming new issues and reviewing the result.
   - **A single issue** → **`/implement`** directly — it builds the one issue (`/tdd` inside) and reviews the implementation.

Either way, done means **every review passed**.

### Context hygiene

**`/implement` always starts in a fresh context.** Its input is a **written-out issue** plus the spec — never the live planning thread. One contract, whichever flow you're in:

- **Whole feature** — keep `/grill-with-docs` → `/feature` → `/split` in **one unbroken context window** so they build on the same thinking. **`/build` then starts fresh** and orchestrates: it drives each issue through `/implement`, each in its own fresh context.
- **Single issue** — **write the issue out**, then run `/implement` fresh against it. Even the one-off issue gets persisted first — that's the price of `/implement` having a single, predictable contract.

The limit on the planning window is the **[smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**: the window (~120k tokens on state-of-the-art models) within which the model still reasons sharply. If a session approaches it before `/split`, don't push on degraded — `/handoff` and continue in a fresh thread.

## On-ramps

A starting situation that generates work, then merges onto the main flow.

- **Bugs and requests piling up** → **`/triage`**. It moves each raw item through triage roles into an agent-ready brief. Where that brief rejoins the main flow depends on its size:
  - a **single issue** is already a written-out brief → it joins at **`/implement`**;
  - a **feature-sized** item joins earlier: the grilling session `/triage` already runs to sharpen it *is* the main flow starting, so it continues through **`/feature`** → **`/split`** → **`/build`**.

  Triage is **backlog management** for anything **not yet worked up** — bug reports, incoming feature requests, your own captured ideas, whatever their origin. Only what's already agent-ready is out: issues `/split` produced need no triage, so **don't re-triage them**.

- **Facts missing before you can plan** → **`/research`**. It delegates the reading legwork to a background agent — investigate the question against **primary sources** (official docs, source code, specs, first-party APIs) and leave a **cited note in the repo**. That note then feeds **`/grill-with-docs`** upstream, so a sharp interview leans on facts rather than guesses. (For a broad, multi-source web report with adversarial fact-checking, that's `/deep-research`, not this.)

## Codebase & harness health

Not feature work — upkeep.

- **`/architect`** — a deep skill for shaping structure, activated in context (and by hand). Its **deepening** aspect you run in a spare moment to keep the codebase good for agents to operate in: it surfaces opportunities, and picking one *generates an idea* you take into the main flow at `/grill-with-docs`. Its other aspects — codebase/software design, domain modelling, arc42 docs — fire *inside* other skills as the work needs them (e.g. `/tdd` reaching for design vocabulary, domain modelling during `/grill-with-docs`), several at once.
- **`/improve`** — where `/architect` keeps the *codebase* good for agents, `/improve` keeps the *harness* good. The two also run very differently: `/architect` is model-invokable and mostly fires *inside* other skills as the work needs it, while `/improve` is an interactive session that the **user always starts** — the agent may suggest it, never launch it. Run it anytime a flow or session showed friction ("that should've gone better"): it finds the friction, traces the root cause, and applies a proportional fix in the project's own harness. When it finds a genuinely general improvement, it suggests sending it to the cape community as a GitHub issue.

## Crossing sessions

- **`/handoff`** — when a thread is full or you need to branch off (e.g. into a `/prototype` session), this compacts the conversation into a markdown file. You don't continue in place — you **open a new session and reference that file** to carry the context across. It's the bridge between context windows, in either direction. Use it when you want a **fresh session** but need the **current conversation preserved**.
- **`/compact`** (built-in) — stay in the **same conversation**, letting the earlier turns be summarized. Use it at **intentional breaks between phases**, when you don't mind losing the verbatim history. Don't compact mid-phase — the agent can lose its way. `/handoff` forks; `/compact` continues.

## Standalone

Off the main flow entirely.

- **`/grill-me`** — the same relentless interview as `/grill-with-docs`, but for when you have **no codebase**. Stateless: it saves nothing locally, builds no docs. Reach for it to sharpen any plan or design that doesn't live in a repo.
- **`/writing-great-skills`** — reference for writing and editing skills well. The authoring standard for every cape skill.

## Precondition

- **`/cape:setup`** — run once per repo before your first engineering flow: it scaffolds the docs the skills assume — the `docs/work/` board, the issue tracker, the arc42 glossary, and the `CONTEXT.md` map pointing at them.

---

The skill names above are shown in short form for reading. In the plugin they are namespaced as `cape:<name>` (e.g. `cape:feature`, `cape:implement`) — that is how one skill invokes another and how you call them by hand. Pull a newer cape into a repo with `/plugin update`.
