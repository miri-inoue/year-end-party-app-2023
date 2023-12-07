import { useReducer } from "react";
import { useRoulette } from "react-hook-roulette";
import {
	rouletteReducer,
	initialState,
	getResultListOutput,
} from "../reducer/roulette";

export const useLottery = () => {
	const [state, dispatch] = useReducer(rouletteReducer, initialState);
	const {
		items,
		memberListInput,
		prizeListInput,
		currentMember,
		currentPrize,
		currentResult,
		resultList,
		isDisableStart,
		isDisableStop,
		isDisableReset,
		isDisableInputForm,
	} = state;

	const resultListOutput = getResultListOutput(resultList);

	const { roulette, onStart, onStop } = useRoulette({
		items,
		options: {
			size: 600,
		},
		onComplete: (result) => {
			dispatch({ type: "ON_SPIN_COMPLETE", result });
		},
	});

	const handleStart = () => {
		dispatch({ type: "START" });
		onStart();
	};

	const handleStop = () => {
		dispatch({ type: "STOP" });
		onStop();
	};

	const handleReset = () => {
		dispatch({ type: "RESET" });
	};

	const handleChangeMemberListTextArea = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		dispatch({
			type: "UPDATE_MEMBER_LIST",
			memberListInput: event.target.value,
		});
	};

	const handleChangePrizeListTextArea = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		dispatch({ type: "UPDATE_PRIZE_LIST", prizeListInput: event.target.value });
	};

	return {
		memberListInput,
		prizeListInput,
		currentMember,
		currentPrize,
		currentResult,
		isDisableStart,
		isDisableStop,
		isDisableReset,
		isDisableInputForm,
		resultListOutput,
		roulette,
		handleStart,
		handleStop,
		handleReset,
		handleChangeMemberListTextArea,
		handleChangePrizeListTextArea,
	};
};
