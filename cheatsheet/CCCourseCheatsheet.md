# Claude Code PM 課程精華講義

---

## TLDR Cheatsheet

### 快捷鍵

| 快捷鍵 | 功能 |
| --- | --- |
| **Shift+Tab** | 切換輸入模式（Edit / Auto-accept / Plan） |
| **Ctrl+V** | 貼上圖片（Mac 也是 Ctrl+V，不是 Cmd+V！） |
| **Ctrl+Enter** | 在輸入中換行 |
| **Ctrl+T** | 查看待辦列表狀態 |
| **Esc×2** | 倒帶對話，可還原檔案 |

### 常用命令

| 命令 | 功能 |
| --- | --- |
| `/model` | 切換模型（Sonnet / Opus / Haiku） |
| `/context` | 查看上下文使用量 |
| `/clear` | 清除對話歷史 |
| `/rewind` | 精確倒帶到特定點 |

### Think 關鍵詞

| 關鍵詞 | 效果 |
| --- | --- |
| `think about X` | 普通深度思考 |
| `think harder about X` | 更深入分析 |
| `ultrathink about X` | 最大深度思考 |

### 核心語法

| 語法 | 用途 |
| --- | --- |
| `@filename.md` | 引用單一檔案 |
| `@folder/` | 引用整個資料夾 |
| `#` + 規則 | 動態添加到 CLAUDE.md |

---

## Level 1: 基礎知識

### 1.1 視覺化工作區

**分割螢幕設置：** 左半螢幕終端機，右半螢幕編輯器（Nimbalyst / Obsidian / VS Code）

### 1.2 檔案操作核心

**基本模式：** `@filename` 告訴 Claude 讀哪個檔案 → 說明如何處理

**Claude 可處理：**
- 總結、分析、提取、組織、轉換文件
- 分析圖片（設計稿、圖表、截圖、白板）
- 網頁搜尋

### 1.3 代理 (Agents)

**定義：** 同時工作的獨立 Claude 實例，用於並行處理

**適合場景：**
- 批量處理（多份會議筆記、訪談、工單）
- 多源研究（同時研究多個競品）

**不適合：** 單一任務、順序依賴的工作

### 1.4 子代理 (Sub-agents)

**與代理的差別：**

| 代理 | 子代理 |
| --- | --- |
| 臨時、即時創建 | 永久、預先配置 |
| 並行批量工作 | 專業化觀點 |

**存放位置：** `.claude/agents/` 資料夾

**子代理檔案結構：**
```yaml
---
name: "(@_@) Engineer"
description: "技術可行性評估"
tools: [Read, Grep, Glob, Bash]
model: sonnet
---
# 系統提示
[定義角色背景、能力、溝通風格]
```

### 1.5 專案記憶 (CLAUDE.md)

**核心概念：** CLAUDE.md = 憲法（永遠優先於用戶提示）

**層級結構：**
```
~/.claude/CLAUDE.md          # 全域
project/CLAUDE.md            # 專案
project/subdir/CLAUDE.md     # 目錄
project/CLAUDE.local.md      # 個人（不提交 git）
```

**優先級：** 目錄 > 專案 > 全域

**建議內容：**
- 產品上下文
- 用戶角色
- 寫作風格
- 產品術語
- 不可變規則

### 1.6 輸入模式

| 模式 | 描述 |
| --- | --- |
| **Edit** | 每次更改前顯示供審核（預設） |
| **Auto-accept** | 自動應用更改 |
| **Plan** | 先創建計畫再執行 |

**加速模式：** `claude --dangerously-skip-permissions`

---

## Level 2: 進階 PM 工作

### 2.1 撰寫 PRD

**工作流程：**
1. 選擇模板
2. 蘇格拉底式質詢（3-5 個問題澄清想法）
3. 生成多版本（不同策略角度）
4. 獲得子代理反饋
5. 解決反饋並最終化

### 2.2 資料分析

**三階段流程：** 發現 → 估計 → 實驗分析

**影響估計公式：**
```
影響 = 受影響用戶 × 當前行動率 × 預期提升 × 每次行動價值
```

**實驗分析原則：**
- 永遠不要只看頂線指標
- 按客戶分段分析
- 關注品質指標和先導指標

### 2.3 產品策略

**Rumelt 策略核心框架：**
```
診斷 → 指導政策 → 協調行動
```

| 部分 | 回答的問題 |
| --- | --- |
| 診斷 | 發生了什麼？ |
| 指導政策 | 我們的方法是什麼？ |
| 協調行動 | 如何執行？ |

**惡魔倡導者方法：** 每個選擇後挑戰假設、提出最壞情況

---

## Level 3: Nano Banana - AI 圖像生成

### 3.1 設置

1. 前往 https://aistudio.google.com/
2. 取得 API 金鑰（以 "AIza..." 開頭）
3. 設置帳單（約 $0.10/張圖）
4. 將金鑰添加到 `.env` 檔案

### 3.2 參數

| 參數 | 說明 |
| --- | --- |
| prompt | 描述要創建什麼 |
| reference_images | 作為視覺輸入的照片 |
| aspect_ratio | 1:1（方）、16:9（橫）、9:16（直） |
| resolution | 1K（草稿）、2K（最終）、4K（印刷） |

### 3.3 提示黃金法則

| 法則 | 說明 |
| --- | --- |
| 編輯，不重來 | 80% 正確就要求具體修改 |
| 使用自然語言 | 像跟人類設計師說話 |
| 具體且描述性 | 定義主題、場景、燈光、氛圍 |
| 提供上下文 | 說明「為什麼」或「為誰」 |

### 3.4 參考圖像

- **單一參考** → 用於風格
- **多張參考** → 同一主題不同角度，更準確
- **混合搭配** → 一張圖的風格 + 另一張圖的主題

### 3.5 風格資料庫

**三種增長方法：**
1. 邊做邊存 - 創造喜歡的就添加
2. 網上收集 - 找到好提示 → 測試 → 保存
3. 從任何圖像提取 - 最強大的方法

---

## Level 4: Vibe Coding

### 4.1 核心心態

**你是產品經理，Claude 是工程師。** 你描述需求，Claude 寫代碼。

### 4.2 開發循環

```
需求 → 構建 → 迭代 → 保存 → 部署
```

### 4.3 需求定義

創建 `REQUIREMENTS.md` 記錄所有決策作為構建規格。

### 4.4 迭代技巧

1. 截圖應用
2. **Ctrl+V** 貼到 Claude Code
3. 說明要改什麼
4. Claude 修改代碼
5. 刷新瀏覽器

### 4.5 GitHub

```bash
# 初始化並推送
git init
git add .
git commit -m "Initial commit"
gh repo create project-name --private --source=. --push
```

### 4.6 Vercel 部署

```bash
# 安裝並部署
npm i -g vercel
vercel login
vercel --prod --yes
```

**更新流程：** 做出更改 → 推送到 GitHub → Vercel 自動部署

---

## 資源連結

| 資源 | 連結 |
| --- | --- |
| 課程社群 | https://ccforpms.com |
| GitHub CLI | https://cli.github.com |
| Vercel | https://vercel.com |
| Google AI Studio | https://aistudio.google.com |
