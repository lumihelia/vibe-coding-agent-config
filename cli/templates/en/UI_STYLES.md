# UI DESIGN STYLES (Design System)

> Define your project's visual style. Agent will follow these settings when generating frontend code.

---

## How to Use This Template

1. **Choose a theme**: Pick from preset themes below, or define your own
2. **Fill in brand colors**: Replace `[YOUR_xxx]` with your color values
3. **Choose fonts**: Select serif or sans-serif based on project style
4. **Tell Agent**: "Please follow the design style in .agent/UI_STYLES.md"

---

## Step 1: Choose Your Theme

> **Pick one theme by uncommenting it, or fill in custom values**

```css
:root {
  /* ================================================
     Theme Options (uncomment one, or fill custom values)
     ================================================ */

  /* ------ Option A: Warm Tones (friendly, approachable) ------ */
  /*
  --primary-color: #E07B54;
  --primary-hover: #C96842;
  --accent-color: #D4A574;
  --background-color: #FDF8F3;
  --text-color: #3D3D3D;
  */

  /* ------ Option B: Cool Tones (professional, modern) ------ */
  /*
  --primary-color: #4C436F;
  --primary-hover: #3A3457;
  --accent-color: #6B5B8A;
  --background-color: #F4F3F7;
  --text-color: #2C2C2C;
  */

  /* ------ Option C: Natural Tones (fresh, organic) ------ */
  /*
  --primary-color: #5B8C5A;
  --primary-hover: #4A7349;
  --accent-color: #8FBC8F;
  --background-color: #F5F9F4;
  --text-color: #2D3A2D;
  */

  /* ------ Option D: Custom (fill in your brand colors) ------ */
  --primary-color: [YOUR_PRIMARY];        /* Main color for buttons, links */
  --primary-hover: [YOUR_PRIMARY_DARK];   /* Darker version for hover */
  --accent-color: [YOUR_ACCENT];          /* Accent for highlights */
  --background-color: [YOUR_BG];          /* Page background */
  --text-color: [YOUR_TEXT];              /* Main text color */


  /* ================================================
     Common Settings (usually don't need to change)
     ================================================ */

  /* Supporting colors */
  --input-bg: #FFFFFF;
  --white: #FFFFFF;
  --border-color: #E0E0E0;
  --placeholder-color: #9E9E9E;
  --muted-color: #757575;

  /* Status colors */
  --success-color: #4CAF50;
  --warning-color: #FF9800;
  --error-color: #F44336;
  --info-color: #2196F3;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

---

## Step 2: Choose Font Style

> **Uncomment your chosen font scheme**

```html
<!-- Option A: Elegant Serif (for content-focused, editorial style) -->
<!--
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Serif+Pro:wght@300;400;500;600&display=swap" rel="stylesheet">
-->

<!-- Option B: Modern Sans-serif (for SaaS, tech products) -->
<!--
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
-->

<!-- Option C: Rounded Friendly (for consumer products, approachable) -->
<!--
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
-->
```

```css
/* ================================================
   Font Settings (uncomment one)
   ================================================ */

/* ------ Option A: Elegant Serif ------ */
/*
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}
body, p, span, div {
  font-family: 'Source Serif Pro', serif;
  font-weight: 400;
  line-height: 1.6;
}
*/

/* ------ Option B: Modern Sans-serif ------ */
/*
h1, h2, h3, h4, h5, h6,
body, p, span, div {
  font-family: 'Inter', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
}
body, p, span, div {
  font-weight: 400;
  line-height: 1.5;
}
*/

/* ------ Option C: Rounded Friendly ------ */
/*
h1, h2, h3, h4, h5, h6,
body, p, span, div {
  font-family: 'Nunito', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
}
body, p, span, div {
  font-weight: 400;
  line-height: 1.6;
}
*/

/* Code font (universal) */
code, pre {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
```

---

## Step 3: Dark Mode (Optional)

If your project needs dark mode support:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #1A1A1A;
    --text-color: #E5E5E5;
    --input-bg: #2D2D2D;
    --white: #2D2D2D;
    --border-color: #404040;
    --placeholder-color: #808080;
    --muted-color: #A0A0A0;

    /* Keep primary color or slightly brighten */
    /* --primary-color: [slightly brighter version]; */
  }
}
```

---

## Component Style Reference

These component styles automatically adapt to your chosen variables:

### Buttons

```css
.button {
  background: var(--primary-color);
  color: var(--white);
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.button:hover {
  background: var(--primary-hover);
}

.button-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 1px solid var(--border-color);
}

.button-secondary:hover {
  background: var(--background-color);
}
```

### Cards

```css
.card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-md);
}
```

### Inputs

```css
.input {
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.input::placeholder {
  color: var(--placeholder-color);
}
```

---

## Spacing System

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
}
```

---

## Agent Execution Rules

When generating frontend code, Agent must:

1. **Use CSS variables** - Always use `var(--primary-color)` instead of hardcoded colors
2. **Stay consistent** - All components use same border-radius, spacing variables
3. **Mobile-first** - Default support for mobile (min-width media queries)
4. **Accessible** - Ensure color contrast at least 4.5:1, clickable elements at least 44x44px

---

## Quick Reference

| Use Case | Variable |
|----------|----------|
| Primary button background | `var(--primary-color)` |
| Button hover | `var(--primary-hover)` |
| Page background | `var(--background-color)` |
| Card background | `var(--white)` |
| Main text | `var(--text-color)` |
| Secondary text | `var(--muted-color)` |
| Borders | `var(--border-color)` |
| Success state | `var(--success-color)` |
| Error state | `var(--error-color)` |
