import { describe, it, expect } from "vitest";
import {
	getCurrentPrize,
	getIsDisableStart,
	getNextMemberList,
	getNextPrizeList,
	getResultListOutput,
	getRouletteItems,
	getSplitInputByNewLine,
} from "./functions";

describe("lottery functions", () => {
	it("getRouletteItems - convert memberList to roulette item", () => {
		const memberList = ["member1", "member2", "member3"];
		const actual = getRouletteItems(memberList);
		expect(actual).toEqual([
			{
				name: "member1",
			},
			{
				name: "member2",
			},
			{
				name: "member3",
			},
		]);
	});

	it("getNextMemberList - return memberList except first member", () => {
		const memberList = ["member1", "member2", "member3"];
		const winner = "member1";
		const actual = getNextMemberList(memberList, winner);
		expect(actual).toEqual(["member2", "member3"]);
	});

	it("getCurrentPrize - return first prize", () => {
		const prizeList = ["prize1", "prize2", "prize3"];
		const actual = getCurrentPrize(prizeList);
		expect(actual).toEqual("prize1");
	});

	it("getNextPrizeList - return prizeList except first prize", () => {
		const prizeList = ["prize1", "prize2", "prize3"];
		const actual = getNextPrizeList(prizeList);
		expect(actual).toEqual(["prize2", "prize3"]);
	});

	it("getIsDisableStart - return true when prizeList is empty", () => {
		const prizeList: string[] = [];
		const memberList = ["member1", "member2", "member3"];
		const actual = getIsDisableStart(memberList, prizeList);
		expect(actual).toEqual(true);
	});

	it("getResultListOutput - return result list", () => {
		const resultList = [
			"member1 - prize1",
			"member2 - prize2",
			"member3 - prize3",
		];
		const actual = getResultListOutput(resultList);
		expect(actual).toEqual(
			"member1 - prize1\nmember2 - prize2\nmember3 - prize3",
		);
	});

	it("getSplitInputByNewLine - split input by new line", () => {
		const input = "member1\nmember2\nmember3";
		const actual = getSplitInputByNewLine(input);
		expect(actual).toEqual(["member1", "member2", "member3"]);
	});
});
