# Feature: YouTube Video Publishing

**Feature Slug:** youtube-video-publishing
**Current Phase:** Phase 1

---

## 概述 (Overview)

### 問題陳述 (Problem Statement)

Video Podcast 已成為 2025-2026 年最重要的創作趨勢。Spotify、YouTube 均大力推動影音內容，大量聽眾正在遷移至影音消費模式。然而 Firstory 目前為純音訊平台，創作者必須在 Firstory 發布音訊後，再手動切換至 YouTube Studio 重新上傳影片、填寫 metadata、設定排程——流程完全不相通，極度耗時。

核心痛點：

1. **影音發布流程割裂（痛點 9/10）：** 創作者在 Firstory 完成錄製後，仍需切換至 YouTube Studio 重新操作一整套上傳流程。對於每週產出 1-3 集的時間貧乏型創作者，這是顯著的 workflow 斷點，直接導致放棄影音或離開 Firstory。
2. **音訊與影片版本管理混亂（痛點 7/10）：** 創作者缺乏統一的管理視角，無法在同一介面追蹤哪些集數已發布至 YouTube、哪些仍只有音訊版，容易造成發布遺漏或 metadata 不一致。
3. **與競品差距拉大（痛點 8/10）：** Spotify for Creators 已原生支援 Video Podcast 且免費；Podbean、Libsyn 均支援影片。Firstory 若不跟進，面臨現有創作者流失與新影音創作者無法吸引的雙重風險。

### 目標用戶 (Target Users)

**主要用戶：** 撞牆期專業創作者（醫師、顧問、講師、企業 Podcast 主），每週下載數 600-6,000，獨自或 1+1 小團隊運作，極度時間貧乏。他們已建立穩定的 Podcast 生產流程，現在希望拓展至影音以突破成長瓶頸，但無法承擔大幅增加的製作與發布工作量。

**次要用戶：** 新進影音創作者，以 YouTube 為主要陣地，希望同步經營 Podcast RSS 觸及訂閱型聽眾。這類用戶可能優先透過 "Video-first" 路徑進入 Firstory。

### 成功指標 (Success Metrics)

| 指標 | 目標 | 時間框架 |
|------|------|---------|
| YouTube 連接率（有發布集數的帳號中已連接 YouTube 的比例） | 25% | Phase 1 上線後 90 天 |
| YouTube 發布集數比率（已連接帳號中，新集數同步發布至 YouTube 的比例） | 60% | Phase 1 上線後 90 天 |
| 功能採用後 30 日留存率（使用過 YouTube 發布的創作者） | ≥ 75% | Phase 1 上線後 90 天 |
| 因影音支援而新增的付費訂閱 | +5% MoM 新增付費創作者 | Phase 1-2 合計 |
| 用戶回報發布流程滿意度（NPS 問卷） | ≥ 4.0 / 5.0 | Phase 1 上線後 60 天 |

### 策略對齊

| 維度 | 對齊結論 |
|------|---------|
| **ICP** | 撞牆期專業創作者 — 核心吻合。影音擴展是他們突破成長瓶頸的主要路徑，但他們沒有時間手動跨平台操作。本功能直接降低其拓展影音的摩擦成本 |
| **NSM** | SaaS 線：MAU × ARPPU × Conversion Rate × **Retention Rate**。本功能雙向驅動：吸引新的影音創作者提升 MAU；讓現有創作者獲得更多平台價值提升 Retention Rate |
| **Roadmap** | Q1 2026「影音與數據整合」— 本 PRD 為該主題的核心交付物之一；Phase 2 的 Analytics 回收則呼應 Q3 2026「多平台數據回收」 |
| **差異化定位** | Firstory 整合 AI 製作工具 + 影音發布 = 競品未有的一站式流程，建立護城河 |

---

## 名詞定義 (Terminology)

