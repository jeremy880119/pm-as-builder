# Feature: 廣告授權全域設定與列表優化

**版本：** v1.1
**更新日期：** 2026-02-04
**狀態：** Draft

---

## 1. 概述

### 1.1 背景與目標

目前「開啟廣告」頁面的設計存在**狀態語義不清**的問題：用戶無法區分「已開啟」代表的是「已授權投放」還是「實際投放中」。這導致：
- 創作者對廣告投放狀態產生困惑
- 客服收到大量關於廣告狀態的諮詢
- 無法支援「長尾流量」等自動化策略

本次改版將：
1. 新增**全域設定**，提供 4 種策略選項
2. 將列表的狀態欄位**拆分為「廣告授權」與「廣告狀態」**
3. 支援**例外處理**與**恢復連動**機制

### 1.2 目標用戶

全階段創作者：
- 新手：選擇「全面開啟」快速開始變現
- 成長期：使用「僅長尾流量」保護新集不被廣告干擾
- 專業創作者：使用「自訂設定」精細控制每集授權

### 1.3 成功指標

| 指標 | 目標 |
| --- | --- |
| 廣告相關客服諮詢量 | 下降 30% |
| 開啟廣告的集數比例 | 提升 15% |
| 設定頁面停留時間 | 下降（更快完成設定） |

### 1.4 策略對齊

| 檢核項 | 回答 |
| --- | --- |
| **ICP 階段** | 全階段通用 |
| **NSM 貢獻** | 廣告版位數增加、創作者留存、付費轉化率 |
| **Roadmap 對應** | 待確認 |
| **競品差異** | 提供自動化長尾策略，競品多為手動設定 |

### 1.5 優先級評估 (RICE)

| 維度 | 評分 (1-5) | 說明 |
| --- | --- | --- |
| **Reach** | 4 | 所有使用廣告功能的創作者（約 60% MAU） |
| **Impact** | 4 | 直接影響廣告收益與用戶體驗 |
| **Confidence** | 4 | 需求明確，客服數據支持 |
| **Effort** | 3 | 需後端配合，中等工作量 |

---

## 2. 名詞定義

| 名詞 | 英文 | 定義 |
| --- | --- | --- |
| 廣告授權 | Ad Authorization | 是否具備投放權利，由全域策略或手動覆蓋決定 |
| 廣告狀態 | Ad Status | 系統實際投放現狀，反應後端與廣告池的對接結果 |
| 全域策略 | Global Strategy | 節目層級的預設規則，自動套用至所有集數 |
| 長尾流量 | Long-tail Traffic | 發布超過 30 天的集數，通常有穩定但較低的收聽量 |
| 手動覆蓋 | Manual Override | 用戶無視全域規則，強行開啟或關閉單集授權 |
| 恢復連動 | Restore Sync | 將手動覆蓋的單集恢復為遵循全域策略 |

---

## 3. 驗收標準 (BDD)

**Feature: 廣告授權全域設定**

As a 創作者,
I want to 透過全域策略批量管理所有集數的廣告授權,
So that 我可以快速設定並減少逐集操作的時間成本.

**Background:**
Given 用戶已登入 Firstory Studio
And 用戶已導航至「盈利功能 > 開啟廣告」頁面

---

### Scenario 1: 新用戶看到預設為「全面開啟」

Given 用戶是首次進入廣告設定頁面
When 頁面載入完成
Then 全域設定應顯示「全面開啟」為已選取狀態
And 所有集數的廣告授權應為「已授權」

---

### Scenario 2: 切換至「僅開啟長尾流量」

Given 全域設定目前為「全面開啟」
And 存在 3 集發布未滿 30 天（新集）
And 存在 5 集發布超過 30 天（長尾集）
When 用戶點擊「僅開啟長尾流量」選項
Then 應顯示確認彈窗，內容包含：
  - 標題：「切換廣告策略」
  - 說明：「此操作將停止 3 集新集數的廣告投放，30 天後將自動開啟」
  - 按鈕：「確認切換」/「取消」
When 用戶點擊「確認切換」
Then 3 集新集的授權應變更為「未授權」
And 5 集長尾集的授權應維持「已授權」
And 應顯示 Toast：「已切換至長尾流量策略」

---

### Scenario 3: 切換至「全面關閉並下架所有廣告」

Given 全域設定目前為「全面開啟」
When 用戶點擊「全面關閉並下架所有廣告」選項
Then 應顯示警告彈窗，內容包含：
  - 標題：「確定要關閉所有廣告？」
  - 說明：「此操作將移除所有集數的廣告授權，廣告將立即停止投放。您可以隨時重新開啟。」
  - 按鈕：「確認關閉」（destructive 樣式）/「取消」
When 用戶點擊「確認關閉」
Then 所有集數的授權應變更為「未授權」
And 列表應進入唯讀模式（授權欄位不可點擊）
And 應顯示 Alert：「所有廣告已關閉。如需重新開啟，請選擇其他策略。」

---

### Scenario 4: 手動覆蓋單集授權

Given 全域設定為「僅開啟長尾流量」
And EP99（發布 10 天）的授權為「未授權」
When 用戶點擊 EP99 的授權 Badge
Then 應顯示 Popover，包含：
  - 選項：「已授權」/「未授權」
  - 提示：「此集將不再遵循全域策略」
When 用戶選擇「已授權」
Then EP99 的授權應變更為「已授權 (手動)」
And 應顯示「恢復連動」按鈕

---

### Scenario 5: 恢復連動

