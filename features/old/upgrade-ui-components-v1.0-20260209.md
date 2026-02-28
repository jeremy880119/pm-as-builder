# Feature: 升降級 UI 元件系統

**版本：** v1.0
**更新日期：** 2026-02-09
**狀態：** Draft

---

## 1. 概述

### 1.1 背景與目標

目前 Firstory Studio 缺乏統一的**付費狀態視覺語言**和標準化的價目表元件。不同頁面對付費功能的呈現方式不一致，造成：
- 用戶對哪些功能需要升級感到困惑
- 升級轉化率低，無法有效引導用戶理解方案價值
- 免費試用機制被濫用，缺乏明確的商業化引導
- 降級流程不清楚，導致客服工單增加

本次改版將：
1. 建立**統一的付費狀態指示元件**（紅鎖頭 / 黃星星）
2. 設計**四種價目表變體**，適用於不同場景（帳戶總覽、方案選擇、Paywall、降級勸退）
3. 提供**清晰的視覺層級**，區分已解鎖與未解鎖功能
4. 整合**升降級流程 UX**（詳見 PRD-B），提供完整的商業化體驗

### 1.2 目標用戶

全階段創作者：
- **Free 用戶**：需清楚了解升級後可獲得哪些功能
- **Lite/Pro 用戶**：需明確知道自己的方案權益範圍
- **潛在降級用戶**：需了解降級後將失去哪些功能
- **試用期用戶**：需看到明確的試用剩餘天數與升級引導

### 1.3 成功指標

| 指標 | 目標 |
| --- | --- |
| 升級轉化率 | 提升 20% |
| 升級相關客服工單 | 下降 30% |
| Paywall 觸發後升級轉化率 | > 5% |
| 方案選擇頁停留時間 | 增加 30%（更多比較與理解） |

### 1.4 策略對齊

| 檢核項 | 回答 |
| --- | --- |
| **ICP 階段** | 全階段創作者，尤其是撞牆期專業創作者（需要進階功能突破瓶頸） |
| **NSM 貢獻** | 提升 SaaS 轉化率（Efficiency），增加付費訂閱用戶（ARPPU） |
| **Roadmap 對應** | Q4 2026: 升降級 UX 調整 |
| **競品差異** | 提供更清晰的功能分級視覺語言，降低決策成本 |

### 1.5 優先級評估 (RICE)

| 維度 | 評分 (1-5) | 說明 |
| --- | --- | --- |
| **Reach** | 5 | 所有用戶（100% MAU）都會看到付費功能指示 |
| **Impact** | 4 | 直接影響 SaaS 轉化率與升級決策效率 |
| **Confidence** | 4 | 需求明確，設計系統已完備 |
| **Effort** | 3 | 需前後端配合，中等工作量 |

---

## 2. 名詞定義

| 名詞 | 英文 | 定義 |
| --- | --- | --- |
| 付費狀態指示 | Paid Feature Indicator | 標示功能付費等級的視覺元件（紅鎖頭 / 黃星星） |
| 紅鎖頭 | Red Lock | 未解鎖的付費功能圖示，點擊觸發 Paywall（Lucide: Lock） |
| 黃星星 | Gold Star | 已解鎖的付費專屬功能圖示，標示當前方案已包含（Lucide: Star） |
| 價目表 | Pricing Table | 展示方案比較與價格資訊的元件 |
| Paywall | Paywall | 輕量級升級提示 Modal，由紅鎖頭觸發 |
| 方案卡片 | Plan Card | 單一訂閱方案的視覺呈現元件 |
| 功能比較行 | Feature Row | 跨方案功能比較的單行元件 |
| Tier | Tier | 訂閱方案等級：Free / Lite / Pro / Enterprise |
| Legacy Plan | Legacy Plan | 舊版方案，維持現狀不動，不出現在新價目表 |

---

## 3. 驗收標準 (BDD)

**Feature: 付費狀態指示元件**

As a 創作者,
I want to 清楚辨識哪些功能需要升級才能使用,
So that 我可以快速理解我的方案權益並決定是否升級.

**Background:**
Given 用戶已登入 Firstory Studio
And 用戶的當前方案為 Free / Lite / Pro / Enterprise 之一

---

### Scenario 1: Free 用戶看到紅鎖頭

