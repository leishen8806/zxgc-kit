#!/usr/bin/env node
import { chromium } from 'playwright';

const [target, out, width = '1440'] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } });
await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 90_000 });
await page.screenshot({ path: out, fullPage: true });
await browser.close();
