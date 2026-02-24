# Design System Token Registry

> 從 MASTER.md v1.1.0 自動提取
> 生成日期：2026-02-04
> 用途：作為健康檢查的比對基準

---

## 1. CSS Variables

### 1.1 品牌色 (Brand Colors)

| Token | Light Value | Dark Value | Category |
|-------|-------------|------------|----------|
| `--color-primary-50` | `#FFF1F2` | same | brand |
| `--color-primary-100` | `#FFE4E6` | same | brand |
| `--color-primary-200` | `#FECDD3` | same | brand |
| `--color-primary-300` | `#FDA4AF` | same | brand |
| `--color-primary-400` | `#FB7185` | same | brand |
| `--color-primary-500` | `#F06A6A` | same | brand |
| `--color-primary-600` | `#E11D48` | same | brand |
| `--color-primary-700` | `#BE123C` | same | brand |

### 1.2 中性色 (Neutral Colors)

| Token | Value | Category |
|-------|-------|----------|
| `--color-white` | `#FFFFFF` | neutral |
| `--color-black` | `#000000` | neutral |
| `--color-gray-50` | `#F9FAFB` | neutral |
| `--color-gray-100` | `#F3F4F6` | neutral |
| `--color-gray-200` | `#E5E7EB` | neutral |
| `--color-gray-300` | `#D1D5DB` | neutral |
| `--color-gray-400` | `#9CA3AF` | neutral |
| `--color-gray-500` | `#6B7280` | neutral |
| `--color-gray-600` | `#4B5563` | neutral |
| `--color-gray-700` | `#374151` | neutral |
| `--color-gray-800` | `#1F2937` | neutral |
| `--color-gray-900` | `#111827` | neutral |

### 1.3 背景色 (Background)

| Token | Light Value | Dark Value | Category |
|-------|-------------|------------|----------|
| `--bg-page` | `#F9FAFB` | `#0F0F0F` | background |
| `--bg-sidebar` | `#FFFFFF` | `#171717` | background |
| `--bg-card` | `#FFFFFF` | `#1A1A1A` | background |
| `--bg-card-elevated` | `#FFFFFF` | `#242424` | background |
| `--bg-input` | `#FFFFFF` | `#262626` | background |
| `--bg-hover` | `#F3F4F6` | `#2A2A2A` | background |
| `--bg-selected` | `#FFE4E6` | `#3D1F1F` | background |

### 1.4 文字色 (Text)

| Token | Light Value | Dark Value | Category |
|-------|-------------|------------|----------|
| `--text-primary` | `#111827` | `#F9FAFB` | text |
| `--text-secondary` | `#4B5563` | `#A1A1AA` | text |
| `--text-muted` | `#9CA3AF` | `#71717A` | text |
| `--text-disabled` | `#D1D5DB` | `#404040` | text |
| `--text-on-primary` | `#FFFFFF` | `#FFFFFF` | text |
| `--text-link` | `#F06A6A` | `#FB7185` | text |

### 1.5 邊框色 (Border)

| Token | Light Value | Dark Value | Category |
|-------|-------------|------------|----------|
| `--border-default` | `#E5E7EB` | `#2E2E2E` | border |
| `--border-strong` | `#D1D5DB` | `#404040` | border |
| `--border-muted` | `#F3F4F6` | `#1F1F1F` | border |
| `--border-focus` | `#F06A6A` | `#F06A6A` | border |

### 1.6 語意色 - Success

| Token | Light Value | Dark Value | Category |
|-------|-------------|------------|----------|
| `--color-success-bg` | `#DCFCE7` | `#14532D` | semantic |
| `--color-success` | `#22C55E` | `#4ADE80` | semantic |
| `--color-success-text` | `#166534` | `#BBF7D0` | semantic |

### 1.7 語意色 - Info

| Token | Light Value | Dark Value | Category |
|-------|-------------|------------|----------|
| `--color-info-bg` | `#DBEAFE` | `#1E3A5F` | semantic |
| `--color-info` | `#3B82F6` | `#60A5FA` | semantic |
| `--color-info-text` | `#1E40AF` | `#BFDBFE` | semantic |

### 1.8 語意色 - Warning

