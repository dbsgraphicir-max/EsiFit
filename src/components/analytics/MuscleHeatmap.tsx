import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

interface MuscleVolume {
  name: string;
  volume: number;
  intensity: number; // 0-1
}

const mockVolumes: MuscleVolume[] = [
  { name: 'Chest', volume: 2400, intensity: 0.8 },
  { name: 'Back', volume: 3200, intensity: 0.9 },
  { name: 'Shoulders', volume: 1800, intensity: 0.6 },
  { name: 'Biceps', volume: 1200, intensity: 0.4 },
  { name: 'Triceps', volume: 1600, intensity: 0.5 },
  { name: 'Quadriceps', volume: 3600, intensity: 0.9 },
  { name: 'Hamstrings', volume: 2000, intensity: 0.7 },
  { name: 'Glutes', volume: 2800, intensity: 0.85 },
  { name: 'Calves', volume: 800, intensity: 0.3 },
  { name: 'Abs', volume: 600, intensity: 0.2 },
  { name: 'Forearms', volume: 400, intensity: 0.15 },
  { name: 'Traps', volume: 1000, intensity: 0.35 },
];

function intensityToColor(intensity: number): string {
  if (intensity === 0) return 'rgb(var(--surface-border))';
  const r = Math.round(Math.min(1, intensity * 1.5) * 255);
  const g = Math.round((1 - intensity * 0.7) * 200);
  const b = Math.round((1 - intensity) * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

export function MuscleHeatmap() {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const getColor = (name: string): string => {
    const muscle = mockVolumes.find((m) => m.name === name);
    if (!muscle) return 'rgb(var(--surface-border))';
    const isSelected = selectedMuscle === null || selectedMuscle === name;
    return intensityToColor(isSelected ? muscle.intensity : muscle.intensity * 0.3);
  };

  const selectedVolume = selectedMuscle
    ? mockVolumes.find((m) => m.name === selectedMuscle)
    : null;

  return (
    <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
      <Card padding="lg">
        <h3 className="text-h4 font-heading mb-4">Muscle Volume Heatmap</h3>
        <p className="text-body-sm text-[rgb(var(--text-secondary))] mb-4">
          Hover or click a muscle group to see detail
        </p>

        <div className="relative max-w-[280px] mx-auto">
          <svg viewBox="0 0 200 400" className="w-full">
            <circle cx={100} cy={30} r={22} fill={getColor('Traps')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Traps')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <rect x={85} y={52} width={30} height={15} rx={3} fill={getColor('Traps')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Traps')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <ellipse cx={55} cy={72} rx={18} ry={12} fill={getColor('Shoulders')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Shoulders')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <ellipse cx={145} cy={72} rx={18} ry={12} fill={getColor('Shoulders')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Shoulders')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <rect x={72} y={72} width={56} height={45} rx={6} fill={getColor('Chest')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Chest')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <ellipse cx={45} cy={100} rx={12} ry={22} fill={getColor('Biceps')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Biceps')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <ellipse cx={155} cy={100} rx={12} ry={22} fill={getColor('Biceps')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Biceps')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <ellipse cx={42} cy={142} rx={10} ry={20} fill={getColor('Forearms')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Forearms')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <ellipse cx={158} cy={142} rx={10} ry={20} fill={getColor('Forearms')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Forearms')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <ellipse cx={30} cy={105} rx={8} ry={16} fill={getColor('Triceps')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Triceps')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <ellipse cx={170} cy={105} rx={8} ry={16} fill={getColor('Triceps')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Triceps')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <rect x={78} y={120} width={44} height={50} rx={4} fill={getColor('Abs')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Abs')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <ellipse cx={100} cy={180} rx={32} ry={18} fill={getColor('Glutes')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Glutes')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <rect x={72} y={195} width={56} height={60} rx={6} fill={getColor('Quadriceps')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Quadriceps')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <rect x={72} y={255} width={56} height={55} rx={6} fill={getColor('Hamstrings')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Hamstrings')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <rect x={74} y={312} width={20} height={40} rx={4} fill={getColor('Calves')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Calves')} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <rect x={106} y={312} width={20} height={40} rx={4} fill={getColor('Calves')} stroke="rgb(var(--surface-border))" strokeWidth="1"
              onClick={() => setSelectedMuscle('Calves')} className="cursor-pointer hover:opacity-80 transition-opacity" />
          </svg>
        </div>

        <div className="flex items-center gap-3 mt-4 justify-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: intensityToColor(0) }} />
            <span className="text-caption text-[rgb(var(--text-tertiary))]">Rest</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: intensityToColor(0.3) }} />
            <span className="text-caption text-[rgb(var(--text-tertiary))]">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: intensityToColor(0.6) }} />
            <span className="text-caption text-[rgb(var(--text-tertiary))]">Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: intensityToColor(1) }} />
            <span className="text-caption text-[rgb(var(--text-tertiary))]">High Volume</span>
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="text-h4 font-heading mb-4">
          {selectedMuscle ? `${selectedMuscle} Details` : 'Select a muscle group'}
        </h3>
        {selectedVolume ? (
          <div className="space-y-4">
            <div>
              <p className="text-body-sm text-[rgb(var(--text-secondary))]">Weekly Volume</p>
              <p className="text-data-lg font-heading font-bold">{selectedVolume.volume.toLocaleString()} kg</p>
            </div>
            <div>
              <p className="text-body-sm text-[rgb(var(--text-secondary))] mb-1">Training Intensity</p>
              <div className="h-3 rounded-full bg-[rgb(var(--surface-border))] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, #22c55e, ${intensityToColor(selectedVolume.intensity)})`,
                    width: `${selectedVolume.intensity * 100}%`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedVolume.intensity * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-body-sm text-[rgb(var(--text-secondary))] mt-1">
                {selectedVolume.intensity >= 0.8 ? 'High — Optimal for growth'
                  : selectedVolume.intensity >= 0.5 ? 'Moderate — Room to increase'
                  : 'Low — Consider adding volume'}
              </p>
            </div>
            <div className="border-t border-[rgb(var(--surface-border))] pt-4">
              <p className="text-body-sm font-medium mb-2">Recommended Action</p>
              <p className="text-body-sm text-[rgb(var(--text-secondary))]">
                {selectedVolume.intensity >= 0.8
                  ? 'Maintain current volume. Focus on progressive overload and form.'
                  : selectedVolume.intensity >= 0.5
                  ? 'Increase volume by 1-2 sets per week for optimal growth stimulus.'
                  : 'Add 3-4 sets per week to stimulate growth in this muscle group.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-body-md text-[rgb(var(--text-secondary))]">
              Click any muscle group on the body map to see your weekly training volume and intensity details.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
