import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Dumbbell, Apple, Droplets, Moon, ArrowRight, CheckCircle2, Circle } from 'lucide-react';

const todayItems = [
  {
    id: 'workout',
    label: 'Upper Body Push',
    type: 'workout',
    icon: Dumbbell,
    completed: false,
    time: 'Scheduled for 6:00 PM',
    color: 'text-brand-500',
  },
  {
    id: 'meals',
    label: 'Log remaining meals',
    type: 'nutrition',
    icon: Apple,
    completed: false,
    time: '2 meals logged, 1 remaining',
    color: 'text-accent-500',
  },
  {
    id: 'water',
    label: '2.5L water target',
    type: 'hydration',
    icon: Droplets,
    completed: false,
    time: '1.2L logged',
    color: 'text-blue-500',
  },
  {
    id: 'sleep',
    label: 'Sleep goal: 8 hours',
    type: 'recovery',
    icon: Moon,
    completed: true,
    time: '7h 42m last night',
    color: 'text-purple-500',
  },
];

export function TodayWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card padding="lg" className="h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-h4 font-heading">Today</h2>
          <Badge variant="info" size="sm">
            {todayItems.filter((i) => i.completed).length}/{todayItems.length} done
          </Badge>
        </div>

        <div className="space-y-3">
          {todayItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-sm hover:bg-[rgb(var(--surface-raised))] transition-colors group cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <button
                className="flex-shrink-0 focus-ring rounded-full"
                aria-label={item.completed ? `Mark ${item.label} as incomplete` : `Mark ${item.label} as complete`}
              >
                {item.completed ? (
                  <CheckCircle2 size={22} className="text-brand-500" />
                ) : (
                  <Circle size={22} className="text-[rgb(var(--text-tertiary))] group-hover:text-[rgb(var(--text-secondary))] transition-colors" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-body-sm font-medium ${item.completed ? 'line-through text-[rgb(var(--text-tertiary))]' : ''}`}>
                  {item.label}
                </p>
                <p className="text-caption text-[rgb(var(--text-tertiary))]">{item.time}</p>
              </div>
              <div className={`${item.color} flex-shrink-0`}>
                <item.icon size={18} />
              </div>
            </motion.div>
          ))}
        </div>

        <Button variant="ghost" size="sm" icon={<ArrowRight size={14} />} iconPosition="right" className="mt-3 w-full">
          View full schedule
        </Button>
      </Card>
    </motion.div>
  );
}
