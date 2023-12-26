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
import bounenkai from "./assets/text_bounenkai.png";
import untgroup from "./assets/text_untgroup.png";
import year from "./assets/text_year.png";
import arrow from "./assets/img_arrow.png";
import smile from "./assets/img_smile.png";
import start from "./assets/text_start.png";
import stop from "./assets/text_stop.png";
import kitty from "./assets/img_kitty.png";
import thx2023 from "./assets/img_thx-2023.png";
import morioka from "./assets/img_morioka.png";
import miyazaki from "./assets/img_miyazaki.png";
import osaka from "./assets/img_osaka.png";
import heart from "./assets/img_heart.png";
import rainbow from "./assets/img_rainbow.png";
import butterfly from "./assets/img_butterfly.png";
import tokyo from "./assets/img_tokyo.png";
import nagoya from "./assets/img_nagoya.png";
import flower from "./assets/img_flower.png";

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
		<div className="bg-pink-kirakira flex flex-col gap-12 p-16 justify-between overflow-x-hidden">
			<div className="flex flex-col items-center gap-8 h-screen">
				<h1 className="relative">
					<img className="z-50 relative scale-110" src={bounenkai} alt="忘年会ルーレット！！" />
					<img className="absolute -top-10 -left-52 scale-110" src={year} alt="2023" />
					<img className="absolute -top-8 left-36 scale-110" src={untgroup} alt="un-T group！" />
					<img className="absolute -top-[350px] -right-[720px] scale-125" src={rainbow} alt="" />
					<img className="absolute -top-20 right-36 scale-110" src={butterfly} alt="" />
				</h1>
				<div className="flex gap-24">
					<div className="relative">
						<div className="relative z-10">
							<Roulette roulette={roulette} />
						</div>
						<div className="absolute -right-24
						 top-2/4 -translate-y-1/2 z-50"><img src={arrow} alt="" /></div>
						<div className="absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 z-50"><img src={smile} alt="" /></div>
						<div className="absolute -left-20 -top-20 scale-110"><img src={kitty} alt="" /></div>
						<div className="absolute -left-16 -bottom-4 scale-110"><img src={morioka} alt="MORIOKA" /></div>
						<div className="absolute -right-64 -top-20 scale-110"><img src={miyazaki} alt="MiYaZaKi" /></div>
						<div className="absolute -right-24 -bottom-10 scale-110"><img src={osaka} alt="" /></div>
						<div className="absolute -left-24 top-36 scale-110"><img src={thx2023} alt="Thank you 2023" /></div>
						<div className="absolute -right-20 top-10 scale-110"><img src={heart} alt="" /></div>
						<div className="absolute bg-white w-[600px] h-[600px] top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 rounded-full"></div>
					</div>
					<div className="flex flex-col gap-8 items-center mt-11">
						<div className="flex gap-5 relative">
							<Button
								className="py-10 w-72 rounded-full border-8 border-yellow-400 bg-gradient-to-b from-white to-yellow-300"
								onClick={handleStart}
								disabled={isDisableStart}
							>
								<img src={start} alt="スタート" />
							</Button>
							<Button
								className="py-10 w-72 rounded-full border-8 border-yellow-400 bg-gradient-to-b from-white to-yellow-300"
								onClick={handleStop}
								disabled={isDisableStop}
							>
								<img src={stop} alt="" />
							</Button>
							<div className="absolute -right-20 -top-2 scale-110"><img src={tokyo} alt="" /></div>
						</div>
						<div className="flex flex-col gap-2 bg-white items-center p-8 w-11/12">
							{currentPrize && (<p className="text-2xl font-semibold"><span className="pr-2 text-pink-600">{currentPrize}</span>ゎ。。。</p>)}
							{currentMember && (<p className="text-3xl font-semibold">{currentMember}±ω</p>)}
						</div>
						<div className="grid w-11/12 gap-2 relative">
							{/* <Label htmlFor="all-result">All result list</Label> */}
							<Textarea
								className="h-60 z-20"
								value={resultListOutput}
								disabled={true}
							/>
							<div className="absolute -right-36 -bottom-32 scale-110"><img src={nagoya} alt="NAGOYA" /></div>
							<div className="absolute right-96 -bottom-14 scale-110"><img src={flower} alt="" /></div>
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
