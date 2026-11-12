import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFile(path.join(root, file), 'utf8');

test('three UI targets expose the five first controls', async () => {
  for (const target of ['ui-web/src/index.tsx', 'ui-h5/src/index.tsx', 'ui-native/src/index.tsx']) {
    const source = await read(target);
    for (const name of ['ZButton', 'ZInput', 'ZSelect', 'ZSwitch', 'ZToast']) assert.match(source, new RegExp(`export const ${name}`));
    assert.match(source, /disabled/);
    assert.match(source, /aria-label|accessibilityLabel/);
  }
});

test('showcase covers five controls and non-blocking toast', async () => {
  const html = await read('showcase/ui-kit.html');
  for (const name of ['Button', 'Input', 'Select', 'Switch', 'Toast']) assert.match(html, new RegExp(`<h2>${name}</h2>`));
  assert.match(html, /role="status"/);
  assert.match(html, /tokens\/dist\/tokens\.css/);
});

