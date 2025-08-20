import * as React from "react";
import { TagInput } from "./component";

export const BasicTagInput = () => {
	const [value, setValue] = React.useState<string[]>([]);

	return (
		<TagInput
			allowCreate
			placeholder="Add tags..."
			value={value}
			onValueChange={setValue}
			options={[
				{ value: "react", label: "React" },
				{ value: "vue", label: "Vue" },
				{ value: "angular", label: "Angular" },
			]}
		/>
	);
};

export const FilterableTagInput = () => {
	const [value, setValue] = React.useState<string[]>([]);

	return (
		<TagInput
			placeholder="Add tags..."
			value={value}
			onValueChange={setValue}
			options={[
				{ value: "react", label: "React" },
				{ value: "vue", label: "Vue" },
				{ value: "angular", label: "Angular" },
			]}
		/>
	);
};

export const CreateableTagInput = () => {
	const [value, setValue] = React.useState<string[]>([]);

	return (
		<TagInput
			allowCreate
			placeholder="Add tags..."
			value={value}
			onValueChange={setValue}
			options={[
				{ value: "react", label: "React" },
				{ value: "vue", label: "Vue" },
			]}
		/>
	);
};
