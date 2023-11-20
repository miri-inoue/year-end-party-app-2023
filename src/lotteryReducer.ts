type LotteryState = {
	isRun: boolean;
	isRunDisable: boolean;
	isFinish: boolean;

	// member
	memberList: string[];
	activeMemberList: string[];
	textMemberList: string;
	textActiveMemberList: string;
	// prize
	prizeList: string[];
	activePrizeList: string[];
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

export const lotteryReducer = (
	state: LotteryState,
	action: LotteryAction,
): LotteryState => {
	switch (action.type) {
		case "UPDATE_MEMBER_LIST": {
			const memberList = action.text
				.split("\n")
				.map((item) => item.trim())
				.filter((item) => item !== "");
			const isRunDisable = !(
				memberList.length > 0 && state.prizeList.length > 0
			);

			return {
				...state,
				isRunDisable,
				memberList,
				textMemberList: action.text,
				activeMemberList: memberList,
				textActiveMemberList: action.text,
			};
		}
		case "UPDATE_PRIZE_LIST": {
			const prizeList = action.text
				.split("\n")
				.map((item) => item.trim())
				.filter((item) => item !== "");
			const isRunDisable = !(
				state.memberList.length > 0 && prizeList.length > 0
			);

			return {
				...state,
				isRunDisable,
				prizeList,
				textPrizeList: action.text,
				activePrizeList: prizeList,
				textActivePrizeList: action.text,
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
			const textActiveMemberList = activeMemberList.join("\n");

			// resolve prize
			const randomPrizeIndex = Math.floor(
				Math.random() * state.activePrizeList.length,
			);
			const prize = state.activePrizeList[randomPrizeIndex];
			const activePrizeList = state.activePrizeList.filter(
				(item) => item !== prize,
			);
			const textActivePrizeList = activePrizeList.join("\n");

			// resolve results
			const textResult = `${member} - ${prize}`;
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

			const isRunDisable = !(
				state.memberList.length !== 0 && state.prizeList.length !== 0
			);

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
