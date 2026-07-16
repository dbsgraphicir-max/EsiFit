import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-3xl space-y-3',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {label && (
        <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-500">
          {label}
        </span>
      )}
      <h2 className="text-h3 tablet:text-h2 font-heading">{title}</h2>
      {description && (
        <p className="text-body-lg text-[rgb(var(--text-secondary))] leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
