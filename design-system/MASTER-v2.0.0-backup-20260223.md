# Firstory Studio 設計系統規範

> 版本：2.0.0
> 建立日期：2026-02-03
> 更新日期：2026-02-05
> 技術棧：React + Tailwind CSS 4 + shadcn/ui + base-ui

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

#### 品牌色 (Brand) - Coral Red

> 使用 OKLCH 色彩空間，提供感知均勻的色彩操作和更好的深色模式支援

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--primary` | `oklch(0.6493 0.2297 15.7)` | `oklch(0.7093 0.2297 15.7)` | **主色** - 按鈕、連結、CTA |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.985 0 0)` | 主色按鈕上的文字 |
| `--primary-hover` | `oklch(0.5893 0.2297 15.7)` | `oklch(0.7593 0.2097 15.7)` | 按鈕 hover |
| `--primary-active` | `oklch(0.5393 0.2297 15.7)` | `oklch(0.6593 0.2297 15.7)` | 按鈕 active |
| `--primary-muted` | `oklch(0.9493 0.0459 15.7)` | `oklch(0.25 0.06 15.7)` | 淺背景、選中狀態 |

#### 背景色 (Background) - shadcn 命名

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--background` | `oklch(0.985 0 0)` | `oklch(0.145 0 0)` | 頁面背景 |
| `--card` | `oklch(1 0 0)` | `oklch(0.18 0 0)` | 卡片背景 |
| `--popover` | `oklch(1 0 0)` | `oklch(0.22 0 0)` | 強調卡片、彈窗 |
| `--secondary` | `oklch(0.965 0 0)` | `oklch(0.22 0 0)` | 次要背景 |
| `--muted` | `oklch(0.965 0 0)` | `oklch(0.22 0 0)` | Hover 狀態背景 |
| `--accent` | `oklch(0.965 0 0)` | `oklch(0.28 0 0)` | 選中狀態背景 |
| `--input` | `oklch(0.912 0 0)` | `oklch(0.32 0 0)` | 輸入框背景 |

#### 文字色 (Text) - shadcn 命名

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--foreground` | `oklch(0.27 0 0)` | `oklch(0.93 0 0)` | 標題、主要文字 |
| `--card-foreground` | `oklch(0.145 0 0)` | `oklch(0.96 0 0)` | 卡片內文字 |
| `--popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.96 0 0)` | 彈窗內文字 |
| `--secondary-foreground` | `oklch(0.205 0 0)` | `oklch(0.96 0 0)` | 次要元素文字 |
| `--muted-foreground` | `oklch(0.50 0 0)` | `oklch(0.65 0 0)` | 說明文字、Placeholder |
| `--accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.96 0 0)` | 強調元素文字 |

#### 邊框色 (Border) - shadcn 命名

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--border` | `oklch(0.912 0 0)` | `oklch(0.28 0 0)` | 卡片、輸入框邊框 |
| `--input` | `oklch(0.912 0 0)` | `oklch(0.32 0 0)` | 輸入框邊框 |
| `--ring` | `oklch(0.6493 0.2297 15.7)` | `oklch(0.7093 0.2297 15.7)` | Focus 狀態邊框 |

#### 語意色 - 成功 (Success)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--success` | `oklch(0.92 0.06 155)` | `oklch(0.28 0.08 155)` | 成功提示背景 |
| `--success-foreground` | `oklch(0.32 0.12 155)` | `oklch(0.82 0.12 155)` | 成功圖標、文字 |

#### 語意色 - 資訊 (Info)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--info` | `oklch(0.92 0.05 250)` | `oklch(0.28 0.08 250)` | 資訊提示背景 |
| `--info-foreground` | `oklch(0.38 0.15 250)` | `oklch(0.82 0.10 250)` | 資訊圖標、文字 |

