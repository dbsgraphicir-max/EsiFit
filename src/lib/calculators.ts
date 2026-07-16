/* ─── 16 Interactive Calculators ───
   Core calculate→result flow works for anonymous visitors.
   Saved history, comparison, and AI insights gated to signed-in members.
   Result-before-scroll: result visualization is always visible immediately. */

// Helper to safely get numeric values with defaults
function v(inputs: Record<string, number>, key: string, fallback: number = 0): number {
  const val = inputs[key];
  return val !== undefined ? val : fallback;
}

export interface CalculatorConfig {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  inputs: CalculatorInput[];
  calculate: (inputs: Record<string, number>) => CalculatorOutput;
  category: 'body-composition' | 'strength' | 'nutrition' | 'training';
}

export interface CalculatorInput {
  key: string;
  label: string;
  type: 'number' | 'select' | 'range';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { label: string; value: number }[];
  defaultValue?: number;
}

export interface CalculatorOutput {
  primary: { value: number; label: string; unit?: string };
  secondary?: { value: number; label: string; unit?: string }[];
  interpretation?: string;
  gaugeMax?: number;
  gaugeLabel?: string;
}

/* ═══════════════════════════════════════
   CALCULATOR: BMR (Basal Metabolic Rate)
   ═══════════════════════════════════════ */
