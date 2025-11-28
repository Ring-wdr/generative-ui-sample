import * as stylex from "@stylexjs/stylex";

import { colors, radius, spacing } from "./tokens.stylex";

// 공통으로 사용되는 gradient 스타일
export const gradients = stylex.create({
	primary: {
		backgroundImage: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
	},
	primaryText: {
		backgroundImage: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
		backgroundClip: "text",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
	},
	card: {
		backgroundImage: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
	},
	cardHover: {
		backgroundImage: "linear-gradient(135deg, #1e1e3f 0%, #2a2a4e 100%)",
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
