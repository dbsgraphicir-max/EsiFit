import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Dumbbell, Apple, Clock, TrendingUp, ArrowRight } from 'lucide-react';

const historyItems = [
  {
    id: '1',
    type: 'workout',
    label: 'Upper Body Push',
    detail: '8 sets · 45 min',
    time: '2 hours ago',
    icon: Dumbbell,
    color: 'text-brand-500',
  },
  {
    id: '2',
    type: 'nutrition',
    label: 'Lunch logged',
    detail: '45g protein · 520 cal',
    time: '4 hours ago',
    icon: Apple,
    color: 'text-accent-500',
  },
  {
    id: '3',
    type: 'workout',
    label: 'Lower Body Pull',
    detail: '6 sets · 35 min',
    time: 'Yesterday',
    icon: Dumbbell,
    color: 'text-brand-500',
  },
  {
    id: '4',
    type: 'progress',
    label: 'Weight updated',
    detail: '72.5 kg — 0.3 kg ↓',
    time: 'Yesterday',
    icon: TrendingUp,
    color: 'text-emerald-500',
  },
  {
    id: '5',
    type: 'nutrition',
    label: 'Breakfast logged',
    detail: '32g protein · 380 cal',
    time: 'Yesterday',
    icon: Apple,
    color: 'text-accent-500',
  },
];

export function HistoryWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <Card padding="lg" className="h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-h4 font-heading">Recent Activity</h2>
          <Badge variant="default" size="sm">
            <Clock size={12} className="mr-1" />
            Last 24h
          </Badge>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[17px] top-2 bottom-2 w-px bg-[rgb(var(--surface-border))]" />

          <div className="space-y-0">
            {historyItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex items-start gap-4 py-3 group cursor-pointer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                {/* Timeline dot */}
                <div className={`relative z-10 w-9 h-9 rounded-full bg-[rgb(var(--surface-raised))] border border-[rgb(var(--surface-border))] flex items-center justify-center flex-shrink-0 group-hover:border-brand-500/30 transition-colors`}>
                  <item.icon size={15} className={item.color} />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-body-sm font-medium">{item.label}</p>
                  <p className="text-caption text-[rgb(var(--text-tertiary))]">{item.detail}</p>
                </div>
                <span className="text-caption text-[rgb(var(--text-tertiary))] flex-shrink-0 pt-1">
                  {item.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <Button variant="ghost" size="sm" icon={<ArrowRight size={14} />} iconPosition="right" className="mt-3 w-full">
          View all activity
        </Button>
      </Card>
    </motion.div>
  );
}