Given EP99 的授權為「已授權 (手動)」
And 全域策略為「僅開啟長尾流量」
And EP99 發布未滿 30 天
When 用戶點擊「恢復連動」按鈕
Then EP99 的授權應變更為「未授權」（遵循全域策略）
And 「恢復連動」按鈕應消失

---

### Scenario 6: 發布滿 30 天自動切換

Given 全域策略為「僅開啟長尾流量」
And EP99 的發布日期為 2026-01-05
And EP99 的授權為「未授權」（系統自動）
When 系統時間到達 2026-02-04（滿 30 天）
Then EP99 的授權應自動切換為「已授權」
And EP99 的廣告狀態應變更為「更新中」→「投放中」或「待配對」

---

### Scenario 7: API 失敗處理

Given 用戶正在切換全域策略
When API 請求失敗
Then 應在頁面頂部顯示 Alert（error 樣式）：
  - 內容：「設定儲存失敗，請稍後再試。如問題持續，請聯繫客服。」
And 全域設定應恢復至原選項
And Radio 選項應可再次操作

---

### Scenario 8: 片頭與中段廣告獨立設定

Given 用戶在「片頭廣告 (Pre-roll)」Tab
And 片頭廣告的全域策略為「全面開啟」
When 用戶切換至「中段廣告 (Mid-roll)」Tab
Then 中段廣告的全域策略應顯示其獨立設定（可能為不同值）
When 用戶將中段廣告設定為「僅開啟長尾流量」
Then 片頭廣告的設定應維持「全面開啟」不變

---

## 4. i18n 對照表

| Key | zh-TW | en |
| --- | --- | --- |
| `ad.global.title` | 廣告投放設定 | Ad Placement Settings |
| `ad.global.description` | 設定廣告插入策略 | Set ad insertion strategy |
| `ad.global.enableAll` | 全面開啟 | Enable All |
| `ad.global.enableAll.desc` | 每集皆插入片頭廣告，獲取最大收益。 | Insert pre-roll ads in all episodes for maximum revenue. |
| `ad.global.longTailOnly` | 僅開啟長尾流量 | Long-tail Only |
| `ad.global.longTailOnly.desc` | 僅 30 天以上舊集開放廣告。 | Only enable ads for episodes older than 30 days. |
| `ad.global.custom` | 自訂設定 | Custom Settings |
| `ad.global.custom.desc` | 前至下方列表個別調整單集片頭廣告授權。 | Adjust ad authorization for each episode individually. |
| `ad.global.disableAll` | 全面關閉並下架所有廣告 | Disable All Ads |
| `ad.global.disableAll.desc` | 完全關閉片頭廣告。 | Completely disable pre-roll ads. |
| `ad.auth.authorized` | 已授權 | Authorized |
| `ad.auth.authorized.manual` | 已授權 (手動) | Authorized (Manual) |
| `ad.auth.unauthorized` | 未授權 | Unauthorized |
| `ad.auth.unauthorized.manual` | 未授權 (手動) | Unauthorized (Manual) |
| `ad.status.active` | 投放中 | Active |
| `ad.status.syncing` | 更新中 | Syncing |
| `ad.status.pending` | 待配對 | Pending |
| `ad.status.stopped` | 已停止 | Stopped |
| `ad.action.restoreSync` | 恢復連動 | Restore Sync |
| `ad.modal.switchStrategy.title` | 切換廣告策略 | Switch Ad Strategy |
| `ad.modal.switchStrategy.confirm` | 確認切換 | Confirm Switch |
| `ad.modal.disableAll.title` | 確定要關閉所有廣告？ | Disable all ads? |
| `ad.modal.disableAll.confirm` | 確認關閉 | Confirm Disable |
| `ad.alert.allDisabled` | 所有廣告已關閉。如需重新開啟，請選擇其他策略。 | All ads are disabled. Select another strategy to re-enable. |
| `ad.error.saveFailed` | 設定儲存失敗，請稍後再試。 | Failed to save settings. Please try again later. |

---

## 5. 依賴關係

| 依賴類型 | 說明 |
| --- | --- |
| **API** | `GET/PUT /shows/{showId}/ad-settings`（需新增策略類型欄位） |
| **API** | `GET /shows/{showId}/episodes/ad-auth`（需新增手動覆蓋標記） |
| **API** | `PUT /episodes/{episodeId}/ad-auth`（需支援手動覆蓋） |
| **API** | `POST /episodes/{episodeId}/ad-auth/restore`（需新增） |
| **前端** | shadcn/ui RadioGroup、Popover 組件 |
| **排程** | 長尾流量自動切換（每日檢查發布滿 30 天的集數） |

---

## 6. 開放問題

- [ ] 30 天長尾判斷是後端排程還是前端即時計算？
- [ ] 後端 API 哪些欄位需要新增或修改？
- [ ] 是否需要廣告收益預估功能（切換策略時顯示影響）？
- [ ] 「自訂設定」模式下，新發布的集數預設授權為何？
- [ ] 此功能是否需要 A/B Test？

---

## 7. Wireflow 連結

| 類型 | 路徑 |
| --- | --- |
| 靜態版 | `wireflow/ad-authorization-global-settings-v1.1-20260204.html` |
| 互動版 | `wireflow/ad-authorization-global-settings-v1.1-20260204-interactive.html` |

---

## 變更紀錄

| 版本 | 日期 | 變更內容 | 作者 |
| --- | --- | --- | --- |
| v1.0 | 2026-02-04 | 初版，參照 MASTER.md v1.1.0 設計系統規範 | Claude |
| v1.1 | 2026-02-04 | 轉換為 prd-wireflow 格式，移除內嵌示意圖，新增 Wireflow 連結 | Claude |
