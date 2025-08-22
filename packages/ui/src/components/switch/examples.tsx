"use client";

import { Button } from "@patternmode/button";
import { Stack } from "@patternmode/stack";
import { useId, useState } from "react";
import { Switch } from "./component";

export const DefaultExample = () => {
	const id = useId();
	return (
		<Stack direction="horizontal" align="center" gap={2}>
			<Switch id={id} />
			<label htmlFor={id}>Airplane Mode</label>
		</Stack>
	);
};

export const CheckedExample = () => {
	const id = useId();
	return (
		<Stack direction="horizontal" align="center" gap={2}>
			<Switch id={id} defaultChecked />
			<label htmlFor={id}>Enable notifications</label>
		</Stack>
	);
};

export const DisabledExample = () => {
	const id1 = useId();
	const id2 = useId();
	return (
		<Stack gap={4}>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id={id1} disabled />
				<label htmlFor={id1} className="text-zinc-500">
					Disabled (off)
				</label>
			</Stack>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id={id2} defaultChecked disabled />
				<label htmlFor={id2} className="text-zinc-500">
					Disabled (on)
				</label>
			</Stack>
		</Stack>
	);
};

export const SizesExample = () => {
	const id1 = useId();
	const id2 = useId();
	const id3 = useId();
	const id4 = useId();
	return (
		<Stack gap={4}>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id={id1} size="xs" />
				<label htmlFor={id1}>Extra small switch</label>
			</Stack>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id={id2} size="sm" />
				<label htmlFor={id2}>Small switch</label>
			</Stack>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id={id3} size="base" />
				<label htmlFor={id3}>Base switch</label>
			</Stack>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id={id4} size="lg" />
				<label htmlFor={id4}>Large switch</label>
			</Stack>
		</Stack>
	);
};

export const FormExample = () => {
	const id1 = useId();
	const id2 = useId();
	const id3 = useId();
	return (
		<form>
			<Stack gap={4}>
				<Stack gap={3}>
					<h3 className="text-lg font-medium">Email Preferences</h3>
					<Stack gap={3}>
						<Stack direction="horizontal" align="center" justify="between">
							<label htmlFor={id1} className="text-sm font-medium">
								Marketing emails
							</label>
							<Switch id={id1} />
						</Stack>
						<Stack direction="horizontal" align="center" justify="between">
							<label htmlFor={id2} className="text-sm font-medium">
								Security alerts
							</label>
							<Switch id={id2} defaultChecked />
						</Stack>
						<Stack direction="horizontal" align="center" justify="between">
							<label htmlFor={id3} className="text-sm font-medium">
								Product updates
							</label>
							<Switch id={id3} />
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</form>
	);
};

export const ControlledExample = () => {
	const [isEnabled, setIsEnabled] = useState(false);

	return (
		<Stack gap={4}>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
				<span className="text-sm">
					Status: {isEnabled ? "Enabled" : "Disabled"}
				</span>
			</Stack>

			<Stack direction="horizontal" gap={2}>
				<Button size="sm" variant="outline" onClick={() => setIsEnabled(true)}>
					Turn On
				</Button>
				<Button size="sm" variant="outline" onClick={() => setIsEnabled(false)}>
					Turn Off
				</Button>
			</Stack>
		</Stack>
	);
};
