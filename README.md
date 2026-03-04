# PM-as-Builder 工作流程手冊

用 Claude Code 從構思到 prototype，產出可參考的 PR 交給工程團隊另行實作。

---

## 流程總覽

```
Branch/Worktree → Brainstorm → Plan → Build → Iterate → Verify → Handoff → PR
```

---

## Step 1: 建立隔離環境

```
我想做一個 <功能方向>
```

確認目前所在的 base branch（通常是 `dev`），依功能方向命名新 branch `pm-prototype-<feature>`，再依情況選擇：
- **只做這件事** → `git checkout -b pm-prototype-<feature>`
- **同時還有其他工作沒做完，或需要平行開發多個功能** → `/superpowers:using-git-worktrees`（每個功能各建一個獨立目錄）

## Step 2: Brainstorm

```
/superpowers:brainstorming
```

產出 `design.md`，放進新建的功能資料夾 `docs/plans/YYYY-MM-DD-<feature>/`。釐清需求、探索方案、確定設計方向。

## Step 3: Plan

```
/superpowers:writing-plans
```

產出 `plan.md`，放進功能資料夾。拆解實作步驟，並新增以下區塊：

```markdown
## Success Metrics（草稿）
如何衡量這個功能是否成功？依功能性質選擇合適的指標，例如：
- 採用率、使用頻率
- 漏斗轉換率
- 完成效率（時間、步驟數）
- 錯誤率、重試率
- 用戶滿意度 / 回饋
- 業務指標（營收、轉換）
```

Build 和 Verify 階段對照此清單執行。

## Step 4: Build Prototype

```
/ui-ux-pro-max
```

搭配以下 skill 之一：
- **3+ 獨立頁面/組件** → `/superpowers:subage283nt-driven-development`
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
截圖並寫 spec：
1. 在背景啟動 dev server，等它就緒
2. 讀取截圖 script ~/Documents/pm-as-builder/scripts/screenshot-pages.ts，產生 pages config 並執行截圖，存到功能資料夾的 screenshots/。截圖 script 不要在背景跑，要等它完成
3. 讀取 spec 模板 ~/Documents/pm-as-builder/templates/spec.md，搭配截圖、design.md、plan.md 寫 spec.md，放進功能資料夾
```

若專案需要登入，加一句「需要登入，session 檔在 auth.json」。截圖 script 會自動開瀏覽器讓你登入，登入後自動繼續，不需要按 enter。

## Step 8: PR

```
/commit-commands:commit-push-pr
```

PR 預設 merge 回 Step 1 的 base branch。PR body 指向 spec.md：

```markdown
## Summary
PM prototype for <feature>. Mock data, no real API.
👉 完整規格文件：[spec.md](../blob/<branch>/docs/plans/YYYY-MM-DD-<feature>/spec.md)

## This PR is a prototype — 工程師請參考但另行實作
```

---

## 原則

- **plan.md 不回寫** — code 是 SSOT，plan.md 保留設計意圖
- **spec.md 獨立** — 工程師只看 spec + PR code
- **prototype 是 spec** — 視覺即規格，減少文字溝通成本
