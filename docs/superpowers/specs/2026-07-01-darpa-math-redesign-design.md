# DARPA Math Ponderer Redesign Design

Date: 2026-07-01
Status: Approved visual direction, ready for implementation planning

## Goal

Redesign DARPA Math Ponderer so it no longer reads as a generic AI-generated shadcn site. The app should feel like a premium mathematical research instrument: credible, precise, visually memorable, and still usable as a real conjecture workspace.

The redesign should preserve existing product behavior while changing the surface quality: hierarchy, typography, layout rhythm, interaction polish, and route reliability.

## Reference Direction

The user requested Webflow Made in Webflow references. The chosen direction combines:

- Editorial product-site composition from premium Webflow product/agency references: large type, sparse copy, asymmetrical layout, stronger first-viewport identity.
- Interaction polish from Webflow motion examples: restrained underlay/active navigation, subtle line movement, console state transitions, and hover states that clarify structure.
- High-credibility research-product tone: less decorative glow, fewer generic icon tiles, more apparatus-like modules and evidence-first language.

Avoid copying any specific Webflow template. Use the gallery as a quality bar for composition, spacing, visual confidence, and motion restraint.

## Design Principle

The product is a mathematical instrument, not a math-themed screensaver.

Every visual choice should imply rigor:

- Claims are conjectures until tested.
- Evidence, assumptions, proof plans, and counterexample search are first-class objects.
- The THINK mode is ambient but subordinate to the workspace.
- Visual drama should come from structure and interaction, not from generic neon decoration.

## Visual System

Palette:

- Deep ink background, close to black but not flat.
- Warm off-white foreground for long reading comfort.
- Signal cyan for primary action and live system status.
- Acid lime for validation/success states.
- Amber for warnings, unresolved proof work, and uncertainty.
- Muted graphite borders and panels.

Typography:

- Keep system fonts unless a font is already available; do not add dependencies.
- Use large editorial type on the homepage.
- Use compact, dense type inside workspace panels.
- Keep letter spacing at zero except small uppercase metadata labels where existing design already relies on tracking.

Shape and surfaces:

- Reduce nested cards.
- Prefer full-width bands, editorial columns, and instrument panels.
- Keep individual cards only for conjectures, saved runs, and repeated evidence/check items.
- Use 8px radius or less.

Icons:

- Use lucide icons sparingly.
- Avoid one-icon-per-card filler.
- Prefer icons where they clarify a tool, state, or command.

## Homepage

The homepage should become a product-grade first screen with an immediately recognizable object: a live mathematical console/workbench.

Structure:

- Sticky header with compact identity, underlay-style active nav treatment, and one clear "New run" action.
- First viewport: editorial hero copy on one side and an interactive research apparatus on the other.
- The apparatus should show a live query, a conjecture preview, evidence labels, and proof/counterexample status.
- Keep a question input and example prompts, but make them feel like instrument controls.
- The next section should be visible below the first viewport on desktop and mobile.

Copy tone:

- Shorter, more concrete.
- Reduce phrases like "autonomous consciousness" on the homepage.
- Favor "conjecture", "assumptions", "counterexamples", "proof obligations", and "research trail".

Expected sections:

- Hero with query input and live apparatus.
- Product loop section: Ask, Conjecture, Pressure Test, Export, but rendered as a process rail rather than generic cards.
- Why it is different: evidence-first claims, saved sessions, markdown output, THINK handoff.
- CTA band with Workspace and THINK actions.

## Workspace

The workspace should feel like the actual product.

Structure:

- Keep the existing domain selector, query input, conjecture generation, validation queue, research log, save, and markdown copy behaviors.
- Redesign layout into a dense lab console:
  - Left/main column: research question, domain controls, selected conjecture.
  - Right rail: validation queue, saved runs, export state, THINK handoff.
  - Top summary strip: domain, active hypothesis count, validation score, saved run count.
- Use better information hierarchy for conjecture cards:
  - Statement first.
  - Assumptions and counterexample search as adjacent evidence groups.
  - Proof plan as ordered work.
  - Validation score as a subdued instrument reading, not a badge trophy.

Interactions:

- Domain switching should feel like changing instrument mode.
- Starter prompts should be compact controls.
- Save/copy buttons should expose clear state without layout shift.
- Empty states should be useful and specific.

## THINK Mode

Do not rebuild THINK in this pass unless required for visual consistency.

Minimum changes:

- Bring shell/header styling into alignment.
- Make THINK clearly secondary to the conjecture workspace.
- Ensure any "send to workspace" handoff remains visually obvious.

## Routing Fix

The deployed app currently uses `BrowserRouter`; direct navigation to `/collaborator` returns a Vercel 404. Add a Vercel rewrite configuration so SPA routes resolve to `index.html`.

Preferred file:

- `vercel.json`

Expected rewrite:

- Route all unmatched paths to `/index.html`.

## Implementation Constraints

- No new dependencies.
- Do not overwrite unrelated existing worktree changes.
- Prefer editing existing React/Tailwind components over adding a new design framework.
- Keep behavior intact unless the design explicitly calls for a bug fix.
- Keep the diff reviewable and reversible.
- Preserve tests for math core behavior.

## Acceptance Criteria

Visual:

- The homepage no longer resembles a default AI-generated shadcn landing page.
- The first viewport clearly communicates "mathematical research instrument".
- Cards are reduced or made purposeful.
- Navigation, buttons, forms, and repeated objects share one coherent visual system.
- Mobile layout remains polished and readable.

Functional:

- Home query input still links to the collaborator with the encoded query.
- Collaborator generation, domain switching, save run, and markdown copy still work.
- THINK route still loads.
- Direct navigation to `/collaborator` and `/infinity` works after deploy configuration.

Verification:

- Run `npm test`.
- Run TypeScript check.
- Run `npm run build`.
- Run lint if existing lint state allows it; report any pre-existing lint failures separately.
- Browser-check desktop and mobile home/workspace routes.
- Check console for runtime errors.

## Risks

- Existing local UI edits are already present in the worktree. Implementation must inspect and preserve useful user-authored changes rather than blindly replacing files.
- The app has many generated shadcn UI components. The redesign should not try to clean the entire dependency/component surface in this pass.
- Highly animated visuals could regress performance or reintroduce the "screensaver" feeling. Motion should stay subtle and informational.
