"use client";

import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Callout } from "./component";

export const DefaultExample = () => (
	<Callout title="Information">
		This is important information you should know about.
	</Callout>
);

export const SuccessExample = () => (
	<Callout title="Success" variant="success" icon={CheckCircle}>
		Your operation completed successfully!
	</Callout>
);

export const ErrorExample = () => (
	<Callout title="Error" variant="error" icon={AlertCircle}>
		Something went wrong. Please try again.
	</Callout>
);

export const WarningExample = () => (
	<Callout title="Warning" variant="warning" icon={AlertTriangle}>
		Please review this information carefully.
	</Callout>
);

export const NeutralExample = () => (
	<Callout title="Note" variant="neutral">
		This is a neutral callout for general information.
	</Callout>
);

export const WithoutTitleExample = () => (
	<Callout variant="default" icon={Info}>
		A callout without a title, displaying only the content with an icon.
	</Callout>
);
