import * as stylex from "@stylexjs/stylex";

import { colors, radius, spacing } from "./tokens.stylex";

// Media query for light mode
const LIGHT = "@media (prefers-color-scheme: light)";

// 공통으로 사용되는 gradient 스타일 - Game-inspired flat design
export const gradients = stylex.create({
	primary: {
		backgroundImage: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
	},
	primaryText: {
		color: colors.primary,
	},
	card: {
		backgroundColor: colors.cardBg,
	},
	cardHover: {
		backgroundColor: {
			default: "#1f1f23",
			[LIGHT]: "#f4f4f5",
		},
	},
});

// 공통 카드 스타일
export const cardStyles = stylex.create({
	base: {
		backgroundColor: colors.cardBg,
		borderRadius: radius.lg,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
	},
	padded: {
		padding: spacing.xl,
	},
	interactive: {
		cursor: "pointer",
		transition: "all 0.2s",
		":hover": {
			borderColor: colors.primary,
		},
	},
});

// 공통 레이아웃 스타일
export const layoutStyles = stylex.create({
	centerFlex: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	columnFlex: {
		display: "flex",
		flexDirection: "column",
	},
	grid: {
		display: "grid",
	},
});
