import * as stylex from "@stylexjs/stylex";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

import { colors, fontSize, fontWeight, radius, spacing } from "@/styles/tokens.stylex";

// keyframes must be defined in the same file where they're used
const blinkKeyframes = stylex.keyframes({
	"0%": { opacity: 1 },
	"50%": { opacity: 0.3 },
	"100%": { opacity: 1 },
});

// 컴포넌트 외부로 이동하여 매 렌더마다 재생성 방지
const WORLD_CITIES = [
	{ city: "뉴욕", offset: -14 },
	{ city: "런던", offset: -9 },
	{ city: "도쿄", offset: 0 },
] as const;

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
		color: colors.primary,
	},
	titleIcon: {
		display: "inline-flex",
		verticalAlign: "middle",
		marginRight: spacing.sm,
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

	return (
		<div {...stylex.props(styles.clockApp)}>
			<h2 {...stylex.props(styles.title)}>
				<span {...stylex.props(styles.titleIcon)}>
					<Clock size={20} aria-hidden="true" />
				</span>
				세계 시계
			</h2>
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
				{WORLD_CITIES.map(({ city, offset }) => {
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