Given 用戶方案為 Free
When 頁面載入包含 Pro 專屬功能的區域
Then 該功能旁應顯示紅色鎖頭圖示（Lucide: Lock, 16px, color: var(--error-foreground)）
And 鎖頭應有 tooltip 顯示「升級至 [所需方案] 解鎖此功能」
And 點擊鎖頭應觸發 Paywall（變體 C）

---

### Scenario 2: Pro 用戶看到黃星星

Given 用戶方案為 Pro
When 頁面載入包含 Pro 專屬功能的區域
Then 該功能旁應顯示金色星星圖示（Lucide: Star, 16px, color: var(--warning-foreground)）
And 星星應有 tooltip 顯示「Pro 專屬功能」
And 點擊星星不應觸發任何操作（僅為視覺標示）

---

### Scenario 3: 功能在用戶方案等級以下不顯示指示

Given 用戶方案為 Pro
When 頁面載入包含 Free 或 Lite 等級的功能
Then 不應顯示任何付費狀態指示圖示（這些功能已包含在 Pro 中）

---

### Scenario 4: 帳戶頁顯示當前方案概覽（變體 A）

Given 用戶導航至 `/account`
When 頁面載入「訂閱方案」區塊
Then 應顯示當前方案卡片（highlight 狀態）
And 卡片包含：
  - 方案名稱（如「Pro」）
  - 月 / 年費（如「NT$299/月」）
  - 到期日（如「下次扣款：2026-03-15」）
  - Status badge（如「試用中」或「已啟用」）
And 卡片下方顯示「變更方案」CTA 按鈕（連結至 `/account/subscription/plans`）
And 若有試用中應顯示試用剩餘天數（如「試用剩餘 7 天」）

---

### Scenario 5: 完整方案比較表（變體 B）

Given 用戶導航至 `/account/subscription/plans`
When 頁面載入
Then 應顯示 3-4 欄方案比較表（Free / Lite / Pro / Enterprise）
And 每欄包含：
  - 方案名稱
  - 價格（月付 / 年付切換）
  - 功能列表（✓ / ✗ 標記）
  - CTA 按鈕
And 當前方案欄位應標註「目前方案」badge
And 比當前方案高的欄位 CTA 為「升級至 [方案名]」（Primary Button）
And 比當前方案低的欄位 CTA 為「降級」（Ghost Button）
And Enterprise 欄位 CTA 為「聯絡我們」（Secondary Button）

---

### Scenario 6: 年付 / 月付切換

Given 用戶在方案選擇頁（`/account/subscription/plans`）
When 點擊年付 / 月付切換開關
Then 價格應即時更新
And 年付應顯示「省 17%」badge（或實際折扣比例）
And 月付價格顯示「NT$299/月」
And 年付價格顯示「NT$2,990/年 (省 17%)」

---

### Scenario 7: Paywall 由鎖頭觸發（變體 C）

Given 用戶點擊紅鎖頭或嘗試使用鎖定功能
When Paywall modal 顯示
Then 應顯示：
  - 被鎖定的功能名稱（如「AI 逐字稿」）
  - 解鎖此功能所需的最低方案（如「升級至 Lite 即可使用」）
  - 該方案的價格（如「NT$99/月」）
  - 該方案的核心功能列表
And CTA:
  - 主要：「升級至 [方案名]」（Primary Button）
  - 次要：「查看所有方案」（Ghost link to `/account/subscription/plans`）
And Modal 可關閉（X 按鈕或按 ESC 鍵）

---

### Scenario 8: 降級勸退介面（變體 D）

Given 用戶在降級流程中（詳見 PRD-B）
When 降級勸退介面顯示
Then 應列出：
  - 將失去的功能清單（帶紅色 X 標記，使用 var(--error-foreground)）
  - 「你目前使用中」的高級功能數量統計（如「你正在使用 3 項 Pro 專屬功能」）
  - 挽留方案（如降價、延長試用等，若適用）
And CTA:
  - 主要：「維持目前方案」（Primary Button）
  - 次要：「仍要降級」（Ghost Button + Destructive text color）

---

### Scenario 9: 試用期用戶的方案卡片

Given 用戶處於 Pro 方案試用期（剩餘 5 天）
When 頁面載入方案卡片
Then 方案卡片應顯示：
  - Badge:「試用中」（bg: var(--info), text: var(--info-foreground)）
  - 試用剩餘天數：「試用剩餘 5 天」
  - 試用結束日期：「試用至 2026-02-14」
  - CTA:「訂閱 Pro 方案」（Primary Button）

