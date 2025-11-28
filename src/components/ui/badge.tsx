import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";

import { gradients } from "@/styles/common.stylex";
import { colors, fontSize, radius, spacing } from "@/styles/tokens.stylex";

const styles = stylex.create({
	base: {
		paddingTop: spacing.xs,
		paddingBottom: spacing.xs,
		paddingLeft: spacing.md,
		paddingRight: spacing.md,
		backgroundColor: colors.cardBorder,
		borderRadius: radius.sm,
		fontSize: fontSize.xs,
		color: colors.muted,
	},
	highlight: {
		color: "white",
	},
});

interface BadgeProps {
	children: React.ReactNode;
	variant?: "default" | "highlight";
	style?: StyleXStyles;
}

export function Badge({ children, variant = "default", style }: BadgeProps) {
	return (
		<output
			{...stylex.props(
				styles.base,
				variant === "highlight" && gradients.primary,
				variant === "highlight" && styles.highlight,
				style,
			)}
		>
			{children}
		</output>
	);
}
