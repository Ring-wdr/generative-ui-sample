import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MathGame } from "./math-game";

describe("MathGame", () => {
	afterEach(() => {
		cleanup();
	});

	describe("Rendering", () => {
		it("renders the game title", () => {
			render(<MathGame />);
			expect(screen.getByText("덧셈 놀이터")).toBeInTheDocument();
		});

		it("renders the initial score as 0", () => {
			render(<MathGame />);
			expect(screen.getByText("점수: 0점")).toBeInTheDocument();
		});

		it("renders three answer options", () => {
			render(<MathGame />);
			const buttons = screen.getAllByRole("button");
			expect(buttons).toHaveLength(3);
		});

		it("renders the math equation with question mark", () => {
			render(<MathGame />);
			expect(screen.getByText(/\d+ \+ \d+ = \?/)).toBeInTheDocument();
		});

		it("renders apple emojis for visual representation", () => {
			render(<MathGame />);
			const apples = screen.getAllByText("🍎");
			expect(apples.length).toBeGreaterThan(0);
		});
	});

	describe("Game Logic", () => {
		it("shows correct feedback when correct answer is selected", async () => {
			render(<MathGame />);

			const equationText = screen.getByText(/(\d+) \+ (\d+) = \?/).textContent;
			const match = equationText?.match(/(\d+) \+ (\d+)/);

			if (match) {
				const num1 = Number.parseInt(match[1], 10);
				const num2 = Number.parseInt(match[2], 10);
				const correctAnswer = num1 + num2;

				const correctButton = screen.getByRole("button", {
					name: correctAnswer.toString(),
				});
				fireEvent.click(correctButton);

				await waitFor(() => {
					expect(screen.getByText("정답이에요!")).toBeInTheDocument();
				});
			}
		});

		it("shows wrong feedback when incorrect answer is selected", async () => {
			render(<MathGame />);

			const equationText = screen.getByText(/(\d+) \+ (\d+) = \?/).textContent;
			const match = equationText?.match(/(\d+) \+ (\d+)/);

			if (match) {
				const num1 = Number.parseInt(match[1], 10);
				const num2 = Number.parseInt(match[2], 10);
				const correctAnswer = num1 + num2;

				const buttons = screen.getAllByRole("button");
				const wrongButton = buttons.find((btn) => btn.textContent !== correctAnswer.toString());

				if (wrongButton) {
					fireEvent.click(wrongButton);

					await waitFor(() => {
						expect(screen.getByText("다시 생각해보세요!")).toBeInTheDocument();
					});
				}
			}
		});

		it("increments score when correct answer is selected", async () => {
			render(<MathGame />);

			const equationText = screen.getByText(/(\d+) \+ (\d+) = \?/).textContent;
			const match = equationText?.match(/(\d+) \+ (\d+)/);

			if (match) {
				const num1 = Number.parseInt(match[1], 10);
				const num2 = Number.parseInt(match[2], 10);
				const correctAnswer = num1 + num2;

				const correctButton = screen.getByRole("button", {
					name: correctAnswer.toString(),
				});
				fireEvent.click(correctButton);

				await waitFor(() => {
					expect(screen.getByText("점수: 1점")).toBeInTheDocument();
				});
			}
		});

		it("disables buttons after correct answer", async () => {
			render(<MathGame />);

			const equationText = screen.getByText(/(\d+) \+ (\d+) = \?/).textContent;
			const match = equationText?.match(/(\d+) \+ (\d+)/);

			if (match) {
				const num1 = Number.parseInt(match[1], 10);
				const num2 = Number.parseInt(match[2], 10);
				const correctAnswer = num1 + num2;

				const correctButton = screen.getByRole("button", {
					name: correctAnswer.toString(),
				});
				fireEvent.click(correctButton);

				await waitFor(() => {
					const buttons = screen.getAllByRole("button");
					for (const button of buttons) {
						expect(button).toBeDisabled();
					}
				});
			}
		});
	});

	describe("Problem Generation", () => {
		it("generates numbers between 1 and 5", () => {
			render(<MathGame />);

			const equationText = screen.getByText(/(\d+) \+ (\d+) = \?/).textContent;
			const match = equationText?.match(/(\d+) \+ (\d+)/);

			if (match) {
				const num1 = Number.parseInt(match[1], 10);
				const num2 = Number.parseInt(match[2], 10);

				expect(num1).toBeGreaterThanOrEqual(1);
				expect(num1).toBeLessThanOrEqual(5);
				expect(num2).toBeGreaterThanOrEqual(1);
				expect(num2).toBeLessThanOrEqual(5);
			}
		});

		it("generates options including the correct answer", () => {
			render(<MathGame />);

			const equationText = screen.getByText(/(\d+) \+ (\d+) = \?/).textContent;
			const match = equationText?.match(/(\d+) \+ (\d+)/);

			if (match) {
				const num1 = Number.parseInt(match[1], 10);
				const num2 = Number.parseInt(match[2], 10);
				const correctAnswer = num1 + num2;

				const buttons = screen.getAllByRole("button");
				const buttonValues = buttons.map((btn) => Number.parseInt(btn.textContent || "0", 10));

				expect(buttonValues).toContain(correctAnswer);
			}
		});
	});
});
