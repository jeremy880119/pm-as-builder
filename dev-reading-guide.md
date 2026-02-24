# Dev/DevOps — SDD 閱讀指南 & Tasks.md 模板

> 拿到 SDD 四份產物後，用這份指南決定「現在該讀什麼、讀多深」。

---

## 1. 情境閱讀矩陣

| 情境 | PRD | User Story | Wireframe | AC |
|------|-----|-----------|-----------|-----|
| **Pre-sync** | **全讀**：概述 → 功能範圍 → 名詞定義 → 限制與邊界 → 開放問題 | **全讀**：Stories 總覽表 → Epic 分組 → User Flow 依賴圖 | **略讀**：開 HTML 快速瀏覽主要畫面，記下疑問 | **略讀**：總覽表看覆蓋範圍 |
| **Sprint Planning** | **重讀**：依賴關係 + 開放問題 | **精讀**：Priority + Story Points + Dependencies → 排出 backlog | **跳過**（除非有 UI 疑問需確認） | **略讀**：每個 story 的 scenario 數量，評估工作量 |
| **Sprint 執行** | **按需**：只查目標 story 相關的功能範圍 / 限制與邊界 | **只讀**：目標 story 的 Technical Notes + Dependencies | **精讀**：目標 story 對應畫面的所有狀態 | **精讀**：目標 story 所有 scenarios → 轉測試案例 |
| **Sprint 驗收** | **跳過**（已內化） | **跳過**（已完成） | **對照**：逐畫面 UI 驗證 | **逐條**：BDD 全過 + UI Checklist + NFR |

### 閱讀深度說明
- **全讀**：逐段讀完，做筆記，標記問題
- **精讀**：仔細讀特定 section，理解每個細節
- **略讀**：快速掃過，掌握結構和範圍即可
- **按需**：當 coding 遇到不確定時才回頭查
- **跳過**：這個情境不需要看

---

## 2. Tasks.md 模板

> 複製到你的 sprint 資料夾，替換 `Sprint X` 和 `US-XX`。

```markdown
# Sprint X — [Feature Name] Tasks

## Phase 1: Pre-sync 準備
> 目標：掌握 feature 全貌，帶著問題進 sync 會議。
- [ ] 讀 PRD 概述 + 功能範圍，用一句話總結這個 feature
- [ ] 讀 PRD 名詞定義，確保理解領域術語
- [ ] 讀 PRD 限制與邊界，掌握不做什麼
- [ ] 讀 User Story 總覽表，標記不理解的依賴關係
- [ ] 看 User Flow 依賴圖，確認 Epic 間的順序
- [ ] 開 Wireframe HTML 瀏覽主要畫面，截圖標注疑問
- [ ] 掃 AC 總覽表，了解測試覆蓋範圍
- [ ] 整理 3-5 個要在 sync 會議問的問題

## Phase 2: Sprint Planning
> 目標：排出可執行的 sprint backlog。PM 帶入已排好優先級的候選 stories，Dev 負責以下工作：
- [ ] 確認 PM 排定的目標 stories 技術上可行
- [ ] 檢查每個目標 story 的前置依賴是否已完成/排入
- [ ] 從 Technical Notes 記下技術風險點
- [ ] 估算各 story 的子任務拆解（前端/後端/測試）
- [ ] 確認 PRD 開放問題中是否有影響本 sprint 的項目
- [ ] 依技術依賴關係排定執行順序（含估時）

## Phase 3: Sprint 執行
> 目標：拿到足夠細節開始寫 code + 測試。只聚焦自己負責的 stories。

### US-XX: [Story 名稱]
- [ ] 讀 AC scenarios → 建立測試骨架（test file scaffolding）
- [ ] 查 PRD 功能範圍 / 限制與邊界 → 確認邊界條件
- [ ] 對照 Wireframe 實作 UI（含所有狀態：default/hover/error/loading）
- [ ] 對照 Wireframe i18n 對照表填入文案
- [ ] 實作核心邏輯（依 Technical Notes）
- [ ] 跑過所有 BDD scenarios（Given-When-Then）
- [ ] 自測 happy path + edge cases

### US-XX: [Story 名稱]
<!-- 複製上方區塊，每個 story 一組 -->

## Phase 4: 驗收
> 目標：證明做完了、品質到位。逐條確認所有承諾的 stories 都達標。
- [ ] AC BDD scenarios 全綠（每個 US 逐條確認）
- [ ] UI Verification Checklist 全過（對照 AC 的 UI 驗證清單）
- [ ] NFR 效能指標達標（對照 AC 的非功能性需求）
- [ ] 無 Open Questions 殘留（或已記錄決議）
- [ ] Code review 完成
- [ ] Demo 準備就緒
```
