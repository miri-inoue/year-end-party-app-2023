import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReducer } from "react";
import { initialState, lotteryReducer } from "@/lotteryReducer";

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
								onChange={(e) =>
									dispatch({ type: "UPDATE_MEMBER_LIST", text: e.target.value })
								}
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
								onChange={(e) =>
									dispatch({ type: "UPDATE_PRIZE_LIST", text: e.target.value })
								}
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
				<Button className="w-full" onClick={() => dispatch({ type: "RESET" })}>
					Reset
				</Button>
				<Button
					className="w-full"
					onClick={() => dispatch({ type: "RUN" })}
					disabled={isRunDisable}
				>
					Run
				</Button>
			</div>
		</div>
	);
}

export default App;
