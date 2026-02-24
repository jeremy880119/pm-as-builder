# Story 0: 功能等級盤點（Feature-Tier Registry）

**Master PRD：** [saas-plan-upgrade-downgrade-v1.2-20260210.md](saas-plan-upgrade-downgrade-v1.2-20260210.md)
**Story：** S0 — 功能等級盤點
**產出物：** Feature-Tier Registry（機器可讀 + 人類可讀）
**依賴：** 無（S0 為所有 Story 的前置作業）
**Blocker for：** S1、S2、S3、S4

---

## 1. 範疇與目標

### 問題

目前「功能 × 方案」的對照關係散落在 6+ 個地方，全部手動寫死：

| 出現位置 | 用途 | 問題 |
|---------|------|------|
| Master 3.2 / Story 1 3.2 | 方案功能對照表（8 項） | 手動維護，是否完整未知 |
| Story 2 動態內容 | Paywall feature_description（4 項） | 只列了 4 項，但紅鎖頭實際可能更多 |
| Story 3 降級影響矩陣 | 軟邊界失去功能清單（6 路徑） | 手動推算，可能遺漏 |
| Story 4 硬邊界 | 5 項檢核條件 | 需對照實際 DB/設定 |
| Wireframe B 頁 | 方案卡片功能列表 | 與 PRD 可能不同步 |
| E Modal | 升級解鎖功能清單 | 同上 |

**核心問題：** 沒有 Single Source of Truth。PRD 作者手動列舉功能清單，無法保證與程式碼一致。Master 開放問題 #6 正是此問題的表徵。

### 目標

請工程盤點現有程式碼中所有按方案等級區分的功能，輸出一份機器可讀 + 人類可讀的 Feature-Tier Registry，作為後續所有 Story 的 Single Source of Truth。

---

## 2. 工程盤點範疇

請工程盤點以下三類：

### 2.1 Binary 功能開關（有/無）

| 已知功能 | 預期最低方案 | 備註 |
|---------|------------|------|
| 進階數據分析 | Pro | |
| 下載數據報表 | Pro | |
| 單集 Flink 萬用連結 | Lite | |
| 移除動態廣告 | Pro | Legacy 也有 |
| 法人銀行提領 | Pro | 硬邊界項目 |
| Discord 整合 | Pro | 硬邊界項目 |
| Zapier 整合 | Pro | 硬邊界項目 |
| **可能遺漏的？** | — | **需工程確認** |

### 2.2 Quota 配額功能

| 已知功能 | Free | Lite | Pro | Enterprise | 備註 |
|---------|------|------|-----|------------|------|
| 創立節目上限 | 1 | 1 | 5 | 無限 | 硬邊界項目 |
| AI 內容萃取（集/月） | 1 | 3 | 6 | 25 | Legacy = 1 |
| 免費追蹤會員上限 | 50 | 100 | 500 | 7,000 | 硬邊界項目 |
| 廣告分潤比例 | 0% | 0% | 0% | 100% | |
| 經營會員抽成調降 | 0% | 0% | 3% | 5% | base 抽成待確認 |
| **可能遺漏的？** | — | — | — | — | **需工程確認** |

### 2.3 隱性權限（可能未在 PRD 列出）

工程需翻查以下程式碼：
- Permission / feature-flag 相關模組
- 任何 `if plan >= X` 或 `tier >= X` 的邏輯
- Middleware / guard 中的方案檢查
- API endpoint 中的方案限制

---

## 3. Registry 欄位定義

| 欄位 | 型別 | 說明 | 範例 |
|------|------|------|------|
| `feature_key` | string | 程式碼中的 feature flag / permission key | `advanced_analytics` |
| `display_name` | object | zh-TW / en 顯示名稱 | `{ "zh": "進階數據分析", "en": "Advanced Analytics" }` |
| `description` | object | Paywall Modal 用的 feature_description（zh-TW / en） | `{ "zh": "深入了解聽眾行為…", "en": "..." }` |
| `min_tier` | enum | 所需最低方案：Free / Lite / Pro / Enterprise | `Pro` |
| `tier_values` | object | 各方案具體值（配額型填值，開關型填 true/false） | `{ "Free": 1, "Lite": 3, "Pro": 6, "Enterprise": 25 }` |
| `lock_type` | enum | `binary`（開關）/ `quota`（配額）/ `tier_specific`（特殊） | `quota` |
| `downgrade_impact` | object | 降級時的影響描述（zh-TW / en），用於 D1 軟邊界 | `{ "zh": "每月失去 {diff} 集 AI 內容萃取", "en": "..." }` |

---

## 4. Feature-Tier Registry 模板（工程填寫）

> 以下為已知功能的預填模板。工程需：(1) 驗證已知項目的正確性 (2) 補充遺漏的功能項目。

### 4.1 Markdown 表格版

