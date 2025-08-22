"use client";

import { useState } from "react";
import { Button } from "@patternmode/button";
import { Stack } from "../stack/component";
import { Switch } from "./component";

export const DefaultExample = () => {
	return (
		<Stack direction="horizontal" align="center" gap={2}>
			<Switch id="airplane-mode" />
			<label htmlFor="airplane-mode">Airplane Mode</label>
		</Stack>
	);
};

export const CheckedExample = () => {
	return (
		<Stack direction="horizontal" align="center" gap={2}>
			<Switch id="notifications" defaultChecked />
			<label htmlFor="notifications">Enable notifications</label>
		</Stack>
	);
};

export const DisabledExample = () => {
	return (
		<Stack gap={4}>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id="disabled-off" disabled />
				<label htmlFor="disabled-off" className="text-zinc-500">
					Disabled (off)
				</label>
			</Stack>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id="disabled-on" defaultChecked disabled />
				<label htmlFor="disabled-on" className="text-zinc-500">
					Disabled (on)
				</label>
			</Stack>
		</Stack>
	);
};

export const SizesExample = () => {
	return (
		<Stack gap={4}>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id="xs" size="xs" />
				<label htmlFor="xs">Extra small switch</label>
			</Stack>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id="sm" size="sm" />
				<label htmlFor="sm">Small switch</label>
			</Stack>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id="base" size="base" />
				<label htmlFor="base">Base switch</label>
			</Stack>
			<Stack direction="horizontal" align="center" gap={2}>
				<Switch id="lg" size="lg" />
				<label htmlFor="lg">Large switch</label>
			</Stack>
		</Stack>
	);
};

export const FormExample = () => {
	return (
		<form>
			<Stack gap={4}>
				<Stack gap={3}>
					<h3 className="text-lg font-medium">Email Preferences</h3>
					<Stack gap={3}>
						<Stack direction="horizontal" align="center" justify="between">
							<label htmlFor="marketing" className="text-sm font-medium">
								Marketing emails
							</label>
							<Switch id="marketing" />
						</Stack>
						<Stack direction="horizontal" align="center" justify="between">
							<label htmlFor="security" className="text-sm font-medium">
								Security alerts
							</label>
							<Switch id="security" defaultChecked />
						</Stack>
						<Stack direction="horizontal" align="center" justify="between">
							<label htmlFor="updates" className="text-sm font-medium">
								Product updates
							</label>
							<Switch id="updates" />
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
