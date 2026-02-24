# SDD 產物管理（全域規則）

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

### 下游影響查表

改了上游產物後，**機械式查表**列出需檢查的下游：

| 改了什麼 | 需檢查 |
|----------|--------|
| prd | user-story, wireframe, ac |
| user-story | wireframe, ac |
| wireframe | ac |
| ac | （無下游） |

## 2. 標準檔名

每個 feature 目錄下，產物使用固定檔名：

| 產物 | 檔名 |
|------|------|
| PRD | `prd.md` |
| User Story | `user-story.md` |
| Wireframe | `wireframe.html` |
| Acceptance Criteria | `acceptance-criteria.md` |

- Feature slug：kebab-case
- 版本歷史完全由 git commit 追蹤，檔案內不寫版本號、日期、changelog

## 3. 修改任何 SDD 產物的必要流程

無論是否透過 command，修改 `features/{slug}/` 下產物時必須執行：

1. 直接編輯檔案（不備份、不重命名）
2. 查表列出受影響的下游產物（見§1 下游影響查表）
3. 列出需手動確認的下游檔案
4. `git add` 所有變更檔案 + `git commit`
5. 若變更已 commit，提示用戶：「本地產物已更新。如需同步 GitHub，請執行 `/sync-github {slug}`」

**Commit message 格式：** `{type}({slug}): {描述}`

範例：
- `prd(active-subscribers-enhancements): 新增定價表章節`
- `wireframe(saas-plan-upgrade-downgrade): 調整降級流程 UI`
- `ac(living-spec): 補充邊界條件測試案例`

## 4. 委派前檢查

- 上游產物全部必須，缺少則中止
- MASTER.md 等參考資料不在檢查範圍
