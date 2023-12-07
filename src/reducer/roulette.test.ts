import { describe, expect, it } from "vitest";
import { RouletteAction, initialState, rouletteReducer } from "./roulette";

describe("lotteryReducer", () => {
	it("should throw error when action is not valid", () => {
		const state = initialState;
		const action = { type: "INVALID" };
		// @ts-expect-error
		expect(() => rouletteReducer(state, action)).toThrowError(
			"Invalid action type",
		);
	});

	describe("action: UPDATE_MEMBER_LIST", () => {
		it("dispatch when input text", () => {
			const state = initialState;
			const action: RouletteAction = {
				type: "UPDATE_MEMBER_LIST",
				memberListInput: "member1\nmember2\nmember3",
			};
			const actual = rouletteReducer(state, action);
			expect(actual).toEqual({
				...state,
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
				isErrorMemberInput: false,
			});
		});

		it("dispatch when input text, but duplicate member", () => {
			const state = initialState;
			const action: RouletteAction = {
				type: "UPDATE_MEMBER_LIST",
				memberListInput: "member1\nmember1\nmember3",
			};
			const actual = rouletteReducer(state, action);
			expect(actual).toEqual({
				...state,
				memberListInitial: "",
				memberListInput: "member1\nmember1\nmember3",
				memberList: [],
				isErrorMemberInput: true,
			});
		});
	});

	describe("action: UPDATE_PRIZE_LIST", () => {
		it("dispatch when input text", () => {
			const state = initialState;
			const action: RouletteAction = {
				type: "UPDATE_PRIZE_LIST",
				prizeListInput: "prize1\nprize2\nprize3",
			};
			const actual = rouletteReducer(state, action);
			expect(actual).toEqual({
				...state,
				prizeListInitial: "prize1\nprize2\nprize3",
				prizeListInput: "prize1\nprize2\nprize3",
				prizeList: ["prize1", "prize2", "prize3"],
			});
		});
	});

	describe("action: START", () => {
		it("dispatch when initial run", () => {
			const state = {
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
				memberList: ["member1", "member2", "member3"],
				memberListInput: "member1\nmember2\nmember3",
				memberListInitial: "member1\nmember2\nmember3",
				prizeList: ["prize1", "prize2", "prize3"],
				prizeListInput: "prize1\nprize2\nprize3",
				prizeListInitial: "prize1\nprize2\nprize3",
			};
			const action: RouletteAction = { type: "START" };
			const actual = rouletteReducer(state, action);
			expect(actual).toEqual({
				...state,
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
				memberList: ["member1", "member2", "member3"],
				memberListInput: "member1\nmember2\nmember3",
				memberListInitial: "member1\nmember2\nmember3",
				prizeList: ["prize2", "prize3"],
				prizeListInput: "prize2\nprize3",
				prizeListInitial: "prize1\nprize2\nprize3",
				currentPrize: "prize1",
				isDisableStart: true,
				isDisableStop: false,
				isDisableReset: true,
				isDisableInputForm: true,
			});
		});
		it("dispatch when second run", () => {
			const state = {
				...initialState,
				items: [
					{
						name: "member2",
					},
					{
						name: "member3",
					},
				],
				memberListInitial: "member1\nmember2\nmember3",
				memberList: ["member2", "member3"],
				memberListInput: "member2\nmember3",
				prizeListInitial: "prize1\nprize2\nprize3",
				prizeList: ["prize2", "prize3"],
				prizeListInput: "prize2\nprize3",
			};
			const action: RouletteAction = { type: "START" };
			const actual = rouletteReducer(state, action);
			expect(actual).toEqual({
				...state,
				items: [
					{
						name: "member2",
					},
					{
						name: "member3",
					},
				],
				memberListInitial: "member1\nmember2\nmember3",
				memberList: ["member2", "member3"],
				memberListInput: "member2\nmember3",
				prizeList: ["prize3"],
				prizeListInput: "prize3",
				prizeListInitial: "prize1\nprize2\nprize3",
				currentPrize: "prize2",
				isDisableStart: true,
				isDisableStop: false,
				isDisableReset: true,
				isDisableInputForm: true,
			});
		});
	});

	describe("action: STOP", () => {
		it("dispatch", () => {
			const state = initialState;
			const action: RouletteAction = { type: "STOP" };
			const actual = rouletteReducer(state, action);
			expect(actual).toEqual({
				...initialState,
				isDisableStop: true,
			});
		});
	});

	describe("action: RESET", () => {
		it("dispatch", () => {
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

				isErrorMemberInput: false,
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

				isErrorMemberInput: false,
			});
		});
	});

	describe("action: ON_SPIN_COMPLETE", () => {
		it("dispatch when not empty prizeList", () => {
			const state = {
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
				memberList: ["member1", "member2", "member3"],
				memberListInput: "member1\nmember2\nmember3",
				prizeList: ["prize2", "prize3"],
				prizeListInput: "prize2\nprize3",
				currentPrize: "prize1",
				isDisableStart: true,
				isDisableStop: true,
				isDisableReset: true,
				isDisableInputForm: true,
			};
			const action: RouletteAction = {
				type: "ON_SPIN_COMPLETE",
				result: "member2",
			};
			const actual = rouletteReducer(state, action);
			expect(actual).toEqual({
				...state,
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
				memberList: ["member1", "member3"],
				memberListInput: "member1\nmember3",
				prizeList: ["prize2", "prize3"],
				prizeListInput: "prize2\nprize3",
				currentMember: "member2",
				currentPrize: "prize1",
				currentResult: "member2 - prize1",
				resultList: ["member2 - prize1"],
				isDisableStart: false,
				isDisableStop: true,
				isDisableReset: false,
				isDisableInputForm: true,
			});
		});
		it("dispatch when empty prizeList", () => {
			const state = {
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
				memberList: ["member1", "member2", "member3"],
				memberListInput: "member1\nmember2\nmember3",
				prizeList: [],
				prizeListInput: "",
				currentPrize: "prize1",
				isDisableStart: true,
				isDisableStop: true,
				isDisableReset: true,
				isDisableInputForm: true,
			};
			const action: RouletteAction = {
				type: "ON_SPIN_COMPLETE",
				result: "member2",
			};
			const actual = rouletteReducer(state, action);
			expect(actual).toEqual({
				...state,
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
				memberList: ["member1", "member3"],
				memberListInput: "member1\nmember3",
				prizeList: [],
				prizeListInput: "",
				currentMember: "member2",
				currentPrize: "prize1",
				currentResult: "member2 - prize1",
				resultList: ["member2 - prize1"],
				isDisableStart: true,
				isDisableStop: true,
				isDisableReset: false,
				isDisableInputForm: true,
			});
		});
	});
});
