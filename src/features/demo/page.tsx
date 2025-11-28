import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import {
	Badge,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Spinner,
} from "../../components/ui";
import { gradients } from "../../styles/common.stylex";
import { colors, fontSize, fontWeight, radius, spacing } from "../../styles/tokens.stylex";
import { EXAMPLE_PROMPTS, MARKDOWN_RESPONSES } from "./data";
import { GenerativeUIRenderer } from "./generative-ui-renderer";

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
		borderRadius: radius.xl,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
	},
	headerTitle: {
		fontSize: fontSize.xxxxl,
		marginBottom: spacing.sm,
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
	},
	comparisonGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
		gap: spacing.xl,
		"@media (max-width: 768px)": {
			gridTemplateColumns: "1fr",
		},
	},
	markdownContent: {
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
		minHeight: 300,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
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
		}, 1000);
	};

	return (
		<div {...stylex.props(styles.page)}>
			<header {...stylex.props(styles.header, gradients.card)}>
				<h1 {...stylex.props(styles.headerTitle, gradients.primaryText)}>🎨 Generative UI Demo</h1>
				<p {...stylex.props(styles.headerDescription)}>
					LLM이 콘텐츠뿐만 아니라{" "}
					<strong {...stylex.props(styles.highlight)}>인터페이스 자체</strong>를 생성하는 새로운
					패러다임
				</p>
			</header>

			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.sectionTitle)}>📖 핵심 개념</h2>
				<div {...stylex.props(styles.conceptGrid)}>
					<Card padded>
						<h3 {...stylex.props(styles.conceptCardTitle)}>🔤 기존 방식</h3>
						<p {...stylex.props(styles.conceptCardDescription)}>
							LLM은 <strong {...stylex.props(styles.highlight)}>마크다운 텍스트</strong>를
							출력합니다. 읽기 쉽지만 정적이고 인터랙션이 없습니다.
						</p>
					</Card>
					<Card padded>
						<h3 {...stylex.props(styles.conceptCardTitle)}>✨ Generative UI</h3>
						<p {...stylex.props(styles.conceptCardDescription)}>
							LLM이 <strong {...stylex.props(styles.highlight)}>맞춤형 UI 자체</strong>를
							생성합니다. 프롬프트에 따라 게임, 시뮬레이션, 데이터 시각화 등을 만들어냅니다.
						</p>
					</Card>
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
								selectedPrompt === prompt && gradients.cardHover,
							)}
							onClick={() => handlePromptSelect(prompt)}
						>
							{prompt}
						</button>
					))}
				</div>
			</section>

			{isGenerating && <Spinner message="UI 생성 중..." />}

			{showComparison && selectedPrompt && (
				<section {...stylex.props(styles.section)}>
					<h2 {...stylex.props(styles.sectionTitle)}>📊 비교 결과</h2>

					<div {...stylex.props(styles.comparisonGrid)}>
						<Card>
							<CardHeader>
								<Badge>기존 방식</Badge>
								<CardTitle>📝 Markdown 응답</CardTitle>
							</CardHeader>
							<CardContent style={styles.markdownContent}>
								<pre {...stylex.props(styles.markdownPre)}>
									{MARKDOWN_RESPONSES[selectedPrompt]}
								</pre>
							</CardContent>
							<CardFooter>
								<span>❌ 정적</span>
								<span>❌ 인터랙션 없음</span>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<Badge variant="highlight">Generative UI</Badge>
								<CardTitle>🎨 동적 UI</CardTitle>
							</CardHeader>
							<CardContent style={styles.generativeContent}>
								<GenerativeUIRenderer prompt={selectedPrompt} />
							</CardContent>
							<CardFooter>
								<span>✅ 인터랙티브</span>
								<span>✅ 맞춤형 경험</span>
							</CardFooter>
						</Card>
					</div>
				</section>
			)}

			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.sectionTitle)}>📈 논문 주요 결과</h2>
				<div {...stylex.props(styles.statsGrid)}>
					<div {...stylex.props(styles.statCard)}>
						<span {...stylex.props(styles.statValue, gradients.primaryText)}>82.8%</span>
						<span {...stylex.props(styles.statLabel)}>Generative UI가 마크다운보다 선호됨</span>
					</div>
					<div {...stylex.props(styles.statCard)}>
						<span {...stylex.props(styles.statValue, gradients.primaryText)}>44%</span>
						<span {...stylex.props(styles.statLabel)}>인간 전문가 결과와 비교 가능</span>
					</div>
					<div {...stylex.props(styles.statCard)}>
						<span {...stylex.props(styles.statValue, gradients.primaryText)}>0%</span>
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
