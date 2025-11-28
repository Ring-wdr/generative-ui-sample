import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import stylexPlugin from "unplugin-stylex/rspack";

// Docs: https://rsbuild.rs/config/
export default defineConfig({
	plugins: [pluginReact()],
	output: {
		assetPrefix: "/generative-ui-sample/",
	},
	tools: {
		rspack: {
			plugins: [stylexPlugin()],
		},
	},
});
