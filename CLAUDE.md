# SDD 產物管理（全域規則）

所有 SDD command（/prd、/user-story、/acceptance-criteria）及手動修改均遵循本規則。

---

## 1. SDD 產物依賴鏈

```
prd → user-story → ac
```

| 產物 | 必須上游 | 下游 |
|------|---------|------|
| prd | 無（起點） | user-story, ac |
| user-story | prd | ac |
| ac | prd, user-story | 無（終點） |

- Wireframe 為可選產物（手動執行 `/wireframe`），不在主依賴鏈中
- MASTER.md 不在依賴鏈中（屬 wireframe command 內部的設計系統參考）

### 下游影響查表

改了上游產物後，**機械式查表**列出需檢查的下游：

| 改了什麼 | 需檢查 |
|----------|--------|
| prd | user-story, ac |
| user-story | ac |
| ac | （無下游） |

## 2. 標準檔名

每個 feature 目錄下，產物使用固定檔名：

| 產物 | 檔名 | 必要性 |
|------|------|--------|
| PRD | `prd.md` | 必須（一份，含所有 Phase） |
| User Story | `user-story-phase-{N}.md` | 必須（每 Phase 一份） |
| Acceptance Criteria | `acceptance-criteria-phase-{N}.md` | 必須（每 Phase 一份） |
| Wireframe | `wireframe.html` | 可選 |

**向後相容：** 若 PRD 無 `Current Phase` 標記（舊 PRD），下游產物使用原檔名 `user-story.md`、`acceptance-criteria.md`。

- Feature slug：kebab-case
- 版本歷史完全由 git commit 追蹤，檔案內不寫版本號、日期、changelog

## 3. 修改任何 SDD 產物的必要流程

無論是否透過 command，修改 `features/{slug}/` 下產物時必須執行：

1. 直接編輯檔案（不備份、不重命名）
2. 查表列出受影響的下游產物（見§1 下游影響查表）
3. 列出需手動確認的下游檔案
4. `git add` 所有變更檔案 + `git commit`
5. 若變更已 commit，提示用戶：「本地產物已更新。如需發 PR，請執行 `/frontend-pr {slug}`」

**Commit message 格式：** `{type}({slug}): {描述}`

範例：
- `prd(active-subscribers-enhancements): 新增定價表章節`
- `ac(living-spec): 補充邊界條件測試案例`
- `user-story(saas-plan-upgrade-downgrade): 調整 Epic 拆分`

## 4. 委派前檢查

- 主依賴鏈（prd → user-story → ac）的上游產物全部必須，缺少則中止
- Wireframe 為可選，不阻擋 AC 產出
- MASTER.md 等參考資料不在檢查範圍

## 5. 實作交付

- **Frontend PR** 是實作交付物（`/frontend-pr {slug}`）
- PR description 自動引用 SDD 文件，工程師同時參考 PR + SDD
- 不另建 GitHub issues，PR 本身就是追蹤單位
