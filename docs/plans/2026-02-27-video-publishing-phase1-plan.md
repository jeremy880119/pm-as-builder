# 影音上傳 Phase 1 實作計畫（YouTube 整合）

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在 Firstory Studio 集數建立 wizard 加入影片上傳與 YouTube 發布功能，並在集數列表顯示平台 badge。

**Architecture:** 改造現有 `EpisodeUpload` wizard，Step 1 加影片上傳區塊，Step 3 加 YouTube accordion，複用現有 Distribution GraphQL patterns。後端 YouTube OAuth 已存在，前端接現有 API。

**Tech Stack:** React 18, TypeScript, Vite, Apollo Client (GraphQL), MUI, Tailwind CSS v4

**Codebase:** `/Users/jeremy/.claude/PM-workspace/firstory/firstory-studio/src/`

---

## 前置確認（實作前必須解決）

在開始任何 Task 前，先確認以下 API 介面：

| 問題 | 確認方式 |
|------|----------|
| 影片上傳用哪個 hostingApi mutation？欄位為何？ | 查後端 schema 或問後端工程師 |
| YouTube 設定如何隨發布 mutation 傳遞？（獨立欄位 or JSON blob） | 同上 |
| 集數 list query 是否已回傳 `youtubeVideoId`？ | 查 `src/gql/v2/` |
| Playlist 下拉從哪個 API 取得？ | 查後端 schema |
| YouTube 連接狀態從哪個 query 取得？ | 查 `src/entities/` 或 Distribution 系統 |

---

## Task 1：確認 GraphQL Schema（探索）

**Files:**
- 讀取：`src/gql/v2/` 所有 query/mutation 檔案
- 讀取：`src/pages/EpisodeUpload/` 現有邏輯
- 讀取：`src/pages/Distribution/` 作為參考

**Step 1: 找出影片上傳相關 mutation**

```bash
grep -r "video" src/gql/v2/ --include="*.ts" -l
grep -r "youtube" src/gql/ --include="*.ts" -il
```

**Step 2: 找出集數 list query 的回傳欄位**

```bash
grep -r "youtubeVideoId\|youtube_video_id" src/ --include="*.ts"
```

**Step 3: 確認 YouTube 連接狀態的取得方式**

```bash
grep -r "youtubeConnected\|youtube.*connect\|integrat" src/ --include="*.ts" -il
```

**Step 4: 記錄發現，更新設計文件的開放問題表格**

將確認結果填回 `docs/plans/2026-02-27-video-publishing-phase1-design.md` 的「開放問題」區塊。

---

## Task 2：Step 1 — 影片上傳 UI

> **前置條件：** Task 1 完成，確認影片上傳 mutation 介面。

**Files:**
- 修改：`src/pages/EpisodeUpload/Step1/` （或對應的 Step1 元件路徑）
- 新增：`src/components/VideoUpload/VideoUploadBlock.tsx`

**Step 1: 找出音訊上傳區塊的實作位置**

```bash
grep -r "audio.*upload\|AudioUpload" src/pages/EpisodeUpload/ --include="*.tsx" -l
```

**Step 2: 新增 `VideoEditor` 元件（外觀與 AudioEditor 一致）**

元件 props：
```typescript
interface VideoUploadBlockProps {
  onUploadComplete: (videoId: string) => void;
  youtubeConnected: boolean;
}
```

行為：
- 顯示拖曳上傳區 + 進度條
- `youtubeConnected === false` 時顯示小提示（不阻擋）
- 上傳完成後呼叫 `onUploadComplete(videoId)`

**Step 3: 在 Step 1 用 Tabs 包住 AudioEditor 與 VideoEditor**

排版：音訊/影片以 Tab 切換（pill style，`w-fit` 靠左），不並排。

**Step 4: 在 wizard state 加入 `videoId: string | null`**

找到 wizard 的 state 管理位置（可能是 context 或 reducer），加入 `videoId`。

**Step 5: 手動測試**
- 上傳音訊 → 影片區保持待機
- 上傳影片 → 顯示進度條 → 完成後 `videoId` 存入 state
- 未連接 YouTube → 顯示小提示

**Step 6: Commit**

```bash
git add src/components/VideoUpload/ src/pages/EpisodeUpload/
git commit -m "feat: Step 1 加入影片上傳區塊"
```

---

## Task 3：Step 3 — YouTube Accordion

> **前置條件：** Task 1 完成（確認 YouTube 設定 mutation 欄位）。

**Files:**
- 修改：`src/pages/EpisodeUpload/Step3/` （發布設定頁）
- 新增：`src/components/YouTubeSettings/YouTubeSettingsAccordion.tsx`

**Step 1: 找出現有 accordion 的實作（RSS 部分）**

```bash
grep -r "accordion\|Accordion\|RSS" src/pages/EpisodeUpload/Step3/ --include="*.tsx"
```

**Step 2: 新增 `YouTubeSettingsAccordion` 元件**

