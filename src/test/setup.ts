import { mock } from "bun:test";

import { Window } from "happy-dom";

const window = new Window({ url: "http://localhost:3000" });

Object.assign(globalThis, {
	window,
	document: window.document,
	navigator: window.navigator,
	HTMLElement: window.HTMLElement,
	Element: window.Element,
	Node: window.Node,
	DocumentFragment: window.DocumentFragment,
	Event: window.Event,
	CustomEvent: window.CustomEvent,
	MutationObserver: window.MutationObserver,
	getComputedStyle: window.getComputedStyle.bind(window),
	requestAnimationFrame: window.requestAnimationFrame.bind(window),
	cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
});

// Mock StyleX module to avoid compile-time requirement
mock.module("@stylexjs/stylex", () => ({
	create: () => new Proxy({}, { get: () => ({}) }),
	props: (..._args: unknown[]) => ({}),
	keyframes: () => "",
	defineVars: (vars: Record<string, unknown>) => vars,
	createTheme: () => ({}),
}));

// Mock tokens.stylex to avoid StyleX defineVars error
mock.module("@/styles/tokens.stylex", () => ({
	colors: {
		primary: "#3b82f6",
		foreground: "#fff",
		background: "#000",
		muted: "#6b7280",
		mutedForeground: "#9ca3af",
		cardBorder: "#374151",
		darkBg: "#1f2937",
		success: "#22c55e",
		error: "#ef4444",
		gradientEnd: "#4f46e5",
	},
	fontSize: {
		sm: "0.875rem",
		base: "1rem",
		lg: "1.125rem",
		xl: "1.25rem",
		xxl: "1.5rem",
		xxxl: "1.875rem",
		xxxxl: "2.25rem",
		xxxxxl: "3rem",
	},
	fontWeight: {
		semibold: "600",
		bold: "700",
	},
	spacing: {
		xs: "0.25rem",
		sm: "0.5rem",
		md: "0.75rem",
		lg: "1rem",
		xl: "1.25rem",
	},
	radius: {
		sm: "0.25rem",
		md: "0.375rem",
		lg: "0.5rem",
	},
}));

// Import jest-dom matchers after mocking
import "@testing-library/jest-dom";
