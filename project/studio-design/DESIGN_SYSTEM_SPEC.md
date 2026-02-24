# Firstory Studio 設計系統規範

> 版本：1.1.0
> 建立日期：2026-02-03
> 更新日期：2026-02-03
> 技術棧：React + Tailwind CSS + shadcn/ui

---

## 〇、設計風格與原則

### 風格定義 (Style)

| 屬性 | 值 | 說明 |
| --- | --- | --- |
| **主風格** | Flat Design + Soft UI | 扁平化設計搭配柔和陰影 |
| **調性** | Friendly & Professional | 友善但不失專業感 |
| **視覺密度** | Comfortable | 舒適的留白，不擁擠 |
| **圓角偏好** | Rounded (8px default) | 圓潤但不過度 |
| **色彩策略** | Warm Primary + Neutral Base | 珊瑚粉主色 + 中性灰底 |

### 設計原則

1. **一致性優先** - 相同功能使用相同樣式，減少用戶認知負擔
2. **清晰的層級** - 透過顏色、大小、間距建立明確的視覺層級
3. **適度的反饋** - 每個互動都有視覺反饋，但不過度動畫
4. **無障礙為本** - 確保 4.5:1 對比度，支援鍵盤導航

### 技術棧

| 層級 | 技術 | 說明 |
| --- | --- | --- |
| **框架** | React 18+ | 函數式組件 + Hooks |
| **樣式** | Tailwind CSS 3.4+ | Utility-first CSS |
| **組件庫** | shadcn/ui | 可自訂的無樣式組件 |
| **圖標** | Lucide React | 統一使用 Lucide 圖標 |
| **字體** | Inter + Noto Sans TC | Google Fonts |

---

## 一、Design Tokens

### 1.1 色彩系統 (Colors)

> 所有語意化 tokens 支援 Light/Dark 模式自動切換

#### 品牌色 (Brand) - 兩種模式共用

| Token | Value | 用途 |
| --- | --- | --- |
| `--color-primary-50` | `#FFF1F2` | 淺背景、hover 狀態 |
| `--color-primary-100` | `#FFE4E6` | 選中背景、淺提示 |
| `--color-primary-200` | `#FECDD3` | 邊框 hover |
| `--color-primary-300` | `#FDA4AF` | 次要按鈕邊框 |
| `--color-primary-400` | `#FB7185` | 次要圖標 |
| `--color-primary-500` | `#F06A6A` | **主色** - 按鈕、連結、CTA |
| `--color-primary-600` | `#E11D48` | 按鈕 hover |
| `--color-primary-700` | `#BE123C` | 按鈕 active |

#### 背景色 (Background)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--bg-page` | `#F9FAFB` | `#0F0F0F` | 頁面背景 |
| `--bg-sidebar` | `#FFFFFF` | `#171717` | 側邊欄背景 |
| `--bg-card` | `#FFFFFF` | `#1A1A1A` | 卡片背景 |
| `--bg-card-elevated` | `#FFFFFF` | `#242424` | 強調卡片、彈窗 |
| `--bg-input` | `#FFFFFF` | `#262626` | 輸入框背景 |
| `--bg-hover` | `#F3F4F6` | `#2A2A2A` | Hover 狀態背景 |
| `--bg-selected` | `#FFE4E6` | `#3D1F1F` | 選中狀態背景 |

#### 文字色 (Text)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--text-primary` | `#111827` | `#F9FAFB` | 標題、主要文字 |
| `--text-secondary` | `#4B5563` | `#A1A1AA` | 說明文字、次要內容 |
| `--text-muted` | `#9CA3AF` | `#71717A` | Placeholder、輔助文字 |
| `--text-disabled` | `#D1D5DB` | `#404040` | 禁用狀態文字 |
| `--text-on-primary` | `#FFFFFF` | `#FFFFFF` | 主色按鈕上的文字 |
| `--text-link` | `#F06A6A` | `#FB7185` | 連結文字 |

#### 邊框色 (Border)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--border-default` | `#E5E7EB` | `#2E2E2E` | 卡片、輸入框邊框 |
| `--border-strong` | `#D1D5DB` | `#404040` | 強調邊框、分隔線 |
| `--border-muted` | `#F3F4F6` | `#1F1F1F` | 弱化邊框 |
| `--border-focus` | `#F06A6A` | `#F06A6A` | Focus 狀態邊框 |

#### 語意色 - 成功 (Success)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--color-success-bg` | `#DCFCE7` | `#14532D` | 成功提示背景 |
| `--color-success` | `#22C55E` | `#4ADE80` | 成功圖標、文字 |
| `--color-success-text` | `#166534` | `#BBF7D0` | 成功深色文字 |

#### 語意色 - 資訊 (Info)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--color-info-bg` | `#DBEAFE` | `#1E3A5F` | 資訊提示背景 |
| `--color-info` | `#3B82F6` | `#60A5FA` | 資訊圖標、文字 |
| `--color-info-text` | `#1E40AF` | `#BFDBFE` | 資訊深色文字 |

