# 影音上傳與多平台發布設計文件（Phase 1）

**日期：** 2026-02-27
**狀態：** 草稿
**範圍：** Firstory Studio — 集數建立流程擴充 YouTube 影片上傳與發布

---

## 功能定位

在現有 Firstory 集數建立 wizard 上擴充影片上傳能力，Phase 1 僅支援 YouTube。

- **音訊**：必填，走 RSS
- **影片**：選填，走 YouTube（Phase 1）；未來擴充 Apple Video、Spotify Video
- 不支援從影片提取音軌（Video-first 路徑不在範圍內）

---

## 架構決策

**方案：改造現有 EpisodeUpload wizard（方案 A）**

在現有 4 步驟 wizard 擴充，複用現有 Distribution 系統的 GraphQL patterns。改動集中，風險低。

**前端改動點：**
- `src/pages/EpisodeUpload/` — Step 1 加影片上傳，Step 3 加 YouTube accordion
- 集數列表頁 — 加平台 badge 顯示
- GraphQL — 新增影片上傳 mutation + YouTube 設定 mutation（接後端現有 API）

**後端：** YouTube OAuth 已有，前端接現有 API。

---

## 集數建立流程（4 步驟 wizard）

### Step 1：上傳媒體

```
[🎵 音訊  必填]  [🎬 影片  選填]    ← TabsList（pill style，靠左）
─────────────────────────────────
  (AudioEditor 或 VideoEditor)      ← TabsContent
─────────────────────────────────
```

- 音訊與影片以 **Tab** 切換（非並排），預設顯示音訊 tab
- `AudioEditor`：現有 segment editor（toolbar + 卡片區 + playback bar）
- `VideoEditor`：外觀與 AudioEditor 一致（toolbar「新增影片」+ 卡片區 + playback bar）
- 未上傳影片：Step 3 的 YouTube accordion 不顯示
- 未連接 YouTube：影片 tab 底部顯示小提示，不阻擋上傳流程
- 「影片已就緒」狀態**僅顯示於下方 badge**，不顯示 banner

### Step 2：基本資訊

現有欄位不動（標題、說明、封面）。

### Step 3：發布設定（accordion）

```
▼ RSS 發布          （永遠顯示）
▼ YouTube           （條件顯示，見下方邊界條件）
▼ Apple Video       （未來）
▼ Spotify Video     （未來）
```

**YouTube 設定欄位：**

| 欄位 | 說明 |
|------|------|
| 標題 | 預帶集數標題，可獨立修改 |
| 說明 | 預帶集數說明，可獨立修改 |
| 縮圖 | 選填，未上傳用影片預設縮圖 |
| Playlist | 下拉，拉取已連接頻道的 playlist |
| 能見度 | 公開 / 不公開列出 / 私人 |
| Made for Kids | 是 / 否 |
| AI 生成內容 | 是 / 否 |
| 發布時間 | 即時 / 排程（MVP 與 RSS 同步觸發） |

### Step 4：預覽 & 發布

現有流程，確認後送出。

---

## 集數列表

### Tab 結構（不變）

- **已發布** tab
- **草稿**（含排程）tab

Tab 歸屬由 **RSS 發布狀態**決定。

### 平台 Badge

每集顯示一排 badge：

```
集數標題                    [ RSS ] [ YouTube ]
集數標題（無影片）          [ RSS ]
```

- **亮** = 該平台有設定
- **暗 / 不顯示** = 無影片、未連接、或未設定
- Badge 顏色細節：Phase 1 暫用系統預設，待後續定義

---

## 邊界條件

| 情境 | 行為 |
|------|------|
| 未連接 YouTube | YouTube accordion 不顯示 |
| 已連接但未上傳影片 | YouTube accordion 不顯示 |
| 已連接 + 已上傳影片 | YouTube accordion 展開顯示 |
| YouTube 授權過期 | 顯示警告 + 引導重新授權，可略過繼續發布 RSS |

---

## 擴充原則

1. 新增平台 = 新增一個 accordion section，不改動其他區塊
2. 各平台設定完全獨立（標題、說明可各自覆寫）
3. 連接管理統一在「設定 → 整合」頁面
4. 音訊平台（Apple Podcasts、Spotify 音訊）走 RSS，不在此範疇

---

## 明確不做（Phase 1）

- Video-first（從影片提取音軌）
- YouTube 與 RSS 獨立觸發發布
- Apple Video、Spotify Video
- Badge 顏色細節定義
- YouTube 發布時間與 RSS 獨立操作

---

## 開放問題

| 問題 | 狀態 |
|------|------|
| 影片上傳 API 介面（hostingApi mutation 名稱、欄位） | 待確認 |
| YouTube 設定如何隨發布 mutation 傳遞（獨立欄位或 JSON blob） | 待確認 |
| 集數列表 badge 資料來源（現有 query 是否已回傳 youtubeVideoId） | 待確認 |
| Playlist 下拉資料從哪個 API 取得 | 待確認 |
