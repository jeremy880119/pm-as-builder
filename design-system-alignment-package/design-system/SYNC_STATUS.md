# Design System Sync Status Report

> **狀態：** 等待 Codebase 指定
> **生成日期：** 2026-02-04
> **MASTER.md 版本：** v1.1.0

---

## 執行前置條件

- [ ] 目標 codebase 路徑已指定
- [ ] 確認使用 Tailwind CSS + shadcn/ui
- [ ] 確認有寫入權限

**目標 Codebase：** `[待指定]`

---

## A. 文檔有寫但代碼沒做 (Missing in Code)

> MASTER.md 定義了但 codebase 中找不到對應實作

| Token | MASTER.md Value | 建議 |
| --- | --- | --- |
| *掃描後填入* |  |  |

**統計：** 0 項

---

## B. 代碼有做但文檔沒寫 (Undocumented)

> Codebase 中存在但 MASTER.md 未定義的模式

| Pattern | File | Line | 建議 |
| --- | --- | --- | --- |
| *掃描後填入* |  |  |  |

**統計：** 0 項

### B.1 硬編碼顏色

| Color | File | Line | 建議 Token |
| --- | --- | --- | --- |
| *掃描後填入* |  |  |  |

### B.2 非標準間距

| Value | File | Line | 建議 Token |
| --- | --- | --- | --- |
| *掃描後填入* |  |  |  |

### B.3 非標準圓角

| Value | File | Line | 建議 Token |
| --- | --- | --- | --- |
| *掃描後填入* |  |  |  |

---

## C. 數值不一致 (Mismatch)

> MASTER.md 與 codebase 的值不同

| Token | MASTER.md | Code Value | File | Line |
| --- | --- | --- | --- | --- |
| *掃描後填入* |  |  |  |  |

**統計：** 0 項

---

## D. 組件覆蓋率 (Component Coverage)

| Component | MASTER.md | Code Status | Notes |
| --- | --- | --- | --- |
| Button | Section 2.1 | - [ ] 待檢查 |  |
| Card | Section 2.2 | - [ ] 待檢查 |  |
| Table | Section 2.3 | - [ ] 待檢查 |  |
| Tabs | Section 2.4 | - [ ] 待檢查 |  |
| Input | Section 2.5 | - [ ] 待檢查 |  |
| Alert/Banner | Section 2.6 | - [ ] 待檢查 |  |
| Modal | Section 2.7 | - [ ] 待檢查 |  |
| Empty State | Section 2.8 | - [ ] 待檢查 |  |
| Status Badge | Section 2.9 | - [ ] 待檢查 |  |
| Loading | Section 2.10 | - [ ] 待檢查 |  |

**組件覆蓋率：** 0/10 (0%)

---

## E. 反模式檢測 (Anti-Pattern Detection)

### E.1 色彩反模式

| Issue | Count | Files |
| --- | --- | --- |
| 硬編碼 hex color | 0 |  |
| 非系統顏色 | 0 |  |
| 語意色誤用 | 0 |  |

### E.2 排版反模式

| Issue | Count | Files |
| --- | --- | --- |
| 非系統字體大小 | 0 |  |
| 行高 < 1.3 | 0 |  |
| 非系統字體 | 0 |  |

### E.3 組件反模式

| Issue | Count | Files |
| --- | --- | --- |
| Emoji 作為 UI 圖標 | 0 |  |
| 混用圓角值 | 0 |  |
| 非下劃線式 Tab | 0 |  |
| 空狀態缺少必要元素 | 0 |  |

### E.4 佈局反模式

| Issue | Count | Files |
| --- | --- | --- |
| 非 4px 倍數間距 | 0 |  |
| z-index 未管理 | 0 |  |

---

## F. 健康分數 (Health Score)

| Category | Score | Weight | Weighted |
| --- | --- | --- | --- |
| Color Tokens | -% | 30% | - |
| Typography Tokens | -% | 15% | - |
| Spacing Tokens | -% | 15% | - |
| Component Specs | -% | 25% | - |
| Anti-Patterns | -% | 15% | - |

**Overall Health Score: --%**

---

## G. 待決策項目

> 需要 PM 決策的 Undocumented 模式

| # | Pattern | 選項 | 決策 |
| --- | --- | --- | --- |
| 1 | *掃描後填入* | 加入 MASTER.md / 修正為現有 Token / 刪除 |  |

---

## H. 執行紀錄

| Phase | 狀態 | 日期 | 備註 |
| --- | --- | --- | --- |
| Phase 1: 健康檢查 | - [ ] 待執行 |  |  |
| Phase 2: 文檔補全 | - [ ] 待執行 |  |  |
| Phase 3: 代碼對齊 | - [ ] 待執行 |  |  |
| Phase 4: 驗證收尾 | - [ ] 待執行 |  |  |

---

## 附錄：掃描範圍

### 檔案類型

```
tailwind.config.{js,ts,mjs}  → Tailwind 設定
globals.css / styles/*.css   → CSS Variables
components/ui/**/*.tsx       → shadcn 組件
app/**/*.tsx                 → 頁面組件
```

### 忽略規則

使用 `/* ds-ignore */` 註解可忽略特定行：

```tsx
const specialColor = "#123456"; /* ds-ignore */
```

---

*Report Template v1.0 | Awaiting codebase path*
