import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Alert 組件 - 用於行內提示訊息
 *
 * @example
 * <Alert variant="info">
 *   <AlertDescription>這是一則資訊提示</AlertDescription>
 * </Alert>
 *
 * <Alert variant="warning">
 *   <AlertDescription>下載數每 3 小時更新...</AlertDescription>
 * </Alert>
 */

const alertVariants = cva(
  // Base styles
  [
    'relative',
    'rounded-r-md',     // 只有右邊圓角
    'border-l-[3px]',   // 左邊色條
    'p-4',
  ],
  {
    variants: {
      variant: {
        info: [
          'bg-info-light',
          'border-l-info',
          'text-info-dark',
        ],
        success: [
          'bg-success-light',
          'border-l-success',
          'text-success-dark',
        ],
        warning: [
          'bg-warning-light',
          'border-l-warning',
          'text-warning-dark',
        ],
        error: [
          'bg-error-light',
          'border-l-error',
          'text-error-dark',
        ],
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: ReactNode;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    >
      <div className="flex gap-3">
        {icon && <span className="flex-shrink-0 mt-0.5">{icon}</span>}
        <div>{children}</div>
      </div>
    </div>
  )
);

Alert.displayName = 'Alert';

// Alert Description
const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm leading-relaxed', className)}
    {...props}
  />
));

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, alertVariants };
