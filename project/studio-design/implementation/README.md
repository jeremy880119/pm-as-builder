# Firstory Studio Design System - Implementation

Next.js + Tailwind CSS 組件庫

## 安裝依賴

```bash
npm install class-variance-authority clsx tailwind-merge
# 或
pnpm add class-variance-authority clsx tailwind-merge
```

## 設置步驟

### 1. 合併 Tailwind 配置

```js
// tailwind.config.js
const designSystem = require('./design-system/tailwind.config.extend');

module.exports = {
  ...designSystem,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  // 你的其他配置...
}
```

### 2. 複製 `lib/utils.ts`

複製到你的專案 `lib/` 或 `utils/` 目錄。

### 3. 複製組件

複製 `components/` 目錄到你的專案。

### 4. 更新 import 路徑

根據你的專案結構，更新組件中的 `@/lib/utils` 路徑。

---

## 組件使用範例

### Button

```tsx
import { Button } from '@/components/ui';

// 變體
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// 尺寸
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// 狀態
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// 帶 Icon
<Button leftIcon={<PlusIcon />}>新增</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

<Card>
  <CardHeader>
    <CardTitle>統計數據</CardTitle>
    <CardDescription>過去 7 天的表現</CardDescription>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>

// 變體
<Card variant="elevated">有陰影的卡片</Card>
<Card variant="filled">灰底卡片</Card>
<Card variant="outlined">只有邊框</Card>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">管理總覽</TabsTrigger>
    <TabsTrigger value="episodes">單集表現</TabsTrigger>
    <TabsTrigger value="audience">受眾輪廓</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    Overview content
  </TabsContent>
  <TabsContent value="episodes">
    Episodes content
  </TabsContent>
</Tabs>
```

### Badge

```tsx
import { Badge } from '@/components/ui';

<Badge status="active">已發佈</Badge>
<Badge status="trial">試用中</Badge>
<Badge status="pending">待處理</Badge>
<Badge status="cancelled">已取消</Badge>
<Badge status="failed">扣款失敗</Badge>
<Badge status="draft">草稿</Badge>
```

### Alert

```tsx
import { Alert, AlertDescription } from '@/components/ui';

<Alert variant="info">
  <AlertDescription>這是資訊提示</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertDescription>下載數每 3 小時更新...</AlertDescription>
</Alert>
```

### Banner

```tsx
import { Banner, BannerLink } from '@/components/ui';

<Banner variant="success" icon={<CheckIcon />}>
  2026 年度 Podcast 趨勢報告出爐！
  <BannerLink href="/report">點擊了解</BannerLink>
</Banner>

<Banner variant="info" dismissible onDismiss={() => {}}>
  現在開始你可以獲得節目完聽率
</Banner>
```

### Table

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>標題</TableHead>
      <TableHead>日期</TableHead>
      <TableHead>狀態</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Episode 1</TableCell>
      <TableCell>2026-01-01</TableCell>
      <TableCell>
        <Badge status="active">已發佈</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Input

```tsx
import { Input } from '@/components/ui';

<Input placeholder="請輸入..." />
<Input label="名稱" required />
<Input label="Email" error="請輸入有效的 Email" />
<Input label="搜尋" leftIcon={<SearchIcon />} />
```

### EmptyState

```tsx
import { EmptyState } from '@/components/ui';

<EmptyState
  icon={<MicrophoneIcon className="w-16 h-16" />}
  title="還沒有任何單集"
  description="上傳你的第一集，開始你的 Podcast 旅程"
  action={{
    label: "上傳單集",
    onClick: () => router.push('/upload'),
  }}
/>
```

---

## 色彩使用

```tsx
// 品牌色
<div className="bg-primary-500 text-white">Primary</div>
<div className="text-primary-500">Primary text</div>

// 語意色
<div className="bg-success-light text-success-dark">Success</div>
<div className="bg-info-light text-info-dark">Info</div>
<div className="bg-warning-light text-warning-dark">Warning</div>
<div className="bg-error-light text-error-dark">Error</div>
```

---

## 檔案結構

```
implementation/
├── README.md
├── tailwind.config.extend.js    # Tailwind 配置擴展
├── lib/
│   └── utils.ts                  # cn() 工具函數
└── components/
    ├── index.ts                  # 統一導出
    ├── Button.tsx
    ├── Card.tsx
    ├── Tabs.tsx
    ├── Badge.tsx
    ├── Alert.tsx
    ├── Banner.tsx
    ├── Table.tsx
    ├── Input.tsx
    └── EmptyState.tsx
```

---

## 後續可新增組件

- [ ] Modal / Dialog
- [ ] Select / Dropdown
- [ ] Toggle Switch
- [ ] Checkbox
- [ ] Radio
- [ ] Tooltip
- [ ] Pagination
- [ ] Skeleton
- [ ] Toast / Notification
