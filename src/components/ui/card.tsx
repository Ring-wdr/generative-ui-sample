import * as stylex from "@stylexjs/stylex";

import { colors, fontSize, radius, spacing } from "../../styles/tokens.stylex";

const styles = stylex.create({
	card: {
		backgroundColor: colors.cardBg,
		borderRadius: radius.lg,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
		overflow: "hidden",
	},
	padded: {
		padding: spacing.xl,
	},
	header: {
		padding: spacing.lg,
		borderBottomWidth: 1,
		borderBottomStyle: "solid",
		borderBottomColor: colors.cardBorder,
		display: "flex",
		alignItems: "center",
		gap: spacing.md,
	},
	headerTitle: {
		fontSize: fontSize.lg,
		color: colors.foreground,
	},
	content: {
		padding: spacing.lg,
	},
	footer: {
		paddingTop: spacing.md,
		paddingBottom: spacing.md,
		paddingLeft: spacing.lg,
		paddingRight: spacing.lg,
		borderTopWidth: 1,
		borderTopStyle: "solid",
		borderTopColor: colors.cardBorder,
		display: "flex",
		gap: spacing.lg,
		fontSize: fontSize.sm,
		color: colors.mutedForeground,
	},
});

interface CardProps {
	children: React.ReactNode;
	padded?: boolean;
}

export function Card({ children, padded }: CardProps) {
	return <div {...stylex.props(styles.card, padded && styles.padded)}>{children}</div>;
}

interface CardHeaderProps {
	children: React.ReactNode;
}

export function CardHeader({ children }: CardHeaderProps) {
	return <div {...stylex.props(styles.header)}>{children}</div>;
}

interface CardTitleProps {
	children: React.ReactNode;
}

export function CardTitle({ children }: CardTitleProps) {
	return <h3 {...stylex.props(styles.headerTitle)}>{children}</h3>;
}

interface CardContentProps {
	children: React.ReactNode;
	style?: stylex.StyleXStyles;
}

export function CardContent({ children, style }: CardContentProps) {
	return <div {...stylex.props(styles.content, style)}>{children}</div>;
}

interface CardFooterProps {
	children: React.ReactNode;
}

export function CardFooter({ children }: CardFooterProps) {
	return <div {...stylex.props(styles.footer)}>{children}</div>;
}
