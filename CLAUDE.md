# SDD 產物管理

## 依賴鏈與下游影響

`prd → user-story → ac`（wireframe 可選，不在主鏈）

| 改了 | 需檢查下游 |
|------|-----------|
| prd | user-story, ac |
| user-story | ac |
| ac | 無 |

## 標準檔名

| 產物 | 檔名 |
|------|------|
| PRD | `prd.md` |
| User Story | `user-story-phase-{N}.md` |
| AC | `acceptance-criteria-phase-{N}.md` |
| Wireframe | `wireframe.html`（可選）|

向後相容：舊 PRD（無 `Current Phase` 標記）→ 下游用 `user-story.md`、`acceptance-criteria.md`。
Feature slug：kebab-case。版本由 git 追蹤，檔案內不寫版本號。

## 修改流程

1. 直接編輯（不備份）→ 查表列出受影響下游
2. `git add` + `git commit`（格式：`{type}({slug}): {描述}`）
3. 提示：「如需發 PR，請執行 `/frontend-pr {slug}`」

## 其他

- 委派前確認上游產物齊全（缺少則中止）
- 實作交付用 `/frontend-pr {slug}`，不另建 GitHub issues
