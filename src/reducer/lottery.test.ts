import { describe, it, expect, vi } from "vitest";
import {
	inputToLotteryItemList,
	lotteryItemListToText,
	checkIsRunDisable,
	checkIsFinish,
	getRandomIndex,
	getActiveList,
} from "./lottery";

describe("inputToLotteryItemList", () => {
	it("should return empty array when input is empty", () => {
		const input = "";
		const actual = inputToLotteryItemList(input);
		expect(actual).toEqual([]);
	});

	it("should return empty array when input is not valid", () => {
		const input = "a\nb\nc";
		const actual = inputToLotteryItemList(input);
		expect(actual).toEqual([
			{ index: 0, name: "a" },
			{ index: 1, name: "b" },
			{ index: 2, name: "c" },
		]);
	});

	it("should return array of LotteryItem when input is valid", () => {
		const input = "a\nb\nc\n";
		const actual = inputToLotteryItemList(input);
		expect(actual).toEqual([
			{ index: 0, name: "a" },
			{ index: 1, name: "b" },
			{ index: 2, name: "c" },
		]);
	});
});

describe("lotteryItemListToText", () => {
	it("should return empty string when input is empty", () => {
		const actual = lotteryItemListToText([]);
		expect(actual).toEqual("");
	});

	it("should return string when input is not empty", () => {
		const input = [
			{ index: 0, name: "a" },
			{ index: 1, name: "b" },
			{ index: 2, name: "c" },
		];
		const actual = lotteryItemListToText(input);
		expect(actual).toEqual("a\nb\nc");
	});
});

// checkIsRunDisable testing
describe("checkIsRunDisable", () => {
	it("should return true when memberList is empty", () => {
		const prizeList = [{ index: 0, name: "a" }];
		const actual = checkIsRunDisable([], prizeList);
		expect(actual).toEqual(true);
	});

	it("should return true when prizeList is empty", () => {
		const memberList = [{ index: 0, name: "a" }];
		const actual = checkIsRunDisable(memberList, []);
		expect(actual).toEqual(true);
	});

	it("should return false when memberList and prizeList are not empty", () => {
		const memberList = [{ index: 0, name: "a" }];
		const prizeList = [{ index: 0, name: "a" }];
		const actual = checkIsRunDisable(memberList, prizeList);
		expect(actual).toEqual(false);
	});
});

describe("checkIsFinish", () => {
	it("should return true when memberList is empty", () => {
		const prizeList = [{ index: 0, name: "a" }];
		const actual = checkIsFinish([], prizeList);
		expect(actual).toEqual(true);
	});

	it("should return true when prizeList is empty", () => {
		const memberList = [{ index: 0, name: "a" }];
		const actual = checkIsFinish(memberList, []);
		expect(actual).toEqual(true);
	});

	it("should return false when memberList and prizeList are not empty", () => {
		const memberList = [{ index: 0, name: "a" }];
		const prizeList = [{ index: 0, name: "a" }];
		const actual = checkIsFinish(memberList, prizeList);
		expect(actual).toEqual(false);
	});
});

describe("getRandomIndex", () => {
	it("should return 0 when length is 1", () => {
		vi.spyOn(Math, "random").mockImplementationOnce(() => 0);
		const actual = getRandomIndex(1);
		expect(actual).toEqual(0);
	});

	it("should return 0 when length is 2", () => {
		vi.spyOn(Math, "random").mockImplementationOnce(() => 0);
		const actual = getRandomIndex(2);
		expect(actual).toEqual(0);
	});

	it("should return 1 when length is 2", () => {
		vi.spyOn(Math, "random").mockImplementationOnce(() => 0.5);
		const actual = getRandomIndex(2);
		expect(actual).toEqual(1);
	});
});

describe("getActiveList", () => {
	it("should return activeList when prevActiveList is not empty and random is 0", () => {
		const prevActiveList = [
			{ index: 0, name: "a" },
			{ index: 1, name: "b" },
			{ index: 2, name: "c" },
			{ index: 3, name: "d" },
		];
		vi.spyOn(Math, "random").mockImplementationOnce(() => 0);
		const actual = getActiveList(prevActiveList);

		expect(actual).toEqual({
			pickItem: { index: 0, name: "a" },
			activeList: [
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
				{ index: 3, name: "d" },
			],
			textActiveList: "b\nc\nd",
		});
	});

	it("should return activeList when prevActiveList is not empty and random is 0.5", () => {
		const prevActiveList = [
			{ index: 0, name: "a" },
			{ index: 1, name: "b" },
			{ index: 2, name: "c" },
			{ index: 3, name: "d" },
		];
		vi.spyOn(Math, "random").mockImplementationOnce(() => 0.5);
		const actual = getActiveList(prevActiveList);

		expect(actual).toEqual({
			pickItem: { index: 2, name: "c" },
			activeList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 3, name: "d" },
			],
			textActiveList: "a\nb\nd",
		});
	});
});
