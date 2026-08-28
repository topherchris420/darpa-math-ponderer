## 2025-01-20 - Adding explicit focus rings

**Learning:** Buttons removing default focus outlines without applying new ones (e.g. `focus:outline-none`) creates a significant barrier for keyboard navigation.
**Action:** Always replace `focus:outline-none` with explicit `focus-visible` ring utilities (`focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950`) to ensure consistent visual feedback across the application.