#### 語意色 - 警告 (Warning)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--warning` | `oklch(0.92 0.08 85)` | `oklch(0.32 0.10 70)` | 警告提示背景 |
| `--warning-foreground` | `oklch(0.42 0.14 65)` | `oklch(0.88 0.10 85)` | 警告圖標、文字 |

#### 語意色 - 錯誤 (Error)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--error` | `oklch(0.92 0.05 25)` | `oklch(0.32 0.10 25)` | 錯誤提示背景 |
| `--error-foreground` | `oklch(0.48 0.18 25)` | `oklch(0.88 0.08 25)` | 錯誤圖標、文字 |

#### 破壞性操作 (Destructive)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | 刪除按鈕背景 |
| `--destructive-foreground` | `oklch(1 0 0)` | `oklch(0.985 0 0)` | 刪除按鈕文字 |

#### 狀態標籤色 (Status Badge)

> 使用語意色 tokens 組合，確保一致性

| 狀態 | 背景 Token | 文字 Token | 說明 |
| --- | --- | --- | --- |
| 活躍/已發佈 | `--success` | `--success-foreground` | 訂閱進行中、已發佈 |
| 試用中 | `--info` | `--info-foreground` | 免費試用期 |
| 待處理 | `--warning` | `--warning-foreground` | 等待審核 |
| 已取消 | `--muted` | `--muted-foreground` | 取消訂閱 |
| 失敗 | `--error` | `--error-foreground` | 扣款失敗 |
| 草稿 | `--muted` | `--muted-foreground` | 未發佈 |

#### 圖表色 (Chart) - Blue-Purple Gradient

> 專業數據視覺化調色盤

| Token | Value | 用途 |
| --- | --- | --- |
| `--chart-1` | `oklch(0.55 0.22 264)` | 主要數據 |
| `--chart-2` | `oklch(0.62 0.20 260)` | 次要數據 |
| `--chart-3` | `oklch(0.69 0.17 256)` | 第三數據 |
| `--chart-4` | `oklch(0.76 0.13 252)` | 第四數據 |
| `--chart-5` | `oklch(0.83 0.09 248)` | 第五數據 |

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--chart-grid` | `oklch(0.922 0 0)` | `oklch(0.28 0 0)` | 網格線 |
| `--chart-label` | `oklch(0.50 0 0)` | `oklch(0.65 0 0)` | 軸標籤文字 |
| `--chart-tooltip-bg` | `oklch(1 0 0)` | `oklch(0.22 0 0)` | Tooltip 背景 |

#### 熱力圖色階 (Heatmap)

| Level | Value | 用途 |
| --- | --- | --- |
| `--heatmap-0` | `#eee` | 無數據 |
| `--heatmap-1` | `#89f3ec` | 低 |
| `--heatmap-2` | `#4aeee2` | 中低 |
| `--heatmap-3` | `#1dcdc1` | 中高 |
| `--heatmap-4` | `#2f857e` | 高 |

#### 地圖色階 (Map)

| Level | Value |
| --- | --- |
| `--map-1` | `#c3f8f4` |
| `--map-2` | `#89f3ec` |
| `--map-3` | `#4aeee2` |
| `--map-4` | `#1dcdc1` |
| `--map-5` | `#2f857e` |

#### 音訊區段色 (Audio Segment)

