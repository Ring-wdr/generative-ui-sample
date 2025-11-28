# StyleX Constraints

Limitations and required workarounds for StyleX.

## Table of Contents

- [No Shorthand Properties](#no-shorthand-properties)
- [Keyframes Scope](#keyframes-scope)
- [String vs Number Values](#string-vs-number-values)

## No Shorthand Properties

StyleX does not support CSS shorthand. Always use longhand properties.

### Border

```typescript
// WRONG
border: '1px solid #2a2a4e'

// CORRECT
borderWidth: 1,
borderStyle: 'solid',
borderColor: '#2a2a4e',

// Border radius (single value OK)
borderRadius: 8,

// Different radii
borderTopLeftRadius: 8,
borderTopRightRadius: 8,
borderBottomLeftRadius: 0,
borderBottomRightRadius: 0,
```

### Background

```typescript
// WRONG
background: '#1a1a2e'
background: 'linear-gradient(to right, #1a1a2e, #2a2a4e)'

// CORRECT
backgroundColor: '#1a1a2e',

// For gradients
backgroundImage: 'linear-gradient(to right, #1a1a2e, #2a2a4e)',
```

### Margin and Padding

```typescript
// Single value (OK)
margin: 16,
padding: 16,

// WRONG - multiple values
margin: '10px 20px'
padding: '10px 20px 30px 40px'

// CORRECT - explicit properties
marginTop: 10,
marginBottom: 10,
marginLeft: 20,
marginRight: 20,

// Or use marginBlock/marginInline
marginBlock: 10,   // top + bottom
marginInline: 20,  // left + right
```

### Outline

```typescript
// WRONG
outline: '2px solid #6366f1'

// CORRECT
outlineWidth: 2,
outlineStyle: 'solid',
outlineColor: '#6366f1',
outlineOffset: 2,
```

### Flex

```typescript
// WRONG
flex: '1 1 auto'

// CORRECT
flexGrow: 1,
flexShrink: 1,
flexBasis: 'auto',
```

## Keyframes Scope

`stylex.keyframes()` cannot be exported or imported. Must be defined in the same file where used.

```typescript
// tokens.stylex.ts - CANNOT export keyframes
export const fadeIn = stylex.keyframes({...}); // WRONG

// component.tsx - Define locally
const fadeIn = stylex.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const styles = stylex.create({
  animated: {
    animationName: fadeIn,
    animationDuration: '0.3s',
  },
});
```

### What CAN Be Shared

```typescript
// tokens.stylex.ts - defineVars works across files
export const colors = stylex.defineVars({
  primary: '#6366f1',
  background: '#0a0a0a',
});

// component.tsx
import { colors } from '@/styles/tokens.stylex';

const styles = stylex.create({
  box: {
    backgroundColor: colors.background,
  },
});
```

## String vs Number Values

```typescript
// Numbers (no unit = pixels)
padding: 16,        // 16px
fontSize: 14,       // 14px
lineHeight: 1.5,    // unitless ratio

// Strings (with units or keywords)
width: '100%',
maxWidth: '800px',
fontWeight: 'bold',
display: 'flex',
```