#### 語意色 - 警告 (Warning)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--color-warning-bg` | `#FEF3C7` | `#422006` | 警告提示背景 |
| `--color-warning` | `#F59E0B` | `#FBBF24` | 警告圖標、文字 |
| `--color-warning-text` | `#92400E` | `#FDE68A` | 警告深色文字 |

#### 語意色 - 錯誤 (Error)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--color-error-bg` | `#FEE2E2` | `#450A0A` | 錯誤提示背景 |
| `--color-error` | `#EF4444` | `#F87171` | 錯誤圖標、文字 |
| `--color-error-text` | `#991B1B` | `#FECACA` | 錯誤深色文字 |

#### 狀態標籤色 (Status Badge)

| 狀態 | Token | Light (bg/text) | Dark (bg/text) | 說明 |
| --- | --- | --- | --- | --- |
| 活躍/已發佈 | `--status-active` | `#DCFCE7` / `#166534` | `#14532D` / `#BBF7D0` | 訂閱進行中、已發佈 |
| 試用中 | `--status-trial` | `#DBEAFE` / `#1E40AF` | `#1E3A5F` / `#BFDBFE` | 免費試用期 |
| 待處理 | `--status-pending` | `#FEF3C7` / `#92400E` | `#422006` / `#FDE68A` | 等待審核 |
| 已取消 | `--status-cancelled` | `#F3F4F6` / `#4B5563` | `#262626` / `#A1A1AA` | 取消訂閱 |
| 失敗 | `--status-failed` | `#FEE2E2` / `#991B1B` | `#450A0A` / `#FECACA` | 扣款失敗 |
| 草稿 | `--status-draft` | `#F3F4F6` / `#6B7280` | `#262626` / `#71717A` | 未發佈 |

#### 圖表色 (Chart)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--chart-primary` | `#F06A6A` | `#F06A6A` | 主要數據線 |
| `--chart-secondary` | `#60A5FA` | `#60A5FA` | 次要數據線 |
| `--chart-tertiary` | `#2DD4BF` | `#2DD4BF` | 第三數據線 |
| `--chart-grid` | `#E5E7EB` | `#2E2E2E` | 網格線 |
| `--chart-label` | `#6B7280` | `#A1A1AA` | 軸標籤文字 |

#### 中性色原始值 (Primitives) - 供組合使用

| Token | Value | 說明 |
| --- | --- | --- |
| `--color-white` | `#FFFFFF` | 純白 |
| `--color-black` | `#000000` | 純黑 |
| `--color-gray-50` | `#F9FAFB` | 最淺灰 |
| `--color-gray-100` | `#F3F4F6` |  |
| `--color-gray-200` | `#E5E7EB` |  |
| `--color-gray-300` | `#D1D5DB` |  |
| `--color-gray-400` | `#9CA3AF` |  |
| `--color-gray-500` | `#6B7280` |  |
| `--color-gray-600` | `#4B5563` |  |
| `--color-gray-700` | `#374151` |  |
| `--color-gray-800` | `#1F2937` |  |
| `--color-gray-900` | `#111827` | 最深灰 |

---

### 1.2 字體系統 (Typography)

#### 字體家族

```css
--font-family-sans: 'Inter', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif;
--font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### 字體大小與行高

| Token | Size | Line Height | Weight | 用途 |
| --- | --- | --- | --- | --- |
| `--text-xs` | 12px | 16px (1.33) | 400 | 輔助文字、標籤 |
| `--text-sm` | 14px | 20px (1.43) | 400 | 正文、表格內容 |
| `--text-base` | 16px | 24px (1.5) | 400 | 段落、說明 |
| `--text-lg` | 18px | 28px (1.56) | 500 | 區塊標題 |
| `--text-xl` | 20px | 28px (1.4) | 600 | 頁面標題 |
| `--text-2xl` | 24px | 32px (1.33) | 600 | 大標題 |
| `--text-3xl` | 30px | 36px (1.2) | 700 | 數字強調 |
| `--text-4xl` | 36px | 40px (1.11) | 700 | Hero 數字 |

#### 字重

| Token | Value | 用途 |
| --- | --- | --- |
| `--font-normal` | 400 | 正文 |
| `--font-medium` | 500 | 強調、標籤 |
| `--font-semibold` | 600 | 標題、按鈕 |
| `--font-bold` | 700 | 數字強調 |

---

### 1.3 間距系統 (Spacing)

基準：**4px**

| Token | Value | 用途 |
| --- | --- | --- |
| `--space-0` | 0 |  |
| `--space-1` | 4px | 緊密元素間距 |
| `--space-2` | 8px | 元素內小間距 |
| `--space-3` | 12px | 元素內標準間距 |
| `--space-4` | 16px | 卡片內 padding |
| `--space-5` | 20px | 區塊內間距 |
| `--space-6` | 24px | 卡片內 padding (大) |
| `--space-8` | 32px | 區塊間距 |
| `--space-10` | 40px | 大區塊間距 |
| `--space-12` | 48px | Section 間距 |
| `--space-16` | 64px | 頁面間距 |

---

### 1.4 圓角系統 (Border Radius)

| Token | Value | 用途 |
| --- | --- | --- |
| `--radius-none` | 0 | 無圓角 |
| `--radius-sm` | 4px | 小元素（tag、badge） |
| `--radius-md` | 8px | **標準**（按鈕、輸入框、卡片） |
| `--radius-lg` | 12px | 大卡片、modal |
| `--radius-xl` | 16px | Modal、彈窗 |
| `--radius-full` | 9999px | 圓形按鈕、avatar |

> ⚠️ **統一規則：所有按鈕、輸入框、卡片預設使用 \****`--radius-md`**\*\* (8px)**

---

### 1.5 陰影系統 (Shadows)

| Token | Value | 用途 |
| --- | --- | --- |
| `--shadow-none` | none | 無陰影 |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | 微小提升 |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | 卡片、dropdown |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modal、popover |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)` | 大型彈窗 |

