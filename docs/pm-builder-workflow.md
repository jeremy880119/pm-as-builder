# PM-as-Builder 工作流程手冊

用 Claude Code 從構思到 prototype，產出可參考的 PR 交給工程團隊另行實作。

---

## 流程總覽

```
Worktree(dev) → Brainstorm → Plan → Build → Iterate → Verify → Handoff → PR
```

---

## Step 1: Worktree

```
/superpowers:using-git-worktrees
```

從 `dev` 開 worktree，命名 `pm-prototype-<feature>`。功能資料夾 `docs/plans/YYYY-MM-DD-<feature>/` 在 Brainstorm 階段自然建立。

## Step 2: Brainstorm

```
/superpowers:brainstorming
```

產出 `design.md`，放進功能資料夾。釐清需求、探索方案、確定設計方向。

## Step 3: Plan

```
/superpowers:writing-plans
```

產出 `plan.md`，放進功能資料夾。拆解實作步驟，並新增「驗收標準」區塊：

```markdown
## 驗收標準
- [ ] 畫面：列出要看到哪些頁面 / 元件
- [ ] 操作：列出要能執行哪些互動
- [ ] Edge cases：空狀態、超長文字、錯誤狀態等
```

Build 和 Verify 階段對照此清單執行。

## Step 4: Build Prototype

```
/ui-ux-pro-max
```

搭配以下 skill 之一：
- **3+ 獨立頁面/組件** → `/superpowers:subagent-driven-development`
- **否則** → `/superpowers:executing-plans`

用 mock data 建構完整 UI/UX prototype。目標是「看得到、點得到」的產品樣貌。

## Step 5: Iterate

```
（直接對話修改，例如：「把這個按鈕改成藍色」「新增一個空狀態畫面」）
```

多次迭代直到滿意。不需要特殊指令，直接跟 Claude 說要改什麼。

## Step 6: Verify

```
/superpowers:verification-before-completion
```

逐項確認 plan.md 驗收標準都已實作，加上手動操作確認：
- 自己跑一輪所有 user flow
- Happy path + edge cases 都正常
- 可請 Claude 截圖關鍵畫面輔助

## Step 7: Handoff

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

## 整合測試與 QA Checklist

**完整流程測試：**
- [ ] Happy path：從頭到尾跑完主流程，結果正確
- [ ] （依功能補充其他主流程）

**Edge cases：**
- [ ] 空狀態：無資料時 UI 顯示正確
- [ ] 超長文字：截斷或換行正常
- [ ] 錯誤狀態：API 失敗 / 操作失敗有對應提示
- [ ] （依功能補充）

## 未實作項目（需工程補完）
- [ ] 真實 API 串接
- [ ] 權限控制
- [ ] Error handling
- [ ] Loading states

## Notes / 開放問題
```

## Step 8: PR

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
