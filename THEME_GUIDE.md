# TuneZone Theme Guide

## Overview
TuneZone website has been updated with a new color scheme based on the official logo colors. The primary color has changed from cyan to blue gradient to maintain brand consistency.

## Color Palette

### Primary Colors (Blue)
- `blue-400` (#60a5fa) - Main primary color
- `blue-500` (#3b82f6) - Primary base
- `blue-600` (#2563eb) - Primary dark
- `blue-700` (#1d4ed8) - Primary darker

### Secondary Colors (Sky Blue)
- `sky-400` (#38bdf8) - Main secondary color
- `sky-500` (#0ea5e9) - Secondary base
- `sky-600` (#0284c7) - Secondary dark

### Accent Colors (Light Blue)
- `cyan-400` (#22d3ee) - Accent highlights
- `cyan-500` (#06b6d4) - Accent base
- `cyan-600` (#0891b2) - Accent dark

## Logo Usage

### New Logo Path
- Main logo: `/images/logo.png` or `/logo.png`
- Alt text: "TuneZone Logo"

### Logo Component
Use the shared Logo component for consistency:

```tsx
import Logo from '@/components/shared/Logo';

// Basic usage
<Logo />

// With custom size
<Logo size="lg" />

// Without text
<Logo showText={false} />

// Custom href
<Logo href="/custom-link" />
```

### Logo Sizes
- `sm`: 32x32px (w-8 h-8)
- `md`: 40x40px (w-10 h-10) - Default
- `lg`: 48x48px (w-12 h-12)
- `xl`: 64x64px (w-16 h-16)

## Color Migration

### Old vs New Colors
| Old (Cyan) | New (Blue) | Usage |
|------------|------------|-------|
| `cyan-400` | `blue-400` | Primary text, icons |
| `cyan-500` | `blue-500` | Primary buttons, backgrounds |
| `cyan-600` | `blue-600` | Primary hover states |
| `from-cyan-500 to-blue-500` | `from-blue-500 to-blue-600` | Primary gradients |

### Gradient Patterns
```css
/* Primary gradient */
bg-gradient-to-r from-blue-500 to-blue-600

/* Primary hover gradient */
hover:from-blue-600 hover:to-blue-700

/* Secondary gradient */
bg-gradient-to-r from-sky-400 to-blue-500

/* Text gradient */
bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent
```

## Theme Configuration

### Using Theme Config
```tsx
import { theme } from '@/config/theme';

// Access colors
const primaryColor = theme.primary[400];
const gradientClass = theme.gradients.primary;
const buttonClass = theme.button.primary;
```

### CSS Variables
Custom CSS properties are available:
```css
:root {
  --primary-400: #60a5fa;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  /* ... more variables */
}
```

## Component Updates

### Updated Components
All components have been updated to use the new blue theme:

1. **Header** - Logo and navigation
2. **Footer** - Logo and links
3. **BannerSwiper** - CTA buttons and highlights
4. **BlogSection** - Links and hover states
5. **ChooseCardoSection** - Icons and hover effects
6. **HeroSections** - Primary buttons
7. **TestimonialsStatsSection** - Icons and cards
8. **WeRecommendSection** - Product cards and buttons
9. **PageIndicator** - Navigation buttons
10. **NoticeSection** - Review interface
11. **DealerRegistration** - Form and buttons

### Button Styles
```tsx
// Primary button
className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"

// Secondary button
className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"

// Outline button
className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
```

### Hover Effects
```tsx
// Card hover
className="border border-gray-600 hover:border-blue-400/50 transition-all duration-300"

// Text hover
className="text-white hover:text-blue-400 transition-colors duration-300"

// Icon hover
className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
```

## Best Practices

### Do's
✅ Use the Logo component for all logo instances
✅ Use theme config for consistent colors
✅ Apply gradients for primary actions
✅ Use hover effects for interactive elements
✅ Maintain consistent transition durations (300ms)

### Don'ts
❌ Don't use cyan colors anymore
❌ Don't hardcode logo paths
❌ Don't mix old and new color schemes
❌ Don't forget hover states
❌ Don't use inconsistent gradient directions

## Animation Guidelines

### Transitions
- Standard duration: `300ms`
- Easing: `ease` or `cubic-bezier(0.4, 0, 0.2, 1)`
- Transform scale: `1.05` for hover effects

### Hover Effects
```tsx
// Scale transform
className="transform hover:scale-105 transition-transform duration-300"

// Color transition
className="transition-colors duration-300"

// All properties
className="transition-all duration-300"
```

## Accessibility

### Color Contrast
All new colors maintain WCAG AA compliance:
- Blue-400 on dark backgrounds: ✅ Pass
- Blue-600 on white backgrounds: ✅ Pass
- Gradient text on dark backgrounds: ✅ Pass

### Focus States
```tsx
className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
```

## Testing

### Browser Support
- Chrome: ✅ Tested
- Firefox: ✅ Tested  
- Safari: ✅ Tested
- Edge: ✅ Tested

### Responsive Design
All components are tested across:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## Future Updates

### Maintenance
- Monitor brand consistency across all pages
- Update any new components to use theme config
- Regular accessibility audits
- Performance optimization for gradients

### Extensibility
The theme system is designed to be easily extensible:
- Add new color variants in `theme.ts`
- Create new gradient combinations
- Extend CSS variables as needed
- Add new component-specific themes