Props：
```typescript
interface YouTubeSettingsAccordionProps {
  episodeTitle: string;      // 預帶值
  episodeDescription: string; // 預帶值
  playlists: Playlist[];
  onChange: (settings: YouTubeSettings) => void;
}

interface YouTubeSettings {
  title: string;
  description: string;
  thumbnailUrl?: string;
  playlistId?: string;
  visibility: 'public' | 'unlisted' | 'private';
  madeForKids: boolean;
  aiGeneratedContent: boolean;
  scheduledAt?: string; // ISO datetime，null = 即時
}
```

**Step 3: 實作 Playlist 下拉**

使用 Task 1 確認的 API 拉取 playlist 列表，MUI `Select` 元件顯示。

**Step 4: 條件渲染邏輯**

在 Step 3 頁加入條件：

```typescript
const showYouTubeAccordion = youtubeConnected && videoId !== null;
```

**Step 5: 授權過期狀態**

若 YouTube 授權過期，accordion 內顯示警告 banner + 「重新授權」按鈕，並允許使用者略過繼續發布 RSS。

**Step 6: 手動測試**
- 未連接 YouTube → accordion 不出現
- 已連接 + 無影片 → accordion 不出現
- 已連接 + 有影片 → accordion 出現，欄位預帶值正確
- 授權過期 → 警告顯示，可略過

**Step 7: Commit**

```bash
git add src/components/YouTubeSettings/ src/pages/EpisodeUpload/Step3/
git commit -m "feat: Step 3 加入 YouTube 發布設定 accordion"
```

---

## Task 4：發布 Mutation 整合

> **前置條件：** Task 2、Task 3 完成；Task 1 確認發布 mutation 欄位。

**Files:**
- 修改：`src/pages/EpisodeUpload/` 發布邏輯（Step 4 或 submit handler）
- 修改：`src/gql/v2/` 對應 mutation

**Step 1: 找出現有發布 mutation**

```bash
grep -r "publishEpisode\|createEpisode\|submitEpisode" src/gql/ --include="*.ts"
```

**Step 2: 擴充 mutation 加入影片與 YouTube 欄位**

根據 Task 1 確認的後端 schema 擴充 GraphQL mutation。

**Step 3: 在 submit handler 傳入 `videoId` 和 `youtubeSettings`**

若 `videoId === null`，不傳 YouTube 相關欄位。

**Step 4: 手動測試（完整流程）**
- 只上傳音訊 → 正常發布 RSS
- 音訊 + 影片 + YouTube 設定 → 發布後 YouTube 有影片

**Step 5: Commit**

```bash
git add src/gql/ src/pages/EpisodeUpload/
git commit -m "feat: 發布 mutation 整合影片與 YouTube 設定"
```

---

## Task 5：集數列表 Platform Badge

> **前置條件：** Task 1 確認 list query 是否已有 `youtubeVideoId`。

**Files:**
- 修改：集數列表頁（路徑待確認，搜尋 `EpisodeList` 或 `episodes` 頁）
- 新增：`src/components/PlatformBadge/PlatformBadge.tsx`

**Step 1: 找出集數列表的元件位置**

```bash
grep -r "EpisodeList\|episodeList\|episode-list" src/pages/ --include="*.tsx" -l
```

**Step 2: 新增 `PlatformBadge` 元件**

```typescript
interface PlatformBadgeProps {
  platform: 'rss' | 'youtube';
  active: boolean;
}
```

顯示：亮色（active）或暗色（inactive）badge。暫用 MUI Chip。

**Step 3: 在集數列表每一列加入 badge**

```typescript
<PlatformBadge platform="rss" active={true} />
{episode.youtubeVideoId && <PlatformBadge platform="youtube" active={true} />}
```

**Step 4: 若 list query 缺少 `youtubeVideoId`，擴充 query**

**Step 5: 手動測試**
- 有影片的集數 → RSS + YouTube badge 都亮
- 無影片的集數 → 只有 RSS badge

**Step 6: Commit**

```bash
git add src/components/PlatformBadge/ src/pages/
git commit -m "feat: 集數列表加入平台 badge"
```

---

## Task 6：整合測試與 QA Checklist

**完整流程測試：**

- [ ] 建立集數，只上傳音訊 → 發布成功，RSS 正常，無 YouTube badge
- [ ] 建立集數，上傳音訊 + 影片，填 YouTube 設定 → 發布成功，YouTube 有影片，badge 顯示
- [ ] 未連接 YouTube → 影片上傳有提示，Step 3 無 YouTube accordion
- [ ] YouTube 授權過期 → 警告顯示，可略過只發 RSS
- [ ] 發布後集數列表 badge 狀態正確

**Edge cases：**
- [ ] 影片上傳中途取消 → state 正確清除
- [ ] YouTube 設定填了一半，回到 Step 1 再來 → 設定保留
- [ ] Playlist 載入失敗 → 下拉顯示空或錯誤提示

---

## 明確不做（Phase 1）

- Video-first（從影片提取音軌）
- YouTube 與 RSS 獨立觸發發布
- Apple Video、Spotify Video
- Badge 顏色細節定義
- YouTube 發布時間與 RSS 獨立操作
