# Feature: 設計系統補全（模組層 + 產品介面層）

**Feature Slug：** design-system-module-ui
**版本：** v1.0
**日期：** 2026-02-23
**狀態：** Draft
**前序產物：** MASTER.md v2.1.0（設計原則、Tokens、元件規範已完成）

---

## 概述

### 問題陳述

- **痛點描述（嚴重程度：7/10）**：Firstory Studio 設計系統目前已完成「設計原則」、「Design Tokens」、「基礎元件」三層，但缺少第四層「模組（Modules）」和第五層「產品介面（Product UI）」。工程師在開發具體頁面時，必須自行決定如何將基礎元件組合成統計卡片群組、資料儀表板、設定頁佈局等複合 UI，導致各頁面組合邏輯不一致、Token 使用不統一。

- **不解決的後果**：
  - 同一個「統計數字 + 標籤 + 趨勢箭頭」組合，不同工程師各自實作，增加維護成本
  - 新頁面缺乏參考規範，開發時需反覆確認設計師，拉長交付週期
  - 現有 SCAN_RULES.md 無法掃描模組層違規，健康分數失真
  - 設計師交接時缺少完整的系統層次，無法做到「設計即文件」

### 目標用戶

- **主要用戶（內部）**：Firstory Studio 工程師（目前由 Ray 負責 SaaS 前端）
- **間接受益**：Firstory 創作者（最終使用這些介面）→ 成長撞牆期專業創作者（ICP）
- **現有替代方案**：工程師依賴 MASTER.md 元件層 + 對現有頁面的逆向工程，每次「創作」而非「遵循規範」

### 成功指標

| 指標 | 目標值 | 說明 |
|------|--------|------|
| 模組規範覆蓋率 | 5–8 個模組 100% 文件化 | 涵蓋 Studio 主要功能場景 |
| 產品介面規範覆蓋率 | 3–5 個頁面 100% 文件化 | 涵蓋高使用頻率頁面 |
| SCAN_RULES 更新 | 納入模組 + 產品介面規則 | 可機器掃描 |
| MASTER.md 更新 | 新增 Section 7 + Section 8 | 版本升至 v2.1.0 |
| 工程師反饋 | 下次新頁面開發不需再問設計師確認組合方式 | 定性指標 |

---

## 名詞定義

| 名詞 | 定義 |
|------|------|
| **模組（Module）** | 由基礎元件（Button、Card、Badge 等）組合而成的複合 UI 單元，對應特定功能場景（例：統計卡片群、節目列表項目）。尚未構成完整頁面，但比單一元件更大 |
| **產品介面（Product UI）** | 由多個模組構成的完整頁面，對應具體使用者任務（例：節目管理總覽頁、節目數據頁）|
| **設計對齊（Alignment）** | 確保程式碼實作與設計規範（MASTER.md）的值一致，消除 "documented but not coded" 和 "coded but not documented" 兩種漂移 |
| **MASTER.md** | 設計系統主規範文件，目前為 v2.1.0，包含 Section 0–6 |
| **SCAN_RULES.md** | 定義自動掃描規則的文件，用於 Phase 1 健康檢查 |
| **Phase 1–4** | 設計對齊執行流程的四個階段（健康檢查、文件補全、代碼對齊、驗證收尾） |
| **Token** | 設計系統的最小決策單元，如 `--primary`、`--space-4`、`--radius-md` |

---

## 功能範圍

### 核心功能（MVP）

**模組層（Section 7，5–8 個模組）**

以下為候選模組清單（工程師依實際掃描結果確認，順序不代表優先級）：

1. **統計卡片（Stat Card）**：數字指標 + 標籤 + 趨勢箭頭 + 比較區間
2. **節目列表項目（Show List Item）**：節目封面 + 名稱 + 狀態 badge + 操作 menu
3. **單集列表項目（Episode List Item）**：縮圖 + 標題 + 發布日期 + 下載數 + 狀態 + 操作
4. **平台分發卡（Distribution Card）**：平台 logo + 連結狀態 + 操作按鈕
5. **訂閱計劃卡（Subscription Plan Card）**：方案名稱 + 價格 + 功能清單 + CTA
6. **廣告版位設定列（Ad Slot Config Row）**：版位名稱 + 開關 toggle + 參數顯示
7. **數據圖表模組（Analytics Chart Module）**：時間軸 + 圖表區 + 數據標籤
8. **受眾偏好圖（Audience Preference Chart）**：圓餅/長條 + 分類標籤 + 百分比

> 工程師需在 Phase 1 掃描現有頁面後，對照上述候選清單，確認哪些模組已在代碼中存在但未文件化（Undocumented），哪些是全新需要建立的。

**產品介面層（Section 8，3–5 個頁面）**

候選頁面（依高使用頻率排序）：

