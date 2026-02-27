# 影音上傳功能設計摘要

## 功能定位
Firstory 集數建立流程擴充影片上傳能力。
- **音訊**：必填，走 RSS
- **影片**：選填，走外部影音平台（Phase 1: YouTube；未來：Apple Video、Spotify Video）
- 不支援從影片提取音軌（Video-first 路徑不在範圍內）

## 集數建立流程（4 步驟 wizard）

### Step 1：上傳媒體
- 音訊和影片各自獨立上傳區塊，可同時進行（各自顯示進度條）
- 未上傳影片：Step 3 的 YouTube 設定不顯示
- 未連接 YouTube：影片上傳區顯示小提示，但不阻擋上傳

### Step 2：基本資訊
- 標題、說明、封面（現有欄位不動）

### Step 3：發布設定（accordion）

```
▼ RSS 發布          （永遠顯示）
▼ YouTube           （有影片 + 已連接才顯示）
▼ Apple Video       （未來）
▼ Spotify Video     （未來）
```

**YouTube 設定欄位：**
- 標題（預帶集數標題，可獨立修改）
- 說明（預帶集數說明，可獨立修改）
- 縮圖（選填，未上傳用影片預設縮圖）
- Playlist（下拉，拉取已連接頻道）
- 能見度：公開 / 不公開列出 / 私人
- Made for Kids：是 / 否
- AI 生成內容：是 / 否
- 發布時間：即時 / 排程（MVP 與 RSS 同步觸發；未來支援獨立操作）

### Step 4：預覽 & 發布

---

## 集數列表

### Tab 結構（不變）
- **已發布** tab
- **草稿**（含排程）tab

Tab 歸屬由 **RSS 發布狀態**決定。

### 平台 Badge
每集顯示一排 badge：

```
[ RSS ]  [ YouTube ]  [ Apple ]  [ Spotify ]
```

- **亮** = 該平台有設定
- **暗 / 不顯示** = 無影片、未連接、或未設定
- 顏色細節待定義

---

## 擴充原則
1. 新增平台 = 新增一個 accordion section，不改動其他區塊
2. 各平台設定完全獨立（標題、說明可各自覆寫）
3. 連接管理統一在「設定 → 整合」頁面
4. 音訊平台（Apple Podcasts、Spotify 音訊）走 RSS，不在此範疇

---

## 邊界條件

| 情境 | 行為 |
|------|------|
| 未連接 YouTube | YouTube accordion 不顯示 |
| 已連接但未上傳影片 | YouTube accordion 不顯示 |
| 已連接 + 已上傳影片 | YouTube accordion 展開顯示 |
| YouTube 授權過期 | 顯示警告 + 引導重新授權，可略過繼續發布 RSS |

---

## 明確不做（Phase 1）
- Video-first（從影片提取音軌）
- YouTube 與 RSS 獨立觸發發布
- Apple Video、Spotify Video
- badge 顏色細節定義
