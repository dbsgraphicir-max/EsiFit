import { motion } from 'framer-motion';
import { Dumbbell, Target, Activity } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Exercise } from '@/lib/mock-data';

interface ExerciseCardProps {
  exercise: Exercise;
  index?: number;
}

const difficultyColor = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
} as const;

export function ExerciseCard({ exercise, index = 0 }: ExerciseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Card variant="interactive" padding="md" className="group">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center flex-shrink-0">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-body-md font-semibold group-hover:text-brand-500 transition-colors">
              {exercise.name}
            </h4>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Badge variant={difficultyColor[exercise.difficulty] as 'success' | 'warning' | 'info'} size="sm">
                {exercise.difficulty}
              </Badge>
              <span className="text-caption text-[rgb(var(--text-tertiary))] flex items-center gap-1">
                <Target size={11} />
                {exercise.equipment}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
              <Activity size={11} className="text-[rgb(var(--text-tertiary))]" />
              {exercise.muscleGroups.map((mg) => (
                <span key={mg} className="text-caption text-[rgb(var(--text-secondary))]">
                  {mg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
