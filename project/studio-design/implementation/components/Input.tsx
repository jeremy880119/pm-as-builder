import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Input 組件
 *
 * @example
 * <Input placeholder="請輸入..." />
 * <Input label="名稱" required />
 * <Input label="Email" error="請輸入有效的 Email" />
 * <Input label="搜尋" leftIcon={<SearchIcon />} />
 */

const inputVariants = cva(
  // Base styles
  [
    'flex w-full',
    'h-10 px-3',                       // height: 40px
    'rounded-md',                       // 8px
    'border border-gray-300',
    'bg-white',
    'text-sm text-gray-800',
    'placeholder:text-gray-400',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
  ],
  {
    variants: {
      hasError: {
        true: [
          'border-error',
          'focus:ring-error focus:border-error',
        ],
      },
    },
    defaultVariants: {
      hasError: false,
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </span>
          )}

          {/* Input */}
          <input
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              inputVariants({ hasError }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-1.5 text-sm text-error">{error}</p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
