"use client";

import { createStacksheet } from "@patternmode/stacksheet";

interface DemoSheets {
	Config: { category: string };
	Flow: { action: string };
	Overview: { title: string };
}

const { StacksheetProvider, useSheet, useStacksheetState } =
	createStacksheet<DemoSheets>({
		side: { desktop: "right", mobile: "bottom" },
		spring: "subtle",
		stacking: {
			opacityStep: 0.04,
			radius: 10,
			scaleStep: 0.035,
		},
		width: 430,
	});

const sheets = {
	Config: ConfigSheet,
	Flow: FlowSheet,
	Overview: OverviewSheet,
};

function OverviewSheet({ title }: { title: string }) {
	const { close, push } = useSheet();

	return (
		<div className="sheet-panel-content">
			<p className="sheet-kicker">Sheet stack</p>
			<h3>{title}</h3>
			<p>
				Start with one Sheet, then push more Sheets without losing the path
				back.
			</p>
			<div className="sheet-action-row">
				<button
					onClick={() => push("Flow", `flow-${Date.now()}`, { action: "Push" })}
					type="button"
				>
					Push next
				</button>
				<button onClick={close} type="button">
					Close
				</button>
			</div>
		</div>
	);
}

function FlowSheet({ action }: { action: string }) {
	const { navigate, push } = useSheet();

	return (
		<div className="sheet-panel-content">
			<p className="sheet-kicker">{action}</p>
			<h3>Nested flow</h3>
			<p>
				Use push for depth, navigate for replacing the current branch, and pop
				for back behavior.
			</p>
			<div className="sheet-action-row">
				<button
					onClick={() =>
						push("Config", `config-${Date.now()}`, { category: "Motion" })
					}
					type="button"
				>
					Push config
				</button>
				<button
					onClick={() =>
						navigate("Config", `config-${Date.now()}`, { category: "Layout" })
					}
					type="button"
				>
					Navigate
				</button>
			</div>
		</div>
	);
}

function ConfigSheet({ category }: { category: string }) {
	const { close, replace } = useSheet();

	return (
		<div className="sheet-panel-content">
			<p className="sheet-kicker">{category}</p>
			<h3>Configuration</h3>
			<p>
				Placement, drag thresholds, snap points, and springs are set on each
				stack instance.
			</p>
			<div className="sheet-list">
				<span>Responsive side</span>
				<span>Modal or non-modal</span>
				<span>Composable Sheet Parts</span>
			</div>
			<div className="sheet-action-row">
				<button
					onClick={() =>
						replace("Flow", `flow-${Date.now()}`, { action: "Replace" })
					}
					type="button"
				>
					Replace
				</button>
				<button onClick={close} type="button">
					Close stack
				</button>
			</div>
		</div>
	);
}

function Launcher() {
	const { open, push } = useSheet();
	const { stack } = useStacksheetState();

	return (
		<div className="stacksheet-surface">
			<div className="stack-preview" aria-hidden="true">
				<div />
				<div />
				<div />
			</div>
			<div className="stacksheet-copy">
				<h3>Open one sheet, then keep moving.</h3>
				<p>
					The demo exercises open, push, navigate, replace, back, close, and
					mobile bottom-sheet behavior.
				</p>
				<div className="demo-button-row">
					<button
						onClick={() =>
							open("Overview", "overview", { title: "Typed sheet" })
						}
						type="button"
					>
						Open sheet
					</button>
					<button
						disabled={stack.length === 0}
						onClick={() =>
							push("Config", `config-${Date.now()}`, { category: "Behavior" })
						}
						type="button"
					>
						Push config
					</button>
				</div>
				<p className="demo-state">{stack.length} Sheets in stack</p>
			</div>
		</div>
	);
}

export function StacksheetDemo() {
	return (
		<StacksheetProvider
			classNames={{
				backdrop: "stacksheet-backdrop",
				header: "stacksheet-header",
				panel: "stacksheet-panel",
			}}
			sheets={sheets}
		>
			<div className="demo-block">
				<Launcher />
			</div>
		</StacksheetProvider>
	);
}
