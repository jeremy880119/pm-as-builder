/**
 * 自動儲存登入 session：開啟有頭瀏覽器，等待登入並選好節目後自動儲存（無需按 Enter）
 */
import { chromium } from "playwright";
import { parseArgs } from "util";

const { values } = parseArgs({
  options: {
    "base-url": { type: "string", default: "http://localhost:5173" },
    out: { type: "string", default: "auth.json" },
  },
});

async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  await page.goto(values["base-url"]!);
  console.log("請在瀏覽器裡登入並點選節目（進到 Dashboard 後自動儲存）...");

  const timeout = 180_000;
  const start = Date.now();
  const isDone = (url: string) => {
    try {
      const p = new URL(url).pathname;
      return !p.startsWith("/login") && !p.startsWith("/auth") && p !== "/shows" && p !== "/shows/";
    } catch {
      return false;
    }
  };

  while (!isDone(page.url())) {
    if (Date.now() - start > timeout) {
      console.error("✗ 逾時（180s），結束");
      await browser.close();
      process.exit(1);
    }
    await page.waitForTimeout(1000);
  }

  // 等待 URL 穩定 5 秒（確保已完全進入節目頁面）
  console.log("偵測到已進入節目，等待頁面穩定...");
  let stableCount = 0;
  let lastUrl = page.url();
  while (stableCount < 5) {
    await page.waitForTimeout(1000);
    const current = page.url();
    if (current === lastUrl && isDone(current)) {
      stableCount++;
    } else {
      stableCount = 0;
      lastUrl = current;
    }
  }
  await context.storageState({ path: values.out! });
  console.log(`✓ Session 已儲存至 ${values.out}`);
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