| 術語 | 定義 |
|------|------|
| **Video-first 路徑** | 創作者上傳影片檔案，系統從影片中提取音軌作為 RSS 音訊，影片同步發布至 YouTube |
| **Audio+Video 路徑** | 創作者分別上傳音訊（RSS 用）與影片（YouTube 用），兩者各自獨立但同屬同一集數 |
| **YouTube 連接** | 透過 OAuth 2.0 授權，將 Firstory 帳號與創作者的 YouTube 頻道綁定 |
| **發布預覽 (Publish Preview)** | 在正式送出發布前，顯示該集將在 YouTube 上呈現的 metadata 預覽介面 |
| **排程發布 (Scheduled Publish)** | 設定未來特定時間自動將集數發布至 YouTube |
| **即時發布 (Immediate Publish)** | 送出後立即將集數公開發布至 YouTube |
| **Playlist** | YouTube 播放清單，創作者可選擇將集數加入特定 Playlist |
| **Visibility（能見度）** | YouTube 影片的公開設定：公開 (Public)、不公開列出 (Unlisted)、私人 (Private) |
| **Made for Kids** | YouTube 政策要求標記，標示內容是否專為兒童設計 |
| **AI 生成內容旗標** | YouTube 政策要求標記，標示內容是否包含 AI 生成的影像或音訊 |

---

## Roadmap 總覽

| Phase | 範圍摘要 | 預估時程 | 狀態 |
|-------|---------|---------|------|
| Phase 1 | YouTube 連接 + 影片上傳 + 即時/排程發布 | 3-4 週 | 🔵 Current |
| Phase 2 | 匯入既有 YouTube 影片 + Audio↔Video 配對 + Analytics 數據回收展示 | 3-4 週 | ⚪ Planned |
| Phase 3 | 連接狀態管理 + 發布狀態同步 + YouTube Shorts | 2-3 週 | ⚪ Planned |

---

## Phase 1: YouTube 連接 + 影片上傳 + 即時／排程發布

### 功能範圍 (Feature Scope)

#### 核心功能

**1. YouTube 頻道連接**
- 創作者可在 Firstory 後台連接其 YouTube 頻道（透過 OAuth 授權流程）
- 授權成功後顯示已連接的頻道名稱、頻道頭像、訂閱人數
- 每個 Firstory Podcast 帳號可連接一個 YouTube 頻道

**2. 影片上傳**
- 創作者可在建立或編輯集數時上傳影片檔案（支援 MP4 等主流格式）
- 影片上傳支援進度指示，創作者可在上傳過程中繼續填寫其他 metadata
- 上傳完成後可預覽影片縮圖

**3. 兩種發布路徑**
- **Video-first 路徑：** 創作者只上傳影片，Firstory 自動從影片提取音軌作為 RSS 音訊集數；影片同步推送至 YouTube
- **Audio+Video 路徑：** 創作者分別上傳音訊（供 RSS 發布）與影片（供 YouTube 發布），兩者同屬同一集數

**4. YouTube Metadata 設定**
- 發布至 YouTube 的標題（預設帶入集數標題，可獨立修改）
- 發布至 YouTube 的說明（預設帶入集數說明，可獨立修改）
- 自訂縮圖上傳（若未上傳，沿用影片預設縮圖）
- 選擇加入的 Playlist（拉取已連接頻道的現有播放清單）
- 能見度設定：公開 / 不公開列出 / 私人
- Made for Kids 標記（是 / 否）
- AI 生成內容旗標（是 / 否）

**5. 發布時間設定**
- 即時發布：送出後立即公開至 YouTube
- 排程發布：選擇未來日期與時間，系統於指定時間自動發布

**6. 發布預覽**
- 在送出發布前，呈現「發布預覽」畫面，展示集數將在 YouTube 上呈現的完整外觀（標題、說明、縮圖、Playlist、能見度）
- 創作者確認無誤後再執行發布

**7. 發布狀態顯示**
- 集數列表頁顯示各集是否已發布至 YouTube（已發布 / 排程中 / 未發布）
- 已發布集數提供直達 YouTube 影片的連結

#### 明確不做（Phase 1）

- 匯入既有 YouTube 影片（Phase 2）
- 音訊集數與 YouTube 影片的配對（Phase 2）
- YouTube Analytics 數據展示（Phase 2）
- 同時連接多個 YouTube 頻道
- YouTube Shorts 支援（Phase 3）
- 連接狀態切換 / 重新連接流程（Phase 3）
- Apple Podcasts、Spotify 等其他平台的影片發布（獨立 PRD）
- 影片剪輯、字幕生成等製作功能（影音製作工具獨立 PRD）
- 章節標記（Chapters）設定

