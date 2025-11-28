import * as stylex from "@stylexjs/stylex";

import { colors, fontSize, radius, spacing } from "../../styles/tokens.stylex";
import { gradients } from "../../styles/common.stylex";

const styles = stylex.create({
	base: {
		paddingTop: spacing.xs,
		paddingBottom: spacing.xs,
		paddingLeft: spacing.md,
		paddingRight: spacing.md,
		backgroundColor: "#3f3f46",
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
}

export function Badge({ children, variant = "default" }: BadgeProps) {
	return (
		<span
			{...stylex.props(
				styles.base,
				variant === "highlight" && gradients.primary,
				variant === "highlight" && styles.highlight,
			)}
		>
			{children}
		</span>
	);
}
