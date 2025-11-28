# StyleX Migration Guide

Migrate CSS modules or legacy styles to StyleX.

## Table of Contents

- [Migration Workflow](#migration-workflow)
- [File Naming](#file-naming)
- [CSS to StyleX Mapping](#css-to-stylex-mapping)
- [Validation Checklist](#validation-checklist)

## Migration Workflow

1. Read source component and identify all CSS classes
2. Convert shorthand properties to longhand (see [CONSTRAINTS.md](./CONSTRAINTS.md))
3. Move keyframes to component file
4. Import tokens from `src/styles/tokens.stylex.ts`
5. Apply styles with `stylex.props()` spread syntax
6. Run `bun run build` to verify
7. Test all interactive states

## File Naming

**Use kebab-case for all files** to prevent git conflicts on case-insensitive systems.

```
# WRONG
ClockApp.tsx
FractalExplorer.tsx

# CORRECT
clock-app.tsx
fractal-explorer.tsx
```

## CSS to StyleX Mapping

### Basic Properties

| CSS | StyleX |
|-----|--------|
| `class="container"` | `{...stylex.props(styles.container)}` |
| `className={cn(...)}` | `{...stylex.props(styles.a, condition && styles.b)}` |
| `style={{ color }}` | `style={{ color }}` (keep for dynamic) |

### Selectors

| CSS | StyleX |
|-----|--------|
| `.btn:hover` | `':hover': { ... }` |
| `.btn:active` | `':active': { ... }` |
| `.btn:focus` | `':focus': { ... }` |
| `.btn:disabled` | `':disabled': { ... }` |
| `@media (max-width: 768px)` | `'@media (max-width: 768px)': { ... }` |

### Example Migration

**Before (CSS Module)**:
```css
.card {
  background: #1a1a2e;
  border: 1px solid #2a2a4e;
  border-radius: 12px;
  padding: 16px 24px;
}

.card:hover {
  border-color: #6366f1;
}

@media (max-width: 768px) {
  .card {
    padding: 12px 16px;
  }
}
```

**After (StyleX)**:
```typescript
const styles = stylex.create({
  card: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#2a2a4e',
    borderRadius: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    ':hover': {
      borderColor: '#6366f1',
    },
    '@media (max-width: 768px)': {
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
});
```

## Validation Checklist

After migration, verify:

- [ ] `bun run build` completes without StyleX errors
- [ ] Component renders correctly in dev server
- [ ] Hover states work
- [ ] Focus states work (keyboard navigation)
- [ ] Active states work
- [ ] Animations play correctly
- [ ] Responsive breakpoints apply
- [ ] No console warnings
