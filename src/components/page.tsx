import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { colors, fontSize, fontWeight, radius, spacing } from "../styles/tokens.stylex";
import { GenerativeUIRenderer } from "./generative-ui-renderer";

const EXAMPLE_PROMPTS = [
	"현재 시간이 몇 시인가요?",
	"프랙탈에 대해 설명해주세요",
	"5살 아이에게 덧셈을 가르쳐주세요",
	"메모리 게임을 만들어주세요",
];

const MARKDOWN_RESPONSES: Record<string, string> = {
	"현재 시간이 몇 시인가요?": `## 현재 시간

현재 시간은 **오후 3시 45분**입니다.

### 참고사항
- 시간대: KST (한국 표준시)
- UTC+9

더 정확한 시간 확인이 필요하시면 기기의 시계를 확인해주세요.`,

	"프랙탈에 대해 설명해주세요": `## 프랙탈이란?

프랙탈(Fractal)은 **자기유사성**을 가진 기하학적 구조입니다.

### 주요 특징
1. **자기유사성**: 부분이 전체와 비슷한 모양
2. **무한 복잡성**: 확대해도 계속 복잡한 구조
3. **비정수 차원**: 1차원과 2차원 사이의 차원

### 대표적인 프랙탈
- 만델브로 집합
- 코흐 눈송이
- 시에르핀스키 삼각형

### 실생활 예시
- 나뭇가지의 분기 패턴
- 해안선의 복잡한 모양
- 눈송이의 결정 구조`,

	"5살 아이에게 덧셈을 가르쳐주세요": `## 덧셈 배우기

### 덧셈이란?
덧셈은 두 개 이상의 수를 **합치는** 것입니다.

### 예시
- 🍎 + 🍎 = 🍎🍎 (1 + 1 = 2)
- 🍎🍎 + 🍎 = 🍎🍎🍎 (2 + 1 = 3)

### 연습 문제
1. 2 + 2 = ?
2. 3 + 1 = ?
3. 1 + 4 = ?

손가락을 사용해서 세어보세요!`,

	"메모리 게임을 만들어주세요": `## 메모리 게임

메모리 게임은 카드를 뒤집어 같은 그림을 찾는 게임입니다.

### 게임 방법
1. 카드를 모두 뒤집어 놓습니다
2. 두 장의 카드를 선택합니다
3. 같은 그림이면 점수 획득
4. 다른 그림이면 다시 뒤집습니다

### 팁
- 카드 위치를 기억하세요
- 집중력이 중요합니다

*실제 게임을 원하시면 별도의 앱을 사용해주세요.*`,
};

// keyframes must be defined in the same file where they're used
const spinKeyframes = stylex.keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(360deg)" },
});

