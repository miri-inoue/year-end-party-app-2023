type LotteryItem = {
	index: number;
	name: string;
};

type LotteryState = {
	isRun: boolean;
	isRunDisable: boolean;
	isFinish: boolean;

	// member
	memberList: LotteryItem[];
	activeMemberList: LotteryItem[];
	textMemberList: string;
	textActiveMemberList: string;

	// prize
	prizeList: LotteryItem[];
	activePrizeList: LotteryItem[];

	textPrizeList: string;
	textActivePrizeList: string;

	// result
	textResult: string;
	// allResultList: string[];
	textAllResultList: string;
};

type LotteryAction =
	| { type: "UPDATE_MEMBER_LIST"; text: string }
	| { type: "UPDATE_PRIZE_LIST"; text: string }
	| { type: "RUN" }
	| { type: "RESET" };

export const initialState = {
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

const inputToLotteryItemList = (text: string): LotteryItem[] => {
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

const checkIsRunDisable = (
	memberList: LotteryItem[],
	prizeList: LotteryItem[],
): boolean => {
	return !(memberList.length > 0 && prizeList.length > 0);
};

export const lotteryReducer = (
	state: LotteryState,
	action: LotteryAction,
): LotteryState => {
	switch (action.type) {
		case "UPDATE_MEMBER_LIST": {
			const { text: textMemberList, text: textActiveMemberList } = action;

			const memberList = inputToLotteryItemList(textMemberList);
			const isRunDisable = checkIsRunDisable(memberList, state.prizeList);

			return {
				...state,
				isRunDisable,
				memberList,
				textMemberList,
				activeMemberList: memberList,
				textActiveMemberList,
			};
		}
		case "UPDATE_PRIZE_LIST": {
			const { text: textPrizeList, text: textActivePrizeList } = action;

			const prizeList = inputToLotteryItemList(textPrizeList);
			const isRunDisable = checkIsRunDisable(state.memberList, prizeList);

			return {
				...state,
				isRunDisable,
				prizeList,
				textPrizeList,
				activePrizeList: prizeList,
				textActivePrizeList,
			};
		}
		case "RUN": {
			const isRun = true;

			// resolve member
			const randomMemberIndex = Math.floor(
				Math.random() * state.activeMemberList.length,
			);
			const member = state.activeMemberList[randomMemberIndex];
			const activeMemberList = state.activeMemberList.filter(
				(item) => item !== member,
			);
			const textActiveMemberList = activeMemberList
				.map((item) => item.name)
				.join("\n");

			// resolve prize
			const randomPrizeIndex = Math.floor(
				Math.random() * state.activePrizeList.length,
			);
			const prize = state.activePrizeList[randomPrizeIndex];
			const activePrizeList = state.activePrizeList.filter(
				(item) => item !== prize,
			);
			const textActivePrizeList = activePrizeList
				.map((item) => item.name)
				.join("\n");

			// resolve results
			const textResult = `${member.name} - ${prize.name}`;
			const textAllResultList = state.textAllResultList
				? `${state.textAllResultList}\n${textResult}`
				: textResult;

			const isMemberEmpty = activeMemberList.length === 0;
			const isPrizeEmpty = activePrizeList.length === 0;
			const isFinish = isMemberEmpty || isPrizeEmpty;

			const isRunDisable = !(
				state.memberList.length !== 0 &&
				state.prizeList.length !== 0 &&
				!isFinish
			);

			return {
				...state,
				activeMemberList,
				textActiveMemberList,
				activePrizeList,
				textActivePrizeList,
				textResult,
				textAllResultList,
				isFinish,
				isRun,
				isRunDisable,
			};
		}
		case "RESET": {
			const activeMemberList = state.memberList;
			const textActiveMemberList = state.textMemberList;
			const activePrizeList = state.prizeList;
			const textActivePrizeList = state.textPrizeList;

			const isRunDisable = checkIsRunDisable(state.memberList, state.prizeList);

			return {
				...state,
				isRun: false,
				isRunDisable,
				isFinish: false,

				activeMemberList,
				textActiveMemberList,

				activePrizeList,
				textActivePrizeList,

				textResult: "",
				textAllResultList: "",
			};
		}
		default: {
			throw new Error("Invalid action type");
		}
	}
};
