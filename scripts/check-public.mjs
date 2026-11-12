import { execFileSync } from 'node:child_process';

const banned = [
  /(?:api[_-]?key|password|secret|token)\s*[:=]\s*['"][^'"]+/i,
  /[A-Z]:[\\/]/,
  new RegExp(`\\b(?:${['local', 'host'].join('')}|\\.local|\\.internal)\\b`, 'i'),
  /\b(?:dispatch|ticket|card)[-_ ]?\d{2,}\b/i
];
const revisions = execFileSync('git', ['rev-list', '--all'], { encoding: 'utf8' })
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);
const historyEntries = execFileSync('git', ['grep', '-nI', '-E', '.', ...revisions], { encoding: 'utf8' });
const stagedEntries = execFileSync('git', ['grep', '--cached', '-nI', '-E', '.'], { encoding: 'utf8' });
const entries = `${historyEntries}\n${stagedEntries}`
  .split(/\r?\n/)
  .filter(Boolean);
const violations = entries.filter((entry) => banned.some((pattern) => pattern.test(entry)));

if (violations.length) {
  process.stderr.write(`Public-content check failed:\n${violations.join('\n')}\n`);
  process.exit(1);
}
