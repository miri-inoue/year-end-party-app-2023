import { RouletteState } from "./roulette";

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
