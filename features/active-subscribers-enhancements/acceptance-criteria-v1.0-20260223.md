# Acceptance Criteria: 活躍訂閱者名單 - 三項功能新增

**Feature Slug：** active-subscribers-enhancements
**版本：** v1.0
**日期：** 2026-02-23
**狀態：** Draft
**前序產物：** prd-v1.0-20260223.md, user-story-v1.0-20260223.md

> ⚠️ 注意：依 SDD 依賴鏈，AC 上游應含 wireframe，但 wireframe 尚未產出。本文件先行產出供審閱，待 wireframe 完成後需回頭確認是否需要補充或調整。

---

## 總覽

| Story ID | Story Title | 場景數 | 覆蓋類型 |
|----------|-------------|--------|----------|
| US-01 | 顯示訂閱週期欄位 | 3 | Happy, Edge, Error |
| US-02 | 週期欄位缺值處理 | 3 | Happy, Edge, Error |
| US-03 | 單欄位排序切換機制 | 4 | Happy, Happy, Edge, Error |
| US-04 | 文字與 ID 欄位排序邏輯 | 3 | Happy, Happy, Edge |
| US-05 | 數值與日期欄位排序邏輯 | 3 | Happy, Happy, Edge |
| US-06 | 搜尋欄位 UI 與即時過濾 | 3 | Happy, Edge, Error |
| US-07 | 多欄位模糊比對邏輯 | 4 | Happy, Happy, Edge, Edge |
| US-08 | 搜尋無結果空狀態 | 3 | Happy, Edge, Error |
| US-09 | 排序與搜尋交互整合 | 4 | Happy, Happy, Edge, Error |

---

## US-01: 顯示訂閱週期欄位

### Scenario 1: 月方案訂閱者顯示正確週期 (Happy)

- **Given** 活躍訂閱者名單頁面已載入，且某訂閱者的 Stripe subscription interval 為 month
- **When** 頁面渲染完成
- **Then** 該訂閱者列的「週期」欄位顯示「月方案」，且「週期」欄位位於「方案」欄位右側

### Scenario 2: 年方案訂閱者顯示正確週期 (Edge)

- **Given** 活躍訂閱者名單頁面已載入，且某訂閱者的 Stripe subscription interval 為 year
- **When** 頁面渲染完成
- **Then** 該訂閱者列的「週期」欄位顯示「年方案」

### Scenario 3: 頁面載入失敗時週期欄位不導致額外錯誤 (Error)

- **Given** 活躍訂閱者名單頁面因網路問題載入失敗
- **When** 頁面顯示錯誤狀態
- **Then** 頁面顯示統一的錯誤提示，不因「週期」欄位而產生額外錯誤訊息

---

## US-02: 週期欄位缺值處理

### Scenario 1: interval 欄位缺失時顯示預設值 (Happy)

- **Given** 某訂閱者的 Stripe subscription 無 interval 欄位
- **When** 頁面載入該筆資料
- **Then** 該訂閱者的「週期」欄位顯示「-」

### Scenario 2: 部分訂閱者缺值不影響其他正常資料 (Edge)

- **Given** 清單中有 10 筆訂閱者，其中 2 筆缺少 interval 欄位
- **When** 頁面載入完成
- **Then** 缺值的 2 筆顯示「-」，其餘 8 筆正常顯示「月方案」或「年方案」

### Scenario 3: interval 欄位值為非預期值 (Error)

- **Given** 某訂閱者的 Stripe subscription interval 回傳非 month 或 year 的值（如 week）
- **When** 頁面載入該筆資料
- **Then** 該訂閱者的「週期」欄位顯示「-」，不顯示錯誤訊息

---

## US-03: 單欄位排序切換機制

### Scenario 1: 首次點擊欄位標題觸發升序 (Happy)

- **Given** 頁面處於未排序狀態
- **When** 點擊「Email」欄位標題一次
- **Then** 清單依 Email 升序排列，該欄位標題旁顯示升序箭頭圖示，其餘欄位標題無箭頭圖示

