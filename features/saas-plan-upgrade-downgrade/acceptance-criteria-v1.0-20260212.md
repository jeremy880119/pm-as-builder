# Acceptance Criteria: SaaS 方案升降級流程重設計

**Feature Slug：** saas-plan-upgrade-downgrade
**版本：** v1.0
**日期：** 2026-02-12
**狀態：** Draft
**前序產物：** prd-v2.0-20260211.md, user-story-v2.2-20260212.md, wireframe-v4.0-20260212.html

---

## 總覽

| Story | 場景數 | 覆蓋類型 |
|-------|--------|---------|
| US-01: Feature-Tier Registry | 5 | Happy + Edge + Error |
| US-02: 帳戶資訊頁顯示方案狀態 | 5 | Happy + Edge + Error |
| US-03: 方案選擇頁瀏覽與比較 | 6 | Happy + Edge + Error |
| US-04: 14 天免費試用升級 | 5 | Happy + Edge + Error |
| US-05: Stripe Checkout 升級結帳 | 5 | Happy + Edge + Error |
| US-06: 升級成功確認 | 4 | Happy + Edge + Error |
| US-07: 紅鎖頭系統 | 4 | Happy + Edge + Error |
| US-08: Paywall Modal 快速升級 | 5 | Happy + Edge + Error |
| US-09: 降級勸退 Modal | 6 | Happy + Edge + Error |
| US-10: 帳戶頁待降級狀態 | 5 | Happy + Edge + Error |
| US-11: 硬邊界檢核 | 6 | Happy + Edge + Error |
| US-12: D2 攔截 Modal | 5 | Happy + Edge + Error |
| US-13: D3 暫停上傳 | 6 | Happy + Edge + Error |

**合計：67 個場景**

---

## US-01: Feature-Tier Registry

### Happy Path

**Scenario: Registry 回傳完整功能對照**
- Given: Registry 已定義 12 項功能
- When: 元件查詢 `advanced_analytics` 的方案可用性
- Then: 應回傳 `min_tier: Pro`、`lock_type: binary`、`hard_boundary: false`、`description` 非空、`tier_values` 含 Free/Lite/Pro/Enterprise 四個鍵

**Scenario: Registry 驅動下游元件內容**
- Given: Registry 定義 `episode_flink` 的 `min_tier` 為 Lite
- When: Free 用戶瀏覽 Paywall 鎖頭系統
- Then: `episode_flink` 應顯示紅鎖頭且 tier badge 標注「需要 Lite」

### Edge Cases

**Scenario: 新增功能後下游元件立即可用**
- Given: Registry 已有 12 項功能
- And: 工程師新增第 13 項功能定義（含 feature_key、display_name、description、min_tier、lock_type、hard_boundary、tier_values）
- When: 任一下游元件查詢第 13 項功能
- Then: 應回傳完整欄位資料，無需重新部署下游元件

**Scenario: 查詢不存在的 feature_key**
- Given: Registry 已有 12 項功能
- When: 元件查詢 `nonexistent_feature`
- Then: 應回傳明確的 404/null 結果，不應拋出未處理例外

### Error Handling

**Scenario: Registry 缺少必要欄位時啟動失敗**
- Given: 某功能定義缺少 `min_tier` 欄位
- When: 系統啟動並載入 Registry
- Then: 應拋出設定驗證錯誤，阻止啟動，日誌記錄缺少欄位與功能名稱

---

## US-02: 帳戶資訊頁顯示方案狀態

### Happy Path

**Scenario: 顯示當前方案資訊與變更入口**
- Given: 用戶已登入且目前為 Pro 年繳方案，下次扣款日為 2027-02-11
- When: 用戶進入帳戶資訊頁
- Then: 應顯示方案名稱「Pro」、計費週期「年繳」、下次扣款日「2027-02-11」及「變更方案」按鈕

**Scenario: Free 用戶顯示基礎資訊**
- Given: 用戶目前為 Free 方案
- When: 用戶進入帳戶資訊頁
- Then: 應顯示方案名稱「Free」，不顯示計費週期與扣款日，顯示「變更方案」按鈕

### Edge Cases

**Scenario: 月繳用戶顯示正確計費週期**
- Given: 用戶目前為 Lite 月繳方案
- When: 用戶進入帳戶資訊頁
- Then: 應顯示計費週期「月繳」，下次扣款日為一個月後

