/**
 * 截圖 script — 對每個頁面的每個狀態各截一張圖
 *
 * 用法：
 *   npx tsx pm-as-builder/scripts/screenshot-pages.ts \
 *     --config pages.json \
 *     --base-url http://localhost:5173 \
 *     --out-dir docs/plans/my-feature/screenshots \
 *     --session auth.json   ← 可選，登入 session（由 save-session.ts 產生）
 *
 * pages.json 格式（兩種 state 寫法均支援）：
 * [
 *   {
 *     "path": "/list",
 *     "name": "list",
 *     "states": [
 *       "default",
 *       "empty",
 *       { "name": "filtered", "query": { "tab": "published", "search": "hello" } }
 *     ]
 *   },
 *   { "path": "/detail/1", "name": "detail", "states": ["default"] }
 * ]
 */

import { chromium } from "playwright";
import { mkdir, readFile } from "fs/promises";
import { join } from "path";
import { parseArgs } from "util";

interface StateConfig {
  name: string;
  query?: Record<string, string>;
}

interface PageConfig {
  path: string;
  name: string;
  states: (string | StateConfig)[];
}

const { values } = parseArgs({
  options: {
    config: { type: "string" },
    "base-url": { type: "string", default: "http://localhost:5173" },
    "out-dir": { type: "string", default: "screenshots" },
    session: { type: "string" },
  },
});

if (!values.config) {
  console.error("Usage: --config <pages.json> [--base-url URL] [--out-dir DIR]");
  process.exit(1);
}

const pages: PageConfig[] = JSON.parse(
  await readFile(values.config!, "utf-8")
);

const outDir = values["out-dir"]!;
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  ...(values.session ? { storageState: values.session } : {}),
});

try {
  for (const page of pages) {
    for (const rawState of page.states) {
      const state: StateConfig =
        typeof rawState === "string"
          ? { name: rawState, query: {} }
          : rawState;

      const url = new URL(page.path, values["base-url"]);
      for (const [key, value] of Object.entries(state.query ?? {})) {
        url.searchParams.set(key, value);
      }

      const tab = await context.newPage();
      // Clear stale Apollo cache so app fetches fresh show data from network.
      // Without this, apollo-cache-persist may restore a show with name=null,
      // causing the app to redirect to /shows before routing to the target page.
      await tab.addInitScript(() => {
        localStorage.removeItem("apollo-cache-persist");
      });
      await tab.goto(url.toString(), { waitUntil: "networkidle" });
      await tab.waitForTimeout(2000);
      // Resize viewport to fit full scrollable content, then screenshot
      const fullHeight = await tab.evaluate(() => {
        // Find the deepest scroll container with actual overflow
        let maxScroll = document.documentElement.scrollHeight;
        document.querySelectorAll<HTMLElement>("*").forEach((el) => {
          if (el.scrollHeight > el.clientHeight + 1) {
            const s = window.getComputedStyle(el);
            if (s.overflowY === "auto" || s.overflowY === "scroll") {
              maxScroll = Math.max(maxScroll, el.scrollHeight);
            }
          }
        });
        return maxScroll;
      });
      await tab.setViewportSize({ width: 1280, height: fullHeight });
      await tab.waitForTimeout(500);
      const filename = `${page.name}-${state.name}.png`;
      await tab.screenshot({ path: join(outDir, filename), fullPage: true });
      console.log(`✓ ${filename}`);
      await tab.close();
    }
  }
} catch (err) {
  console.error("Screenshot failed:", err);
  process.exit(1);
} finally {
  await browser.close();
}
console.log(`\nDone — ${outDir}/`);