### 用戶旅程 (User Journey)

#### 前置條件
創作者已有 Firstory 帳號並擁有至少一個 Podcast；創作者擁有 YouTube 頻道。

---

**旅程 A：首次連接 YouTube 頻道**

**Happy Path：**
1. 創作者進入 Firstory 後台 → 設定 → 整合 → YouTube
2. 看到「連接 YouTube 頻道」的說明卡片，點擊「開始連接」
3. 系統引導至 Google OAuth 授權頁面，創作者選擇 Google 帳號並授權
4. 授權成功，自動返回 Firstory 後台
5. 頁面顯示已連接的頻道名稱、頭像、訂閱人數，以及「連接成功」提示
6. 創作者完成連接，可開始選擇 Playlist 或直接前往建立集數

**Branch：Google 帳號下有多個 YouTube 頻道**
- 授權成功後，若該 Google 帳號擁有多個頻道，顯示頻道選擇畫面
- 創作者選擇欲連接的頻道後，完成連接

**Branch：授權失敗或被拒絕**
- 顯示錯誤訊息說明原因（如：帳號無 YouTube 頻道、授權被取消）
- 提供「重新嘗試」按鈕，不影響現有 Firstory 設定

---

**旅程 B：Video-first 路徑發布新集數**

**Happy Path：**
1. 創作者點擊「建立新集數」
2. 在影片上傳區，選擇「上傳影片」並選取影片檔案
3. 影片開始上傳，顯示進度條；創作者同時填寫集數標題、說明
4. 上傳完成，顯示影片預覽縮圖
5. 創作者展開「YouTube 發布設定」區塊，確認或修改：標題、說明、縮圖、Playlist、能見度、Made for Kids、AI 生成內容旗標
6. 選擇發布時間：即時發布 或 指定排程時間
7. 點擊「預覽發布」，查看 YouTube 呈現預覽畫面
8. 確認無誤，點擊「確認發布」
9. 系統同時將音訊（自影片提取）推送至 RSS，並將影片推送至 YouTube
10. 集數列表顯示「YouTube：已發布」並附上 YouTube 連結

**Branch：選擇排程發布**
- 步驟 6 選擇排程時間後，集數列表顯示「YouTube：排程中（2026/02/28 09:00）」
- 到達排程時間後，系統自動發布，狀態更新為「YouTube：已發布」

**Branch：影片上傳失敗**
- 顯示錯誤訊息（如：檔案格式不支援、檔案過大）
- 提供重新上傳入口，已填寫的 metadata 不丟失

---

**旅程 C：Audio+Video 路徑發布新集數**

**Happy Path：**
1. 創作者點擊「建立新集數」
2. 在音訊上傳區，上傳音訊檔案（供 RSS 發布）
3. 在影片上傳區，選擇「上傳影片」並選取影片檔案（供 YouTube 發布）
4. 兩者分別上傳完成
5. 後續 YouTube 發布設定與確認流程同旅程 B 步驟 5-10
6. 系統將音訊推送至 RSS，影片推送至 YouTube，兩者各自獨立但標示為同一集數

**Branch：僅上傳音訊，未上傳影片**
- YouTube 發布設定區塊呈現禁用狀態，提示「請上傳影片以啟用 YouTube 發布」
- 集數仍可正常發布至 RSS

---

## Phase 2: 匯入既有 YouTube 影片 + Audio↔Video 配對 + Analytics 數據回收展示

### 功能範圍

#### 新增功能

**1. 匯入既有 YouTube 影片**
- 創作者可從已連接的 YouTube 頻道中選擇現有影片匯入 Firstory
- 匯入後，影片資訊（標題、說明、縮圖、發布時間）自動帶入集數 metadata
- 創作者可選擇是否從 YouTube 影片提取音軌作為 RSS 音訊（若尚無對應的音訊集數）

