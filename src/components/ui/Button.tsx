import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-raised hover:shadow-raised hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'border border-surface-border dark:border-surface-border bg-transparent text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] active:bg-[rgb(var(--surface-overlay))]',
  ghost:
    'bg-transparent text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] active:bg-[rgb(var(--surface-overlay))]',
  'gradient-glow':
    'relative text-white overflow-hidden before:absolute before:inset-0 before:bg-gradient-cta before:opacity-100 hover:before:opacity-90 active:before:opacity-80 glow-primary hover:glow-primary',
};

const sizes = {
  sm: 'px-3 py-1.5 text-body-sm rounded-sm',
  md: 'px-4 py-2.5 text-body-md rounded-sm',
  lg: 'px-6 py-3 text-body-lg rounded-sm',
  xl: 'px-8 py-4 text-body-lg rounded-sm',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      icon,
      iconPosition = 'left',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-snappy)] focus-ring disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          loading && 'cursor-wait',
          className,
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : icon && iconPosition === 'left' ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
