import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { FractalExplorer } from "./fractal-explorer";

describe("FractalExplorer", () => {
	afterEach(() => {
		cleanup();
	});

	describe("Rendering", () => {
		it("renders the title", () => {
			render(<FractalExplorer />);
			expect(screen.getByText("프랙탈 탐험기")).toBeInTheDocument();
		});

		it("renders the description about fractals", () => {
			render(<FractalExplorer />);
			expect(screen.getByText(/프랙탈은/)).toBeInTheDocument();
			expect(screen.getByText("자기유사성")).toBeInTheDocument();
		});

		it("renders iteration control label", () => {
			render(<FractalExplorer />);
			expect(screen.getByText(/반복 횟수:/)).toBeInTheDocument();
		});

		it("renders range input for iterations", () => {
			render(<FractalExplorer />);
			const rangeInput = screen.getByRole("slider");
			expect(rangeInput).toBeInTheDocument();
		});

		it("renders SVG with title", () => {
			render(<FractalExplorer />);
			expect(screen.getByTitle("프랙탈")).toBeInTheDocument();
		});

		it("renders triangle count info card", () => {
			render(<FractalExplorer />);
			expect(screen.getByText("삼각형 개수")).toBeInTheDocument();
		});

		it("renders Hausdorff dimension info card", () => {
			render(<FractalExplorer />);
			expect(screen.getByText("하우스도르프 차원")).toBeInTheDocument();
			expect(screen.getByText("≈ 1.585")).toBeInTheDocument();
		});
	});

	describe("Initial State", () => {
		it("starts with iteration value of 3", () => {
			render(<FractalExplorer />);
			expect(screen.getByText("반복 횟수: 3")).toBeInTheDocument();
		});

		it("displays correct initial triangle count (3^3 = 27)", () => {
			render(<FractalExplorer />);
			expect(screen.getByText("27")).toBeInTheDocument();
		});

		it("renders range input with correct initial value", () => {
			render(<FractalExplorer />);
			const rangeInput = screen.getByRole("slider") as HTMLInputElement;
			expect(rangeInput.value).toBe("3");
		});
	});

	describe("Range Input Configuration", () => {
		it("has minimum value of 0", () => {
			render(<FractalExplorer />);
			const rangeInput = screen.getByRole("slider") as HTMLInputElement;
			expect(rangeInput.min).toBe("0");
		});

		it("has maximum value of 6", () => {
			render(<FractalExplorer />);
			const rangeInput = screen.getByRole("slider") as HTMLInputElement;
			expect(rangeInput.max).toBe("6");
		});
	});

	describe("Iteration Changes", () => {
		it("updates iteration display when slider changes", () => {
			render(<FractalExplorer />);
			const rangeInput = screen.getByRole("slider");

			fireEvent.change(rangeInput, { target: { value: "5" } });

			expect(screen.getByText("반복 횟수: 5")).toBeInTheDocument();
		});

		it("updates triangle count when iteration changes to 0", () => {
			render(<FractalExplorer />);
			const rangeInput = screen.getByRole("slider");

			fireEvent.change(rangeInput, { target: { value: "0" } });

			expect(screen.getByText("1")).toBeInTheDocument();
		});

		it("updates triangle count when iteration changes to 1", () => {
			render(<FractalExplorer />);
			const rangeInput = screen.getByRole("slider");

			fireEvent.change(rangeInput, { target: { value: "1" } });

			expect(screen.getByText("3")).toBeInTheDocument();
		});

		it("updates triangle count when iteration changes to 4", () => {
			render(<FractalExplorer />);
			const rangeInput = screen.getByRole("slider");

			fireEvent.change(rangeInput, { target: { value: "4" } });

			expect(screen.getByText("81")).toBeInTheDocument();
		});

		it("updates triangle count when iteration changes to 6", () => {
			render(<FractalExplorer />);
			const rangeInput = screen.getByRole("slider");

			fireEvent.change(rangeInput, { target: { value: "6" } });

			expect(screen.getByText("729")).toBeInTheDocument();
		});
	});

	describe("Triangle Count Calculation", () => {
		it("correctly calculates 3^n for all iterations", () => {
			render(<FractalExplorer />);
			const rangeInput = screen.getByRole("slider");

			const expectedCounts = [1, 3, 9, 27, 81, 243, 729];

			for (let i = 0; i <= 6; i++) {
				fireEvent.change(rangeInput, { target: { value: i.toString() } });
				expect(screen.getByText(expectedCounts[i].toString())).toBeInTheDocument();
			}
		});
	});

	describe("SVG Generation", () => {
		it("generates SVG polygons for sierpinski triangle", () => {
			render(<FractalExplorer />);
			const svg = screen.getByTitle("프랙탈").closest("svg");
			expect(svg).toBeInTheDocument();

			const polygons = svg?.querySelectorAll("polygon");
			expect(polygons?.length).toBe(27);
		});

		it("updates polygon count when iteration changes", () => {
			render(<FractalExplorer />);
			const rangeInput = screen.getByRole("slider");

			fireEvent.change(rangeInput, { target: { value: "2" } });

			const svg = screen.getByTitle("프랙탈").closest("svg");
			const polygons = svg?.querySelectorAll("polygon");
			expect(polygons?.length).toBe(9);
		});
	});
});
