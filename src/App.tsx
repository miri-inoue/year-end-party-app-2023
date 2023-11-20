import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReducer } from "react";

const initialState = {
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

const lotteryReducer = (
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

function App() {
	const [state, dispatch] = useReducer(lotteryReducer, initialState);
	const {
		textMemberList,
		textActiveMemberList,
		textPrizeList,
		textActivePrizeList,
		textResult,
		textAllResultList,
		isRun,
		isRunDisable,
	} = state;

	const handleRun = () => dispatch({ type: "RUN" });
	const handleReset = () => dispatch({ type: "RESET" });

	const handleOnChangeMemberList = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		dispatch({ type: "UPDATE_MEMBER_LIST", text: e.target.value });
	};
	const handleOnChangePrizeList = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		dispatch({ type: "UPDATE_PRIZE_LIST", text: e.target.value });
	};

	return (
		<div className="flex flex-col gap-12 p-8 h-screen justify-between">
			<div className="flex flex-col gap-8">
				<div className="flex gap-2 items-baseline">
					<h1 className="text-xl">Year end party 2023, Lottery app</h1>
					<a
						className="text-xs text-blue-500 hover:underline"
						href="https://github.com/camiha/year-end-party-app-2023"
					>
						(source code here)
					</a>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex gap-2">
						<div className="grid w-full gap-2">
							<Label htmlFor="member-list">Member list</Label>
							<Textarea
								value={isRun ? textActiveMemberList : textMemberList}
								onChange={(e) => handleOnChangeMemberList(e)}
								className="h-60"
								placeholder="Type member list here."
								id="member-list"
								disabled={isRun}
							/>
						</div>
						<div className="grid w-full gap-2">
							<Label htmlFor="prize-list">Prize list</Label>
							<Textarea
								value={isRun ? textActivePrizeList : textPrizeList}
								onChange={(e) => handleOnChangePrizeList(e)}
								className="h-60"
								placeholder="Type prize list here."
								id="prize-list"
								disabled={isRun}
							/>
						</div>
					</div>
					<div className="flex gap-2">
						<div className="grid w-full gap-2">
							<Label htmlFor="all-result">All result list</Label>
							<Textarea
								value={textAllResultList}
								className="h-60"
								placeholder="All result list here."
								id="all-result"
								disabled
							/>
						</div>
						<div className="grid w-full gap-2">
							<Label htmlFor="result">Current result</Label>
							<Textarea
								value={textResult}
								className="h-60"
								placeholder="Result here."
								id="result"
								disabled
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="flex w-full gap-2">
				<Button className="w-full" onClick={handleReset}>
					Reset
				</Button>
				<Button className="w-full" onClick={handleRun} disabled={isRunDisable}>
					Run
				</Button>
			</div>
		</div>
	);
}

export default App;
