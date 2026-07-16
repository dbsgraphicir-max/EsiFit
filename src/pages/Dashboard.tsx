import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Apple, Calculator, TrendingUp, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { CommandPalette, useCommandPalette } from '@/components/ui/CommandPalette';
import { DashboardSkeleton } from '@/components/ui/Skeleton';
import { GreetingWidget } from '@/components/dashboard/widgets/GreetingWidget';
import { TodayWidget } from '@/components/dashboard/widgets/TodayWidget';
import { ReadinessScore } from '@/components/dashboard/widgets/ReadinessScore';
import { ActionWidget } from '@/components/dashboard/widgets/ActionWidget';
import { HistoryWidget } from '@/components/dashboard/widgets/HistoryWidget';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { calculators } from '@/lib/calculators';
import { ExerciseCard } from '@/components/workout/ExerciseCard';
import { WorkoutTracker } from '@/components/workout/WorkoutTracker';
import { NutritionTracker } from '@/components/nutrition/NutritionTracker';
import { ProgressCharts } from '@/components/analytics/ProgressCharts';
import { MuscleHeatmap } from '@/components/analytics/MuscleHeatmap';
import { WaterTracker, WeightTracker } from '@/components/trackers/OfflineTrackers';
import { exercises, routines, workoutLogs, type Routine } from '@/lib/mock-data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

