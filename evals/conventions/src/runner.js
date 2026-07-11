// Runner — the integration seam. Drives cape:implement headless over a generated fixture.
//
// Everything here is hermetic: cape loads from a LOCAL checkout via --plugin-dir (never the
// unpinned marketplace), and the fixture lives in an ephemeral workdir. `claude -p` runs
// non-interactively with permissions bypassed — safe because it operates only inside the
// throwaway fixture. The real cape checkout is read-only to the run (plugin load only).

import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { execFile as execFileCb } from "node:child_process";
import { generateFixture, looksLikeFixture } from "./fixture.js";
import { snapshotDir } from "./snapshot.js";
import { changedFiles, scoreCanary } from "./scorer.js";

const execFile = promisify(execFileCb);

export const DEFAULT_CLAUDE_BIN = path.join(
  process.env.HOME ?? "",
  ".local/bin/claude",
);

/** The prompt that triggers the (stock, no-nudge) implement flow = the baseline. */
export function baselinePrompt(issuePath) {
  return (
    `Use the cape:implement skill to implement the single issue at ${issuePath}. ` +
    `Work autonomously without asking me questions, and commit your work when done.`
  );
}

/**
 * Run `claude -p` once over a fixture. Resolves even on non-zero exit; callers inspect `code`.
 * @returns {Promise<{code:number|null, stdout:string, stderr:string, timedOut:boolean}>}
 */
export function runClaude({
  prompt,
  fixtureRoot,
  pluginDir,
  claudeBin = DEFAULT_CLAUDE_BIN,
  timeoutMs = 20 * 60 * 1000,
  extraArgs = [],
}) {
  const args = [
    "-p",
    prompt,
    "--plugin-dir",
    pluginDir,
    "--permission-mode",
    "bypassPermissions",
    "--add-dir",
    fixtureRoot,
    ...extraArgs,
  ];
  return new Promise((resolve) => {
    const child = spawn(claudeBin, args, { cwd: fixtureRoot });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, timeoutMs);
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr, timedOut });
    });
    child.on("error", (err) => {
      clearTimeout(timer);
      resolve({ code: null, stdout, stderr: stderr + String(err), timedOut });
    });
  });
}

async function gitInit(root) {
  const run = (args) => execFile("git", args, { cwd: root });
  await run(["init", "-q"]);
  await run(["config", "user.email", "eval@cape.local"]);
  await run(["config", "user.name", "cape-eval"]);
  await run(["add", "-A"]);
  await run(["commit", "-q", "-m", "fixture: initial"]);
}

/**
 * One full cell run: generate → git init → snapshot → run implement → snapshot → score.
 * @returns {Promise<object>} result with expectedPresent / forbiddenPresent and metadata.
 */
export async function runOnce({
  constellation,
  pluginDir,
  workdir,
  claudeBin = DEFAULT_CLAUDE_BIN,
  promptFor = baselinePrompt,
  timeoutMs,
  keep = false,
}) {
  const root =
    workdir ?? (await mkdtemp(path.join(tmpdir(), `cape-eval-${constellation}-`)));
  try {
    const { issuePath, plan } = await generateFixture(root, constellation);
    if (!looksLikeFixture(root)) throw new Error(`fixture generation failed in ${root}`);
    await gitInit(root);

    const before = await snapshotDir(root);
    const run = await runClaude({
      prompt: promptFor(issuePath),
      fixtureRoot: root,
      pluginDir,
      claudeBin,
      timeoutMs,
    });
    const after = await snapshotDir(root);

    // Score only files /implement wrote/changed, minus git internals, board churn, and
    // any CLAUDE.md (the canary's home by construction — never a recall signal).
    const changed = changedFiles(before, after, {
      ignore: [".git/", "docs/work/"],
      ignoreBasenames: ["CLAUDE.md"],
    });
    const expected = scoreCanary(changed, plan.expected.canary, {
      pathPrefix: plan.expected.pathPrefix,
    });
    const forbidden = plan.forbidden
      ? scoreCanary(changed, plan.forbidden.canary)
      : { present: false, matches: [] };

    return {
      constellation,
      root,
      issuePath,
      plan,
      run: { code: run.code, timedOut: run.timedOut },
      changedFiles: changed.map((f) => f.path),
      expectedPresent: expected.present,
      expectedMatches: expected.matches,
      forbiddenPresent: forbidden.present,
      forbiddenMatches: forbidden.matches,
      stdoutTail: run.stdout.slice(-2000),
      stderrTail: run.stderr.slice(-2000),
    };
  } finally {
    if (!keep && !workdir) await rm(root, { recursive: true, force: true });
  }
}
