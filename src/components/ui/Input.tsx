import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, wrapperClassName, id, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={cn('space-y-1.5', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-[rgb(var(--text-primary))]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-3 py-2.5 text-body-md rounded-sm border bg-transparent transition-all duration-[var(--duration-fast)]',
            'border-[rgb(var(--surface-border))] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-tertiary))]',
            'hover:border-[rgb(var(--text-tertiary))]',
            'focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 focus:outline-none',
            error &&
              'border-red-500 focus:border-red-500 focus:ring-red-500/30 animate-[shake_0.3s_ease-in-out]',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-body-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-body-sm text-[rgb(var(--text-tertiary))]">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
