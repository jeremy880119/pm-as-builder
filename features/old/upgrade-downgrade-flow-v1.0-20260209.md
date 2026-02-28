# Feature: 升降級 UX 流程

**版本：** v1.0
**更新日期：** 2026-02-09
**狀態：** Draft

---

## 1. 概述

### 1.1 背景與目標

目前 Firstory Studio 的升降級流程存在多個痛點：
- **升級入口分散**：用戶難以快速找到升級路徑
- **降級流程不明確**：用戶需聯繫客服才能降級，造成客服負擔與用戶流失
- **試用機制被濫用**：可重複申請免費試用，影響收益
- **被動降級無 UI 處理**：刷卡失敗後用戶無感知，體驗斷裂

本次改版將：
1. 整合**三大升級入口**（鎖頭、方案選擇頁、帳戶設定頁）
2. 建立**完整的主動降級流程**，包含勸退機制與當下檢核
3. 實施**一生一次試用規則**，防止濫用
4. 設計**被動降級 UI 與恢復路徑**，提升用戶感知與留存

### 1.2 目標用戶

全階段創作者：
- 新手創作者：透過試用快速體驗付費功能
- 成長期創作者：根據預算彈性調整方案
- 專業創作者：透過自助降級管理訂閱生命週期

### 1.3 成功指標

| 指標 | 目標 |
| --- | --- |
| 升級流程完成率 | > 80% |
| 主動降級保留率（降級流程中返回比例） | > 25% |
| 試用轉付費率 | > 15% |
| 被動降級後 7 天內恢復率 | > 30% |

### 1.4 策略對齊

| 檢核項 | 回答 |
| --- | --- |
| **ICP 階段** | 全階段通用，特別服務撞牆期創作者的預算靈活需求 |
| **NSM 貢獻** | 直接提升「每月活躍有感商業化創作者數」（SaaS 付費方 > Tier 2） |
| **Roadmap 對應** | 2026 Q4 SaaS「整合」：升降級 UX 調整 |
| **競品差異** | 提供透明自助降級流程，競品多為客服處理或隱藏降級入口 |

### 1.5 優先級評估 (RICE)

| 維度 | 評分 (1-5) | 說明 |
| --- | --- | --- |
| **Reach** | 5 | 影響所有付費與試用用戶（約 40% MAU） |
| **Impact** | 5 | 直接影響 ARPPU、Conversion Rate、Retention Rate |
| **Confidence** | 4 | 需求明確，客服數據與用戶反饋支持 |
| **Effort** | 4 | 需前後端配合，涉及 Stripe 整合與排程機制 |

---

## 2. 名詞定義

| 名詞 | 英文 | 定義 |
| --- | --- | --- |
| 主動降級 | Voluntary Downgrade | 用戶自行發起的降級行為 |
| 被動降級 | Involuntary Downgrade | 因刷卡失敗導致系統自動降級 |
| 勸退 | Retention Offer | 降級流程中的挽留介面與優惠 |
| 免費試用 | Free Trial | 首次升級可享的免費體驗期，一帳號一生一次 |
| 當下檢核 | Downgrade Check | 降級確認時檢查用戶正在使用的高級功能 |
| Tier | Tier | Free / Lite / Pro / Enterprise |
| 計費週期 | Billing Cycle | 月付（monthly）或年付（yearly） |
| Grace Period | Grace Period | 本系統不設定寬限期，被動降級立即生效 |
| Qualified Creator | Qualified Creator | 具備變現潛力的創作者，達到開啟廣告或訂閱的門檻 |

---

## 3. 驗收標準 (BDD)

**Feature: 升級流程**

As a Free 用戶,
I want to 透過多個入口快速升級至付費方案,
So that 我可以解鎖進階功能提升節目品質.

**Background:**
Given 用戶已登入 Firstory Studio

---

### Scenario 1: 從鎖頭觸發升級（入口一）

Given 用戶方案為 Free
And 頁面顯示紅鎖頭（Pro 功能）
When 用戶點擊紅鎖頭
Then 顯示 Paywall modal（PRD-A Variant C）
When 用戶點擊「升級至 Pro」
Then 導航至結帳頁面 `/account/subscription/checkout?plan=pro`
And 結帳頁預選 Pro 方案

---

### Scenario 2: 從方案選擇頁升級（入口二）

Given 用戶導航至 `/account/subscription/plans`
When 用戶點擊 Pro 欄位的「升級」按鈕
Then 導航至結帳頁面 `/account/subscription/checkout?plan=pro`

