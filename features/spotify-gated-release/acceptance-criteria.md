# Acceptance Criteria: Spotify Gated Release

**Feature Slug：** spotify-gated-release

---

## 總覽

| Story | 場景數 | 覆蓋類型 |
|-------|--------|---------|
| US-01: API 整合 RSS 下載數與 Spotify 串流數為「收聽數」 | 8 | Happy + Edge + Error |
| US-02: Dashboard + Analytics Overview 顯示收聽數取代下載數 | 7 | Happy + Edge + Error |
| US-03: 以寫死名單控制灰階釋出權限 | 4 | Happy + Edge |
| US-04: 頁面根據權限切換指標顯示 | 5 | Happy + Edge + Error |

---

## EP-01: 收聽數指標整合

---

## US-01: API 整合 RSS 下載數與 Spotify 串流數為「收聽數」

### Happy Path

**Scenario: 成功取得合併收聽數**
- Given: 用戶有灰階權限
- And: 資料庫中有 RSS unique downloads = 100、Spotify streams = 50
- When: 前端呼叫收聽數 API
- Then: 應回傳收聽數 = 150

**Scenario: 成功取得合併重複收聽數**
- Given: 用戶有灰階權限
- And: 資料庫中有 RSS downloads = 200、Spotify plays = 80
- When: 前端呼叫收聽數 API
- Then: 應回傳重複收聽數 = 280

**Scenario: 成功取得單集平均收聽數**
- Given: 用戶有灰階權限
- And: 收聽數 = 150、集數 = 10
- When: 前端呼叫收聽數 API
- Then: 應回傳單集平均收聽數 = 15

**Scenario: 成功取得單集平均重複收聽數**
- Given: 用戶有灰階權限
- And: 重複收聽數 = 280、集數 = 10
- When: 前端呼叫收聽數 API
- Then: 應回傳單集平均重複收聽數 = 28

### Edge Cases

**Scenario: 僅有 RSS 數據而無 Spotify 數據時仍正確合併**
- Given: 用戶有灰階權限
- And: RSS unique downloads = 100、Spotify streams = 0（無數據）
- When: 前端呼叫收聽數 API
- Then: 應回傳收聽數 = 100（Spotify 部分視為 0）

**Scenario: 集數為零時單集平均收聽數的處理**
- Given: 用戶有灰階權限
- And: 收聽數 = 0、集數 = 0
- When: 前端呼叫收聽數 API
- Then: 應回傳單集平均收聽數 = 0（不應拋出除以零錯誤）

### Error Handling

**Scenario: 無權限用戶被拒絕**
- Given: 用戶不在灰階名單中
- When: 嘗試呼叫收聽數 API
- Then: 應回傳 403 Forbidden

**Scenario: Spotify 數據源暫時不可用時 API 仍能回應**
- Given: 用戶有灰階權限
- And: Spotify 數據源連線逾時
- When: 前端呼叫收聽數 API
- Then: 應回傳僅含 RSS 數據的結果，並在回應中標註 Spotify 數據不可用

---

## US-02: Dashboard + Analytics Overview 顯示收聽數取代下載數

### Happy Path

**Scenario: Dashboard 顯示收聽數取代下載數**
- Given: 灰階用戶已登入且 API 成功回傳合併指標
- When: 用戶進入 `/dashboard`
- Then: 第一張卡片應顯示「收聽數」取代原「下載數」
- And: 第二張卡片應顯示「重複收聽數」取代原「重複下載數」

**Scenario: Analytics Overview 收聽數與重複收聽數正確顯示**
- Given: 灰階用戶已登入且 API 回傳收聽數 = 12345、重複收聽數 = 15678
- When: 用戶進入 `/podcast/analytics/overview`
- Then: 主指標應顯示「收聽數 12,345」
- And: 次指標應顯示「重複收聽數 15,678」

**Scenario: 生涯累計區塊顯示四項指標**
- Given: 灰階用戶已登入且 API 成功回傳合併指標
- When: 用戶進入 `/podcast/analytics/overview`
- Then: 生涯累計區塊應顯示：收聽數、重複收聽數、單集平均收聽數、單集平均重複收聽數

**Scenario: 趨勢圖顯示 Spotify 實際數據與加總**
- Given: 灰階用戶已登入
- When: 用戶在 Analytics Overview 趨勢圖 hover 某日期
- Then: Tooltip 應顯示「Apple / 其他 RSS {N}」「Spotify {N}」「總計 {N}」三行數據

### Edge Cases

**Scenario: Dashboard 移除舊版更新提示 alert**
- Given: 灰階用戶已登入
- When: 用戶進入 `/dashboard`
- Then: 不應顯示「下載數每 3 小時更新一次…」的 alert 提示

**Scenario: 趨勢圖圖例從「即將推出」改為顯示名稱**
- Given: 灰階用戶已登入
- When: 用戶查看 Analytics Overview 趨勢圖
- Then: 圖例應顯示「Apple / 其他 RSS」與「Spotify」
- And: 不應出現「即將推出」字樣

### Error Handling

**Scenario: 收聽數 Tooltip 正確顯示定義**
- Given: 灰階用戶已登入
- When: 用戶 hover 收聽數旁的 ? 圖示
- Then: 應顯示「Apple 等其他 RSS 平台不重複下載數(unique downloads) + Spotify 串流數(streams)」

