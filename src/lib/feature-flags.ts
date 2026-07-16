export type FeatureFlag =
  | 'BLOG'
  | 'AI_CHAT'
  | 'AI_ANALYTICS'
  | 'SHOP'
  | 'COMMUNITY'
  | 'VOICE'
  | 'NOTIFICATIONS'
  | 'OFFLINE_TRACKERS'
  | 'COMMAND_PALETTE'
  | 'WEEKLY_RECAP'
  | 'READINESS_SCORE'
  | 'MUSCLE_HEATMAP';

interface FlagConfig {
  key: FeatureFlag;
  default: boolean;
  description: string;
}

const featureFlagRegistry: FlagConfig[] = [
  { key: 'BLOG', default: true, description: 'Public articles/blog hub' },
  { key: 'AI_CHAT', default: true, description: 'Free-form "Ask EsiFit AI" entry point' },
  { key: 'AI_ANALYTICS', default: true, description: 'AI-generated insights on calculators/workouts/analytics' },
  { key: 'SHOP', default: true, description: 'Store, subscriptions, gift cards, checkout UI' },
  { key: 'COMMUNITY', default: true, description: 'Feed, challenges, leaderboards' },
  { key: 'VOICE', default: true, description: 'Voice-powered workout set logging' },
  { key: 'NOTIFICATIONS', default: true, description: 'Notification center + reminder settings' },
  { key: 'OFFLINE_TRACKERS', default: true, description: 'Offline-first workout/water tracking' },
  { key: 'COMMAND_PALETTE', default: true, description: '⌘K global command palette' },
  { key: 'WEEKLY_RECAP', default: true, description: 'Shareable weekly recap card + OG image generation' },
  { key: 'READINESS_SCORE', default: true, description: 'Daily Readiness Score widget' },
  { key: 'MUSCLE_HEATMAP', default: true, description: 'Muscle volume heatmap on Analytics' },
];

const overrides = new Map<FeatureFlag, boolean>();

export function setFeatureFlag(flag: FeatureFlag, value: boolean): void {
  overrides.set(flag, value);
}

export function getFeatureFlag(flag: FeatureFlag): boolean {
  if (overrides.has(flag)) return overrides.get(flag)!;
  const config = featureFlagRegistry.find((f) => f.key === flag);
  return config?.default ?? false;
}

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return getFeatureFlag(flag);
}
