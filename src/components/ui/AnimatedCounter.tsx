import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
  formatter?: (value: number) => string;
}

export function AnimatedCounter({
  target,
  duration = 800,
  prefix = '',
  suffix = '',
  className,
  decimals = 0,
  formatter,
}: AnimatedCounterProps) {
  const [current, setCurrent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const startTime = performance.now();

    function animate(time: number) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    }

    requestAnimationFrame(animate);
  }, [hasAnimated, target, duration]);

  const displayValue = formatter
    ? formatter(current)
    : current.toFixed(decimals);

  return (
    <span ref={ref} className={cn('data-font', className)}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
