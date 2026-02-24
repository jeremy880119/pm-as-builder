# 版本管理使用指南

---

## 一、概念總覽

你的版本管理分兩層：

| 層級 | 工具 | 位置 | 用途 |
|------|------|------|------|
| **本地** | Git | `~/Documents/PM/` | 追蹤每次修改，隨時回溯 |
| **雲端** | GitHub（透過 `/sync-github`） | GitHub Wiki + Issues | 團隊共享、工程交付 |

**流程：本地修改 → git commit → 準備好後 → `/sync-github` 推到雲端**

---

## 二、本地操作（Git）

Git 就像文件的「時間機器」。每次 commit（存檔點），git 就記住那個瞬間所有檔案的狀態。

**存檔（每次修改完產物後）：**
```bash
git add features/active-subscribers-enhancements/prd.md
git commit -m "prd(active-subscribers-enhancements): 新增定價表章節"
```

**查看歷史：**
```bash
# 看某個檔案的所有存檔點
git log --oneline features/active-subscribers-enhancements/prd.md
# 輸出：
# a1b2c3d prd(active-subscribers-enhancements): 新增定價表
# e4f5g6h prd(active-subscribers-enhancements): 調整範圍
```

**看某次改了什麼（紅=刪除，綠=新增）：**
```bash
git diff HEAD~1 -- features/active-subscribers-enhancements/prd.md
```

**查看舊版本內容（不影響現有檔案）：**
```bash
git show HEAD~2:features/active-subscribers-enhancements/prd.md
```

**還原到之前的版本：**
```bash
git checkout HEAD~1 -- features/active-subscribers-enhancements/prd.md
git commit -m "prd(active-subscribers-enhancements): revert，定價表需重新討論"
```

**查看目前狀態（哪些檔案改了但還沒存檔）：**
```bash
git status
```

---

## 三、雲端操作（GitHub）

雲端資料透過 `/sync-github {slug}` 同步，它會做兩件事：
1. **Wiki 同步**：把本地 `.md` 產物推到 GitHub Wiki（可線上閱讀）
2. **Issue 建立/更新**：從 User Story 建立三層 Issue 結構

**推送到雲端：**
```
/sync-github active-subscribers-enhancements
```

**查看雲端版本：**
```bash
# 查看 Wiki 頁面列表
gh api repos/Firstory/backlog/pages --paginate

# 直接在瀏覽器開啟 Wiki
open https://github.com/Firstory/backlog/wiki/{slug}--PRD
```

**查看雲端 Issue 狀態：**
```bash
# 查看某 feature 的所有 issues
gh search issues "[active-subscribers-enhancements]" --repo Firstory/backlog --json number,title,state

# 查看特定 issue 的詳細內容
gh issue view 123 --repo Firstory/backlog
```

**雲端版本歷史（Wiki 也是 git repo）：**
```bash
# Wiki 的修改歷史
git -C ~/Documents/PM/.wiki log --oneline

# 看 Wiki 某次推送改了什麼
git -C ~/Documents/PM/.wiki diff HEAD~1
```

**雲端回溯（還原 Wiki 到舊版本）：**
```bash
# 查看 Wiki 舊版內容
git -C ~/Documents/PM/.wiki show HEAD~1:{slug}--PRD.md

# 要還原的話：重新執行 /sync-github 即可（它會用本地最新版覆寫雲端）
```

---

## 四、兩端關係整理

| 操作 | 本地（Git） | 雲端（GitHub） |
|------|-----------|--------------|
| **存檔** | `git commit` | `/sync-github {slug}` |
| **看歷史** | `git log` | `git -C .wiki log` 或 GitHub Wiki 頁面 |
| **看差異** | `git diff` | `git -C .wiki diff` |
| **回溯** | `git checkout HEAD~N -- 檔案` | 本地還原後重跑 `/sync-github` |
| **真相來源** | ✅ 本地是 Single Source of Truth | 雲端是本地的鏡像 |

**關鍵原則：永遠在本地修改，再推到雲端。不要直接在 GitHub 上編輯。**

---

## 五、你不需要記指令

在 Claude Code 中用中文跟我說就好：

| 你說 | 我做 |
|------|------|
| 「幫我存檔 prd」 | git add + commit |
| 「prd 改過幾次？」 | git log |
| 「prd 上次改了什麼？」 | git diff |
| 「把 prd 還原到上上個版本」 | git checkout + commit |
| 「推到雲端」 | /sync-github |
| 「雲端的 PRD 是什麼版本？」 | git -C .wiki log |
| 「看雲端 issue 狀態」 | gh search issues |