---

### Scenario 3: 從帳戶設定頁升級（入口三）

Given 用戶導航至 `/account`
When 用戶點擊「變更方案」按鈕
Then 導航至 `/account/subscription/plans`

---

### Scenario 4: 結帳流程

Given 用戶到達結帳頁面
Then 顯示：
  - 方案名稱、價格
  - 計費週期選擇（月付/年付）
  - 若首次升級，顯示「7 天免費試用」badge + 說明文字
  - 付款方式（信用卡 via Stripe）
  - 「確認訂閱」Primary CTA
When 用戶填寫付款資訊並點擊「確認訂閱」
Then 呼叫 Stripe API 建立 subscription
And 成功後顯示成功頁面（confetti animation + 功能導覽）

---

### Scenario 5: 試用用戶結帳（不再有試用）

Given 用戶曾使用過免費試用（`has_used_trial = true`）
When 到達結帳頁面
Then 不顯示「7 天免費試用」badge
And 確認後立即收費

---

**Feature: 主動降級流程**

As a Pro 用戶,
I want to 自行降級至較低方案,
So that 我可以在預算緊縮時降低支出同時保留基本功能.

---

### Scenario 6: 觸發降級

Given 用戶方案為 Pro
And 用戶導航至 `/account`
When 用戶點擊「變更方案」→ `/account/subscription/plans`
And 用戶點擊 Free 或 Lite 的「降級」按鈕
Then 進入降級流程 Step 1：勸退頁面（PRD-A Variant D）

---

### Scenario 7: 勸退頁面

Given 降級勸退頁面顯示
Then 顯示：
  - 用戶將失去的功能清單
  - 用戶目前使用中的高級功能數量
  - 挽留方案（若適用，如折扣碼）
  - CTA：「維持目前方案」（Primary）+ 「仍要降級」（Ghost）
When 用戶點擊「維持目前方案」
Then 返回 `/account/subscription/plans`，不做任何變更
When 用戶點擊「仍要降級」
Then 進入 Step 2：降級原因選擇

---

### Scenario 8: 降級原因收集

Given 用戶選擇繼續降級
Then 顯示降級原因選項（多選）：
  - 價格太高
  - 功能不符需求
  - 暫時停止使用
  - 轉用其他平台
  - 其他（文字輸入）
And CTA：「繼續」（Secondary）
When 用戶選擇原因並點擊繼續
Then 進入 Step 3：當下檢核

---

### Scenario 9: 當下檢核

Given 用戶確認要降級
Then 系統檢查用戶正在使用的高級功能
And 顯示警告清單：
  - 「你有 12 集使用 AI 逐字稿，降級後此功能將無法使用」
  - 「你有 3 個自訂品牌頁，降級後將隱藏」
And CTA：「確認降級」（Destructive Button）+ 「取消」（Ghost）
When 用戶點擊「確認降級」
Then 呼叫 API 取消/降級 subscription
And 若月付：立即降級，剩餘天數按比例退款（或不退款，依政策）
And 若年付：降級排程在年付到期日生效
And 顯示降級成功頁面，確認生效日期

---

**Feature: 被動降級流程**

As a 系統,
I want to 在刷卡失敗時自動降級用戶,
So that 平台不會持續提供未付費的進階服務.

---

### Scenario 10: 刷卡失敗立即降級

Given 用戶訂閱續費日到期
And Stripe webhook 回報 `invoice.payment_failed`
When 系統收到失敗通知
Then 立即將用戶降級至 Free
And 發送 email 通知用戶：「你的 [方案] 訂閱因付款失敗已降級」
And 用戶下次登入時顯示 banner：「你的訂閱已因付款失敗而降級，點擊重新訂閱」

---

### Scenario 11: 被動降級後恢復

Given 用戶因被動降級而處於 Free
When 用戶點擊 banner 的「重新訂閱」
Then 導航至 `/account/subscription/plans`
And 不享有免費試用（因已使用過）

---

**Feature: 免費試用限制**

---

### Scenario 12: 首次升級享試用

Given 用戶 `has_used_trial = false`
When 用戶首次升級至任一付費方案
Then 享有 7 天免費試用
And 系統將 `has_used_trial` 設為 `true`

---

### Scenario 13: 二次升級無試用

Given 用戶 `has_used_trial = true`（曾試用後降回 Free）
When 用戶再次升級至任一方案
Then 不顯示試用選項，確認後立即收費

---

## 4. i18n 對照表

