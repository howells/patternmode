import { LineChart } from "./component";

export const TestLineChart = () => (
	<LineChart
		data={[{ index: "index", categories: { category: "category" }, value: 1 }]}
		index="index"
		categories={["category"]}
	>
		Test LineChart
	</LineChart>
);
