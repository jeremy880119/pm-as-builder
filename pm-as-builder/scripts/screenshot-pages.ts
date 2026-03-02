/**
 * 截圖 script — 對每個頁面的每個狀態各截一張圖
 *
 * 用法：
 *   npx tsx pm-as-builder/scripts/screenshot-pages.ts \
 *     --config pages.json \
 *     --base-url http://localhost:3000 \
 *     --out-dir docs/plans/my-feature/screenshots
 *
 * pages.json 格式：
 * [
 *   { "path": "/list", "name": "list", "states": ["default", "empty", "error"] },
 *   { "path": "/detail/1", "name": "detail", "states": ["default"] }
 * ]
 */

import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import { join } from "path";
import { parseArgs } from "util";

interface PageConfig {
  path: string;
  name: string;
  states: string[];
}

const { values } = parseArgs({
  options: {
    config: { type: "string" },
    "base-url": { type: "string", default: "http://localhost:3000" },
    "out-dir": { type: "string", default: "screenshots" },
  },
});

if (!values.config) {
  console.error("Usage: --config <pages.json> [--base-url URL] [--out-dir DIR]");
  process.exit(1);
}

const pages: PageConfig[] = JSON.parse(
  await Bun?.file?.(values.config).text?.() ??
    (await import("fs/promises")).then((fs) => fs.readFile(values.config!, "utf-8"))
);

const outDir = values["out-dir"]!;
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

for (const page of pages) {
  for (const state of page.states) {
    const url = new URL(page.path, values["base-url"]);
    if (state !== "default") {
      url.searchParams.set("state", state);
    }

    const tab = await context.newPage();
    await tab.goto(url.toString(), { waitUntil: "networkidle" });
    const filename = `${page.name}-${state}.png`;
    await tab.screenshot({ path: join(outDir, filename), fullPage: true });
    console.log(`✓ ${filename}`);
    await tab.close();
  }
}

await browser.close();
console.log(`\nDone — ${outDir}/`);
