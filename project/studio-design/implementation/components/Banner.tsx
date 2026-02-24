import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Banner 組件 - 頂部公告橫幅
 *
 * @example
 * <Banner variant="success" icon={<CheckIcon />}>
 *   2026 年度 Podcast 趨勢報告出爐！
 *   <BannerLink href="/report">點擊了解</BannerLink>
 * </Banner>
 *
 * <Banner variant="info" icon={<InfoIcon />} dismissible onDismiss={() => {}}>
 *   （搶先設定）現在開始你可以獲得節目完聽率
 * </Banner>
 */

const bannerVariants = cva(
  // Base styles
  [
    'relative',
    'px-4 py-3',
    'text-sm',
  ],
  {
    variants: {
      variant: {
        success: [
          'bg-success-light',
          'text-success-dark',
        ],
        info: [
          'bg-info-light',
          'text-info-dark',
        ],
        warning: [
          'bg-warning-light',
          'text-warning-dark',
        ],
        error: [
          'bg-error-light',
          'text-error-dark',
        ],
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

export interface BannerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, icon, dismissible, onDismiss, children, ...props }, ref) => (
    <div
      ref={ref}
      role="banner"
      className={cn(bannerVariants({ variant, className }))}
      {...props}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {children}
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/5 transition-colors"
            aria-label="關閉"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
);

Banner.displayName = 'Banner';

// Banner Link
const BannerLink = forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLAnchorElement> & { href: string }
>(({ className, href, children, ...props }, ref) => (
  <a
    ref={ref}
    href={href}
    className={cn(
      'font-medium underline underline-offset-2 hover:no-underline',
      className
    )}
    {...props}
  >
    {children}
  </a>
));

BannerLink.displayName = 'BannerLink';

export { Banner, BannerLink, bannerVariants };
