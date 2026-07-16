# EsiFit — COMPONENT_INVENTORY.md

**This is a living document.** Before each phase, Claude Code checks this file to avoid recreating existing components. After each phase, Claude Code updates this file with the *actual* variants/props/states/animations it implemented — replacing the "planned" placeholder rows below with real specs. Never leave this file stale relative to the codebase.

## How to fill in a row

| Component | Variants | Props | States | Animation |
|---|---|---|---|---|
| *(example)* `Button` | primary, secondary, ghost, gradient-glow | `variant, size, icon, loading, disabled, onClick` | default, hover, active, disabled, loading | scale-down on press, glow pulse on gradient-glow hover |

## Built Components

### Core / Phase 1
| Component | Variants | Props | States | Animation |
|---|---|---|---|---|
| Button | primary, secondary, ghost, gradient-glow | `variant, size, icon, loading, disabled, onClick, iconPosition` | default, hover, active, disabled, loading | scale-down on press, glow pulse on gradient-glow hover |
| Card | default, interactive | `variant, padding, className, children` | default, hover | shadow + border transition |
| GlassCard | — | `className, children` | default | — |
| Badge/Pill | free, vip, vip-plus, coach, success, warning, info, default | `variant, size` | default | — |
| AnimatedCounter | numeric | `target, duration, prefix, suffix, decimals, formatter` | idle, animating | scroll-triggered count-up with ease-out cubic |
| Navbar | transparent-on-hero, solid-on-scroll | — | scrolled, top | background glass transition |
| Footer | — | — | — | — |
| SectionHeader | — | `label, title, description, align` | — | — |
| Input | — | `label, error, hint, props` | default, focused, error, disabled | shake animation on error |
| Modal/Dialog | sm, md, lg | `isOpen, onClose, title, size, children` | open, closing | fade + scale, focus trap, escape dismiss |
| Toast | success, error, info, warning | `type, message, duration` | entering, visible, exiting | slide + fade from right, timeout bar |
| Skeleton | text, circular, rectangular, card | `variant, width, height` | loading | shimmer animation |
| CardSkeleton | — | — | loading | shimmer + skeleton shapes |
| DashboardSkeleton | — | — | loading | full dashboard skeleton layout |

### Dashboard / Phase 2
| Component | Variants | Props | States | Animation |
|---|---|---|---|---|
| Sidebar | expanded (240px), collapsed (60px) | `isCollapsed, onToggle, onCommandPaletteOpen` | expanded, collapsed, mobile-overlay | width transition + AnimatePresence |
| DashboardHeader | — | `onCommandPaletteOpen` | — | profile dropdown fade+scale |
| GreetingWidget | — | — | — | time-of-day greeting, random motivational phrase |
| TodayWidget | — | — | — | staggered item entrance, checkbox toggle |
| ReadinessScore | — | `score, recovery, sleep, hrv, energy` | loading, loaded | ring SVG draw-in animation, count-up score, pulse-glow ring |
| ActionWidget | — | — | — | staggered card entrance with hover scale |
| HistoryWidget | — | — | — | timeline with staggered entrance |
| CommandPalette | — | `isOpen, onClose` | closed, open, searching, empty-results | fade + scale, keyboard nav (↑↓↵Esc), search filtering |
| useCommandPalette | — | returns `{ isOpen, open, close }` | — | global ⌘K/⌃K keybinding |

### Auth / Phase 2
| Component | Variants | Props | States | Animation |
|---|---|---|---|---|
| AuthProvider / useAuth | — | `signIn, signUp, signOut, clearError` | authenticating, authenticated, error | mock latency simulation, localStorage persist |
| SignIn page | — | — | idle, validating, loading, error, success | form fade-in, demo credentials hint |
| SignUp page | — | — | idle, validating, loading, error, success | password requirements checklist, form fade-in |

### Hooks / Phase 2
| Hook | Purpose |
|---|---|
| `useCrossTabSync` | BroadcastChannel + storage event listener for real-time cross-tab sync |
| `broadcastCrossTab` | Send messages to other tabs via BroadcastChannel |
| `useDocumentVisibility` | Track document visibility changes |

## Planned (not yet built)

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
| AnatomyBodyMap | front / back, highlight-by-muscle | `highlightedMuscles, intensityMap` | idle / highlighted | color transition on highlight change |

### Growth / Phase 4
| Component | Variants | Props | States | Animation |
|---|---|---|---|---|
| AchievementCard | locked / unlocked / in-progress | TBD | — | unlock celebration |
| FloatingButton | — | TBD | — | — |
| Celebration (shared) | confetti / glow-burst | `trigger, intensity` | idle / triggered | one reusable implementation, reused everywhere |

### Future phases
| Component | Phase |
|---|---|
| AIBubble (chat entry point) | 5 |
| BottomSheet, Drawer | 2+ |
| Tabs, Tooltip | 3 |
| AnatomyBodyMap | 3 |
| RevealOnScroll, MagneticButton | 3 |
| Transformation Slider | 3 |
