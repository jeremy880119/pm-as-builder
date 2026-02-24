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

## 2. 版本規則（通用）

- v1.0：初版
- +0.1：局部調整（文案、細節）
- +1.0：結構改動（範圍、流程、架構）
- 檔名格式：`{type}-v{version}-{YYYYMMDD}.md`（wireframe 為 .html）
- Feature slug：kebab-case

## 3. 修改任何 SDD 產物的必要流程

無論是否透過 command，修改 `features/{slug}/` 下產物時必須執行：

0. 備份原檔到 `features/{slug}/.archive/`
1. 分類修改：局部 → +0.1 / 結構 → +1.0
2. 更新版本號 + 日期 + 重新命名檔案
3. 追加變更紀錄
4. Glob 掃描同 slug 下其他產物，判斷下游影響
5. 若結構調整：下游產物也備份 + 升版 +0.1 + 追加變更紀錄
6. 更新所有產物的「相關檔案」版本號
7. 列出需手動確認的下游檔案

## 4. 委派前檢查

- 上游產物全部必須，缺少則中止
- MASTER.md 等參考資料不在檢查範圍