> 用於 Podcast 音訊編輯器時間軸

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--audio-main` | `var(--info)` | same | 主要音訊內容 |
| `--audio-main-foreground` | `var(--info-foreground)` | same | 主要音訊文字 |
| `--audio-kkbox-track` | `var(--success)` | same | KKBOX 音樂區段 |
| `--audio-kkbox-track-foreground` | `var(--success-foreground)` | same | KKBOX 文字 |
| `--audio-sharing` | `var(--warning)` | same | 分享/推廣區段 |
| `--audio-sharing-foreground` | `var(--warning-foreground)` | same | 分享文字 |
| `--audio-ad` | `oklch(0.65 0 0)` | `oklch(0.45 0 0)` | 廣告區段 |
| `--audio-ad-foreground` | `oklch(0.98 0 0)` | `oklch(0.95 0 0)` | 廣告文字 |

#### 第三方品牌色 (Third-Party Brands)

> 用於平台整合圖示和按鈕。品牌色使用 HEX 以確保與官方色彩一致。

| Token | Value | 用途 |
| --- | --- | --- |
| `--apple-brand` | `#B150E2` | Apple Podcasts |
| `--spotify-brand` | `#1ED761` | Spotify |
| `--youtube-brand` | `#FF0000` | YouTube |
| `--google-brand` | `#4285F4` | Google 登入 |

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
| `--shadow-2xs` | `0 1px 2px 0 hsl(0 0% 0% / 0.03)` | 極微提升 |
| `--shadow-xs` | `0 1px 2px 0 hsl(0 0% 0% / 0.05)` | 微小提升 |
| `--shadow-sm` | `0 1px 3px 0 hsl(0 0% 0% / 0.08), 0 1px 2px -1px hsl(0 0% 0% / 0.08)` | 卡片、dropdown |
| `--shadow` | `0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)` | 標準陰影 |
| `--shadow-md` | `0 4px 6px -1px hsl(0 0% 0% / 0.08), 0 2px 4px -2px hsl(0 0% 0% / 0.08)` | 強調卡片 |
| `--shadow-lg` | `0 10px 15px -3px hsl(0 0% 0% / 0.08), 0 4px 6px -4px hsl(0 0% 0% / 0.08)` | Modal、popover |
| `--shadow-xl` | `0 20px 25px -5px hsl(0 0% 0% / 0.08), 0 8px 10px -6px hsl(0 0% 0% / 0.08)` | 大型彈窗 |
| `--shadow-2xl` | `0 25px 50px -12px hsl(0 0% 0% / 0.2)` | 特大彈窗 |

#### 方向性陰影 (Directional Shadows)

> 用於 sticky 表格欄位和標題

| Token | 用途 |
| --- | --- |
| `--shadow-top` | Sticky 底部元素 |
| `--shadow-right` | Sticky 左側欄位 |
| `--shadow-bottom` | Sticky 頂部標題 |
| `--shadow-left` | Sticky 右側欄位 |

