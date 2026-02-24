# SDD 產物版本管理（全域規則）

所有 SDD command（/prd、/user-story、/wireframe、/acceptance-criteria）及手動修改均遵循本規則。

---

## 1. SDD 產物依賴鏈（嚴格線性，全部必須）

```
prd → user-story → wireframe → ac
```

| 產物 | 必須上游 | 下游 |
|------|---------|------|
| prd | 無（起點） | user-story, wireframe, ac |
| user-story | prd | wireframe, ac |
| wireframe | prd, user-story | ac |
| ac | prd, user-story, wireframe | 無（終點） |

- 無「建議」「可選」分類，全部必須
- MASTER.md 不在依賴鏈中（屬 wireframe command 內部的設計系統參考）

## 2. 標準檔名與版本追蹤

每個 feature 目錄下，產物使用固定檔名：

| 產物 | 檔名 |
|------|------|
| PRD | `prd.md` |
| User Story | `user-story.md` |
| Wireframe | `wireframe.html` |
| Acceptance Criteria | `acceptance-criteria.md` |

- Feature slug：kebab-case
- 版本歷史由 git commit 追蹤，不在檔名加版號
- 檔案內的版本/日期欄位保留（方便閱讀），修改時一併更新

## 3. 修改任何 SDD 產物的必要流程

無論是否透過 command，修改 `features/{slug}/` 下產物時必須執行：

1. 直接編輯檔案（不備份、不重命名）
2. 更新檔案內的版本號 + 日期欄位
3. 追加變更紀錄
4. Glob 掃描同 slug 下其他產物，判斷下游影響
5. 若結構調整：下游產物也更新版本欄位 + 追加變更紀錄
6. 更新所有產物的「相關檔案」版本號
7. 列出需手動確認的下游檔案
8. `git add` 所有變更檔案 + `git commit`

**Commit message 格式：** `{type}({slug}): {描述}`

範例：
- `prd(active-subscribers-enhancements): 新增定價表章節`
- `wireframe(saas-plan-upgrade-downgrade): 調整降級流程 UI`
- `ac(living-spec): 補充邊界條件測試案例`

## 4. 委派前檢查

- 上游產物全部必須，缺少則中止
- MASTER.md 等參考資料不在檢查範圍
