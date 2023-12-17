import { useReducer } from "react";
import { useRoulette } from "react-hook-roulette";
import { getResultListOutput } from "../reducer/functions";
import { initialState, rouletteReducer } from "../reducer/roulette";

export const useLottery = () => {

	const option = {
		size: 100,
		maxSpeed: 100,
		rotationDirection: "clockwise",
		acceleration: 1,
		deceleration: 1,
		initialAngle: 0,
		determineAngle: 45,
		showArrow: true,
		style: {
			canvas: {
				bg: "#fff",
			},
			arrow: {
				bg: "#000",
				size: 16,
			},
			label: {
				font: "16px Arial",
				align: "right",
				baseline: "middle",
				offset: 0.75,
				defaultColor: "#000",
			},
			pie: {
				theme: [
					{
						bg: "#DA4193",
					},
					{
						bg: "#E24A35",
					},
					{
						bg: "#6366f1",
						color: "#fff",
					},
					{
						bg: "#4338ca",
						color: "#fff",
					},
				],
			},
		},
	};

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
			determineAngle: 0,
			style: {
				canvas: {
					bg: "transparent",
				},
				arrow: {
					bg: "#000",
					size: 16,
				},
				label: {
					font: "16px Arial",
					align: "right",
					baseline: "middle",
					offset: 0.75,
					defaultColor: "#000",
				},
				pie: {
					theme: [
						{
							bg: "#DA4193",
							color: "#fff",
						},
						{
							bg: "#E24A35",
							color: "#fff",
						},
						{
							bg: "#E4D528",
						},
						{
							bg: "#85BD40",
						},
						{
							bg: "#19AB9C",
						},
						{
							bg: "#177EC2",
							color: "#fff",
						},
						{
							bg: "#4A469F",
							color: "#fff",
						},
						{
							bg: "#9F4C99",
							color: "#fff",
						},
					],
				},
			},
		},

		onSpinEnd: (result) => {
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