1. **節目管理總覽頁（Shows Overview）**：節目列表 + 新增入口 + 快速數據
2. **單集管理頁（Episodes List）**：單集列表 + 篩選 + 批次操作
3. **節目數據儀表板（Analytics Dashboard）**：統計卡片群 + 趨勢圖 + 受眾模組
4. **設定頁（Settings）**：分類設定 section + 表單區塊 + 操作區
5. **廣告管理頁（Ad Management）**：廣告列表 + 版位設定 + 狀態篩選

**流程（Phase 1–4）**

工程師需跑完整四個階段（細節見「用戶旅程」章節）。

### 明確不做

- 不新增設計系統目前沒有的 Token（顏色、間距、圓角）
- 不引入新的技術框架或第三方元件庫
- 不調整既有 Section 0–6 的現有規範
- 不產出 Storybook 或互動式元件文件（屬另一個獨立 feature）
- 不規定模組或頁面的 HTML/CSS 具體實作語法
- 不涵蓋行動裝置（Mobile）頁面，僅桌面佈局

### 未來考慮

- 模組的互動狀態規範（Hover、Focus、Selected、Disabled 的模組級行為）
- Dark mode 下模組的特殊處理
- 動態廣告（DAI）相關模組
- Storybook 整合

---

## 用戶旅程

**入口**：工程師收到本 PRD，進入 `design-system-alignment-package/` 目錄，從現有 MASTER.md 和 SCAN_RULES.md 出發

**Happy Path（Phase 1–4 執行流程）：**

1. **Phase 1：健康檢查（Scan & Audit）**
   - 工程師更新 `SCAN_RULES.md`，加入模組組合規則和產品介面佈局規則
   - 掃描現有 codebase，找出已在代碼中存在但未文件化的模組模式
   - 掃描產品頁面，找出已實作但規範未定義的頁面佈局
   - 更新 `TOKEN_REGISTRY.md`，補充模組層所需的語義 token（如有）
   - 更新 `SYNC_STATUS.md`，填入模組層和產品介面層的 Section E（Undocumented）
   - 更新 `design-system.html`，新增模組 Gallery 預覽區

2. **Phase 2：文件補全（Document）**
   - 在 `MASTER.md` 中新增 Section 7（模組層）：為每個確認的模組定義組合規則、使用場景、禁止組合
   - 在 `MASTER.md` 中新增 Section 8（產品介面層）：為每個確認的頁面定義佈局模式、模組使用規則
   - 更新 `SCAN_RULES.md`，加入新增的規則項目（Section 8 模組規則、Section 9 產品介面規則）
   - 更新 `MAINTENANCE.md`，納入模組和產品介面的維護指南

3. **Phase 3：代碼對齊（Code）**
   - 提交 **PR: Modules**（模組層代碼補全或修正）
   - 提交 **PR: Product UI**（產品介面層代碼補全或修正）
   - 兩個 PR 需包含：對應 MASTER.md Section 7/8 的規範文件引用

4. **Phase 4：驗證收尾（Verify & Wrap）**
   - 重新執行掃描，確認 SYNC_STATUS.md 的 Section E 已清零（無 Undocumented 項目）
   - 更新 `CHANGELOG.md`，新增版本條目
   - MASTER.md 版本從 v2.0.0 升至 v2.1.0

**分支路徑：**

- 掃描發現模組超過 8 個 → 工程師與 PM 確認，決定哪些納入此次範圍，剩餘列入 backlog
- 掃描發現某頁面模組組合違反現有反模式規範 → 標記為高優先修正，在 Phase 3 PR 中處理
- MASTER.md Section 7/8 文件化後發現現有 Token 不足以描述模組狀態 → 走 Token 補充流程（新增至 TOKEN_REGISTRY.md），但不得引入設計系統外的值

---

## 限制與邊界

| 類型 | 說明 |
|------|------|
| Edge Case | 某些模組可能同時出現在多個頁面，規範需描述「通用狀態」，不鎖定特定頁面情境 |
| Edge Case | Token 命名空間：模組 token 須明確區別為模組語義 token vs. 元件 token，避免命名衝突 |
| 業務限制 | MASTER.md 版本升級需同步通知設計師，確保 Figma 端對齊 |
| 業務限制 | 模組規範描述的是「什麼狀態是正確的」，不決定工程師採用哪種 React 元件結構 |
| 業務限制 | 此次產品介面層聚焦桌面（≥1024px），響應式行為在「未來考慮」中處理 |
| 範圍邊界 | 本次不包含 MAINTENANCE.md 和 CHANGELOG.md 以外的流程文件 |

---

## 依賴關係

