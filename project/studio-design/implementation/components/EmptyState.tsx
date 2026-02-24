import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './Button';

/**
 * EmptyState 組件 - 統一的空狀態展示
 *
 * @example
 * <EmptyState
 *   icon={<MicrophoneIcon className="w-16 h-16" />}
 *   title="還沒有任何單集"
 *   description="上傳你的第一集，開始你的 Podcast 旅程"
 *   action={{
 *     label: "上傳單集",
 *     onClick: () => {},
 *   }}
 * />
 */

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: ButtonProps['variant'];
}

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
}

const EmptyState = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        'py-12 px-6',
        'text-center',
        className
      )}
      {...props}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 text-gray-300">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-500 max-w-sm mb-6">
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3">
          {action && (
            <Button
              variant={action.variant || 'primary'}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant={secondaryAction.variant || 'ghost'}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';

export { EmptyState };
