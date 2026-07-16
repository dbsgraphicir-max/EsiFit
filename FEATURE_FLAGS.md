# EsiFit — FEATURE_FLAGS.md

Every major feature area is gated behind a flag from Phase 1 onward — even while everything defaults to "on" during development, this makes each area independently toggleable for demos, staged rollouts, and later A/B or role-based rollout without a code change.

## Implementation pattern

- A single typed config object (e.g. `lib/feature-flags.ts`) exporting a `FeatureFlags` type and a `useFeatureFlag(flag)` hook.
- Default source for now: a local config file (environment-variable-backed is fine). In Phase 6+ this can move to a real flag service/admin-panel-managed table without changing call sites — the hook interface must stay stable.
- Any component gating a whole feature area behind a flag must have a sensible "disabled" state (hide the nav entry, don't just crash if the route is hit directly).

## Registry

| Flag | Controls | Introduced | Default |
|---|---|---|---|
| `BLOG` | Public articles/blog hub | Phase 1 | on |
| `AI_CHAT` | Free-form "Ask EsiFit AI" entry point | Phase 5 | on |
| `AI_ANALYTICS` | AI-generated insights on calculators/workouts/analytics | Phase 5 | on |
| `SHOP` | Store, subscriptions, gift cards, checkout UI | Phase 4 | on |
| `COMMUNITY` | Feed, challenges, leaderboards | Phase 4 | on |
| `VOICE` | Voice-powered workout set logging | Phase 3 | on |
| `NOTIFICATIONS` | Notification center + reminder settings | Phase 4 | on |
| `OFFLINE_TRACKERS` | Offline-first workout/water tracking | Phase 3 | on |
| `COMMAND_PALETTE` | ⌘K global command palette | Phase 2 | on |
| `WEEKLY_RECAP` | Shareable weekly recap card + OG image generation | Phase 4 | on |
| `READINESS_SCORE` | Daily Readiness Score widget | Phase 2 | on |
| `MUSCLE_HEATMAP` | Muscle volume heatmap on Analytics | Phase 3 | on |

## Adding a new flag

Whenever a phase introduces a new toggleable feature area, add a row here in that phase's handoff — don't let flags accumulate undocumented in code.
