import { describe, expect, it } from "vitest";
import {
	getCurrentPrize,
	getCurrentResult,
	getIsDisableStart,
	getIsInitialStart,
	getNextMemberList,
	getNextPrizeList,
	getResultList,
	getResultListOutput,
	getRouletteItems,
	getSplitInputByNewLine,
} from "./functions";

describe("lottery functions", () => {
	describe("getRouletteItems", () => {
		it("convert memberList to roulette item", () => {
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
	});

	describe("getNextMemberList", () => {
		it("return memberList except first member", () => {
			const memberList = ["member1", "member2", "member3"];
			const winner = "member1";
			const actual = getNextMemberList(memberList, winner);
			expect(actual).toEqual(["member2", "member3"]);
		});
	});

	describe("getCurrentPrize", () => {
		it("return first prize", () => {
			const prizeList = ["prize1", "prize2", "prize3"];
			const actual = getCurrentPrize(prizeList);
			expect(actual).toEqual("prize1");
		});
	});

	describe("getNextPrizeList", () => {
		it("return prizeList except first prize", () => {
			const prizeList = ["prize1", "prize2", "prize3"];
			const actual = getNextPrizeList(prizeList);
			expect(actual).toEqual(["prize2", "prize3"]);
		});
	});

	describe("getIsDisableStart", () => {
		it("return true when memberList is empty", () => {
			const prizeList: string[] = [];
			const memberList: string[] = [];
			const actual = getIsDisableStart(memberList, prizeList);
			expect(actual).toEqual(true);
		});

		it("return true when prizeList is empty", () => {
			const prizeList: string[] = [];
			const memberList = ["member1", "member2", "member3"];
			const actual = getIsDisableStart(memberList, prizeList);
			expect(actual).toEqual(true);
		});

		it("return false when memberList and prizeList are not empty", () => {
			const prizeList = ["prize1", "prize2", "prize3"];
			const memberList = ["member1", "member2", "member3"];
			const actual = getIsDisableStart(memberList, prizeList);
			expect(actual).toEqual(false);
		});
	});

	describe("getResultListOutput", () => {
		it("return result list", () => {
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
	});

	describe("getSplitInputByNewLine", () => {
		it("split input by new line", () => {
			const input = "member1\nmember2\nmember3";
			const actual = getSplitInputByNewLine(input);
			expect(actual).toEqual(["member1", "member2", "member3"]);
		});
	});

	describe("getIsInitialStart", () => {
		it("return true when memberList and memberListInput are same length", () => {
			const memberList = ["member1", "member2", "member3"];
			const memberListInput = "member1\nmember2\nmember3";
			const actual = getIsInitialStart(memberList, memberListInput);
			expect(actual).toEqual(true);
		});
		it("return false when memberList and memberListInput are not same length", () => {
			const memberList = ["member1", "member2", "member3"];
			const memberListInput = "member1\nmember2\nmember3\nmember4";
			const actual = getIsInitialStart(memberList, memberListInput);
			expect(actual).toEqual(false);
		});
	});

	describe("getCurrentResult", () => {
		it("getCurrentResult - return current result", () => {
			const actual = getCurrentResult("member1", "prize1");
			expect(actual).toEqual("member1 - prize1");
		});
	});

	describe("getResultList", () => {
		it("return result list", () => {
			const actual = getResultList(
				["member1 - prize1", "member2 - prize2"],
				"member3 - prize3",
			);
			expect(actual).toEqual([
				"member1 - prize1",
				"member2 - prize2",
				"member3 - prize3",
			]);
		});
	});
});