const styles = stylex.create({
	page: {
		minHeight: "100vh",
		padding: spacing.xxl,
		maxWidth: 1200,
		marginTop: 0,
		marginBottom: 0,
		marginLeft: "auto",
		marginRight: "auto",
		"@media (max-width: 768px)": {
			padding: spacing.lg,
		},
	},
	header: {
		textAlign: "center",
		marginBottom: spacing.xxxl,
		padding: spacing.xxl,
		backgroundImage: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
		borderRadius: radius.xl,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
	},
	headerTitle: {
		fontSize: fontSize.xxxxl,
		marginBottom: spacing.sm,
		backgroundImage: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
		backgroundClip: "text",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		"@media (max-width: 768px)": {
			fontSize: "1.8rem",
		},
	},
	headerDescription: {
		color: colors.muted,
		fontSize: fontSize.lg,
	},
	highlight: {
		color: colors.primary,
	},
	section: {
		marginBottom: spacing.xxxl,
	},
	sectionTitle: {
		fontSize: fontSize.xxl,
		marginBottom: spacing.lg,
		color: colors.foreground,
	},
	sectionDescription: {
		color: colors.muted,
		marginBottom: spacing.lg,
	},
	conceptGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
		gap: spacing.xl,
	},
	conceptCard: {
		padding: spacing.xl,
		backgroundColor: colors.cardBg,
		borderRadius: radius.lg,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
	},
	conceptCardTitle: {
		fontSize: fontSize.xl,
		marginBottom: spacing.sm,
		color: colors.foreground,
	},
	conceptCardDescription: {
		color: colors.muted,
		lineHeight: 1.6,
	},
	promptGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
		gap: spacing.lg,
	},
	promptBtn: {
		padding: spacing.lg,
		backgroundColor: colors.cardBg,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
		borderRadius: radius.md,
		color: colors.foreground,
		cursor: "pointer",
		transition: "all 0.2s",
		fontSize: fontSize.md,
		":hover": {
			borderColor: colors.primary,
			backgroundColor: "#1e1e3f",
		},
	},
	promptBtnSelected: {
		borderColor: colors.primary,
		backgroundImage: "linear-gradient(135deg, #1e1e3f 0%, #2a2a4e 100%)",
	},
	generating: {
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
	comparisonGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
		gap: spacing.xl,
		"@media (max-width: 768px)": {
			gridTemplateColumns: "1fr",
		},
	},
	comparisonPanel: {
		backgroundColor: colors.cardBg,
		borderRadius: radius.lg,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
		overflow: "hidden",
	},
	panelHeader: {
		padding: spacing.lg,
		borderBottomWidth: 1,
		borderBottomStyle: "solid",
		borderBottomColor: colors.cardBorder,
		display: "flex",
		alignItems: "center",
		gap: spacing.md,
	},
	panelHeaderTitle: {
		fontSize: fontSize.lg,
		color: colors.foreground,
	},
	panelBadge: {
		paddingTop: spacing.xs,
		paddingBottom: spacing.xs,
		paddingLeft: spacing.md,
		paddingRight: spacing.md,
		backgroundColor: "#3f3f46",
		borderRadius: radius.sm,
		fontSize: fontSize.xs,
		color: colors.muted,
	},
	panelBadgeNew: {
		backgroundImage: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
		color: "white",
	},
	markdownContent: {
		padding: spacing.lg,
		minHeight: 300,
		maxHeight: 400,
		overflowY: "auto",
	},
	markdownPre: {
		whiteSpace: "pre-wrap",
		fontFamily: "inherit",
		fontSize: fontSize.base,
		lineHeight: 1.6,
		color: colors.muted,
	},
	generativeContent: {
		padding: spacing.lg,
		minHeight: 300,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	panelFooter: {
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
	statsGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
		gap: spacing.xl,
	},
	statCard: {
		padding: spacing.xl,
		backgroundColor: colors.cardBg,
		borderRadius: radius.lg,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
		textAlign: "center",
	},
	statValue: {
		display: "block",
		fontSize: fontSize.xxxxl,
		fontWeight: fontWeight.bold,
		backgroundImage: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
		backgroundClip: "text",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		marginBottom: spacing.sm,
	},
	statLabel: {
		color: colors.muted,
		fontSize: fontSize.base,
	},
	footer: {
		textAlign: "center",
		padding: spacing.xxl,
		color: colors.mutedForeground,
		fontSize: fontSize.base,
	},
	footerHighlight: {
		color: colors.muted,
	},
});

