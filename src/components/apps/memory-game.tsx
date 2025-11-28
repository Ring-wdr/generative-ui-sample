import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef, useState } from "react";

import { colors, fontSize, fontWeight, radius, spacing } from "../../styles/tokens.stylex";

const styles = stylex.create({
	memoryApp: {
		width: "100%",
	},
	title: {
		fontSize: fontSize.xl,
		marginBottom: spacing.sm,
		color: colors.foreground,
		textAlign: "center",
	},
	stats: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: spacing.lg,
		marginBottom: spacing.lg,
		color: colors.muted,
		fontSize: fontSize.base,
	},
	resetBtn: {
		paddingTop: spacing.xs,
		paddingBottom: spacing.xs,
		paddingLeft: spacing.md,
		paddingRight: spacing.md,
		backgroundColor: colors.cardBorder,
		borderWidth: 0,
		borderStyle: "solid",
		borderColor: "transparent",
		borderRadius: radius.sm,
		color: colors.foreground,
		cursor: "pointer",
		fontSize: fontSize.sm,
		transition: "background-color 0.2s",
		":hover": {
			backgroundColor: "#3a3a5e",
		},
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "repeat(4, 1fr)",
		gap: spacing.sm,
		maxWidth: 280,
		marginTop: 0,
		marginBottom: 0,
		marginLeft: "auto",
		marginRight: "auto",
	},
	card: {
		aspectRatio: "1",
		perspective: "1000px",
		cursor: "pointer",
		backgroundColor: "transparent",
		borderStyle: "none",
	},
	cardInner: {
		position: "relative",
		width: "100%",
		height: "100%",
		transition: "transform 0.4s",
		transformStyle: "preserve-3d",
	},
	cardInnerFlipped: {
		transform: "rotateY(180deg)",
	},
	cardFace: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backfaceVisibility: "hidden",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: radius.md,
		fontSize: fontSize.xxl,
	},
	cardFront: {
		backgroundImage: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
		color: "white",
		fontWeight: fontWeight.bold,
	},
	cardBack: {
		backgroundColor: colors.darkBg,
		transform: "rotateY(180deg)",
	},
	cardBackMatched: {
		backgroundColor: "rgba(34, 197, 94, 0.2)",
		borderWidth: 2,
		borderStyle: "solid",
		borderColor: colors.success,
	},
	winMessage: {
		textAlign: "center",
		marginTop: spacing.lg,
		padding: spacing.lg,
		backgroundColor: "rgba(34, 197, 94, 0.2)",
		borderRadius: radius.md,
		color: colors.success,
		fontWeight: fontWeight.semibold,
	},
});

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

interface Card {
	id: number;
	emoji: string;
	flipped: boolean;
	matched: boolean;
}

export function MemoryGame() {
	const [cards, setCards] = useState<Card[]>(() => {
		const pairs = [...EMOJIS, ...EMOJIS];
		return pairs
			.sort(() => Math.random() - 0.5)
			.map((emoji, index) => ({
				id: index,
				emoji,
				flipped: false,
				matched: false,
			}));
	});
	const [selected, setSelected] = useState<number[]>([]);
	const [moves, setMoves] = useState(0);
	const [matches, setMatches] = useState(0);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// 컴포넌트 언마운트 시 타이머 정리 (메모리 누수 방지)
	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	const handleCardClick = (index: number) => {
		if (selected.length === 2 || cards[index].flipped || cards[index].matched) {
			return;
		}

		const newCards = [...cards];
		newCards[index].flipped = true;
		setCards(newCards);

		const newSelected = [...selected, index];
		setSelected(newSelected);

		if (newSelected.length === 2) {
			setMoves(moves + 1);
			const [first, second] = newSelected;

			// 기존 타이머 정리
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			if (cards[first].emoji === cards[second].emoji) {
				timerRef.current = setTimeout(() => {
					const matchedCards = [...cards];
					matchedCards[first].matched = true;
					matchedCards[second].matched = true;
					setCards(matchedCards);
					setMatches(matches + 1);
					setSelected([]);
				}, 500);
			} else {
				timerRef.current = setTimeout(() => {
					const resetCards = [...cards];
					resetCards[first].flipped = false;
					resetCards[second].flipped = false;
					setCards(resetCards);
					setSelected([]);
				}, 1000);
			}
		}
	};

	const resetGame = () => {
		const pairs = [...EMOJIS, ...EMOJIS];
		setCards(
			pairs
				.sort(() => Math.random() - 0.5)
				.map((emoji, index) => ({
					id: index,
					emoji,
					flipped: false,
					matched: false,
				})),
		);
		setSelected([]);
		setMoves(0);
		setMatches(0);
	};

	return (
		<div {...stylex.props(styles.memoryApp)}>
			<h2 {...stylex.props(styles.title)}>🎴 메모리 게임</h2>
			<div {...stylex.props(styles.stats)}>
				<span>시도: {moves}</span>
				<span>매칭: {matches}/8</span>
				<button onClick={resetGame} {...stylex.props(styles.resetBtn)}>
					🔄 리셋
				</button>
			</div>

			<div {...stylex.props(styles.grid)}>
				{cards.map((card, index) => (
					<button
						key={card.id}
						{...stylex.props(styles.card)}
						onClick={() => handleCardClick(index)}
					>
						<div
							{...stylex.props(
								styles.cardInner,
								(card.flipped || card.matched) && styles.cardInnerFlipped,
							)}
						>
							<div {...stylex.props(styles.cardFace, styles.cardFront)}>?</div>
							<div
								{...stylex.props(
									styles.cardFace,
									styles.cardBack,
									card.matched && styles.cardBackMatched,
								)}
							>
								{card.emoji}
							</div>
						</div>
					</button>
				))}
			</div>

			{matches === 8 && (
				<div {...stylex.props(styles.winMessage)}>🎉 축하합니다! {moves}번 만에 완료!</div>
			)}
		</div>
	);
}
