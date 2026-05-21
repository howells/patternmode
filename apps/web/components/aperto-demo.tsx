"use client";

import {
	Aperto,
	type ApertoMediaItem,
	type NavigationMotionPresetName,
} from "@howells/aperto";
import { SegmentedControl } from "@howells/site-ui/client";
import type { CSSProperties } from "react";
import { useState } from "react";

export type CatalogMediaItem = ApertoMediaItem;

export function ApertoDemo({ media }: { media: CatalogMediaItem[] }) {
	const [columns, setColumns] = useState(2);
	const [navigationMotion, setNavigationMotion] =
		useState<NavigationMotionPresetName>("glide");
	const [radius, setRadius] = useState(6);

	return (
		<div className="demo-block aperto-demo">
			<div className="demo-controls">
				<SegmentedControl
					label="Navigation"
					onChange={setNavigationMotion}
					options={[
						{ label: "Float", value: "float" as const },
						{ label: "Glide", value: "glide" as const },
						{ label: "Snap", value: "snap" as const },
					]}
					value={navigationMotion}
				/>
				<SegmentedControl
					label="Columns"
					onChange={setColumns}
					options={[
						{ label: "2", value: 2 },
						{ label: "3", value: 3 },
					]}
					value={columns}
				/>
				<SegmentedControl
					label="Radius"
					onChange={setRadius}
					options={[
						{ label: "0", value: 0 },
						{ label: "6", value: 6 },
						{ label: "12", value: 12 },
					]}
					value={radius}
				/>
			</div>

			<div style={{ "--aperto-radius": `${radius}px` } as CSSProperties}>
				<Aperto.Group
					classNames={{ thumbnail: "aperto-thumb" }}
					media={media}
					navigationMotion={navigationMotion}
				>
					<div className="aperto-grid" data-columns={columns}>
						{media.map((item, index) => (
							<Aperto.Thumbnail key={item.id ?? item.src} index={index} />
						))}
					</div>
				</Aperto.Group>
			</div>
		</div>
	);
}
