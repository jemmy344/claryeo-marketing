## 2026-03-30 - Toggle Buttons Accessibility State
**Learning:** Toggle button controls (such as Monthly/Annual billing interval switchers) using standard `<button>` tags without ARIA attributes fail to convey selected/pressed state to screen reader users. Adding `aria-pressed={boolean}` explicitly communicates active selection state to assistive technology.
**Action:** When building custom toggle controls or mode switchers, always include `aria-pressed` or appropriate ARIA toggle attributes (`aria-selected`, `aria-checked`).

## 2026-08-22 - Accordion headers and icon button accessibility in interactive islands
**Learning:** Custom collapsible section triggers (such as group summary headers in complex interactive tools) and icon-only action buttons (such as line item removal icons) missing `aria-expanded` and descriptive `aria-label` attributes leave screen reader users unaware of toggle state or button purpose.
**Action:** Always provide `aria-expanded={isOpen}` on collapsible section trigger buttons and contextual `aria-label` attributes on icon-only buttons.