**Scenario: Legacy 用戶顯示方案資訊**
- Given: 用戶目前為 Legacy 方案
- When: 用戶進入帳戶資訊頁
- Then: 應顯示方案名稱「Legacy」及「變更方案」按鈕

### Error Handling

**Scenario: 方案資訊載入失敗**
- Given: 用戶已登入
- When: 帳戶資訊頁載入時 API 回傳錯誤
- Then: 應顯示錯誤提示，不應顯示空白或錯誤的方案資訊

---

## US-03: 方案選擇頁瀏覽與比較

### Happy Path

**Scenario: Free 用戶瀏覽方案比較表**
- Given: 用戶目前為 Free 方案
- When: 用戶進入方案選擇頁
- Then: 應顯示 Free/Lite/Pro/Enterprise 四個方案卡片
- And: 預設顯示年繳價格（Lite $7、Pro $15、Enterprise $159）
- And: Free 卡片標示「目前方案」且 CTA 為不可點擊狀態
- And: Pro 卡片顯示「推薦」Badge

**Scenario: 切換月繳/年繳價格**
- Given: 用戶在方案選擇頁，預設為年繳
- When: 用戶點擊「月繳」Toggle
- Then: 所有方案價格應即時更新為月繳價（Lite $9、Pro $19、Enterprise $199）
- And: Toggle 的「月繳」按鈕應變為 active 狀態

### Edge Cases

**Scenario: Legacy 用戶僅顯示升級選項**
- Given: 用戶目前為 Legacy 方案
- When: 用戶進入方案選擇頁
- Then: 應僅顯示升級 CTA（升級到 Lite/Pro/Enterprise），不應顯示降級 CTA
- And: 應顯示「Legacy 方案用戶僅可升級」說明

**Scenario: Pro 用戶同時看到升級與降級選項**
- Given: 用戶目前為 Pro 方案
- When: 用戶進入方案選擇頁
- Then: Free 與 Lite 卡片顯示「降至 {Plan}」Ghost CTA
- And: Pro 卡片標示「目前方案」且不可點擊
- And: Enterprise 卡片顯示「升級到 Enterprise」Primary CTA

**Scenario: Enterprise 用戶（最高方案）**
- Given: 用戶目前為 Enterprise 方案
- When: 用戶進入方案選擇頁
- Then: Enterprise 卡片標示「目前方案」
- And: Free/Lite/Pro 卡片應顯示「降至 {Plan}」Ghost CTA

### Error Handling

**Scenario: 方案資料載入失敗**
- Given: 用戶進入方案選擇頁
- When: 方案定價 API 回傳錯誤
- Then: 應顯示重試提示，不應顯示價格為 $0 或空白的方案卡片

---

## US-04: 14 天免費試用升級

### Happy Path

**Scenario: 符合資格用戶看到試用 CTA**
- Given: 用戶為 Free 方案且 `has_ever_subscribed = false`
- When: 用戶進入方案選擇頁
- Then: 所有付費方案 CTA 應顯示「14 天免費試用 {Plan}」

**Scenario: 試用期間用戶提前取消**
- Given: 用戶正在 Pro 14 天試用期內（剩餘 5 天）
- When: 用戶取消訂閱
- Then: 方案應立即回到 Free，不產生任何費用

### Edge Cases

**Scenario: 曾訂閱過的用戶不顯示試用 CTA**
- Given: 用戶為 Free 方案且 `has_ever_subscribed = true`
- When: 用戶進入方案選擇頁
- Then: 所有付費方案 CTA 應顯示「升級到 {Plan}」，不應出現「14 天免費試用」

**Scenario: 試用到期後自動以年繳扣款**
- Given: 用戶正在 Pro 14 天試用期
- When: 試用期到期且未取消
- Then: 應自動以 Pro 年繳方案（$15/mo）扣款
- And: 用戶方案維持 Pro，`has_ever_subscribed` 保持 `true`

### Error Handling

**Scenario: 試用啟動時 Stripe 建立失敗**
- Given: 用戶為 Free 方案且符合試用資格
- When: 點擊「14 天免費試用 Pro」後 Stripe Checkout Session 建立失敗
- Then: 應返回方案選擇頁並顯示錯誤提示
- And: 用戶方案維持 Free，試用資格不應被消耗

