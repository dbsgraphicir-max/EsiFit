import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Weight, Plus, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const WATER_KEY = 'esifit-water';
const WEIGHT_KEY = 'esifit-weight';

interface WaterEntry {
  ml: number;
  timestamp: string;
}

interface WeightEntry {
  kg: number;
  timestamp: string;
}

function getTodayMl(): number {
  try {
    const data: WaterEntry[] = JSON.parse(localStorage.getItem(WATER_KEY) || '[]');
    const today = new Date().toDateString();
    return data
      .filter((e) => new Date(e.timestamp).toDateString() === today)
      .reduce((sum, e) => sum + e.ml, 0);
  } catch {
    return 0;
  }
}

function addWater(ml: number) {
  try {
    const data: WaterEntry[] = JSON.parse(localStorage.getItem(WATER_KEY) || '[]');
    data.push({ ml, timestamp: new Date().toISOString() });
    localStorage.setItem(WATER_KEY, JSON.stringify(data.slice(-50)));
  } catch { /* storage full */ }
}

function getLastWeight(): WeightEntry | null {
  try {
    const data: WeightEntry[] = JSON.parse(localStorage.getItem(WEIGHT_KEY) || '[]');
    return data[data.length - 1] || null;
  } catch {
    return null;
  }
}

function saveWeight(kg: number) {
  try {
    const data: WeightEntry[] = JSON.parse(localStorage.getItem(WEIGHT_KEY) || '[]');
    data.push({ kg, timestamp: new Date().toISOString() });
    localStorage.setItem(WEIGHT_KEY, JSON.stringify(data.slice(-200)));
  } catch { /* storage full */ }
}

export function WaterTracker() {
  const [currentMl, setCurrentMl] = useState(getTodayMl());
  const [showCustom, setShowCustom] = useState(false);
  const [customMl, setCustomMl] = useState('');

  const add = (ml: number) => {
    addWater(ml);
    setCurrentMl((prev) => prev + ml);
  };

  const addCustom = () => {
    const ml = parseInt(customMl);
    if (ml > 0) {
      add(ml);
      setCustomMl('');
      setShowCustom(false);
    }
  };

  const reset = () => {
    localStorage.setItem(WATER_KEY, '[]');
    setCurrentMl(0);
  };

  const goal = 2500;
  const percentage = Math.min(100, Math.round((currentMl / goal) * 100));

  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-h4 font-heading flex items-center gap-2">
          <Droplets className="w-5 h-5 text-accent-500" />
          Water Intake
        </h3>
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw size={14} />
        </Button>
      </div>

      <div className="text-center mb-4">
        <motion.span
          className="text-display-sm font-heading font-bold"
          key={currentMl}
          initial={{ scale: 1.2, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {currentMl}
        </motion.span>
        <span className="text-body-md text-[rgb(var(--text-secondary))]"> / {goal} ml</span>
      </div>

      <div className="h-3 rounded-full bg-[rgb(var(--surface-border))] overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-400 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {[250, 350, 500].map((ml) => (
          <Button key={ml} variant="secondary" size="sm" onClick={() => add(ml)}>
            +{ml}ml
          </Button>
        ))}
      </div>

      {showCustom ? (
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter ml"
            value={customMl}
            onChange={(e) => setCustomMl(e.target.value)}
            wrapperClassName="flex-1"
          />
          <Button variant="primary" size="sm" onClick={addCustom}>Add</Button>
        </div>
      ) : (
        <Button variant="ghost" size="sm" className="w-full" onClick={() => setShowCustom(true)}>
          <Plus size={14} className="mr-1" /> Custom Amount
        </Button>
      )}
    </Card>
  );
}

export function WeightTracker() {
  const [lastWeight, setLastWeight] = useState(getLastWeight());
  const [newWeight, setNewWeight] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSave = () => {
    const kg = parseFloat(newWeight);
    if (kg > 0 && kg < 400) {
      saveWeight(kg);
      setLastWeight({ kg, timestamp: new Date().toISOString() });
      setNewWeight('');
      setShowForm(false);
    }
  };

  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-h4 font-heading flex items-center gap-2">
          <Weight className="w-5 h-5 text-brand-500" />
          Weight Log
        </h3>
      </div>

      {lastWeight ? (
        <div className="text-center mb-4">
          <motion.span
            className="text-display-sm font-heading font-bold"
            key={lastWeight.kg}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {lastWeight.kg}
          </motion.span>
          <span className="text-body-md text-[rgb(var(--text-secondary))]"> kg</span>
          <p className="text-caption text-[rgb(var(--text-tertiary))] mt-1">
            Last logged: {new Date(lastWeight.timestamp).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p className="text-body-sm text-[rgb(var(--text-tertiary))] text-center mb-4">
          No weight logged yet
        </p>
      )}

      {showForm ? (
        <div className="flex gap-2">
          <Input
            type="number"
            step="0.1"
            placeholder="Weight in kg"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            wrapperClassName="flex-1"
          />
          <Button variant="primary" size="sm" onClick={handleSave}>Save</Button>
        </div>
      ) : (
        <Button variant="secondary" size="sm" className="w-full" onClick={() => setShowForm(true)}>
          <Plus size={14} className="mr-1" /> Log Weight
        </Button>
      )}
    </Card>
  );
}
