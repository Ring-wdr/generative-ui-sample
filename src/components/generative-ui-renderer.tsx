import { ClockApp } from './clock-app';
import { FractalExplorer } from './fractal-explorer';
import { MathGame } from './math-game';
import { MemoryGame } from './memory-game';

interface GenerativeUIRendererProps {
  prompt: string;
}

export function GenerativeUIRenderer({ prompt }: GenerativeUIRendererProps) {
  if (prompt.includes('시간')) return <ClockApp />;
  if (prompt.includes('프랙탈')) return <FractalExplorer />;
  if (prompt.includes('덧셈') || prompt.includes('가르쳐')) return <MathGame />;
  if (prompt.includes('메모리') || prompt.includes('게임')) return <MemoryGame />;
  return null;
}