| Key | zh-TW | en |
| --- | --- | --- |
| `subscription.upgrade.title` | 升級方案 | Upgrade Plan |
| `subscription.upgrade.trial` | 7 天免費試用 | 7-Day Free Trial |
| `subscription.upgrade.trialDescription` | 試用期間可隨時取消，不收費 | Cancel anytime during trial, no charges |
| `subscription.upgrade.checkout` | 確認訂閱 | Confirm Subscription |
| `subscription.upgrade.success` | 歡迎加入 {plan}！ | Welcome to {plan}! |
| `subscription.downgrade.title` | 降級方案 | Downgrade Plan |
| `subscription.downgrade.retain.title` | 確定要降級嗎？ | Are you sure you want to downgrade? |
| `subscription.downgrade.retain.description` | 降級後你將失去以下功能 | You will lose access to these features |
| `subscription.downgrade.retain.stay` | 維持目前方案 | Keep Current Plan |
| `subscription.downgrade.retain.continue` | 仍要降級 | Continue Downgrade |
| `subscription.downgrade.reason.title` | 告訴我們為什麼要降級 | Tell us why you're downgrading |
| `subscription.downgrade.reason.price` | 價格太高 | Too expensive |
| `subscription.downgrade.reason.features` | 功能不符需求 | Features don't meet my needs |
| `subscription.downgrade.reason.pause` | 暫時停止使用 | Taking a break |
| `subscription.downgrade.reason.switch` | 轉用其他平台 | Switching to another platform |
| `subscription.downgrade.reason.other` | 其他 | Other |
| `subscription.downgrade.check.title` | 確認影響範圍 | Confirm Impact |
| `subscription.downgrade.check.warning` | 你有 {count} 項功能正在使用 | You have {count} features in use |
| `subscription.downgrade.check.confirm` | 確認降級 | Confirm Downgrade |
| `subscription.downgrade.success.title` | 降級成功 | Downgrade Successful |
| `subscription.downgrade.success.effectiveDate` | 將於 {date} 生效 | Effective on {date} |
| `subscription.involuntary.banner` | 你的 {plan} 訂閱因付款失敗已降級。 | Your {plan} subscription was downgraded due to payment failure. |
| `subscription.involuntary.resubscribe` | 重新訂閱 | Resubscribe |
| `subscription.tier.free` | Free | Free |
| `subscription.tier.lite` | Lite | Lite |
| `subscription.tier.pro` | Pro | Pro |
| `subscription.tier.enterprise` | Enterprise | Enterprise |
| `subscription.cycle.monthly` | 月付 | Monthly |
| `subscription.cycle.yearly` | 年付 | Yearly |

---

## 5. 依賴關係

| 依賴類型 | 說明 |
| --- | --- |
| **API** | `GET /users/{userId}/subscription`（需新增 `has_used_trial` 欄位） |
| **API** | `POST /subscriptions/checkout`（建立 Stripe subscription） |
| **API** | `POST /subscriptions/downgrade`（處理主動降級邏輯） |
| **API** | `POST /subscriptions/cancel`（取消訂閱） |
| **API** | `GET /subscriptions/usage-check`（檢查用戶使用的高級功能） |
| **Webhook** | Stripe `invoice.payment_failed`（被動降級觸發） |
| **Webhook** | Stripe `customer.subscription.updated`（訂閱狀態同步） |
| **前端** | shadcn/ui Button、Card、Alert、Modal、Badge 組件 |
| **前端** | Confetti 動畫庫（成功頁面） |
| **Email** | 被動降級通知、試用到期提醒 |
| **排程** | 試用到期自動轉付費（Stripe 自動處理） |
| **排程** | 年付降級排程（到期日生效） |
| **PRD-A** | 使用 PRD-A 定義的 Paywall（Variant C）與勸退介面（Variant D） |

---

## 6. 開放問題

- [ ] 月付降級是否退款？若退款，如何計算比例？
- [ ] 被動降級 banner 顯示多久？需要 dismiss 功能嗎？
- [ ] 勸退頁面的折扣碼邏輯由誰決定（PM/業務）？
- [ ] 降級原因數據如何儲存與分析（Analytics DB/Mixpanel）？
- [ ] Enterprise 用戶是否完全禁止自助降級？
- [ ] Legacy 方案用戶的升降級邏輯是否需要特殊處理？
- [ ] 是否需要 A/B Test 不同勸退文案？

---

## 7. Wireflow 連結

