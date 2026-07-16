import { useState } from 'react';
import { motion } from 'framer-motion';
import { Beef, Wheat, Droplets, Plus, Search } from 'lucide-react';
import { Card, GlassCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { foods, nutritionLogs, type MealEntry, type Food } from '@/lib/mock-data';

interface MacroRingProps {
  label: string;
  current: number;
  target: number;
  color: string;
  unit: string;
  icon: React.ElementType;
}

function MacroRing({ label, current, target, color, unit, icon: Icon }: MacroRingProps) {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  const circumference = 2 * Math.PI * 36;
  const offset = circumference * (1 - percentage / 100);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-20 h-20">
        <svg className="transform -rotate-90" viewBox="0 0 80 80">
          <circle cx={40} cy={40} r={36} fill="none" stroke="rgb(var(--surface-border))" strokeWidth={5} />
          <motion.circle
            cx={40} cy={40} r={36}
            fill="none"
            stroke={color}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon size={14} className={color.includes('var') ? 'text-[rgb(var(--text-secondary))]' : ''} style={{ color: !color.includes('var') ? color : undefined }} />
        </div>
      </div>
      <p className="text-data-sm font-heading font-bold">{current}{unit}</p>
      <p className="text-caption text-[rgb(var(--text-tertiary))]">{label}</p>
      <p className="text-caption text-[rgb(var(--text-tertiary))]">target: {target}{unit}</p>
    </div>
  );
}

export function NutritionTracker() {
  const todayLog = nutritionLogs[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string>('breakfast');
  const [meals, setMeals] = useState(todayLog?.meals || []);
  const [showFoodSearch, setShowFoodSearch] = useState(false);

  const filteredFoods = foods.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totals = meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + meal.proteinG,
      carbs: acc.carbs + meal.carbsG,
      fat: acc.fat + meal.fatG,
      calories: acc.calories + meal.calories,
    }),
    { protein: 0, carbs: 0, fat: 0, calories: 0 }
  );

  // Macro targets (can be personalized)
  const targets = { protein: 140, carbs: 220, fat: 65, calories: 2200 };

  const slots = ['breakfast', 'lunch', 'dinner', 'snack'];

  const addFood = (food: Food) => {
    const newMeal: MealEntry = {
      id: `me_${Date.now()}`,
      nutritionLogId: 'nl_01',
      foodId: food.id,
      foodName: food.name,
      servingSize: 1,
      mealSlot: selectedSlot as MealEntry['mealSlot'],
      proteinG: Math.round(food.proteinG * 1),
      carbsG: Math.round(food.carbsG * 1),
      fatG: Math.round(food.fatG * 1),
      calories: food.calories,
    };
    setMeals([...meals, newMeal]);
    setShowFoodSearch(false);
    setSearchQuery('');
  };

  const removeMeal = (id: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Macro Rings */}
      <GlassCard className="p-5">
        <h3 className="text-h4 font-heading mb-4">Today's Macros</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-data-lg font-heading font-bold">{Math.round(totals.calories)}</p>
            <p className="text-body-sm text-[rgb(var(--text-secondary))]">Calories</p>
            <p className="text-caption text-[rgb(var(--text-tertiary))]">of {targets.calories}</p>
            {/* Mini bar */}
            <div className="mt-1 h-1.5 rounded-full bg-[rgb(var(--surface-border))] overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${Math.min(100, (totals.calories / targets.calories) * 100)}%` }} />
            </div>
          </div>
          <MacroRing label="Protein" current={Math.round(totals.protein)} target={targets.protein} color="#22c55e" unit="g" icon={Beef} />
          <MacroRing label="Carbs" current={Math.round(totals.carbs)} target={targets.carbs} color="#f59e0b" unit="g" icon={Wheat} />
          <MacroRing label="Fat" current={Math.round(totals.fat)} target={targets.fat} color="#3b82f6" unit="g" icon={Droplets} />
        </div>
      </GlassCard>

      {/* Meal Slots */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
        {slots.map((slot) => {
          const slotMeals = meals.filter((m) => m.mealSlot === slot);
          const slotCals = slotMeals.reduce((s, m) => s + m.calories, 0);
          return (
            <Card key={slot} variant="default" padding="md">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-body-md font-semibold capitalize">{slot}</h4>
                <span className="text-body-sm text-[rgb(var(--text-secondary))]">{slotCals} kcal</span>
              </div>

              {slotMeals.length === 0 ? (
                <p className="text-body-sm text-[rgb(var(--text-tertiary))] py-2">No meals logged yet</p>
              ) : (
                <div className="space-y-2 mb-3">
                  {slotMeals.map((meal) => (
                    <div key={meal.id} className="flex items-center justify-between py-1.5 px-2 rounded-sm hover:bg-[rgb(var(--surface-raised))] group">
                      <div>
                        <p className="text-body-sm font-medium">{meal.foodName}</p>
                        <p className="text-caption text-[rgb(var(--text-tertiary))]">
                          P: {meal.proteinG}g · C: {meal.carbsG}g · F: {meal.fatG}g
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-body-sm font-mono">{meal.calories}</span>
                        <button
                          onClick={() => removeMeal(meal.id)}
                          className="text-caption text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                icon={<Plus size={14} />}
                onClick={() => { setSelectedSlot(slot); setShowFoodSearch(true); }}
                className="w-full"
              >
                Add Food
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Food Search Modal */}
      {showFoodSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowFoodSearch(false)} />
          <motion.div
            className="relative w-full max-w-md rounded-lg bg-[rgb(var(--surface-base))] border border-[rgb(var(--surface-border))] shadow-floating p-5 space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-h4 font-heading">Add Food — {selectedSlot}</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-tertiary))]" />
              <input
                type="text"
                placeholder="Search foods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-body-md rounded-sm border border-[rgb(var(--surface-border))] bg-transparent text-[rgb(var(--text-primary))] focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {filteredFoods.map((food) => (
                <button
                  key={food.id}
                  onClick={() => addFood(food)}
                  className="w-full flex items-center justify-between p-3 rounded-sm hover:bg-[rgb(var(--surface-raised))] text-left transition-colors"
                >
                  <div>
                    <p className="text-body-sm font-medium">{food.name}</p>
                    <p className="text-caption text-[rgb(var(--text-tertiary))]">
                      {food.calories} kcal · P: {food.proteinG}g · C: {food.carbsG}g · F: {food.fatG}g
                    </p>
                  </div>
                  <span className="text-caption text-brand-500">+ Add</span>
                </button>
              ))}
              {filteredFoods.length === 0 && (
                <p className="text-body-sm text-[rgb(var(--text-tertiary))] text-center py-4">No foods found</p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
