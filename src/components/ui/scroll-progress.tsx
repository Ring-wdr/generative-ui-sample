import * as stylex from "@stylexjs/stylex";

const LIGHT = "@media (prefers-color-scheme: light)";

const scrollProgressKeyframes = stylex.keyframes({
	from: {
		transform: "scaleX(0)",
	},
	to: {
		transform: "scaleX(1)",
	},
});

const styles = stylex.create({
	progress: {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: 3,
		backgroundImage: {
			default: `linear-gradient(90deg, #f59e0b, #d97706)`,
			[LIGHT]: `linear-gradient(90deg, #d97706, #b45309)`,
		},
		transformOrigin: "left",
		transform: "scaleX(0)",
		zIndex: 9999,
		animationName: scrollProgressKeyframes,
		animationTimingFunction: "linear",
		animationTimeline: "scroll()",
	},
	hidden: {
		"@supports not (animation-timeline: scroll())": {
			display: "none",
		},
	},
});

export function ScrollProgress() {
	return <div {...stylex.props(styles.progress, styles.hidden)} aria-hidden="true" />;
}