> ⚠️ **統一規則：卡片預設使用 \****`--shadow-sm`***\* + \****`border: 1px solid var(--color-gray-200)`**

---

### 1.6 動畫系統 (Animation)

| Token | Value | 用途 |
| --- | --- | --- |
| `--duration-fast` | 150ms | 微互動（hover、focus） |
| `--duration-normal` | 200ms | 標準過渡 |
| `--duration-slow` | 300ms | 展開/收合 |
| `--easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | 標準緩動 |
| `--easing-in` | `cubic-bezier(0.4, 0, 1, 1)` | 進入 |
| `--easing-out` | `cubic-bezier(0, 0, 0.2, 1)` | 離開 |

#### 動效場景

| 場景 | Duration | Easing | 說明 |
| --- | --- | --- | --- |
| Hover 狀態 | 150ms | default | 按鈕、連結、卡片 hover |
| Focus 狀態 | 150ms | default | 輸入框、按鈕 focus ring |
| Dropdown 展開 | 200ms | out | 下拉選單、popover |
| Modal 進入 | 200ms | out | 彈窗淡入 + 縮放 |
| Modal 離開 | 150ms | in | 彈窗淡出 |
| Page 切換 | 300ms | default | 路由切換過渡 |
| Toast 滑入 | 300ms | out | 通知訊息 |
| Skeleton 閃爍 | 1.5s | ease-in-out | 無限循環 |

---

### 1.7 響應式斷點 (Breakpoints)

| Token | Value | 說明 | 典型裝置 |
| --- | --- | --- | --- |
| `--screen-sm` | 640px | 小螢幕 | 大型手機橫向 |
| `--screen-md` | 768px | 中螢幕 | 平板直向 |
| `--screen-lg` | 1024px | 大螢幕 | 平板橫向、小筆電 |
| `--screen-xl` | 1280px | 超大螢幕 | 桌面 |
| `--screen-2xl` | 1536px | 寬螢幕 | 大螢幕桌面 |

#### 響應式策略

- **側邊欄**：< 1024px 時收合為 hamburger menu
- **表格**：< 768px 時改為卡片式列表
- **統計卡片**：grid 從 4 欄 → 2 欄 → 1 欄

---

### 1.8 層級系統 (Z-Index)

| Token | Value | 用途 |
| --- | --- | --- |
| `--z-base` | 0 | 基礎層 |
| `--z-dropdown` | 10 | 下拉選單、popover |
| `--z-sticky` | 20 | 固定元素（sticky header） |
| `--z-overlay` | 30 | 遮罩層 |
| `--z-modal` | 40 | Modal 彈窗 |
| `--z-toast` | 50 | Toast 通知 |
| `--z-tooltip` | 60 | Tooltip 提示 |

---

### 1.9 圖標規範 (Icons)

#### 圖標來源

| 類型 | 來源 | 說明 |
| --- | --- | --- |
| **UI 圖標** | [Lucide](https://lucide.dev) | 統一使用 Lucide React |
| **品牌圖標** | [Simple Icons](https://simpleicons.org) | Spotify, Apple 等第三方 logo |
| **插圖** | 自製 SVG 或 [undraw](https://undraw.co) | 空狀態、onboarding 插圖 |

#### 圖標尺寸

| Size | Value | 用途 |
| --- | --- | --- |
| `xs` | 12px | 極小提示 |
| `sm` | 16px | 按鈕內圖標、表格操作 |
| `md` | 20px | 標準 UI 圖標 |
| `lg` | 24px | 側邊欄導航、頁面標題 |
| `xl` | 32px | 空狀態、強調區塊 |
| `2xl` | 48px | 大型空狀態插圖 |

#### 圖標樣式

```
stroke-width: 1.5 (Lucide 預設)
color: 繼承父元素文字顏色 (currentColor)
```

> ⚠️ **禁止使用 Emoji 作為 UI 圖標**。Emoji 在不同系統顯示不一致，應使用 SVG 圖標。

---

### 1.10 圖片處理 (Images)

#### 比例規範

| 用途 | Aspect Ratio | 說明 |
| --- | --- | --- |
| 節目封面 | 1:1 | 正方形，與各平台一致 |
| 單集縮圖 | 1:1 | 同上 |
| Banner 圖 | 16:9 或 3:1 | 橫幅廣告 |
| Avatar | 1:1 | 圓形裁切 |

#### 載入策略

| 策略 | 實作 | 說明 |
| --- | --- | --- |
| **Lazy Loading** | `loading="lazy"` | 非首屏圖片延遲載入 |
| **Placeholder** | 低飽和度背景色 | `bg-gray-100` |
| **Error State** | 顯示預設圖 | 載入失敗時的 fallback |
| **格式** | WebP 優先，PNG fallback | 使用 `<picture>` 或 Next/Image |

---

## 二、組件規範 (Components)

### 2.1 按鈕 (Button)

#### 尺寸

| Size | Height | Padding (H) | Font Size | Icon Size |
| --- | --- | --- | --- | --- |
| `sm` | 32px | 12px | 14px | 16px |
| `md` | 40px | 16px | 14px | 20px |
| `lg` | 48px | 24px | 16px | 24px |

#### 變體

```
┌─────────────────────────────────────────────────────────────────┐
│  Primary                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Default    │  │    Hover     │  │   Disabled   │          │
│  │  bg: #F06A6A │  │  bg: #E11D48 │  │  bg: #FDA4AF │          │
│  │  text: white │  │  text: white │  │  text: white │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
├─────────────────────────────────────────────────────────────────┤
│  Secondary                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Default    │  │    Hover     │  │   Disabled   │          │
│  │  bg: white   │  │  bg: #FFF1F2 │  │  bg: #F3F4F6 │          │
│  │  border: pri │  │  border: pri │  │  border: gray│          │
│  │  text: pri   │  │  text: pri   │  │  text: gray  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
├─────────────────────────────────────────────────────────────────┤
│  Ghost (Text Button)                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Default    │  │    Hover     │  │   Disabled   │          │
│  │  bg: transp  │  │  bg: #FFF1F2 │  │  bg: transp  │          │
│  │  text: pri   │  │  text: pri   │  │  text: gray  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

