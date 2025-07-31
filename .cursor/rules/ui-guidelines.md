---
description: ui guidelines
  - "**/*"
alwaysApply: true
---

# UI Guidelines – Southeast Mobile

## 1 · Colour System

| Role | Token Name | HEX | Usage Examples |
|------|------------|-----|----------------|
| **Background**        | `$background` | **#F5FAFF** | Full-screen page background |
| **Surface / Card**    | `$surface`    | #FFFFFF | Cards, panels, modals |
| **Primary / Brand**   | `$primary`    | #0F4C81 | Primary buttons, selected state |
| **Secondary / Accent**| `$secondary`  | #4FB3BF | Accent elements, refresh indicator |
| **Success**           | `$success`    | #2E8B57 | Valid data banners or callouts |
| **Warning**           | `$warning`    | #D89E00 | Potential data gaps or cautions |
| **Error / Destructive**| `$error`    | #C0392B | API errors, destructive actions |
| **Muted Text**        | `$muted`      | #6B7280 | Labels, helper text, disabled state |

*Accessibility:* All text on `$background` and `$surface` must meet WCAG AA standards. Color pairings must pass minimum contrast requirements.

---

## 2 · Typography

| Style   | Size | Weight   | Use                       |
|---------|------|----------|---------------------------|
| **H1**  | 24 px| Bold     | District or screen titles |
| **H2**  | 20 px| Semibold | Section headers           |
| **H3**  | 18 px| Medium   | Sub-headers               |
| **Body**| 16 px| Regular  | General copy              |
| **Caption**|14 px| Regular, `$muted` | Secondary data, last updated info |

*Font family:* **Inter** (fallback: system default sans-serif). Default line heights. Text scales responsively via system font settings.

---

## 3 · Layout & Spacing

- Base unit: **4-pt** grid
- Outer page padding: **16 px**
- Component radius: **8 px**
- Cards and panels: subtle shadow (1–2 px blur)
- Columns & rows should be touch-safe and maintain vertical rhythm at increased font sizes

---

## 4 · Components

| Component | Visual Guidelines |
|-----------|-------------------|
| **Buttons** | • Primary: `$primary` background, `$surface` text<br>• Secondary: bordered with `$primary`<br>• Destructive: `$error` background<br>• Min height: 44 px<br>• Radius: 8 px<br>• Padding: 12px vertical, 24px horizontal |
| **Cards / Panels** | `$surface` fill, radius 8 px, shadow, internal padding 16 px |
| **Inputs** | (rarely used) – styled with `$surface`, bordered with `$primary` or `$error`, focused state outlined |
| **Text Blocks** | Default to 16 px, scale with system text settings; avoid fixed heights for data views |
| **Icons** | Use Lucide set; 20–24 px sizing; match surrounding text color |

---

## 5 · Mobile & Accessibility

- Minimum touch target: **44 × 44 dp**
- Fully responsive layout for **mobile phones only**
- Support **system font scaling** (especially large text)
- Apply `accessibilityLabel` and `accessibilityRole` where appropriate
- Ensure primary interaction remains possible **offline**
- No interaction should result in a blank or broken state if connectivity is lost

---

## 6 · Theming & Future Proofing

- Token system is flexible for seasonal/alternate color palettes
- Dark mode can be introduced by overriding current tokens under the same names
- Future theme switching support can be enabled via Gluestack’s theme layer or Tailwind’s `dark:` variants