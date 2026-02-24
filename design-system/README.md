# Firstory Studio Design System

> ui-ux-pro-max Master + Overrides Pattern

## 檔案結構

```
design-system/
├── MASTER.md          # 全域設計規範（Source of Truth）
├── README.md          # 本說明文件
└── pages/             # 頁面級別覆寫
    ├── dashboard.md   # Dashboard 特定規則（如需要）
    ├── analytics.md   # 成效分析頁特定規則（如需要）
    └── ...
```

## 使用方式

### 建立新頁面時

1. **先讀取 MASTER.md** 作為基礎規範
2. 檢查 `pages/` 資料夾是否有該頁面的覆寫檔
3. 若有頁面覆寫，**頁面規則優先於 Master**

### Prompt 範例

```
我正在建立 [頁面名稱] 頁面。
請先讀取 design-system/MASTER.md 作為設計規範。
也檢查 design-system/pages/[頁面名稱].md 是否存在。
若頁面檔存在，以其規則覆蓋 Master 規則。
```

## 何時需要頁面覆寫？

只有當某頁面有**特殊需求**，需要偏離 Master 規範時才建立覆寫檔。

例如：
- Dashboard 需要特殊的漸層卡片
- 編輯器頁面需要不同的 spacing
- 某功能需要實驗性的新組件

## 覆寫檔格式

```markdown
# [頁面名稱] - 設計覆寫

> 覆寫 MASTER.md 的規則

## 覆寫項目

### [覆寫的 section 名稱]

| 項目 | Master 值 | 本頁覆寫值 | 原因 |
| --- | --- | --- | --- |
| ... | ... | ... | ... |

## 本頁專屬組件

（若有頁面專屬的組件規範）
```

## 版本

- **MASTER.md**: v1.1.0 (2026-02-03)
- 基於 21 張 Firstory Studio 截圖審計建立

## 相關檔案

- 原始審計報告：`studio-design/DESIGN_AUDIT_REPORT.md`
- 原始規範檔：`studio-design/DESIGN_SYSTEM_SPEC.md`