---

## US-05: Stripe Checkout 升級結帳

### Happy Path

**Scenario: Checkout 成功後方案立即生效**
- Given: 用戶為 Free 方案，選擇升級至 Pro 年繳
- When: Stripe Checkout 回調 `checkout.session.completed`
- Then: 用戶方案應立即變更為 Pro
- And: 所有 Pro 功能應立即解鎖
- And: `has_ever_subscribed` 應設為 `true`

**Scenario: 跨級升級（Free 直接到 Enterprise）**
- Given: 用戶為 Free 方案
- When: 用戶選擇 Enterprise 年繳並完成 Stripe Checkout
- Then: 方案應立即變更為 Enterprise，解鎖所有 Enterprise 功能

### Edge Cases

**Scenario: Checkout 過程中用戶關閉瀏覽器**
- Given: 用戶已進入 Stripe Checkout 頁面
- When: 用戶關閉瀏覽器未完成付款
- Then: 方案應維持不變
- And: 用戶重新登入後應可再次發起升級

**Scenario: 待降級用戶升級時取消排程降級**
- Given: 用戶為 Pro 方案，已排程降至 Free（2026-03-15 生效）
- When: 用戶選擇升級至 Enterprise 並完成 Stripe Checkout
- Then: 降級排程應被取消
- And: 方案應立即變更為 Enterprise

### Error Handling

**Scenario: Stripe Checkout 失敗後方案不變**
- Given: 用戶為 Free 方案，選擇升級至 Pro
- When: Stripe Checkout 失敗（卡片被拒）
- Then: 用戶方案應維持 Free
- And: 應返回方案選擇頁

---

## US-06: 升級成功確認

### Happy Path

**Scenario: 顯示升級解鎖功能清單**
- Given: 用戶從 Free 成功升級至 Pro
- When: Stripe 回調成功後進入確認頁
- Then: 應顯示標題「升級成功！」
- And: 副標顯示「你已升級至 Pro 方案」
- And: 解鎖功能清單應包含 7 項（5 檔節目、進階分析、報表下載、Flink、AI 萃取 6 集/月、移除廣告、抽成折扣 3%）
- And: 應顯示「立即體驗」CTA

**Scenario: 不同升級路徑顯示對應解鎖清單**
- Given: 用戶從 Free 成功升級至 Lite
- When: 進入確認頁
- Then: 解鎖功能清單應包含 2 項（Flink 萬用連結、AI 萃取 3 集/月）

### Edge Cases

**Scenario: 從 Pro 升級至 Enterprise 的解鎖清單**
- Given: 用戶從 Pro 成功升級至 Enterprise
- When: 進入確認頁
- Then: 解鎖清單應僅顯示 Pro→Enterprise 的差異項（無限節目、AI 萃取 25 集/月、廣告分潤 100%、抽成折扣 5%），不應重複已有的 Pro 功能

### Error Handling

**Scenario: 確認頁資料載入失敗**
- Given: 用戶完成升級
- When: 確認頁解鎖清單 API 回傳錯誤
- Then: 應仍顯示「升級成功！」與「你已升級至 {Plan} 方案」
- And: 解鎖清單區域應顯示 fallback 訊息，不應顯示空白

---

## US-07: 紅鎖頭系統

### Happy Path

**Scenario: Free 用戶看到 4 項付費功能鎖頭**
- Given: 用戶為 Free 方案
- When: 用戶瀏覽側邊欄功能列表
- Then: 以下 4 項功能應顯示紅鎖頭圖示：進階數據分析（需要 Pro）、下載數據報表（需要 Pro）、單集 Flink 萬用連結（需要 Lite）、移除動態廣告（需要 Pro）

**Scenario: Lite 用戶只看到 3 項鎖頭**
- Given: 用戶為 Lite 方案
- When: 用戶瀏覽側邊欄功能列表
- Then: `episode_flink` 不應顯示鎖頭（Lite 已解鎖）
- And: 其餘 3 項 Pro 功能應顯示紅鎖頭

### Edge Cases

**Scenario: Pro 用戶無任何鎖頭**
- Given: 用戶為 Pro 方案
- When: 用戶瀏覽側邊欄功能列表
- Then: 4 項 Paywall 觸發功能均不應顯示紅鎖頭

