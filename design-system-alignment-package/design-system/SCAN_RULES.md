# Design System Scan Rules

> 定義掃描規則，用於 Phase 1 健康檢查
> 版本：1.0

---

## 1. 掃描目標檔案

### 1.1 設定檔 (Configuration Files)

```
tailwind.config.js
tailwind.config.ts
tailwind.config.mjs
postcss.config.js
```

### 1.2 樣式檔 (Style Files)

```
**/globals.css
**/global.css
**/styles/*.css
**/app.css
```

### 1.3 組件檔 (Component Files)

```
**/components/ui/**/*.tsx
**/components/ui/**/*.jsx
**/components/**/*.tsx (secondary)
```

### 1.4 頁面檔 (Page Files)

```
**/app/**/*.tsx
**/pages/**/*.tsx
**/src/**/*.tsx (if not using app router)
```

---

## 2. 掃描規則

### 2.1 硬編碼顏色 (Hardcoded Colors)

**Pattern:**
```regex
#[A-Fa-f0-9]{3,8}
rgb\s*\([^)]+\)
rgba\s*\([^)]+\)
hsl\s*\([^)]+\)
hsla\s*\([^)]+\)
```

**排除:**
- 在 CSS variable 定義內 (`:root { }` 區塊)
- 有 `/* ds-ignore */` 註解的行
- 在 tailwind.config 的 theme.extend 內（這是設定，需要個別驗證值）

**嚴重等級:** High

### 2.2 非標準間距 (Non-Standard Spacing)

**標準值 (4px base):**
```
0, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px
0, 0.25rem, 0.5rem, 0.75rem, 1rem, 1.25rem, 1.5rem, 2rem, 2.5rem, 3rem, 4rem
```

**Pattern:**
```regex
(?:margin|padding|gap|space|top|right|bottom|left):\s*(\d+(?:\.\d+)?(?:px|rem))
(?:m|p|gap)-\[(\d+(?:\.\d+)?(?:px|rem))\]  (Tailwind arbitrary values)
```

**需要標記的非標準值:**
- 5px, 6px, 7px, 9px, 10px, 11px, 13px, 14px, 15px, 17px, 18px, 19px...
- 任何非 4px 倍數

**嚴重等級:** Medium

### 2.3 非標準圓角 (Non-Standard Border Radius)

**標準值:**
```
0, 4px, 8px, 12px, 16px, 9999px
0, 0.25rem, 0.5rem, 0.75rem, 1rem, 9999px
```

**Pattern:**
```regex
border-radius:\s*(\d+(?:\.\d+)?(?:px|rem))
rounded-\[(\d+(?:\.\d+)?(?:px|rem))\]  (Tailwind arbitrary values)
```

**嚴重等級:** Low

### 2.4 非標準字體大小 (Non-Standard Font Size)

**標準值:**
```
12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px
0.75rem, 0.875rem, 1rem, 1.125rem, 1.25rem, 1.5rem, 1.875rem, 2.25rem
```

**Pattern:**
```regex
font-size:\s*(\d+(?:\.\d+)?(?:px|rem))
text-\[(\d+(?:\.\d+)?(?:px|rem))\]  (Tailwind arbitrary values)
```

**需要標記的非標準值:**
- 10px, 11px, 13px, 15px, 17px, 19px, 22px, 26px...

**嚴重等級:** Medium

### 2.5 Emoji 作為 UI 圖標

**Pattern:**
```regex
[\u{1F300}-\u{1F9FF}]  (Emoji range)
```

**排除:**
- 在 string literals 用於顯示內容（非 UI 元素）
- 註解中

**嚴重等級:** Medium

### 2.6 非下劃線式 Tab

**需要檢測的模式:**
```tsx
// Button-style tabs
<Tab className="...rounded..." />
<TabsList className="...bg-gray-100..." />

// Pills-style tabs
<Tab className="...pill..." />
```

**嚴重等級:** High

### 2.7 空狀態缺少必要元素

**必要元素:**
1. SVG 圖標或插圖
2. 標題文字
3. 說明文字
4. CTA 按鈕

**Pattern:** 搜尋包含 "empty", "no-data", "no-results" 等關鍵字的組件

**嚴重等級:** Medium

---

## 3. Tailwind Config 驗證

### 3.1 Colors 區塊

需要驗證 `theme.extend.colors` 包含：