---

### Scenario 10: Legacy 方案用戶

Given 用戶使用舊版方案（不再提供的方案）
When 用戶導航至 `/account`
Then 方案卡片應顯示：
  - Badge:「舊版方案」（bg: var(--muted), text: var(--muted-foreground)）
  - 說明文字：「此方案不再提供給新用戶，但你可繼續使用」
  - CTA:「查看新方案」（Secondary Button, 連結至 `/account/subscription/plans`）
And 在方案選擇頁（`/account/subscription/plans`）不應顯示 Legacy 方案

---

### Scenario 11: API 失敗處理

Given 用戶正在載入方案資訊
When API 請求失敗
Then 應在頁面頂部顯示 Alert（error 樣式）：
  - 內容：「無法載入方案資訊，請稍後再試。如問題持續，請聯繫客服。」
And 價格顯示為「—」或「載入失敗」
And CTA 按鈕應進入 disabled 狀態

---

### Scenario 12: 無網路狀態

Given 用戶網路連線中斷
When Paywall 或價目表需要顯示
Then Paywall 降級為靜態文案：
  - 顯示固定價格（如「NT$299/月起」）
  - 隱藏動態折扣資訊
  - CTA 仍可點擊，導向方案頁面

---

## 4. 元件設計規格

### 4.1 付費狀態指示元件

#### 紅鎖頭（未解鎖）

```
┌────────────────────────────────┐
│  進階數據分析  🔒              │  ← Lucide: Lock, 16px
│                                │     color: var(--error-foreground)
│  [hover tooltip]               │     gap: 4px
│  "升級至 Pro 解鎖此功能"        │
└────────────────────────────────┘

互動:
- Hover: 顯示 tooltip
- Click: 觸發 Paywall modal (變體 C)
- Cursor: pointer
```

#### 黃星星（已解鎖）

```
┌────────────────────────────────┐
│  進階數據分析  ⭐              │  ← Lucide: Star (filled), 16px
│                                │     color: var(--warning-foreground)
│  [hover tooltip]               │     gap: 4px
│  "Pro 專屬功能"                │
└────────────────────────────────┘

互動:
- Hover: 顯示 tooltip
- Click: 無操作（僅為標示）
- Cursor: default
```

#### 技術規格

```tsx
// 偽代碼範例
<FeatureGate requiredTier="pro" currentTier="free">
  <Lock size={16} className="text-error-foreground" />
</FeatureGate>

<FeatureGate requiredTier="pro" currentTier="pro">
  <Star size={16} className="text-warning-foreground fill-current" />
</FeatureGate>
```

---

### 4.2 方案卡片 (Plan Card)

```
┌─────────────────────────────────────┐
│  [Badge: 目前方案] (僅當前方案顯示)  │  ← bg: var(--primary-muted)
│                                     │     text: var(--primary)
│  Pro                                │  ← text-xl, semibold
│  NT$299/月                          │  ← text-3xl, bold
│  NT$2,990/年 (省17%)                │  ← text-sm, color: var(--muted-foreground)
│                                     │
│  ✓ 無限集數                          │  ← Lucide: Check
│  ✓ 進階數據分析                      │     color: var(--success-foreground)
│  ✓ AI 逐字稿                        │     font-size: 14px
│  ✓ 自訂品牌頁                        │     line-height: 24px
│                                     │
│  ┌─────────────────────────────┐    │
│  │    升級至 Pro               │    │  ← Primary Button
│  └─────────────────────────────┘    │     height: 40px
└─────────────────────────────────────┘

Card specs:
- bg: var(--card)
- border: 1px solid var(--border)
- border-radius: var(--radius-md) = 8px
- padding: 24px
- shadow: var(--shadow-sm)

當前方案樣式:
- border-color: var(--primary)
- border-width: 2px

推薦方案樣式:
- 額外顯示 "最受歡迎" ribbon (bg: var(--warning), position: absolute, top-right)
```

---

### 4.3 功能比較表 (Pricing Table)

