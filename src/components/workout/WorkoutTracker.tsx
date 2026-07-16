import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, SkipForward, Timer, Dumbbell } from 'lucide-react';
import { Card, GlassCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import type { Routine } from '@/lib/mock-data';
import { getRoutineExercises } from '@/lib/mock-data';

interface WorkoutTrackerProps {
  routine: Routine;
  onComplete: () => void;
  onClose: () => void;
}

interface SetEntry {
  exerciseId: string;
  exerciseName: string;
  sets: { weight: number; reps: number; completed: boolean }[];
  currentSet: number;
}

export function WorkoutTracker({ routine, onComplete, onClose }: WorkoutTrackerProps) {
  const exercises = getRoutineExercises(routine.id);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [entries, setEntries] = useState<SetEntry[]>(() =>
    exercises.map((re) => ({
      exerciseId: re.exercise.id,
      exerciseName: re.exercise.name,
      sets: Array.from({ length: re.sets }, () => ({ weight: 0, reps: re.reps, completed: false })),
      currentSet: 0,
    }))
  );
  const [isResting, setIsResting] = useState(false);
  const [restSeconds, setRestSeconds] = useState(0);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer
  useEffect(() => {
    if (isWorkoutComplete) return;
    const interval = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isWorkoutComplete]);

  // Rest timer
  useEffect(() => {
    if (!isResting) return;
    const interval = setInterval(() => {
      setRestSeconds((s) => {
        if (s >= 120) {
          setIsResting(false);
          return 0;
        }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isResting]);

  const currentEntry = entries[currentExerciseIndex];
  const currentExercise = exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex >= exercises.length - 1;

  const completeSet = useCallback(() => {
    if (!currentEntry) return;

    const newEntries = [...entries];
    const entry = { ...newEntries[currentExerciseIndex] } as SetEntry;
    const sets = [...entry.sets];
    const currentSetData = sets[entry.currentSet];
    if (currentSetData) {
      sets[entry.currentSet] = { ...currentSetData, completed: true };
    }
    entry.sets = sets;
    entry.currentSet++;
    newEntries[currentExerciseIndex] = entry;
    setEntries(newEntries);

    if (entry.currentSet >= entry.sets.length) {
      if (isLastExercise) {
        setIsWorkoutComplete(true);
      } else {
        setIsResting(true);
        setRestSeconds(0);
      }
    } else {
      setIsResting(true);
      setRestSeconds(0);
    }
  }, [currentEntry, currentExerciseIndex, entries, isLastExercise]);

  const nextExercise = useCallback(() => {
    setIsResting(false);
    setRestSeconds(0);
    if (!isLastExercise) {
      setCurrentExerciseIndex((i) => i + 1);
    }
  }, [isLastExercise]);

  const updateSet = useCallback(
    (setIndex: number, field: 'weight' | 'reps', value: number) => {
      const newEntries = [...entries];
      const entry = { ...newEntries[currentExerciseIndex] } as SetEntry;
      const sets = [...entry.sets];
      if (sets[setIndex]) {
        sets[setIndex] = { ...sets[setIndex], [field]: value };
      }
      entry.sets = sets;
      newEntries[currentExerciseIndex] = entry;
      setEntries(newEntries);
    },
    [currentExerciseIndex, entries]
  );

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  // Workout complete view
  if (isWorkoutComplete) {
    const completedSets = entries.reduce((sum, e) => sum + e.sets.filter((s) => s.completed).length, 0);
    return (
      <GlassCard className="p-8 text-center space-y-6 max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto rounded-full bg-brand-500/20 flex items-center justify-center">
          <Check className="w-8 h-8 text-brand-500" />
        </div>
        <div>
          <h3 className="text-h3 font-heading">Workout Complete!</h3>
          <p className="text-body-md text-[rgb(var(--text-secondary))] mt-2">
            Great job completing {routine.name}
          </p>
        </div>
        <div className="flex justify-center gap-6">
          <div className="text-center">
            <p className="text-data-md font-heading">{completedSets}</p>
            <p className="text-caption text-[rgb(var(--text-tertiary))]">Sets Done</p>
          </div>
          <div className="text-center">
            <p className="text-data-md font-heading">{formatTime(elapsedSeconds)}</p>
            <p className="text-caption text-[rgb(var(--text-tertiary))]">Duration</p>
          </div>
        </div>
        <Button variant="gradient-glow" size="lg" className="w-full" onClick={onComplete}>
          Back to Dashboard
        </Button>
      </GlassCard>
    );
  }

  if (!currentExercise || !currentEntry) {
    return (
      <Card padding="lg" className="text-center py-8">
        <p className="text-body-md text-[rgb(var(--text-secondary))]">No exercises in this routine</p>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-h4 font-heading">{routine.name}</h2>
          <p className="text-body-sm text-[rgb(var(--text-secondary))]">
            Exercise {currentExerciseIndex + 1} of {exercises.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" size="sm" className="font-mono">
            <Timer size={12} className="mr-1" />
            {formatTime(elapsedSeconds)}
          </Badge>
          <Button variant="ghost" size="sm" onClick={onClose}>Exit</Button>
        </div>
      </div>

      {/* Current Exercise */}
      <Card padding="lg" className="relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 bg-brand-500 transition-all"
          style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
        />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-h4 font-heading">{currentExercise.exercise.name}</h3>
              <p className="text-body-sm text-[rgb(var(--text-secondary))]">
                Set {currentEntry.currentSet + 1} of {currentEntry.sets.length}
                {' · '}Target: {currentExercise.reps} reps
              </p>
            </div>
          </div>

          {/* Weight & Reps Input */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Weight (kg)"
              type="number"
              placeholder="0"
              value={currentEntry.sets[currentEntry.currentSet]?.weight ?? ''}
              onChange={(e) => updateSet(currentEntry.currentSet, 'weight', Number(e.target.value))}
            />
            <Input
              label="Reps"
              type="number"
              placeholder={String(currentExercise.reps)}
              value={currentEntry.sets[currentEntry.currentSet]?.reps ?? ''}
              onChange={(e) => updateSet(currentEntry.currentSet, 'reps', Number(e.target.value))}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="gradient-glow" size="lg" className="flex-1" onClick={completeSet}>
              <Check size={18} className="mr-1" /> Complete Set
            </Button>
            {currentEntry.currentSet >= currentEntry.sets.length - 1 && !isLastExercise && (
              <Button variant="secondary" size="lg" onClick={nextExercise}>
                <SkipForward size={18} />
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Rest Timer */}
      <AnimatePresence>
        {isResting && (
          <motion.div
            className="glass rounded-sm p-4 text-center space-y-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-body-sm text-[rgb(var(--text-secondary))]">Rest Timer</p>
            <p className="text-display-sm font-heading font-bold text-brand-500">{formatTime(restSeconds)}</p>
            <Button variant="ghost" size="sm" onClick={nextExercise}>
              Skip Rest
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exercise Progress */}
      <div className="space-y-1.5">
        {entries.map((entry, i) => (
          <div key={entry.exerciseId} className="flex items-center gap-2">
            <div className={cn(
              'w-1.5 h-1.5 rounded-full',
              i === currentExerciseIndex ? 'bg-brand-500' : entry.sets.every(s => s.completed) ? 'bg-green-500' : 'bg-[rgb(var(--text-tertiary))]'
            )} />
            <span className={cn(
              'text-body-sm flex-1',
              i === currentExerciseIndex && 'font-medium text-[rgb(var(--text-primary))]',
              entry.sets.every(s => s.completed) && 'text-green-500',
            )}>
              {entry.exerciseName}
            </span>
            <span className="text-caption text-[rgb(var(--text-tertiary))]">
              {entry.sets.filter(s => s.completed).length}/{entry.sets.length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
