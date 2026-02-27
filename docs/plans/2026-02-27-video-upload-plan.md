# 影音上傳與多平台發布 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 產出完整的影音上傳功能 PM 文件，涵蓋 PRD、User Stories、Acceptance Criteria。

**Architecture:** 以 `docs/plans/2026-02-27-video-upload-design.md` 為設計基礎，依序產出 PRD → User Stories → AC。各文件放在 `features/video-upload/` 目錄下。

**Tech Stack:** Markdown、Mermaid（flowchart）、Gherkin（AC）

---

## Task 1：建立 feature 目錄結構

**Files:**
- Create: `features/video-upload/` 目錄

**Step 1: 建立目錄**

```bash
mkdir -p features/video-upload
```

**Step 2: Commit**

```bash
git add features/video-upload
git commit -m "chore: init video-upload feature directory"
```

---

## Task 2：撰寫 PRD

**Files:**
- Create: `features/video-upload/prd.md`
- Reference: `docs/plans/2026-02-27-video-upload-design.md`

**Step 1: 撰寫 PRD**

內容結構：
1. 概述（問題陳述、目標用戶、成功指標、策略對齊）
2. 名詞定義
3. Roadmap 總覽（Phase 1 / 2 / 3）
4. Phase 1 功能範圍（核心功能 + 明確不做）
5. Phase 1 用戶旅程（旅程 A/B/C）
6. 限制與邊界
7. 依賴關係
8. 開放問題

關鍵設計決策（來自 design doc）：
- 音訊必填、影片選填；兩者獨立上傳
- Phase 1 不支援從影片提取音軌
- Step 3 accordion 結構；各平台設定獨立
- YouTube 顯示條件：有影片 AND 已連接
- 集數列表：badge 模式（有設定就亮）
- MVP：YouTube 發布時間跟 RSS 同步

**Step 2: Commit**

```bash
git add features/video-upload/prd.md
git commit -m "feat(prd): 影音上傳與多平台發布 Phase 1"
```

---

## Task 3：撰寫 User Stories

**Files:**
- Create: `features/video-upload/user-story.md`
- Reference: `features/video-upload/prd.md`

**Step 1: 規劃 Epic 與 Story 結構**

預期 Epic：
- EP-01：媒體上傳（音訊 + 影片）
- EP-02：YouTube 連接
- EP-03：YouTube 發布設定
- EP-04：集數列表 Badge 顯示

每個 Story 包含：Use Case、Acceptance Criteria 摘要、Priority、Story Points、依賴。

**Step 2: 撰寫 User Stories**

依 `/user-story` skill 格式撰寫。

**Step 3: Commit**

```bash
git add features/video-upload/user-story.md
git commit -m "feat(user-story): 影音上傳與多平台發布 Phase 1"
```

---

## Task 4：撰寫 Acceptance Criteria

**Files:**
- Create: `features/video-upload/acceptance-criteria.md`
- Reference: `features/video-upload/user-story.md`

**Step 1: 撰寫 AC**

依 `/acceptance-criteria` skill 格式，用 Gherkin Given/When/Then 撰寫每個 Story 的 AC。

重點涵蓋：
- 影片上傳進度指示與錯誤處理
- YouTube accordion 顯示 / 隱藏條件
- Badge 亮暗邏輯
- YouTube 授權過期的 fallback 行為

**Step 2: Commit**

```bash
git add features/video-upload/acceptance-criteria.md
git commit -m "feat(ac): 影音上傳與多平台發布 Phase 1"
```

---

## 開放問題（需在 PRD 中標註）

| # | 問題 | 影響 |
|---|------|------|
| 1 | 影片暫存策略：上傳至 YouTube 後是否刪除原始檔？ | 儲存成本 |
| 2 | YouTube API 配額是否需要排隊機制？ | Phase 1 上線規模 |
| 3 | 未驗證 YouTube 頻道的時長限制如何在 UI 提示？ | UX |
| 4 | 影音功能是否限定付費方案？ | 商業決策 |