```
┌──────────────────┬──────┬──────┬──────┬──────┐
│  功能名稱        │ Free │ Lite │ Pro  │ Ent  │  ← 表頭
├──────────────────┼──────┼──────┼──────┼──────┤     bg: var(--secondary)
│  集數上限        │  5   │  50  │  ∞   │  ∞   │     height: 48px
│  數據分析        │  基礎 │ 進階 │ 完整 │ 完整 │     text: var(--muted-foreground)
│  AI 逐字稿       │  ✗   │  ✓   │  ✓   │  ✓   │     font-size: 12px
│  自訂品牌頁      │  ✗   │  ✗   │  ✓   │  ✓   │     font-weight: 500
└──────────────────┴──────┴──────┴──────┴──────┘

表格行規格:
- height: 48px
- border-bottom: 1px solid var(--border)
- 交替底色: odd=transparent, even=var(--secondary)

圖示:
- ✓ (Lucide: Check): color: var(--success-foreground)
- ✗ (Lucide: X): color: var(--muted-foreground)
- 數值型 (5, 50, ∞): text-sm, font-medium
```

---

### 4.4 CTA 按鈕樣式

| 場景 | 樣式 | 規格 |
| --- | --- | --- |
| 升級 | Primary Button | bg: var(--primary), text: var(--primary-foreground) |
| 降級 | Ghost Button | bg: transparent, text: var(--muted-foreground) |
| 聯絡我們 | Secondary Button | border: 1px solid var(--primary), text: var(--primary) |
| 目前方案 | Disabled Button | bg: var(--muted), text: var(--muted-foreground), cursor: not-allowed |
| 仍要降級 | Ghost + Destructive | text: var(--error-foreground) |

```tsx
// 範例
<Button variant="primary">升級至 Pro</Button>
<Button variant="ghost">降級</Button>
<Button variant="secondary">聯絡我們</Button>
<Button variant="ghost" disabled>目前方案</Button>
<Button variant="ghost" className="text-error-foreground">仍要降級</Button>
```

---

### 4.5 Badge 元件

| Badge 類型 | 背景 | 文字 | 圓角 | 用途 |
| --- | --- | --- | --- | --- |
| 目前方案 | var(--primary-muted) | var(--primary) | var(--radius-sm) | 方案卡片 |
| 最受歡迎 | var(--warning) | var(--warning-foreground) | var(--radius-sm) | 推薦方案 |
| 省 XX% | var(--success) | var(--success-foreground) | var(--radius-sm) | 年付折扣 |
| 試用中 | var(--info) | var(--info-foreground) | var(--radius-sm) | 試用狀態 |
| 舊版方案 | var(--muted) | var(--muted-foreground) | var(--radius-sm) | Legacy 方案 |

```
規格:
- height: 24px
- padding: 0 8px
- font-size: 12px
- font-weight: 500
```

---

### 4.6 月付 / 年付切換開關

```
┌─────────────────────────────┐
│  ○ 月付      ● 年付 (省17%) │  ← Toggle Switch
└─────────────────────────────┘

規格:
- 使用 shadcn/ui Switch 組件
- ON state: bg: var(--primary)
- OFF state: bg: var(--muted)
- 切換時: transition 200ms ease
```

---

## 5. 頁面規格

### 5.1 變體 A: `/account` 訂閱區塊

```
┌─────────────────────────────────────────────────────────┐
│  訂閱方案                                                │  ← Section 標題
│  ─────────────────────────────────────────────────────  │     text-xl, semibold
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  [Badge: 試用中]                                  │  │
│  │                                                   │  │
│  │  Pro                                              │  │  ← 方案卡片
│  │  NT$299/月                                        │  │
│  │                                                   │  │
│  │  試用剩餘 7 天                                     │  │
│  │  下次扣款：2026-02-16                             │  │
│  │                                                   │  │
│  │  ┌─────────────────┐                             │  │
│  │  │  變更方案       │                             │  │  ← Secondary Button
│  │  └─────────────────┘                             │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  計費週期: 每月                                         │  ← text-sm, muted
│  到期日: 2026-03-15                                     │
│  付款方式: •••• 1234 (Visa)                             │
└─────────────────────────────────────────────────────────┘

規格:
- Section padding: 32px
- 卡片寬度: max-width: 400px
- 卡片與說明文字間距: 16px
```

---

### 5.2 變體 B: `/account/subscription/plans`

