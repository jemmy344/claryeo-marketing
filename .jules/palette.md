## 2026-03-30 - Dynamic Line Item Delete Button Accessibility
**Learning:** Icon-only remove/delete buttons inside dynamic line item lists fail to communicate which item is being deleted to screen readers if unlabelled. Constructing dynamic `aria-label={`Remove ${item.label.trim() || 'line item'}`}` ensures screen reader users receive specific context on action target.
**Action:** Always provide dynamic `aria-label` attributes on icon-only list/table action buttons that reference the item's label or identifier.

## 2026-03-30 - Toggle Buttons Accessibility State
**Learning:** Toggle button controls (such as Monthly/Annual billing interval switchers) using standard `<button>` tags without ARIA attributes fail to convey selected/pressed state to screen reader users. Adding `aria-pressed={boolean}` explicitly communicates active selection state to assistive technology.
**Action:** When building custom toggle controls or mode switchers, always include `aria-pressed` or appropriate ARIA toggle attributes (`aria-selected`, `aria-checked`).
