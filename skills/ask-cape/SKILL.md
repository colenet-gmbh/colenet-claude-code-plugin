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

- **Bugs and requests piling up** → **`/triage`**. It moves issues through triage roles and produces agent-ready issues, which `/implement` (or `/build`) later picks up.

  Triage is only for issues **you didn't create** — bug reports, incoming feature requests, anything that arrives raw. Issues that `/split` produced are already agent-ready, so **don't triage them**.

## Codebase health

Not feature work — upkeep.

- **`/architect`** — a deep skill for shaping structure, activated in context (and by hand). Its **deepening** aspect you run in a spare moment to keep the codebase good for agents to operate in: it surfaces opportunities, and picking one _generates an idea_ you take into the main flow at `/grill-with-docs`. Its other aspects — codebase/software design, domain modelling, arc42 docs — fire _inside_ other skills as the work needs them (e.g. `/tdd` reaching for design vocabulary, domain modelling during `/grill-with-docs`), several at once.

## Crossing sessions

- **`/handoff`** — when a thread is full or you need to branch off (e.g. into a `/prototype` session), this compacts the conversation into a markdown file. You don't continue in place — you **open a new session and reference that file** to carry the context across. It's the bridge between context windows, in either direction. Use it when you want a **fresh session** but need the **current conversation preserved**.
- **`/compact`** (built-in) — stay in the **same conversation**, letting the earlier turns be summarized. Use it at **intentional breaks between phases**, when you don't mind losing the verbatim history. Don't compact mid-phase — the agent can lose its way. `/handoff` forks; `/compact` continues.

## Standalone

Off the main flow entirely.

- **`/grill-me`** — the same relentless interview as `/grill-with-docs`, but for when you have **no codebase**. Stateless: it saves nothing locally, builds no docs. Reach for it to sharpen any plan or design that doesn't live in a repo.
- **`/writing-great-skills`** — reference for writing and editing skills well. The authoring standard for every cape skill.

## Precondition

- **`/setup`** — run before your first engineering flow to configure the issue tracker, triage labels, and doc layout the other skills assume. Custom issue trackers also work.
