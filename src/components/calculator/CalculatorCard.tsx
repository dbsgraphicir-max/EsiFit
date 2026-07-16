import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Flame,
  Activity,
  Dumbbell,
  Target,
  Apple,
  Heart,
  TrendingDown,
  Droplets,
  Moon,
  Clock,
  BarChart3,
  Timer,
  UtensilsCrossed,
  Beef,
  TrendingUp,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { CalculatorConfig } from '@/lib/calculators';
import { saveCalculatorResult } from '@/lib/calculators';
import { useAuth } from '@/context/AuthContext';

const iconMap: Record<string, React.ElementType> = {
  Flame, Activity, Dumbbell, Target, Apple, Heart,
  TrendingDown, Droplets, Moon, Clock, BarChart3,
  Timer, UtensilsCrossed, Beef, TrendingUp, Calculator,
};

interface CalculatorCardProps {
  calc: CalculatorConfig;
}

export function CalculatorCard({ calc }: CalculatorCardProps) {
  const { user } = useAuth();
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    calc.inputs.forEach((input) => {
      if (input.defaultValue !== undefined) initial[input.key] = input.defaultValue;
    });
    return initial;
  });
  const [result, setResult] = useState<ReturnType<typeof calc.calculate> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const Icon = iconMap[calc.icon] || Calculator;

  const handleCalculate = useCallback(() => {
    setError(null);
    const missing = calc.inputs.filter((input) => {
      if (input.type === 'select' && input.defaultValue !== undefined) return false;
      if (input.key in inputs) return false;
      return true;
    });
    if (missing.length > 0 && Object.keys(inputs).length === 0) {
      setError('Please fill in the required fields');
      return;
    }

    setIsCalculating(true);
    setShowResult(false);

    // Simulate calculation delay
    setTimeout(() => {
      try {
        const calculated = calc.calculate(inputs);
        setResult(calculated);
        setShowResult(true);
        saveCalculatorResult(user?.id, calc.id, inputs, calculated.primary.value);
      } catch {
        setError('Calculation error. Please check your inputs.');
      }
      setIsCalculating(false);
    }, 400);
  }, [calc, inputs, user?.id]);

  const gaugePercentage = result
    ? Math.min(100, Math.round((result.primary.value / (result.gaugeMax || result.primary.value * 1.5)) * 100))
    : 0;

  return (
    <Card variant="default" padding="lg" className="h-full">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-h4 font-heading">{calc.name}</h3>
            <p className="text-body-sm text-[rgb(var(--text-secondary))] mt-0.5">{calc.description}</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          {calc.inputs.map((input) => (
            <div key={input.key}>
              {input.type === 'select' ? (
                <div className="space-y-1.5">
                  <label className="block text-body-sm font-medium text-[rgb(var(--text-primary))]">
                    {input.label}
                  </label>
                  <select
                    value={inputs[input.key] ?? input.defaultValue ?? ''}
                    onChange={(e) => setInputs((prev) => ({ ...prev, [input.key]: Number(e.target.value) }))}
                    className="w-full px-3 py-2.5 text-body-md rounded-sm border border-[rgb(var(--surface-border))] bg-transparent text-[rgb(var(--text-primary))] hover:border-[rgb(var(--text-tertiary))] focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 focus:outline-none"
                  >
                    {input.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : input.type === 'range' ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-body-sm font-medium text-[rgb(var(--text-primary))]">
                      {input.label}
                    </label>
                    <span className="text-body-sm text-brand-500 font-mono">
                      {inputs[input.key] ?? input.defaultValue ?? input.min ?? 0}
                      {input.unit ? ` ${input.unit}` : ''}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={input.min}
                    max={input.max}
                    step={input.step || 1}
                    value={inputs[input.key] ?? input.defaultValue ?? input.min ?? 0}
                    onChange={(e) => setInputs((prev) => ({ ...prev, [input.key]: Number(e.target.value) }))}
                    className="w-full h-2 rounded-full appearance-none bg-[rgb(var(--surface-border))] accent-brand-500 cursor-pointer"
                  />
                </div>
              ) : (
                <Input
                  label={input.label}
                  type="number"
                  placeholder={input.placeholder}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={inputs[input.key] ?? ''}
                  onChange={(e) => setInputs((prev) => ({ ...prev, [input.key]: Number(e.target.value) }))}
                  hint={input.unit}
                />
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-body-sm text-red-500">{error}</p>
        )}

        <Button
          variant="gradient-glow"
          size="lg"
          className="w-full"
          loading={isCalculating}
          onClick={handleCalculate}
        >
          Calculate
        </Button>

        {/* Result - immediately visible after calculation */}
        <AnimatePresence>
          {showResult && result && (
            <motion.div
              className="space-y-4 pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Primary Gauge */}
              <div className="glass rounded-sm p-4 text-center">
                <div className="relative w-32 h-32 mx-auto mb-3">
                  <svg className="transform -rotate-90 w-32 h-32" viewBox="0 0 120 120">
                    <circle cx={60} cy={60} r={52} fill="none" stroke="rgb(var(--surface-border))" strokeWidth={8} />
                    <motion.circle
                      cx={60} cy={60} r={52}
                      fill="none"
                      stroke="url(#gauge-gradient)"
                      strokeWidth={8}
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 52}
                      initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - gaugePercentage / 100) }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      className="text-data-lg font-heading font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    >
                      {result.primary.value}
                    </motion.span>
                    <span className="text-caption text-[rgb(var(--text-tertiary))]">
                      {result.primary.unit || ''}
                    </span>
                  </div>
                </div>
                <p className="text-body-md font-medium">{result.primary.label}</p>
              </div>

              {/* Secondary Metrics */}
              {result.secondary && (
                <div className="grid grid-cols-2 gap-2">
                  {result.secondary.map((s, i) => (
                    <motion.div
                      key={s.label}
                      className="glass rounded-sm p-2.5 text-center"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      <p className="text-data-sm font-heading font-bold">{s.value}</p>
                      <p className="text-caption text-[rgb(var(--text-tertiary))]">{s.label}</p>
                      {s.unit && <p className="text-caption text-[rgb(var(--text-tertiary))]">{s.unit}</p>}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Interpretation */}
              {result.interpretation && (
                <p className="text-body-sm text-[rgb(var(--text-secondary))] italic leading-relaxed border-t border-[rgb(var(--surface-border))] pt-3">
                  {result.interpretation}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
