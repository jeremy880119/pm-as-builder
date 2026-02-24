# Claude Code 實戰全攻略講義

來源影片: https://www.youtube.com/watch?v=AT4b9kLtQCQ

---

## TLDR Cheatsheet

### 快捷鍵

| 快捷鍵 | 功能 |
| --- | --- |
| **Shift+Tab** | 切換三種輸入模式 (Default / Auto / Plan) |
| **Shift+Enter** | 在輸入框中換行 |
| **Ctrl+V** | 貼上圖片 (Mac 也是 Ctrl+V) |
| **Ctrl+G** | 開啟外部編輯器 (VS Code) |
| **Ctrl+B** | 將任務放到後台執行 |
| **Esc×2** | 進入回滾 (Rewind) 頁面 |

### 常用命令

| 命令 | 功能 |
| --- | --- |
| `claude` | 啟動 Claude Code |
| `claude -c` | 繼續上次對話 |
| `!command` | Bash 模式:執行終端命令 |
| `/resume` | 選擇歷史對話恢復 |
| `/tasks` | 查看後台任務列表 |
| `/compact` | 壓縮上下文,減少 Token |
| `/clear` | 清空對話歷史 |
| `/init` | 生成專案級 CLAUDE.md |
| `/memory` | 開啟 CLAUDE.md 檔案 |
| `/mcp` | 管理 MCP 工具 |
| `/agent` | 管理 Subagent |
| `/plugin` | 進入插件管理器 |

### 啟動選項

| 選項 | 效果 |
| --- | --- |
| `--dangerously-skip-permissions` | 危險模式:自動執行所有命令 |

### 核心模式

| 模式 | 顯示 | 特性 |
| --- | --- | --- |
| **Default** | `? for shortcuts` | 謹慎模式,每次更改前詢問 |
| **Auto** | `accept edits on` | 自動執行,不反覆詢問 |
| **Plan** | `PL mode on` | 只討論不執行,適合規劃 |

---

## Level 1: 環境搭建與基礎操作

### 1.1 安裝與登入

**安裝:**
- 從官方網站複製安裝命令並於終端執行
- 進入專案目錄後,輸入 `claude` 啟動

**登入方式:**

| 方式 | 說明 |
| --- | --- |
| **訂閱制** | Claude Pro/Max 會員,網頁授權 |
| **API Key** | 按量計費模式 |
| **第三方模型** | 環境變量設置國產模型 (GLM、MiniMax) |

### 1.2 基礎指令

**Bash 模式:**
- 輸入 `!` 執行終端命令
- 例: `!open index.html`

**對話恢復:**
- `/resume` - 選擇歷史對話
- `claude -c` - 自動恢復上次會話

### 1.3 三種核心模式

透過 **Shift+Tab** 循環切換:

| 模式 | 用途 |
| --- | --- |
| **Default Mode** | 謹慎模式,每次修改前詢問 |
| **Auto Mode** | 快速開發,自動執行操作 |
| **Plan Mode** | 只規劃不執行,適合複雜架構設計 |

---

## Level 2: 進階交互技巧

### 2.1 輸入增強

**換行輸入:**
- **Shift+Enter** - 輸入框換行
- 直接 Enter - 提交請求

**外部編輯器:**

### 2.2 任務管理

**後台任務:**
- **Ctrl+B** - 將阻塞服務放到後台 (如 `npm run dev`)
- `/tasks` - 查看後台任務
- 任務界面按 `K` - 終止任務

**回滾功能 (Rewind):**
- **Esc×2** 或輸入 `rewind` 進入
- 選項: 回滾代碼 / 回滾對話 / 兩者同時
- **限制:** 僅針對 Claude Code 寫入的文件,不包含命令生成的文件

### 2.3 多模態處理

**圖片輸入:**
- 拖曳圖片到 Claude Code
- **Ctrl+V** 貼上圖片 (Mac 也是 Ctrl)

### 2.4 危險模式

**啟動方式:**
```bash
claude --dangerously-skip-permissions
```

**特性:**
- 執行所有終端命令不再詢問
- 顯示: `bypass permission`
- **警告:** 具有安全風險

---

- **Ctrl+G** - 開啟 VS Code
- 編輯保存後自動同步回 Claude Code
## Level 3: 上下文與記憶管理

### 3.1 上下文控制

| 命令 | 功能 |
| --- | --- |
| `/compact` | 壓縮上下文,減少 Token 消耗 |
| `/clear` | 清空所有歷史訊息 |

### 3.2 持久化記憶 (CLAUDE.md)

**層級結構:**
```
~/.claude/CLAUDE.md          # 用戶級
project/CLAUDE.md            # 專案級
project/CLAUDE.local.md      # 個人級 (不提交 git)
```

**建議內容:**
- 專案規範
- 技術棧說明
- 特定注意事項
- 回答風格要求

**管理命令:**
- `/init` - 生成專案級 CLAUDE.md
- `/memory` - 快速開啟 CLAUDE.md

---

## Level 4: 高級定制

### 4.1 MCP (Model Context Protocol)

**定義:** 大模型與外界溝通的渠道

**Figma 整合實例:**
- 安裝並授權 Figma MCP server
- 獲取設計稿截圖、間距、字體樣式
- 實現高精度還原

**管理:** 輸入 `/mcp` 查看並管理工具

### 4.2 Hooks

**功能:** 在特定時機執行自定義邏輯

**範例場景:**
- `post-use` 工具使用後執行
- `write` / `edit` 後自動 Prettier 格式化

**儲存位置:**
- 專案級: `settings.json`
- 個人級: `settings.local.json`

### 4.3 Agent Skill vs Subagent

| 特性 | Agent Skill | Subagent |
| --- | --- | --- |
| 本質 | 動態 Prompt 說明書 | 獨立 Agent |
| 上下文 | 與主對話共享 | 獨立上下文 |
| 工具 | 共享主對話工具 | 獨立工具集 |
| 適用場景 | 開發過程相關任務 | 繁重獨立任務 |
| 範例 | 每日開發總結 | 數萬行代碼審核 |

**Subagent 管理:**
- 存放位置: `.claude/agents/`
- 管理介面: 輸入 `/agent`

**Subagent 檔案結構:**
```yaml
---
name: "Engineer"
description: "技術可行性評估"
tools: [Read, Grep, Glob, Bash]
model: sonnet
---
# 系統提示
[定義角色背景、能力、溝通風格]
```

### 4.4 插件系統 (Plugins)

**定義:** 打包 Skill、Subagent、MCP 和 Hook 的功能包

**管理:**
- 輸入 `/plugin` 進入插件管理器
- 從 Marketplace 安裝插件

**推薦插件:**
- `frontend-design` - 提升 UI 排版與美感

---

## 資源連結

| 資源 | 連結 |
| --- | --- |
| 來源影片 | https://www.youtube.com/watch?v=AT4b9kLtQCQ |
| Claude Code 官網 | https://claude.ai/code |
