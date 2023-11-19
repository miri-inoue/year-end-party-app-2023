import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function App() {
	const [textMemberList, setTextMemberList] = useState<string>("");
	const [textTargetList, setTextTargetList] = useState<string>("");
	const [winner, setWinner] = useState<string>("");
	const [isFinish, setIsFinish] = useState<boolean>(false);

	const isRunActive = textMemberList !== "" && !isFinish;

	const handleRun = () => {
		if (textTargetList === "") setTextTargetList(textMemberList);

		const targetList =
			textTargetList === ""
				? textMemberList.split("\n")
				: textTargetList.split("\n");

		const randomIndex = Math.floor(Math.random() * targetList.length);
		const winner = targetList[randomIndex];

		const nextTargetList = targetList.filter((item) => item !== winner);
		const textNextTargetList = nextTargetList.join("\n");

		setIsFinish(nextTargetList.length === 0);
		setWinner(winner);
		setTextTargetList(textNextTargetList);
	};

	const handleReset = () => {
		setWinner("");
		setIsFinish(false);
	};

	return (
		<div className="flex flex-col gap-4 p-8">
			<h1 className="text-xl">Year end party 2023, Lottery app</h1>

			<div className="grid w-full gap-2">
				<Label htmlFor="member-list">Member list</Label>
				<Textarea
					onChange={(e) => setTextMemberList(e.target.value)}
					className="h-60"
					placeholder="Type member list here."
					id="member-list"
				/>
			</div>
			<div className="grid w-full gap-2">
				<Label htmlFor="target-list">Current target list</Label>
				<Textarea
					value={textTargetList}
					className="h-60"
					placeholder="Current target list here."
					id="member-list"
					disabled
				/>
			</div>
			<div className="grid w-full gap-2">
				<Label htmlFor="winner">Winner</Label>
				<Textarea
					value={winner}
					className="h-20"
					placeholder="Result here."
					id="winner"
					disabled
				/>
			</div>
			<div className="grid w-full gap-2">
				{isRunActive ? (
					<Button onClick={handleRun}>Run</Button>
				) : (
					<Button disabled>Run</Button>
				)}
				<Button onClick={handleReset}>Reset</Button>
			</div>
		</div>
	);
}

export default App;
