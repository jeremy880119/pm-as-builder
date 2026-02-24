import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合併 Tailwind CSS class names
 * 使用 clsx 處理條件邏輯，twMerge 處理衝突
 *
 * @example
 * cn('px-2 py-1', condition && 'bg-red-500', 'text-white')
 * cn('p-4', className) // 允許外部 className 覆蓋
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
