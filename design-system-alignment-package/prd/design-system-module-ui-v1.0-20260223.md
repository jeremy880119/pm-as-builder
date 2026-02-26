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
| Phase 2 收斂完成率 | 收斂目標達標百分比 ≥ 90% | Phase 2 各層指標達標比例 |
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
| **Phase 1–5** | 設計對齊執行流程的五個階段（健康檢查、收斂與精簡、文件補全、代碼對齊、驗證收尾） |
| **收斂與精簡（Converge & Simplify）** | Phase 1 掃描後，對設計系統全部五層（原則、Token、元件、模組、產品介面）進行冗餘偵測與精簡，確立乾淨基線後再擴張 |
| **Deprecation Manifest** | 由 PRUNE 掃描自動產生的廢棄/合併/保留動作清單，PM + 設計師一次性會簽，不逐項審批 |
| **PRUNE 規則** | SCAN_RULES 的擴充類別，專門偵測冗餘（vs. 現有規則偵測違規），規則 ID 格式 `PRUNE-{LAYER}-{NNN}` |
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

**流程（Phase 1–5）**

工程師需跑完整五個階段（細節見「用戶旅程」章節）。

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

**Happy Path（Phase 1–5 執行流程）：**

1. **Phase 1：健康檢查（Scan & Audit）**
   - 工程師更新 `SCAN_RULES.md`，加入模組組合規則和產品介面佈局規則
   - 掃描現有 codebase，找出已在代碼中存在但未文件化的模組模式
   - 掃描產品頁面，找出已實作但規範未定義的頁面佈局
   - 更新 `TOKEN_REGISTRY.md`，補充模組層所需的語義 token（如有）
   - 更新 `SYNC_STATUS.md`，填入模組層和產品介面層的 Section E（Undocumented）
   - 更新 `design-system.html`，新增模組 Gallery 預覽區

2. **Phase 2：收斂與精簡（Converge & Simplify）**

   執行原則：**偵測自動化、決策一次性、傳播自動化**

   - **Step 1 — 執行 PRUNE 掃描（自動）**
     - 對五層各執行 PRUNE 規則，輸出 `pruning-report.json`
     - 五層掃描範圍：

     | 層 | PRUNE 規則 | 偵測什麼 |
     |----|-----------|---------|
     | 設計原則 | PRUNE-PRINCIPLE-001/002 | 無法追溯到下游決策的原則、語義重疊的原則 |
     | Token — 顏色 | PRUNE-TOKEN-001~005 | 感知相似色（ΔE < 5）、值完全相同的 token、未被引用的 token、新舊雙系統重疊、無下游引用的 primitive |
     | Token — 字型/陰影/間距 | PRUNE-TOKEN-010/011/020/021/030/031 | 重複定義、未被引用 |
     | 元件 | PRUNE-COMP-001~003 | prop 重疊的元件、差異 < 2 屬性的 variant、引用已廢棄 token |
     | 模組 / 產品介面 | PRUNE-MOD-001/002, PRUNE-LAYOUT-001/002 | 結構相似可合併的模組、佈局規則中未 tokenize 的值 |

   - **Step 2 — 生成 Deprecation Manifest（自動）**
     - 根據 pruning-report 自動分配動作：
       - `MERGE(target)` — 合併至目標 token/元件
       - `DELETE` — 移除（零引用項）
       - `ALIAS` — 舊名指向新名（過渡期）
       - `KEEP` — 低於閾值，保留
     - 輸出 `deprecation-manifest.json`

   - **Step 3 — 會簽（唯一人工決策點）**
     - PM + 設計師審閱整份 manifest
     - 批准/駁回整份清單，可附最多 5 項 override（將 MERGE→KEEP 或 DELETE→KEEP）
     - 不逐項審批

   - **Step 4 — 執行清理（自動）**
     - 根據已批准 manifest 更新 MASTER.md、TOKEN_REGISTRY.md
     - 提交 `git commit` per batch
     - 在 SCAN_RULES.md 加入「禁用已廢棄 token」規則，防止未來誤用

   - **Step 5 — 驗證（自動）**
     - 重跑 PRUNE 掃描，確認收斂目標達成
     - 產出 before/after 比較報告
     - 未達標 → 回到 Step 2 重新產生 manifest

   **收斂目標：**

   | 層 | 指標 | 現況 | 目標 | 理由 |
   |----|------|------|------|------|
   | 設計原則 | 原則數 | 4 | ≤ 5，每條可追溯 | — |
   | 顏色 Token（語義） | 背景+文字+邊框+品牌 | ~35 | **≤ 20** | bg 5 + text 6 + border 4 + brand 4 = 19 已覆蓋全場景 |
   | 顏色 Token（狀態/圖表/音訊） | 領域特定色 | ~30 | **≤ 15** | 4 狀態 × 3 variant = 12 + 圖表 3（主/次/網格）|
   | 顏色 Token（primitive） | 灰階+黑白 | 14 | **≤ 6** | 僅保留被語義 token 直接引用的灰階，其餘刪除 |
   | 顏色 Token（品牌/第三方） | 第三方品牌色 | 4 | 4（不可變） | — |
   | 顏色 Token 總計 | 所有色彩 | ~97 | **≤ 50** | 20 + 15 + 6 + 4 + 餘量 5 |
   | 新舊雙系統 Token | TOKEN_REGISTRY 舊命名 | ~97 | 0（全遷移至 MASTER.md v2） | — |
   | 字型大小 | font-size 級距 | 8 | **≤ 6** | 砍掉 text-4xl (36px) 和 text-3xl (30px) 中的一個，合併相鄰級距 |
   | 字型粗細 | font-weight | 4 (400/500/600/700) | **≤ 3** | semibold (600) 與 bold (700) 語義重疊，保留一個 |
   | 字型家族 | font-family | 3 (sans/serif/mono) | **≤ 2** | Serif 在元件/模組規範中零引用，SaaS 後台無 Serif 場景，建議刪除 |
   | 字型 Token 總計 | 大小+粗細+家族 | 14 | **≤ 11** | 6 size + 3 weight + 2 family |
   | 陰影 Token | 命名陰影 | 12 | ≤ 10 | — |
   | 元件 Variant | 所有元件的 variant 總和 | ~15 | 每元件 ≤ 4 variant | — |

   **收斂原則：每層都要能用一頁白紙寫完。寫不完就是還沒收斂。**

   **已知冗餘（供 Phase 2 驗證）：**

   基於現有文件的初步審計，以下項目應被 PRUNE 掃描偵測：
   1. `--secondary` === `--muted`（值完全相同）→ MERGE
   2. `--secondary-foreground` === `--accent-foreground`（值完全相同）→ MERGE
   3. `--card-foreground` === `--popover-foreground`（值完全相同）→ MERGE
   4. TOKEN_REGISTRY 整個舊命名系統 → ALIAS 後廢棄
   5. `--status-*` 與語義 alert token 完全重疊 → DELETE
   6. `--shadow-2xs` vs `--shadow-xs` 差異僅 0.02 opacity → MERGE 候選
   7. `--font-serif` (`Noto Serif`) — CSS variables 有定義但元件/模組規範零引用，SaaS 後台無 Serif 場景 → DELETE

