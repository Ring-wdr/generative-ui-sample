# Generative UI Sample

![Version](https://img.shields.io/badge/version-1.0.2-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Tests](https://img.shields.io/badge/tests-57%20passed-brightgreen.svg)
![Coverage](https://img.shields.io/badge/coverage-98.25%25-brightgreen.svg)

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-runtime-F9F1E1?logo=bun&logoColor=black)
![Rsbuild](https://img.shields.io/badge/Rsbuild-1.6-FF6C37?logo=rspack&logoColor=white)
![StyleX](https://img.shields.io/badge/StyleX-0.17-764ABC)

프롬프트 기반으로 동적 UI 컴포넌트를 렌더링하는 샘플 프로젝트입니다.

## Demo

[https://ring-wdr.github.io/generative-ui-sample/](https://ring-wdr.github.io/generative-ui-sample/)

## Features

- **Clock App** - 실시간 시계 컴포넌트
- **Fractal Explorer** - 프랙탈 탐색기
- **Math Game** - 덧셈 학습 게임
- **Memory Game** - 메모리 카드 게임

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Build Tool | Rsbuild |
| Styling | StyleX |
| Language | TypeScript |
| Runtime | Bun |
| Testing | bun:test + Testing Library |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (권장) 또는 Node.js

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

### Build

```bash
bun run build
```

### Preview

```bash
bun run preview
```

## Testing

```bash
# Run tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage
```

### Test Coverage

| Component | Tests | Coverage |
|-----------|-------|----------|
| MathGame | 11 | 97.16% |
| ClockApp | 12 | 100% |
| MemoryGame | 14 | 94.12% |
| FractalExplorer | 20 | 100% |
| **Total** | **57** | **98.25%** |

## Deployment

GitHub Actions를 통해 main 브랜치에 push 시 자동으로 GitHub Pages에 배포됩니다.

## License

MIT