### Error Handling

**Scenario: Registry 查詢失敗時功能入口降級處理**
- Given: Registry 暫時不可用
- When: 用戶瀏覽側邊欄功能列表
- Then: 付費功能入口應隱藏鎖頭圖示（而非顯示錯誤）
- And: 點擊功能入口應正常嘗試存取（由後端權限控制攔截）

---

## US-08: Paywall Modal 快速升級

### Happy Path

**Scenario: Free 用戶觸發 Paywall Modal**
- Given: Free 用戶點擊「進階數據分析」的紅鎖頭
- When: Paywall Modal 彈出
- Then: 應顯示功能名稱「進階數據分析」
- And: 應顯示功能說明「深入了解聽眾行為與互動數據，優化你的內容策略」
- And: 應顯示「需要 Pro 方案」Badge
- And: 應顯示升級 CTA 與「查看所有方案」連結

**Scenario: 符合試用資格時 CTA 顯示試用文案**
- Given: Free 用戶 `has_ever_subscribed = false`
- When: Paywall Modal 彈出（需要 Pro 的功能）
- Then: CTA 應顯示「14 天免費試用 Pro」

**Scenario: 不符合試用資格時 CTA 顯示升級文案**
- Given: Free 用戶 `has_ever_subscribed = true`
- When: Paywall Modal 彈出（需要 Pro 的功能）
- Then: CTA 應顯示「升級到 Pro」

### Edge Cases

**Scenario: 「查看所有方案」導向方案選擇頁**
- Given: Paywall Modal 已開啟
- When: 用戶點擊「查看所有方案」
- Then: 應關閉 Modal 並導向方案選擇頁

### Error Handling

**Scenario: Paywall Modal 功能資訊載入失敗**
- Given: Free 用戶點擊紅鎖頭
- When: 功能描述從 Registry 查詢失敗
- Then: Modal 應顯示通用升級提示（「此功能需要更高方案」），不應顯示空白內容
- And: 升級 CTA 與「查看所有方案」連結仍應可用

---

## US-09: 降級勸退 Modal

### Happy Path

**Scenario: Pro 降至 Free 顯示完整失去功能清單**
- Given: 用戶為 Pro 方案，目前有 12 集已發佈、8 條 Flink 連結
- When: 用戶在方案選擇頁點擊「降至 Free」
- Then: D1 Modal 應顯示標題「確定要降級嗎？」
- And: 副標顯示「從 Pro 降至 Free 後，你將失去以下功能：」
- And: 失去清單應包含：失去進階數據分析、失去下載數據報表、自動幫所有 12 集插入廣告、總計 8 條單集 Flink 萬用連結失效、每月失去 5 集 AI 內容萃取、每筆經營會員抽成漲價 3%
- And: 應顯示「取消」（Primary）與「仍要降級」（Ghost）按鈕

**Scenario: 用戶取消降級（挽留成功）**
- Given: D1 Modal 已顯示
- When: 用戶點擊「取消」
- Then: Modal 應關閉，回到方案選擇頁
- And: 用戶方案應維持不變

### Edge Cases

**Scenario: Enterprise 降至 Pro 的差異化清單**
- Given: 用戶為 Enterprise 方案
- When: 用戶點擊「降至 Pro」
- Then: 失去清單應僅包含 Enterprise→Pro 差異：每月失去 19 集 AI 內容萃取、每筆廣告分潤減少 100%、每筆經營會員抽成漲價 2%

**Scenario: Lite 降至 Free 的精簡清單**
- Given: 用戶為 Lite 方案，目前有 3 條 Flink 連結
- When: 用戶點擊「降至 Free」
- Then: 失去清單應包含：總計 3 條單集 Flink 萬用連結失效、每月失去 2 集 AI 內容萃取
- And: 不應出現進階分析、報表下載等 Lite 本身無權限的項目

**Scenario: 動態數值帶入**
- Given: 用戶為 Pro 方案，已發佈 0 集、Flink 0 條
- When: 用戶點擊「降至 Free」
- Then: 失去清單中「自動幫所有 0 集插入廣告」與「總計 0 條單集 Flink 萬用連結失效」應正常顯示（或省略數量為 0 的項目）

### Error Handling

