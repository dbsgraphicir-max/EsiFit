import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { weightLogs, sleepLogs, waterLogs } from '@/lib/mock-data';

interface LineChartProps {
  data: { value: number; date: string }[];
  color?: string;
  height?: number;
  label?: string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
}

function Sparkline({ data, color = '#22c55e', height = 100, label, unit, trend }: LineChartProps) {
  const { path, areaPath } = useMemo(() => {
    const values = data.map((d) => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const width = 300;
    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - ((d.value - min) / range) * (height - 20) - 10,
    }));
    const p = points.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' ');
    const area = `${p} L${points[points.length - 1]?.x},${height} L${points[0]?.x},${height} Z`;
    return { path: p, areaPath: area, maxVal: max, minVal: min };
  }, [data, height]);

  const latestValue = data[data.length - 1]?.value;
  const firstValue = data[0]?.value;
  const change = latestValue && firstValue ? latestValue - firstValue : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          {label && <p className="text-body-sm font-medium">{label}</p>}
          <div className="flex items-center gap-2">
            <span className="text-data-md font-heading font-bold">
              {latestValue?.toFixed(1)}{unit}
            </span>
            {trend === 'up' && <TrendingUp size={16} className="text-brand-500" />}
            {trend === 'down' && <TrendingDown size={16} className="text-fitness-ember" />}
            {trend === 'stable' && <Minus size={16} className="text-[rgb(var(--text-tertiary))]" />}
          </div>
        </div>
        <span className={cn(
          'text-body-sm',
          change > 0 ? 'text-brand-500' : change < 0 ? 'text-fitness-ember' : 'text-[rgb(var(--text-tertiary))]'
        )}>
          {change > 0 ? '+' : ''}{change.toFixed(1)}{unit}
        </span>
      </div>
      <svg viewBox={`0 0 300 ${height}`} className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${label || 'chart'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath}
          fill={`url(#gradient-${label || 'chart'})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}

export function ProgressCharts() {
  const weightData = weightLogs.map((w) => ({ value: w.weightKg, date: w.loggedAt }));
  const sleepData = sleepLogs.map((s) => ({ value: s.hours, date: s.loggedAt }));
  const waterTotal = waterLogs.reduce((s, w) => s + w.ml, 0);

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
      <Card padding="lg">
        <Sparkline
          data={weightData}
          color="#22c55e"
          label="Body Weight"
          unit=" kg"
          trend="down"
        />
      </Card>
      <Card padding="lg">
        <Sparkline
          data={sleepData}
          color="#a78bfa"
          label="Sleep Duration"
          unit=" hrs"
          trend="up"
        />
      </Card>
      <Card padding="lg" className="tablet:col-span-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-body-sm font-medium">Water Intake Today</p>
            <span className="text-data-md font-heading font-bold">{waterTotal}ml</span>
          </div>
          <div className="h-4 rounded-full bg-[rgb(var(--surface-border))] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent-400 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (waterTotal / 2500) * 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-caption text-[rgb(var(--text-tertiary))]">
            <span>0ml</span>
            <span>Goal: 2500ml</span>
          </div>
          <div className="flex gap-2 mt-2">
            {waterLogs.map((log) => (
              <div key={log.id} className="flex-1 h-20 rounded-sm bg-[rgb(var(--surface-raised))] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-data-sm font-heading font-bold text-accent-500">{log.ml}</p>
                  <p className="text-caption text-[rgb(var(--text-tertiary))]">ml</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
