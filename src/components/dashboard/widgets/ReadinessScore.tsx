import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Activity, Brain, Heart, Zap } from 'lucide-react';

interface ReadinessData {
  score: number;
  recovery: number;
  sleep: number;
  hrv: number;
  energy: number;
  trend: 'up' | 'down' | 'stable';
  message: string;
}

const mockReadiness: ReadinessData = {
  score: 87,
  recovery: 82,
  sleep: 79,
  hrv: 91,
  energy: 85,
  trend: 'up',
  message: 'Your body is primed for a great workout. Consider upper body or compound lifts today.',
};

function getScoreColor(score: number): string {
  if (score >= 80) return 'from-brand-400 to-emerald-500';
  if (score >= 60) return 'from-yellow-400 to-amber-500';
  return 'from-red-400 to-rose-500';
}

function getScoreGlow(score: number): string {
  if (score >= 80) return 'rgba(74,222,128,';
  if (score >= 60) return 'rgba(251,191,36,';
  return 'rgba(251,113,133,';
}

export function ReadinessScore() {
  const [displayedScore, setDisplayedScore] = useState(0);
  const score = mockReadiness.score;
  const circumference = 2 * Math.PI * 90;
  const progress = displayedScore / 100;

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1000;

    function animate(time: number) {
      const elapsed = time - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayedScore(eased * score);
      if (p < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [score]);

  const scoreColor = getScoreColor(score);
  const glowColor = getScoreGlow(score);

  const metrics = [
    { label: 'Recovery', value: mockReadiness.recovery, icon: Heart, color: 'text-rose-500' },
    { label: 'Sleep', value: mockReadiness.sleep, icon: Moon, color: 'text-purple-500' },
    { label: 'HRV', value: mockReadiness.hrv, icon: Brain, color: 'text-accent-500' },
    { label: 'Energy', value: mockReadiness.energy, icon: Zap, color: 'text-amber-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <Card padding="lg" className="h-full relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{
            background: `${glowColor}0.1)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h4 font-heading">Daily Readiness</h2>
            <span className="inline-flex items-center gap-1 text-caption text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-full">
              <Activity size={12} />
              {mockReadiness.trend === 'up' ? 'Trending up' : 'Trending down'}
            </span>
          </div>

          <div className="flex flex-col desktop:flex-row items-center gap-6">
            {/* Ring */}
            <div className="relative flex-shrink-0">
              <svg width={220} height={220} className="transform -rotate-90">
                {/* Background ring */}
                <circle
                  cx={110}
                  cy={110}
                  r={90}
                  fill="none"
                  stroke="rgb(var(--surface-border))"
                  strokeWidth={8}
                />
                {/* Progress ring */}
                <motion.circle
                  cx={110}
                  cy={110}
                  r={90}
                  fill="none"
                  stroke="url(#readiness-gradient)"
                  strokeWidth={8}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  initial={false}
                  animate={{ strokeDashoffset: circumference * (1 - progress) }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                />
                {/* Glow ring */}
                <circle
                  cx={110}
                  cy={110}
                  r={90}
                  fill="none"
                  stroke={`${glowColor}0.3)`}
                  strokeWidth={12}
                  className="animate-pulse-glow"
                  style={{ filter: 'blur(4px)' }}
                />
                <defs>
                  <linearGradient id="readiness-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={score >= 80 ? '#4ade80' : score >= 60 ? '#fbbf24' : '#fb7185'} />
                    <stop offset="100%" stopColor={score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#f43f5e'} />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="text-display-md font-heading font-bold"
                  style={{ color: `rgb(var(--text-primary))` }}
                >
                  {Math.round(displayedScore)}
                </motion.span>
                <span className="text-body-sm text-[rgb(var(--text-secondary))]">out of 100</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex-1 grid grid-cols-2 gap-3 w-full">
              {metrics.map((metric) => (
                <div key={metric.label} className="glass rounded-sm p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-caption text-[rgb(var(--text-tertiary))]">{metric.label}</span>
                    <metric.icon size={14} className={metric.color} />
                  </div>
                  <p className="text-data-md font-heading">{metric.value}</p>
                  {/* Mini bar */}
                  <div className="h-1 rounded-full bg-[rgb(var(--surface-border))] overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${scoreColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-body-sm text-[rgb(var(--text-secondary))] mt-4 leading-relaxed">
            {mockReadiness.message}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}

// Moon icon used in metrics
function Moon({ size, className }: { size?: number; className?: string }) {
  return (
    <svg width={size || 14} height={size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