**Scenario: 降級影響清單 API 失敗**
- Given: 用戶點擊「降至 Free」
- When: 降級影響清單 API 回傳錯誤
- Then: 不應直接進入降級流程
- And: 應顯示錯誤提示，請用戶稍後再試

---

## US-10: 帳戶頁待降級狀態

### Happy Path

**Scenario: 顯示待降級排程資訊**
- Given: 用戶為 Pro 方案，已排程降至 Free，當期到期日 2026-03-15
- When: 用戶進入帳戶資訊頁
- Then: 應顯示 Alert Banner「將於 2026-03-15 降為 Free 方案」
- And: 應顯示「取消降級」按鈕
- And: 「變更方案」按鈕仍應可用

**Scenario: 取消降級排程**
- Given: 帳戶頁顯示待降級 Alert
- When: 用戶點擊「取消降級」
- Then: 降級排程應被取消
- And: Alert Banner 應消失
- And: 帳戶頁回到 Default State

### Edge Cases

**Scenario: 待降級期間再次升級**
- Given: 用戶為 Pro 方案，已排程降至 Free
- When: 用戶點擊「變更方案」後選擇 Enterprise 並完成 Checkout
- Then: 降級排程應被取消
- And: 方案應立即變更為 Enterprise

**Scenario: 待降級期間上傳功能正常**
- Given: 用戶已排程降級（用戶自行降級）
- When: 用戶嘗試上傳新集
- Then: 上傳應正常運作，不受排程降級影響

### Error Handling

**Scenario: 取消降級 API 失敗**
- Given: 帳戶頁顯示待降級 Alert
- When: 用戶點擊「取消降級」但 API 回傳錯誤
- Then: 應顯示錯誤提示
- And: Alert Banner 應維持顯示（降級排程未被取消）

---

## US-11: 硬邊界檢核

### Happy Path

**Scenario: 硬邊界全通過 — 用戶自行降級**
- Given: Pro 用戶降至 Lite
- And: 現有節目數 1（≤ Lite 上限 1）
- And: 無法人銀行提領、無 Discord 群組、無 Zapier 自動信
- And: 免費追蹤會員 80 人（≤ Lite 上限 100）
- When: 系統執行硬邊界檢核
- Then: 檢核結果應為「全通過」
- And: 進入 Stripe 排程降級流程

**Scenario: 硬邊界觸發單一項目**
- Given: Pro 用戶降至 Free
- And: 目前設有法人銀行提領
- And: 其餘 4 項檢核通過
- When: 系統執行硬邊界檢核
- Then: 檢核結果應為「觸發」
- And: 觸發項目清單應包含 `corporate_bank`（1 項）

### Edge Cases

**Scenario: 硬邊界觸發多個項目**
- Given: Enterprise 用戶降至 Free
- And: 現有節目數 8（> Free 上限 1）、設有法人銀行、設有 Discord、設有 Zapier、追蹤會員 600 人（> Free 上限 50）
- When: 系統執行硬邊界檢核
- Then: 觸發項目清單應包含全部 5 項
- And: 每項應含 feature_key 與觸發原因描述

**Scenario: 節目數邊界值（等於上限不觸發）**
- Given: Enterprise 用戶降至 Pro，現有節目數 5（= Pro 上限 5）
- When: 系統執行 `show_limit` 硬邊界檢核
- Then: `show_limit` 應不觸發（等於上限視為通過）

**Scenario: 追蹤會員邊界值**
- Given: Pro 用戶降至 Lite，免費追蹤會員 101 人（> Lite 上限 100）
- When: 系統執行 `free_follower_limit` 硬邊界檢核
- Then: `free_follower_limit` 應觸發

### Error Handling

**Scenario: 硬邊界檢核 API 部分失敗**
- Given: 用戶觸發降級，系統執行 5 項硬邊界檢核
- When: `discord_integration` 檢核 API 逾時，其餘 4 項完成
- Then: 整體結果應視為「觸發」（fail-safe）
- And: 錯誤日誌應記錄逾時的檢核項目

---

## US-12: 用戶自行降級 — D2 攔截 Modal

### Happy Path

