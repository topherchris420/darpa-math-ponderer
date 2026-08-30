## 2024-05-18 - Range Input Accessibility
**Learning:** React elements like `<input type="range" />` in dynamic UI elements need programmatic connection to text via `aria-label` or `aria-labelledby` for screen reader users to understand their context, especially when visual labels are dynamically generated.
**Action:** Always ensure that range inputs, especially in repeating lists, have an explicit `aria-label` or `aria-labelledby`.