| Token | Light Value | Dark Value | Category |
|-------|-------------|------------|----------|
| `--color-warning-bg` | `#FEF3C7` | `#422006` | semantic |
| `--color-warning` | `#F59E0B` | `#FBBF24` | semantic |
| `--color-warning-text` | `#92400E` | `#FDE68A` | semantic |

### 1.9 語意色 - Error

| Token | Light Value | Dark Value | Category |
|-------|-------------|------------|----------|
| `--color-error-bg` | `#FEE2E2` | `#450A0A` | semantic |
| `--color-error` | `#EF4444` | `#F87171` | semantic |
| `--color-error-text` | `#991B1B` | `#FECACA` | semantic |

### 1.10 狀態標籤色 (Status Badge)

| Token | Light BG | Light Text | Dark BG | Dark Text |
|-------|----------|------------|---------|-----------|
| `--status-active` | `#DCFCE7` | `#166534` | `#14532D` | `#BBF7D0` |
| `--status-trial` | `#DBEAFE` | `#1E40AF` | `#1E3A5F` | `#BFDBFE` |
| `--status-pending` | `#FEF3C7` | `#92400E` | `#422006` | `#FDE68A` |
| `--status-cancelled` | `#F3F4F6` | `#4B5563` | `#262626` | `#A1A1AA` |
| `--status-failed` | `#FEE2E2` | `#991B1B` | `#450A0A` | `#FECACA` |
| `--status-draft` | `#F3F4F6` | `#6B7280` | `#262626` | `#71717A` |

### 1.11 圖表色 (Chart)

| Token | Light Value | Dark Value | Category |
|-------|-------------|------------|----------|
| `--chart-primary` | `#F06A6A` | `#F06A6A` | chart |
| `--chart-secondary` | `#60A5FA` | `#60A5FA` | chart |
| `--chart-tertiary` | `#2DD4BF` | `#2DD4BF` | chart |
| `--chart-grid` | `#E5E7EB` | `#2E2E2E` | chart |
| `--chart-label` | `#6B7280` | `#A1A1AA` | chart |

---

## 2. Typography Tokens

### 2.1 Font Family

| Token | Value |
|-------|-------|
| `--font-family-sans` | `'Inter', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif` |
| `--font-family-mono` | `'JetBrains Mono', 'Fira Code', monospace` |

### 2.2 Font Size

| Token | Size | Line Height | Rem Value |
|-------|------|-------------|-----------|
| `--text-xs` | 12px | 16px (1.33) | 0.75rem |
| `--text-sm` | 14px | 20px (1.43) | 0.875rem |
| `--text-base` | 16px | 24px (1.5) | 1rem |
| `--text-lg` | 18px | 28px (1.56) | 1.125rem |
| `--text-xl` | 20px | 28px (1.4) | 1.25rem |
| `--text-2xl` | 24px | 32px (1.33) | 1.5rem |
| `--text-3xl` | 30px | 36px (1.2) | 1.875rem |
| `--text-4xl` | 36px | 40px (1.11) | 2.25rem |

### 2.3 Font Weight

| Token | Value |
|-------|-------|
| `--font-normal` | 400 |
| `--font-medium` | 500 |
| `--font-semibold` | 600 |
| `--font-bold` | 700 |

---

## 3. Spacing Tokens

| Token | Value (px) | Value (rem) |
|-------|------------|-------------|
| `--space-0` | 0 | 0 |
| `--space-1` | 4px | 0.25rem |
| `--space-2` | 8px | 0.5rem |
| `--space-3` | 12px | 0.75rem |
| `--space-4` | 16px | 1rem |
| `--space-5` | 20px | 1.25rem |
| `--space-6` | 24px | 1.5rem |
| `--space-8` | 32px | 2rem |
| `--space-10` | 40px | 2.5rem |
| `--space-12` | 48px | 3rem |
| `--space-16` | 64px | 4rem |

---

## 4. Border Radius Tokens

| Token | Value (px) | Value (rem) |
|-------|------------|-------------|
| `--radius-none` | 0 | 0 |
| `--radius-sm` | 4px | 0.25rem |
| `--radius-md` | 8px | 0.5rem |
| `--radius-lg` | 12px | 0.75rem |
| `--radius-xl` | 16px | 1rem |
| `--radius-full` | 9999px | 9999px |

**Default:** `--radius-md` (8px) for buttons, inputs, cards

---

## 5. Shadow Tokens

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |

