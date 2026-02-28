# Feature: Spotify 數據整合

**Feature Slug：** spotify-data-integration

---

## 概述

### 問題陳述
- **痛點描述（8/10）：** 創作者目前只能看到 Firstory 平台自身的收聽數據，無法掌握 Spotify 端的表現（Play、Stream、Listener、Follower）。Spotify 作為全球最大 Podcast 收聽平台之一，其數據缺失導致創作者對節目整體表現的判斷嚴重不足，形成「數據盲區」
- **不解決的後果：** 創作者被迫在 Firstory 與 Spotify for Creators 後台之間來回切換查看數據，無法形成統一的成長決策依據。競品若先整合多平台數據，將成為搬家誘因

### 目標用戶
- **用戶輪廓：** 處於「撞牆期」的專業知識型創作者（醫師、顧問、講師），7 天下載量 600–6,000，有數據驅動心態，定期檢查後台分析
- **現有替代方案：** 手動登入 Spotify for Creators 後台查看數據，或用 Excel 手動匯整多平台數據。缺乏自動化，耗時且無法交叉分析

### 成功指標
- 整合後使用 Spotify 數據頁面的 MAU 佔比 ≥ 60%
- 因數據功能升級付費方案的轉化率提升 ≥ 5%
- 擁有 Spotify 數據的用戶 30 天留存率高於未擁有者 ≥ 10%

---

## 名詞定義

| 名詞 | 定義 |
|------|------|
| Play | Spotify 上單集被播放的次數（含重播） |
| Stream | Spotify 上達到一定播放門檻的有效收聽次數 |
| Listener | 在指定時間區間內收聽過的不重複用戶數 |
| Follower | 在 Spotify 上追蹤該節目的用戶數 |
| Show | 一個 Podcast 節目（對應 Spotify Show ID） |
| Episode | 節目下的單集內容（對應 Spotify Episode ID） |

---

## 功能範圍

### 核心功能（MVP）
- 串接 Spotify for Podcasters API，取得 Show level 與 Episode level 數據
- 以日為粒度儲存 Play、Stream、Listener、Follower 四種指標
- 前台展示 Show level 日趨勢圖表（折線圖）
- 前台展示 Episode level 數據列表與排序
- 支援 Spotify 帳號授權連結與斷開
- 灰度發布機制（Feature Flag 控制可見性）

### 明確不做
- 即時數據（Realtime）— Spotify API 本身有延遲，不追求即時
- Spotify 以外的第三方平台數據整合（Apple Podcasts、YouTube 等屬後續階段）
- 廣告主端報表或 B 端數據匯出
- AI 數據診斷建議（屬獨立功能，不在本次範圍）
- 數據回填超過 Spotify API 提供的歷史範圍

### 未來考慮
- Apple Podcasts、YouTube 等多平台數據整合（Q3 Roadmap）
- 跨平台數據交叉分析與統一儀表板
- AI 驅動的成長診斷（基於多平台數據）
- 數據匯出 CSV/PDF 功能

---

## 用戶旅程

**入口：** 創作者登入 Firstory 後台，進入「數據分析」頁面

**Happy Path：**
1. 創作者在數據分析頁面看到「連結 Spotify」提示
2. 點擊後進入 Spotify OAuth 授權流程，授權成功
3. 系統開始同步歷史數據，頁面顯示同步進度
4. 同步完成後，Show level 數據自動出現在數據分析主頁
5. 創作者可切換至 Episode level 查看各集表現
6. 每日自動同步最新數據，無需手動操作

**分支路徑：**
- 授權失敗 → 顯示錯誤訊息與重試引導
- Spotify 帳號未綁定任何 Show → 顯示「未找到節目」提示
- 數據同步中 → 顯示進度狀態，允許查看已同步的部分數據
- 用戶斷開 Spotify 連結 → 確認對話框，斷開後歷史數據保留但停止更新
- Feature Flag 未開啟 → 用戶不可見此功能入口

---

## 限制與邊界

| 類型 | 說明 |
|------|------|
| Edge Case | Spotify API 回傳數據延遲（通常 24-48 小時），需向用戶明確說明數據非即時 |
| Edge Case | 一個 Firstory 帳號可能對應多個 Spotify Show，需支援多 Show 綁定 |
| Edge Case | Spotify API Rate Limit 限制，高峰期可能影響同步速度 |
| Edge Case | 創作者更換 Spotify 帳號或節目搬家的情境 |
| 業務限制 | Spotify API 的資料存取範圍受限於其官方 Terms of Service |
| 業務限制 | 數據展示可能需遵守 Spotify 品牌使用規範（Logo、標示來源） |
| 業務限制 | 灰度發布期間僅限選定用戶，需有明確的開放標準 |

---

## 依賴關係

| 依賴類型 | 說明 |
|----------|------|
| 資料/能力 | Spotify for Podcasters API 存取權限（需申請 API Key） |
| 資料/能力 | OAuth 2.0 授權流程實作能力 |
| 資料/能力 | 排程任務系統（每日自動同步） |
| 資料/能力 | Feature Flag 基礎建設 |
| 其他功能 | 現有數據分析頁面作為整合載體 |
| 業務風險 | Spotify API 政策變更可能影響數據取得範圍 |
| 業務風險 | API Rate Limit 可能限制大量用戶同時同步的吞吐量 |
| 業務風險 | 時程風險 — 原定 Q1（2 月前），需確認目前進度 |

---

## 範圍比較

| 維度 | MVP | 標準版 | 理想版 |
|------|-----|--------|--------|
| 功能 | Show + Episode 數據展示、日趨勢圖、授權連結 | 加入多平台（Apple）、數據匯出、自訂時間區間 | 跨平台統一儀表板、AI 診斷、自動週報 |
| 時程 | 2 週 | 6 週 | 3 個月 |
| 風險 | 低 | 中（多 API 整合複雜度） | 高（AI 模型準確度、多平台維護成本） |

---

## 開放問題

- [ ] Spotify API Key 是否已申請？目前審核狀態？
- [ ] Rate Limit 具體數值為何？是否需要申請提升配額？
- [ ] 灰度發布的選定用戶標準為何？（付費用戶優先？流量門檻？）
- [ ] Spotify 品牌規範對數據展示頁面有哪些具體要求？
- [ ] 是否需要支援「數據授權給第三方」（如廣告主查看）？

---

## 相關檔案

| 類型 | 檔案 | 狀態 |
|------|------|------|
| PRD | `prd.md` | ✅ 本文件 |
| User Story | `user-story.md` | ⬜ 尚未產出 |
| Wireframe | `wireframe.html` | ⬜ 尚未產出 |
| Prototype | `prototype.html` | ⬜ 尚未產出 |
| AC | `acceptance-criteria.md` | ⬜ 尚未產出 |
