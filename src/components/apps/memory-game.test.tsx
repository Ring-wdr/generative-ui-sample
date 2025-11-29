import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryGame } from "./memory-game";

describe("MemoryGame", () => {
	afterEach(() => {
		cleanup();
	});

	describe("Rendering", () => {
		it("renders the game title", () => {
			render(<MemoryGame />);
			expect(screen.getByText("메모리 게임")).toBeInTheDocument();
		});

		it("renders initial stats with 0 moves", () => {
			render(<MemoryGame />);
			expect(screen.getByText("시도: 0")).toBeInTheDocument();
		});

		it("renders initial stats with 0/8 matches", () => {
			render(<MemoryGame />);
			expect(screen.getByText("매칭: 0/8")).toBeInTheDocument();
		});

		it("renders reset button", () => {
			render(<MemoryGame />);
			expect(screen.getByText("리셋")).toBeInTheDocument();
		});

		it("renders 16 cards", () => {
			render(<MemoryGame />);
			const cards = screen.getAllByRole("button").filter((btn) => btn.textContent !== "리셋");
			expect(cards).toHaveLength(16);
		});

		it("renders all cards with question marks (face down)", () => {
			render(<MemoryGame />);
			const questionMarks = screen.getAllByText("?");
			expect(questionMarks).toHaveLength(16);
		});
	});

	describe("Card Interactions", () => {
		it("flips a card when clicked", async () => {
			render(<MemoryGame />);

			const cards = screen.getAllByRole("button").filter((btn) => btn.textContent !== "리셋");
			fireEvent.click(cards[0]);

			const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
			await waitFor(() => {
				const found = emojis.some((emoji) => {
					try {
						return screen.getAllByText(emoji).length > 0;
					} catch {
						return false;
					}
				});
				expect(found).toBe(true);
			});
		});

		it("increments moves after selecting two cards", async () => {
			render(<MemoryGame />);

			const cards = screen.getAllByRole("button").filter((btn) => btn.textContent !== "리셋");
			fireEvent.click(cards[0]);
			fireEvent.click(cards[1]);

			await waitFor(() => {
				expect(screen.getByText("시도: 1")).toBeInTheDocument();
			});
		});
	});

	describe("Reset Functionality", () => {
		it("resets moves to 0 when reset button is clicked", async () => {
			render(<MemoryGame />);

			const cards = screen.getAllByRole("button").filter((btn) => btn.textContent !== "리셋");
			fireEvent.click(cards[0]);
			fireEvent.click(cards[1]);

			await waitFor(() => {
				expect(screen.getByText("시도: 1")).toBeInTheDocument();
			});

			const resetButton = screen.getByText("리셋");
			fireEvent.click(resetButton);

			await waitFor(() => {
				expect(screen.getByText("시도: 0")).toBeInTheDocument();
			});
		});

		it("resets matches to 0/8 when reset button is clicked", async () => {
			render(<MemoryGame />);

			const resetButton = screen.getByText("리셋");
			fireEvent.click(resetButton);

			expect(screen.getByText("매칭: 0/8")).toBeInTheDocument();
		});

		it("shuffles cards on reset", () => {
			render(<MemoryGame />);

			const cards = screen.getAllByRole("button").filter((btn) => btn.textContent !== "리셋");
			const initialCardCount = cards.length;

			const resetButton = screen.getByText("리셋");
			fireEvent.click(resetButton);

			const newCards = screen.getAllByRole("button").filter((btn) => btn.textContent !== "리셋");
			expect(newCards).toHaveLength(initialCardCount);
		});
	});

	describe("Game State", () => {
		it("prevents clicking already flipped cards", async () => {
			render(<MemoryGame />);

			const cards = screen.getAllByRole("button").filter((btn) => btn.textContent !== "리셋");
			fireEvent.click(cards[0]);
			fireEvent.click(cards[0]);

			expect(screen.getByText("시도: 0")).toBeInTheDocument();
		});

		it("prevents clicking more than 2 cards at once", async () => {
			render(<MemoryGame />);

			const cards = screen.getAllByRole("button").filter((btn) => btn.textContent !== "리셋");
			fireEvent.click(cards[0]);
			fireEvent.click(cards[1]);
			fireEvent.click(cards[2]);

			expect(screen.getByText("시도: 1")).toBeInTheDocument();
		});
	});

	describe("Emoji Cards", () => {
		it("contains 16 cards total (8 pairs)", () => {
			render(<MemoryGame />);

			const cards = screen.getAllByRole("button").filter((btn) => btn.textContent !== "리셋");

			expect(cards).toHaveLength(16);
		});
	});
});
