import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";

import { colors, spacing } from "../../styles/tokens.stylex";

const spinKeyframes = stylex.keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(360deg)" },
});

const styles = stylex.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: spacing.xxxl,
		color: colors.muted,
	},
	spinner: {
		width: 40,
		height: 40,
		borderWidth: 3,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
		borderTopColor: colors.primary,
		borderRadius: "50%",
		animationName: spinKeyframes,
		animationDuration: "1s",
		animationTimingFunction: "linear",
		animationIterationCount: "infinite",
		marginBottom: spacing.lg,
	},
});

interface SpinnerProps {
	message?: string;
	style?: StyleXStyles;
	spinnerStyle?: StyleXStyles;
}

export function Spinner({ message, style, spinnerStyle }: SpinnerProps) {
	return (
		<output
			{...stylex.props(styles.container, style)}
			aria-live="polite"
			aria-busy="true"
		>
			<div {...stylex.props(styles.spinner, spinnerStyle)} aria-hidden="true" />
			{message && <p>{message}</p>}
		</output>
	);
}