```
┌─────────────────────────────────────────────────────────────────┐
│  選擇適合你的方案                                                │  ← 頁面標題
│  ──────────────────────────────                                 │
│                                                                 │
│  ○ 月付      ● 年付 (省17%)                                      │  ← Toggle
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐            │
│  │ Free    │  │ Lite    │  │ Pro     │  │ Enterpr │            │
│  │         │  │         │  │ [最受歡迎]│  │ -ise    │            │
│  │ NT$0    │  │ NT$99   │  │ NT$299  │  │ 洽詢    │            │
│  │         │  │         │  │         │  │         │            │
│  │ ✓ 5集   │  │ ✓ 50集  │  │ ✓ 無限  │  │ ✓ 無限  │            │
│  │ ✓ 基礎  │  │ ✓ 進階  │  │ ✓ 完整  │  │ ✓ 完整  │            │
│  │ ✗ AI    │  │ ✓ AI    │  │ ✓ AI    │  │ ✓ AI    │            │
│  │         │  │         │  │         │  │         │            │
│  │ ┌─────┐ │  │ ┌─────┐ │  │ [目前   │  │ ┌─────┐ │            │
│  │ │免費  │ │  │ │升級 │ │  │ 方案]   │  │ │聯絡 │ │            │
│  │ └─────┘ │  │ └─────┘ │  │         │  │ └─────┘ │            │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘            │
│                                                                 │
│  ── 功能詳細比較 ──────────────────────────────────────────────  │
│                                                                 │
│  [展開功能比較表]                                                │
│                                                                 │
│  ── 常見問題 ──────────────────────────────────────────────────  │
│                                                                 │
│  [FAQ Accordion]                                                │
└─────────────────────────────────────────────────────────────────┘

規格:
- 頁面寬度: max-width: 1200px, 居中
- 方案卡片: grid 4 欄（桌面）、2 欄（平板）、1 欄（手機）
- 卡片間距: gap: 16px
- 功能比較表: 可展開/收合，預設收合
```

---

### 5.3 變體 C: Paywall Modal

```
┌─────────────────────────────────────────────────────────┐
│                                                    [×]  │  ← 關閉按鈕
├─────────────────────────────────────────────────────────┤
│                                                         │
│                  🔒                                     │  ← Lucide: Lock, 48px
│                                                         │     color: var(--muted-foreground)
│           解鎖 AI 逐字稿功能                             │  ← text-xl, semibold
│                                                         │
│  升級至 Lite 方案即可使用此功能                          │  ← text-sm, muted
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Lite                                             │  │
│  │  NT$99/月                                         │  │  ← 最低解鎖方案卡片
│  │                                                   │  │
│  │  ✓ AI 逐字稿                                      │  │
│  │  ✓ 50 集上限                                      │  │
│  │  ✓ 進階數據分析                                   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─────────────────────────────────┐                   │
│  │     升級至 Lite                 │                   │  ← Primary Button
│  └─────────────────────────────────┘                   │
│                                                         │
│  查看所有方案 →                                         │  ← Ghost link
│                                                         │
└─────────────────────────────────────────────────────────┘

規格:
- Modal size: 480px (sm)
- Padding: 32px
- bg: var(--popover)
- border-radius: var(--radius-xl) = 16px
- shadow: var(--shadow-xl)
- 背景遮罩: var(--overlay)
```

---

### 5.4 變體 D: 降級勸退

```
┌─────────────────────────────────────────────────────────┐
│  確定要降級嗎？                                          │  ← text-xl, semibold
│  ─────────────────────────────────                      │
│                                                         │
│  你正在使用 3 項 Pro 專屬功能                            │  ← Alert (warning)
│                                                         │
│  降級後你將失去以下功能：                                │  ← text-base, foreground
│                                                         │
│  ✗ 進階數據分析                                         │  ← Lucide: X
│  ✗ AI 逐字稿                                           │     color: var(--error-foreground)
│  ✗ 自訂品牌頁                                           │     font-size: 14px
│  ✗ 無限集數（降為 50 集上限）                            │
│                                                         │
│  [挽留方案區塊]（若適用）                                │
│  ┌─────────────────────────────────────────────────┐    │
│  │  特別優惠：續訂 Pro 方案享 8 折優惠                │    │  ← bg: var(--primary-muted)
│  │  僅剩 24 小時                                     │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────┐    ┌─────────────────┐    │
│  │  維持目前方案           │    │  仍要降級       │    │  ← CTA pair
│  └─────────────────────────┘    └─────────────────┘    │
│       Primary                       Ghost + Destructive │
└─────────────────────────────────────────────────────────┘

規格:
- 嵌入降級流程頁面中（詳見 PRD-B）
- 左右雙欄佈局（桌面）、單欄（手機）
- 將失去的功能列表: line-height: 28px, gap: 8px
```