#### 規則
- 圓角：統一 `8px`
- 過渡：`all 200ms ease`
- 帶 icon 時：icon 與文字間距 `8px`
- Loading 狀態：顯示 spinner，文字變灰

---

### 2.2 卡片 (Card)

#### 標準卡片

```
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────────┐  │ ← padding: 24px
│  │                                   │  │
│  │  Content Area                     │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
  │
  └── bg: white
      border: 1px solid #E5E7EB
      border-radius: 8px
      shadow: 0 1px 2px rgba(0,0,0,0.05)
```

#### 卡片變體

| 類型 | 背景 | 邊框 | 陰影 | 用途 |
| --- | --- | --- | --- | --- |
| `default` | white | 1px gray-200 | sm | 標準內容卡片 |
| `elevated` | white | none | md | 強調卡片 |
| `outlined` | white | 1px gray-200 | none | 表格容器 |
| `filled` | gray-50 | none | none | 背景區塊 |

---

### 2.3 表格 (Table)

```
┌─────────────────────────────────────────────────────────────┐
│  □  │  標題        │  日期       │  狀態    │  操作     │  ← 表頭
│─────┼──────────────┼─────────────┼──────────┼───────────│     height: 48px
│  □  │  Episode 1   │  2026-01-01 │  ● 已發佈 │  ⋮        │     bg: gray-50
│─────┼──────────────┼─────────────┼──────────┼───────────│     text: gray-700
│  □  │  Episode 2   │  2026-01-02 │  ○ 草稿  │  ⋮        │     font-size: 12px
│─────┼──────────────┼─────────────┼──────────┼───────────│
│  □  │  Episode 3   │  2026-01-03 │  ● 已發佈 │  ⋮        │  ← 表格行
└─────────────────────────────────────────────────────────────┘     height: 56px
                                                                   hover: gray-50
                                                                   text: gray-800
                                                                   font-size: 14px
```

#### 規則
- 表頭：`bg: gray-50`, `text: gray-700`, `font-size: 12px`, `font-weight: 500`
- 表格行：`height: 56px`, `border-bottom: 1px solid gray-200`
- Hover：`bg: gray-50`
- Checkbox：使用品牌色 `primary-500`
- 操作列：靠右對齊

---

### 2.4 Tab 導航 (Tabs)

> ⚠️ **統一使用下劃線式 (Underline Style)**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    管理總覽      單集表現      受眾輪廓                       │
│    ─────────                                                │
│    (active)                                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 狀態

| 狀態 | 文字顏色 | 底線 |
| --- | --- | --- |
| Default | `gray-500` | none |
| Hover | `gray-700` | none |
| Active | `primary-500` | 2px solid primary-500 |

#### 規則
- Tab 項目間距：`24px`
- Tab 內 padding：`12px 0`
- 過渡：`all 200ms ease`
- 底線位置：tab 底部，不是容器底部

---

### 2.5 表單元素 (Form Elements)

#### Input

```
┌─────────────────────────────────────────┐
│  Label *                                │  ← font-size: 14px, font-weight: 500
│                                         │     margin-bottom: 6px
│  ┌───────────────────────────────────┐  │
│  │  Placeholder text                 │  │  ← height: 40px
│  └───────────────────────────────────┘  │     padding: 0 12px
│                                         │     border: 1px solid gray-300
│  Helper text                            │     border-radius: 8px
└─────────────────────────────────────────┘     focus: border primary-500
                                               error: border error
```