### Scenario 2: 連續點擊同一欄位完成三態切換 (Happy)

- **Given** 「Email」欄位目前為升序狀態
- **When** 再次點擊「Email」欄位標題
- **Then** 清單依 Email 降序排列，該欄位標題旁顯示降序箭頭圖示

### Scenario 3: 切換排序欄位時前一欄位排序自動取消 (Edge)

- **Given** 「Email」欄位目前為升序狀態
- **When** 點擊「累計金額」欄位標題
- **Then** 清單依累計金額升序排列，「累計金額」欄位標題旁顯示升序箭頭圖示，「Email」欄位標題旁箭頭圖示消失

### Scenario 4: 第三次點擊同一欄位回到未排序 (Edge)

- **Given** 「Email」欄位目前為降序狀態
- **When** 再次點擊「Email」欄位標題
- **Then** 清單回到預設排列順序，所有欄位標題旁均無箭頭圖示

---

## US-04: 文字與 ID 欄位排序邏輯

### Scenario 1: 方案欄位依業務順序排序 (Happy)

- **Given** 清單含有 LITE、PRO、STUDIO、ENTERPRISE 方案的訂閱者
- **When** 點擊「方案」欄位標題升序排序
- **Then** 清單依 LITE → PRO → STUDIO → ENTERPRISE 順序排列

### Scenario 2: 週期欄位依月→年排序 (Happy)

- **Given** 清單含有「月方案」與「年方案」的訂閱者
- **When** 點擊「週期」欄位標題升序排序
- **Then** 「月方案」排在「年方案」之前

### Scenario 3: 週期欄位含缺值時的排序行為 (Edge)

- **Given** 清單含有「月方案」、「年方案」及「-」（缺值）的訂閱者
- **When** 點擊「週期」欄位標題升序排序
- **Then** 「-」排在最後，前面依「月方案」→「年方案」順序排列

---

## US-05: 數值與日期欄位排序邏輯

### Scenario 1: 累計金額依數值大小排序 (Happy)

- **Given** 清單中訂閱者的累計金額各不相同
- **When** 點擊「累計金額」欄位標題升序排序
- **Then** 清單由金額最少排到最多

### Scenario 2: 首次訂閱依日期排序 (Happy)

- **Given** 清單中訂閱者的首次訂閱日期各不相同
- **When** 點擊「首次訂閱」欄位標題降序排序
- **Then** 清單由最近日期排到最早日期

### Scenario 3: 節目欄位依節目數量排序 (Edge)

- **Given** 清單中訂閱者擁有的節目數量分別為 1、3、5
- **When** 點擊「節目」欄位標題升序排序
- **Then** 清單依節目數量 1 → 3 → 5 排列

---

## US-06: 搜尋欄位 UI 與即時過濾

### Scenario 1: 輸入 Email 片段即時過濾 (Happy)

- **Given** 頁面已載入完整訂閱者清單，搜尋欄位為空
- **When** 在搜尋欄位輸入某訂閱者的 Email 片段（如「john」）
- **Then** 清單即時過濾，僅顯示 Email、User ID、節目名稱、Show ID 或週期包含「john」的訂閱者

### Scenario 2: 清空搜尋欄位恢復完整清單 (Edge)

- **Given** 搜尋欄位已輸入關鍵字且清單已篩選
- **When** 清空搜尋欄位內容
- **Then** 清單恢復顯示所有訂閱者

### Scenario 3: 搜尋欄位 Placeholder 正確顯示 (Edge)

- **Given** 頁面已載入，搜尋欄位為空
- **When** 搜尋欄位未獲得焦點
- **Then** 搜尋欄位顯示 Placeholder 文字「搜尋 Email、User ID、節目名稱或 Show ID...」

---

## US-07: 多欄位模糊比對邏輯

### Scenario 1: 不分大小寫比對 (Happy)

