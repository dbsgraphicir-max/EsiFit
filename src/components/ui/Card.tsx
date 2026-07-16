import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'glass' | 'glass-elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddings = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({
  className,
  variant = 'default',
  padding = 'md',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md transition-all duration-[var(--duration-normal)] ease-[var(--ease-smooth)]',
        variant === 'default' && 'bg-[rgb(var(--surface-raised))] border border-[rgb(var(--surface-border))]',
        variant === 'interactive' &&
          'bg-[rgb(var(--surface-raised))] border border-[rgb(var(--surface-border))] hover:shadow-raised hover:border-[rgb(var(--brand-primary))/30] cursor-pointer',
        variant === 'glass' && 'glass',
        variant === 'glass-elevated' && 'glass-elevated',
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCard({
  className,
  children,
  ...props
}: { className?: string; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('glass rounded-md', className)} {...props}>
      {children}
    </div>
  );
}
