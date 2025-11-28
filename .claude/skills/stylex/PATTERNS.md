# StyleX Patterns

Common styling patterns for this project.

## Table of Contents

- [Basic Styles](#basic-styles)
- [Conditional Styles](#conditional-styles)
- [Pseudo-classes](#pseudo-classes)
- [Media Queries](#media-queries)
- [Animations](#animations)
- [Dynamic Values](#dynamic-values)

## Basic Styles

```typescript
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    gap: 8,
  },
});

<div {...stylex.props(styles.container)} />
```

## Conditional Styles

```typescript
const styles = stylex.create({
  base: { padding: 16 },
  active: { backgroundColor: '#2a2a4e' },
  primary: { color: '#6366f1' },
});

<div {...stylex.props(
  styles.base,
  isActive && styles.active,
  variant === 'primary' && styles.primary
)} />
```

## Pseudo-classes

```typescript
const styles = stylex.create({
  button: {
    backgroundColor: '#1a1a2e',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#2a2a4e',
    },
    ':active': {
      transform: 'scale(0.98)',
    },
    ':focus': {
      outline: '2px solid #6366f1',
      outlineOffset: 2,
    },
  },
});
```

## Media Queries

```typescript
const styles = stylex.create({
  container: {
    padding: 32,
    fontSize: 16,
    '@media (max-width: 768px)': {
      padding: 16,
      fontSize: 14,
    },
    '@media (max-width: 480px)': {
      padding: 8,
      fontSize: 12,
    },
  },
});
```

## Animations

Keyframes must be defined in the same file:

```typescript
const fadeIn = stylex.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const spin = stylex.keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const styles = stylex.create({
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '0.3s',
    animationTimingFunction: 'ease-out',
  },
  spinner: {
    animationName: spin,
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
});
```

## Dynamic Values

For runtime-computed values, use inline style:

```typescript
const styles = stylex.create({
  box: {
    backgroundColor: '#1a1a2e',
    transition: 'all 0.2s ease',
  },
});

// Dynamic width/height
<div
  {...stylex.props(styles.box)}
  style={{
    width: `${dynamicWidth}px`,
    height: `${dynamicHeight}px`,
  }}
/>

// Dynamic transform
<div
  {...stylex.props(styles.box)}
  style={{
    transform: `rotate(${angle}deg) scale(${scale})`,
  }}
/>
```

## Using Design Tokens

```typescript
import { colors, spacing } from '../styles/tokens.stylex';

const styles = stylex.create({
  card: {
    backgroundColor: colors.cardBg,
    borderColor: colors.cardBorder,
    padding: spacing.md,
  },
});
```
