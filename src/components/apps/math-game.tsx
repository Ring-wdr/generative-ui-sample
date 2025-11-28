import * as stylex from "@stylexjs/stylex";
import { Calculator, Check, HelpCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { colors, fontSize, fontWeight, radius, spacing } from "@/styles/tokens.stylex";

const styles = stylex.create({
	mathApp: {
		width: "100%",
		textAlign: "center",
	},
	title: {
		fontSize: fontSize.xl,
		marginBottom: spacing.sm,
		color: colors.foreground,
	},
	scoreBoard: {
		backgroundColor: colors.primary,
		color: colors.background,
		display: "inline-block",
		paddingTop: spacing.sm,
		paddingBottom: spacing.sm,
		paddingLeft: spacing.lg,
		paddingRight: spacing.lg,
		borderRadius: radius.sm,
		fontWeight: fontWeight.semibold,
		marginBottom: spacing.lg,
	},
	titleIcon: {
		display: "inline-flex",
		verticalAlign: "middle",
		marginRight: spacing.sm,
	},
	feedbackIcon: {
		display: "inline-flex",
		verticalAlign: "middle",
		marginRight: spacing.xs,
	},
	mathProblem: {
		backgroundColor: colors.darkBg,
		padding: spacing.xl,
		borderRadius: radius.lg,
		marginBottom: spacing.lg,
	},
	mathVisual: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "wrap",
		gap: spacing.sm,
		marginBottom: spacing.lg,
	},
	mathEmoji: {
		fontSize: fontSize.xxxl,
	},
	mathOperator: {
		fontSize: fontSize.xxl,
		color: colors.primary,
		marginLeft: spacing.sm,
		marginRight: spacing.sm,
	},
	mathEquation: {
		fontSize: fontSize.xxl,
		fontWeight: fontWeight.semibold,
		color: colors.foreground,
	},
	mathOptions: {
		display: "flex",
		justifyContent: "center",
		gap: spacing.md,
		marginBottom: spacing.lg,
	},
	mathOption: {
		width: 60,
		height: 60,
		fontSize: fontSize.xxl,
		fontWeight: fontWeight.semibold,
		backgroundColor: colors.cardBorder,
		borderWidth: 2,
		borderStyle: "solid",
		borderColor: "transparent",
		borderRadius: radius.lg,
		color: colors.foreground,
		cursor: "pointer",
		transition: "all 0.2s",
		":hover": {
			borderColor: colors.primary,
			transform: "scale(1.05)",
		},
	},
	feedback: {
		padding: spacing.md,
		borderRadius: radius.md,
		fontWeight: fontWeight.semibold,
	},
	feedbackCorrect: {
		backgroundColor: "rgba(34, 197, 94, 0.2)",
		color: colors.success,
	},
	feedbackWrong: {
		backgroundColor: "rgba(239, 68, 68, 0.2)",
		color: colors.error,
	},
});

export function MathGame() {
	const [score, setScore] = useState(0);
	const [num1, setNum1] = useState(2);
	const [num2, setNum2] = useState(3);
	const [feedback, setFeedback] = useState<string | null>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// 컴포넌트 언마운트 시 타이머 정리 (메모리 누수 방지)
	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	const generateProblem = () => {
		setNum1(Math.floor(Math.random() * 5) + 1);
		setNum2(Math.floor(Math.random() * 5) + 1);
		setFeedback(null);
	};

	const checkAnswer = (answer: number) => {
		if (answer === num1 + num2) {
			setScore(score + 1);
			setFeedback("correct");
			// 기존 타이머가 있으면 정리 후 새 타이머 설정
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
			timerRef.current = setTimeout(generateProblem, 1500);
		} else {
			setFeedback("wrong");
		}
	};

	const correctAnswer = num1 + num2;
	const options = [
		correctAnswer,
		correctAnswer + 1,
		correctAnswer - 1 > 0 ? correctAnswer - 1 : correctAnswer + 2,
	].sort(() => Math.random() - 0.5);

	const isCorrect = feedback === "correct";

	return (
		<div {...stylex.props(styles.mathApp)}>
			<h2 {...stylex.props(styles.title)}>
				<span {...stylex.props(styles.titleIcon)}>
					<Calculator size={20} aria-hidden="true" />
				</span>
				덧셈 놀이터
			</h2>
			<div {...stylex.props(styles.scoreBoard)}>점수: {score}점</div>

			<div {...stylex.props(styles.mathProblem)}>
				<div {...stylex.props(styles.mathVisual)}>
					{Array(num1)
						.fill("🍎")
						.map((_, i) => (
							<span key={`a${i}`} {...stylex.props(styles.mathEmoji)}>
								🍎
							</span>
						))}
					<span {...stylex.props(styles.mathOperator)}>+</span>
					{Array(num2)
						.fill("🍎")
						.map((_, i) => (
							<span key={`b${i}`} {...stylex.props(styles.mathEmoji)}>
								🍎
							</span>
						))}
				</div>
				<div {...stylex.props(styles.mathEquation)}>
					{num1} + {num2} = ?
				</div>
			</div>

			<div {...stylex.props(styles.mathOptions)}>
				{options.map((opt) => (
					<button key={opt} onClick={() => checkAnswer(opt)} {...stylex.props(styles.mathOption)}>
						{opt}
					</button>
				))}
			</div>

			{feedback && (
				<div
					{...stylex.props(
						styles.feedback,
						isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
					)}
				>
					<span {...stylex.props(styles.feedbackIcon)}>
						{isCorrect ? (
							<Check size={16} aria-hidden="true" />
						) : (
							<HelpCircle size={16} aria-hidden="true" />
						)}
					</span>
					{isCorrect ? "정답이에요!" : "다시 생각해보세요!"}
				</div>
			)}
		</div>
	);
}
