import { LotteryItem } from "./lottery";

export const inputToLotteryItemList = (text: string): LotteryItem[] => {
	return text
		.split("\n")
		.map((item, index) => {
			return {
				index,
				name: item.trim(),
			};
		})
		.filter((item) => item.name !== "");
};

export const lotteryItemListToText = (list: LotteryItem[]): string => {
	return list.map((item) => item.name).join("\n");
};

export const checkIsRunDisable = (
	memberList: LotteryItem[],
	prizeList: LotteryItem[],
): boolean => {
	return !(memberList.length > 0 && prizeList.length > 0);
};

export const checkIsFinish = (
	memberList: LotteryItem[],
	prizeList: LotteryItem[],
) => {
	return memberList.length === 0 || prizeList.length === 0;
};

export const getRandomIndex = (length: number): number => {
	return Math.floor(Math.random() * length);
};

export const getActiveList = (prevActiveList: LotteryItem[]) => {
	const randomMemberIndex = getRandomIndex(prevActiveList.length);
	const pickItem = prevActiveList[randomMemberIndex];
	const activeList = prevActiveList.filter((item) => item !== pickItem);
	const textActiveList = lotteryItemListToText(activeList);

	return {
		pickItem,
		activeList,
		textActiveList,
	};
};