type Tab = 'dashboard' | 'workouts' | 'nutrition' | 'calculators' | 'analytics';

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') || 'dashboard') as Tab;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });
  const { isOpen, open, close } = useCommandPalette();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [activeRoutine, setActiveRoutine] = useState<Routine | null>(null);
  const [showCalculator, setShowCalculator] = useState<string | null>(null);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Simulate dashboard loading
  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Responsive sidebar
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Reset calc view when tab changes
  useEffect(() => {
    setShowCalculator(null);
    setActiveRoutine(null);
  }, [activeTab]);

  // Active workout session view
  if (activeRoutine) {
    return (
      <div className="min-h-screen bg-[rgb(var(--surface-base))] p-4 tablet:p-6">
        <WorkoutTracker
          routine={activeRoutine}
          onComplete={() => setActiveRoutine(null)}
          onClose={() => setActiveRoutine(null)}
        />
      </div>
    );
  }

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-gradient-cta flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-body-sm text-[rgb(var(--text-secondary))]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[rgb(var(--surface-base))]">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onCommandPaletteOpen={open}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onCommandPaletteOpen={open} />

        <div className="flex-1 overflow-y-auto">
          {!pageLoaded ? (
            <DashboardSkeleton />
          ) : (
            <motion.div
              className="p-4 tablet:p-6 desktop:p-8 space-y-6 max-w-[1440px] mx-auto w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* ════════════════════════════════════
                  DASHBOARD HOME TAB
                  ════════════════════════════════════ */}
              {activeTab === 'dashboard' && (
                <>
                  <GreetingWidget />
                  <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
                    <div className="desktop:col-span-2"><TodayWidget /></div>
                    <div><ReadinessScore /></div>
                  </div>
                  <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
                    <ActionWidget />
                    <HistoryWidget />
                  </div>
                </>
              )}

              {/* ════════════════════════════════════
                  WORKOUTS TAB
                  ════════════════════════════════════ */}
              {activeTab === 'workouts' && (
                <div className="space-y-6">
                  <SectionHeader
                    title="Workouts"
                    description="Start a routine or browse your exercises"
                    align="left"
                  />
                  {/* Routines */}
                  <div>
                    <h3 className="text-h4 font-heading mb-4">Your Routines</h3>
                    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
                      {routines.map((routine, i) => (
                        <motion.div
                          key={routine.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Card variant="interactive" padding="lg" className="h-full">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                                  <Dumbbell className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="text-body-md font-semibold">{routine.name}</h4>
                                  <p className="text-caption text-[rgb(var(--text-tertiary))]">
                                    {routine.exercises.length} exercises
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {routine.exercises.map((re) => {
                                  const ex = exercises.find((e) => e.id === re.exerciseId);
                                  return (
                                    <Badge key={re.id} variant="default" size="sm">
                                      {ex?.name}
                                    </Badge>
                                  );
                                })}
                              </div>
                              <Button
                                variant="gradient-glow"
                                size="sm"
                                className="w-full"
                                onClick={() => setActiveRoutine(routine)}
                              >
                                Start Workout
                              </Button>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  {/* Exercise Library */}
                  <div>
                    <h3 className="text-h4 font-heading mb-4 mt-8">Exercise Library</h3>
                    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-3">
                      {exercises.map((ex, i) => (
                        <ExerciseCard key={ex.id} exercise={ex} index={i} />
                      ))}
                    </div>
                  </div>
                  {/* Recent Workouts */}
                  <div>
                    <h3 className="text-h4 font-heading mb-4">Recent Workouts</h3>
                    <div className="space-y-3">
                      {workoutLogs.map((log) => (
                        <Card key={log.id} variant="default" padding="md">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-body-sm font-medium">{log.routineName}</p>
                              <p className="text-caption text-[rgb(var(--text-tertiary))]">
                                {new Date(log.performedAt).toLocaleDateString()} · {Math.floor(log.durationSeconds / 60)} min
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-body-sm font-mono">{log.sets.length} sets</p>
                              <p className="text-caption text-[rgb(var(--text-tertiary))]">
                                {log.sets.filter((s) => s.isPr).length} PRs
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ════════════════════════════════════
                  NUTRITION TAB
                  ════════════════════════════════════ */}
              {activeTab === 'nutrition' && (
                <div className="space-y-6">
                  <SectionHeader
                    title="Nutrition"
                    description="Track your meals, macros, and hydration"
                    align="left"
                  />
                  <NutritionTracker />
                </div>
              )}

              {/* ════════════════════════════════════
                  CALCULATORS TAB
                  ════════════════════════════════════ */}
              {activeTab === 'calculators' && (
                <div className="space-y-6">
                  <SectionHeader
                    title="Fitness Calculators"
                    description="16 science-based calculators to optimize your training and nutrition"
                    align="left"
                  />

                  {showCalculator ? (
                    <div className="space-y-4">
                      <Button variant="ghost" size="sm" onClick={() => setShowCalculator(null)}>
                        ← Back to all calculators
                      </Button>
                      {(() => {
                        const calc = calculators.find((c) => c.id === showCalculator);
                        return calc ? <CalculatorCard calc={calc} /> : <p>Calculator not found</p>;
                      })()}
                    </div>
                  ) : (
                    <>
                      {/* Category filters */}
                      <div className="flex gap-3 flex-wrap">
                        {[
                          { key: 'all', label: 'All', icon: Calculator },
                          { key: 'body-composition', label: 'Body Comp', icon: LayoutDashboard },
                          { key: 'nutrition', label: 'Nutrition', icon: Apple },
                          { key: 'strength', label: 'Strength', icon: Dumbbell },
                          { key: 'training', label: 'Training', icon: TrendingUp },
                        ].map((cat) => (
                          <Button key={cat.key} variant="secondary" size="sm">
                            {cat.label}
                          </Button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
                        {calculators.map((calc, i) => (
                          <motion.div
                            key={calc.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.02 }}
                          >
                            <Card
                              variant="interactive"
                              padding="md"
                              className="h-full cursor-pointer"
                              onClick={() => setShowCalculator(calc.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center flex-shrink-0">
                                  <Calculator className="w-4 h-4 text-white" />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-body-sm font-semibold">{calc.name}</h4>
                                  <p className="text-caption text-[rgb(var(--text-tertiary))] mt-0.5 line-clamp-2">
                                    {calc.description}
                                  </p>
                                  <Badge variant="default" size="sm" className="mt-1.5">
                                    {calc.category.replace('-', ' ')}
                                  </Badge>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ════════════════════════════════════
                  ANALYTICS TAB
                  ════════════════════════════════════ */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <SectionHeader
                    title="Progress Analytics"
                    description="Track your trends, muscle balance, and health metrics"
                    align="left"
                  />

                  {/* Progress Charts */}
                  <ProgressCharts />

                  {/* Muscle Heatmap */}
                  <MuscleHeatmap />

                  {/* Trackers */}
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                    <WaterTracker />
                    <WeightTracker />
                  </div>
                </div>
              )}

              <div className="h-8" />
            </motion.div>
          )}
        </div>
      </div>

      <CommandPalette isOpen={isOpen} onClose={close} />
    </div>
  );
}