**2. Audio↔Video 配對（Match Episodes）**
- 提供配對管理介面，顯示所有音訊集數與 YouTube 影片的對應關係
- 創作者可手動建立、修改、解除配對
- 已配對的集數在集數列表中同時顯示 RSS 與 YouTube 的狀態

**3. YouTube Analytics 數據展示**
- 在 Firstory 後台展示已連接頻道的 YouTube 數據：
  - 頻道總覽：總觀看次數、總觀看時長、新增訂閱人數
  - 集數維度：各集影片的觀看次數、平均觀看時長、留言數、按讚數
- 並排展示 RSS（下載次數）與 YouTube（觀看次數）數據，提供統一視角

#### 明確不做（Phase 2）

- 自動配對（僅支援手動配對）
- YouTube 留言管理
- YouTube 數據的跨頻道比較
- YouTube Shorts 支援（Phase 3）
- 連接狀態切換（Phase 3）

### 用戶旅程

**旅程 A：匯入既有 YouTube 影片**

**Happy Path：**
1. 創作者進入後台 → YouTube 整合頁面 → 「匯入現有影片」
2. 系統顯示已連接頻道中所有未匯入的 YouTube 影片清單（含縮圖、標題、發布日期）
3. 創作者選擇欲匯入的影片，點擊「匯入」
4. 影片資訊帶入新集數草稿，創作者確認或修改 metadata
5. 選擇是否提取音軌作為 RSS 音訊
6. 儲存後，集數出現於集數列表，顯示「YouTube：已發布（來源：匯入）」

---

**旅程 B：配對音訊集數與 YouTube 影片**

**Happy Path：**
1. 創作者進入集數列表或 YouTube 整合頁面 → 「配對管理」
2. 畫面以表格形式呈現左側音訊集數、右側 YouTube 影片，未配對者以虛線標示
3. 創作者點擊某個音訊集數，從右側清單選擇對應的 YouTube 影片
4. 點擊「確認配對」，配對建立，表格更新
5. 已配對集數在集數列表中同時顯示 RSS 下載數與 YouTube 觀看數

---

**旅程 C：查看 YouTube Analytics**

**Happy Path：**
1. 創作者進入後台 → 數據分析 → YouTube 分頁
2. 看到頻道總覽數據（最近 30 天的觀看次數、觀看時長、新增訂閱人數）
3. 向下捲動，看到集數維度表格，可依觀看次數或觀看時長排序
4. 點擊特定集數，進入詳細頁面，並排顯示 RSS 與 YouTube 數據對比

---

## Phase 3: 連接狀態管理 + 發布狀態同步 + YouTube Shorts

### 功能範圍

#### 新增功能

**1. 連接狀態管理**
- 創作者可在設定頁面查看目前連接的 YouTube 頻道狀態（正常 / 授權過期 / 已斷開）
- 支援切換至不同 YouTube 頻道（解除現有連接後重新連接）
- 支援主動斷開連接，斷開後歷史發布記錄保留但不再同步
- 授權過期時，後台顯示顯眼提示並引導重新授權，排程中的發布暫停並通知創作者

**2. 發布狀態同步**
- 定期同步 YouTube 端的影片狀態至 Firstory
- 若 YouTube 影片被刪除或設為私人，Firstory 集數列表更新對應狀態並通知創作者
- 創作者可在 Firstory 後台查看外部狀態變更紀錄

**3. YouTube Shorts 支援**
- 建立集數時，支援上傳短片（60 秒以內、垂直比例的影片）
- 短片可標記為 YouTube Shorts，發布至 YouTube 的 Shorts 頻道
- Shorts 可獨立於正集存在，或作為正集的片段剪輯版本

#### 明確不做（Phase 3）

- 自動生成 Shorts 片段（需搭配影音製作工具 PRD）
- 多個 YouTube 頻道同時連接
- Shorts 的 Analytics 數據（後續版本）

### 用戶旅程

**旅程 A：切換 YouTube 頻道**

**Happy Path：**
1. 創作者進入設定 → YouTube 整合，點擊「切換頻道」
2. 系統顯示確認提示，說明現有排程發布將暫停，配對記錄保留
3. 創作者確認後，系統引導重新 OAuth 授權
4. 創作者選擇新頻道，完成連接
5. 後台顯示新頻道資訊，過往集數的 YouTube 連結保持原狀

