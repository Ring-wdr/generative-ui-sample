import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import stylexPlugin from "unplugin-stylex/rspack";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Docs: https://rsbuild.rs/config/
export default defineConfig(({ env }) => {
	return {
		plugins: [pluginReact()],
		resolve: {
			alias: {
				"@": "./src",
			},
		},
		html: {
			title: "Generative UI Demo - LLM이 인터페이스를 생성하는 새로운 패러다임",
			meta: {
				description:
					"LLM이 콘텐츠뿐만 아니라 인터페이스 자체를 생성하는 Generative UI 데모. 마크다운 응답과 동적 UI를 비교해보세요.",
				keywords: "Generative UI, LLM, AI, React, User Interface, Google Research",
				author: "Based on Google Research Paper",
				"og:title": "Generative UI Demo",
				"og:description": "LLM이 콘텐츠뿐만 아니라 인터페이스 자체를 생성하는 새로운 패러다임",
				"og:type": "website",
				"twitter:card": "summary_large_image",
				"twitter:title": "Generative UI Demo",
				"twitter:description": "LLM이 콘텐츠뿐만 아니라 인터페이스 자체를 생성하는 새로운 패러다임",
			},
		},
		output: {
			assetPrefix: "/generative-ui-sample/",
		},
		tools: {
			rspack: {
				plugins: [
					stylexPlugin({
						dev: env === "development",
						stylex: {
							treeshakeCompensation: true,
							aliases: {
								"@/*": [path.join(__dirname, "src/*")],
							},
						},
					}),
				],
			},
		},
	};
});