| 依賴類型 | 說明 |
|----------|------|
| **前置文件** | MASTER.md v2.1.0（Section 0–6）已完成，是模組和產品介面規範的基礎 |
| **前置文件** | SCAN_RULES.md v1.0 已完成，Phase 1 掃描的基礎規則 |
| **工具** | 工程師需有目標 codebase 的讀寫權限（指定路徑 TBD by 工程師） |
| **其他功能依賴** | 本 PRD 不依賴其他進行中功能，可獨立啟動 |
| **業務風險** | 若 Ray（負責工程師）同時有 Q1 Roadmap 任務（影音與數據整合），需確認排程優先序 |
| **業務風險** | Figma 設計稿是否已有對應的模組和頁面設計？若無，工程師需先以「逆向工程現有頁面」為基礎定義規範 |

---

## 範圍比較

| 維度 | MVP | 標準版 | 理想版 |
|------|-----|--------|--------|
| 模組數量 | 5 個（核心功能場景） | 8 個（涵蓋主要頁面） | 12+ 個（含廣告、訂閱所有場景） |
| 產品介面 | 3 個頁面 | 5 個頁面 | 全部頁面（10+ 頁） |
| 掃描規則 | 基礎模組組合規則（5 條） | 完整模組 + 產品介面規則（15+ 條） | 可 CI 自動執行的掃描腳本 |
| 文件格式 | Markdown 條列規範 | Markdown + ASCII 示意圖 | 互動式 Gallery + Storybook |
| 時程 | 1–2 週 | 3–4 週 | 6–8 週 |
| 風險 | 低（文件為主） | 低–中（有代碼 PR） | 中（架構決策多） |

---

## 開放問題

- [ ] 目標 codebase 路徑為何？需工程師在 Phase 1 開始前確認
- [ ] MASTER.md 版本升級（v2.0.0 → v2.1.0）是否需要設計師會簽？
- [ ] 「廣告版位設定列」和「廣告管理頁」是否在本次範圍，或等 Q1 Ads 精準投放完成後再定義？
- [ ] design-system.html Gallery 的新增格式：是否沿用現有靜態 HTML，或有其他工具偏好？
- [ ] PR: Modules 和 PR: Product UI 是否可以一個 PR，或需強制分開？

---

## 交付物清單

工程師完成 Phase 1–4 後，需交付以下所有檔案（路徑相對於 `design-system/` 目錄）：

| 檔案 | 說明 | Phase | 狀態 |
|------|------|-------|------|
| `TOKEN_REGISTRY.md` | 更新：加入模組語義 token（如有新增） | 1 | ⬜ 待執行 |
| `SYNC_STATUS.md` | 更新：含模組層、產品介面層的差異報告 | 1, 4 | ⬜ 待執行 |
| `design-system.html` | 更新：新增模組預覽 Gallery 區塊 | 1 | ⬜ 待執行 |
| `MASTER.md` | 更新：新增 Section 7（模組）、Section 8（產品介面） | 2 | ⬜ 待執行 |
| `SCAN_RULES.md` | 更新：加入模組組合規則、產品介面佈局規則 | 2 | ⬜ 待執行 |
| `MAINTENANCE.md` | 新建：納入模組和產品介面的維護指南 | 2 | ⬜ 待執行 |
| `CHANGELOG.md` | 新建：新增 v2.1.0 版本條目 | 4 | ⬜ 待執行 |
| PR: Modules | 模組層相關程式碼補全或修正 | 3 | ⬜ 待執行 |
| PR: Product UI | 產品介面層相關程式碼補全或修正 | 3 | ⬜ 待執行 |

---

## 策略對齊

| 面向 | 對齊說明 |
|------|----------|
| **ICP** | 本 PRD 為內部工程基礎設施工作。最終受益者是使用 Firstory Studio 的撞牆期專業創作者（ICP），透過更一致的 UI 降低認知負擔，提升使用體驗和留存 |
| **NSM** | 路徑：設計系統一致性 → 工程師交付速度提升 → 功能更快上線 → 更好的用戶體驗 → Retention Rate 提升 → NSM（Monthly Active Meaningfully Commercialized Creators）正向貢獻 |
| **Roadmap 2026** | Q1/Q2 SaaS「整合」主軸需要新增頁面（Team management、Video Podcast），本 PRD 建立的模組規範可直接加速這些頁面的開發速度；屬 Q1 前置基礎工作 |

---

## 相關檔案

| 類型 | 檔案 | 狀態 |
|------|------|------|
| PRD | `prd/design-system-module-ui-v1.0-20260223.md` | ✅ 本文件 |
| 現有規範 | `design-system/MASTER.md` v2.1.0 | ✅ 已存在（前置依賴） |
| 現有規範 | `design-system/SCAN_RULES.md` v1.0 | ✅ 已存在（前置依賴） |
| 現有文件 | `design-system/SYNC_STATUS.md` | ✅ 已存在（待更新） |
| 現有文件 | `design-system/TOKEN_REGISTRY.md` | ✅ 已存在（待更新） |

---

## 變更紀錄

| 版本 | 日期 | 變更內容 | 影響範圍 |
|------|------|----------|----------|
| v1.0 | 2026-02-23 | 初版：定義模組層和產品介面層補全範圍 | PRD |
