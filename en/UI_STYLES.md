# UI STYLES (Design System)

> Define your project's visual style. Agent will follow these settings when generating frontend code.

---

## ⚠️ Customization Guide

This is a **template file**. Modify the settings below to match your project needs.

You can:

- Change colors to match your brand
- Swap fonts to fit your design style
- Adjust spacing and border-radius to change the overall feel

---

## COLOR PALETTE

> **👇 Modify here**: Replace with the colors your project needs

```css
/* ====================================================
   🎨 UI STYLE CONFIG (Customizable)
   ====================================================
   
   This is the default warm, sunny theme. You can:
   - Copy the entire :root block to your CSS file
   - Modify any color values to match your brand
   
   ==================================================== */

:root {
  /* Primary Text */
  --text-color: #3D3D3D;           /* Warm charcoal gray */
  
  /* Primary Colors */
  --primary-color: #E07B54;        /* Warm coral orange */
  --primary-hover: #C96842;        /* Darker on hover */
  
  /* Background Colors */
  --background-color: #FDF8F3;     /* Cream white */
  --input-bg: #FFFBF7;             /* Input background */
  --white: #FFFFFF;                /* Card background */
  
  /* Borders and Secondary Colors */
  --border-color: #E8DDD4;         /* Warm beige border */
  --placeholder-color: #B8A99A;    /* Placeholder text */
  --muted-color: #9A8B7A;          /* Secondary text */
  --accent-color: #D4A574;         /* Golden amber accent */
  
  /* Extra Colors (Optional) */
  --success-color: #7CB587;        /* Soft green */
  --warning-color: #E9B44C;        /* Sunny yellow */
  --info-color: #6BB3D9;           /* Sky blue */
  
  /* Shadow */
  --shadow: rgba(224, 123, 84, 0.1);
  
  /* Border Radius */
  --border-radius: 12px;
}
```

### Alternative: Dark Mode

If you need a dark theme, replace with:

```css
:root {
  --text-color: #F5EDE6;
  --primary-color: #E8956E;
  --primary-hover: #F0A882;
  --background-color: #2A2520;
  --input-bg: #353029;
  --white: #3D3732;
  --border-color: #524A42;
  --placeholder-color: #8A7D70;
  --muted-color: #A69888;
  --accent-color: #DEB887;
  --shadow: rgba(0, 0, 0, 0.3);
  --border-radius: 12px;
}
```

---

## TYPOGRAPHY

> **👇 Modify here**: Choose fonts that fit your project

```html
<!-- Add Google Fonts in HTML <head> -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Serif+Pro:wght@300;400;500;600&display=swap" rel="stylesheet">
```

```css
/* Headings: Elegant serif */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}

/* Body: Clean serif */
body, p, span, div {
  font-family: 'Source Serif Pro', serif;
  font-weight: 400;
  line-height: 1.6;
}

/* Code: Monospace */
code, pre {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Alternative: Modern Sans-serif

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

body, p, span, div {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}
```

---

## COMPONENT STYLES

### Buttons

```css
.button {
  background: var(--primary-color);
  color: var(--white);
  padding: 12px 24px;
  border-radius: var(--border-radius);
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
```

### Cards

```css
.card {
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: 0 2px 8px var(--shadow);
}
```

### Input Fields

```css
.input {
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  width: 100%;
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

## SPACING SYSTEM

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

## HOW TO USE

1. **Copy to your project**: Place this file at `.agent/UI_STYLES.md`
2. **Modify settings**: Adjust colors and fonts to match your brand
3. **Tell Agent**: At conversation start, say "Please refer to .agent/UI_STYLES.md for design style"
4. **Iterate**: Modify this file anytime to update the style

---

## AGENT EXECUTION RULES

When generating frontend code:

1. **Use CSS variables**: Prefer `var(--primary-color)` over hardcoded colors
2. **Stay consistent**: All components follow the same border-radius, spacing
3. **Responsive design**: Support mobile by default
4. **Accessibility**: Ensure sufficient contrast, appropriate font sizes
