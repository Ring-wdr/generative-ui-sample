import * as stylex from "@stylexjs/stylex";
import { useRef, useState } from "react";

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
		borderWidth: 0,
		padding: 0,
		margin: 0,
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
		":focus-visible": {
			outline: "2px solid",
			outlineColor: colors.primary,
			outlineOffset: "2px",
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
		listStyle: "none",
		padding: 0,
		margin: 0,
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
	footerLink: {
		color: colors.primary,
		textDecoration: "none",
		":hover": {
			textDecoration: "underline",
		},
		":focus-visible": {
			outline: "2px solid",
			outlineColor: colors.primary,
			outlineOffset: "2px",
		},
	},
	/** 스크린리더 전용 (시각적으로 숨김) */
	srOnly: {
		position: "absolute",
		width: "1px",
		height: "1px",
		padding: 0,
		margin: "-1px",
		overflow: "hidden",
		clip: "rect(0, 0, 0, 0)",
		whiteSpace: "nowrap",
		borderWidth: 0,
	},
});

export function Page() {
	const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const [showComparison, setShowComparison] = useState(false);
	const visitedPromptsRef = useRef<Set<string>>(new Set());

	const handlePromptSelect = (prompt: string) => {
		setSelectedPrompt(prompt);

		if (visitedPromptsRef.current.has(prompt)) {
			setIsGenerating(false);
			setShowComparison(true);
			return;
		}

		setIsGenerating(true);
		setShowComparison(false);

		setTimeout(() => {
			visitedPromptsRef.current.add(prompt);
			setIsGenerating(false);
			setShowComparison(true);
		}, 1000);
	};

	return (
		<main {...stylex.props(styles.page)}>
			<header {...stylex.props(styles.header, gradients.card)}>
				<h1 {...stylex.props(styles.headerTitle, gradients.primaryText)}>
					<span aria-hidden="true">🎨 </span>
					Generative UI Demo
				</h1>
				<p {...stylex.props(styles.headerDescription)}>
					LLM이 콘텐츠뿐만 아니라{" "}
					<strong {...stylex.props(styles.highlight)}>인터페이스 자체</strong>를 생성하는 새로운
					패러다임
				</p>
			</header>

			<section {...stylex.props(styles.section)} aria-labelledby="concept-title">
				<h2 {...stylex.props(styles.sectionTitle)} id="concept-title">
					<span aria-hidden="true">📖 </span>
					핵심 개념
				</h2>
				<div {...stylex.props(styles.conceptGrid)}>
					<Card padded as="article" aria-label="기존 방식 설명">
						<h3 {...stylex.props(styles.conceptCardTitle)}>
							<span aria-hidden="true">🔤 </span>
							기존 방식
						</h3>
						<p {...stylex.props(styles.conceptCardDescription)}>
							LLM은 <strong {...stylex.props(styles.highlight)}>마크다운 텍스트</strong>를
							출력합니다. 읽기 쉽지만 정적이고 인터랙션이 없습니다.
						</p>
					</Card>
					<Card padded as="article" aria-label="Generative UI 설명">
						<h3 {...stylex.props(styles.conceptCardTitle)}>
							<span aria-hidden="true">✨ </span>
							Generative UI
						</h3>
						<p {...stylex.props(styles.conceptCardDescription)}>
							LLM이 <strong {...stylex.props(styles.highlight)}>맞춤형 UI 자체</strong>를
							생성합니다. 프롬프트에 따라 게임, 시뮬레이션, 데이터 시각화 등을 만들어냅니다.
						</p>
					</Card>
				</div>
			</section>

			<section {...stylex.props(styles.section)} aria-labelledby="demo-title">
				<h2 {...stylex.props(styles.sectionTitle)} id="demo-title">
					<span aria-hidden="true">🧪 </span>
					직접 체험해보세요
				</h2>
				<p {...stylex.props(styles.sectionDescription)}>
					프롬프트를 선택하면 마크다운 응답과 Generative UI를 비교할 수 있습니다.
				</p>

				<fieldset {...stylex.props(styles.promptGrid)}>
					<legend {...stylex.props(styles.srOnly)}>예시 프롬프트 선택</legend>
					{EXAMPLE_PROMPTS.map((prompt) => (
						<button
							key={prompt}
							type="button"
							{...stylex.props(
								styles.promptBtn,
								selectedPrompt === prompt && styles.promptBtnSelected,
								selectedPrompt === prompt && gradients.cardHover,
							)}
							onClick={() => handlePromptSelect(prompt)}
							aria-pressed={selectedPrompt === prompt}
						>
							{prompt}
						</button>
					))}
				</fieldset>
			</section>

			{isGenerating && <Spinner message="UI 생성 중..." />}

			{showComparison && selectedPrompt && (
				<section
					{...stylex.props(styles.section)}
					aria-labelledby="comparison-title"
					aria-live="polite"
				>
					<h2 {...stylex.props(styles.sectionTitle)} id="comparison-title">
						<span aria-hidden="true">📊 </span>
						비교 결과
					</h2>
					<span {...stylex.props(styles.srOnly)}>선택한 프롬프트: {selectedPrompt}</span>

					<div {...stylex.props(styles.comparisonGrid)}>
						<Card as="article" aria-labelledby="markdown-title">
							<CardHeader>
								<Badge>기존 방식</Badge>
								<CardTitle id="markdown-title">
									<span aria-hidden="true">📝 </span>
									Markdown 응답
								</CardTitle>
							</CardHeader>
							<CardContent style={styles.markdownContent}>
								<pre {...stylex.props(styles.markdownPre)}>
									{MARKDOWN_RESPONSES[selectedPrompt]}
								</pre>
							</CardContent>
							<CardFooter>
								<span>
									<span aria-hidden="true">❌ </span>정적
								</span>
								<span>
									<span aria-hidden="true">❌ </span>인터랙션 없음
								</span>
							</CardFooter>
						</Card>

						<Card as="article" aria-labelledby="generative-title">
							<CardHeader>
								<Badge variant="highlight">Generative UI</Badge>
								<CardTitle id="generative-title">
									<span aria-hidden="true">🎨 </span>
									동적 UI
								</CardTitle>
							</CardHeader>
							<CardContent style={styles.generativeContent}>
								<GenerativeUIRenderer prompt={selectedPrompt} />
							</CardContent>
							<CardFooter>
								<span>
									<span aria-hidden="true">✅ </span>인터랙티브
								</span>
								<span>
									<span aria-hidden="true">✅ </span>맞춤형 경험
								</span>
							</CardFooter>
						</Card>
					</div>
				</section>
			)}

			<section {...stylex.props(styles.section)} aria-labelledby="stats-title">
				<h2 {...stylex.props(styles.sectionTitle)} id="stats-title">
					<span aria-hidden="true">📈 </span>
					논문 주요 결과
				</h2>
				<ul {...stylex.props(styles.statsGrid)} aria-label="연구 통계">
					<li {...stylex.props(styles.statCard)}>
						<span {...stylex.props(styles.statValue, gradients.primaryText)} aria-hidden="true">
							82.8%
						</span>
						<span {...stylex.props(styles.statLabel)}>
							<span {...stylex.props(styles.srOnly)}>82.8%: </span>
							Generative UI가 마크다운보다 선호됨
						</span>
					</li>
					<li {...stylex.props(styles.statCard)}>
						<span {...stylex.props(styles.statValue, gradients.primaryText)} aria-hidden="true">
							44%
						</span>
						<span {...stylex.props(styles.statLabel)}>
							<span {...stylex.props(styles.srOnly)}>44%: </span>
							인간 전문가 결과와 비교 가능
						</span>
					</li>
					<li {...stylex.props(styles.statCard)}>
						<span {...stylex.props(styles.statValue, gradients.primaryText)} aria-hidden="true">
							0%
						</span>
						<span {...stylex.props(styles.statLabel)}>
							<span {...stylex.props(styles.srOnly)}>0%: </span>
							최신 모델의 출력 오류율
						</span>
					</li>
				</ul>
			</section>

			<footer {...stylex.props(styles.footer)}>
				<p>
					Based on the paper:{" "}
					<a
						href="https://generativeui.github.io/static/pdfs/paper.pdf"
						target="_blank"
						rel="noopener noreferrer"
						{...stylex.props(styles.footerLink)}
					>
						&quot;Generative UI: LLMs are Effective UI Generators&quot;
						<span {...stylex.props(styles.srOnly)}>(새 탭에서 열림)</span>
					</a>
				</p>
				<p>Google Research, 2025</p>
			</footer>
		</main>
	);
}
