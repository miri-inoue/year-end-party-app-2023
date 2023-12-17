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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Roulette } from "react-hook-roulette";
import { useLottery } from "./hooks/useLottery";
import title from "./assets/title.png";
import arrow from "./assets/img_arrow.png";
import smile from "./assets/img_smile.png";
import start from "./assets/text_start.png";
import stop from "./assets/text_stop.png";

function App() {
	const {
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
	} = useLottery();

	return (
		<div className="bg-pink-kirakira flex flex-col gap-12 p-16 justify-between">
			<div className="flex flex-col items-center gap-16 h-screen">
				<div className="">
					<h1 className="text-4xl"><img src={title} alt="" /></h1>
				</div>
				<div className="flex gap-24">
					<div className="relative">
						<Roulette roulette={roulette} />
						<div className="absolute -right-20 top-2/4 -translate-y-1/2"><img src={arrow} alt="" /></div>
						<div className="absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2"><img src={smile} alt="" /></div>
					</div>
					<div className="flex flex-col gap-12 justify-center">
						<div className="flex gap-2">
							<Button
								className="w-full py-10 w-60 rounded-full border-8 border-yellow-400 bg-gradient-to-b from-white to-yellow-300"
								onClick={handleStart}
								disabled={isDisableStart}
							>
								<img src={start} alt="スタート" />
							</Button>
							<Button
								className="w-full py-10 w-60 rounded-full border-8 border-yellow-400 bg-gradient-to-b from-white to-yellow-300"
								onClick={handleStop}
								disabled={isDisableStop}
							>
								<img src={stop} alt="" />
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
								value={resultListOutput}
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
									value={memberListInput}
									onChange={handleChangeMemberListTextArea}
									className="h-96"
									placeholder="Type member list here."
									id="member-list"
									disabled={isDisableInputForm}
								/>
							</div>
							<div className="grid w-full gap-2">
								<Label htmlFor="prize-list">Prize list</Label>
								<Textarea
									value={prizeListInput}
									onChange={handleChangePrizeListTextArea}
									className="h-96"
									placeholder="Type prize list here."
									id="prize-list"
									disabled={isDisableInputForm}
								/>
							</div>
							<div className="grid w-full gap-2">
								<Label htmlFor="all-result">All result list</Label>
								<Textarea
									className="h-96"
									value={resultListOutput}
									disabled={true}
								/>
							</div>
							<div className="grid w-full gap-2">
								<Label htmlFor="result">Current result</Label>
								<Textarea
									className="h-96"
									value={currentResult}
									disabled={true}
								/>
							</div>
						</div>
						<div className="flex gap-2">
							<AlertDialog>
								<Button asChild className="bg-red-600 color-white w-60">
									<AlertDialogTrigger disabled={isDisableReset}>
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