**Scenario: 顯示需客服處理的項目清單**
- Given: Pro 用戶降至 Free，硬邊界觸發 `corporate_bank` 與 `discord_integration`
- When: D2 攔截 Modal 彈出
- Then: 應顯示標題「需要客服處理」
- And: 應列出 2 個項目卡片：「移除法人銀行提領」與「關閉 Discord 群組」
- And: 每個卡片應含項目名稱與說明
- And: 應顯示「保留目前方案」（Primary）與「我已截圖」（Secondary）按鈕
- And: 底部應顯示「請聯繫客服處理上述項目後再次降級」

**Scenario: 點擊「保留目前方案」**
- Given: D2 Modal 已顯示
- When: 用戶點擊「保留目前方案」
- Then: Modal 應關閉，回到方案選擇頁
- And: 用戶方案維持不變

### Edge Cases

**Scenario: 點擊「我已截圖」**
- Given: D2 Modal 已顯示
- When: 用戶點擊「我已截圖」
- Then: Modal 應關閉，回到方案選擇頁
- And: 系統應記錄 `screenshot_acknowledged` 事件

**Scenario: D2 期間上傳功能正常**
- Given: D2 Modal 已顯示（用戶自行降級流程）
- When: 用戶關閉 Modal 後嘗試上傳新集
- Then: 上傳應正常運作（D2 不擋上傳）

### Error Handling

**Scenario: 客服處理完成後再次降級**
- Given: 用戶之前因 `corporate_bank` 觸發 D2
- And: 客服已處理完成（法人銀行已移除）
- When: 用戶再次降級至 Free，系統執行硬邊界檢核
- Then: `corporate_bank` 不應再觸發
- And: 若其餘項目也通過，應正常進入降級排程

---

## US-13: 系統強制降級 — D3 暫停上傳

### Happy Path

**Scenario: 強制降級硬邊界全通過**
- Given: 用戶因付款失敗被系統強制降至 Free
- And: 硬邊界檢核全通過
- When: 系統執行強制降級
- Then: 用戶方案應立即變更為 Free
- And: 上傳功能應正常
- And: 不應顯示 Error Banner

**Scenario: 強制降級觸發硬邊界**
- Given: 用戶因付款失敗被系統強制降至 Free
- And: 目前設有法人銀行提領
- When: 系統執行強制降級
- Then: 用戶方案應暫不變更（維持原方案）
- And: 上傳功能應被暫停
- And: 所有頁面頂部應顯示不可關閉的 Error Banner「你的帳戶有待處理項目，上傳功能已暫停」

### Edge Cases

**Scenario: Error Banner 全站顯示且不可關閉**
- Given: 系統強制降級觸發硬邊界，Error Banner 已顯示
- When: 用戶切換至任何其他頁面
- Then: Error Banner 應持續顯示在頁面頂部
- And: Banner 不應有關閉按鈕或 dismiss 行為

**Scenario: 點擊 Banner「查看詳情」開啟 D3 Modal**
- Given: Error Banner 已顯示
- When: 用戶點擊「查看詳情」
- Then: D3 Modal 應彈出
- And: 應顯示標題「帳戶需要處理」
- And: 應列出需客服處理的項目
- And: 應顯示「聯繫客服」CTA
- And: 底部顯示「處理完成後將自動恢復上傳功能」

**Scenario: 系統強制降級不顯示 D1 勸退**
- Given: 系統觸發強制降級（非用戶主動）
- When: 系統執行降級流程
- Then: 不應顯示 D1 勸退 Modal（系統直接執行檢核）

### Error Handling

**Scenario: 客服處理完成後自動恢復**
- Given: 系統強制降級觸發硬邊界，上傳已暫停
- When: 客服處理完成所有觸發項目
- Then: 用戶方案應變更為目標方案
- And: 上傳功能應自動恢復
- And: Error Banner 應消失
- And: D3 Modal 應不再可觸發

---

## UI 驗證清單

基於 Wireframe v4.0 產出：

### 帳戶資訊頁（US-02, US-10）
- [ ] 方案名稱以 Badge 顯示（Card 內）
- [ ] 資訊列包含：方案名稱、計費週期、下次扣款日
- [ ] 「變更方案」Primary Button 導向方案選擇頁
- [ ] 待降級 State：Alert Banner 含日期與目標方案，「取消降級」Secondary Button

