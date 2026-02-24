import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'; // 你的 cn 工具函數

/**
 * Button 組件
 *
 * @example
 * <Button>Primary Button</Button>
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="ghost" size="sm">Small Ghost</Button>
 * <Button loading>Loading...</Button>
 */

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold',
    'rounded-md',  // 8px - 統一圓角
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-white',
          'hover:bg-primary-600',
          'active:bg-primary-700',
        ],
        secondary: [
          'bg-white text-primary-500',
          'border border-primary-300',
          'hover:bg-primary-50 hover:border-primary-400',
          'active:bg-primary-100',
        ],
        ghost: [
          'bg-transparent text-primary-500',
          'hover:bg-primary-50',
          'active:bg-primary-100',
        ],
        danger: [
          'bg-error text-white',
          'hover:bg-red-600',
          'active:bg-red-700',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',     // 32px height
        md: 'h-10 px-4 text-sm',    // 40px height
        lg: 'h-12 px-6 text-base',  // 48px height
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Spinner 組件
const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Spinner className={iconSize} />
        ) : (
          leftIcon && <span className={iconSize}>{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && <span className={iconSize}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