---

**旅程 B：授權過期重新授權**

**Happy Path：**
1. 創作者登入後台，頂部顯示橫幅警告：「YouTube 授權已過期，排程發布已暫停」
2. 點擊「重新授權」，引導至 Google OAuth 頁面
3. 創作者完成授權，返回 Firstory
4. 系統自動恢復排程發布，橫幅消失

---

**旅程 C：發布 YouTube Shorts**

**Happy Path：**
1. 創作者建立新集數，上傳短片檔案（60 秒以內、垂直比例）
2. 系統自動辨識為符合 Shorts 規格，提示「此影片符合 YouTube Shorts 規格」
3. 創作者勾選「發布為 YouTube Shorts」
4. 填寫 Shorts 標題、說明（字數上限不同），選擇能見度
5. 點擊發布，Shorts 推送至 YouTube Shorts 頻道
6. 集數列表顯示「YouTube Shorts：已發布」

---

## 限制與邊界 (Constraints & Boundaries)

- **單一頻道限制：** Phase 1-2 每個 Firstory Podcast 帳號僅支援連接一個 YouTube 頻道，多頻道管理不在本 PRD 範圍
- **影片格式：** 僅支援主流影片格式（以 MP4 為代表），具體支援清單由工程端依 YouTube 限制確認
- **影片時長與大小：** 受 YouTube 上傳限制約束，超過限制時顯示明確錯誤訊息
- **平台範圍：** 本 PRD 僅涵蓋 YouTube，Apple Podcasts Video、Spotify 等其他平台為獨立 PRD
- **製作功能不在範圍：** 影片剪輯、字幕生成、章節自動標記等製作工具為獨立功能範疇
- **Firstory 定價方案：** YouTube 連接功能適用的方案層級由商業決策決定，非本 PRD 範疇
- **版權與政策合規：** 創作者須自行確保上傳內容符合 YouTube 服務條款；Firstory 不承擔版權審查責任

---

## 依賴關係 (Dependencies)

| 依賴項目 | 說明 | 影響 Phase |
|---------|------|-----------|
| Google OAuth 授權機制 | 需通過 Google API Console 審核，取得 YouTube Data API 存取權限 | Phase 1 |
| YouTube Data API 配額 | 上傳、排程、metadata 寫入皆消耗 API 配額，需評估用量上限 | Phase 1 |
| 影片儲存基礎設施 | 影片上傳至 Firstory 後需暫存再推送至 YouTube，需確認儲存成本與策略 | Phase 1 |
| YouTube Analytics API | Phase 2 數據回收依賴此 API，需申請對應權限 | Phase 2 |
| 影音製作工具 PRD | Phase 3 Shorts 的自動片段生成依賴影音製作工具的開發進度 | Phase 3 |

---

## 開放問題 (Open Questions)

| # | 問題 | 重要性 | 負責決策者 |
|---|------|--------|-----------|
| 1 | YouTube 連接功能是否限定特定付費方案？或所有方案皆可用？ | 高 | 商業 / PM |
| 2 | Video-first 路徑中，從影片提取音軌的音質是否足夠？是否需要品質設定選項？ | 高 | Product / Engineering |
| 3 | 影片暫存策略：Firstory 是否永久保存影片原始檔？或上傳至 YouTube 後即刪除？ | 高 | Engineering / 商業 |
| 4 | Phase 1 上線初期，YouTube API 配額是否足以支撐所有創作者同時使用？是否需要排隊機制？ | 中 | Engineering |
| 5 | 若創作者的 YouTube 頻道為新頻道（未驗證），是否有上傳時長限制？如何在 UI 中提示？ | 中 | Product |
| 6 | Firstory 是否需要在發布前對影片進行掃描（如版權內容偵測），以降低帳號被停權風險？ | 中 | Legal / Product |
| 7 | Phase 2 的 Analytics 數據更新頻率應設為多少？（即時 vs 每日同步） | 低 | Engineering / Product |
