import {
	getCurrentPrize,
	getCurrentResult,
	getIsDisableStart,
	getIsDuplicate,
	getIsInitialStart,
	getJoinInputText,
	getNextMemberList,
	getNextPrizeList,
	getResultList,
	getRouletteItems,
	getSplitInputByNewLine,
} from "./functions";

export type RouletteState = {
	items: { name: string }[];

	memberListInput: string;
	memberListInitial: string;
	memberList: string[];

	prizeListInput: string;
	prizeListInitial: string;
	prizeList: string[];

	currentMember: string;
	currentPrize: string;
	currentResult: string;
	resultList: string[];

	isDisableStart: boolean;
	isDisableStop: boolean;
	isDisableReset: boolean;
	isDisableInputForm: boolean;

	isErrorMemberInput: boolean;
};

export type RouletteAction =
	| { type: "UPDATE_MEMBER_LIST"; memberListInput: string }
	| { type: "UPDATE_PRIZE_LIST"; prizeListInput: string }
	| { type: "START" }
	| { type: "STOP" }
	| { type: "RESET" }
	| { type: "ON_SPIN_COMPLETE"; result: string };

export const initialState: RouletteState = {
	items: [
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
	],
	memberListInput: "",
	memberListInitial: "",
	memberList: [],

	prizeListInput: "",
	prizeListInitial: "",
	prizeList: [],

	currentMember: "",
	currentPrize: "",
	currentResult: "",
	resultList: [],

	isDisableStart: true,
	isDisableStop: true,
	isDisableReset: true,
	isDisableInputForm: false,

	isErrorMemberInput: false,
};

export const rouletteReducer = (
	state: RouletteState,
	action: RouletteAction,
): RouletteState => {
	switch (action.type) {
		case "UPDATE_MEMBER_LIST": {
			const { memberListInput } = action;
			const memberList = getSplitInputByNewLine(memberListInput);
			const isDuplicateMember = getIsDuplicate(memberList);
			if (isDuplicateMember) {
				return {
					...state,
					memberListInput,
					isDisableStart: true,
					isErrorMemberInput: true,
				};
			}

			const items = getRouletteItems(memberList);
			const memberListInitial = getJoinInputText(memberList);
			const isDisableStart = getIsDisableStart(memberList, state.prizeList);
			return {
				...state,
				items,
				memberListInitial,
				memberList,
				memberListInput,
				isDisableStart,
			};
		}
		case "UPDATE_PRIZE_LIST": {
			const { prizeListInput } = action;
			const prizeList = getSplitInputByNewLine(prizeListInput);
			const prizeListInitial = getJoinInputText(prizeList);
			const isDisableStart = getIsDisableStart(state.memberList, prizeList);

			return {
				...state,
				prizeListInitial,
				prizeList,
				prizeListInput,
				isDisableStart,
			};
		}
		case "START": {
			const isInitial = getIsInitialStart(
				state.memberList,
				state.memberListInitial,
			);
			if (isInitial) {
				// when initial start, remove empty line
				const memberList = getSplitInputByNewLine(state.memberListInput);
				const memberListInput = getJoinInputText(memberList);
				// pop when start from list with remove empty line
				const _prizeList = getSplitInputByNewLine(state.prizeListInput);
				const prizeList = getNextPrizeList(_prizeList);
				const prizeListInput = getJoinInputText(prizeList);
				const currentPrize = getCurrentPrize(state.prizeList);
				return {
					...state,
					memberList,
					memberListInput,
					prizeList,
					prizeListInput,
					currentMember: "",
					currentPrize,
					currentResult: "",
					isDisableStart: true,
					isDisableStop: false,
					isDisableInputForm: true,
				};
			}

			const memberList = getNextMemberList(
				state.memberList,
				state.currentMember,
			);
			const memberListInput = getJoinInputText(memberList);
			const currentPrize = getCurrentPrize(state.prizeList);
			const prizeList = getNextPrizeList(state.prizeList);
			const prizeListInput = getJoinInputText(prizeList);
			const items = getRouletteItems(memberList);
			return {
				...state,
				items,
				memberList,
				memberListInput,
				prizeList,
				prizeListInput,
				currentMember: "",
				currentResult: "",
				currentPrize,
				isDisableStart: true,
				isDisableStop: false,
				isDisableInputForm: true,
			};
		}
		case "STOP": {
			return {
				...state,
				isDisableStop: true,
			};
		}
		case "RESET": {
			const memberList = getSplitInputByNewLine(state.memberListInitial);
			const prizeList = getSplitInputByNewLine(state.prizeListInitial);
			return {
				...state,
				memberList,
				memberListInput: state.memberListInitial,
				prizeList,
				prizeListInput: state.prizeListInitial,
				currentMember: "",
				currentPrize: "",
				currentResult: "",
				resultList: [],
				isDisableStart: false,
				isDisableStop: true,
				isDisableReset: true,
				isDisableInputForm: false,
			};
		}
		case "ON_SPIN_COMPLETE": {
			const { result } = action;
			const memberList = getNextMemberList(state.memberList, result);
			const memberListInput = getJoinInputText(memberList);
			const prizeListInput = getJoinInputText(state.prizeList);
			const currentResult = getCurrentResult(result, state.currentPrize);
			const resultList = getResultList(state.resultList, currentResult);
			const isDisableStart = getIsDisableStart(
				state.memberList,
				state.prizeList,
			);
			return {
				...state,
				memberList,
				memberListInput,
				prizeListInput,
				currentMember: result,
				currentResult,
				resultList,
				isDisableStart,
				isDisableReset: false,
			};
		}
		default: {
			throw new Error("Invalid action type");
		}
	}
};