---

## 6. 邊界條件 (Edge Cases)

| # | 情境 | 處理方式 |
| --- | --- | --- |
| 1 | Legacy 方案用戶 | 不顯示在新價目表中，方案卡片顯示「舊版方案」badge，引導至客服或查看新方案 |
| 2 | 試用期用戶 | 方案卡片顯示試用剩餘天數，Paywall 文案調整為「試用結束後升級」|
| 3 | 年付到期前降級 | 顯示生效日期為年付到期後（如「變更將於 2026-12-31 生效」） |
| 4 | 無網路 | Paywall 降級為靜態文案，不顯示即時價格，僅顯示「NT$299/月起」 |
| 5 | Enterprise 用戶 | 隱藏所有付費指示（紅鎖 / 黃星），所有功能已解鎖，價目表不顯示「升級」按鈕 |
| 6 | 多方案切換中 | 方案卡片顯示「變更中」狀態，並顯示生效日期 |
| 7 | 扣款失敗 | 方案卡片顯示「扣款失敗」badge（bg: var(--error)），CTA 為「更新付款方式」 |
| 8 | 折扣碼生效中 | 價格顯示劃線價 + 折扣價（如「~~NT$299~~ NT$239/月」） |
| 9 | 方案資料載入失敗 | 顯示錯誤 Alert，價格顯示為「—」，CTA 進入 disabled 狀態 |
| 10 | 用戶使用超過降級方案上限 | 降級勸退中額外提示「你目前有 120 集，降級後僅能保留 50 集」 |

---

## 7. i18n 對照表

| Key | zh-TW | en |
| --- | --- | --- |
| `pricing.planCard.current` | 目前方案 | Current Plan |
| `pricing.planCard.popular` | 最受歡迎 | Most Popular |
| `pricing.planCard.saveBadge` | 省 {{percent}}% | Save {{percent}}% |
| `pricing.planCard.trial` | 試用中 | Trial |
| `pricing.planCard.legacy` | 舊版方案 | Legacy Plan |
| `pricing.planCard.perMonth` | /月 | /month |
| `pricing.planCard.perYear` | /年 | /year |
| `pricing.planCard.trialRemaining` | 試用剩餘 {{days}} 天 | {{days}} days left in trial |
| `pricing.planCard.nextBilling` | 下次扣款：{{date}} | Next billing: {{date}} |
| `pricing.toggle.monthly` | 月付 | Monthly |
| `pricing.toggle.yearly` | 年付 | Yearly |
| `pricing.cta.upgrade` | 升級至 {{plan}} | Upgrade to {{plan}} |
| `pricing.cta.downgrade` | 降級 | Downgrade |
| `pricing.cta.contact` | 聯絡我們 | Contact Us |
| `pricing.cta.changePlan` | 變更方案 | Change Plan |
| `pricing.cta.keepCurrent` | 維持目前方案 | Keep Current Plan |
| `pricing.cta.confirmDowngrade` | 仍要降級 | Confirm Downgrade |
| `pricing.feature.locked` | 升級至 {{plan}} 解鎖此功能 | Upgrade to {{plan}} to unlock |
| `pricing.feature.unlocked` | {{plan}} 專屬功能 | {{plan}} exclusive |
| `paywall.title` | 解鎖 {{feature}} 功能 | Unlock {{feature}} |
| `paywall.description` | 升級至 {{plan}} 方案即可使用此功能 | Upgrade to {{plan}} to access this feature |
| `paywall.viewAllPlans` | 查看所有方案 | View all plans |
| `downgrade.title` | 確定要降級嗎？ | Confirm downgrade? |
| `downgrade.warning` | 你正在使用 {{count}} 項 {{plan}} 專屬功能 | You are currently using {{count}} {{plan}} features |
| `downgrade.willLose` | 降級後你將失去以下功能： | You will lose access to: |
| `pricing.error.loadFailed` | 無法載入方案資訊，請稍後再試 | Failed to load pricing. Please try again later. |
| `pricing.faq.title` | 常見問題 | FAQ |

