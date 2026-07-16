import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/Card';
import { Dumbbell, Apple, Calculator, TrendingUp } from 'lucide-react';

const actions = [
  {
    id: 'workout',
    label: 'Start Workout',
    description: 'Upper Body Push is waiting for you',
    icon: Dumbbell,
    color: 'from-brand-400 to-brand-600',
    primary: true,
  },
  {
    id: 'nutrition',
    label: 'Log Meals',
    description: '1 meal remaining today',
    icon: Apple,
    color: 'from-accent-400 to-accent-600',
    primary: false,
  },
  {
    id: 'calculate',
    label: 'Try a Calculator',
    description: 'Check your TDEE or 1RM',
    icon: Calculator,
    color: 'from-fitness-amethyst to-purple-600',
    primary: false,
  },
  {
    id: 'analytics',
    label: 'View Progress',
    description: 'See this week\'s trends',
    icon: TrendingUp,
    color: 'from-fitness-ember to-orange-600',
    primary: false,
  },
];

export function ActionWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <GlassCard className="p-5 h-full">
        <h2 className="text-h4 font-heading mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <motion.button
              key={action.id}
              className="relative group p-4 rounded-sm text-left transition-all hover:scale-[1.02] active:scale-[0.98] focus-ring"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div
                className={`absolute inset-0 rounded-sm bg-gradient-to-br ${action.color} opacity-10 group-hover:opacity-20 transition-opacity`}
              />
              <div className="relative z-10 space-y-2">
                <div
                  className={`w-9 h-9 rounded-sm bg-gradient-to-br ${action.color} flex items-center justify-center`}
                >
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-body-sm font-semibold">{action.label}</p>
                  <p className="text-caption text-[rgb(var(--text-tertiary))]">{action.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
