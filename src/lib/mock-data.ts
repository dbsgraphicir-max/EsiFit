/* ─── Generated Mock Data ───
   Matches DATA_MODEL.md entities exactly.
   Every field name and type mirrors the ER diagram so Phase 6's
   real Prisma schema is a direct translation.                        */

export interface Exercise {
  id: string;
  name: string;
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroups: string[];
}

export interface MuscleGroup {
  id: string;
  name: string;
}

export interface Routine {
  id: string;
  userId: string;
  name: string;
  exercises: RoutineExercise[];
}

export interface RoutineExercise {
  id: string;
  routineId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  order: number;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  routineId: string;
  routineName: string;
  performedAt: string;
  durationSeconds: number;
  sets: SetLog[];
}

export interface SetLog {
  id: string;
  workoutLogId: string;
  exerciseId: string;
  exerciseName: string;
  weight: number;
  reps: number;
  isPr: boolean;
}

export interface Food {
  id: string;
  name: string;
  proteinG: number;
  carbsG: number;
  fatG: number;
  calories: number;
  servingSize: string;
}

export interface NutritionLog {
  id: string;
  userId: string;
  loggedAt: string;
  meals: MealEntry[];
}

export interface MealEntry {
  id: string;
  nutritionLogId: string;
  foodId: string;
  foodName: string;
  servingSize: number;
  mealSlot: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  proteinG: number;
  carbsG: number;
  fatG: number;
  calories: number;
}

export interface WeightLog {
  id: string;
  userId: string;
  weightKg: number;
  loggedAt: string;
}

export interface SleepLog {
  id: string;
  userId: string;
  hours: number;
  loggedAt: string;
}

export interface WaterLog {
  id: string;
  userId: string;
  ml: number;
  loggedAt: string;
}

export interface Goal {
  id: string;
  userId: string;
  type: string;
  targetValue: number;
  currentValue: number;
  targetDate: string;
}

export interface CalculatorResult {
  id: string;
  userId: string;
  calculatorType: string;
  inputs: Record<string, number>;
  result: number;
  createdAt: string;
}

/* ═══════════════════════════════════════
   SEED DATA
   ═══════════════════════════════════════ */

const USER_ID = 'user_01';

export const muscleGroups: MuscleGroup[] = [
  { id: 'mg_01', name: 'Chest' },
  { id: 'mg_02', name: 'Back' },
  { id: 'mg_03', name: 'Shoulders' },
  { id: 'mg_04', name: 'Biceps' },
  { id: 'mg_05', name: 'Triceps' },
  { id: 'mg_06', name: 'Quadriceps' },
  { id: 'mg_07', name: 'Hamstrings' },
  { id: 'mg_08', name: 'Glutes' },
  { id: 'mg_09', name: 'Calves' },
  { id: 'mg_10', name: 'Abs' },
  { id: 'mg_11', name: 'Forearms' },
  { id: 'mg_12', name: 'Traps' },
];

