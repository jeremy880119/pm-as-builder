# Design: 影音上傳與多平台發布

**Date:** 2026-02-27
**Feature Slug:** video-upload-multi-platform
**Status:** Approved

---

## 問題陳述

Firstory 創作者目前只能上傳音訊。Video Podcast 已成為主流趨勢，創作者需要在 Firstory 完成影片上傳後，能直接同步發布至 YouTube，未來擴展至 Apple Video、Spotify Video。

---

## 設計決策

### 媒體模型

- **音訊**：必填，作為 RSS 音訊集數發布
- **影片**：選填，用於各影音平台發布
- 兩者獨立上傳，無互相依賴（Phase 1 不支援從影片提取音軌）
- 每個發布目的地有各自獨立設定

### 架構選擇：漸進展開（Progressive Disclosure）

維持現有分步驟 wizard，影片為可選步驟，平台設定用 accordion 漸進展開。對無影片的創作者零感知干擾。

---

## 集數建立流程（4 步驟 Wizard）

### Step 1：上傳媒體

- **音訊**（必填）：拖曳或點擊上傳 MP3 / WAV，顯示上傳進度條
- **影片**（選填）：拖曳或點擊上傳 MP4，顯示上傳進度條
  - 未連接任何影音平台：顯示小提示「連接 YouTube 以發布影片」，不阻擋上傳
  - 音訊與影片上傳互相獨立，可同時進行

### Step 2：基本資訊

現有欄位不變（標題、說明、封面、集數編號等）。

### Step 3：發布設定

採 accordion 結構，各平台獨立區塊：

```
▼ RSS 發布              （永遠顯示）
  · 發布時間：即時 / 排程
  · 現有欄位（訂閱限制、付費設定等）

▼ YouTube               （有上傳影片 + 已連接 YouTube 才顯示）
  · 標題        [預帶集數標題，可獨立修改]
  · 說明        [預帶集數說明，可獨立修改]
  · 縮圖        [選填：自訂縮圖；未上傳則用影片預設縮圖]
  · Playlist    [下拉選單，拉取已連接頻道的現有播放清單]
  · 能見度      [公開 / 不公開列出 / 私人]
  · Made for Kids [是 / 否]
  · AI 生成內容   [是 / 否]
  · 發布時間    [即時發布 / 排程發布]
  MVP：發布時間與 RSS 同步；未來支援獨立設定

▼ Apple Video           （未來 Phase）
▼ Spotify Video         （未來 Phase）
```

**平台顯示條件：**

| 平台 | 顯示條件 |
|------|---------|
| RSS | 永遠顯示 |
| YouTube | 已上傳影片 AND 已連接 YouTube |
| Apple Video | 已上傳影片 AND 已連接 Apple（未來） |
| Spotify Video | 已上傳影片 AND 已連接 Spotify（未來） |

**邊界條件：**

| 情境 | 行為 |
|------|------|
| 未連接 YouTube | YouTube 區塊不顯示 |
| 已連接但未上傳影片 | YouTube 區塊不顯示 |
| YouTube 授權過期 | 顯示警告 + 引導重新授權，可略過繼續發布 RSS |

### Step 4：預覽 & 發布

現有流程不變，顯示各平台的發布摘要。

---

## 集數列表

### Tab 結構

維持現有「已發布 / 草稿（含排程）」兩個 tab，tab 分類由 **RSS 發布狀態**決定。

### 日期欄

維持現有邏輯不變：
- 草稿無排程：顯示 `-`
- 草稿有排程：顯示排程日期
- 已發布：顯示發布日期

### Platform Badge

每集顯示一排 badge，**有設定就亮，無設定就暗或不顯示**（與發布狀態無關）：

```
[ RSS ]  [ YouTube ]  [ Apple ]  [ Spotify ]
```

- **亮**：該平台有設定（不論是否已發布）
- **暗 / 不顯示**：無影片、未連接、或未針對該平台設定
- 顏色定義：待 UI 設計階段定義

**範例：**
```
集數 A   [ RSS● ]  [ YT● ]     ← 音訊 + 影片都有設定
集數 B   [ RSS● ]              ← 只有音訊，無影片
集數 C   [ RSS● ]              ← 有影片但未連接任何平台
```

---

## 未來平台擴充原則

1. 新增平台 = Step 3 新增一個 accordion section，不改動其他區塊
2. 各平台設定完全獨立，標題、說明可各自覆寫
3. 連接管理統一在「設定 → 整合」頁面，不在集數建立流程裡
4. 音訊平台（Apple Podcasts 音訊、Spotify 音訊）走 RSS，不在此擴充範疇

---

## Phase 規劃

| Phase | 範圍 |
|-------|------|
| Phase 1 | 影片上傳 + YouTube 連接 + YouTube 同步發布（隨 RSS 同步觸發） |
| Phase 2 | Apple Video / Spotify Video 支援 |
| Phase 3 | YouTube 發布時間可獨立於 RSS 設定 |

---

## 明確不做（Phase 1）

- 從影片提取音軌作為 RSS 音訊
- YouTube 發布時間獨立於 RSS（Phase 3）
- 影片剪輯、字幕生成等製作功能
- YouTube Shorts
- 多頻道管理
