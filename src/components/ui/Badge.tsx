import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'free' | 'vip' | 'vip-plus' | 'coach' | 'success' | 'warning' | 'info' | 'default';

const variantStyles: Record<BadgeVariant, string> = {
  free: 'bg-surface-dark/10 text-surface-dark/70 dark:bg-surface-light/10 dark:text-surface-light/70',
  vip: 'bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-300 border-brand-300/30',
  'vip-plus':
    'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 dark:from-amber-900/40 dark:to-yellow-900/40 dark:text-amber-300',
  coach: 'bg-accent-100 text-accent-800 dark:bg-accent-900/40 dark:text-accent-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  warning: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  default: 'bg-[rgb(var(--surface-overlay))] text-[rgb(var(--text-secondary))]',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'sm', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        size === 'sm' ? 'px-2 py-0.5 text-caption' : 'px-3 py-1 text-body-sm',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
