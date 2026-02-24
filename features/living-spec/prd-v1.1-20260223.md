# Feature: Living Spec

**Feature Slug：** living-spec
**版本：** v1.1
**日期：** 2026-02-23
**狀態：** Draft
**前序產物：** 無（起點）

---

## 概述

### 問題陳述
- **痛點：** Spec 和 code desync——spec 寫完就過時，三個月後描述的是一個已經不存在的系統。PM 逐漸失去對產品現狀的掌握力，每次要理解現狀都得開會問 Dev。（痛點程度：5-6/10）
- **不解決的後果：** PM 決策品質下降，因為對產品現狀理解不足。Dev 被迫反覆充當翻譯機，中斷高價值工作。新人 onboard 時知識鎖在人腦中，效率低落。

### 目標用戶
- **PM：** 想隨時掌握產品現狀，不需透過 Dev 就能理解系統行為與變更影響
- **Dev：** 想從「翻譯工作」中解放，專注架構決策與實作
- **現有替代方案：** 定期開會對齊、口頭詢問、翻閱過時的 spec 文件

### 成功指標
- PM 與 Dev 之間「這個功能現在怎樣」類型的對齊會議/對話次數明顯減少
- PM 能直接從 repo 中的 spec 檔案理解最近的 code 變更

---

## 名詞定義

| 名詞 | 定義 |
|------|------|
| Living Spec | 與 code 保持同步的 spec 文件，存放在 repo 中，隨 code 變更自動產出更新建議 |
| Spec Diff | AI 根據 PR 的 code diff 產出的自然語言變更摘要 |
| Sync Job | 在 PR 提交時觸發的自動化任務，負責分析 diff 並產出 spec 更新建議 |

---

## 功能範圍

### 核心功能（MVP）
- **Code → Spec 單向同步：** Dev 提交 PR 時，自動觸發 AI 分析 code diff，產出自然語言變更摘要
- **PR Comment 呈現：** Spec 更新建議以 PR comment 形式出現，方便 Dev 和 PM 在 review 時一併確認
- **Spec 檔案存放在 repo：** Spec 以 markdown 格式存放於 `/specs` 目錄，與 code 一起版控
- **建議更新模式：** AI 產出的 spec 更新是「建議」，需要人 review 後手動合併到 spec 檔案
- **無映射關係：** MVP 不建立 spec 段落與 code 區塊的對應關係，AI 直接讀取 PR diff 產出摘要

### 明確不做
- Spec → Code 影響標記（PM 改 spec 後通知 Dev 受影響的 code）
- Reader 並排閱讀介面
- 自動更新 spec（全自動 commit 模式）
- 映射關係建立與維護
- 對外 SaaS 化
- Confluence / Notion 整合
- 通知系統（Slack / email 訂閱）

### 未來考慮
- Spec → Code 反向影響標記
- 自動更新模式（AI 直接 commit spec 更新）
- 映射關係建立（spec 段落 ↔ code 區塊的細粒度對應）
- 並排 Reader 介面
- 通知訂閱（PM 收到 Slack 通知）

---

## 用戶旅程

以文字描述主要路徑與分支：

**入口：** Dev 提交 PR

**Happy Path：**
1. Dev 提交 PR（含 code 變更）
2. CI/自動化觸發 sync job
3. AI 讀取 PR diff，產出自然語言變更摘要（spec diff）
4. 系統將 spec diff 以 PR comment 形式發佈
5. Dev 或 PM 在 review PR 時閱讀 spec diff
6. 若 spec diff 內容正確，由 Dev 或 PM 手動將更新合併到 `/specs` 目錄下對應的 spec 檔案
7. Spec 隨 PR 一起合併到主分支

**分支路徑：**
- AI 產出的摘要不準確 → 人修正後再更新 spec
- PR 只包含純基礎設施變更（如 CI 設定、依賴升級）→ 可跳過 spec 更新
- Spec 檔案尚未建立（新模組）→ AI 建議建立新的 spec 段落

---

## 限制與邊界

| 類型 | 說明 |
|------|------|
| Edge Case | 超大 PR（如大規模重構）可能超過 AI context window，需分段處理或跳過 |
| Edge Case | 純重新命名/移動檔案的 PR，不需要 spec 更新 |
| 業務限制 | MVP 無特別業務限制 |

