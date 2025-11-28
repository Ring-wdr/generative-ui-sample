import "./App.css";

import * as stylex from "@stylexjs/stylex";

import { ScrollProgress } from "./components/ui";
import { Page } from "./features/demo";
import { colors } from "./styles/tokens.stylex";

// Global styles
const globalStyles = stylex.create({
	root: {
		minHeight: "100vh",
		backgroundColor: colors.background,
		color: colors.foreground,
		fontFamily: "system-ui, sans-serif",
		WebkitFontSmoothing: "antialiased",
		MozOsxFontSmoothing: "grayscale",
	},
});

const App = () => {
	return (
		<div {...stylex.props(globalStyles.root)}>
			<ScrollProgress />
			<Page />
		</div>
	);
};

export default App;