---

## EP-02: Gated Access 權限控制

---

## US-03: 以寫死名單控制灰階釋出權限

### Happy Path

**Scenario: 名單內的用戶獲得灰階權限**
- Given: 用戶 ID 為 "user-abc" 且在寫死的灰階名單中
- When: 系統檢查該用戶的灰階權限
- Then: 應回傳「已啟用」

**Scenario: 名單外的用戶無灰階權限**
- Given: 用戶 ID 為 "user-xyz" 且不在灰階名單中
- When: 系統檢查該用戶的灰階權限
- Then: 應回傳「未啟用」

### Edge Cases

**Scenario: 空字串用戶 ID 無灰階權限**
- Given: 用戶 ID 為空字串
- When: 系統檢查該用戶的灰階權限
- Then: 應回傳「未啟用」

**Scenario: 名單大小寫敏感性**
- Given: 灰階名單中有 "user-abc"
- And: 查詢的用戶 ID 為 "User-ABC"
- When: 系統檢查該用戶的灰階權限
- Then: 應依據實際 ID 格式規則回傳正確結果（大小寫敏感）

---

## US-04: 頁面根據權限切換指標顯示

### Happy Path

**Scenario: 灰階用戶在 Dashboard 看到新版指標**
- Given: 用戶在灰階名單中
- When: 用戶進入 `/dashboard`
- Then: 應顯示「收聽數」與「重複收聽數」卡片
- And: 不應顯示舊版更新提示 alert

**Scenario: 灰階用戶在 Analytics Overview 看到新版指標**
- Given: 用戶在灰階名單中
- When: 用戶進入 `/podcast/analytics/overview`
- Then: 應顯示「收聽數」「重複收聽數」「單集平均收聽數」「單集平均重複收聽數」

**Scenario: 非灰階用戶看到舊版指標**
- Given: 用戶不在灰階名單中
- When: 用戶進入 `/dashboard` 或 `/podcast/analytics/overview`
- Then: 應維持顯示原本的「下載數」與「重複下載數」，無任何變化

### Edge Cases

**Scenario: 非灰階用戶不應看到 Spotify 合併數據**
- Given: 用戶不在灰階名單中
- When: 用戶在 Analytics Overview 趨勢圖 hover 某日期
- Then: Spotify 圖例應仍顯示「Spotify (即將推出)」且無數字

### Error Handling

**Scenario: 用戶被移出灰階名單後重新載入頁面**
- Given: 用戶原本在灰階名單中且正在查看新版指標
- And: 管理員將該用戶從名單中移除
- When: 用戶重新整理頁面
- Then: 應回到舊版指標顯示

---

## UI 驗證清單

### Dashboard（/dashboard）

- [ ] 灰階用戶：第一張卡片標題為「收聽數」，含 ? tooltip
- [ ] 灰階用戶：第二張卡片標題為「重複收聽數」，含 ? tooltip
- [ ] 灰階用戶：不顯示「下載數每 3 小時更新一次…」alert
- [ ] 灰階用戶：「查看詳情 →」連結可正常導向 Analytics Overview
- [ ] 非灰階用戶：維持「下載數」「重複下載數」卡片，含舊版 alert

### Analytics Overview（/podcast/analytics/overview）

- [ ] 灰階用戶：主指標顯示「收聽數」，含 ? tooltip 顯示定義
- [ ] 灰階用戶：次指標顯示「重複收聽數」，含 ? tooltip 顯示定義
- [ ] 灰階用戶：趨勢圖圖例為「Apple / 其他 RSS」+「Spotify」（無「即將推出」）
- [ ] 灰階用戶：趨勢圖 hover tooltip 顯示 Apple + Spotify + 總計 三行
- [ ] 灰階用戶：生涯累計 4 格 — 收聽數、重複收聽數、單集平均收聽數、單集平均重複收聽數
- [ ] 灰階用戶：單集平均收聽數、單集平均重複收聽數含 ? tooltip
- [ ] 非灰階用戶：維持「下載數」「重複下載數」「單集平均下載數」（3 格）
- [ ] 非灰階用戶：趨勢圖圖例含「Spotify (即將推出)」且無數字

---

## 非功能性需求

- [ ] 效能：收聽數 API 回應時間 < 2 秒（含 Spotify 數據合併）
- [ ] 快取：Spotify 數據可接受延遲（非即時），需有快取策略
- [ ] 向下相容：非灰階用戶體驗完全不受影響，零視覺差異
- [ ] 可移除性：全量釋出時移除 feature flag 即可，無殘留邏輯

---

## 待確認項目

- [ ] ⚠ 單集平均（重複）收聽數的分母是「集數」還是「公開集數」？（影響 US-01 API 邏輯 + US-02 tooltip 文字）

---

## 相關檔案

| 類型 | 檔案 | 狀態 |
|------|------|------|
| PRD | `prd.md` | ⬜ 尚未產出（最速模式） |
| User Story | `user-story.md` | ✅ 已存在 |
| Wireframe | `wireframe.html` | ✅ 已存在 |
| Prototype | `prototype.html` | ⬜ 尚未產出 |
| AC | `acceptance-criteria.md` | ✅ 本文件 |
