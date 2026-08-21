## 2026-03-30 - Collapsible Control Accessibility
**Learning:** Custom button triggers for expandable lists or details disclosure sections must include `aria-expanded` and `aria-controls` pointing to the collapsible container ID. Without these, assistive technologies cannot inform users whether the region is expanded or controls a target section.
**Action:** Always add `aria-expanded={boolean}`, `aria-controls={containerId}`, and `focus-visible:ring-2` focus indicators to disclosure buttons.

## 2026-03-30 - Toggle Buttons Accessibility State
**Learning:** Toggle button controls (such as Monthly/Annual billing interval switchers) using standard `<button>` tags without ARIA attributes fail to convey selected/pressed state to screen reader users. Adding `aria-pressed={boolean}` explicitly communicates active selection state to assistive technology.
**Action:** When building custom toggle controls or mode switchers, always include `aria-pressed` or appropriate ARIA toggle attributes (`aria-selected`, `aria-checked`).
