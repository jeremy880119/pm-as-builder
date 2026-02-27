# 集數建立 Wizard IA 重構

**日期：** 2026-02-27
**狀態：** 草稿
**背景：** 原有 4 步驟 wizard 以 Audio 為中心設計；加入影片上傳後，現有架構無法乾淨容納多平台發布設定。

---

## 欄位屬性分類

### Audio / RSS 專屬
- AI 自動生成 Transcript
- Explicit 標記
- 集數類型（完整集 / 預告 / 特別集）
- 季數 / 集數
- 標籤
- Firstory Playlist
- 發布類型（公開 / 訂閱者限定 / 免費+訂閱）
- Apple Podcast 訂閱者音檔、提前公開
- 廣告位置設定（Pre-roll / Mid-roll）

### YouTube 專屬
- 影片上傳
- YouTube 標題（可覆寫集數標題）
- YouTube 說明（可覆寫集數說明）
- YouTube 縮圖
- YouTube Playlist
- 能見度（公開 / 不公開列出 / 私人）
- Made for Kids
- AI 生成內容聲明

### 共用（跨平台預設值或聯動）
- 標題（各平台可獨立覆寫）
- 說明（各平台可獨立覆寫）
- 封面圖片（RSS 用；YouTube 有獨立縮圖）
- **發布時間**（Phase 1：RSS 與 YouTube 同步觸發；未來預留獨立操作）

---

## 新 Wizard 結構（4 步驟）

### Step 1：上傳媒體

```
音訊（必填）
└─ AI 自動生成 Transcript（是 / 否）

影片（選填）
└─ 提示：連接 YouTube 後可發布至 YouTube
```

### Step 2：基本資訊

集數層級的內容設定，作為各平台的預設值。

```
標題（必填）
說明（必填）
封面圖片

── RSS 專屬 ──
Explicit
集數類型（完整集 / 預告 / 特別集）
季數 / 集數
標籤
Firstory Playlist
```

### Step 3：平台發布設定

```
發布時間                        ← 全局，Phase 1 同步影響所有平台
  ○ 立即發布
  ○ 排程  [日期時間選擇器]
  （未來可在各平台 accordion 內覆寫）

────────────────────────────────

▼ RSS（永遠展開）
  發布類型：公開 / 訂閱者限定 / 免費+訂閱
  └─ 訂閱者限定：Firstory 訂閱層級選擇
  └─ 免費+訂閱：訂閱者專屬音檔、Apple 設定
  Apple Podcast 提前公開

▼ YouTube（有影片才顯示）
  標題（預帶集數標題，可獨立修改）
  說明（預帶集數說明，可獨立修改）
  縮圖（選填）
  Playlist（下拉）
  能見度：公開 / 不公開列出 / 私人
  Made for Kids：是 / 否
  AI 生成內容：是 / 否

▼ 廣告（有廣告設定才顯示）
  廣告位置設定（Pre-roll / Mid-roll）
  （目前 Audio only；未來可能擴充至影片）
```

### Step 4：預覽 & 發布

確認集數資訊摘要，發布。

---

## 條件顯示邏輯

| 區塊 | 顯示條件 |
|------|----------|
| Step 1 影片上傳 | 永遠顯示 |
| YouTube accordion（Step 3） | 已連接 YouTube **且** 已上傳影片 |
| 廣告 accordion（Step 3） | 節目有啟用 Ad Campaign |
| RSS 訂閱者設定 | 選擇「訂閱者限定」或「免費+訂閱」 |
| Apple 設定 | 節目已連接 Apple Podcasts |

---

## 與現有實作的差異

| 項目 | 現有 | 新架構 |
|------|------|--------|
| Ad Campaign | 獨立第 3 步驟 | 收進 Step 3 RSS accordion |
| YouTube 設定 | 分散在 Details + Review | 集中在 Step 3 YouTube accordion |
| 發布時間 | 在 Review 表單內 | 獨立在 accordion 之上（全局） |
| 發布類型（公開/訂閱） | 在 Review | 在 Step 3 RSS accordion |

---

## 明確不做（Phase 1）

- YouTube 與 RSS 獨立發布時間
- Apple Video、Spotify Video
- Video-first（從影片提取音軌）