| 類型 | 路徑 |
| --- | --- |
| 靜態版 | `wireflow/upgrade-downgrade-flow-v1.0-20260209.html` |
| 互動版 | `wireflow/upgrade-downgrade-flow-v1.0-20260209-interactive.html` |

---

## 8. Tier 結構與定價

```
Free → Lite → Pro → Enterprise
                         ↑
                    Legacy (維持現狀，不出現在新流程)
```

| Tier | 價格（月付） | 價格（年付） | 免費試用 |
| --- | --- | --- | --- |
| Free | NT$0 | - | - |
| Lite | NT$149/月 | NT$1,490/年 | 7 天 |
| Pro | NT$299/月 | NT$2,990/年 | 7 天 |
| Enterprise | 客製報價 | 客製報價 | 洽談 |

**試用規則：** 每個帳號一生只有一次免費試用機會，適用於首次從 Free 升級至任一付費方案。若曾試用 Lite 後降回 Free，再升級 Pro 時不再享有試用。

---

## 9. User Flow 摘要

```
升級流程（3 入口）:
鎖頭 ──→ Paywall (C) ──→ Checkout ──→ Success
設定頁 ──→ Plans (B) ──→ Checkout ──→ Success
帳戶頁 (A) ──→ Plans (B) ──→ Checkout ──→ Success

主動降級:
Plans (B) ──→ 勸退 (D) ──→ 原因收集 ──→ 當下檢核 ──→ 確認降級

被動降級:
Stripe webhook ──→ 立即降級 ──→ Email + Banner 通知
```

---

## 10. 頁面規格

### 10.1 結帳頁 (`/account/subscription/checkout`)

**佈局：**
- 左側：方案摘要卡片
  - 方案名稱（text-2xl, font-semibold）
  - 價格（text-4xl, font-bold）
  - 計費週期切換（RadioGroup: 月付/年付）
  - 試用 badge（bg: info, text: info-foreground, border-radius: sm）
  - 說明文字（text-sm, muted-foreground）
- 右側：Stripe Elements 信用卡表單
  - 卡號、到期日、CVC 輸入框（使用 Stripe 內建樣式）
- 底部：「確認訂閱」Primary CTA（size: lg, full-width）
- 安全標示：「由 Stripe 安全處理」+ Lock icon（Lucide: Lock）

**狀態：**
- Loading：按鈕顯示 spinner + 「處理中...」
- Error：顯示 Alert（variant: error）+ 錯誤訊息

---

### 10.2 成功頁面

**元素：**
- Confetti animation（輕量，持續 3 秒）
- 大標題：「歡迎加入 {plan}！」（text-3xl, font-bold）
- 說明：「你現在可以使用以下功能」（text-base, muted-foreground）
- 3-4 個推薦功能卡片：
  - Icon + 標題 + 簡短說明
  - 使用 Card 組件（variant: elevated）
- CTA：「開始使用」Primary Button → 返回 Dashboard

---

### 10.3 降級勸退頁面（PRD-A Variant D）

**元素：**
- 標題：「確定要降級嗎？」（text-2xl, font-semibold）
- 副標題：「降級後你將失去以下功能」（text-base, muted-foreground）
- 功能清單：
  - 使用 Alert（variant: warning）
  - 每項帶 AlertTriangle icon（Lucide）
  - 顯示用戶目前使用數量（如「12 集 AI 逐字稿」）
- 挽留方案（若適用）：
  - 折扣 badge（bg: primary-muted, text: primary）
  - 說明文字 + CTA
- CTA pair：
  - 「維持目前方案」Primary Button
  - 「仍要降級」Ghost Button

---

### 10.4 降級原因頁

**元素：**
- 標題：「告訴我們為什麼要降級」（text-xl, font-semibold）
- 說明：「你的反饋將協助我們改進服務」（text-sm, muted-foreground）
- 問卷式 UI：
  - 多選 Checkbox（使用 shadcn/ui Checkbox）
  - 選項：價格太高、功能不符需求、暫時停止使用、轉用其他平台
  - 「其他」選項帶文字輸入框（Textarea）
- CTA：「繼續」Secondary Button

---

### 10.5 當下檢核頁

**元素：**
- 標題：「確認影響範圍」（text-xl, font-semibold）
- 警告 Alert（variant: warning）：
  - 內容：「降級後以下功能將無法使用」
  - 影響清單：每項帶 AlertTriangle icon
  - 範例：「你有 12 集使用 AI 逐字稿，降級後此功能將無法使用」
- 生效日期說明：
  - 月付：「立即生效」
  - 年付：「將於 {date} 生效，期間可繼續使用目前功能」
