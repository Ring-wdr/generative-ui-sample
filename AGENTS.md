# AGENTS.md

You are an expert in JavaScript, Rsbuild, StyleX, and web application development. You write maintainable, performant, and accessible code.

## Commands

- `bun run dev` - Start the dev server
- `bun run build` - Build the app for production
- `bun run preview` - Preview the production build locally

## Docs

- Rsbuild: https://rsbuild.rs/llms.txt
- Rspack: https://rspack.rs/llms.txt
- StyleX: https://stylexjs.com/docs/learn/

## StyleX Guidelines

This project uses StyleX for CSS-in-JS styling. Follow these rules:

### File Structure

- `src/styles/tokens.stylex.ts` - Design tokens using `stylex.defineVars()`
- Component styles defined with `stylex.create()` in each component file

### Critical Rules

1. **No Shorthand Properties**: StyleX does not support CSS shorthand properties
   ```typescript
   // BAD
   margin: "10px 20px"
   padding: "10px 20px 30px"
   border: "1px solid red"
   background: "linear-gradient(...)"

   // GOOD
   marginTop: 10,
   marginBottom: 10,
   marginLeft: 20,
   marginRight: 20,
   borderWidth: 1,
   borderStyle: "solid",
   borderColor: "red",
   backgroundImage: "linear-gradient(...)"
   ```

2. **Keyframes Cannot Be Shared Across Files**: `stylex.keyframes()` must be defined in the same file where it's used. It cannot be exported and imported from another file.
   ```typescript
   // BAD - tokens.stylex.ts
   export const spinKeyframes = stylex.keyframes({...}); // Cannot export

   // GOOD - component.tsx (define locally)
   const spinKeyframes = stylex.keyframes({
     "0%": { transform: "rotate(0deg)" },
     "100%": { transform: "rotate(360deg)" },
   });
   ```

3. **Design Tokens Can Be Shared**: `stylex.defineVars()` works across files
   ```typescript
   // tokens.stylex.ts
   export const colors = stylex.defineVars({
     primary: "#6366f1",
     background: "#0a0a0a",
   });

   // component.tsx
   import { colors } from "../styles/tokens.stylex";
   const styles = stylex.create({
     container: {
       backgroundColor: colors.background, // Works fine
     },
   });
   ```

4. **Apply Styles with stylex.props()**: Use spread syntax
   ```tsx
   <div {...stylex.props(styles.container, isActive && styles.active)} />
   ```

### StyleX vs Regular CSS

| Feature | StyleX | Regular CSS |
|---------|--------|-------------|
| `defineVars()` | Cross-file OK | N/A |
| `keyframes()` | Same file only | Cross-file OK |
| `create()` | Same file only | N/A |
