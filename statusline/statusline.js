#!/usr/bin/env node
// Claude Code Statusline
// Shows: model | branch | dirname | context bar | RAM

const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);

    // Model (from actual runtime, not config)
    const model = data.model?.display_name || 'Claude';
    const modelId = data.model?.id || '';
    // Don't append (1M) if display_name already contains it
    const is1M = modelId.includes('1m') && !model.includes('1M');
    const modelStr = is1M ? `${model} (1M)` : model;

    // Git branch
    const dir = data.workspace?.current_dir || process.cwd();
    let branch = '';
    try {
      branch = execFileSync('git', ['branch', '--show-current'], {
        cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
    } catch (e) {}

    // Worktree indicator
    const worktree = data.worktree?.name;

    // Directory
    const dirname = path.basename(dir);

    // Context window (used_percentage from runtime)
    let ctx = '';
    const used = data.context_window?.used_percentage;
    if (used != null) {
      const u = Math.round(used);
      const filled = Math.floor(u / 10);
      const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
      if (u < 50) ctx = `\x1b[32m${bar} ${u}%\x1b[0m`;
      else if (u < 70) ctx = `\x1b[33m${bar} ${u}%\x1b[0m`;
      else if (u < 85) ctx = `\x1b[38;5;208m${bar} ${u}%\x1b[0m`;
      else ctx = `\x1b[5;31m${bar} ${u}%\x1b[0m`;
    }

    // RAM
    let ram = '';
    try {
      const pct = Math.round(((os.totalmem() - os.freemem()) / os.totalmem()) * 100);
      const color = pct < 70 ? '32' : pct < 85 ? '33' : '31';
      ram = `\x1b[${color}mRAM ${pct}%\x1b[0m`;
    } catch (e) {}

    // Cost
    let cost = '';
    const totalCost = data.cost?.total_cost_usd;
    if (totalCost != null) {
      cost = `\x1b[2m$${totalCost.toFixed(3)}\x1b[0m`;
    }

    // Rate limits (5h and 7d, always shown)
    let rateLimits = '';
    const rl5h = data.rate_limits?.five_hour?.used_percentage;
    const rl7d = data.rate_limits?.seven_day?.used_percentage;
    if (rl5h != null || rl7d != null) {
      const fmt = (pct) => {
        const p = Math.round(pct);
        const color = p < 50 ? '32' : p < 80 ? '33' : '31';
        return `\x1b[${color}m${p}%\x1b[0m`;
      };
      const parts5h = rl5h != null ? fmt(rl5h) : '-';
      const parts7d = rl7d != null ? fmt(rl7d) : '-';
      rateLimits = `\x1b[2m5h:\x1b[0m${parts5h} \x1b[2m7d:\x1b[0m${parts7d}`;
    }

    // Assemble
    const parts = [];
    parts.push(`\x1b[2m${modelStr}\x1b[0m`);
    if (branch) {
      const branchDisplay = worktree ? `${branch} (${worktree})` : branch;
      parts.push(`\x1b[36m${branchDisplay}\x1b[0m`);
    }
    parts.push(`\x1b[2m${dirname}\x1b[0m`);
    if (ctx) parts.push(ctx);
    if (ram) parts.push(ram);
    if (cost) parts.push(cost);
    if (rateLimits) parts.push(rateLimits);

    process.stdout.write(parts.join(' │ '));
  } catch (e) {
    // Silent fail
  }
});
