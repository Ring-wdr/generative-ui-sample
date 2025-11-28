import * as stylex from "@stylexjs/stylex";

// Media query for light mode
const LIGHT = "@media (prefers-color-scheme: light)";

// Design tokens as CSS variables using defineVars
// Default: dark theme, Light theme via prefers-color-scheme
export const colors = stylex.defineVars({
	background: {
		default: "#0a0a0a",
		[LIGHT]: "#ffffff",
	},
	foreground: {
		default: "#ededed",
		[LIGHT]: "#171717",
	},
	primary: {
		default: "#6366f1",
		[LIGHT]: "#4f46e5",
	},
	primaryHover: {
		default: "#818cf8",
		[LIGHT]: "#6366f1",
	},
	cardBg: {
		default: "#1a1a2e",
		[LIGHT]: "#f8fafc",
	},
	cardBorder: {
		default: "#2a2a4e",
		[LIGHT]: "#e2e8f0",
	},
	success: "#22c55e",
	warning: "#f59e0b",
	error: "#ef4444",
	muted: {
		default: "#a1a1aa",
		[LIGHT]: "#71717a",
	},
	mutedForeground: {
		default: "#71717a",
		[LIGHT]: "#a1a1aa",
	},
	darkBg: {
		default: "#0a0a0a",
		[LIGHT]: "#f1f5f9",
	},
	gradientStart: {
		default: "#1a1a2e",
		[LIGHT]: "#f8fafc",
	},
	gradientEnd: {
		default: "#16213e",
		[LIGHT]: "#e2e8f0",
	},
	purple: "#a855f7",
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
	sm: "4px",
	md: "8px",
	lg: "12px",
	xl: "16px",
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
