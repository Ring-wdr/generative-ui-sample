import { ErrorBoundary } from 'react-error-boundary';

import { ClockApp, FractalExplorer, MathGame, MemoryGame } from '../../components/apps';

interface GenerativeUIRendererProps {
  prompt: string;
}

// 프롬프트 키워드 → 컴포넌트 매핑 (if-else 체인 대신 조회 테이블 사용)
const PROMPT_COMPONENT_MAP: Array<{ keywords: string[]; Component: React.ComponentType }> = [
  { keywords: ['시간'], Component: ClockApp },
  { keywords: ['프랙탈'], Component: FractalExplorer },
  { keywords: ['덧셈', '가르쳐'], Component: MathGame },
  { keywords: ['메모리', '게임'], Component: MemoryGame },
];

function getComponentForPrompt(prompt: string): React.ComponentType | null {
  for (const { keywords, Component } of PROMPT_COMPONENT_MAP) {
    if (keywords.some((keyword) => prompt.includes(keyword))) {
      return Component;
    }
  }
  return null;
}

export function GenerativeUIRenderer({ prompt }: GenerativeUIRendererProps) {
  const MatchedComponent = getComponentForPrompt(prompt);

  if (!MatchedComponent) {
    return null;
  }

  return (
    <ErrorBoundary fallback={<div>컴포넌트 로드 중 오류가 발생했습니다.</div>}>
      <MatchedComponent />
    </ErrorBoundary>
  );
}