### 方案選擇頁（US-03, US-04）
- [ ] 4 欄 Pricing Grid（Desktop），2 欄（Tablet），1 欄（Mobile）
- [ ] 月繳/年繳 Toggle 切換即時更新所有價格
- [ ] 目前方案卡片：半透明 + Badge「目前方案」+ 不可點擊 CTA
- [ ] 推薦方案卡片：Primary 色邊框 + Badge「推薦」
- [ ] 試用 CTA 變體：「14 天免費試用 {Plan}」vs「升級到 {Plan}」
- [ ] 降級 CTA 使用 Ghost Button 樣式

### 升級成功頁（US-06）
- [ ] 置中佈局，max-width 520px
- [ ] 成功圖示 + 標題 + 副標 + 解鎖清單 + CTA
- [ ] 解鎖清單項目前有裝飾符號

### 側邊欄鎖頭（US-07）
- [ ] 鎖頭圖示為圓形背景 + 鎖 icon
- [ ] Tier Badge 標注所需方案（「需要 Pro」/「需要 Lite」）
- [ ] 點擊整列觸發 Paywall Modal

### Paywall Modal（US-08）
- [ ] Modal 寬度 480px，居中，遮罩 45%
- [ ] 鎖頭 icon + 功能名稱 + 功能說明 + Badge + CTA + 次要連結
- [ ] 右上角關閉按鈕可 dismiss

### D1 勸退 Modal（US-09）
- [ ] Modal 寬度 640px
- [ ] 警告 icon + 標題 + 失去功能列表（紅色叉號前綴）
- [ ] 按鈕列：「取消」Primary 在左、「仍要降級」Ghost 在右

### D2 攔截 Modal（US-12）
- [ ] Modal 寬度 640px
- [ ] 禁止 icon + 標題 + 項目卡片列表
- [ ] 按鈕列：「保留目前方案」Primary 在左、「我已截圖」Secondary 在右
- [ ] 底部 Help Text

### Error Banner + D3 Modal（US-13）
- [ ] Error Banner full-width、深灰底白字、不可關閉
- [ ] Banner 含「查看詳情」連結
- [ ] D3 Modal 寬度 640px
- [ ] 項目卡片帶左側紅色邊線（3px）
- [ ] 單一「聯繫客服」Primary CTA 置中

---

## 非功能性需求

### 效能
- [ ] 方案選擇頁首次載入 ≤ 2 秒（含方案資料與價格）
- [ ] 月繳/年繳 Toggle 切換 ≤ 100ms（純前端計算）
- [ ] Modal 開啟動畫 ≤ 200ms
- [ ] Stripe Checkout 重導 ≤ 3 秒
- [ ] 硬邊界檢核 API 回應 ≤ 1 秒

### 無障礙
- [ ] 所有 Modal 支援 `Escape` 鍵關閉（D3 Error Banner 除外）
- [ ] 所有 CTA 按鈕可 Tab 聚焦並以 Enter/Space 觸發
- [ ] 鎖頭圖示有 `aria-label`（「此功能需要 {Plan} 方案」）
- [ ] Modal 開啟時背景不可捲動
- [ ] Alert Banner 使用 `role="alert"`
- [ ] 色彩對比度符合 WCAG AA（4.5:1）

### 響應式
- [ ] Desktop（≥ 1280px）：方案 4 欄、Modal 居中
- [ ] Tablet（768px–1279px）：方案 2 欄、Modal 居中
- [ ] Mobile（< 768px）：方案 1 欄、Modal full-width 含 16px padding、按鈕 full-width
- [ ] 側邊欄 < 1024px 收合為 hamburger menu

---

## 相關檔案

| 類型 | 檔案 | 狀態 |
|------|------|------|
| PRD | `prd-v2.0-20260211.md` | ✅ 已存在 |
| User Story | `user-story-v2.2-20260212.md` | ✅ 已存在 |
| Wireframe | `wireframe-v4.0-20260212.html` | ✅ 已存在 |
| Prototype | — | ⬜ 尚未產出 |
| AC | `acceptance-criteria-v1.0-20260212.md` | ✅ 本文件 |

---

## 變更紀錄

| 版本 | 日期 | 變更內容 | 影響範圍 |
|------|------|----------|----------|
| v1.0 | 2026-02-12 | 初版：13 個 Story、67 個場景（Happy + Edge + Error），含 UI 驗證清單與非功能性需求 | AC |