| feature_key | display_name (zh) | min_tier | lock_type | tier_values | downgrade_impact (zh) |
|------------|-------------------|----------|-----------|-------------|----------------------|
| `show_limit` | 創立節目上限 | Free | quota | Free:1, Lite:1, Pro:5, Ent:∞ | _工程填寫_ |
| `advanced_analytics` | 進階數據分析 | Pro | binary | Free:✗, Lite:✗, Pro:✓, Ent:✓ | _工程填寫_ |
| `download_report` | 下載數據報表 | Pro | binary | Free:✗, Lite:✗, Pro:✓, Ent:✓ | 失去下載數據報表 |
| `episode_flink` | 單集 Flink 萬用連結 | Lite | binary | Free:✗, Lite:✓, Pro:✓, Ent:✓ | 總計 {count} 條 Flink 失效 |
| `ai_extraction` | AI 內容萃取 | Free | quota | Free:1, Lite:3, Pro:6, Ent:25 | 每月失去 {diff} 集 AI 內容萃取 |
| `remove_dynamic_ads` | 移除動態廣告 | Pro | binary | Free:✗, Lite:✗, Pro:✓, Ent:✓ | 自動幫所有 {count} 集插入廣告 |
| `ad_revenue_share` | 提高廣告分潤 | Enterprise | quota | Free:0%, Lite:0%, Pro:0%, Ent:100% | 每筆廣告分潤減少 {percent}% |
| `commission_discount` | 調降經營會員抽成 | Pro | quota | Free:0%, Lite:0%, Pro:3%, Ent:5% | 每筆經營會員抽成漲價 {percent}% |
| `corporate_bank` | 法人銀行提領 | Pro | binary | Free:✗, Lite:✗, Pro:✓, Ent:✓ | _硬邊界：需客服處理_ |
| `discord_integration` | Discord 整合 | Pro | binary | Free:✗, Lite:✗, Pro:✓, Ent:✓ | _硬邊界：需客服處理_ |
| `zapier_integration` | Zapier 整合 | Pro | binary | Free:✗, Lite:✗, Pro:✓, Ent:✓ | _硬邊界：需客服處理_ |
| `free_follower_limit` | 免費追蹤會員上限 | Free | quota | Free:50, Lite:100, Pro:500, Ent:7000 | _硬邊界：需客服處理_ |
| _工程補充…_ | | | | | |

### 4.2 JSON 版（前端使用）

```json
[
  {
    "feature_key": "show_limit",
    "display_name": { "zh": "創立節目上限", "en": "Show Limit" },
    "description": { "zh": "", "en": "" },
    "min_tier": "Free",
    "tier_values": { "Free": 1, "Lite": 1, "Pro": 5, "Enterprise": -1 },
    "lock_type": "quota",
    "downgrade_impact": { "zh": "", "en": "" }
  },
  {
    "feature_key": "advanced_analytics",
    "display_name": { "zh": "進階數據分析", "en": "Advanced Analytics" },
    "description": { "zh": "深入了解聽眾行為與互動數據，優化你的內容策略", "en": "Dive deep into audience behavior and engagement data to optimize your content strategy" },
    "min_tier": "Pro",
    "tier_values": { "Free": false, "Lite": false, "Pro": true, "Enterprise": true },
    "lock_type": "binary",
    "downgrade_impact": { "zh": "失去進階數據分析", "en": "Lose access to Advanced Analytics" }
  }
]
```

> **註：** `-1` 代表無限。完整 JSON 由工程盤點後產出。

---

## 5. 下游消費者對照表

| Story | 消費哪些欄位 | 用途 |
|-------|------------|------|
| S1 B 頁方案卡片 | `display_name`, `min_tier`, `tier_values` | 各方案功能列表 |
| S1 E 升級成功 Modal | `display_name` | 列出解鎖功能清單 |
| S2 Paywall Modal | `display_name`, `description`, `min_tier` | 紅鎖頭觸發後顯示功能說明 |
| S2 紅鎖頭系統 | `feature_key`, `min_tier`, `lock_type` | 判斷哪些功能需顯示紅鎖頭 |
| S3 D1 軟邊界 | `downgrade_impact` | 降級後失去功能清單 |
| S3/S4 降級後權限變更 | `feature_key`, `min_tier` | 判斷哪些功能要上鎖 |

---

## 6. 驗收標準

- [ ] Registry 涵蓋三類功能盤點（Binary / Quota / 隱性權限）
- [ ] 所有欄位（feature_key, display_name, description, min_tier, tier_values, lock_type, downgrade_impact）均已填寫
- [ ] 工程確認無遺漏的 `if plan >= X` 邏輯
- [ ] PM 比對 Registry 與 S1-S4 各功能清單一致
- [ ] Markdown 表 + JSON 兩種格式皆交付
- [ ] Master 3.2 功能對照表可由 Registry 完整生成
- [ ] Story 2 的 4 項 Paywall feature_description 已含在 Registry 中（且確認是否需補充更多）
- [ ] Story 3 降級影響矩陣的 6 條路徑可由 Registry downgrade_impact 推導
- [ ] Story 4 的 5 項硬邊界檢核項目皆有對應 feature_key

---

## 7. 開放問題

| # | 問題 | 狀態 |
|---|------|------|
| 1 | Legacy 方案的 tier_values 是否需要納入 Registry？ | 待確認 |
| 2 | 經營會員抽成的 base 比例為何？（目前只知 Pro -3%, Ent -5%） | 待工程確認 |
| 3 | 是否有其他隱性權限未列在 PRD 中？ | 待工程盤點 |

---

## 變更紀錄

| 日期 | 版本 | 變更說明 |
|------|------|----------|
| 2026-02-10 | v1.0 | 初版：建立 Feature-Tier Registry 空模板，定義欄位與工程盤點範疇 |