const bmrCalc: CalculatorConfig = {
  id: 'bmr',
  name: 'Basal Metabolic Rate',
  shortName: 'BMR',
  description: 'The calories your body burns at complete rest. This is the baseline for all energy calculations.',
  icon: 'Flame',
  category: 'nutrition',
  inputs: [
    { key: 'age', label: 'Age', type: 'number', placeholder: '30', min: 10, max: 100, unit: 'years' },
    { key: 'weight', label: 'Weight', type: 'number', placeholder: '70', min: 20, max: 400, unit: 'kg' },
    { key: 'height', label: 'Height', type: 'number', placeholder: '175', min: 100, max: 280, unit: 'cm' },
    { key: 'gender', label: 'Sex', type: 'select', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 0 }], defaultValue: 1 },
  ],
  calculate: (inputs) => {
    const age = v(inputs, 'age', 30);
    const weight = v(inputs, 'weight', 70);
    const height = v(inputs, 'height', 175);
    const gender = v(inputs, 'gender', 1);
    const bmr = gender === 1
      ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
      : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    return {
      primary: { value: Math.round(bmr), label: 'BMR', unit: 'kcal/day' },
      secondary: [
        { value: Math.round(bmr * 1.2), label: 'Sedentary', unit: 'kcal' },
        { value: Math.round(bmr * 1.375), label: 'Light Activity', unit: 'kcal' },
        { value: Math.round(bmr * 1.55), label: 'Moderate Activity', unit: 'kcal' },
        { value: Math.round(bmr * 1.725), label: 'Very Active', unit: 'kcal' },
        { value: Math.round(bmr * 1.9), label: 'Extremely Active', unit: 'kcal' },
      ],
      interpretation: 'This is your maintenance calories. Eat above for muscle gain, below for fat loss.',
      gaugeMax: 3000,
      gaugeLabel: 'kcal/day',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: TDEE
   ═══════════════════════════════════════ */
const tdeeCalc: CalculatorConfig = {
  id: 'tdee',
  name: 'Total Daily Energy Expenditure',
  shortName: 'TDEE',
  description: 'Your total daily calorie burn including activity. Use this to set your cutting or bulging targets.',
  icon: 'Activity',
  category: 'nutrition',
  inputs: [
    { key: 'age', label: 'Age', type: 'number', placeholder: '30', min: 10, max: 100, unit: 'years' },
    { key: 'weight', label: 'Weight', type: 'number', placeholder: '70', min: 20, max: 400, unit: 'kg' },
    { key: 'height', label: 'Height', type: 'number', placeholder: '175', min: 100, max: 280, unit: 'cm' },
    { key: 'gender', label: 'Sex', type: 'select', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 0 }], defaultValue: 1 },
    { key: 'activity', label: 'Activity Level', type: 'select', options: [
      { label: 'Sedentary (desk job)', value: 1.2 },
      { label: 'Light (1-3 days/wk)', value: 1.375 },
      { label: 'Moderate (3-5 days/wk)', value: 1.55 },
      { label: 'Very Active (6-7 days/wk)', value: 1.725 },
      { label: 'Extremely Active', value: 1.9 },
    ], defaultValue: 1.55 },
  ],
  calculate: (inputs) => {
    const age = v(inputs, 'age', 30);
    const weight = v(inputs, 'weight', 70);
    const height = v(inputs, 'height', 175);
    const gender = v(inputs, 'gender', 1);
    const activity = v(inputs, 'activity', 1.55);
    const bmr = gender === 1
      ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
      : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    const tdee = bmr * activity;
    return {
      primary: { value: Math.round(tdee), label: 'TDEE', unit: 'kcal/day' },
      secondary: [
        { value: Math.round(tdee - 500), label: 'Cut (lose 0.5kg/wk)', unit: 'kcal' },
        { value: Math.round(tdee + 250), label: 'Slow Bulk', unit: 'kcal' },
        { value: Math.round(tdee + 500), label: 'Bulk (gain 0.5kg/wk)', unit: 'kcal' },
      ],
      interpretation: 'Adjust your intake based on your goal: cut below TDEE, bulk above it.',
      gaugeMax: 4000,
      gaugeLabel: 'kcal/day',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: 1RM (One-Rep Max)
   ═══════════════════════════════════════ */
const oneRmCalc: CalculatorConfig = {
  id: '1rm',
  name: 'One-Rep Max',
  shortName: '1RM',
  description: 'Estimate your one-rep maximum for any lift using the Epley formula.',
  icon: 'Dumbbell',
  category: 'strength',
  inputs: [
    { key: 'weight', label: 'Weight Lifted', type: 'number', placeholder: '80', min: 1, max: 1000, unit: 'kg' },
    { key: 'reps', label: 'Reps Performed', type: 'range', placeholder: '5', min: 1, max: 15, step: 1, unit: 'reps', defaultValue: 5 },
  ],
  calculate: (inputs) => {
    const weight = v(inputs, 'weight', 80);
    const reps = v(inputs, 'reps', 5);
    const rm = weight * (1 + reps / 30);
    return {
      primary: { value: Math.round(rm), label: 'Estimated 1RM', unit: 'kg' },
      secondary: [
        { value: Math.round(rm * 0.95), label: '2-3 Reps', unit: 'kg' },
        { value: Math.round(rm * 0.9), label: '4-5 Reps', unit: 'kg' },
        { value: Math.round(rm * 0.85), label: '6-8 Reps', unit: 'kg' },
        { value: Math.round(rm * 0.8), label: '8-10 Reps', unit: 'kg' },
      ],
      interpretation: 'Use these percentages to structure your strength training program.',
      gaugeMax: weight * 2,
      gaugeLabel: 'kg',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Body Fat (Navy Method)
   ═══════════════════════════════════════ */
const bodyFatCalc: CalculatorConfig = {
  id: 'bodyfat',
  name: 'Body Fat Percentage',
  shortName: 'Body Fat %',
  description: 'Estimate your body fat percentage using the US Navy circumference method.',
  icon: 'Target',
  category: 'body-composition',
  inputs: [
    { key: 'gender', label: 'Sex', type: 'select', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 0 }], defaultValue: 1 },
    { key: 'weight', label: 'Weight', type: 'number', placeholder: '70', min: 20, max: 400, unit: 'kg' },
    { key: 'height', label: 'Height', type: 'number', placeholder: '175', min: 100, max: 280, unit: 'cm' },
    { key: 'neck', label: 'Neck Circumference', type: 'number', placeholder: '38', min: 20, max: 60, unit: 'cm' },
    { key: 'waist', label: 'Waist Circumference', type: 'number', placeholder: '80', min: 40, max: 200, unit: 'cm' },
    { key: 'hip', label: 'Hip Circumference', type: 'number', placeholder: '95', min: 40, max: 200, unit: 'cm' },
  ],
  calculate: (inputs) => {
    const gender = v(inputs, 'gender', 1);
    const height = v(inputs, 'height', 175);
    const neck = v(inputs, 'neck', 38);
    const waist = v(inputs, 'waist', 80);
    const hip = v(inputs, 'hip', 95);
    const logVal = Math.log10(waist + (gender === 0 ? hip : 0) - neck);
    const bf = gender === 1
      ? 495 / (1.0324 - 0.19077 * logVal + 0.15456 * Math.log10(height)) - 450
      : 495 / (1.29579 - 0.35004 * logVal + 0.22100 * Math.log10(height)) - 450;
    const clampedBf = Math.max(3, Math.min(60, Math.round(bf * 10) / 10));
    return {
      primary: { value: clampedBf, label: 'Body Fat', unit: '%' },
      secondary: [
        { value: Math.round((inputs.weight || 70) * (100 - clampedBf) / 100), label: 'Lean Mass', unit: 'kg' },
        { value: Math.round((inputs.weight || 70) * clampedBf / 100), label: 'Fat Mass', unit: 'kg' },
      ],
      interpretation: clampedBf < 10 ? 'Essential fat range. Athletic performance may benefit from slightly higher levels.'
        : clampedBf < 20 ? 'Athletic / fit range. Good body composition for most sports.'
        : clampedBf < 25 ? 'Average range. Healthy but room for improvement.'
        : 'Above average. Consider a structured nutrition and training plan.',
      gaugeMax: 40,
      gaugeLabel: '%',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Macros
   ═══════════════════════════════════════ */
const macrosCalc: CalculatorConfig = {
  id: 'macros',
  name: 'Macro Split Optimizer',
  shortName: 'Macros',
  description: 'Get your optimal protein, carbs, and fat targets based on your goal.',
  icon: 'Apple',
  category: 'nutrition',
  inputs: [
    { key: 'calories', label: 'Daily Calories', type: 'number', placeholder: '2200', min: 800, max: 6000, unit: 'kcal' },
    { key: 'goal', label: 'Goal', type: 'select', options: [
      { label: 'Fat Loss', value: 0 },
      { label: 'Maintenance', value: 1 },
      { label: 'Muscle Gain', value: 2 },
    ], defaultValue: 1 },
    { key: 'weight', label: 'Body Weight', type: 'number', placeholder: '70', min: 20, max: 400, unit: 'kg' },
  ],
  calculate: (inputs) => {
    const calories = v(inputs, 'calories', 2200);
    const goal = v(inputs, 'goal', 1);
    const weight = v(inputs, 'weight', 70);
    const proteinRatio = goal === 0 ? 0.35 : goal === 2 ? 0.3 : 0.25;
    const fatRatio = goal === 0 ? 0.3 : 0.25;
    const carbRatio = 1 - proteinRatio - fatRatio;
    const proteinG = Math.round(calories * proteinRatio / 4);
    const fatG = Math.round(calories * fatRatio / 9);
    const carbsG = Math.round(calories * carbRatio / 4);
    return {
      primary: { value: proteinG, label: 'Protein', unit: 'g' },
      secondary: [
        { value: proteinG, label: 'Protein', unit: 'g' },
        { value: carbsG, label: 'Carbs', unit: 'g' },
        { value: fatG, label: 'Fat', unit: 'g' },
        { value: Math.round(proteinG * 4 / (weight || 70)), label: 'Protein per kg', unit: 'g/kg' },
      ],
      interpretation: `A ${goal === 0 ? 'fat loss' : goal === 2 ? 'muscle gain' : 'maintenance'} oriented macro split. Adjust based on hunger and energy levels.`,
      gaugeMax: weight * 3,
      gaugeLabel: 'g protein',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Ideal Weight
   ═══════════════════════════════════════ */
const idealWeightCalc: CalculatorConfig = {
  id: 'ideal-weight',
  name: 'Ideal Body Weight',
  shortName: 'Ideal Weight',
  description: 'Calculate your ideal body weight based on height and frame using the Devine formula.',
  icon: 'Heart',
  category: 'body-composition',
  inputs: [
    { key: 'gender', label: 'Sex', type: 'select', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 0 }], defaultValue: 1 },
    { key: 'height', label: 'Height', type: 'number', placeholder: '175', min: 100, max: 280, unit: 'cm' },
  ],
  calculate: (inputs) => {
    const gender = v(inputs, 'gender', 1);
    const height = v(inputs, 'height', 175);
    const heightInInches = height / 2.54;
    const baseWeight = gender === 1 ? 50 : 45.5;
    const ideal = baseWeight + 2.3 * (heightInInches - 60);
    const rangeLow = ideal * 0.9;
    const rangeHigh = ideal * 1.1;
    return {
      primary: { value: Math.round(ideal), label: 'Ideal Weight', unit: 'kg' },
      secondary: [
        { value: Math.round(rangeLow), label: 'Healthy Range Low', unit: 'kg' },
        { value: Math.round(rangeHigh), label: 'Healthy Range High', unit: 'kg' },
      ],
      interpretation: 'This is a general reference. Athletes may have higher weights due to muscle mass.',
      gaugeMax: rangeHigh * 1.5,
      gaugeLabel: 'kg',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: BMI
   ═══════════════════════════════════════ */
const bmiCalc: CalculatorConfig = {
  id: 'bmi',
  name: 'Body Mass Index',
  shortName: 'BMI',
  description: 'A simple height-to-weight ratio used as a general health screening tool.',
  icon: 'BarChart3',
  category: 'body-composition',
  inputs: [
    { key: 'weight', label: 'Weight', type: 'number', placeholder: '70', min: 20, max: 400, unit: 'kg' },
    { key: 'height', label: 'Height', type: 'number', placeholder: '175', min: 100, max: 280, unit: 'cm' },
  ],
  calculate: (inputs) => {
    const weight = v(inputs, 'weight', 70);
    const height = v(inputs, 'height', 175);
    const bmi = weight / ((height / 100) * (height / 100));
    const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
    return {
      primary: { value: Math.round(bmi * 10) / 10, label: 'BMI' },
      secondary: [
        { value: Math.round(18.5 * (height / 100) * (height / 100) * 10) / 10, label: 'Min Healthy Weight', unit: 'kg' },
        { value: Math.round(25 * (height / 100) * (height / 100) * 10) / 10, label: 'Max Healthy Weight', unit: 'kg' },
      ],
      interpretation: `Category: ${category}. Note: BMI doesn't account for muscle mass and may overestimate body fat in athletes.`,
      gaugeMax: 40,
      gaugeLabel: 'BMI',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Calorie Deficit
   ═══════════════════════════════════════ */
const calorieDeficitCalc: CalculatorConfig = {
  id: 'calorie-deficit',
  name: 'Calorie Deficit Calculator',
  shortName: 'Cal Deficit',
  description: 'Calculate how long it will take to reach your goal weight at your current deficit.',
  icon: 'TrendingDown',
  category: 'nutrition',
  inputs: [
    { key: 'tdee', label: 'Your TDEE', type: 'number', placeholder: '2500', min: 800, max: 6000, unit: 'kcal' },
    { key: 'dailyIntake', label: 'Daily Intake', type: 'number', placeholder: '2000', min: 800, max: 6000, unit: 'kcal' },
    { key: 'goalLoss', label: 'Goal Fat Loss', type: 'number', placeholder: '5', min: 0.5, max: 50, unit: 'kg' },
  ],
  calculate: (inputs) => {
    const tdee = v(inputs, 'tdee', 2500);
    const dailyIntake = v(inputs, 'dailyIntake', 2000);
    const goalLoss = v(inputs, 'goalLoss', 5);
    const deficit = tdee - dailyIntake;
    const dailyDeficit = Math.max(0, deficit);
    const daysToGoal = dailyDeficit > 0 ? (goalLoss * 7700) / dailyDeficit : Infinity;
    const weeklyLoss = (dailyDeficit * 7) / 7700;
    return {
      primary: { value: Math.round(dailyDeficit), label: 'Daily Deficit', unit: 'kcal' },
      secondary: [
        { value: Math.round(weeklyLoss * 100) / 100, label: 'Estimated Weekly Loss', unit: 'kg' },
        { value: daysToGoal === Infinity ? 999 : Math.round(daysToGoal), label: 'Days to Goal' },
        { value: Math.round(dailyDeficit * 7 / 7700 * 100) / 100, label: 'Weekly Fat Loss', unit: 'kg' },
      ],
      interpretation: dailyDeficit <= 0 ? 'Increase your deficit or reduce intake to lose weight.'
        : weeklyLoss > 1 ? 'This deficit may be aggressive. Consider a smaller deficit for sustainability.'
        : 'A sustainable deficit. Aim for 0.5-1kg loss per week.',
      gaugeMax: 1500,
      gaugeLabel: 'kcal deficit',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Protein Needed
   ═══════════════════════════════════════ */
const proteinCalc: CalculatorConfig = {
  id: 'protein',
  name: 'Daily Protein Need',
  shortName: 'Protein',
  description: 'Calculate your optimal daily protein intake based on activity level and goals.',
  icon: 'Beef',
  category: 'nutrition',
  inputs: [
    { key: 'weight', label: 'Body Weight', type: 'number', placeholder: '70', min: 20, max: 400, unit: 'kg' },
    { key: 'activity', label: 'Activity Level', type: 'select', options: [
      { label: 'Sedentary', value: 0.8 },
      { label: 'Recreational (3-5 hrs/wk)', value: 1.2 },
      { label: 'Athlete (5-10 hrs/wk)', value: 1.6 },
      { label: 'Bodybuilder / Strength', value: 2.0 },
    ], defaultValue: 1.6 },
  ],
  calculate: (inputs) => {
    const weight = v(inputs, 'weight', 70);
    const activity = v(inputs, 'activity', 1.6);
    const protein = weight * activity;
    return {
      primary: { value: Math.round(protein), label: 'Daily Protein', unit: 'g' },
      secondary: [
        { value: Math.round(protein / 3), label: 'Per Meal (3 meals)', unit: 'g' },
        { value: Math.round(protein / 4), label: 'Per Meal (4 meals)', unit: 'g' },
        { value: Math.round(protein * 4), label: 'Calories from Protein', unit: 'kcal' },
      ],
      interpretation: 'Spread protein evenly across 3-4 meals for optimal muscle protein synthesis.',
      gaugeMax: weight * 2.5,
      gaugeLabel: 'g',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Lean Bulk Calories
   ═══════════════════════════════════════ */
const leanBulkCalc: CalculatorConfig = {
  id: 'lean-bulk',
  name: 'Lean Bulk Calculator',
  shortName: 'Lean Bulk',
  description: 'Calculate the optimal calorie surplus for muscle gain with minimal fat gain.',
  icon: 'TrendingUp',
  category: 'nutrition',
  inputs: [
    { key: 'tdee', label: 'Your TDEE', type: 'number', placeholder: '2500', min: 800, max: 6000, unit: 'kcal' },
    { key: 'weight', label: 'Body Weight', type: 'number', placeholder: '70', min: 20, max: 400, unit: 'kg' },
  ],
  calculate: (inputs) => {
    const tdee = v(inputs, 'tdee', 2500);
    const weight = v(inputs, 'weight', 70);
    const bulkCalories = Math.round(tdee * 1.1);
    const surplus = bulkCalories - tdee;
    const proteinG = Math.round(weight * 1.8);
    return {
      primary: { value: bulkCalories, label: 'Bulk Calories', unit: 'kcal' },
      secondary: [
        { value: surplus, label: 'Daily Surplus', unit: 'kcal' },
        { value: proteinG, label: 'Protein Target', unit: 'g' },
        { value: Math.round(surplus * 7 / 7700 * 100) / 100, label: 'Estimated Weekly Gain', unit: 'kg' },
      ],
      interpretation: 'A 10% surplus is ideal for lean bulking — enough to build muscle without excessive fat gain.',
      gaugeMax: Math.round(tdee * 1.3),
      gaugeLabel: 'kcal',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Water Intake
   ═══════════════════════════════════════ */
const waterCalc: CalculatorConfig = {
  id: 'water',
  name: 'Daily Water Intake',
  shortName: 'Water',
  description: 'Calculate your optimal daily water intake based on body weight and activity.',
  icon: 'Droplets',
  category: 'nutrition',
  inputs: [
    { key: 'weight', label: 'Body Weight', type: 'number', placeholder: '70', min: 20, max: 400, unit: 'kg' },
    { key: 'activityMinutes', label: 'Daily Activity', type: 'number', placeholder: '45', min: 0, max: 300, unit: 'min' },
  ],
  calculate: (inputs) => {
    const weight = v(inputs, 'weight', 70);
    const activityMinutes = v(inputs, 'activityMinutes', 45);
    const base = weight * 35;
    const activityExtra = activityMinutes * 12;
    const total = Math.round(base + activityExtra);
    return {
      primary: { value: total, label: 'Daily Water', unit: 'ml' },
      secondary: [
        { value: Math.round(total / 250), label: 'Cups (250ml)', unit: 'cups' },
        { value: Math.round((total / 1000) * 10) / 10, label: 'Liters', unit: 'L' },
      ],
      interpretation: 'Spread water intake throughout the day. Drink more on hot days and intense training days.',
      gaugeMax: 5000,
      gaugeLabel: 'ml',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Sleep Need
   ═══════════════════════════════════════ */
const sleepCalc: CalculatorConfig = {
  id: 'sleep',
  name: 'Optimal Sleep Time',
  shortName: 'Sleep',
  description: 'Calculate your optimal sleep duration based on training load and lifestyle factors.',
  icon: 'Moon',
  category: 'training',
  inputs: [
    { key: 'age', label: 'Age', type: 'number', placeholder: '30', min: 10, max: 100, unit: 'years' },
    { key: 'trainingHours', label: 'Weekly Training', type: 'number', placeholder: '6', min: 0, max: 30, unit: 'hours' },
    { key: 'stress', label: 'Stress Level', type: 'range', placeholder: '5', min: 1, max: 10, step: 1, unit: '1-10', defaultValue: 5 },
  ],
  calculate: (inputs) => {
    const age = v(inputs, 'age', 30);
    const trainingHours = v(inputs, 'trainingHours', 6);
    const stress = v(inputs, 'stress', 5);
    const base = age < 18 ? 9 : age < 65 ? 7.5 : 7;
    const trainingExtra = Math.min(trainingHours * 0.1, 1);
    const stressExtra = (stress - 5) * 0.1;
    const optimal = Math.round((base + trainingExtra + Math.max(0, stressExtra)) * 10) / 10;
    return {
      primary: { value: optimal, label: 'Optimal Sleep', unit: 'hours' },
      secondary: [
        { value: Math.round((optimal - 1) * 10) / 10, label: 'Minimum', unit: 'hours' },
        { value: Math.round((optimal + 1) * 10) / 10, label: 'Maximum', unit: 'hours' },
      ],
      interpretation: 'Prioritize sleep consistency. Going to bed and waking at the same time matters as much as duration.',
      gaugeMax: 12,
      gaugeLabel: 'hours',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Rest Time
   ═══════════════════════════════════════ */
const restCalc: CalculatorConfig = {
  id: 'rest-time',
  name: 'Rest Time Between Sets',
  shortName: 'Rest Timer',
  description: 'Determine optimal rest intervals based on your training goal.',
  icon: 'Clock',
  category: 'training',
  inputs: [
    { key: 'goal', label: 'Training Goal', type: 'select', options: [
      { label: 'Strength (1-5 reps)', value: 3 },
      { label: 'Hypertrophy (6-12 reps)', value: 2 },
      { label: 'Endurance (12+ reps)', value: 1 },
    ], defaultValue: 2 },
  ],
  calculate: (inputs) => {
    const goal = v(inputs, 'goal', 2);
    const restMinutes = goal;
    return {
      primary: { value: restMinutes, label: 'Rest Time', unit: 'min' },
      secondary: [
        { value: restMinutes * 60, label: 'Rest Time', unit: 'seconds' },
      ],
      interpretation: restMinutes === 3 ? 'Longer rest allows full ATP recovery for maximal strength output.'
        : restMinutes === 2 ? 'Moderate rest balances mechanical tension and metabolic stress for muscle growth.'
        : 'Short rest keeps metabolic stress high for muscular endurance adaptations.',
      gaugeMax: 5,
      gaugeLabel: 'min',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Workout Volume
   ═══════════════════════════════════════ */
const volumeCalc: CalculatorConfig = {
  id: 'workout-volume',
  name: 'Weekly Training Volume',
  shortName: 'Volume',
  description: 'Calculate your total weekly training volume per muscle group.',
  icon: 'BarChart3',
  category: 'training',
  inputs: [
    { key: 'sets', label: 'Sets Per Muscle/Week', type: 'number', placeholder: '12', min: 2, max: 30, unit: 'sets' },
    { key: 'reps', label: 'Average Reps Per Set', type: 'number', placeholder: '10', min: 1, max: 30, unit: 'reps' },
    { key: 'weight', label: 'Average Weight', type: 'number', placeholder: '50', min: 0, max: 500, unit: 'kg' },
  ],
  calculate: (inputs) => {
    const sets = v(inputs, 'sets', 12);
    const reps = v(inputs, 'reps', 10);
    const weight = v(inputs, 'weight', 50);
    const volume = sets * reps * weight;
    const setsRecommendation = sets < 10 ? 'Consider increasing volume for growth (10-20 sets/week).'
      : sets > 25 ? 'High volume. Ensure adequate recovery and deload weeks.'
      : 'You are in the optimal hypertrophy range (10-20 sets per muscle per week).';
    return {
      primary: { value: volume, label: 'Weekly Volume', unit: 'kg' },
      secondary: [
        { value: Math.round(volume / sets), label: 'Volume Per Set', unit: 'kg' },
        { value: sets, label: 'Sets Per Week' },
      ],
      interpretation: setsRecommendation,
      gaugeMax: sets * 20 * 100,
      gaugeLabel: 'kg volume',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Macro Per Meal
   ═══════════════════════════════════════ */
const macroMealCalc: CalculatorConfig = {
  id: 'macro-meal',
  name: 'Per-Meal Macro Split',
  shortName: 'Meal Macros',
  description: 'Distribute your daily macros across meals for optimal nutrient timing.',
  icon: 'UtensilsCrossed',
  category: 'nutrition',
  inputs: [
    { key: 'protein', label: 'Daily Protein', type: 'number', placeholder: '140', min: 20, max: 400, unit: 'g' },
    { key: 'carbs', label: 'Daily Carbs', type: 'number', placeholder: '220', min: 0, max: 800, unit: 'g' },
    { key: 'fat', label: 'Daily Fat', type: 'number', placeholder: '60', min: 0, max: 300, unit: 'g' },
    { key: 'meals', label: 'Number of Meals', type: 'select', options: [
      { label: '3 meals', value: 3 },
      { label: '4 meals', value: 4 },
      { label: '5 meals', value: 5 },
      { label: '6 meals', value: 6 },
    ], defaultValue: 4 },
  ],
  calculate: (inputs) => {
    const protein = v(inputs, 'protein', 140);
    const carbs = v(inputs, 'carbs', 220);
    const fat = v(inputs, 'fat', 65);
    const meals = v(inputs, 'meals', 4);
    const perMeal = {
      protein: Math.round(protein / meals),
      carbs: Math.round(carbs / meals),
      fat: Math.round(fat / meals),
      calories: Math.round((protein * 4 + carbs * 4 + fat * 9) / meals),
    };
    return {
      primary: { value: perMeal.calories, label: 'Calories Per Meal', unit: 'kcal' },
      secondary: [
        { value: perMeal.protein, label: 'Protein Per Meal', unit: 'g' },
        { value: perMeal.carbs, label: 'Carbs Per Meal', unit: 'g' },
        { value: perMeal.fat, label: 'Fat Per Meal', unit: 'g' },
      ],
      interpretation: 'Distribute protein evenly across meals for optimal muscle protein synthesis.',
      gaugeMax: 1000,
      gaugeLabel: 'kcal/meal',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Weight Loss Timeline
   ═══════════════════════════════════════ */
const weightLossCalc: CalculatorConfig = {
  id: 'weight-loss',
  name: 'Weight Loss Timeline',
  shortName: 'Loss Timeline',
  description: 'Project your weight loss journey with a sustainable calorie deficit.',
  icon: 'TrendingDown',
  category: 'body-composition',
  inputs: [
    { key: 'currentWeight', label: 'Current Weight', type: 'number', placeholder: '80', min: 20, max: 400, unit: 'kg' },
    { key: 'goalWeight', label: 'Goal Weight', type: 'number', placeholder: '70', min: 20, max: 400, unit: 'kg' },
    { key: 'deficit', label: 'Daily Deficit', type: 'range', placeholder: '500', min: 100, max: 1000, step: 50, unit: 'kcal', defaultValue: 500 },
  ],
  calculate: (inputs) => {
    const currentWeight = v(inputs, 'currentWeight', 80);
    const goalWeight = v(inputs, 'goalWeight', 70);
    const deficit = v(inputs, 'deficit', 500);
    const weightToLose = currentWeight - goalWeight;
    const daysToGoal = (weightToLose * 7700) / deficit;
    const weeksToGoal = daysToGoal / 7;
    const monthsToGoal = daysToGoal / 30;
    return {
      primary: { value: Math.round(daysToGoal), label: 'Days to Goal' },
      secondary: [
        { value: Math.round(weeksToGoal * 10) / 10, label: 'Weeks to Goal' },
        { value: Math.round(monthsToGoal * 10) / 10, label: 'Months to Goal' },
        { value: Math.round((deficit * 7) / 7700 * 100) / 100, label: 'Weekly Loss', unit: 'kg' },
      ],
      interpretation: weeksToGoal > 52 ? 'Consider a larger deficit or setting an intermediate goal.'
        : weeksToGoal < 4 ? 'This timeline is aggressive. Ensure you are getting adequate nutrition.'
        : 'A sustainable timeline. Aim for 0.5-1kg loss per week.',
      gaugeMax: 365,
      gaugeLabel: 'days',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Running Pace
   ═══════════════════════════════════════ */
const paceCalc: CalculatorConfig = {
  id: 'running-pace',
  name: 'Running Pace Calculator',
  shortName: 'Pace',
  description: 'Calculate your running pace and speed for any distance and time.',
  icon: 'Timer',
  category: 'training',
  inputs: [
    { key: 'distance', label: 'Distance', type: 'number', placeholder: '5', min: 0.1, max: 100, step: 0.1, unit: 'km' },
    { key: 'hours', label: 'Hours', type: 'number', placeholder: '0', min: 0, max: 24, unit: 'h' },
    { key: 'minutes', label: 'Minutes', type: 'number', placeholder: '25', min: 0, max: 59, unit: 'min' },
    { key: 'seconds', label: 'Seconds', type: 'number', placeholder: '0', min: 0, max: 59, unit: 's' },
  ],
  calculate: (inputs) => {
    const hours = v(inputs, 'hours', 0);
    const minutes = v(inputs, 'minutes', 25);
    const seconds = v(inputs, 'seconds', 0);
    const distance = v(inputs, 'distance', 5);
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    const pace = totalMinutes / distance;
    const paceMin = Math.floor(pace);
    const paceSec = Math.round((pace - paceMin) * 60);
    const speedKph = distance / (totalMinutes / 60);
    return {
      primary: { value: Math.round(speedKph * 10) / 10, label: 'Speed', unit: 'km/h' },
      secondary: [
        { value: paceMin * 60 + paceSec, label: 'Pace', unit: `${paceMin}:${String(paceSec).padStart(2, '0')} /km` },
        { value: Math.round(speedKph / 1.609 * 10) / 10, label: 'Speed', unit: 'mph' },
      ],
      interpretation: pace < 4 ? 'Elite runner pace' : pace < 5 ? 'Very fast pace' : pace < 6 ? 'Fast recreational pace' : pace < 7 ? 'Moderate pace' : 'Easy / conversational pace',
      gaugeMax: 20,
      gaugeLabel: 'km/h',
    };
  },
};

/* ═══════════════════════════════════════
   CALCULATOR: Planks Challenge
   ═══════════════════════════════════════ */
const plankCalc: CalculatorConfig = {
  id: 'plank-score',
  name: 'Plank Score',
  shortName: 'Plank',
  description: 'Assess your core endurance based on how long you can hold a plank.',
  icon: 'Activity',
  category: 'training',
  inputs: [
    { key: 'seconds', label: 'Plank Hold Time', type: 'number', placeholder: '60', min: 1, max: 600, unit: 'seconds' },
    { key: 'gender', label: 'Sex', type: 'select', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 0 }], defaultValue: 1 },
  ],
  calculate: (inputs) => {
    const seconds = v(inputs, 'seconds', 60);
    const gender = v(inputs, 'gender', 1);
    const thresholds = gender === 1
      ? [{ min: 0, label: 'Needs Work' }, { min: 30, label: 'Below Average' }, { min: 60, label: 'Average' }, { min: 120, label: 'Good' }, { min: 180, label: 'Excellent' }, { min: 300, label: 'Elite' }]
      : [{ min: 0, label: 'Needs Work' }, { min: 20, label: 'Below Average' }, { min: 45, label: 'Average' }, { min: 90, label: 'Good' }, { min: 150, label: 'Excellent' }, { min: 240, label: 'Elite' }];
    const rating = [...thresholds].reverse().find(t => seconds >= t.min)?.label || 'Needs Work';
    return {
      primary: { value: Math.round(seconds), label: 'Plank Hold', unit: 'sec' },
      secondary: [
        { value: Math.round(seconds / 60 * 10) / 10, label: 'Hold Time', unit: 'min' },
      ],
      interpretation: `Rating: ${rating}. Aim to increase your hold time by 5-10 seconds per week.`,
      gaugeMax: 300,
      gaugeLabel: 'seconds',
    };
  },
};

/* ─── ALL CALCULATORS REGISTRY ─── */
export const calculators: CalculatorConfig[] = [
  bmrCalc,
  tdeeCalc,
  oneRmCalc,
  bodyFatCalc,
  macrosCalc,
  idealWeightCalc,
  bmiCalc,
  calorieDeficitCalc,
  proteinCalc,
  leanBulkCalc,
  waterCalc,
  sleepCalc,
  restCalc,
  volumeCalc,
  macroMealCalc,
  weightLossCalc,
  paceCalc,
  plankCalc,
  // Note: That's 18 calculators but 2 spare for future expansion
];

export function getCalculator(id: string): CalculatorConfig | undefined {
  return calculators.find((c) => c.id === id);
}

const CALC_HISTORY_KEY = 'esifit-calc-history';

export function saveCalculatorResult(userId: string | undefined, calcId: string, inputs: Record<string, number>, result: number) {
  try {
    const history = JSON.parse(localStorage.getItem(CALC_HISTORY_KEY) || '[]');
    history.unshift({ id: `cr_${Date.now()}`, userId: userId || 'anonymous', calculatorType: calcId, inputs, result, createdAt: new Date().toISOString() });
    localStorage.setItem(CALC_HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
  } catch { /* storage full */ }
}

export function getCalculatorHistory(): Record<string, number>[] {
  try {
    return JSON.parse(localStorage.getItem(CALC_HISTORY_KEY) || '[]');
  } catch { return []; }
}
