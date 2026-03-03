/**
 * 儲存登入 session — 開一個可見的瀏覽器，手動登入後關閉，session 會存到 auth.json
 *
 * 用法：
 *   npx tsx /Users/jeremy/Documents/PM/pm-as-builder/scripts/save-session.ts \
 *     --base-url http://localhost:5173 \
 *     --out auth.json
 */

import { chromium } from "playwright";
import { parseArgs } from "util";

const { values } = parseArgs({
  options: {
    "base-url": { type: "string", default: "http://localhost:5173" },
    out: { type: "string", default: "auth.json" },
  },
});

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();

await page.goto(values["base-url"]!);

console.log("請在瀏覽器裡完成登入，登入成功後回到這裡按 Enter 繼續...");

await new Promise<void>(resolve => {
  process.stdin.resume();
  process.stdin.once("data", () => {
    process.stdin.pause();
    resolve();
  });
});

await context.storageState({ path: values.out! });
console.log(`✓ Session 已儲存至 ${values.out}`);

await browser.close();
