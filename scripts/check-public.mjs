import { execFileSync, spawn } from 'node:child_process';

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
const violations = [];
const scan = (args) => new Promise((resolve, reject) => {
  const child = spawn('git', args);
  let pending = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk) => {
    const lines = `${pending}${chunk}`.split(/\r?\n/);
    pending = lines.pop();
    violations.push(...lines.filter((entry) => banned.some((pattern) => pattern.test(entry))));
  });
  child.on('error', reject);
  child.on('close', (code) => {
    if (pending && banned.some((pattern) => pattern.test(pending))) violations.push(pending);
    if (code === 0 || code === 1) resolve(); else reject(new Error(`git ${args[0]} exited ${code}`));
  });
});

for (const revision of revisions) await scan(['grep', '-nI', '-E', '.', revision]);
await scan(['grep', '--cached', '-nI', '-E', '.']);

if (violations.length) {
  process.stderr.write(`Public-content check failed:\n${violations.join('\n')}\n`);
  process.exit(1);
}
