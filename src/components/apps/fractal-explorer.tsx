import * as stylex from "@stylexjs/stylex";
import { Hash, Shapes, Triangle } from "lucide-react";
import { useState } from "react";

import { colors, fontSize, radius, spacing } from "@/styles/tokens.stylex";

const styles = stylex.create({
	fractalApp: {
		width: "100%",
	},
	title: {
		fontSize: fontSize.xl,
		marginBottom: spacing.sm,
		color: colors.foreground,
		textAlign: "center",
	},
	description: {
		color: colors.muted,
		fontSize: fontSize.base,
		textAlign: "center",
		marginBottom: spacing.lg,
	},
	highlight: {
		color: colors.primary,
	},
	controls: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.lg,
		marginBottom: spacing.lg,
	},
	controlLabel: {
		color: colors.muted,
		fontSize: fontSize.base,
	},
	rangeInput: {
		width: 150,
		accentColor: colors.primary,
	},
	svg: {
		width: "100%",
		maxWidth: 280,
		display: "block",
		marginTop: 0,
		marginBottom: spacing.lg,
		marginLeft: "auto",
		marginRight: "auto",
	},
	infoContainer: {
		display: "flex",
		justifyContent: "center",
		gap: spacing.lg,
	},
	infoCard: {
		display: "flex",
		flexDirection: "column",
		paddingTop: spacing.md,
		paddingBottom: spacing.md,
		paddingLeft: spacing.lg,
		paddingRight: spacing.lg,
		backgroundColor: colors.darkBg,
		borderRadius: radius.md,
		fontSize: fontSize.sm,
		textAlign: "center",
	},
	infoLabel: {
		color: colors.mutedForeground,
		marginBottom: spacing.xs,
	},
	infoValue: {
		color: colors.primary,
		fontSize: fontSize.lg,
	},
	titleIcon: {
		display: "inline-flex",
		verticalAlign: "middle",
		marginRight: spacing.sm,
	},
	infoIcon: {
		display: "inline-flex",
		marginRight: spacing.xs,
	},
});

export function FractalExplorer() {
	const [iteration, setIteration] = useState(3);

	// 성능 최적화: spread 연산자 대신 배열 push 사용 (O(3^n) → O(n))
	const generateSierpinski = (iteration: number): React.ReactNode[] => {
		const polygons: React.ReactNode[] = [];

		const generate = (x: number, y: number, size: number, depth: number): void => {
			if (depth === 0) {
				const h = (size * Math.sqrt(3)) / 2;
				polygons.push(
					<polygon
						key={`${x}-${y}-${size}`}
						points={`${x},${y + h} ${x + size / 2},${y} ${x + size},${y + h}`}
						fill="#f59e0b"
						opacity={0.8}
					/>,
				);
				return;
			}

			const newSize = size / 2;
			const h = (newSize * Math.sqrt(3)) / 2;
			generate(x, y + h, newSize, depth - 1);
			generate(x + newSize / 2, y, newSize, depth - 1);
			generate(x + newSize, y + h, newSize, depth - 1);
		};

		generate(0, 0, 300, iteration);
		return polygons;
	};

	return (
		<div {...stylex.props(styles.fractalApp)}>
			<h2 {...stylex.props(styles.title)}>
				<span {...stylex.props(styles.titleIcon)}>
					<Shapes size={20} aria-hidden="true" />
				</span>
				프랙탈 탐험기
			</h2>
			<p {...stylex.props(styles.description)}>
				프랙탈은 <strong {...stylex.props(styles.highlight)}>자기유사성</strong>을 가진 구조입니다.
				부분이 전체와 비슷한 모양을 가집니다.
			</p>

			<div {...stylex.props(styles.controls)}>
				<div {...stylex.props(styles.controlLabel)}>반복 횟수: {iteration}</div>
				<input
					{...stylex.props(styles.rangeInput)}
					type="range"
					min="0"
					max="6"
					value={iteration}
					onChange={(e) => setIteration(Number(e.target.value))}
				/>
			</div>

			<svg viewBox="0 0 300 260" {...stylex.props(styles.svg)}>
				<title>프랙탈</title>
				{generateSierpinski(iteration)}
			</svg>

			<div {...stylex.props(styles.infoContainer)}>
				<div {...stylex.props(styles.infoCard)}>
					<span {...stylex.props(styles.infoLabel)}>
						<span {...stylex.props(styles.infoIcon)}>
							<Hash size={14} aria-hidden="true" />
						</span>
						삼각형 개수
					</span>
					<strong {...stylex.props(styles.infoValue)}>{3 ** iteration}</strong>
				</div>
				<div {...stylex.props(styles.infoCard)}>
					<span {...stylex.props(styles.infoLabel)}>
						<span {...stylex.props(styles.infoIcon)}>
							<Triangle size={14} aria-hidden="true" />
						</span>
						하우스도르프 차원
					</span>
					<strong {...stylex.props(styles.infoValue)}>≈ 1.585</strong>
				</div>
			</div>
		</div>
	);
}