export const exercises: Exercise[] = [
  { id: 'ex_01', name: 'Bench Press', equipment: 'Barbell', difficulty: 'intermediate', muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },
  { id: 'ex_02', name: 'Squat', equipment: 'Barbell', difficulty: 'intermediate', muscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes'] },
  { id: 'ex_03', name: 'Deadlift', equipment: 'Barbell', difficulty: 'advanced', muscleGroups: ['Back', 'Hamstrings', 'Glutes', 'Forearms'] },
  { id: 'ex_04', name: 'Overhead Press', equipment: 'Barbell', difficulty: 'intermediate', muscleGroups: ['Shoulders', 'Triceps'] },
  { id: 'ex_05', name: 'Pull-Up', equipment: 'Bodyweight', difficulty: 'intermediate', muscleGroups: ['Back', 'Biceps', 'Forearms'] },
  { id: 'ex_06', name: 'Barbell Row', equipment: 'Barbell', difficulty: 'intermediate', muscleGroups: ['Back', 'Biceps'] },
  { id: 'ex_07', name: 'Dumbbell Curl', equipment: 'Dumbbell', difficulty: 'beginner', muscleGroups: ['Biceps'] },
  { id: 'ex_08', name: 'Triceps Pushdown', equipment: 'Cable', difficulty: 'beginner', muscleGroups: ['Triceps'] },
  { id: 'ex_09', name: 'Leg Press', equipment: 'Machine', difficulty: 'beginner', muscleGroups: ['Quadriceps', 'Glutes'] },
  { id: 'ex_10', name: 'Lat Pulldown', equipment: 'Cable', difficulty: 'beginner', muscleGroups: ['Back', 'Biceps'] },
  { id: 'ex_11', name: 'Dumbbell Fly', equipment: 'Dumbbell', difficulty: 'beginner', muscleGroups: ['Chest'] },
  { id: 'ex_12', name: 'Plank', equipment: 'Bodyweight', difficulty: 'beginner', muscleGroups: ['Abs'] },
  { id: 'ex_13', name: 'Romanian Deadlift', equipment: 'Dumbbell', difficulty: 'intermediate', muscleGroups: ['Hamstrings', 'Glutes'] },
  { id: 'ex_14', name: 'Lateral Raise', equipment: 'Dumbbell', difficulty: 'beginner', muscleGroups: ['Shoulders'] },
  { id: 'ex_15', name: 'Face Pull', equipment: 'Cable', difficulty: 'intermediate', muscleGroups: ['Shoulders', 'Traps'] },
  { id: 'ex_16', name: 'Leg Curl', equipment: 'Machine', difficulty: 'beginner', muscleGroups: ['Hamstrings'] },
];

export const foods: Food[] = [
  { id: 'fd_01', name: 'Chicken Breast', proteinG: 31, carbsG: 0, fatG: 3.6, calories: 165, servingSize: '100g' },
  { id: 'fd_02', name: 'Brown Rice', proteinG: 2.6, carbsG: 23, fatG: 0.9, calories: 111, servingSize: '100g cooked' },
  { id: 'fd_03', name: 'Broccoli', proteinG: 2.8, carbsG: 7, fatG: 0.4, calories: 34, servingSize: '100g' },
  { id: 'fd_04', name: 'Eggs', proteinG: 13, carbsG: 1.1, fatG: 11, calories: 155, servingSize: '2 large' },
  { id: 'fd_05', name: 'Greek Yogurt', proteinG: 10, carbsG: 3.6, fatG: 0.7, calories: 59, servingSize: '100g' },
  { id: 'fd_06', name: 'Salmon', proteinG: 22, carbsG: 0, fatG: 13, calories: 208, servingSize: '100g' },
  { id: 'fd_07', name: 'Sweet Potato', proteinG: 2, carbsG: 20, fatG: 0.1, calories: 86, servingSize: '100g' },
  { id: 'fd_08', name: 'Oats', proteinG: 13, carbsG: 56, fatG: 6.5, calories: 389, servingSize: '100g' },
  { id: 'fd_09', name: 'Whey Protein', proteinG: 24, carbsG: 3, fatG: 1.5, calories: 120, servingSize: '1 scoop' },
  { id: 'fd_10', name: 'Avocado', proteinG: 2, carbsG: 9, fatG: 15, calories: 160, servingSize: '100g' },
  { id: 'fd_11', name: 'Almonds', proteinG: 21, carbsG: 22, fatG: 50, calories: 579, servingSize: '100g' },
  { id: 'fd_12', name: 'Banana', proteinG: 1.1, carbsG: 23, fatG: 0.3, calories: 89, servingSize: '1 medium' },
];

export const routines: Routine[] = [
  {
    id: 'rt_01',
    userId: USER_ID,
    name: 'Upper Body Push',
    exercises: [
      { id: 're_01', routineId: 'rt_01', exerciseId: 'ex_01', sets: 4, reps: 8, order: 1 },
      { id: 're_02', routineId: 'rt_01', exerciseId: 'ex_04', sets: 3, reps: 10, order: 2 },
      { id: 're_03', routineId: 'rt_01', exerciseId: 'ex_11', sets: 3, reps: 12, order: 3 },
      { id: 're_04', routineId: 'rt_01', exerciseId: 'ex_08', sets: 3, reps: 12, order: 4 },
    ],
  },
  {
    id: 'rt_02',
    userId: USER_ID,
    name: 'Lower Body Pull',
    exercises: [
      { id: 're_05', routineId: 'rt_02', exerciseId: 'ex_02', sets: 4, reps: 8, order: 1 },
      { id: 're_06', routineId: 'rt_02', exerciseId: 'ex_13', sets: 3, reps: 10, order: 2 },
      { id: 're_07', routineId: 'rt_02', exerciseId: 'ex_16', sets: 3, reps: 12, order: 3 },
      { id: 're_08', routineId: 'rt_02', exerciseId: 'ex_09', sets: 3, reps: 10, order: 4 },
    ],
  },
  {
    id: 'rt_03',
    userId: USER_ID,
    name: 'Pull Day',
    exercises: [
      { id: 're_09', routineId: 'rt_03', exerciseId: 'ex_05', sets: 3, reps: 8, order: 1 },
      { id: 're_10', routineId: 'rt_03', exerciseId: 'ex_06', sets: 4, reps: 10, order: 2 },
      { id: 're_11', routineId: 'rt_03', exerciseId: 'ex_07', sets: 3, reps: 12, order: 3 },
      { id: 're_12', routineId: 'rt_03', exerciseId: 'ex_10', sets: 3, reps: 12, order: 4 },
    ],
  },
];

export const workoutLogs: WorkoutLog[] = [
  {
    id: 'wl_01',
    userId: USER_ID,
    routineId: 'rt_01',
    routineName: 'Upper Body Push',
    performedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    durationSeconds: 2700,
    sets: [
      { id: 'sl_01', workoutLogId: 'wl_01', exerciseId: 'ex_01', exerciseName: 'Bench Press', weight: 80, reps: 8, isPr: false },
      { id: 'sl_02', workoutLogId: 'wl_01', exerciseId: 'ex_01', exerciseName: 'Bench Press', weight: 85, reps: 7, isPr: false },
      { id: 'sl_03', workoutLogId: 'wl_01', exerciseId: 'ex_01', exerciseName: 'Bench Press', weight: 85, reps: 6, isPr: true },
      { id: 'sl_04', workoutLogId: 'wl_01', exerciseId: 'ex_04', exerciseName: 'Overhead Press', weight: 50, reps: 10, isPr: false },
    ],
  },
  {
    id: 'wl_02',
    userId: USER_ID,
    routineId: 'rt_02',
    routineName: 'Lower Body',
    performedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    durationSeconds: 3300,
    sets: [
      { id: 'sl_05', workoutLogId: 'wl_02', exerciseId: 'ex_02', exerciseName: 'Squat', weight: 100, reps: 8, isPr: false },
      { id: 'sl_06', workoutLogId: 'wl_02', exerciseId: 'ex_02', exerciseName: 'Squat', weight: 105, reps: 6, isPr: false },
    ],
  },
  {
    id: 'wl_03',
    userId: USER_ID,
    routineId: 'rt_03',
    routineName: 'Pull Day',
    performedAt: new Date(Date.now() - 50 * 60 * 60 * 1000).toISOString(),
    durationSeconds: 2400,
    sets: [
      { id: 'sl_07', workoutLogId: 'wl_03', exerciseId: 'ex_05', exerciseName: 'Pull-Up', weight: 0, reps: 10, isPr: false },
      { id: 'sl_08', workoutLogId: 'wl_03', exerciseId: 'ex_06', exerciseName: 'Barbell Row', weight: 70, reps: 10, isPr: false },
    ],
  },
];

export const nutritionLogs: NutritionLog[] = [
  {
    id: 'nl_01',
    userId: USER_ID,
    loggedAt: new Date().toISOString(),
    meals: [
      { id: 'me_01', nutritionLogId: 'nl_01', foodId: 'fd_08', foodName: 'Oats', servingSize: 80, mealSlot: 'breakfast', proteinG: 10.4, carbsG: 44.8, fatG: 5.2, calories: 311 },
      { id: 'me_02', nutritionLogId: 'nl_01', foodId: 'fd_04', foodName: 'Eggs', servingSize: 2, mealSlot: 'breakfast', proteinG: 26, carbsG: 2.2, fatG: 22, calories: 310 },
      { id: 'me_03', nutritionLogId: 'nl_01', foodId: 'fd_01', foodName: 'Chicken Breast', servingSize: 150, mealSlot: 'lunch', proteinG: 46.5, carbsG: 0, fatG: 5.4, calories: 247 },
      { id: 'me_04', nutritionLogId: 'nl_01', foodId: 'fd_02', foodName: 'Brown Rice', servingSize: 150, mealSlot: 'lunch', proteinG: 3.9, carbsG: 34.5, fatG: 1.4, calories: 166 },
    ],
  },
];

export const weightLogs: WeightLog[] = Array.from({ length: 30 }, (_, i) => ({
  id: `wt_${String(i + 1).padStart(2, '0')}`,
  userId: USER_ID,
  weightKg: 73.5 + Math.sin(i * 0.3) * (i * 0.02) - i * 0.04,
  loggedAt: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString(),
}));

export const sleepLogs: SleepLog[] = Array.from({ length: 7 }, (_, i) => ({
  id: `slp_${i + 1}`,
  userId: USER_ID,
  hours: 6.5 + Math.random() * 2.5,
  loggedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

export const waterLogs: WaterLog[] = [
  { id: 'wa_01', userId: USER_ID, ml: 350, loggedAt: new Date().toISOString() },
  { id: 'wa_02', userId: USER_ID, ml: 500, loggedAt: new Date().toISOString() },
  { id: 'wa_03', userId: USER_ID, ml: 400, loggedAt: new Date().toISOString() },
];

export const goals: Goal[] = [
  { id: 'gl_01', userId: USER_ID, type: 'weight', targetValue: 70, currentValue: 72.5, targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'gl_02', userId: USER_ID, type: 'water', targetValue: 2500, currentValue: 1250, targetDate: new Date().toISOString() },
  { id: 'gl_03', userId: USER_ID, type: 'sleep', targetValue: 8, currentValue: 7.5, targetDate: new Date().toISOString() },
  { id: 'gl_04', userId: USER_ID, type: 'workouts_per_week', targetValue: 4, currentValue: 3, targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
];

/* ─── Helpers ─── */

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((e) => e.id === id);
}

export function getRoutineById(id: string): Routine | undefined {
  return routines.find((r) => r.id === id);
}

export function getRoutineExercises(routineId: string): (RoutineExercise & { exercise: Exercise })[] {
  const routine = routines.find((r) => r.id === routineId);
  if (!routine) return [];
  return routine.exercises
    .sort((a, b) => a.order - b.order)
    .map((re) => ({
      ...re,
      exercise: exercises.find((e) => e.id === re.exerciseId)!,
    }))
    .filter((item) => item.exercise);
}
