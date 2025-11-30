# AI Design System Prompt: UX Laws & Principles

## Core Design Principles

Apply these established UX laws to create intuitive, efficient interfaces:

---

### Aesthetic-Usability Effect
**Principle:** Users perceive well-designed interfaces as more usable

**Implementation:**
- Clean, consistent spacing (e.g. `gap-2`, `px-4`)
- Typography hierarchy (e.g. headings `text-lg font-semibold`)
- Visual cues like subtle shadows or border separators to improve perceived usability

---

### Hick's Law
**Principle:** Decision time increases with the number of choices

**Implementation:**
- Reduce visible options per screen
- Collapse complex filters/conditions into toggles or expandable sections
- Avoid clutter in complex settings

---

### Jakob's Law
**Principle:** Users prefer interfaces that work like ones they already know

**Implementation:**
- Match WordPress admin conventions (e.g. table lists, modals, top bar, cards, sidebars)
- Stick to familiar placement of "Add New", status toggles, and trash icons
- Follow established WP Admin patterns

---

### Fitts's Law
**Principle:** Time to acquire a target depends on distance and size

**Implementation:**
- Important actions (edit, delete) should be large, clickable buttons placed nearby
- Avoid tiny icon-only targets unless grouped and spaced (`space-x-2`)
- Make primary buttons clear and prominent

---

### Law of Proximity
**Principle:** Related items should be grouped together

**Implementation:**
- Group related controls using spacing + containers (e.g. `PanelBody`, `Card`)
- Bundle inputs related to conditions or filters visually
- Use layout components to establish relationships

---

### Zeigarnik Effect
**Principle:** People remember incomplete tasks better than completed ones

**Implementation:**
- Show progress in multi-step rule creation (stepper, breadcrumb, or "Step X of Y")
- Provide save state feedback (e.g. "Saving..." or "Unsaved changes" banners)
- Use progress indicators throughout workflows

---

### Goal-Gradient Effect
**Principle:** Motivation increases as users get closer to a goal

**Implementation:**
- Emphasize next step in workflows (highlight active step, primary button styling)
- Use progress bars or steppers to encourage completion
- Visual emphasis on progress in wizards (e.g. New Rule flow)

---

### Law of Similarity
**Principle:** Similar elements are perceived as related

**Implementation:**
- Use consistent styles for toggle switches, buttons, badges, filters
- Align icon sizing and spacing across all rows for visual rhythm
- Ensure all interactive elements share styling and layout conventions

---

### Miller's Law
**Principle:** The average person can hold 7±2 items in working memory

**Implementation:**
- Don't overload users with options; chunk rule configuration into steps/panels
- Default to collapsed sections (e.g. advanced options)
- Break complex forms into digestible pieces

---

### Doherty Threshold
**Principle:** Productivity increases when systems respond in <400ms

**Implementation:**
- Aim for sub-400ms interactions
- Use loading skeletons and optimistic UI patterns
- Implement `loading` states with spinners or shimmer placeholders

---

## Quick Reference Table

| Law | Application | Example |
|-----|-------------|---------|
| **Aesthetic Usability** | Use spacing/typography to make forms feel easier | Consistent gaps, clear hierarchy |
| **Hick's Law** | Avoid clutter; collapse complex settings | Expandable sections |
| **Jakob's Law** | Stick to familiar WP Admin patterns | Cards, sidebars, modals |
| **Fitts's Law** | Place important buttons close, large, clear | Prominent edit/delete actions |
| **Law of Proximity** | Group logic and inputs with spacing + components | `PanelBody` + layout wrappers |
| **Zeigarnik Effect** | Use progress indicators, save states | "Step 2 of 4", "Saving..." |
| **Goal-Gradient** | Emphasize progress in wizards | Highlighted active step |
| **Law of Similarity** | Ensure consistent styling across elements | Uniform toggles, selectors, filters |
| **Miller's Law** | Chunk information into digestible sections | Collapsed advanced options |
| **Doherty Threshold** | Keep interactions under 400ms | Loading states, shimmer effects |