# EsiFit — PROJECT_RULES.md

**Paste this file at the start of every single phase prompt, every time, with no exceptions — before the phase-specific scope.** This is the one document that prevents architectural drift as the project grows across phases and sessions.

## Non-negotiable engineering rules

1. **Never create a duplicate component.** Before writing a new UI component, search the existing codebase (and `COMPONENT_INVENTORY.md`) for something that already does this or something close enough to extend. If `Button`, `Card`, `Modal`, `Chart` wrappers, etc. already exist, use and extend them — never create `Button2`, `NewCard`, `CustomModal`.
2. **Never repeat logic.** If the same calculation, formatting, or data-transform appears in two places, extract it into a shared util/hook instead of copy-pasting.
3. **Never invent design values.** Colors, spacing, radius, shadows, typography, motion durations/easings all come from `DESIGN_BIBLE.md` and the Tailwind/token config it defines. If a needed value doesn't exist yet, add it to the token system first, then use it — don't hardcode a one-off hex code or `px` value inline.
4. **Always search the project before writing code.** Check for existing components, hooks, utils, and types before creating new ones. Assume something might already exist; verify before building.
5. **Always reuse existing components** over building visually-similar-but-technically-new ones. A second chart type only gets created if the existing chart primitives genuinely cannot represent the new data shape — not because it's slightly more convenient to start fresh.
6. **Always think like a Staff Engineer**, not like someone optimizing for finishing this one prompt fast: consider maintainability, reusability, and what the next phase will need from this code.
7. **Always write production-ready code.** No TODO-riddled scaffolding, no silently-broken edge cases, no ignoring error states — unless a placeholder is explicitly requested for something genuinely out of scope for this phase (e.g. a real backend call in a frontend-only phase, which is expected to be mocked).
8. **Always explain architectural decisions** at the end of the phase — briefly, not a wall of text — especially anything that deviates from what the phase prompt asked for and why.
9. **Always keep Lighthouse performance/accessibility/best-practices scores at 95+** on any page shipped in the phase, unless there's a documented, justified tradeoff.
10. **Always prefer maintainability over cleverness.** A slightly more verbose but obvious implementation beats a clever one-liner nobody can safely modify later.
11. **Always refactor opportunistically** when touching a file that has an obvious, low-risk improvement available — but never do large, unrelated refactors inside a phase meant to ship features; flag those as a suggestion instead.
12. **Update the living documents.** At the end of every phase: add any new components built to `COMPONENT_INVENTORY.md` (with their actual variants/props/states, not the pre-phase guess), add any new data entities/fields to `DATA_MODEL.md` if the mock data shape grew, and add any new flags used to `FEATURE_FLAGS.md`.

## What "production-ready" means here, concretely

- Every interactive element has a loading state, an error state, and an empty state — not just the happy path.
- Every form validates input and shows accessible error messages.
- Every async mock action simulates realistic latency and can fail (so failure UI actually gets exercised, not just designed and forgotten).
- No console errors or warnings in the browser on any shipped page.
- TypeScript strict mode, no `any` used to silence a type error you didn't actually resolve.

## Escalation rule

If a phase prompt's request would require breaking one of these rules (e.g. it seems to ask for a one-off component that duplicates an existing one), Claude Code should flag the conflict and propose the reuse-compliant alternative rather than silently picking one interpretation.