#### 遮罩層 (Overlay)

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--overlay` | `oklch(0 0 0 / 0.1)` | `oklch(0 0 0 / 0.4)` | Modal/Sheet 背景遮罩 |

> ⚠️ **統一規則：卡片預設使用 \****`--shadow-sm`***\* + \****`border: 1px solid var(--border)`**

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
| 直接寫 hex code (#F06A6A) | 使用 CSS variable (var(--primary)) |
| 用顏色作為唯一區分方式 | 顏色 + 圖標/文字共同表達 |
| 在深色模式使用純白 #FFF | 使用 --foreground |
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

> 以下為 `src/index.css` 的完整 CSS Variables 定義，使用 OKLCH 色彩空間和 shadcn/ui 命名規範

```css
:root {
  /* ============================================
     BRAND PRIMARY - Coral Red
     Base: oklch(0.6493 0.2297 15.7)
     ============================================ */
  --primary: oklch(0.6493 0.2297 15.7);
  --primary-foreground: oklch(0.985 0 0);
  --primary-hover: oklch(0.5893 0.2297 15.7);
  --primary-active: oklch(0.5393 0.2297 15.7);
  --primary-muted: oklch(0.9493 0.0459 15.7);

  /* ============================================
     CORE SEMANTIC COLORS
     ============================================ */
  --background: oklch(0.985 0 0);
  --foreground: oklch(0.27 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --secondary: oklch(0.965 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.965 0 0);
  --muted-foreground: oklch(0.50 0 0);
  --accent: oklch(0.965 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(1 0 0);

  /* ============================================
     BORDERS & INPUTS
     ============================================ */
  --border: oklch(0.912 0 0);
  --input: oklch(0.912 0 0);
  --ring: oklch(0.6493 0.2297 15.7);

  /* ============================================
     SIDEBAR
     ============================================ */
  --sidebar: oklch(0.98 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.96 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.912 0 0);
  --sidebar-ring: oklch(0.6493 0.2297 15.7);

  /* ============================================
     SEMANTIC ALERT COLORS (WCAG AA Compliant)
     ============================================ */
  --success: oklch(0.92 0.06 155);
  --success-foreground: oklch(0.32 0.12 155);
  --info: oklch(0.92 0.05 250);
  --info-foreground: oklch(0.38 0.15 250);
  --warning: oklch(0.92 0.08 85);
  --warning-foreground: oklch(0.42 0.14 65);
  --error: oklch(0.92 0.05 25);
  --error-foreground: oklch(0.48 0.18 25);

  /* ============================================
     CHART COLORS - Blue-Purple Gradient
     ============================================ */
  --chart-1: oklch(0.55 0.22 264);
  --chart-2: oklch(0.62 0.20 260);
  --chart-3: oklch(0.69 0.17 256);
  --chart-4: oklch(0.76 0.13 252);
  --chart-5: oklch(0.83 0.09 248);
  --chart-grid: oklch(0.922 0 0);
  --chart-label: oklch(0.50 0 0);
  --chart-tooltip-bg: oklch(1 0 0);

  /* ============================================
     AUDIO SEGMENT COLORS
     ============================================ */
  --audio-main: var(--info);
  --audio-main-foreground: var(--info-foreground);
  --audio-kkbox-track: var(--success);
  --audio-kkbox-track-foreground: var(--success-foreground);
  --audio-sharing: var(--warning);
  --audio-sharing-foreground: var(--warning-foreground);
  --audio-ad: oklch(0.65 0 0);
  --audio-ad-foreground: oklch(0.98 0 0);

  /* ============================================
     THIRD-PARTY BRAND COLORS
     ============================================ */
  --apple-brand: #B150E2;
  --spotify-brand: #1ED761;
  --youtube-brand: #FF0000;
  --google-brand: #4285F4;

  /* ============================================
     TYPOGRAPHY
     ============================================ */
  --font-sans: 'Inter Variable', 'Noto Sans Variable', 'Noto Sans TC Variable',
    'Noto Sans JP Variable', system-ui, sans-serif;
  --font-serif: 'Noto Serif Variable', 'Noto Serif TC Variable',
    'Noto Serif JP Variable', Georgia, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* ============================================
     SPACING & SIZING
     ============================================ */
  --radius: 0.625rem;
  --spacing: 0.25rem;

  /* ============================================
     SHADOWS
     ============================================ */
  --shadow-2xs: 0 1px 2px 0 hsl(0 0% 0% / 0.03);
  --shadow-xs: 0 1px 2px 0 hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0 hsl(0 0% 0% / 0.08), 0 1px 2px -1px hsl(0 0% 0% / 0.08);
  --shadow: 0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.08), 0 2px 4px -2px hsl(0 0% 0% / 0.08);
  --shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.08), 0 4px 6px -4px hsl(0 0% 0% / 0.08);
  --shadow-xl: 0 20px 25px -5px hsl(0 0% 0% / 0.08), 0 8px 10px -6px hsl(0 0% 0% / 0.08);
  --shadow-2xl: 0 25px 50px -12px hsl(0 0% 0% / 0.2);

  /* Directional shadows for sticky elements */
  --shadow-top: 0 -1px 3px 0 hsl(0 0% 0% / 0.08), 0 -2px 4px -1px hsl(0 0% 0% / 0.06);
  --shadow-right: 1px 0 3px 0 hsl(0 0% 0% / 0.08), 2px 0 4px -1px hsl(0 0% 0% / 0.06);
  --shadow-bottom: 0 1px 3px 0 hsl(0 0% 0% / 0.08), 0 2px 4px -1px hsl(0 0% 0% / 0.06);
  --shadow-left: -1px 0 3px 0 hsl(0 0% 0% / 0.08), -2px 0 4px -1px hsl(0 0% 0% / 0.06);

  /* ============================================
     OVERLAY
     ============================================ */
  --overlay: oklch(0 0 0 / 0.1);
}

