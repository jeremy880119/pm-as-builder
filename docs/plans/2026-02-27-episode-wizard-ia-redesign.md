# 集數建立 Wizard IA 重構

**日期：** 2026-02-27
**狀態：** 草稿
**背景：** Podcast = Audio + Video。Wizard 以「集數」為中心，而非「音訊」為中心。Step 2 只承載 platform-agnostic 的內容；所有平台分類屬性（含 RSS metadata）移至 Step 3 各平台設定。

---

## 欄位屬性分類

### 集數層級（Step 2）
- 標題
- 說明

### 音訊平台（Step 3 音訊 accordion）
- 封面圖片（Podcast app 顯示用）
- Explicit
- 集數類型（完整集 / 預告 / 特別集）
- 季數 / 集數
- 標籤
- Firstory Playlist
- 發布類型（公開 / 訂閱者限定 / 免費+訂閱）
- Apple Podcast 相關設定
- AI 自動生成 Transcript

### YouTube 平台（Step 3 YouTube accordion）
- 影片上傳（Step 1）
- YouTube 縮圖
- YouTube Playlist
- 能見度（公開 / 不公開列出 / 私人）
- Made for Kids
- AI 生成內容聲明

> **Phase 1 決策：** YouTube 標題、說明直接沿用集數預設值，不提供覆寫入口。發布後可至 YouTube Studio 修改。

### 變現（Step 4）
- 廣告位置設定（Pre-roll / Mid-roll）

### 發布動作（Step 5 底部）
- 立即發布 / 排程發布（含日期時間選擇）/ 存為草稿
- Phase 1：音訊與 YouTube 同步觸發

---

## 新 Wizard 結構（5 步驟）

### Step 1：上傳媒體

```
音訊（必填）

影片（選填）
└─ 提示：連接 YouTube 後可發布至 YouTube
```

### Step 2：集數內容

*Platform-agnostic，各平台的基礎預設值*

```
標題（必填）
說明（必填）
```

### Step 3：平台設定

*各平台的視覺、分類、發布控制*

```
▼ 音訊（永遠顯示，預設展開）
  封面圖片（Podcast app 顯示用）
  Explicit
  集數類型（完整集 / 預告 / 特別集）
  季數 / 集數
  標籤
  Firstory Playlist
  發布類型：公開 / 訂閱者限定 / 免費+訂閱
  └─ 訂閱者限定：Firstory 訂閱層級選擇
  └─ 免費+訂閱：訂閱者專屬音檔、Apple 設定
  Apple Podcast 提前公開
  AI 自動生成 Transcript（是 / 否）

▼ YouTube（已連接 YouTube 且已上傳影片才顯示，預設展開）
  縮圖（選填）
  Playlist（下拉）
  能見度：公開 / 不公開列出 / 私人
  Made for Kids：是 / 否
  AI 生成內容：是 / 否
  （標題、說明沿用集數預設值，Phase 1 不提供覆寫）
```

### Step 4：廣告設定

*永遠顯示（所有用戶都會看到）*

```
廣告位置設定（Pre-roll / Mid-roll）
（Phase 1：僅音訊；未來預留影片廣告）
```

### Step 5：確認發布

*唯讀摘要，選擇發布方式*

```
集數標題
發布平台（音訊 / YouTube）
發布類型
廣告位置

[返回]  [存為草稿]  [排程發布 ▼日期時間]  [立即發布]
```

---

## 條件顯示邏輯

| 區塊 | 顯示條件 |
|------|----------|
| YouTube accordion（Step 3） | 已連接 YouTube **且** 已上傳影片 |
| Step 4 廣告 | **永遠顯示** |
| RSS 訂閱者設定（Step 3 音訊） | 選擇「訂閱者限定」或「免費+訂閱」 |
| Apple 設定（Step 3 音訊） | 節目已連接 Apple Podcasts |

---

## 與現有實作的差異

| 項目 | 現有 / 舊設計 | 新架構 |
|------|--------------|--------|
| Step 數量 | 4 步 | 5 步 |
| Step 2 名稱 | 基本資訊 | 集數內容 |
| Step 2 欄位 | 標題、說明、RSS 專屬 metadata | 僅標題、說明 |
| Explicit、集數類型、季集、標籤、Playlist | Step 2 | Step 3 音訊 accordion |
| RSS accordion 標籤 | `RSS` | `音訊` |
| 廣告設定 | Step 3 accordion（條件顯示） | 獨立 Step 4（永遠顯示） |
| 發布時間 | Step 3 頂部（表單欄位） | Step 5 底部動作按鈕（立即/排程/草稿） |
| AI Transcript 入口 | Step 1 音訊區塊 | Step 3 音訊 accordion |
| 封面圖片 | Step 2（Details） | Step 3 音訊 accordion |
| YouTube 設定 | 分散在 Details + Review | 集中在 Step 3 YouTube accordion |
| YouTube 標題/說明 | 在 Step 3 可覆寫 | 不提供覆寫，沿用集數預設（Phase 1）|
| 發布類型（公開/訂閱） | 在 Review | Step 3 音訊 accordion |

---

## 明確不做（Phase 1）

- YouTube 與 RSS 獨立發布時間
- Apple Video、Spotify Video
- Video-first（從影片提取音軌）
- YouTube 標題 / 說明覆寫
