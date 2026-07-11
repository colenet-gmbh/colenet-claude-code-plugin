#!/usr/bin/env node
// Baseline runner CLI — drives the (stock, no-nudge) cape:implement flow over the
// constellation matrix, N runs per cell, and reports canary rates.
//
// This is the Phase-B baseline gate. Running the FULL matrix at scale is gated by the
// orchestrator/user — invoke it deliberately, it spends tokens per run.
//
//   node bin/run-baseline.js --n 3
//   node bin/run-baseline.js --n 1 --constellations cross-tier --keep   # pilot
//
// Flags:
//   --n <int>              runs per cell (default 3; the value is a parameter, never
//                          hardcoded into logic)
//   --constellations csv   subset of frontend-only,backend-only,cross-tier (default all)
//   --plugin-dir <path>    cape checkout to load (default: this repo root)
//   --claude-bin <path>    claude binary (default: $HOME/.local/bin/claude)
//   --timeout <minutes>    per-run timeout (default 20)
//   --threshold <0..1>     recall threshold for the gate hint (default 0.5)
//   --keep                 keep fixtures under evals/conventions/.workdir/ (else tmp+deleted)

import path from "node:path";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { CONSTELLATIONS, scoringPlan } from "../src/fixture.js";
import { runOnce, DEFAULT_CLAUDE_BIN } from "../src/runner.js";
import { aggregateMatrix } from "../src/aggregate.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EVAL_ROOT = path.join(HERE, "..");
const REPO_ROOT = path.join(EVAL_ROOT, "..", "..");

function parseArgs(argv) {
  const o = {
    n: 3,
    constellations: CONSTELLATIONS,
    pluginDir: REPO_ROOT,
    claudeBin: DEFAULT_CLAUDE_BIN,
    timeoutMin: 20,
    threshold: 0.5,
    keep: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--n") o.n = parseInt(argv[++i], 10);
    else if (a === "--constellations") o.constellations = argv[++i].split(",");
    else if (a === "--plugin-dir") o.pluginDir = path.resolve(argv[++i]);
    else if (a === "--claude-bin") o.claudeBin = argv[++i];
    else if (a === "--timeout") o.timeoutMin = parseFloat(argv[++i]);
    else if (a === "--threshold") o.threshold = parseFloat(argv[++i]);
    else if (a === "--keep") o.keep = true;
    else throw new Error(`unknown arg: ${a}`);
  }
  for (const c of o.constellations) {
    if (!CONSTELLATIONS.includes(c)) throw new Error(`unknown constellation: ${c}`);
  }
  // Fail loud on a bad number: a NaN --n would run zero cells and then read as a
  // "gap below threshold", silently faking a supported hypothesis on the gate.
  if (!Number.isInteger(o.n) || o.n < 1) throw new Error(`--n must be a positive integer`);
  if (!Number.isFinite(o.threshold) || o.threshold < 0 || o.threshold > 1) {
    throw new Error(`--threshold must be a number in [0, 1]`);
  }
  return o;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const timeoutMs = opts.timeoutMin * 60 * 1000;
  console.log(
    `[baseline] N=${opts.n} constellations=${opts.constellations.join(",")} ` +
      `plugin-dir=${opts.pluginDir}`,
  );

  let workBase = null;
  if (opts.keep) {
    workBase = path.join(EVAL_ROOT, ".workdir");
    await mkdir(workBase, { recursive: true });
  }

  const recall = {}; // constellation -> boolean[] (expected canary present)
  const leakage = {}; // constellation -> boolean[] (forbidden canary present)
  const details = [];

  for (const c of opts.constellations) {
    recall[c] = [];
    leakage[c] = [];
    for (let i = 0; i < opts.n; i++) {
      const stamp = `${c}-${Date.now()}-${i}`;
      const workdir = workBase ? path.join(workBase, stamp) : undefined;
      process.stdout.write(`[run] ${c} #${i + 1}/${opts.n} … `);
      const r = await runOnce({
        constellation: c,
        pluginDir: opts.pluginDir,
        claudeBin: opts.claudeBin,
        workdir,
        timeoutMs,
        keep: opts.keep,
      });
      recall[c].push(r.expectedPresent);
      leakage[c].push(r.forbiddenPresent);
      details.push(r);
      console.log(
        `expected=${r.expectedPresent ? "HIT" : "miss"} ` +
          `forbidden=${r.forbiddenPresent ? "LEAK" : "clean"} ` +
          `exit=${r.run.code}${r.run.timedOut ? " TIMEOUT" : ""} ` +
          `wrote=${r.changedFiles.length}`,
      );
    }
  }

  const recallMatrix = aggregateMatrix(recall);
  const leakageMatrix = aggregateMatrix(leakage);

  // Not every cell defines a forbidden canary (cross-tier has none) — show n/a there
  // rather than a real-looking 0/N that reads as "measured, no leak".
  const leakageRate = (c) =>
    scoringPlan(c).forbidden ? leakageMatrix[c].rate : "n/a";

  console.log("\n=== Baseline (no nudge) — canary rates ===");
  for (const c of opts.constellations) {
    console.log(
      `  ${c.padEnd(14)} recall(expected)=${recallMatrix[c].rate}` +
        `  leakage(forbidden)=${leakageRate(c)}`,
    );
  }

  console.log("\n=== Gate hint (human decides) ===");
  for (const c of opts.constellations) {
    const f = recallMatrix[c].fraction;
    const gap = f < opts.threshold;
    console.log(
      `  ${c.padEnd(14)} recall=${recallMatrix[c].rate} ` +
        `(${f.toFixed(2)}) ${gap ? "→ GAP below threshold (hypothesis supported)" : "→ no gap"}`,
    );
  }
  console.log(
    `\nThreshold=${opts.threshold}. A recall BELOW it in the baseline means the convention ` +
      `verpufft ohne Nudge — the hypothesis holds and I031 is warranted. This is a HINT; the ` +
      `orchestrator/user makes the call.`,
  );

  // Machine-readable dump for the report.
  console.log("\n=== JSON ===");
  console.log(
    JSON.stringify(
      {
        n: opts.n,
        recall: recallMatrix,
        leakage: leakageMatrix,
        runs: details.map((d) => ({
          constellation: d.constellation,
          expectedPresent: d.expectedPresent,
          expectedMatches: d.expectedMatches,
          forbiddenPresent: d.forbiddenPresent,
          exit: d.run.code,
          timedOut: d.run.timedOut,
          changedFiles: d.changedFiles,
        })),
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