#### Toggle Switch

```
  OFF                    ON
┌──────────┐         ┌──────────┐
│ ○        │         │        ● │
│   gray   │         │  primary │
└──────────┘         └──────────┘

Width: 44px
Height: 24px
Knob: 20px circle
```

#### Select / Dropdown

- 與 Input 相同的邊框、圓角、高度
- 右側帶 chevron-down icon
- Dropdown 選單：`shadow-md`, `border-radius: 8px`

---

### 2.6 警示與橫幅 (Alert & Banner)

#### 頂部 Banner

```
┌─────────────────────────────────────────────────────────────────────┐
│ ✓  2026 年度 Podcast 趨勢報告出爐！點擊了解 →                        │  ← Success Banner
│    bg: success-light, text: success-dark, icon: success             │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ ℹ  （搶先設定）現在開始你可以獲得節目完聽率                           │  ← Info Banner
│    bg: info-light, text: info-dark, icon: info                      │
└─────────────────────────────────────────────────────────────────────┘
```

#### 行內 Alert

```
┌─────────────────────────────────────────────────────────────────────┐
│ █                                                                   │
│ █  下載數每 3 小時更新。Spotify 因計算方式不同...                     │
│ █                                                                   │
└─────────────────────────────────────────────────────────────────────┘
  │
  └── 左邊線: 3px solid warning
      bg: warning-light
      padding: 12px 16px
      border-radius: 0 8px 8px 0
```

---

### 2.7 Modal 彈窗

```
┌─────────────────────────────────────────────────────────────┐
│                              ×                              │ ← 關閉按鈕
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                        Modal Title                          │ ← font-size: 20px
│                                                             │    font-weight: 600
│         Modal content goes here. Description                │
│         text with more details about the action.            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              ┌──────────┐    ┌──────────┐                   │ ← Footer
│              │  取消    │    │  確認    │                   │    padding: 16px 24px
│              └──────────┘    └──────────┘                   │    border-top: 1px
│                                                             │
└─────────────────────────────────────────────────────────────┘

背景遮罩: rgba(0, 0, 0, 0.5)
Modal: bg white, border-radius: 16px, shadow-xl
寬度: 480px (sm), 640px (md), 800px (lg)
```

---

### 2.8 空狀態 (Empty State)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌──────────┐                             │
│                    │  (SVG)   │                             │ ← SVG 插圖 (48-64px)
│                    │  插圖    │                             │    使用 Lucide 或自製
│                    └──────────┘                             │
│                                                             │
│                   還沒有任何單集                             │ ← 標題 (18px, semibold)
│                                                             │
│             上傳你的第一集，開始你的 Podcast 旅程             │ ← 說明 (14px, text-secondary)
│                                                             │
│                   ┌──────────────┐                          │
│                   │  + 上傳單集  │                          │ ← Primary CTA 按鈕
│                   └──────────────┘                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 規則
- 所有空狀態都要有：**SVG 插圖** + 標題 + 說明 + CTA
- 垂直置中，padding: 48px
- **禁止使用 Emoji** 作為空狀態圖示

#### 常用空狀態圖標（Lucide）

| 場景 | 圖標 | 說明 |
| --- | --- | --- |
| 無單集 | `Mic` / `MicOff` | 麥克風圖示 |
| 無留言 | `MessageSquare` | 留言框圖示 |
| 無會員 | `Users` | 用戶群組圖示 |
| 無數據 | `BarChart3` | 圖表圖示 |
| 搜尋無結果 | `SearchX` | 搜尋圖示 |

---

### 2.9 狀態標籤 (Status Badge)

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ ● 已發佈 │  │ ● 試用中 │  │ ● 待處理 │  │ ● 已取消 │  │ ● 失敗   │
│  green   │  │   blue   │  │  yellow  │  │   gray   │  │   red    │
└──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘

height: 24px
padding: 0 8px
border-radius: 4px
font-size: 12px
font-weight: 500
bg: {color}-100
text: {color}-700
dot: {color}-500
```

---

### 2.10 Loading 狀態

#### Skeleton（骨架屏）

用於內容區塊載入中：

```
┌─────────────────────────────────────────────────────────────┐
│  ┌────┐  ████████████████████                               │
│  │░░░░│  ████████████                                       │
│  └────┘  ████████                                           │
├─────────────────────────────────────────────────────────────┤
│  ┌────┐  ████████████████████                               │
│  │░░░░│  ████████████                                       │
│  └────┘                                                     │
└─────────────────────────────────────────────────────────────┘

bg: var(--bg-hover)  /* Light: #F3F4F6, Dark: #2A2A2A */
animation: pulse 1.5s ease-in-out infinite
border-radius: 4px
```

#### Spinner（載入圈）

用於按鈕載入、局部更新：

```
尺寸:
- sm: 16px (按鈕內)
- md: 24px (區塊載入)
- lg: 32px (頁面載入)

顏色:
- Primary context: white (在主色按鈕上)
- Default context: var(--color-primary-500)

animation: spin 1s linear infinite
```

#### 按鈕 Loading 狀態

```
┌─────────────────┐     ┌─────────────────┐
│    儲存         │ →   │  ○  儲存中...   │
└─────────────────┘     └─────────────────┘

