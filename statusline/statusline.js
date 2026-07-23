#!/usr/bin/env node
// Claude Code Statusline
// Shows: Cape <version> | model/effort | dirname | branch | context bar | rate limits

const path = require('path');
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');

// Version of the cape install active for this project, from Claude Code's install
// registry. "-dev" marks any source other than the official colenet marketplace.
function capeVersion(dir) {
  try {
    const reg = JSON.parse(fs.readFileSync(
      path.join(os.homedir(), '.claude', 'plugins', 'installed_plugins.json'), 'utf8'));
    const capes = Object.entries(reg.plugins || {})
      .filter(([key]) => key.startsWith('cape@'))
      .flatMap(([key, entries]) => entries.map(e => ({ key, ...e })));
    if (!capes.length) return '';
    // Prefer the install scoped to this project (longest projectPath prefix wins),
    // then user-scoped, then whatever exists.
    const inDir = (p) => p && (dir === p || dir.startsWith(p + path.sep));
    const pick =
      capes.filter(e => inDir(e.projectPath))
        .sort((a, b) => b.projectPath.length - a.projectPath.length)[0]
      || capes.find(e => e.scope === 'user')
      || capes[0];
    if (!pick.version) return '';
    return pick.key === 'cape@colenet' ? pick.version : `${pick.version}-dev`;
  } catch (e) {
    return '';
  }
}

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);

    // Model (from actual runtime, not config)
    let model = data.model?.display_name || 'Claude';
    const modelId = data.model?.id || '';
    const is1M = /1m/i.test(modelId) || /1m/i.test(model);
    // Drop the runtime's verbose "(1M context)"/"(1M)" suffix, re-add a terse "(1M)".
    model = model.replace(/\s*\(1m(?:\s+context)?\)\s*$/i, '').trim();
    const effort = data.effort?.level ? `/${data.effort.level.toUpperCase()}` : '';
    const modelStr = `${is1M ? `${model} (1M)` : model}${effort}`;

    // Git branch
    const dir = data.workspace?.current_dir || process.cwd();
    let branch = '';
    let dirty = false;
    try {
      branch = execFileSync('git', ['branch', '--show-current'], {
        cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      dirty = execFileSync('git', ['status', '--porcelain'], {
        cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
      }).trim().length > 0;
    } catch (e) {}

    // Directory
    const dirname = path.basename(dir);

    // Context window — colored by absolute tokens, bar scaled to the 200k
    // practical limit (where context quality degrades regardless of window size)
    let ctx = '';
    const tokens = data.context_window?.total_input_tokens;
    if (tokens != null) {
      const REF = 200000;
      const frac = Math.min(tokens / REF, 1);
      const filled = Math.round(frac * 10);
      const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
      const label = `${Math.round(tokens / 1000)}k`;
      // Escalate on whichever axis is hotter: absolute tokens or window %.
      const p = data.context_window?.used_percentage ?? 0;
      let level = 0; // 0 green, 1 yellow, 2 orange, 3 blinking red
      if (tokens >= 150000 || p >= 50) level = 1;
      if (p >= 70) level = 2;
      if (p >= 85) level = 3;
      // 256-color hues chosen to read on light *and* dark backgrounds: green, amber,
      // orange, blinking red. Deep amber (not bright 214/ANSI-33 "yellow") because light
      // yellows wash out on white and ANSI 33 renders greenish in some themes — a warning
      // that looks reassuring is no warning.
      const colors = ['\x1b[38;5;35m', '\x1b[38;5;178m', '\x1b[38;5;208m', '\x1b[5;38;5;196m'];
      ctx = `${colors[level]}${bar} ${label}\x1b[0m`;
    }

    // Rate limits (5h and 7d, always shown)
    let rateLimits = '';
    const rl5h = data.rate_limits?.five_hour?.used_percentage;
    const rl7d = data.rate_limits?.seven_day?.used_percentage;
    if (rl5h != null || rl7d != null) {
      const fmt = (pct) => {
        const p = Math.round(pct);
        // deep gold for the mid band (bright yellow washes out on white)
        const color = p < 50 ? '\x1b[32m' : p < 80 ? '\x1b[38;5;136m' : '\x1b[31m';
        return `${color}${p}%\x1b[0m`;
      };
      const parts5h = rl5h != null ? fmt(rl5h) : '-';
      const parts7d = rl7d != null ? fmt(rl7d) : '-';
      rateLimits = `\x1b[2m5h:\x1b[0m${parts5h} \x1b[2m7d:\x1b[0m${parts7d}`;
    }

    // Assemble
    const parts = [];
    const capeV = capeVersion(dir);
    parts.push(`\x1b[1mCape${capeV ? ' ' + capeV : ''}\x1b[0m`);
    parts.push(`\x1b[90m${modelStr}\x1b[0m`);
    parts.push(`\x1b[90m${dirname}\x1b[0m`);
    if (branch) {
      const mark = dirty ? '\x1b[38;5;166m*\x1b[0m' : '';
      parts.push(`\x1b[38;5;31m${branch}\x1b[0m${mark}`);
    }
    if (ctx) parts.push(ctx);
    if (rateLimits) parts.push(rateLimits);

    process.stdout.write(parts.join(' │ '));
  } catch (e) {
    // Silent fail
  }
});
