import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function App() {
	const [memberList, setMemberList] = useState<string[]>([]);
	const [activeMemberList, setActiveMemberList] = useState<string[]>([]);

	const [prizeList, setPrizeList] = useState<string[]>([]);
	const [activePrizeList, setActivePrizeList] = useState<string[]>([]);

	const [result, setResult] = useState<string>("");
	const [previousResultList, setPreviousResultList] = useState<string[]>([]);

	const [isRun, setIsRun] = useState<boolean>(false);
	const [isFinish, setIsFinish] = useState<boolean>(false);

	const isRunActive =
		memberList.length !== 0 && prizeList.length !== 0 && !isFinish;

	const handleRun = () => {
		// initial click (load data)
		if (activeMemberList.length === 0 || activePrizeList.length === 0) {
			setActiveMemberList(memberList);
			setActivePrizeList(prizeList);
			setIsRun(true);
			return;
		}

		// resolve member
		const randomMemberIndex = Math.floor(
			Math.random() * activeMemberList.length,
		);
		const member = activeMemberList[randomMemberIndex];
		const nextActiveMemberList = activeMemberList.filter(
			(item) => item !== member,
		);

		// resolve prize
		const randomPrizeIndex = Math.floor(Math.random() * activePrizeList.length);
		const prize = activePrizeList[randomPrizeIndex];
		const nextActivePrizeList = activePrizeList.filter(
			(item) => item !== prize,
		);

		setResult(`${member} - ${prize}`);
		setPreviousResultList((prev) =>
			prev.length === 0
				? [`${member} - ${prize}`]
				: [...prev, `${member} - ${prize}`],
		);
		setActiveMemberList(nextActiveMemberList);
		setActivePrizeList(nextActivePrizeList);

		const isMemberEmpty = nextActiveMemberList.length === 0;
		const isPrizeEmpty = nextActivePrizeList.length === 0;
		setIsFinish(isMemberEmpty || isPrizeEmpty);
	};

	const handleReset = () => {
		setActiveMemberList([]);
		setActivePrizeList([]);

		setResult("");
		setPreviousResultList([]);

		setIsRun(false);
		setIsFinish(false);
	};

	return (
		<div className="flex flex-col gap-4 p-8">
			<h1 className="text-xl">Year end party 2023, Lottery app</h1>
			<div className="flex gap-2">
				<div className="grid w-full gap-2">
					<Label htmlFor="member-list">Member list</Label>
					<Textarea
						onChange={(e) => setMemberList(e.target.value.trim().split("\n"))}
						className="h-40"
						placeholder="Type member list here."
						id="member-list"
						disabled={isRun}
					/>
				</div>
				<div className="grid w-full gap-2">
					<Label htmlFor="prize-list">Prize list</Label>
					<Textarea
						onChange={(e) => setPrizeList(e.target.value.trim().split("\n"))}
						className="h-40"
						placeholder="Type prize list here."
						id="prize-list"
						disabled={isRun}
					/>
				</div>
			</div>
			<div className="flex gap-2">
				<div className="grid w-full gap-2">
					<Label htmlFor="active-member-list">Active member list</Label>
					<Textarea
						value={activeMemberList.join("\n")}
						className="h-40"
						placeholder="active member list here."
						id="active-member"
						disabled
					/>
				</div>
				<div className="grid w-full gap-2">
					<Label htmlFor="active-prize-list">Active prize list</Label>
					<Textarea
						value={activePrizeList.join("\n")}
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
						value={previousResultList.join("\n")}
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
					<Button onClick={handleRun}>{isRun ? "Run" : "Load"}</Button>
				) : (
					<Button disabled>Run</Button>
				)}
				<Button onClick={handleReset}>Reset</Button>
			</div>
		</div>
	);
}

export default App;
