"use client";

import * as React from "react";
import { Tag } from "./component";

export const DefaultExample = () => (
	<div className="flex gap-2 flex-wrap">
		<Tag value="Design" />
		<Tag value="Development" />
		<Tag value="Marketing" />
	</div>
);

export const DismissibleExample = () => {
	const [tags, setTags] = React.useState([
		{ id: 1, value: "React" },
		{ id: 2, value: "TypeScript" },
		{ id: 3, value: "Tailwind" },
	]);
	return (
		<div className="flex gap-2 flex-wrap">
			{tags.map((tag) => (
				<Tag
					key={tag.id}
					value={tag.value}
					onDismiss={() => setTags((t) => t.filter((x) => x.id !== tag.id))}
					dismissible
				/>
			))}
		</div>
	);
};

export const WithLabelsExample = () => (
	<div className="flex gap-2">
		<Tag label="Department" value="Engineering" />
		<Tag label="Location" value="San Francisco" />
		<Tag label="Team" value="Frontend" />
	</div>
);

export const TagsWithCountExample = () => (
	<div className="flex gap-2">
		<Tag value="JavaScript" count={42} />
		<Tag value="Python" count={28} />
		<Tag value="Go" count={15} />
	</div>
);
