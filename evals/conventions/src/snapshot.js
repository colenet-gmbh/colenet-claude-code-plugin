// Directory snapshot — IO helper for the runner.
//
// Walks a fixture and returns a path -> content map. Taking one snapshot before the
// implement run and one after lets `changedFiles` (src/scorer.js) isolate exactly the
// files /implement wrote or changed — so we never score the fixture's own CLAUDE.md.

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const SKIP_DIRS = new Set([".git", "node_modules"]);

/**
 * Snapshot every file under `root` as relative-path -> utf8 content.
 * Unreadable/binary files collapse to one sentinel — enough to detect their appearance or
 * removal (canaries are text, so binary content changes are out of scope here).
 * @param {string} root
 * @param {{skipDirs?: Set<string>}} [opts]
 * @returns {Promise<Record<string,string>>}
 */
export async function snapshotDir(root, opts = {}) {
  const skip = opts.skipDirs ?? SKIP_DIRS;
  const out = {};
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (skip.has(entry.name)) continue;
        await walk(abs);
      } else if (entry.isFile()) {
        const rel = path.relative(root, abs).split(path.sep).join("/");
        try {
          out[rel] = await readFile(abs, "utf8");
        } catch {
          out[rel] = "[[unreadable-or-binary]]";
        }
      }
    }
  }
  await walk(root);
  return out;
}
