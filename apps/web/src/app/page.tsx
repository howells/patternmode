

import { Purpose } from "./page.purpose";

export default function Home() {
	return (
		<div className="p-16">
			<h1 className="font-serif text-4xl max-w-3xl">
				Patternmode is a very opinionated component library based on the best
				bits of Base UI, Shadcn UI, Tailwind, and more.
			</h1>

			<Purpose />
		</div>
	);
}
