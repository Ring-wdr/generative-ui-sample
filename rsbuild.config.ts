import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import stylexPlugin from "unplugin-stylex/rspack";

// Docs: https://rsbuild.rs/config/
export default defineConfig({
	plugins: [pluginReact()],
	tools: {
		rspack: {
			plugins: [stylexPlugin()],
		},
	},
});
