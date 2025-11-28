import * as stylex from "@stylexjs/stylex";

// Media query for light mode
const LIGHT = "@media (prefers-color-scheme: light)";

// Design tokens - Game-inspired sharp design
// Default: dark theme, Light theme via prefers-color-scheme
export const colors = stylex.defineVars({
	background: {
		default: "#09090b",
		[LIGHT]: "#fafafa",
	},
	foreground: {
		default: "#fafafa",
		[LIGHT]: "#09090b",
	},
	// Amber/Gold accent - game-inspired
	primary: {
		default: "#f59e0b",
		[LIGHT]: "#d97706",
	},
	primaryHover: {
		default: "#fbbf24",
		[LIGHT]: "#f59e0b",
	},
	cardBg: {
		default: "#18181b",
		[LIGHT]: "#ffffff",
	},
	cardBorder: {
		default: "#27272a",
		[LIGHT]: "#e4e4e7",
	},
	success: "#22c55e",
	warning: "#f59e0b",
	error: "#ef4444",
	muted: {
		default: "#a1a1aa",
		[LIGHT]: "#71717a",
	},
	mutedForeground: {
		default: "#52525b",
		[LIGHT]: "#a1a1aa",
	},
	darkBg: {
		default: "#09090b",
		[LIGHT]: "#f4f4f5",
	},
	gradientStart: {
		default: "#18181b",
		[LIGHT]: "#ffffff",
	},
	gradientEnd: {
		default: "#27272a",
		[LIGHT]: "#f4f4f5",
	},
	// Secondary accent
	accent: {
		default: "#fafafa",
		[LIGHT]: "#18181b",
	},
});

export const spacing = stylex.defineVars({
	xs: "0.25rem",
	sm: "0.5rem",
	md: "0.75rem",
	lg: "1rem",
	xl: "1.5rem",
	xxl: "2rem",
	xxxl: "3rem",
});

export const radius = stylex.defineVars({
	sm: "2px",
	md: "4px",
	lg: "6px",
	xl: "8px",
	full: "50%",
});

export const fontSize = stylex.defineVars({
	xs: "0.75rem",
	sm: "0.85rem",
	base: "0.9rem",
	md: "0.95rem",
	lg: "1.1rem",
	xl: "1.2rem",
	xxl: "1.5rem",
	xxxl: "2rem",
	xxxxl: "2.5rem",
	xxxxxl: "3rem",
});

export const fontWeight = stylex.defineVars({
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
});

// NOTE: keyframes cannot be exported and imported across files in StyleX.
// They must be defined in the same file where they're used.
// Define keyframes locally in each component that needs them.
