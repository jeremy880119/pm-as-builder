# PM-as-Builder 工作流程手冊

用 Claude Code 從構思到 prototype，產出可參考的 PR 交給工程團隊另行實作。

---

## 流程總覽

```
Branch → 資料夾 → Brainstorm → Plan → Build → Iterate → Verify → QA → Handoff → PR
```

---

## Step 1: Branch

```bash
git checkout dev && git checkout -b feature/pm-prototype-<feature>
```

命名用 `pm-prototype-` 前綴，讓工程師一看就知道這是 prototype。

## Step 2: 開功能資料夾

```bash
mkdir docs/plans/YYYY-MM-DD-<feature>/
```

## Step 3: Brainstorm

```
/superpowers:brainstorming
```

產出 `design.md`，放進功能資料夾。釐清需求、探索方案、確定設計方向。

## Step 4: Plan

```
/superpowers:writing-plans
```

產出 `plan.md`，放進功能資料夾。拆解實作步驟、定義驗收標準。

## Step 5: Build Prototype

```
/superpowers:executing-plans
/ui-ux-pro-max
```

用 mock data 建構完整 UI/UX prototype。目標是「看得到、點得到」的產品樣貌。

## Step 6: Iterate

```
（直接對話修改，例如：「把這個按鈕改成藍色」「新增一個空狀態畫面」）
```

多次迭代直到滿意。不需要特殊指令，直接跟 Claude 說要改什麼。

## Step 7: Verify

```
/superpowers:verification-before-completion
```

逐項確認 plan.md 中所有項目都已實作，包含 edge cases：
- 空狀態
- 超長文字
- 大量資料
- 錯誤狀態 UI

## Step 8: QA

```
「幫我跑一輪所有 user flow，截圖關鍵畫面」
```

自己也手動操作一輪，確認 happy path + edge case 都正常。

## Step 9: Handoff

```
「根據 handoff 模板寫 handoff.md，放進功能資料夾」
```

模板結構如下：

```markdown
# <Feature> Handoff

## 概覽
一句話描述功能。

## 畫面清單
- [ ] 頁面 A — 描述 + 對應檔案路徑
- [ ] 頁面 B — ...

## Mock Data 替換表
| 檔案/位置 | 用途 | 替換為 |
|-----------|------|--------|
| `src/mocks/xxx.ts` | 模擬 API 回傳 | 真實 API endpoint |

## 與原始 Plan 的差異
- 原本 plan 說 X，實際做成 Y，因為...

## Edge Cases 已處理
- 空狀態：✅
- 超長文字：✅

## 未實作項目（需工程補完）
- [ ] 真實 API 串接
- [ ] 權限控制
- [ ] Error handling
- [ ] Loading states

## Notes / 開放問題
```

## Step 10: PR

```
/commit-commands:commit-push-pr
```

PR body 指向 handoff.md：

```markdown
## Summary
PM prototype for <feature>. Mock data, no real API.
👉 完整交付文件：[handoff.md](../blob/<branch>/docs/plans/YYYY-MM-DD-<feature>/handoff.md)

## This PR is a prototype — 工程師請參考但另行實作
```

---

## 原則

- **plan.md 不回寫** — code 是 SSOT，plan.md 保留設計意圖
- **handoff.md 獨立** — 工程師只看 handoff + PR code
- **prototype 是 spec** — 視覺即規格，減少文字溝通成本
