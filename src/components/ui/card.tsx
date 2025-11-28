import * as stylex from "@stylexjs/stylex";

import { colors, fontSize, radius, spacing } from "@/styles/tokens.stylex";

const styles = stylex.create({
	card: {
		backgroundColor: colors.cardBg,
		borderRadius: radius.lg,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
		overflow: "hidden",
		display: "flex",
		flexDirection: "column",
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
		paddingTop: spacing.lg,
		paddingBottom: spacing.lg,
		paddingLeft: spacing.lg,
		paddingRight: spacing.lg,
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
	style?: stylex.StyleXStyles;
	/** 카드의 역할을 설명하는 접근성 라벨 */
	"aria-label"?: string;
	/** 카드를 region으로 마킹할지 여부 */
	as?: "article" | "section" | "div";
}

export function Card({
	children,
	padded,
	style,
	"aria-label": ariaLabel,
	as: Component = "div",
}: CardProps) {
	return (
		<Component
			{...stylex.props(styles.card, padded && styles.padded, style)}
			aria-label={ariaLabel}
			role={Component === "div" && ariaLabel ? "region" : undefined}
		>
			{children}
		</Component>
	);
}

interface CardHeaderProps {
	children: React.ReactNode;
	style?: stylex.StyleXStyles;
}

export function CardHeader({ children, style }: CardHeaderProps) {
	return <header {...stylex.props(styles.header, style)}>{children}</header>;
}

interface CardTitleProps {
	children: React.ReactNode;
	style?: stylex.StyleXStyles;
	/** 제목 레벨 (기본값: h3) */
	as?: "h2" | "h3" | "h4";
	/** 제목 ID (aria-labelledby에 사용) */
	id?: string;
}

export function CardTitle({ children, style, as: Component = "h3", id }: CardTitleProps) {
	return (
		<Component {...stylex.props(styles.headerTitle, style)} id={id}>
			{children}
		</Component>
	);
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
	style?: stylex.StyleXStyles;
}

export function CardFooter({ children, style }: CardFooterProps) {
	return <footer {...stylex.props(styles.footer, style)}>{children}</footer>;
}