- CTA pair：
  - 「確認降級」Destructive Button
  - 「取消」Ghost Button

---

### 10.6 被動降級 Banner

**規格：**
- 類型：頂部 banner（bg: error, text: error-foreground）
- 文案：「你的 {plan} 訂閱因付款失敗已降級。」+ CTA link「重新訂閱」
- Icon：AlertCircle（Lucide）
- 可關閉：dismiss 按鈕（X icon）
- 行為：關閉後下次登入仍顯示，直到用戶恢復訂閱

---

## 11. 邊界條件

| # | 情境 | 處理方式 |
|---|------|---------|
| 1 | 年付中途升級 | 按比例計算差額，立即升級 |
| 2 | 年付中途降級 | 排程於到期日生效，期間維持原方案 |
| 3 | 月付降級 | 立即生效，當月不退款（或按比例退，依政策） |
| 4 | 結帳中途關閉 | 不建立 subscription，回到原狀態 |
| 5 | Stripe API 失敗 | 顯示 error toast，允許重試 |
| 6 | Legacy 用戶升級 | 可正常升級至新方案，升級後 Legacy 方案不可回退 |
| 7 | Legacy 用戶降級 | 降級至新方案（Free/Lite），不可回到 Legacy |
| 8 | Enterprise 用戶降級 | 需聯繫客服，自助降級不適用 |
| 9 | 同時觸發多次升級 | 防抖處理，CTA 點擊後 disable 直到 API 回應 |
| 10 | 試用期內降級 | 立即取消試用，不收費 |
| 11 | 重複點擊確認按鈕 | 按鈕進入 loading 狀態，禁止重複提交 |
| 12 | Stripe webhook 延遲 | 前端輪詢訂閱狀態，最多 60 秒 |

---

## 12. 技術考量

### 12.1 前端實作

- **路由結構：**
  - `/account/subscription/plans` - 方案選擇頁
  - `/account/subscription/checkout?plan={tier}` - 結帳頁
  - `/account/subscription/success` - 成功頁面
  - `/account/subscription/downgrade?from={tier}&to={tier}` - 降級流程

- **狀態管理：**
  - 使用 React Context 或 Zustand 管理訂閱狀態
  - `has_used_trial` flag 儲存在 user profile

- **防抖處理：**
  - CTA 點擊後立即 disable
  - 顯示 loading spinner
  - API 回應後才恢復可點擊狀態

---

### 12.2 Stripe 整合

- **Checkout 方式：**
  - 使用 Stripe Elements 自建結帳頁（而非 Stripe Checkout）
  - 更高自訂性與品牌一致性

- **Webhook 處理：**
  - `invoice.payment_failed` → 觸發被動降級
  - `customer.subscription.updated` → 同步訂閱狀態
  - `customer.subscription.deleted` → 處理取消訂閱

- **訂閱生命週期：**
  - 試用期：使用 Stripe trial period 機制
  - 年付降級：使用 `cancel_at_period_end` flag

---

### 12.3 資料庫設計

**新增欄位：**
- `users.has_used_trial` (boolean) - 是否已使用過試用
- `subscriptions.downgrade_scheduled_at` (timestamp) - 降級排程日期
- `downgrade_reasons` 表（用於分析）：
  - `user_id`, `from_tier`, `to_tier`, `reasons` (JSON), `created_at`

---

### 12.4 Rate Limiting

- 防止頻繁升降級操作：
  - 每個用戶每 24 小時內最多 3 次升降級操作
  - 超過限制顯示錯誤：「操作過於頻繁，請稍後再試」

---

## 13. 與其他系統的關係

| 系統 | 關係 |
| --- | --- |
| **PRD-A（UI 元件系統）** | 使用 Paywall（Variant C）與勸退介面（Variant D） |
| **Q2 Team Management** | seat-based pricing 未來需擴充升降級流程 |
| **Stripe** | 核心付款與訂閱管理 |
| **Email Service** | 被動降級通知、試用到期提醒（SendGrid/Resend） |
| **Analytics** | 降級原因追蹤、Paywall 觸發來源分析（Mixpanel） |
| **廣告系統** | 降級至 Free 後檢查廣告設定是否需調整 |
| **會員訂閱系統** | 降級後檢查會員功能權限 |

---

## 變更紀錄

| 版本 | 日期 | 變更內容 | 作者 |
| --- | --- | --- | --- |
| v1.0 | 2026-02-09 | 初版，參照 MASTER.md 設計系統規範與 PRD-A 組件 | Claude |
