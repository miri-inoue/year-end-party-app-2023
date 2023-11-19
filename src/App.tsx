import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function App() {
	const [textMemberList, setTextMemberList] = useState<string>("");
	const [textActiveMemberList, setTextActiveMemberList] = useState<string>("");

	const [textPrizeList, setTextPrizeList] = useState<string>("");
	const [textActivePrizeList, setTextActivePrizeList] = useState<string>("");

	const [result, setResult] = useState<string>("");
	const [textPreviousResultList, setTextPreviousResultList] =
		useState<string>("");

	const [isFinish, setIsFinish] = useState<boolean>(false);

	const isRunActive =
		textMemberList !== "" && textPrizeList !== "" && !isFinish;

	const handleRun = () => {
		// resolve member
		if (textActiveMemberList === "") setTextActiveMemberList(textMemberList);
		const activeMemberList =
			textActiveMemberList === ""
				? textMemberList.split("\n")
				: textActiveMemberList.split("\n");

		const randomMemberIndex = Math.floor(
			Math.random() * activeMemberList.length,
		);
		const result = activeMemberList[randomMemberIndex];
		const nextActiveMemberList = activeMemberList.filter(
			(item) => item !== result,
		);
		const textNextActiveMemberList = nextActiveMemberList.join("\n");

		// resolve prize
		if (textActivePrizeList === "") setTextActivePrizeList(textPrizeList);
		const activePrizeList =
			textActivePrizeList === ""
				? textPrizeList.split("\n")
				: textActivePrizeList.split("\n");

		const randomPrizeIndex = Math.floor(Math.random() * activePrizeList.length);
		const prize = activePrizeList[randomPrizeIndex];
		const nextActivePrizeList = activePrizeList.filter(
			(item) => item !== prize,
		);
		const textNextActivePrizeList = nextActivePrizeList.join("\n");

		const isMemberEmpty = nextActiveMemberList.length === 0;
		const isPrizeEmpty = nextActivePrizeList.length === 0;

		setResult(`${result} - ${prize}`);

		const resolvedTextPreviousResultList =
			textPreviousResultList === ""
				? `${result} - ${prize}`
				: `${textPreviousResultList}\n${result} - ${prize}`;
		setTextPreviousResultList(resolvedTextPreviousResultList);
		setIsFinish(isMemberEmpty || isPrizeEmpty);
		setTextActiveMemberList(textNextActiveMemberList);
		setTextActivePrizeList(textNextActivePrizeList);
	};

	const handleReset = () => {
		setTextActiveMemberList("");
		setTextActivePrizeList("");
		setResult("");
		setTextPreviousResultList("");
		setIsFinish(false);
	};

	return (
		<div className="flex flex-col gap-4 p-8">
			<h1 className="text-xl">Year end party 2023, Lottery app</h1>
			<div className="flex gap-2">
				<div className="grid w-full gap-2">
					<Label htmlFor="member-list">Member list</Label>
					<Textarea
						onChange={(e) => setTextMemberList(e.target.value)}
						className="h-40"
						placeholder="Type member list here."
						id="member-list"
					/>
				</div>
				<div className="grid w-full gap-2">
					<Label htmlFor="prize-list">Prize list</Label>
					<Textarea
						onChange={(e) => setTextPrizeList(e.target.value)}
						className="h-40"
						placeholder="Type prize list here."
						id="prize-list"
					/>
				</div>
			</div>
			<div className="flex gap-2">
				<div className="grid w-full gap-2">
					<Label htmlFor="active-member-list">Active member list</Label>
					<Textarea
						value={textActiveMemberList}
						className="h-40"
						placeholder="active member list here."
						id="active-member"
						disabled
					/>
				</div>
				<div className="grid w-full gap-2">
					<Label htmlFor="active-prize-list">Active prize list</Label>
					<Textarea
						value={textActivePrizeList}
						className="h-40"
						placeholder="active prize list here."
						id="active-prize"
						disabled
					/>
				</div>
			</div>
			<div className="flex gap-2">
				<div className="grid w-full gap-2">
					<Label htmlFor="previous-result">Previous result</Label>
					<Textarea
						value={textPreviousResultList}
						className="h-40"
						placeholder="Previous Result here."
						id="previous-result"
						disabled
					/>
				</div>
				<div className="grid w-full gap-2">
					<Label htmlFor="result">Current result</Label>
					<Textarea
						value={result}
						className="h-40"
						placeholder="Result here."
						id="result"
						disabled
					/>
				</div>
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