**Default for cards:** `--shadow-sm` + `border: 1px solid var(--border-default)`

---

## 6. Animation Tokens

| Token | Value |
|-------|-------|
| `--duration-fast` | 150ms |
| `--duration-normal` | 200ms |
| `--duration-slow` | 300ms |
| `--easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--easing-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--easing-out` | `cubic-bezier(0, 0, 0.2, 1)` |

---

## 7. Z-Index Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | 0 | Base layer |
| `--z-dropdown` | 10 | Dropdowns, popovers |
| `--z-sticky` | 20 | Sticky headers |
| `--z-overlay` | 30 | Overlay/backdrop |
| `--z-modal` | 40 | Modals |
| `--z-toast` | 50 | Toast notifications |
| `--z-tooltip` | 60 | Tooltips |

---

## 8. Breakpoints

| Token | Value | Description |
|-------|-------|-------------|
| `--screen-sm` | 640px | Large phones |
| `--screen-md` | 768px | Tablets portrait |
| `--screen-lg` | 1024px | Tablets landscape |
| `--screen-xl` | 1280px | Desktops |
| `--screen-2xl` | 1536px | Large desktops |

---

## 9. Component Specifications

### 9.1 Button

| Size | Height | Padding (H) | Font Size | Icon Size |
|------|--------|-------------|-----------|-----------|
| `sm` | 32px | 12px | 14px | 16px |
| `md` | 40px | 16px | 14px | 20px |
| `lg` | 48px | 24px | 16px | 24px |

**Variants:**
- Primary: bg `--color-primary-500`, hover `--color-primary-600`
- Secondary: border `--color-primary-500`, text `--color-primary-500`
- Ghost: transparent bg, text `--color-primary-500`

**Rules:**
- Border radius: 8px (`--radius-md`)
- Transition: `all 200ms ease`
- Icon gap: 8px

### 9.2 Card

**Default:**
- bg: `--bg-card`
- border: `1px solid var(--border-default)`
- border-radius: 8px (`--radius-md`)
- shadow: `--shadow-sm`
- padding: 24px

### 9.3 Input

- Height: 40px
- Padding: 0 12px
- Border: `1px solid var(--border-default)`
- Border radius: 8px (`--radius-md`)
- Focus: `border-color: var(--border-focus)`
- Error: `border-color: var(--color-error)`

### 9.4 Table

**Header:**
- Height: 48px
- bg: `--color-gray-50` (Light) / `--bg-hover` (Dark)
- text: `--text-secondary`
- font-size: 12px
- font-weight: 500

**Row:**
- Height: 56px
- border-bottom: `1px solid var(--border-default)`
- hover: `--bg-hover`
- font-size: 14px

### 9.5 Tabs (Underline Style Only)

| State | Text Color | Underline |
|-------|------------|-----------|
| Default | `--color-gray-500` | none |
| Hover | `--color-gray-700` | none |
| Active | `--color-primary-500` | 2px solid primary |

**Rules:**
- Tab gap: 24px
- Tab padding: 12px 0
- Transition: `all 200ms ease`

### 9.6 Status Badge

- Height: 24px
- Padding: 0 8px
- Border radius: 4px (`--radius-sm`)
- Font size: 12px
- Font weight: 500

### 9.7 Modal

- Border radius: 16px (`--radius-xl`)
- Shadow: `--shadow-xl`
- Width: 480px (sm), 640px (md), 800px (lg)
- Backdrop: `rgba(0, 0, 0, 0.5)`

### 9.8 Empty State

- Vertical center
- Padding: 48px
- Icon size: 48-64px (Lucide)
- Title: 18px, semibold
- Description: 14px, `--text-secondary`
- Must include: SVG icon + title + description + CTA

---

## 10. Anti-Patterns (Things to Flag)

### Colors
- [ ] Hardcoded hex colors (not CSS variables)
- [ ] Non-system colors

### Typography
- [ ] Non-standard font sizes (e.g., 15px)
- [ ] Line height < 1.3
- [ ] Non-system fonts

### Components
- [ ] Emoji used as UI icons
- [ ] Mixed border radius values
- [ ] Non-underline tab styles
- [ ] Empty states without SVG/title/description/CTA

### Layout
- [ ] Non-4px spacing multiples
- [ ] Unmanaged z-index values

---

*Generated from MASTER.md v1.1.0*
