# Convention-consultation eval harness (F006 / I030)

Internal working material — **not shipped** with the plugin. It proves the F006 hypothesis:
without an explicit consultation nudge, a tier's `CLAUDE.md` convention *verpufft* — cape's
`/implement` writes files that ignore it, especially when a decision is made **before** the
owning tier's files are touched.

## How it works

1. **Fixture generator** (`src/fixture.js`, `templates/`) builds a throwaway two-tier repo
   (`frontend/` + `backend/`), each tier carrying a `CLAUDE.md` with a verbatim canary
   (`CAPE_CANARY_*`). One issue per constellation lands in `docs/work/02-development/` with an
   **underspecified** instruction that only the tier convention resolves.
   - `frontend-only` — expect FE canary in a `frontend/` file, no BE leakage.
   - `backend-only` — expect BE canary in a `backend/` file, no FE leakage.
   - `cross-tier` — the discriminator: a **frontend** convention must shape a **backend**
     artifact written *first*, so the FE canary is expected inside a `backend/` file.
2. **Runner** (`src/runner.js`) drives `claude -p` headless over the fixture, cape loaded
   from this local checkout via `--plugin-dir`, in an ephemeral tmpdir. The real cape
   checkout is never modified (plugin load is read-only).
3. **Scorer** (`src/scorer.js`) diffs a before/after snapshot to find the files `/implement`
   wrote, then does a verbatim `grep` for the canary — never in the fixture's own
   `CLAUDE.md`. No LLM judge.
4. **Aggregation** (`src/aggregate.js`) turns N per-run booleans into a rate (`1/10`).

## Run

```bash
cd evals/conventions
npm test                                              # unit tests (pure seams)

# Baseline gate (spends tokens per run — invoke deliberately):
node bin/run-baseline.js --n 3                        # full matrix, Phase B
node bin/run-baseline.js --n 1 --constellations cross-tier --keep   # single pilot
```

The baseline runs the **stock** `/implement` (no nudge) — that stock flow *is* the baseline,
because the consultation nudge (I031) does not exist yet. A recall rate **below** the
threshold means the convention is ignored without the nudge → the hypothesis holds.

`--keep` writes fixtures under `.workdir/` (gitignored) for inspection; otherwise they go to
an OS tmpdir and are deleted. `--n` is a parameter; nothing hardcodes a run count.

## Pilot result (N=1, wiring proof — not the baseline gate)

One pilot run was executed to de-risk the mechanism end-to-end (the I027 feasibility
knackpunkt). Constellation `frontend-only`, stock/no-nudge `/implement`, on this checkout
(`claude` 2.1.206):

```
node bin/run-baseline.js --n 1 --constellations frontend-only
→ recall(expected)=1/1  leakage(forbidden)=0/1
```

Headless `cape:implement` loaded via `--plugin-dir`, wrote `frontend/cta-button.js` into the
fixture, committed it, and the scorer read the FE canary from that file (no BE leakage). This
proves the wiring — generator → runner → `claude -p` → scorer — works.

It is **not** the baseline gate. `frontend-only` is the *masked* single-tier case: Level 1
lazy-loads `frontend/CLAUDE.md` when the frontend file is written, so a hit here is expected
and says nothing about the hypothesis. The gap lives in `cross-tier` (backend artifact written
first), measured at N per cell in **Phase B** — deliberately not run here.
