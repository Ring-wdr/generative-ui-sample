import * as stylex from "@stylexjs/stylex";
import {
	BarChart3,
	BookOpen,
	Check,
	ExternalLink,
	Palette,
	Sparkles,
	Type,
	X,
	Zap,
} from "lucide-react";
import { useRef, useState } from "react";

import { colors, fontSize, fontWeight, radius, spacing } from "@/styles/tokens.stylex";

import {
	Badge,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Spinner,
} from "../../components/ui";
import { useScrollAnimation } from "../../hooks";
import { EXAMPLE_PROMPTS, MARKDOWN_RESPONSES } from "./data";
import { GenerativeUIRenderer } from "./generative-ui-renderer";

// Scroll animation keyframes
const fadeInUp = stylex.keyframes({
	"0%": { opacity: 0, transform: "translateY(30px)" },
	"100%": { opacity: 1, transform: "translateY(0)" },
});

const fadeInLeft = stylex.keyframes({
	"0%": { opacity: 0, transform: "translateX(-30px)" },
	"100%": { opacity: 1, transform: "translateX(0)" },
});

const fadeInRight = stylex.keyframes({
	"0%": { opacity: 0, transform: "translateX(30px)" },
	"100%": { opacity: 1, transform: "translateX(0)" },
});

const styles = stylex.create({
	page: {
		minHeight: "100vh",
		padding: spacing.xl,
		maxWidth: 1400,
		marginTop: 0,
		marginBottom: 0,
		marginLeft: "auto",
		marginRight: "auto",
		"@media (max-width: 768px)": {
			padding: spacing.md,
		},
	},
	// Cinematic Hero Section
	hero: {
		position: "relative",
		minHeight: "70vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginBottom: spacing.xxxl,
		paddingTop: spacing.xxxl,
		paddingBottom: spacing.xxxl,
	},
	heroContent: {
		maxWidth: 800,
	},
	heroTag: {
		display: "inline-flex",
		alignItems: "center",
		gap: spacing.sm,
		padding: `${spacing.xs} ${spacing.md}`,
		backgroundColor: colors.cardBg,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
		borderRadius: radius.sm,
		fontSize: fontSize.sm,
		color: colors.primary,
		marginBottom: spacing.lg,
		fontWeight: fontWeight.medium,
	},
	heroTitle: {
		fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
		fontWeight: fontWeight.bold,
		lineHeight: 1.1,
		marginBottom: spacing.lg,
		color: colors.foreground,
		letterSpacing: "-0.02em",
	},
	heroHighlight: {
		color: colors.primary,
	},
	heroDescription: {
		fontSize: fontSize.xl,
		color: colors.muted,
		lineHeight: 1.6,
		maxWidth: 600,
	},
	// Asymmetric Concept Section
	conceptSection: {
		marginBottom: spacing.xxxl,
	},
	sectionLabel: {
		display: "inline-flex",
		alignItems: "center",
		gap: spacing.sm,
		fontSize: fontSize.sm,
		color: colors.primary,
		fontWeight: fontWeight.semibold,
		textTransform: "uppercase",
		letterSpacing: "0.1em",
		marginBottom: spacing.md,
	},
	sectionTitle: {
		fontSize: fontSize.xxxl,
		fontWeight: fontWeight.bold,
		marginBottom: spacing.xl,
		color: colors.foreground,
	},
	// Asymmetric Grid
	asymmetricGrid: {
		display: "grid",
		gridTemplateColumns: "1.2fr 0.8fr",
		gap: spacing.xl,
		"@media (max-width: 768px)": {
			gridTemplateColumns: "1fr",
		},
	},
	conceptCard: {
		padding: spacing.xl,
		backgroundColor: colors.cardBg,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
		borderRadius: radius.md,
	},
	conceptCardLarge: {
		gridRow: "span 2",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	conceptIcon: {
		width: 48,
		height: 48,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.background,
		borderRadius: radius.sm,
		marginBottom: spacing.lg,
		color: colors.primary,
	},
	conceptCardTitle: {
		fontSize: fontSize.xl,
		fontWeight: fontWeight.semibold,
		marginBottom: spacing.sm,
		color: colors.foreground,
	},
	conceptCardDescription: {
		color: colors.muted,
		lineHeight: 1.7,
	},
	// Demo Section
	demoSection: {
		marginBottom: spacing.xxxl,
	},
	promptGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
		gap: spacing.md,
		borderWidth: 0,
		padding: 0,
		margin: 0,
		marginTop: spacing.xl,
	},
	promptBtn: {
		padding: spacing.lg,
		backgroundColor: colors.cardBg,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
		borderRadius: radius.sm,
		color: colors.foreground,
		cursor: "pointer",
		transition: "all 0.15s ease",
		fontSize: fontSize.sm,
		fontWeight: fontWeight.medium,
		textAlign: "left",
		":hover": {
			borderColor: colors.primary,
			backgroundColor: colors.gradientStart,
		},
		":focus-visible": {
			outline: "2px solid",
			outlineColor: colors.primary,
			outlineOffset: "2px",
		},
	},
	promptBtnSelected: {
		borderColor: colors.primary,
		backgroundColor: colors.gradientStart,
	},
	// Comparison - Asymmetric
	comparisonSection: {
		marginBottom: spacing.xxxl,
	},
	comparisonGrid: {
		display: "grid",
		gridTemplateColumns: "0.9fr 1.1fr",
		gap: spacing.xl,
		alignItems: "start",
		"@media (max-width: 900px)": {
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
		fontSize: fontSize.sm,
		lineHeight: 1.6,
		color: colors.muted,
	},
	generativeContent: {
		minHeight: 300,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	// Stats - Staggered Layout
	statsSection: {
		marginBottom: spacing.xxxl,
	},
	statsGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		gap: spacing.lg,
		listStyle: "none",
		padding: 0,
		margin: 0,
		"@media (max-width: 768px)": {
			gridTemplateColumns: "1fr",
		},
	},
	statCard: {
		padding: spacing.xl,
		backgroundColor: colors.cardBg,
		borderRadius: radius.sm,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.cardBorder,
	},
	statCardOffset: {
		transform: "translateY(20px)",
		"@media (max-width: 768px)": {
			transform: "none",
		},
	},
	statValue: {
		display: "block",
		fontSize: fontSize.xxxxl,
		fontWeight: fontWeight.bold,
		marginBottom: spacing.xs,
		color: colors.primary,
	},
	statLabel: {
		color: colors.muted,
		fontSize: fontSize.sm,
		lineHeight: 1.5,
	},
	// Footer
	footer: {
		textAlign: "center",
		padding: spacing.xxl,
		borderTopWidth: 1,
		borderTopStyle: "solid",
		borderTopColor: colors.cardBorder,
		color: colors.mutedForeground,
		fontSize: fontSize.sm,
	},
	footerLink: {
		display: "inline-flex",
		alignItems: "center",
		gap: spacing.xs,
		color: colors.primary,
		textDecoration: "none",
		fontWeight: fontWeight.medium,
		":hover": {
			textDecoration: "underline",
		},
		":focus-visible": {
			outline: "2px solid",
			outlineColor: colors.primary,
			outlineOffset: "2px",
		},
	},
	// Animation states
	animateHidden: {
		opacity: 0,
	},
	animateFadeInUp: {
		animationName: fadeInUp,
		animationDuration: "0.6s",
		animationTimingFunction: "ease-out",
		animationFillMode: "forwards",
	},
	animateFadeInLeft: {
		animationName: fadeInLeft,
		animationDuration: "0.6s",
		animationTimingFunction: "ease-out",
		animationFillMode: "forwards",
	},
	animateFadeInRight: {
		animationName: fadeInRight,
		animationDuration: "0.6s",
		animationTimingFunction: "ease-out",
		animationFillMode: "forwards",
	},
	animateDelay1: {
		animationDelay: "0.1s",
	},
	animateDelay2: {
		animationDelay: "0.2s",
	},
	animateDelay3: {
		animationDelay: "0.3s",
	},
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
	cardFooterItem: {
		display: "inline-flex",
		alignItems: "center",
		gap: spacing.xs,
	},
});

// Animated Section Component
function AnimatedSection({
	children,
	animation = "fadeInUp",
	sectionStyle,
	...props
}: {
	children: React.ReactNode;
	animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight";
	sectionStyle?: stylex.StaticStyles;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "style">) {
	const { ref, isVisible } = useScrollAnimation<HTMLElement>();

	const animationStyle = {
		fadeInUp: styles.animateFadeInUp,
		fadeInLeft: styles.animateFadeInLeft,
		fadeInRight: styles.animateFadeInRight,
	}[animation];

	return (
		<section
			ref={ref}
			{...stylex.props(styles.animateHidden, isVisible && animationStyle, sectionStyle)}
			{...props}
		>
			{children}
		</section>
	);
}

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
			{/* Hero Section */}
			<header {...stylex.props(styles.hero)}>
				<div {...stylex.props(styles.heroContent)}>
					<div {...stylex.props(styles.heroTag)}>
						<Sparkles size={14} aria-hidden="true" />
						Research Preview
					</div>
					<h1 {...stylex.props(styles.heroTitle)}>
						LLM이 만드는
						<br />
						<span {...stylex.props(styles.heroHighlight)}>인터페이스</span>의 미래
					</h1>
					<p {...stylex.props(styles.heroDescription)}>
						콘텐츠를 넘어 UI 자체를 생성하는 새로운 패러다임. 프롬프트 하나로 게임, 시뮬레이션,
						데이터 시각화까지.
					</p>
				</div>
			</header>

			{/* Concept Section - Asymmetric */}
			<AnimatedSection sectionStyle={styles.conceptSection} aria-labelledby="concept-title">
				<div {...stylex.props(styles.sectionLabel)}>
					<BookOpen size={14} aria-hidden="true" />
					Core Concept
				</div>
				<h2 {...stylex.props(styles.sectionTitle)} id="concept-title">
					핵심 개념
				</h2>
				<div {...stylex.props(styles.asymmetricGrid)}>
					<article
						{...stylex.props(styles.conceptCard, styles.conceptCardLarge)}
						aria-label="Generative UI 설명"
					>
						<div {...stylex.props(styles.conceptIcon)}>
							<Sparkles size={24} aria-hidden="true" />
						</div>
						<h3 {...stylex.props(styles.conceptCardTitle)}>Generative UI</h3>
						<p {...stylex.props(styles.conceptCardDescription)}>
							LLM이 맞춤형 UI 자체를 생성합니다. 프롬프트에 따라 인터랙티브한 게임, 실시간
							시뮬레이션, 동적 데이터 시각화 등 다양한 인터페이스를 즉시 만들어냅니다. 정적인
							텍스트를 넘어선 완전히 새로운 경험.
						</p>
					</article>
					<article {...stylex.props(styles.conceptCard)} aria-label="기존 방식 설명">
						<div {...stylex.props(styles.conceptIcon)}>
							<Type size={24} aria-hidden="true" />
						</div>
						<h3 {...stylex.props(styles.conceptCardTitle)}>기존 방식</h3>
						<p {...stylex.props(styles.conceptCardDescription)}>
							마크다운 텍스트 출력. 읽기 쉽지만 정적이고 인터랙션이 없습니다.
						</p>
					</article>
					<article {...stylex.props(styles.conceptCard)} aria-label="차이점">
						<div {...stylex.props(styles.conceptIcon)}>
							<Zap size={24} aria-hidden="true" />
						</div>
						<h3 {...stylex.props(styles.conceptCardTitle)}>차이점</h3>
						<p {...stylex.props(styles.conceptCardDescription)}>
							같은 프롬프트, 완전히 다른 결과. 텍스트 vs 체험.
						</p>
					</article>
				</div>
			</AnimatedSection>

			{/* Demo Section */}
			<AnimatedSection
				sectionStyle={styles.demoSection}
				animation="fadeInLeft"
				aria-labelledby="demo-title"
			>
				<div {...stylex.props(styles.sectionLabel)}>
					<Palette size={14} aria-hidden="true" />
					Interactive Demo
				</div>
				<h2 {...stylex.props(styles.sectionTitle)} id="demo-title">
					직접 체험해보세요
				</h2>
				<p style={{ color: "var(--muted)", marginBottom: 0 }}>
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
							)}
							onClick={() => handlePromptSelect(prompt)}
							aria-pressed={selectedPrompt === prompt}
						>
							{prompt}
						</button>
					))}
				</fieldset>
			</AnimatedSection>

			{isGenerating && <Spinner message="UI 생성 중..." />}

			{showComparison && selectedPrompt && (
				<AnimatedSection
					sectionStyle={styles.comparisonSection}
					animation="fadeInUp"
					aria-labelledby="comparison-title"
					aria-live="polite"
				>
					<div {...stylex.props(styles.sectionLabel)}>
						<BarChart3 size={14} aria-hidden="true" />
						Comparison
					</div>
					<h2 {...stylex.props(styles.sectionTitle)} id="comparison-title">
						비교 결과
					</h2>
					<span {...stylex.props(styles.srOnly)}>선택한 프롬프트: {selectedPrompt}</span>

					<div {...stylex.props(styles.comparisonGrid)}>
						<Card as="article" aria-labelledby="markdown-title">
							<CardHeader>
								<Badge>기존 방식</Badge>
								<CardTitle id="markdown-title">
									<Type
										size={16}
										aria-hidden="true"
										style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }}
									/>
									Markdown
								</CardTitle>
							</CardHeader>
							<CardContent style={styles.markdownContent}>
								<pre {...stylex.props(styles.markdownPre)}>
									{MARKDOWN_RESPONSES[selectedPrompt]}
								</pre>
							</CardContent>
							<CardFooter>
								<span {...stylex.props(styles.cardFooterItem)}>
									<X size={14} aria-hidden="true" />
									정적
								</span>
								<span {...stylex.props(styles.cardFooterItem)}>
									<X size={14} aria-hidden="true" />
									인터랙션 없음
								</span>
							</CardFooter>
						</Card>

						<Card as="article" aria-labelledby="generative-title">
							<CardHeader>
								<Badge variant="highlight">Generative UI</Badge>
								<CardTitle id="generative-title">
									<Sparkles
										size={16}
										aria-hidden="true"
										style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }}
									/>
									동적 UI
								</CardTitle>
							</CardHeader>
							<CardContent style={styles.generativeContent}>
								<GenerativeUIRenderer prompt={selectedPrompt} />
							</CardContent>
							<CardFooter>
								<span {...stylex.props(styles.cardFooterItem)}>
									<Check size={14} aria-hidden="true" />
									인터랙티브
								</span>
								<span {...stylex.props(styles.cardFooterItem)}>
									<Check size={14} aria-hidden="true" />
									맞춤형 경험
								</span>
							</CardFooter>
						</Card>
					</div>
				</AnimatedSection>
			)}

			{/* Stats Section - Staggered */}
			<AnimatedSection
				sectionStyle={styles.statsSection}
				animation="fadeInRight"
				aria-labelledby="stats-title"
			>
				<div {...stylex.props(styles.sectionLabel)}>
					<BarChart3 size={14} aria-hidden="true" />
					Research Results
				</div>
				<h2 {...stylex.props(styles.sectionTitle)} id="stats-title">
					논문 주요 결과
				</h2>
				<ul {...stylex.props(styles.statsGrid)} aria-label="연구 통계">
					<li {...stylex.props(styles.statCard)}>
						<span {...stylex.props(styles.statValue)} aria-hidden="true">
							82.8%
						</span>
						<span {...stylex.props(styles.statLabel)}>
							<span {...stylex.props(styles.srOnly)}>82.8%: </span>
							Generative UI가 마크다운보다 선호됨
						</span>
					</li>
					<li {...stylex.props(styles.statCard, styles.statCardOffset)}>
						<span {...stylex.props(styles.statValue)} aria-hidden="true">
							44%
						</span>
						<span {...stylex.props(styles.statLabel)}>
							<span {...stylex.props(styles.srOnly)}>44%: </span>
							인간 전문가 결과와 비교 가능
						</span>
					</li>
					<li {...stylex.props(styles.statCard)}>
						<span {...stylex.props(styles.statValue)} aria-hidden="true">
							0%
						</span>
						<span {...stylex.props(styles.statLabel)}>
							<span {...stylex.props(styles.srOnly)}>0%: </span>
							최신 모델의 출력 오류율
						</span>
					</li>
				</ul>
			</AnimatedSection>

			{/* Footer */}
			<footer {...stylex.props(styles.footer)}>
				<p>
					Based on:{" "}
					<a
						href="https://generativeui.github.io/static/pdfs/paper.pdf"
						target="_blank"
						rel="noopener noreferrer"
						{...stylex.props(styles.footerLink)}
					>
						"Generative UI: LLMs are Effective UI Generators"
						<ExternalLink size={12} aria-hidden="true" />
						<span {...stylex.props(styles.srOnly)}>(새 탭에서 열림)</span>
					</a>
				</p>
				<p style={{ marginTop: 8 }}>Google Research, 2025</p>
			</footer>
		</main>
	);
}