---

## 依賴關係

| 依賴類型 | 說明 |
|----------|------|
| 資料/能力 | LLM API 存取能力（用於分析 code diff 並產出自然語言摘要） |
| 資料/能力 | CI/CD 平台（待確認，用於觸發 sync job） |
| 其他功能 | 無前置功能依賴 |
| 業務風險 | AI 翻譯品質——描述 code「做了什麼」（what）可靠，但「為什麼」（why）仍需人補充 |

---

## 範圍比較

| 維度 | MVP | 標準版 | 理想版 |
|------|-----|--------|--------|
| 功能 | PR comment spec diff + repo 內 spec 檔案 + 人工 review | + 映射關係 + 自動更新 spec + 通知訂閱 | + Spec→Code 反向 + Reader 介面 + 雙向同步 |
| 同步方向 | Code → Spec 單向 | Code → Spec 單向（自動化） | Code ↔ Spec 雙向 |
| 映射粒度 | 無映射，讀 PR diff | 檔案級映射 | 函式級映射 |
| 時程 | 數天 | 數週 | 數月 |
| 風險 | 低 | 中 | 高 |

---

## 開放問題

- [ ] CI/CD 平台確認（GitHub Actions？其他？）
- [x] ~~Spec 檔案的初始結構規範——是否需要定義 `/specs` 目錄的 markdown 格式標準？~~ → 已解決，見附錄 A
- [ ] 哪些類型的 PR 應自動跳過（如 dependabot、純 CI 設定變更）？

---

## 相關檔案

| 類型 | 檔案 | 狀態 |
|------|------|------|
| PRD | `prd-v1.1-20260223.md` | ✅ 本文件 |
| User Story | `user-story-v{ver}-{date}.md` | ⬜ 尚未產出 |
| Wireframe | `wireframe-v{ver}-{date}.html` | ⬜ 尚未產出 |
| AC | `acceptance-criteria-v{ver}-{date}.md` | ⬜ 尚未產出 |

---

## 變更紀錄

| 版本 | 日期 | 變更內容 | 影響範圍 |
|------|------|----------|----------|
| v1.0 | 2026-02-23 | 初版 | PRD |
| v1.1 | 2026-02-23 | 新增附錄 A：/specs 目錄格式標準；標記開放問題「Spec 檔案初始結構規範」為已解決 | PRD 附錄 |

---

## 附錄 A：/specs 目錄格式標準

### 設計原則

Spec 採用 Gherkin 結構（Given/When/Then），讓 AI 分析 code diff 後能直接對應到具體場景。

### 目錄結構

```
/specs
├── _index.md              # 索引
├── auth.md                # 功能模組 = 一個檔案
├── user-profile.md
└── billing.md
```

- 功能導向，扁平結構，kebab-case 命名

### Spec 檔案模板

```markdown
---
id: auth
title: Authentication
status: active | draft | deprecated
last_updated: 2026-02-23
---

# Authentication

一段話描述功能目的（what & why）。

---

## Sign Up

### Happy Path

**Scenario: 用戶以 email 註冊成功**
- Given: 用戶尚未有帳號
- When: 用戶以有效 email 和密碼提交註冊
- Then: 應建立帳號並發送驗證信

### Edge Cases

**Scenario: email 已被註冊**
- Given: 系統已有該 email 的帳號
- When: 用戶以同一 email 提交註冊
- Then: 應顯示 email 已被使用的提示

### Constraints

- 密碼最少 8 字元，至少含一個數字
- 同一 email 不可重複註冊

---

## Sign In

### Happy Path
...

### Error Handling
...

---

## Changelog

- 2026-02-23: 初版建立 (PR #xxx)
```

### 格式重點

- 以 `## 子功能名稱` 組織（不綁 User Story 編號，因 spec 是長期演進的）
- 每個子功能下分 `### Happy Path`、`### Edge Cases`、`### Error Handling` 三類
- 場景使用 Gherkin 格式：`**Scenario:** + Given/When/Then`
- 每個子功能可附 `### Constraints` 列出硬性限制
- 遵循 BDD 撰寫原則（沙漏原則等）
- 含 Frontmatter（id, title, status, last_updated）方便 AI 解析
- 含 Changelog 追蹤每次變更
- 不含 UI 驗證清單與非功能性需求
