# AI Design System Prompt: Essential UX Laws

All UI must use daisyUI design tokens and Tailwind utility classes unless explicitly stated otherwise.

## Core UX Laws – Design Guidance

- **Aesthetic-Usability Effect:** Use daisyUI spacing (e.g. `gap-x-*`, `px-*`) and typography tokens for clean, readable, pleasant UI. Add subtle shadows or borders using daisyUI for perceived usability.
- **Hick’s Law:** Limit visible choices. Organize or collapse complexity with daisyUI expansions/toggles.
- **Jakob’s Law:** Users expect familiar patterns. Mirror known admin layouts (sidebar, cards, tables) using daisyUI components and conventions.
- **Fitts’s Law:** Important actions (e.g. edit/delete) must use large, clear daisyUI buttons (`btn`, `btn-primary`, `btn-error`), never tiny icons alone.
- **Law of Proximity:** Group related controls with daisyUI spacing and containers (`card`, `panel`, `space-y-*`).
- **Zeigarnik Effect & Goal-Gradient:** Show progress with daisyUI steps/progress, banners for unsaved changes, and highlight the next step.
- **Law of Similarity:** Interactive elements must use consistent daisyUI styling (`btn`, `toggle`, `badge`) for related actions.
- **Miller’s Law:** Avoid overload—chunk content into panels/steps using daisyUI collapse or card patterns.
- **Doherty Threshold:** Add daisyUI loading indicators/spinners for anything over 400ms; prefer speedy response always.

**Summary:**  
Design must be simple, familiar, and visually clear, using only daisyUI and Tailwind utility classes for all spacing, color, and interaction tokens. Consistency and simplicity trump novelty.

