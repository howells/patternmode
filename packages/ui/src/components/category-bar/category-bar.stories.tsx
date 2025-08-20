import { CategoryBar } from "./component";

export const TestCategoryBar = () => (
	<CategoryBar
		values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
		colors={[
			"blue",
			"emerald",
			"violet",
			"amber",
			"gray",
			"cyan",
			"pink",
			"lime",
			"fuchsia",
		]}
		showLabels
		onVolumeChange={() => {}}
	>
		Test CategoryBar
	</CategoryBar>
);
