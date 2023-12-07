import { describe, it, expect } from "vitest";
import {
	RouletteAction,
	getCurrentPrize,
	getIsDisableStart,
	getNextMemberList,
	getNextPrizeList,
	getResultListOutput,
	getRouletteItems,
	getSplitInputByNewLine,
	initialState,
	rouletteReducer,
} from "./roulette";

describe("lotteryReducer", () => {
	it("should throw error when action is not valid", () => {
		const state = initialState;
		const action = { type: "INVALID" };
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(() => rouletteReducer(state, action)).toThrowError(
			"Invalid action type",
		);
	});

	describe("action: UPDATE_MEMBER_LIST", () => {
		it("should return state when action", () => {
			const state = initialState;
			const action: RouletteAction = {
				type: "UPDATE_MEMBER_LIST",
				memberListInput: "member1\nmember2\nmember3",
			};
			const actual = rouletteReducer(state, action);
			expect(actual).toEqual({
				...initialState,
				items: [
					{
						name: "member1",
					},
					{
						name: "member2",
					},
					{
						name: "member3",
					},
				],
				memberListInitial: "member1\nmember2\nmember3",
				memberListInput: "member1\nmember2\nmember3",
				memberList: ["member1", "member2", "member3"],
			});
		});
	});

	describe("action: UPDATE_PRIZE_LIST", () => {
		it("should return state when action", () => {
			const state = initialState;
			const action: RouletteAction = {
				type: "UPDATE_PRIZE_LIST",
				prizeListInput: "prize1\nprize2\nprize3",
			};
			const actual = rouletteReducer(state, action);
			expect(actual).toEqual({
				...initialState,
				prizeListInitial: "prize1\nprize2\nprize3",
				prizeListInput: "prize1\nprize2\nprize3",
				prizeList: ["prize1", "prize2", "prize3"],
			});
		});
	});

	it("should return state when action is STOP", () => {
		const state = initialState;
		const action: RouletteAction = { type: "STOP" };
		const actual = rouletteReducer(state, action);
		expect(actual).toEqual({
			...initialState,
			isDisableStop: true,
		});
	});

	it("should return state when action is RESET", () => {
		const state = {
			items: [],
			memberListInput: "member1\nmember2\nmember3",
			memberListInitial: "member1\nmember2\nmember3",
			memberList: ["member1", "member2", "member3"],

			prizeListInput: "prize1\nprize2\nprize3",
			prizeListInitial: "prize1\nprize2\nprize3",
			prizeList: ["prize1", "prize2", "prize3"],

			currentMember: "",
			currentPrize: "",
			currentResult: "",
			resultList: [],

			isDisableStart: false,
			isDisableStop: false,
			isDisableReset: false,
			isDisableInputForm: true,
		};
		const action: RouletteAction = { type: "RESET" };
		const actual = rouletteReducer(state, action);
		expect(actual).toEqual({
			items: [],
			memberListInput: "member1\nmember2\nmember3",
			memberListInitial: "member1\nmember2\nmember3",
			memberList: ["member1", "member2", "member3"],

			prizeListInput: "prize1\nprize2\nprize3",
			prizeListInitial: "prize1\nprize2\nprize3",
			prizeList: ["prize1", "prize2", "prize3"],

			currentMember: "",
			currentResult: "",
			currentPrize: "",
			resultList: [],

			isDisableStart: false,
			isDisableStop: true,
			isDisableReset: true,
			isDisableInputForm: false,
		});
	});
});

describe("lottery selector functions", () => {
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
