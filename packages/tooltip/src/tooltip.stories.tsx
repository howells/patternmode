import { Button } from "@patternmode/button";
import { Tooltip } from "./component";

export const TestTooltip = () => (
	<Tooltip content="Test Tooltip" render={<Button type="button" />}>
		Hover me
	</Tooltip>
);
