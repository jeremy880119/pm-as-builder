'use client';

import { createContext, useContext, useState, ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Tabs 組件 - 統一使用下劃線式
 *
 * @example
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">管理總覽</TabsTrigger>
 *     <TabsTrigger value="episodes">單集表現</TabsTrigger>
 *     <TabsTrigger value="audience">受眾輪廓</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">Overview content</TabsContent>
 *   <TabsContent value="episodes">Episodes content</TabsContent>
 *   <TabsContent value="audience">Audience content</TabsContent>
 * </Tabs>
 */

// Context
interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// Tabs Root
interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const value = controlledValue ?? uncontrolledValue;
  const onChange = (newValue: string) => {
    setUncontrolledValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div className={cn('', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsList
interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const TabsList = ({ children, className, ...props }: TabsListProps) => (
  <div
    role="tablist"
    className={cn(
      'flex gap-6 border-b border-gray-200',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// TabsTrigger
interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

const TabsTrigger = ({
  value,
  disabled = false,
  children,
  className,
  ...props
}: TabsTriggerProps) => {
  const { value: selectedValue, onChange } = useTabsContext();
  const isSelected = selectedValue === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isSelected}
      disabled={disabled}
      onClick={() => onChange(value)}
      className={cn(
        'relative py-3 text-sm font-medium transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        isSelected
          ? 'text-primary-500'
          : 'text-gray-500 hover:text-gray-700',
        className
      )}
      {...props}
    >
      {children}
      {/* Underline indicator */}
      <span
        className={cn(
          'absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-200',
          isSelected ? 'bg-primary-500' : 'bg-transparent'
        )}
      />
    </button>
  );
};

// TabsContent
interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

const TabsContent = ({ value, children, className, ...props }: TabsContentProps) => {
  const { value: selectedValue } = useTabsContext();

  if (selectedValue !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn('mt-6 focus:outline-none', className)}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
