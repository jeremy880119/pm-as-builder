# 影音上傳與多平台發布 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 產出「影音上傳與多平台發布」功能的完整 PM 交付物，供工程團隊啟動開發。

**Architecture:** 音訊必填走 RSS，影片選填同步至影音平台（Phase 1：YouTube）。集數建立採 4 步驟 wizard，Step 3 以 accordion 管理各平台設定。未來新增平台只需加一個 accordion section。

**Deliverables:** PRD → User Stories → Acceptance Criteria → Wireframe

**Design Doc:** `docs/plans/2026-02-27-video-upload-design.md`

---

## Task 1：寫 PRD

**Files:**
- Create: `features/video-upload-multi-platform/prd.md`

**Step 1: 建立目錄與檔案**

```bash
mkdir -p features/video-upload-multi-platform
```

**Step 2: 寫 PRD**

使用 `/prd` skill，內容涵蓋：
- 問題陳述（音訊限制、影音趨勢）
- 目標用戶（撞牆期專業創作者）
- 成功指標（YouTube 連接率、發布率、留存率）
- 功能範圍 Phase 1（YouTube）/ Phase 2（Apple Video、Spotify Video）
- 名詞定義（Audio+Video 路徑、badge、accordion）
- 用戶旅程（首次連接 YouTube、建立含影片的集數、僅音訊集數）
- 限制與邊界
- 依賴關係（Google OAuth、YouTube Data API、影片儲存）
- 開放問題（見設計文件「待確認項目」）

**Step 3: Commit**

```bash
git add features/video-upload-multi-platform/prd.md
git commit -m "feat(video-upload): add PRD"
```

---

## Task 2：寫 User Stories（Phase 1）

**Files:**
- Create: `features/video-upload-multi-platform/user-story.md`

**Step 1: 規劃 Epic 結構**

| Epic | 內容 |
|------|------|
| EP-01 | YouTube 頻道連接（OAuth） |
| EP-02 | 影片上傳（Step 1 媒體上傳） |
| EP-03 | YouTube 發布設定（Step 3 accordion） |
| EP-04 | 集數列表 Badge 顯示 |

**Step 2: 寫 User Stories**

使用 `/user-story` skill，每個 story 包含：
- As a / I want to / So that
- Use Case
- Acceptance Criteria 摘要（詳細 AC 在 Task 3）
- Priority（P0/P1/P2）、Story Points、依賴

**關鍵 Stories 清單：**

| ID | Title | Priority |
|----|-------|----------|
| US-01 | OAuth 連接 YouTube 頻道 | P0 |
| US-02 | 顯示已連接頻道資訊 | P1 |
| US-03 | 多 YouTube 頻道選擇 | P2 |
| US-04 | 上傳影片檔案（含進度指示） | P0 |
| US-05 | Audio+Video 路徑：分別上傳音訊與影片 | P0 |
| US-06 | YouTube Metadata 設定（標題、說明、縮圖、Playlist、能見度、Made for Kids、AI 旗標） | P1 |
| US-07 | 即時發布與排程發布至 YouTube | P0 |
| US-08 | 集數列表 Badge 顯示（RSS / YouTube） | P0 |

**Step 3: Commit**

```bash
git add features/video-upload-multi-platform/user-story.md
git commit -m "feat(video-upload): add user stories phase 1"
```

---

## Task 3：寫 Acceptance Criteria（P0 Stories）

**Files:**
- Create: `features/video-upload-multi-platform/acceptance-criteria.md`

**Step 1: 寫 AC**

使用 `/acceptance-criteria` skill，針對所有 P0 stories 寫 Gherkin 格式 AC：

- **US-01**：Given 未連接 / When OAuth 完成 / Then 顯示頻道資訊
- **US-04**：Given 已連接 YouTube / When 上傳影片 / Then 顯示進度條與縮圖預覽
- **US-05**：Given 已上傳音訊與影片 / When 進入 Step 3 / Then YouTube accordion 展開顯示
- **US-07**：Given YouTube 設定完成 / When 選擇即時發布並確認 / Then 影片推送至 YouTube
- **US-08**：Given 集數有 YouTube 設定 / When 查看集數列表 / Then YouTube badge 亮起

**邊界條件必須涵蓋：**
- 未上傳影片 → YouTube accordion 不顯示
- YouTube 授權過期 → 顯示警告，RSS 發布不受阻
- 影片格式不支援 → 顯示錯誤，metadata 不丟失

**Step 2: Commit**

```bash
git add features/video-upload-multi-platform/acceptance-criteria.md
git commit -m "feat(video-upload): add acceptance criteria for P0 stories"
```

---

## Task 4：製作 Wireframe

**Files:**
- Create: `features/video-upload-multi-platform/wireframe.html`

**Step 1: 製作 Wireframe**

使用 `/wireframe` skill，涵蓋以下畫面：

1. **Step 1 上傳媒體**：音訊（必填）+ 影片（選填）並排，各自進度條
2. **Step 3 發布設定**：RSS accordion（展開）+ YouTube accordion（展開，含所有欄位）
3. **Step 3 無影片狀態**：只顯示 RSS accordion，YouTube 完全不顯示
4. **集數列表**：badge 組合示意（RSS 亮 + YouTube 亮 / 只 RSS 亮 / 兩者皆暗）

**Step 2: Commit**

```bash
git add features/video-upload-multi-platform/wireframe.html
git commit -m "feat(video-upload): add wireframe"
```

---

## 待確認項目（阻擋工程啟動前需決策）

| # | 問題 | 決策者 |
|---|------|--------|
| 1 | 影片上傳至 Firstory 後是永久保存還是推送至 YouTube 後刪除？ | Engineering / 商業 |
| 2 | YouTube 連接功能是否限定特定付費方案？ | 商業 / PM |
| 3 | YouTube API 配額是否需要排隊機制？ | Engineering |
| 4 | 未驗證 YouTube 頻道的上傳時長限制如何在 UI 提示？ | Product |
