import { describe, it, expect, vi } from "vitest";
import { LotteryAction, LotteryState, lotteryReducer } from "./lottery";

// lotteryReducer testing
describe("lotteryReducer", () => {
	it("should throw error when action is not valid", () => {
		const state = {
			isRun: false,
			isRunDisable: true,
			isFinish: false,
			memberList: [],
			activeMemberList: [],
			textMemberList: "",
			textActiveMemberList: "",
			prizeList: [],
			activePrizeList: [],
			textPrizeList: "",
			textActivePrizeList: "",
			textResult: "",
			textAllResultList: "",
		};
		const action = { type: "INVALID" };
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(() => lotteryReducer(state, action)).toThrowError(
			"Invalid action type",
		);
	});

	it("should return state when action is RESET", () => {
		const state = {
			isRun: true,
			isRunDisable: false,
			isFinish: true,
			memberList: [],
			activeMemberList: [],
			textMemberList: "",
			textActiveMemberList: "a",
			prizeList: [],
			activePrizeList: [],
			textPrizeList: "",
			textActivePrizeList: "1",
			textResult: "a - 1",
			textAllResultList: "a - 1",
		};
		const action: LotteryAction = { type: "RESET" };
		const actual = lotteryReducer(state, action);
		expect(actual).toEqual({
			isRun: false,
			isRunDisable: true,
			isFinish: false,
			memberList: [],
			activeMemberList: [],
			textMemberList: "",
			textActiveMemberList: "",
			prizeList: [],
			activePrizeList: [],
			textPrizeList: "",
			textActivePrizeList: "",
			textResult: "",
			textAllResultList: "",
		});
	});

	it("should return state when action is UPDATE_MEMBER_LIST", () => {
		const state = {
			isRun: false,
			isRunDisable: true,
			isFinish: false,
			memberList: [],
			activeMemberList: [],
			textMemberList: "",
			textActiveMemberList: "",
			prizeList: [],
			activePrizeList: [],
			textPrizeList: "",
			textActivePrizeList: "",
			textResult: "",
			textAllResultList: "",
		};
		const action: LotteryAction = {
			type: "UPDATE_MEMBER_LIST",
			text: "a\nb\nc",
		};
		const actual = lotteryReducer(state, action);
		expect(actual).toEqual({
			isRun: false,
			isRunDisable: true,
			isFinish: false,
			memberList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			activeMemberList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			textMemberList: "a\nb\nc",
			textActiveMemberList: "a\nb\nc",
			prizeList: [],
			activePrizeList: [],
			textPrizeList: "",
			textActivePrizeList: "",
			textResult: "",
			textAllResultList: "",
		});
	});

	it("should return state when action is UPDATE_MEMBER_LIST, already inputted prize", () => {
		const state: LotteryState = {
			isRun: false,
			isRunDisable: true,
			isFinish: false,
			memberList: [],
			activeMemberList: [],
			textMemberList: "",
			textActiveMemberList: "",
			prizeList: [
				{ index: 0, name: "1" },
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			activePrizeList: [
				{ index: 0, name: "1" },
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			textPrizeList: "1\n2\n3",
			textActivePrizeList: "1\n2\n3",
			textResult: "",
			textAllResultList: "",
		};
		const action: LotteryAction = {
			type: "UPDATE_MEMBER_LIST",
			text: "a\nb\nc",
		};
		const actual = lotteryReducer(state, action);
		expect(actual).toEqual({
			isRun: false,
			isRunDisable: false,
			isFinish: false,
			memberList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			activeMemberList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			textMemberList: "a\nb\nc",
			textActiveMemberList: "a\nb\nc",
			prizeList: [
				{ index: 0, name: "1" },
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			activePrizeList: [
				{ index: 0, name: "1" },
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			textPrizeList: "1\n2\n3",
			textActivePrizeList: "1\n2\n3",
			textResult: "",
			textAllResultList: "",
		});
	});

	it("should return state when action is UPDATE_PRIZE_LIST", () => {
		const state = {
			isRun: false,
			isRunDisable: true,
			isFinish: false,
			memberList: [],
			activeMemberList: [],
			textMemberList: "",
			textActiveMemberList: "",
			prizeList: [],
			activePrizeList: [],
			textPrizeList: "",
			textActivePrizeList: "",
			textResult: "",
			textAllResultList: "",
		};
		const action: LotteryAction = {
			type: "UPDATE_PRIZE_LIST",
			text: "a\nb\nc",
		};
		const actual = lotteryReducer(state, action);
		expect(actual).toEqual({
			isRun: false,
			isRunDisable: true,
			isFinish: false,
			memberList: [],
			activeMemberList: [],
			textMemberList: "",
			textActiveMemberList: "",
			prizeList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			activePrizeList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			textPrizeList: "a\nb\nc",
			textActivePrizeList: "a\nb\nc",
			textResult: "",
			textAllResultList: "",
		});
	});

	it("should return state when action is UPDATE_PRIZE_LIST, already inputted member", () => {
		const state: LotteryState = {
			isRun: false,
			isRunDisable: true,
			isFinish: false,
			memberList: [
				{ index: 0, name: "1" },
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			activeMemberList: [
				{ index: 0, name: "1" },
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			textMemberList: "1\n2\n3",
			textActiveMemberList: "1\n2\n3",
			prizeList: [],
			activePrizeList: [],
			textPrizeList: "",
			textActivePrizeList: "",
			textResult: "",
			textAllResultList: "",
		};
		const action: LotteryAction = {
			type: "UPDATE_PRIZE_LIST",
			text: "a\nb\nc",
		};
		const actual = lotteryReducer(state, action);
		expect(actual).toEqual({
			isRun: false,
			isRunDisable: false,
			isFinish: false,
			memberList: [
				{ index: 0, name: "1" },
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			activeMemberList: [
				{ index: 0, name: "1" },
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			textMemberList: "1\n2\n3",
			textActiveMemberList: "1\n2\n3",
			prizeList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			activePrizeList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			textPrizeList: "a\nb\nc",
			textActivePrizeList: "a\nb\nc",
			textResult: "",
			textAllResultList: "",
		});
	});

	it("should return state when action is RUN", () => {
		const state = {
			isRun: false,
			isRunDisable: false,
			isFinish: false,
			memberList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			activeMemberList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			textMemberList: "a\nb\nc",
			textActiveMemberList: "a\nb\nc",
			prizeList: [
				{ index: 0, name: "1" },
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			activePrizeList: [
				{ index: 0, name: "1" },
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			textPrizeList: "1\n2\n3",
			textActivePrizeList: "1\n2\n3",
			textResult: "",
			textAllResultList: "",
		};
		const action: LotteryAction = { type: "RUN" };

		vi.spyOn(Math, "random").mockImplementation(() => 0);
		const actual = lotteryReducer(state, action);

		expect(actual).toEqual({
			isRun: true,
			isRunDisable: false,
			isFinish: false,
			memberList: [
				{ index: 0, name: "a" },
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			activeMemberList: [
				{ index: 1, name: "b" },
				{ index: 2, name: "c" },
			],
			textMemberList: "a\nb\nc",
			textActiveMemberList: "b\nc",
			prizeList: [
				{ index: 0, name: "1" },
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			activePrizeList: [
				{ index: 1, name: "2" },
				{ index: 2, name: "3" },
			],
			textPrizeList: "1\n2\n3",
			textActivePrizeList: "2\n3",
			textResult: "a - 1",
			textAllResultList: "a - 1",
		});
	});
});
