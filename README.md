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

產出 `plan.md`，放進功能資料夾。拆解實作步驟，並新增「驗收標準」區塊：

```markdown
## 驗收標準
- [ ] 畫面：列出要看到哪些頁面 / 元件
- [ ] 操作：列出要能執行哪些互動
- [ ] Edge cases：空狀態、超長文字、錯誤狀態等

## Success Metrics（草稿）
如何衡量這個功能是否成功？依功能性質選擇合適的指標，例如：
- 採用率、使用頻率
- 漏斗轉換率
- 完成效率（時間、步驟數）
- 錯誤率、重試率
- 用戶滿意度 / 回饋
- 業務指標（營收、轉換）

## 頁面規格草稿
（每頁一個區塊，供 Build 階段參考，Handoff 時精確化）

### 頁面 A — 列表頁
| 欄位 | 類型 | 必填 | 限制 |
|------|------|------|------|
| 標題 | text | Y | 50字 |

主要互動：點擊項目 → 詳情頁
狀態：預設 / 空 / 錯誤
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
「根據 spec 模板寫 spec.md，放進功能資料夾」
```

搭配截圖 script 產生各頁面截圖後，依模板撰寫。

**前置條件**：截圖前必須先啟動目標專案的 dev server（例如 `pnpm dev`），確認 `<url>` 可以正常開啟。

若有提供 `--session`，腳本會自動開啟瀏覽器檢查登入狀態：
- Session 有效 → 自動儲存並繼續截圖
- Session 過期 → 瀏覽器停在登入頁，請手動登入，登入後腳本自動儲存新 session 並繼續

```
npx tsx pm-as-builder/scripts/screenshot-pages.ts \
  --config <pages-config.json> \
  --base-url <url> \
  --out-dir <功能資料夾>/screenshots \
  --session auth.json          # 可選，需登入的專案才加
```

模板結構如下：

````markdown
# <Feature> SPEC

## 概覽
一句話描述功能。

## UI Flow
```mermaid
graph LR
  A[列表頁] -->|點擊項目| B[詳情頁]
  B -->|點擊編輯| C[編輯頁]
  C -->|儲存| B
```

## 頁面 A — 列表頁

| 預設狀態 | 空狀態 |
|:---:|:---:|
| ![列表頁-預設](screenshots/list-default.png) | ![列表頁-空](screenshots/list-empty.png) |

### 欄位規格
| 欄位 | 類型 | 必填 | 限制 | 特殊狀況 |
|------|------|------|------|----------|
| 標題 | text | Y | 50字 | 超過截斷+... |

### 互動行為
| 操作 | 觸發 | 結果 |
|------|------|------|
| 點擊項目 | tap | 進入詳情頁 |

### 狀態說明
| 狀態 | 條件 | 顯示 |
|------|------|------|
| 空狀態 | 無資料 | 插圖+提示文字 |

---

（重複每頁...）

## Success Metrics

### 關鍵指標
（定義衡量功能成效的指標，依功能性質選擇合適類型）

### 事件定義（如需要）
| 事件 | 維度 | 記錄時機 | 說明 |
|------|------|----------|------|

### 回饋蒐集（如需要）
（管道、觸發條件、時機）

## Notes / 開放問題
````

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