---

## 8. 依賴關係

| 依賴類型 | 說明 |
| --- | --- |
| **API** | `GET /users/{userId}/subscription` - 取得用戶當前訂閱狀態 |
| **API** | `GET /plans` - 取得所有可用方案與價格（需支援動態價格、折扣碼） |
| **API** | `POST /subscriptions/upgrade` - 升級方案（詳見 PRD-B） |
| **API** | `POST /subscriptions/downgrade` - 降級方案（詳見 PRD-B） |
| **API** | `GET /features/{featureId}/required-tier` - 取得功能所需 tier |
| **前端** | shadcn/ui Card, Button, Badge, Switch, Modal, Tooltip 組件 |
| **前端** | Lucide React (Lock, Star, Check, X 圖示) |
| **設計系統** | MASTER.md v2.0.0 - 色彩、間距、圓角、陰影 tokens |
| **整合** | Stripe Products/Prices API - 即時價格與折扣資訊 |
| **Analytics** | 記錄 Paywall 觸發來源（哪個功能觸發升級提示） |

---

## 9. 與其他系統的關係

| 系統 | 關係 |
| --- | --- |
| **PRD-B (升降級 UX 流程)** | 本 PRD 定義 UI 元件，PRD-B 定義升降級流程邏輯、確認步驟、扣款時機等 |
| **Q2 Team Management** | 未來 seat-based pricing 需擴充方案卡片，顯示「每席位 NT$XX」，本 PRD 預留擴充空間 |
| **Stripe 整合** | 方案資料、價格來自 Stripe Products/Prices API，需支援即時同步 |
| **權限系統** | FeatureGate 元件需與後端權限系統整合，判斷用戶是否可存取特定功能 |
| **Analytics** | Paywall 觸發、方案選擇頁停留時間、升級轉化率等需埋點追蹤 |

---

## 10. 技術考量

### 10.1 前端實作建議

- **FeatureGate Component**: 建立通用元件，接收 `requiredTier` 和 `currentTier` 進行比對，自動顯示紅鎖或黃星
- **Pricing Context**: 使用 React Context 管理方案資料，避免重複 API 呼叫
- **Responsive Design**: 方案卡片需支援 Grid → Stack 佈局切換（桌面 4 欄、平板 2 欄、手機 1 欄）
- **A11y**: 所有付費指示元件需有 `aria-label`，如 `aria-label="此功能需升級至 Pro 方案"`

### 10.2 後端需求

- **Feature Flag**: 方案權限應透過 Feature Flag 系統管理，而非硬編碼
- **Dynamic Pricing**: 支援折扣碼、地區定價、動態折扣（如限時優惠）
- **Trial Tracking**: 記錄試用開始 / 結束時間，計算剩餘天數
- **Downgrade Queue**: 降級需排程生效（年付到期後），而非即時生效

### 10.3 效能優化

- **Price Caching**: 方案價格資料 cache 15 分鐘，減少 Stripe API 呼叫
- **Lazy Load**: Paywall Modal 組件延遲載入，僅在觸發時載入
- **Prefetch**: 方案選擇頁預載入方案資料，提升首屏速度

---

## 11. 開放問題

- [ ] 方案資料是否需支援 A/B Test？（如不同用戶看到不同價格）
- [ ] Paywall 是否需記錄「關閉次數」，避免過度打擾？
- [ ] 降級勸退的挽留方案折扣由誰決定？（PM 手動設定 or 自動化策略）
- [ ] Enterprise 方案的「聯絡我們」CTA 應導向何處？（Email / 表單 / 客服）
- [ ] Legacy 方案用戶是否需強制遷移至新方案？（時程待定）
- [ ] 方案卡片是否需顯示「推薦給你」個人化建議？（需 AI 演算法）

---

## 12. Wireflow 連結

| 類型 | 路徑 |
| --- | --- |
| 靜態版 | `wireflow/upgrade-ui-components-v1.0-20260209.html` |
| 互動版 | `wireflow/upgrade-ui-components-v1.0-20260209-interactive.html` |

---

## 變更紀錄

| 版本 | 日期 | 變更內容 | 作者 |
| --- | --- | --- | --- |
| v1.0 | 2026-02-09 | 初版，參照 MASTER.md v2.0.0 設計系統規範與 ad-authorization-global-settings-v1.2 PRD 格式 | Claude |
