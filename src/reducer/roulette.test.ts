import { describe, expect, it } from "vitest";
import { RouletteAction, initialState, rouletteReducer } from "./roulette";

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
