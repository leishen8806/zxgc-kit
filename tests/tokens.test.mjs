import assert from 'node:assert/strict';
import test from 'node:test';
import { tokenSource } from '../tokens/source.mjs';

const luminance = (hex) => {
  const parts = hex.slice(1).match(/../g).map((part) => Number.parseInt(part, 16) / 255);
  const linear = parts.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};
const contrast = (foreground, background) => {
  const [a, b] = [luminance(foreground), luminance(background)].sort((left, right) => right - left);
  return (a + 0.05) / (b + 0.05);
};

test('body text meets 4.5:1 contrast in both themes', () => {
  for (const theme of Object.values(tokenSource.color)) {
    assert.ok(contrast(theme.text, theme.background) >= 4.5);
    assert.ok(contrast(theme.mutedText, theme.background) >= 4.5);
  }
});