3. **Phase 3：文件補全（Document）**
   - 在 `MASTER.md` 中新增 Section 7（模組層）：為每個確認的模組定義組合規則、使用場景、禁止組合
   - 在 `MASTER.md` 中新增 Section 8（產品介面層）：為每個確認的頁面定義佈局模式、模組使用規則
   - 更新 `SCAN_RULES.md`，加入新增的規則項目（Section 8 模組規則、Section 9 產品介面規則）
   - 更新 `MAINTENANCE.md`，納入模組和產品介面的維護指南

4. **Phase 4：代碼對齊（Code）**
   - 提交 **PR: Modules**（模組層代碼補全或修正）
   - 提交 **PR: Product UI**（產品介面層代碼補全或修正）
   - 兩個 PR 需包含：對應 MASTER.md Section 7/8 的規範文件引用

5. **Phase 5：驗證收尾（Verify & Wrap）**
   - 重新執行掃描，確認 SYNC_STATUS.md 的 Section E 已清零（無 Undocumented 項目）
   - 更新 `CHANGELOG.md`，新增版本條目
   - MASTER.md 版本從 v2.0.0 升至 v2.1.0

**分支路徑：**

- 掃描發現模組超過 8 個 → 工程師與 PM 確認，決定哪些納入此次範圍，剩餘列入 backlog
- 掃描發現某頁面模組組合違反現有反模式規範 → 標記為高優先修正，在 Phase 4 PR 中處理
- MASTER.md Section 7/8 文件化後發現現有 Token 不足以描述模組狀態 → 走 Token 補充流程（新增至 TOKEN_REGISTRY.md），但不得引入設計系統外的值
- Phase 2 manifest 被駁回 → PM 標注駁回原因，工程師調整 PRUNE 閾值後重跑 Step 1–2
- Phase 2 廢棄 Token 已在未納入範圍的頁面使用 → 標記為 `ALIAS`（保留舊名指向新名），不阻塞 Phase 2 完成

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
| 時程 | 1.5–2.5 週 | 4–5 週 | 7–9 週 |
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

工程師完成 Phase 1–5 後，需交付以下所有檔案（路徑相對於 `design-system/` 目錄）：

| 檔案 | 說明 | Phase | 狀態 |
|------|------|-------|------|
| `TOKEN_REGISTRY.md` | 更新：加入模組語義 token（如有新增） | 1 | ⬜ 待執行 |
| `SYNC_STATUS.md` | 更新：含模組層、產品介面層的差異報告 | 1, 5 | ⬜ 待執行 |
| `design-system.html` | 更新：新增模組預覽 Gallery 區塊 | 1 | ⬜ 待執行 |
| `pruning-report.json` | PRUNE 掃描自動產出 | 2 | ⬜ 待執行 |
| `deprecation-manifest.json` | 廢棄/合併動作清單（需會簽） | 2 | ⬜ 待執行 |
| `SCAN_RULES.md` | 更新：加入 PRUNE-* 規則 + 禁用廢棄 token 規則 | 2 | ⬜ 待執行 |
| `MASTER.md` | 更新：新增 Section 7（模組）、Section 8（產品介面） | 3 | ⬜ 待執行 |
| `SCAN_RULES.md` | 更新：加入模組組合規則、產品介面佈局規則 | 3 | ⬜ 待執行 |
| `MAINTENANCE.md` | 新建：納入模組和產品介面的維護指南 | 3 | ⬜ 待執行 |
| PR: Modules | 模組層相關程式碼補全或修正 | 4 | ⬜ 待執行 |
| PR: Product UI | 產品介面層相關程式碼補全或修正 | 4 | ⬜ 待執行 |
| `CHANGELOG.md` | 新建：新增 v2.1.0 版本條目 | 5 | ⬜ 待執行 |

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
| v1.1 | 2026-02-25 | 新增 Phase 2「收斂與精簡」，原 Phase 2–4 順移為 Phase 3–5；新增名詞定義、收斂目標、PRUNE 規則、已知冗餘清單 | PRD 全文 |