/* ============================================
   DARK MODE
   ============================================ */
.dark {
  /* Brand Primary (Brightened for dark mode) */
  --primary: oklch(0.7093 0.2297 15.7);
  --primary-foreground: oklch(0.985 0 0);
  --primary-hover: oklch(0.7593 0.2097 15.7);
  --primary-active: oklch(0.6593 0.2297 15.7);
  --primary-muted: oklch(0.25 0.06 15.7);

  /* Core Semantic Colors */
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.93 0 0);
  --card: oklch(0.18 0 0);
  --card-foreground: oklch(0.96 0 0);
  --popover: oklch(0.22 0 0);
  --popover-foreground: oklch(0.96 0 0);
  --secondary: oklch(0.22 0 0);
  --secondary-foreground: oklch(0.96 0 0);
  --muted: oklch(0.22 0 0);
  --muted-foreground: oklch(0.65 0 0);
  --accent: oklch(0.28 0 0);
  --accent-foreground: oklch(0.96 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.985 0 0);

  /* Borders & Inputs */
  --border: oklch(0.28 0 0);
  --input: oklch(0.32 0 0);
  --ring: oklch(0.7093 0.2297 15.7);

  /* Sidebar */
  --sidebar: oklch(0.18 0 0);
  --sidebar-foreground: oklch(0.96 0 0);
  --sidebar-primary: oklch(0.7093 0.2297 15.7);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.24 0 0);
  --sidebar-accent-foreground: oklch(0.96 0 0);
  --sidebar-border: oklch(0.28 0 0);
  --sidebar-ring: oklch(0.7093 0.2297 15.7);

  /* Semantic Alert Colors */
  --success: oklch(0.28 0.08 155);
  --success-foreground: oklch(0.82 0.12 155);
  --info: oklch(0.28 0.08 250);
  --info-foreground: oklch(0.82 0.10 250);
  --warning: oklch(0.32 0.10 70);
  --warning-foreground: oklch(0.88 0.10 85);
  --error: oklch(0.32 0.10 25);
  --error-foreground: oklch(0.88 0.08 25);

  /* Chart Colors */
  --chart-grid: oklch(0.28 0 0);
  --chart-label: oklch(0.65 0 0);
  --chart-tooltip-bg: oklch(0.22 0 0);

  /* Audio Segment Colors */
  --audio-ad: oklch(0.45 0 0);
  --audio-ad-foreground: oklch(0.95 0 0);

  /* Overlay */
  --overlay: oklch(0 0 0 / 0.4);
}
```

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
| 2.0.0 | 2026-02-05 | 重大更新：採用 OKLCH 色彩格式、shadcn 命名規範、新增音訊/品牌/圖表 tokens |
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
/* 品牌色 (OKLCH) */
--primary: oklch(0.6493 0.2297 15.7);  /* 主色 */
--primary-hover: oklch(0.5893 0.2297 15.7);  /* hover */

/* 背景 */
--background: Light oklch(0.985 0 0) / Dark oklch(0.145 0 0)
--card: Light oklch(1 0 0) / Dark oklch(0.18 0 0)

/* 文字 */
--foreground: Light oklch(0.27 0 0) / Dark oklch(0.93 0 0)
--muted-foreground: Light oklch(0.50 0 0) / Dark oklch(0.65 0 0)

/* 間距 */
4px | 8px | 12px | 16px | 24px | 32px | 48px

/* 圓角 */
--radius: 0.625rem (10px default)

/* 陰影 */
--shadow-sm: 0 1px 3px 0 hsl(0 0% 0% / 0.08)
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

*— Firstory Studio Design System v2.0.0 —*