- **Given** 某訂閱者的節目名稱包含「Podcast」
- **When** 在搜尋欄位輸入「podcast」（全小寫）
- **Then** 該訂閱者出現在篩選結果中

### Scenario 2: Show ID 可被搜尋比對 (Happy)

- **Given** 某訂閱者的 Show ID 為「cl2ic0mrn0000q1vdgqpscajx」
- **When** 在搜尋欄位輸入「cl2ic0」
- **Then** 該訂閱者出現在篩選結果中

### Scenario 3: 關鍵字同時匹配多欄位時結果不重複 (Edge)

- **Given** 某訂閱者的 Email 為「pro@test.com」且方案為 PRO
- **When** 在搜尋欄位輸入「pro」
- **Then** 該訂閱者在篩選結果中僅出現一次

### Scenario 4: 搜尋週期欄位值 (Edge)

- **Given** 清單中有「月方案」和「年方案」的訂閱者
- **When** 在搜尋欄位輸入「年方案」
- **Then** 僅顯示週期為「年方案」的訂閱者

---

## US-08: 搜尋無結果空狀態

### Scenario 1: 無匹配時顯示空狀態提示 (Happy)

- **Given** 搜尋欄位為空，清單顯示所有訂閱者
- **When** 在搜尋欄位輸入一段不匹配任何訂閱者的關鍵字（如「zzzznotexist」）
- **Then** 表格區域顯示空狀態提示文字，清單不顯示任何訂閱者列

### Scenario 2: 空狀態下繼續修改搜尋可恢復結果 (Edge)

- **Given** 搜尋欄位已輸入不匹配的關鍵字，頁面顯示空狀態
- **When** 修改搜尋欄位內容為有匹配結果的關鍵字
- **Then** 清單即時恢復顯示匹配的訂閱者，空狀態提示消失

### Scenario 3: 搜尋僅輸入空白字元 (Error)

- **Given** 頁面已載入完整訂閱者清單
- **When** 在搜尋欄位僅輸入空白字元（如空格）
- **Then** 清單顯示所有訂閱者，等同未輸入搜尋條件

---

## US-09: 排序與搜尋交互整合

### Scenario 1: 篩選後再排序 (Happy)

- **Given** 搜尋欄位已輸入關鍵字且清單已篩選為 5 筆結果
- **When** 點擊「首次訂閱」欄位標題升序排序
- **Then** 這 5 筆篩選結果依首次訂閱日期由舊到新排列

### Scenario 2: 已排序狀態下輸入搜尋 (Happy)

- **Given** 「累計金額」欄位目前為降序排序狀態
- **When** 在搜尋欄位輸入關鍵字
- **Then** 篩選後的結果仍維持累計金額降序排列

### Scenario 3: 搜尋後切換排序欄位 (Edge)

- **Given** 搜尋欄位已輸入關鍵字，且「Email」欄位為升序排序
- **When** 點擊「付款次數」欄位標題
- **Then** 篩選結果改為依付款次數升序排列，「Email」欄位箭頭消失，「付款次數」欄位顯示升序箭頭

### Scenario 4: 清空搜尋後排序狀態保持 (Edge)

- **Given** 搜尋欄位已輸入關鍵字，且「累計金額」欄位為升序排序
- **When** 清空搜尋欄位
- **Then** 清單恢復顯示所有訂閱者，且仍維持累計金額升序排列

---

## 相關檔案

| 類型 | 檔案 | 狀態 |
|------|------|------|
| PRD | prd-v1.0-20260223.md | ✅ 已存在 |
| User Story | user-story-v1.0-20260223.md | ✅ 已存在 |
| Wireframe | wireframe-v{ver}-{date}.html | ⬜ 尚未產出 |
| AC | acceptance-criteria-v1.0-20260223.md | ✅ 本文件 |

---

## 變更紀錄

| 版本 | 日期 | 變更內容 | 影響範圍 |
|------|------|----------|----------|
| v1.0 | 2026-02-23 | 初版 | AC |
