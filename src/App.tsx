import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Roulette, useRoulette } from "react-hook-roulette";

function App() {
	const [items, setItems] = useState<{ name: string }[]>([
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
	]);
	const [isLock, setIsLock] = useState(false);
	const [member, setMember] = useState<{
		text: string;
		list: string[];
		initialText: string;
	}>({
		text: "",
		list: [],
		initialText: "",
	});
	const [prize, setPrize] = useState<{
		text: string;
		list: string[];
		initialText: string;
	}>({
		text: "",
		list: [],
		initialText: "",
	});
	const [currentMember, setCurrentMember] = useState<string>("");
	const [currentPrize, setCurrentPrize] = useState<string>("");

	const [allResult, setAllResult] = useState<string[]>([]);
	const [resultList, setResultList] = useState<string[]>([]);
	const [currentResult, setCurrentResult] = useState<string>("");

	const [IsDisableStart, setIsDisableStart] = useState(true);
	const [IsDisableStop, setIsDisableStop] = useState(true);
	const [IsDisableReset, setIsDisableReset] = useState(true);

	const { roulette, onStart, onStop, result } = useRoulette({
		items,
		options: {
			size: 600,
		},
		onSpinUp: () => {
			setCurrentResult("");
			setCurrentMember("");
			setIsDisableReset(true);
		},
		onSpinDown: () => {
			setIsDisableStop(true);
		},
		onComplete: (result) => {
			const nextMember = member.list.filter((member) => member !== result);
			setMember({
				text: nextMember.join("\n"),
				list: nextMember,
				initialText: member.initialText,
			});
			setIsDisableReset(false);
			setCurrentMember(result);
			setCurrentResult(`${result} - ${currentPrize}`);
			setAllResult([...allResult, `${result} - ${currentPrize}`]);

			if (prize.list.length === 0) {
				setIsDisableStart(true);
			} else if (nextMember.length === 0) {
				setIsDisableStart(true);
			} else {
				setIsDisableStart(false);
			}
		},
	});

	const handleStart = () => {
		if (items.length <= 1) return;
		if (prize.list.length <= 0) return;
		setIsDisableStart(true);
		setIsDisableStop(false);

		if (currentPrize !== "" && result != null) {
			setResultList([
				...resultList,
				`member:${result} - prize: ${currentPrize}`,
			]);
		}
		setCurrentResult("");
		setCurrentPrize(prize.list[0]);
		const nextPrize = prize.list.filter((item) => item !== prize.list[0]);
		setPrize({
			text: nextPrize.join("\n"),
			list: nextPrize,
			initialText: prize.initialText,
		});
		onStart();

		if (result == null) return;
		const nextItems = items.filter((item) => item.name !== result);
		setItems(nextItems);
		setItems(nextItems);
		setIsLock(true);
	};

	const handleStop = () => {
		onStop();
	};

	const handleReset = () => {
		const initialMemberList = member.initialText.split("\n");
		const initialPrizeList = prize.initialText.split("\n");

		setMember({
			text: member.initialText,
			list: initialMemberList,
			initialText: member.initialText,
		});
		setItems(initialMemberList.map((item) => ({ name: item })));
		setPrize({
			text: prize.initialText,
			list: initialPrizeList,
			initialText: prize.initialText,
		});
		setAllResult([]);
		setCurrentResult("");
		setCurrentPrize("");
		setCurrentMember("");
		setIsLock(false);
		setIsDisableStart(false);
	};

	const handleChangeMemberListTextArea = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		const inputs = event.target.value;
		const memberList = inputs.split("\n").filter((item) => item !== "");
		setMember({
			text: inputs,
			list: memberList,
			initialText: inputs,
		});
		setItems(memberList.map((item) => ({ name: item })));

		if (memberList.length > 1 && prize.list.length > 1) {
			setIsDisableStart(false);
		} else {
			setIsDisableStart(true);
		}
	};

	const handleChangePrizeListTextArea = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		const inputs = event.target.value;
		const prizeList = inputs.split("\n").filter((item) => item !== "");
		setPrize({
			text: inputs,
			list: prizeList,
			initialText: inputs,
		});

		if (member.list.length > 1 && prizeList.length >= 1) {
			setIsDisableStart(false);
		} else {
			setIsDisableStart(true);
		}
	};

	const allResultValue = allResult.join("\n");
	const currentResultValue = currentResult;

	return (
		<div className="flex flex-col gap-12 p-16 justify-between">
			<div className="flex flex-col items-center gap-16 h-screen">
				<div className="flex gap-2 items-baseline">
					<h1 className="text-4xl">Year end party 2023, Lottery app</h1>
					<a
						className="text-sm text-blue-500 hover:underline"
						href="https://github.com/camiha/year-end-party-app-2023"
					>
						(source code here)
					</a>
				</div>
				<div className="flex gap-24">
					<div>
						<Roulette roulette={roulette} />
					</div>
					<div className="flex flex-col gap-12 justify-center">
						<div className="flex gap-2">
							<Button
								className="w-full bg-indigo-700 color-white"
								onClick={handleStop}
								disabled={IsDisableStop}
							>
								Stop
							</Button>
							<Button
								className="w-full bg-indigo-700 color-white"
								onClick={handleStart}
								disabled={IsDisableStart}
							>
								Start
							</Button>
						</div>
						<div className="flex flex-col gap-2">
							<p className="text-lg font-medium">winner: {currentMember}</p>
							<p className="text-lg font-medium">
								current prize: {currentPrize}
							</p>
						</div>
						<div className="grid w-full gap-2">
							<Label htmlFor="all-result">All result list</Label>
							<Textarea
								className="w-96 h-60"
								value={allResultValue}
								disabled={true}
							/>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="flex flex-col gap-8">
					<div className="flex justify-center">
						<h2 className="text-3xl">Dashboards</h2>
					</div>
					<div className="flex flex-col gap-4 items-center">
						<div className="flex w-full gap-4">
							<div className="grid w-full gap-2">
								<Label htmlFor="member-list">Member list</Label>
								<Textarea
									value={member.text}
									onChange={handleChangeMemberListTextArea}
									className="h-96"
									placeholder="Type member list here."
									id="member-list"
									disabled={isLock}
								/>
							</div>
							<div className="grid w-full gap-2">
								<Label htmlFor="prize-list">Prize list</Label>
								<Textarea
									value={prize.text}
									onChange={handleChangePrizeListTextArea}
									className="h-96"
									placeholder="Type prize list here."
									id="prize-list"
									disabled={isLock}
								/>
							</div>
							<div className="grid w-full gap-2">
								<Label htmlFor="all-result">All result list</Label>
								<Textarea
									className="h-96"
									value={allResultValue}
									disabled={true}
								/>
							</div>
							<div className="grid w-full gap-2">
								<Label htmlFor="result">Current result</Label>
								<Textarea
									className="h-96"
									value={currentResultValue}
									disabled={true}
								/>
							</div>
						</div>
						<div className="flex gap-2">
							<AlertDialog>
								<Button asChild className="bg-red-600 color-white w-60">
									<AlertDialogTrigger disabled={IsDisableReset}>
										Reset
									</AlertDialogTrigger>
								</Button>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											onClick={handleReset}
											className="bg-red-600 color-white"
										>
											Reset
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
