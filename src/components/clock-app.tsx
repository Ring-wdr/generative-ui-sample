import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";

import { colors, fontSize, fontWeight, radius, spacing } from "../styles/tokens.stylex";

// keyframes must be defined in the same file where they're used
const blinkKeyframes = stylex.keyframes({
	"0%": { opacity: 1 },
	"50%": { opacity: 0.3 },
	"100%": { opacity: 1 },
});

const styles = stylex.create({
	clockApp: {
		width: "100%",
		textAlign: "center",
	},
	title: {
		fontSize: fontSize.xl,
		marginBottom: spacing.lg,
		color: colors.foreground,
	},
	clockMain: {
		marginBottom: spacing.xl,
	},
	digitalClock: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: spacing.xs,
	},
	clockDigit: {
		fontSize: fontSize.xxxxxl,
		fontWeight: fontWeight.bold,
		fontFamily: "monospace",
		backgroundImage: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
		backgroundClip: "text",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
	},
	clockSeparator: {
		fontSize: fontSize.xxxxl,
		color: colors.primary,
		animationName: blinkKeyframes,
		animationDuration: "1s",
		animationTimingFunction: "linear",
		animationIterationCount: "infinite",
	},
	clockTimezone: {
		color: colors.mutedForeground,
		marginTop: spacing.sm,
	},
	worldClocks: {
		display: "flex",
		justifyContent: "center",
		gap: spacing.xl,
	},
	worldClock: {
		display: "flex",
		flexDirection: "column",
		paddingTop: spacing.md,
		paddingBottom: spacing.md,
		paddingLeft: spacing.lg,
		paddingRight: spacing.lg,
		backgroundColor: colors.darkBg,
		borderRadius: radius.md,
		fontSize: fontSize.sm,
	},
	worldClockCity: {
		color: colors.mutedForeground,
		marginBottom: spacing.xs,
	},
	worldClockTime: {
		color: colors.foreground,
		fontFamily: "monospace",
	},
});

export function ClockApp() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	const hours = time.getHours().toString().padStart(2, "0");
	const minutes = time.getMinutes().toString().padStart(2, "0");
	const seconds = time.getSeconds().toString().padStart(2, "0");

	const worldCities = [
		{ city: "뉴욕", offset: -14 },
		{ city: "런던", offset: -9 },
		{ city: "도쿄", offset: 0 },
	];

	return (
		<div {...stylex.props(styles.clockApp)}>
			<h2 {...stylex.props(styles.title)}>🕐 세계 시계</h2>
			<div {...stylex.props(styles.clockMain)}>
				<div {...stylex.props(styles.digitalClock)}>
					<span {...stylex.props(styles.clockDigit)}>{hours}</span>
					<span {...stylex.props(styles.clockSeparator)}>:</span>
					<span {...stylex.props(styles.clockDigit)}>{minutes}</span>
					<span {...stylex.props(styles.clockSeparator)}>:</span>
					<span {...stylex.props(styles.clockDigit)}>{seconds}</span>
				</div>
				<p {...stylex.props(styles.clockTimezone)}>서울 (KST)</p>
			</div>
			<div {...stylex.props(styles.worldClocks)}>
				{worldCities.map(({ city, offset }) => {
					const cityTime = new Date(time.getTime() + offset * 3600000);
					return (
						<div key={city} {...stylex.props(styles.worldClock)}>
							<span {...stylex.props(styles.worldClockCity)}>{city}</span>
							<span {...stylex.props(styles.worldClockTime)}>
								{cityTime.getHours().toString().padStart(2, "0")}:
								{cityTime.getMinutes().toString().padStart(2, "0")}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
