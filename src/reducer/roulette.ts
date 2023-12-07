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
};

export type RouletteAction =
	| { type: "UPDATE_MEMBER_LIST"; memberListInput: string }
	| { type: "UPDATE_PRIZE_LIST"; prizeListInput: string }
	| { type: "START" }
	| { type: "STOP" }
	| { type: "RESET" }
	| { type: "ON_SPIN_COMPLETE"; result: string };

export const initialState: RouletteState = {
	items: [],
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
};

export const rouletteReducer = (
	state: RouletteState,
	action: RouletteAction,
): RouletteState => {
	switch (action.type) {
		case "UPDATE_MEMBER_LIST": {
			const { memberListInput } = action;
			const memberList = getSplitInputByNewLine(memberListInput);
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

export const getRouletteItems = (memberList: RouletteState["memberList"]) => {
	const result = memberList.map((member: string) => {
		return {
			name: member,
		};
	});
	return result;
};

export const getNextMemberList = (
	memberList: RouletteState["memberList"],
	winner: string,
) => {
	const result = memberList.filter((item) => item !== winner);
	return result;
};

export const getCurrentPrize = (prizeList: RouletteState["prizeList"]) => {
	const result = prizeList[0];
	return result;
};

export const getNextPrizeList = (prizeList: RouletteState["prizeList"]) => {
	const result = prizeList.filter((item) => item !== prizeList[0]);
	return result;
};

export const getIsDisableStart = (
	memberList: RouletteState["memberList"],
	prizeList: RouletteState["prizeList"],
) => {
	if (memberList.length === 0) return true;
	if (prizeList.length === 0) return true;
	return false;
};

export const getResultListOutput = (
	resultList: RouletteState["resultList"],
) => {
	const result = resultList.join("\n");
	return result;
};

export const getSplitInputByNewLine = (inputText: string) => {
	const result = inputText.split("\n").filter((item) => item !== "");
	return result;
};

export const getJoinInputText = (list: string[]) => {
	const result = list.join("\n");
	return result;
};

export const getIsInitialStart = (
	memberList: RouletteState["memberList"],
	memberListInput: RouletteState["memberListInput"],
) => {
	const result = memberList.length === memberListInput.split("\n").length;
	return result;
};

export const getCurrentResult = (
	currentMember: RouletteState["currentMember"],
	currentPrize: RouletteState["currentPrize"],
) => {
	const result = `${currentMember} - ${currentPrize}`;
	return result;
};

export const getResultList = (
	resultList: RouletteState["resultList"],
	currentResult: RouletteState["currentResult"],
) => {
	const result = [...resultList, currentResult];
	return result;
};
