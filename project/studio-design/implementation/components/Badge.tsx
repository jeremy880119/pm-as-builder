import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Badge / Status 組件
 *
 * @example
 * <Badge status="active">已發佈</Badge>
 * <Badge status="trial">試用中</Badge>
 * <Badge status="pending">待處理</Badge>
 * <Badge status="cancelled">已取消</Badge>
 * <Badge status="failed">扣款失敗</Badge>
 */

const badgeVariants = cva(
  // Base styles
  [
    'inline-flex items-center gap-1.5',
    'px-2 h-6',
    'rounded-sm',          // 4px
    'text-xs font-medium',
  ],
  {
    variants: {
      status: {
        active: 'bg-green-100 text-green-700',
        trial: 'bg-blue-100 text-blue-700',
        pending: 'bg-yellow-100 text-yellow-700',
        cancelled: 'bg-gray-100 text-gray-700',
        failed: 'bg-red-100 text-red-700',
        draft: 'bg-gray-100 text-gray-500',
      },
    },
    defaultVariants: {
      status: 'active',
    },
  }
);

// Dot colors mapping
const dotColors: Record<string, string> = {
  active: 'bg-green-500',
  trial: 'bg-blue-500',
  pending: 'bg-yellow-500',
  cancelled: 'bg-gray-500',
  failed: 'bg-red-500',
  draft: 'bg-gray-400',
};

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  showDot?: boolean;
}

const Badge = ({
  className,
  status,
  showDot = true,
  children,
  ...props
}: BadgeProps) => {
  const dotColor = dotColors[status || 'active'];

  return (
    <span className={cn(badgeVariants({ status, className }))} {...props}>
      {showDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', dotColor)} />
      )}
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
