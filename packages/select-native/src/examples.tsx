"use client";

import { SelectNative } from "./component";

export const DefaultExample = () => (
	<SelectNative defaultValue="" className="w-[220px]">
		<option value="" disabled>
			Select an option
		</option>
		<option value="apple">Apple</option>
		<option value="banana">Banana</option>
		<option value="orange">Orange</option>
	</SelectNative>
);

export const WithLabelExample = () => (
	<div className="flex flex-col gap-1 w-[240px]">
		<span className="text-sm">Favorite fruit</span>
		<SelectNative defaultValue="">
			<option value="" disabled>
				Select a fruit
			</option>
			<option value="apple">Apple</option>
			<option value="banana">Banana</option>
			<option value="orange">Orange</option>
		</SelectNative>
	</div>
);

export const WithGroupsExample = () => (
	<SelectNative defaultValue="">
		<option value="" disabled>
			Select a value
		</option>
		<optgroup label="Fruits">
			<option value="apple">Apple</option>
			<option value="banana">Banana</option>
		</optgroup>
		<optgroup label="Vegetables">
			<option value="carrot">Carrot</option>
			<option value="broccoli">Broccoli</option>
		</optgroup>
	</SelectNative>
);

export const ErrorStateExample = () => (
	<SelectNative defaultValue="" hasError>
		<option value="" disabled>
			Select a value
		</option>
		<option value="a">A</option>
	</SelectNative>
);

export const DisabledExample = () => (
	<SelectNative defaultValue="" disabled>
		<option value="" disabled>
			Disabled
		</option>
	</SelectNative>
);

export const MultipleExample = () => (
	<SelectNative multiple defaultValue={["apple", "banana"]} className="h-24">
		<option value="apple">Apple</option>
		<option value="banana">Banana</option>
		<option value="orange">Orange</option>
	</SelectNative>
);
