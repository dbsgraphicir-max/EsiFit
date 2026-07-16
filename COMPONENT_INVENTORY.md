# EsiFit — COMPONENT_INVENTORY.md

**This is a living document.** Before each phase, Claude Code checks this file to avoid recreating existing components. After each phase, Claude Code updates this file with the *actual* variants/props/states/animations it implemented — replacing the "planned" placeholder rows below with real specs. Never leave this file stale relative to the codebase.

## How to fill in a row

| Component | Variants | Props | States | Animation |
|---|---|---|---|---|
| *(example)* `Button` | primary, secondary, ghost, gradient-glow | `variant, size, icon, loading, disabled, onClick` | default, hover, active, disabled, loading | scale-down on press, glow pulse on gradient-glow hover |

## Planned inventory (fill in real specs as each is built — Phase noted where it originates)

### Core / Phase 1
| Component | Variants | Props | States | Animation |
|---|---|---|---|---|
| Button | primary / secondary / ghost / gradient-glow | TBD after implementation | default / hover / active / disabled / loading | TBD |
| Card | default / interactive | TBD | default / hover | TBD |
| GlassCard | default / elevated | TBD | default / hover | TBD |
| Badge/Pill | tier (Free/VIP/VIP+/Coach), status | TBD | default | TBD |
| AnimatedCounter | numeric / percentage | TBD | idle / animating | count up/down |
| RadialProgress/Gauge (base) | small / medium / large / hero | TBD | idle / animating / complete | ring fill animation |
| Navbar | transparent-on-hero / solid-on-scroll | TBD | scrolled / top | background transition |
| Footer | — | TBD | — | — |
| Modal/Dialog | — | TBD | open / closing | fade + scale |
| Toast | success / error / info / warning | TBD | entering / visible / exiting | slide + fade |
| Tabs, Tooltip | — | TBD | — | — |
| Skeleton | shape-matched per content type | TBD | loading | shimmer |
| AnatomyBodyMap | front / back, highlight-by-muscle | `highlightedMuscles, intensityMap` | idle / highlighted | color transition on highlight change |
| RevealOnScroll, MagneticButton | — | TBD | — | — |
| SectionHeader | — | TBD | — | — |
| Transformation Slider | before/after drag-reveal | TBD | dragging / idle | drag-follow |

### Dashboard / Phase 2
| Component | Variants | Props | States | Animation |
|---|---|---|---|---|
| StatCard, ProgressCard | per widget type | `data, loading, error` | loading / loaded / empty / error | staggered entrance |
| ChartCard (wrapper) | line / bar / radial / heatmap | `series, config` | loading / loaded / empty | draw-in on mount |
| CommandPalette | — | `commands[]` | closed / open / searching | fade + scale |
| BottomSheet, Drawer | — | TBD | closed / open / dragging | slide |
| AIBubble (chat entry point) | collapsed / expanded | TBD | idle / typing / responding | expand/collapse |
| Sidebar | expanded / collapsed | TBD | — | width transition |

### Feature cards / Phase 3
| Component | Variants | Props | States | Animation |
|---|---|---|---|---|
| ExerciseCard | grid / list | TBD | default / expanded | expand |
| WorkoutCard | routine / active-session | TBD | idle / active / complete | — |
| CalculatorCard | per calculator config | `config, onCalculate` | idle / calculating / result | result reveal |
| NutritionCard | meal / recipe | TBD | — | — |
| TimelineCard | — | TBD | — | — |
| Ring (macro/progress) | — | TBD | — | fill animation |
| Sparkline, AreaChart, RadarChart, Heatmap | — | `data, theme` | loading / loaded / empty | draw-in |

### Growth / Phase 4
| Component | Variants | Props | States | Animation |
|---|---|---|---|---|
| AchievementCard | locked / unlocked / in-progress | TBD | — | unlock celebration |
| FloatingButton | — | TBD | — | — |
| Celebration (shared) | confetti / glow-burst | `trigger, intensity` | idle / triggered | one reusable implementation, reused everywhere |

*(Continue this pattern for Phase 5+ components as they're introduced — AI response bubble/streaming states, quota indicator, etc.)*
