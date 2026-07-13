// Canary scorer — the deterministic heart of the eval.
//
// A canary is a verbatim, fake-prefixed token (CAPE_CANARY_*) that a tier's CLAUDE.md
// convention resolves an underspecified instruction to. Its appearance in a file
// /implement WROTE proves the convention was consulted. Scoring is a plain substring
// match (the "grep" of I030) — no LLM judge, so it never flakes.
//
// We deliberately score only the files /implement newly wrote or changed, never the
// fixture's own CLAUDE.md — the canary lives there by construction, so counting it there
// would always pass. `changedFiles` isolates that set from before/after snapshots.

const norm = (p) => p.replace(/\\/g, "/");

/**
 * Files that are new or whose content changed between two snapshots.
 *
 * `ignoreBasenames` drops files by filename regardless of depth — we pass `CLAUDE.md`
 * so a tier convention file is NEVER scored even if /implement edits it (the canary lives
 * there by construction; scoring it there would be a false recall HIT). A canary only
 * counts when it lands in an actual artifact, not back in a CLAUDE.md.
 *
 * @param {Record<string,string>} before  path -> content before the run
 * @param {Record<string,string>} after   path -> content after the run
 * @param {{ignore?: string[], ignoreBasenames?: string[]}} [opts]
 *        `ignore`: path prefixes to drop (e.g. ".git/"); `ignoreBasenames`: filenames to drop.
 * @returns {{path:string, content:string}[]}
 */
export function changedFiles(before, after, opts = {}) {
  const ignore = (opts.ignore ?? []).map(norm);
  const ignoreBasenames = new Set(opts.ignoreBasenames ?? []);
  const out = [];
  for (const [rawPath, content] of Object.entries(after)) {
    const path = norm(rawPath);
    if (ignore.some((prefix) => path.startsWith(prefix))) continue;
    if (ignoreBasenames.has(path.split("/").pop())) continue;
    const prev = before[rawPath] ?? before[path];
    if (prev === undefined || prev !== content) out.push({ path, content });
  }
  return out;
}

/**
 * Whether a canary token appears verbatim in the given files.
 * @param {{path:string, content:string}[]} files
 * @param {string} canary                  the verbatim CAPE_CANARY_* token
 * @param {{pathPrefix?: string}} [opts]    restrict the search to a tier (e.g. "backend/")
 * @returns {{present:boolean, matches:string[]}}
 */
export function scoreCanary(files, canary, opts = {}) {
  const prefix = opts.pathPrefix ? norm(opts.pathPrefix) : null;
  const matches = [];
  for (const { path, content } of files) {
    if (prefix && !norm(path).startsWith(prefix)) continue;
    if (content.includes(canary)) matches.push(norm(path));
  }
  return { present: matches.length > 0, matches };
}
