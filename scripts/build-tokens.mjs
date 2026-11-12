import { mkdir, writeFile } from 'node:fs/promises';
import { tokenSource } from '../tokens/source.mjs';

const output = 'tokens/dist';
const css = (mode, values) => `:root[data-theme="${mode}"] {\n${Object.entries(values).map(([key, value]) => `  --zxgc-color-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}: ${value};`).join('\n')}\n${Object.entries(tokenSource.spacing).map(([key, value]) => `  --zxgc-spacing-${key}: ${value};`).join('\n')}\n${Object.entries(tokenSource.radius).map(([key, value]) => `  --zxgc-radius-${key}: ${value};`).join('\n')}\n${Object.entries(tokenSource.fontSize).map(([key, value]) => `  --zxgc-font-size-${key}: ${value};`).join('\n')}\n}\n`;
const ts = `export const tokens = ${JSON.stringify(tokenSource, null, 2)} as const;\n`;
const antd = `export const antdTheme = { token: { colorPrimary: '${tokenSource.color.light.primary}', colorText: '${tokenSource.color.light.text}', colorBgBase: '${tokenSource.color.light.background}', borderRadius: 8 } } as const;\n`;
const native = `export const nativeTheme = ${JSON.stringify({ light: tokenSource.color.light, dark: tokenSource.color.dark, spacing: tokenSource.spacing, radius: tokenSource.radius }, null, 2)} as const;\n`;

await mkdir(output, { recursive: true });
await Promise.all([
  writeFile(`${output}/tokens.css`, `${css('light', tokenSource.color.light)}\n${css('dark', tokenSource.color.dark)}`),
  writeFile(`${output}/tokens.ts`, ts),
  writeFile(`${output}/antd-theme.ts`, antd),
  writeFile(`${output}/native-theme.ts`, native),
  writeFile(`${output}/flutter-tokens.json`, `${JSON.stringify(tokenSource, null, 2)}\n`)
]);