```js
colors: {
  primary: {
    50: '#FFF1F2',
    100: '#FFE4E6',
    200: '#FECDD3',
    300: '#FDA4AF',
    400: '#FB7185',
    500: '#F06A6A',  // Main brand color
    600: '#E11D48',
    700: '#BE123C',
  },
  // ... other tokens
}
```

### 3.2 Spacing 區塊

需要驗證 `theme.extend.spacing` 或使用 Tailwind 預設值

### 3.3 Border Radius 區塊

需要驗證 `theme.extend.borderRadius` 包含：

```js
borderRadius: {
  sm: '4px',   // 0.25rem
  md: '8px',   // 0.5rem - DEFAULT
  lg: '12px',  // 0.75rem
  xl: '16px',  // 1rem
}
```

### 3.4 Font Family 區塊

需要驗證 `theme.extend.fontFamily` 包含：

```js
fontFamily: {
  sans: ['Inter', 'Noto Sans TC', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
}
```

---

## 4. CSS Variables 驗證

### 4.1 globals.css `:root` 區塊

檢查是否定義所有 MASTER.md Section 6 的 Light mode variables

### 4.2 globals.css `.dark` 區塊

檢查是否定義所有 MASTER.md Section 6 的 Dark mode variables

### 4.3 Variable 值比對

逐一比對 variable 值是否與 MASTER.md 一致

---

## 5. 組件規範驗證

### 5.1 Button 組件

檢查 `components/ui/button.tsx`:

- [ ] 尺寸變體 (sm/md/lg) 符合規範
- [ ] 顏色變體使用正確 tokens
- [ ] 圓角為 8px
- [ ] 過渡時間 200ms

### 5.2 Card 組件

檢查 `components/ui/card.tsx`:

- [ ] padding 24px
- [ ] border 使用 `--border-default`
- [ ] border-radius 8px
- [ ] shadow 使用 `--shadow-sm`

### 5.3 Input 組件

檢查 `components/ui/input.tsx`:

- [ ] height 40px
- [ ] padding 0 12px
- [ ] border-radius 8px
- [ ] focus border 使用 `--border-focus`

### 5.4 Tabs 組件

檢查 `components/ui/tabs.tsx`:

- [ ] 使用下劃線式（非 button/pills）
- [ ] active 狀態有 2px bottom border
- [ ] 使用正確顏色 tokens

### 5.5 Table 組件

檢查 `components/ui/table.tsx`:

- [ ] header 高度 48px
- [ ] row 高度 56px
- [ ] header 背景 gray-50
- [ ] 正確的字體大小

### 5.6 Badge 組件

檢查 `components/ui/badge.tsx`:

- [ ] 高度 24px
- [ ] border-radius 4px
- [ ] 顏色對應正確狀態

---

## 6. 輸出格式

### 6.1 Issue 格式

```json
{
  "id": "COLOR-001",
  "category": "hardcoded-color",
  "severity": "high",
  "file": "src/components/Button.tsx",
  "line": 23,
  "column": 15,
  "code": "bg-[#F06A6A]",
  "message": "Hardcoded color should use CSS variable or Tailwind token",
  "suggestion": "Use bg-primary-500 instead"
}
```

### 6.2 Summary 格式

```json
{
  "totalIssues": 42,
  "bySeverity": {
    "high": 12,
    "medium": 20,
    "low": 10
  },
  "byCategory": {
    "hardcoded-color": 15,
    "non-standard-spacing": 10,
    "non-standard-radius": 5,
    "non-standard-font-size": 7,
    "emoji-icon": 2,
    "non-underline-tab": 1,
    "empty-state-incomplete": 2
  },
  "healthScore": 78
}
```

---

## 7. 忽略規則

### 7.1 行級忽略

```tsx
const specialColor = "#123456"; /* ds-ignore */
```

### 7.2 區塊忽略

```tsx
/* ds-ignore-start */
// Third-party integration code
const thirdPartyColors = {
  spotify: "#1DB954",
  apple: "#FC3C44"
};
/* ds-ignore-end */
```

### 7.3 檔案忽略

在專案根目錄建立 `.dsignore`:

```
# Ignore third-party code
node_modules/
.next/
vendor/

# Ignore specific files
src/lib/third-party-theme.ts
```

---

*Scan Rules v1.0*
