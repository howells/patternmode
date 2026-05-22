"use client";

import { ScrollFrame } from "@howells/scroll-frame";

const notes = [
	"Selection state remains visible while the surrounding page stays still.",
	"Fades disappear at the exact edge instead of being hard-coded decoration.",
	"Native scrolling keeps trackpad, keyboard, and touch behavior predictable.",
	"Horizontal strips use the same primitive as vertical panels.",
	"Consumers can hide scrollbars without losing measured edge state.",
	"Content can be cards, rows, forms, menus, or any custom layout.",
];

const chips = [
	"Granite",
	"Basalt",
	"Limestone",
	"Oak",
	"Walnut",
	"Cork",
	"Linen",
	"Wool",
];

export function ScrollFrameDemo() {
	return (
		<div className="scroll-frame-demo">
			<ScrollFrame
				aria-label="Implementation notes"
				className="scroll-frame-demo-panel"
				fadeColor="var(--surface)"
				viewportClassName="scroll-frame-demo-viewport"
			>
				<div className="scroll-frame-demo-list">
					{notes.map((note, index) => (
						<div className="scroll-frame-demo-row" key={note}>
							<span>{String(index + 1).padStart(2, "0")}</span>
							<p>{note}</p>
						</div>
					))}
				</div>
			</ScrollFrame>

			<ScrollFrame
				aria-label="Material filters"
				axes="horizontal"
				className="scroll-frame-demo-strip"
				controls
				fadeColor="var(--surface)"
				scrollbars="hidden"
			>
				<div className="scroll-frame-demo-chips">
					{chips.map((chip) => (
						<span key={chip}>{chip}</span>
					))}
				</div>
			</ScrollFrame>
		</div>
	);
}