export function Page() {
	const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const [showComparison, setShowComparison] = useState(false);

	const handlePromptSelect = (prompt: string) => {
		setSelectedPrompt(prompt);
		setIsGenerating(true);
		setShowComparison(false);

		setTimeout(() => {
			setIsGenerating(false);
			setShowComparison(true);
		}, 1500);
	};

	return (
		<div {...stylex.props(styles.page)}>
			<header {...stylex.props(styles.header)}>
				<h1 {...stylex.props(styles.headerTitle)}>🎨 Generative UI Demo</h1>
				<p {...stylex.props(styles.headerDescription)}>
					LLM이 콘텐츠뿐만 아니라{" "}
					<strong {...stylex.props(styles.highlight)}>인터페이스 자체</strong>를 생성하는 새로운
					패러다임
				</p>
			</header>

			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.sectionTitle)}>📖 핵심 개념</h2>
				<div {...stylex.props(styles.conceptGrid)}>
					<div {...stylex.props(styles.conceptCard)}>
						<h3 {...stylex.props(styles.conceptCardTitle)}>🔤 기존 방식</h3>
						<p {...stylex.props(styles.conceptCardDescription)}>
							LLM은 <strong {...stylex.props(styles.highlight)}>마크다운 텍스트</strong>를
							출력합니다. 읽기 쉽지만 정적이고 인터랙션이 없습니다.
						</p>
					</div>
					<div {...stylex.props(styles.conceptCard)}>
						<h3 {...stylex.props(styles.conceptCardTitle)}>✨ Generative UI</h3>
						<p {...stylex.props(styles.conceptCardDescription)}>
							LLM이 <strong {...stylex.props(styles.highlight)}>맞춤형 UI 자체</strong>를
							생성합니다. 프롬프트에 따라 게임, 시뮬레이션, 데이터 시각화 등을 만들어냅니다.
						</p>
					</div>
				</div>
			</section>

			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.sectionTitle)}>🧪 직접 체험해보세요</h2>
				<p {...stylex.props(styles.sectionDescription)}>
					프롬프트를 선택하면 마크다운 응답과 Generative UI를 비교할 수 있습니다.
				</p>

				<div {...stylex.props(styles.promptGrid)}>
					{EXAMPLE_PROMPTS.map((prompt) => (
						<button
							key={prompt}
							{...stylex.props(
								styles.promptBtn,
								selectedPrompt === prompt && styles.promptBtnSelected,
							)}
							onClick={() => handlePromptSelect(prompt)}
						>
							{prompt}
						</button>
					))}
				</div>
			</section>

			{isGenerating && (
				<div {...stylex.props(styles.generating)}>
					<div {...stylex.props(styles.spinner)} />
					<p>UI 생성 중...</p>
				</div>
			)}

			{showComparison && selectedPrompt && (
				<section {...stylex.props(styles.section)}>
					<h2 {...stylex.props(styles.sectionTitle)}>📊 비교 결과</h2>

					<div {...stylex.props(styles.comparisonGrid)}>
						<div {...stylex.props(styles.comparisonPanel)}>
							<div {...stylex.props(styles.panelHeader)}>
								<span {...stylex.props(styles.panelBadge)}>기존 방식</span>
								<h3 {...stylex.props(styles.panelHeaderTitle)}>📝 Markdown 응답</h3>
							</div>
							<div {...stylex.props(styles.markdownContent)}>
								<pre {...stylex.props(styles.markdownPre)}>
									{MARKDOWN_RESPONSES[selectedPrompt]}
								</pre>
							</div>
							<div {...stylex.props(styles.panelFooter)}>
								<span>❌ 정적</span>
								<span>❌ 인터랙션 없음</span>
							</div>
						</div>

						<div {...stylex.props(styles.comparisonPanel)}>
							<div {...stylex.props(styles.panelHeader)}>
								<span {...stylex.props(styles.panelBadge, styles.panelBadgeNew)}>
									Generative UI
								</span>
								<h3 {...stylex.props(styles.panelHeaderTitle)}>🎨 동적 UI</h3>
							</div>
							<div {...stylex.props(styles.generativeContent)}>
								<GenerativeUIRenderer prompt={selectedPrompt} />
							</div>
							<div {...stylex.props(styles.panelFooter)}>
								<span>✅ 인터랙티브</span>
								<span>✅ 맞춤형 경험</span>
							</div>
						</div>
					</div>
				</section>
			)}

			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.sectionTitle)}>📈 논문 주요 결과</h2>
				<div {...stylex.props(styles.statsGrid)}>
					<div {...stylex.props(styles.statCard)}>
						<span {...stylex.props(styles.statValue)}>82.8%</span>
						<span {...stylex.props(styles.statLabel)}>Generative UI가 마크다운보다 선호됨</span>
					</div>
					<div {...stylex.props(styles.statCard)}>
						<span {...stylex.props(styles.statValue)}>44%</span>
						<span {...stylex.props(styles.statLabel)}>인간 전문가 결과와 비교 가능</span>
					</div>
					<div {...stylex.props(styles.statCard)}>
						<span {...stylex.props(styles.statValue)}>0%</span>
						<span {...stylex.props(styles.statLabel)}>최신 모델의 출력 오류율</span>
					</div>
				</div>
			</section>

			<footer {...stylex.props(styles.footer)}>
				<p>
					Based on the paper:{" "}
					<strong {...stylex.props(styles.footerHighlight)}>
						&quot;Generative UI: LLMs are Effective UI Generators&quot;
					</strong>
				</p>
				<p>Google Research, 2025</p>
			</footer>
		</div>
	);
}
