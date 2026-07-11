// Rate aggregation — evals are statistical, never single pass/fail.
//
// A cell (one constellation, one arm) is run N times; each run yields a boolean
// "did the expected canary show up?". We report the outcome as a RATE (e.g. "1/10"),
// so the baseline gate can compare it against a target threshold rather than a coin flip.

/**
 * Aggregate the per-run booleans of a single cell into a rate.
 * @param {boolean[]} results  one entry per run: expected canary present?
 * @returns {{hits:number, total:number, rate:string, fraction:number}}
 */
export function aggregateRate(results) {
  const total = results.length;
  const hits = results.filter(Boolean).length;
  return {
    hits,
    total,
    rate: `${hits}/${total}`,
    fraction: total === 0 ? 0 : hits / total,
  };
}

/**
 * Aggregate a whole matrix: constellation -> per-run booleans.
 * @param {Record<string, boolean[]>} runsByConstellation
 * @returns {Record<string, {hits:number, total:number, rate:string, fraction:number}>}
 */
export function aggregateMatrix(runsByConstellation) {
  const out = {};
  for (const [constellation, results] of Object.entries(runsByConstellation)) {
    out[constellation] = aggregateRate(results);
  }
  return out;
}
