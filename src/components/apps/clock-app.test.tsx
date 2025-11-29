import { afterEach, describe, expect, it, spyOn } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { ClockApp } from "./clock-app";

describe("ClockApp", () => {
	afterEach(() => {
		cleanup();
	});

	describe("Rendering", () => {
		it("renders the title", () => {
			render(<ClockApp />);
			expect(screen.getByText("세계 시계")).toBeInTheDocument();
		});

		it("renders Seoul timezone indicator", () => {
			render(<ClockApp />);
			expect(screen.getByText("서울 (KST)")).toBeInTheDocument();
		});

		it("renders world city clocks", () => {
			render(<ClockApp />);
			expect(screen.getByText("뉴욕")).toBeInTheDocument();
			expect(screen.getByText("런던")).toBeInTheDocument();
			expect(screen.getByText("도쿄")).toBeInTheDocument();
		});

		it("renders time in HH:MM:SS format", () => {
			render(<ClockApp />);
			const timeDigits = screen.getAllByText(/^\d{2}$/);
			expect(timeDigits.length).toBeGreaterThanOrEqual(3);
		});

		it("renders colon separators", () => {
			render(<ClockApp />);
			const separators = screen.getAllByText(":");
			expect(separators).toHaveLength(2);
		});
	});

	describe("Time Display", () => {
		it("displays valid hours (00-23)", () => {
			render(<ClockApp />);

			const timeDigits = screen.getAllByText(/^\d{2}$/);
			const hoursElement = timeDigits[0];

			const hoursValue = Number.parseInt(hoursElement.textContent || "0", 10);
			expect(hoursValue).toBeGreaterThanOrEqual(0);
			expect(hoursValue).toBeLessThanOrEqual(23);
		});

		it("displays valid minutes (00-59)", () => {
			render(<ClockApp />);

			const timeDigits = screen.getAllByText(/^\d{2}$/);
			const minutesElement = timeDigits[1];

			const minutesValue = Number.parseInt(minutesElement.textContent || "0", 10);
			expect(minutesValue).toBeGreaterThanOrEqual(0);
			expect(minutesValue).toBeLessThanOrEqual(59);
		});

		it("displays valid seconds (00-59)", () => {
			render(<ClockApp />);

			const timeDigits = screen.getAllByText(/^\d{2}$/);
			const secondsElement = timeDigits[2];

			const secondsValue = Number.parseInt(secondsElement.textContent || "0", 10);
			expect(secondsValue).toBeGreaterThanOrEqual(0);
			expect(secondsValue).toBeLessThanOrEqual(59);
		});
	});

	describe("World Clocks", () => {
		it("displays three world clocks", () => {
			render(<ClockApp />);

			const cities = ["뉴욕", "런던", "도쿄"];
			for (const city of cities) {
				expect(screen.getByText(city)).toBeInTheDocument();
			}
		});

		it("displays world clock times in HH:MM format", () => {
			render(<ClockApp />);

			const worldClockTimes = screen.getAllByText(/^\d{2}:\d{2}$/);
			expect(worldClockTimes).toHaveLength(3);
		});
	});

	describe("Timer Updates", () => {
		it("updates time every second", () => {
			const mockSetInterval = spyOn(globalThis, "setInterval");

			render(<ClockApp />);

			expect(mockSetInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

			mockSetInterval.mockRestore();
		});

		it("cleans up interval on unmount", () => {
			const mockClearInterval = spyOn(globalThis, "clearInterval");

			const { unmount } = render(<ClockApp />);
			unmount();

			expect(mockClearInterval).toHaveBeenCalled();

			mockClearInterval.mockRestore();
		});
	});
});