- 顯示 spinner + 「處理中...」文字
- 按鈕進入 disabled 狀態
- 防止重複點擊
```

---

## 三、頁面佈局規範

### 3.1 整體佈局

```
┌──────┬──────────────────────────────────────────────────────────┐
│      │  Header (Top Banners)                           h: auto │
│      ├──────────────────────────────────────────────────────────┤
│ Side │                                                          │
│ bar  │  Page Title                                              │
│      │  ─────────────────                                       │
│ 220px│                                                          │
│      │  Content Area                                            │
│      │                                                          │
│      │  ┌────────────────────────────────────────────────────┐  │
│      │  │                                                    │  │
│      │  │                                                    │  │
│      │  │                                                    │  │
│      │  └────────────────────────────────────────────────────┘  │
│      │                                                          │
└──────┴──────────────────────────────────────────────────────────┘
```

### 3.2 內容區間距

| 區域 | 間距 |
| --- | --- |
| 頁面左右 padding | 32px |
| 頁面上下 padding | 24px |
| 標題與內容間距 | 24px |
| 區塊間間距 | 32px |
| 卡片間間距 | 16px |

---

## 四、無障礙指南 (Accessibility)

### 4.1 色彩對比度

| 類型 | 最低比例 | 說明 |
| --- | --- | --- |
| 正文文字 | 4.5:1 | WCAG AA 標準 |
| 大型文字 (18px+) | 3:1 | 標題、強調文字 |
| UI 元件 | 3:1 | 按鈕邊框、圖標 |
| 非必要裝飾 | 不適用 | 純裝飾元素可例外 |

> ✅ 本設計系統的色彩組合均已通過 WCAG AA 檢測

### 4.2 Focus 狀態

所有互動元素必須有明確的 focus 狀態：

```css
/* 標準 focus ring */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* 深色背景上的 focus ring */
.dark :focus-visible {
  outline-color: var(--color-primary-400);
}
```

### 4.3 鍵盤導航

| 元素 | 按鍵 | 行為 |
| --- | --- | --- |
| 按鈕 | `Enter` / `Space` | 觸發 click |
| 連結 | `Enter` | 導航 |
| Tab 導航 | `←` `→` | 切換 tab |
| Modal | `Escape` | 關閉 |
| Dropdown | `↑` `↓` | 選擇項目 |
| Dropdown | `Escape` | 關閉 |

### 4.4 ARIA 標籤

| 場景 | 必要屬性 | 範例 |
| --- | --- | --- |
| Icon-only 按鈕 | `aria-label` | `<button aria-label="關閉">×</button>` |
| Loading 按鈕 | `aria-busy` | `<button aria-busy="true">` |
| 展開/收合 | `aria-expanded` | `<button aria-expanded="false">` |
| Modal | `role="dialog"` + `aria-modal` | 彈窗容器 |
| 表格排序 | `aria-sort` | 排序欄位 |
| 必填欄位 | `aria-required` | 表單輸入 |
| 錯誤訊息 | `aria-describedby` | 連結錯誤提示 |

### 4.5 減少動畫

尊重用戶的「減少動態效果」偏好：

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 五、反模式 (Anti-patterns)

> ⛔ 以下為禁止的設計做法，違反將導致設計不一致

### 5.1 色彩反模式

| ❌ 不要 | ✅ 應該 |
| --- | --- |
| 使用非設計系統內的顏色 | 只使用定義的 tokens |
| 直接寫 hex code (#F06A6A) | 使用 CSS variable (var(--color-primary-500)) |
| 用顏色作為唯一區分方式 | 顏色 + 圖標/文字共同表達 |
| 在深色模式使用純白 #FFF | 使用 --text-primary (#F9FAFB) |
| 語意色混用（綠色表示「試用中」） | 遵循語意色定義 |

### 5.2 排版反模式

| ❌ 不要 | ✅ 應該 |
| --- | --- |
| 使用非系統字體 | 使用 Inter / Noto Sans TC |
| 自定義字體大小（如 15px） | 使用定義的 text-xs/sm/base/lg/xl |
| 行高小於 1.3 | 最小行高 1.33 |
| 單行超過 80 字元 | 控制在 65-75 字元內 |

### 5.3 組件反模式

| ❌ 不要 | ✅ 應該 |
| --- | --- |
| 使用 Emoji 作為 UI 圖標 | 使用 Lucide SVG 圖標 |
| 混用不同圓角（4px 按鈕 + 16px 卡片） | 統一使用 8px（--radius-md） |
| Tab 使用按鈕式、Pills 式混搭 | 統一使用下劃線式 Tab |
| 自創 loading spinner | 使用系統定義的 spinner |
| 空狀態只顯示「無資料」 | 提供插圖 + 說明 + CTA |

### 5.4 佈局反模式

| ❌ 不要 | ✅ 應該 |
| --- | --- |
| 使用非 4px 倍數的間距 | 遵循 spacing scale（4, 8, 12, 16...） |
| 在 modal 外可以捲動頁面 | Modal 開啟時鎖定背景捲動 |
| 固定元素沒有 z-index 管理 | 使用定義的 z-index tokens |
| 表格欄位隨意對齊 | 數字靠右、文字靠左、操作置中 |

### 5.5 互動反模式

| ❌ 不要 | ✅ 應該 |
| --- | --- |
| 可點擊元素沒有 hover 效果 | 所有可點擊元素必須有 hover feedback |
| 使用 `cursor: default` 在按鈕上 | 可點擊元素使用 `cursor: pointer` |
| 動畫超過 300ms | 微互動 150ms，展開 200-300ms |
| 沒有 loading 狀態的非同步操作 | 顯示 spinner 或 skeleton |
| 表單送出後沒有反饋 | 顯示 toast 或狀態變更 |

### 5.6 無障礙反模式

| ❌ 不要 | ✅ 應該 |
| --- | --- |
| 僅用顏色表示錯誤 | 顏色 + 圖標 + 文字 |
| 移除 focus outline | 提供清晰的 focus ring |
| 圖片沒有 alt 文字 | 有意義的圖片必須有 alt |
| 使用 `<div>` 做按鈕 | 使用語意化的 `<button>` |
| 忽略鍵盤導航 | 所有互動可用鍵盤操作 |

---

## 六、CSS Variables 完整輸出

```css
:root {
  /* ============================================
     PRIMITIVES - 原始色值（不直接使用）
     ============================================ */

  /* Brand Colors */
  --color-primary-50: #FFF1F2;
  --color-primary-100: #FFE4E6;
  --color-primary-200: #FECDD3;
  --color-primary-300: #FDA4AF;
  --color-primary-400: #FB7185;
  --color-primary-500: #F06A6A;
  --color-primary-600: #E11D48;
  --color-primary-700: #BE123C;

  /* Neutral Colors */
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;

  /* ============================================
     SEMANTIC TOKENS - 語意化 tokens（實際使用）
     ============================================ */

  /* Background */
  --bg-page: #F9FAFB;
  --bg-sidebar: #FFFFFF;
  --bg-card: #FFFFFF;
  --bg-card-elevated: #FFFFFF;
  --bg-input: #FFFFFF;
  --bg-hover: #F3F4F6;
  --bg-selected: #FFE4E6;

  /* Text */
  --text-primary: #111827;
  --text-secondary: #4B5563;
  --text-muted: #9CA3AF;
  --text-disabled: #D1D5DB;
  --text-on-primary: #FFFFFF;
  --text-link: #F06A6A;

  /* Border */
  --border-default: #E5E7EB;
  --border-strong: #D1D5DB;
  --border-muted: #F3F4F6;
  --border-focus: #F06A6A;

  /* Semantic - Success */
  --color-success-bg: #DCFCE7;
  --color-success: #22C55E;
  --color-success-text: #166534;

  /* Semantic - Info */
  --color-info-bg: #DBEAFE;
  --color-info: #3B82F6;
  --color-info-text: #1E40AF;

  /* Semantic - Warning */
  --color-warning-bg: #FEF3C7;
  --color-warning: #F59E0B;
  --color-warning-text: #92400E;

  /* Semantic - Error */
  --color-error-bg: #FEE2E2;
  --color-error: #EF4444;
  --color-error-text: #991B1B;

  /* Status Badge */
  --status-active-bg: #DCFCE7;
  --status-active-text: #166534;
  --status-trial-bg: #DBEAFE;
  --status-trial-text: #1E40AF;
  --status-pending-bg: #FEF3C7;
  --status-pending-text: #92400E;
  --status-cancelled-bg: #F3F4F6;
  --status-cancelled-text: #4B5563;
  --status-failed-bg: #FEE2E2;
  --status-failed-text: #991B1B;
  --status-draft-bg: #F3F4F6;
  --status-draft-text: #6B7280;

  /* Chart */
  --chart-primary: #F06A6A;
  --chart-secondary: #60A5FA;
  --chart-tertiary: #2DD4BF;
  --chart-grid: #E5E7EB;
  --chart-label: #6B7280;

  /* ============================================
     NON-COLOR TOKENS
     ============================================ */

  /* Typography */
  --font-family-sans: 'Inter', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Spacing (4px base) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ============================================
   DARK MODE
   ============================================ */
[data-theme="dark"],
.dark {
  /* Background */
  --bg-page: #0F0F0F;
  --bg-sidebar: #171717;
  --bg-card: #1A1A1A;
  --bg-card-elevated: #242424;
  --bg-input: #262626;
  --bg-hover: #2A2A2A;
  --bg-selected: #3D1F1F;

  /* Text */
  --text-primary: #F9FAFB;
  --text-secondary: #A1A1AA;
  --text-muted: #71717A;
  --text-disabled: #404040;
  --text-on-primary: #FFFFFF;
  --text-link: #FB7185;

  /* Border */
  --border-default: #2E2E2E;
  --border-strong: #404040;
  --border-muted: #1F1F1F;
  --border-focus: #F06A6A;

  /* Semantic - Success */
  --color-success-bg: #14532D;
  --color-success: #4ADE80;
  --color-success-text: #BBF7D0;

  /* Semantic - Info */
  --color-info-bg: #1E3A5F;
  --color-info: #60A5FA;
  --color-info-text: #BFDBFE;

  /* Semantic - Warning */
  --color-warning-bg: #422006;
  --color-warning: #FBBF24;
  --color-warning-text: #FDE68A;

  /* Semantic - Error */
  --color-error-bg: #450A0A;
  --color-error: #F87171;
  --color-error-text: #FECACA;

  /* Status Badge */
  --status-active-bg: #14532D;
  --status-active-text: #BBF7D0;
  --status-trial-bg: #1E3A5F;
  --status-trial-text: #BFDBFE;
  --status-pending-bg: #422006;
  --status-pending-text: #FDE68A;
  --status-cancelled-bg: #262626;
  --status-cancelled-text: #A1A1AA;
  --status-failed-bg: #450A0A;
  --status-failed-text: #FECACA;
  --status-draft-bg: #262626;
  --status-draft-text: #71717A;

  /* Chart */
  --chart-grid: #2E2E2E;
  --chart-label: #A1A1AA;
}

/* System Preference Auto-Detection */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-page: #0F0F0F;
    --bg-sidebar: #171717;
    --bg-card: #1A1A1A;
    --bg-card-elevated: #242424;
    --bg-input: #262626;
    --bg-hover: #2A2A2A;
    --bg-selected: #3D1F1F;

    --text-primary: #F9FAFB;
    --text-secondary: #A1A1AA;
    --text-muted: #71717A;
    --text-disabled: #404040;
    --text-link: #FB7185;

    --border-default: #2E2E2E;
    --border-strong: #404040;
    --border-muted: #1F1F1F;

    --color-success-bg: #14532D;
    --color-success: #4ADE80;
    --color-success-text: #BBF7D0;

    --color-info-bg: #1E3A5F;
    --color-info: #60A5FA;
    --color-info-text: #BFDBFE;

    --color-warning-bg: #422006;
    --color-warning: #FBBF24;
    --color-warning-text: #FDE68A;

    --color-error-bg: #450A0A;
    --color-error: #F87171;
    --color-error-text: #FECACA;

    --status-active-bg: #14532D;
    --status-active-text: #BBF7D0;
    --status-trial-bg: #1E3A5F;
    --status-trial-text: #BFDBFE;
    --status-pending-bg: #422006;
    --status-pending-text: #FDE68A;
    --status-cancelled-bg: #262626;
    --status-cancelled-text: #A1A1AA;
    --status-failed-bg: #450A0A;
    --status-failed-text: #FECACA;
    --status-draft-bg: #262626;
    --status-draft-text: #71717A;

    --chart-grid: #2E2E2E;
    --chart-label: #A1A1AA;
  }
}
```

---

## 七、變更日誌 (Changelog)

| 版本 | 日期 | 變更內容 |
| --- | --- | --- |
| 1.1.0 | 2026-02-03 | 新增風格定義、無障礙指南、反模式、圖標規範、響應式斷點 |
| 1.0.0 | 2026-02-03 | 初始版本，基於設計審計報告建立 |

---

## 附錄 A：實施優先順序

> 此為執行建議，非設計規範本身

### Phase 1: Tokens（立即）
- [ ] 建立 CSS variables 檔案
- [ ] 統一色彩語意
- [ ] 建立間距系統

### Phase 2: Core Components
- [ ] Button 組件重構
- [ ] Card 組件標準化
- [ ] Tabs 統一為下劃線式
- [ ] Table 樣式標準化
- [ ] Form elements 統一

### Phase 3: Patterns
- [ ] Page Header pattern
- [ ] Empty State pattern
- [ ] Data Table pattern
- [ ] Settings Section pattern

### Phase 4: Documentation
- [ ] Storybook 或組件文件
- [ ] 設計師交接文件

---

## 附錄 B：快速參考

### 常用 Token 速查

```css
/* 品牌色 */
--color-primary-500: #F06A6A;  /* 主色 */
--color-primary-600: #E11D48;  /* hover */

/* 背景 */
--bg-page: Light #F9FAFB / Dark #0F0F0F
--bg-card: Light #FFFFFF / Dark #1A1A1A

/* 文字 */
--text-primary: Light #111827 / Dark #F9FAFB
--text-secondary: Light #4B5563 / Dark #A1A1AA

/* 間距 */
4px | 8px | 12px | 16px | 24px | 32px | 48px

/* 圓角 */
--radius-md: 8px (default)

/* 陰影 */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
```

### 組件決策樹

```
需要按鈕？
├─ 主要操作 → Primary Button (實心粉)
├─ 次要操作 → Secondary Button (框線粉)
└─ 文字連結 → Ghost Button (無框)

需要顯示狀態？
├─ 活躍/成功 → 綠色 (success)
├─ 資訊/試用 → 藍色 (info)
├─ 警告/待處理 → 黃色 (warning)
├─ 錯誤/失敗 → 紅色 (error)
└─ 取消/草稿 → 灰色 (neutral)

需要 Tab？
└─ 統一使用下劃線式，禁止按鈕式/Pills 式
```

---

*— Firstory Studio Design System v1.1.0 —*
