import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function App() {
	return (
		<div className="flex flex-col gap-4 p-8">
			<h1 className="text-xl">year end party 2023, lottery app (prototype)</h1>

			<div className="grid w-full gap-2">
				<Label htmlFor="member-list">Member list</Label>
				<Textarea
					className="h-40"
					placeholder="Type member list here."
					id="member-list"
				/>
			</div>
			<div className="grid w-full gap-2">
				<Label htmlFor="winner">Winner</Label>
				<Textarea
					className="h-20"
					placeholder="Result here."
					id="winner"
					disabled
				/>
			</div>
			<div className="grid w-full gap-2">
				<Label htmlFor="previous-winner">Previous winner</Label>
				<Textarea
					className="h-40"
					placeholder="Result here."
					id="Winner"
					disabled
				/>
			</div>
			<div className="grid w-full gap-2">
				<Button>Run</Button>
				<Button>Reset</Button>
			</div>
		</div>
	);
}

export default App;
