"use client";

import { Button } from "@patternmode/button";
import { useToast } from "./component";

export const DefaultExample = () => {
	const toast = useToast();

	return (
		<Button
			onClick={() => {
				toast.success("Success!", "Your changes have been saved.");
			}}
		>
			Show Toast
		</Button>
	);
};

export const ToastTypesExample = () => {
	const toast = useToast();

	return (
		<div className="flex flex-wrap gap-2">
			<Button
				variant="outline"
				onClick={() => {
					toast.success("Success!", "Operation completed successfully.");
				}}
			>
				Success
			</Button>
			<Button
				variant="outline"
				onClick={() => {
					toast.error("Error!", "Something went wrong.");
				}}
			>
				Error
			</Button>
			<Button
				variant="outline"
				onClick={() => {
					toast.warning("Warning!", "Please check your input.");
				}}
			>
				Warning
			</Button>
			<Button
				variant="outline"
				onClick={() => {
					toast.info("Info", "Here's some useful information.");
				}}
			>
				Info
			</Button>
		</div>
	);
};

export const WithActionExample = () => {
	const toast = useToast();

	return (
		<Button
			onClick={() => {
				toast.toast({
					title: "File uploaded",
					description: "Your file has been uploaded successfully.",
					type: "success",
					action: {
						label: "View",
						onClick: () => alert("Opening file..."),
					},
				});
			}}
		>
			Toast with Action
		</Button>
	);
};

export const PromiseExample = () => {
	const toast = useToast();

	const handleAsyncOperation = () => {
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (Math.random() > 0.5) {
					resolve("Operation successful!");
				} else {
					reject(new Error("Operation failed!"));
				}
			}, 2000);
		});

		toast.promise(promise, {
			loading: "Processing...",
			success: "Operation completed!",
			error: "Operation failed!",
		});
	};

	return <Button onClick={handleAsyncOperation}>Async Operation</Button>;
};

export const CustomDurationExample = () => {
	const toast = useToast();

	return (
		<div className="flex gap-2">
			<Button
				variant="outline"
				size="sm"
				onClick={() => {
					toast.toast({
						title: "Quick toast",
						description: "This will disappear in 1 second",
						duration: 1000,
					});
				}}
			>
				1 Second
			</Button>
			<Button
				variant="outline"
				size="sm"
				onClick={() => {
					toast.toast({
						title: "Long toast",
						description: "This will stay for 10 seconds",
						duration: 10000,
					});
				}}
			>
				10 Seconds
			</Button>
			<Button
				variant="outline"
				size="sm"
				onClick={() => {
					toast.toast({
						title: "Persistent toast",
						description: "This won't auto-dismiss",
						duration: Infinity,
					});
				}}
			>
				Persistent
			</Button>
		</div>
	);
};

export const DismissExample = () => {
	const toast = useToast();

	return (
		<div className="flex gap-2">
			<Button
				onClick={() => {
					toast.success("Another toast", "This is a test message");
				}}
			>
				Add Toast
			</Button>
			<Button
				variant="outline"
				onClick={() => {
					toast.dismissAll();
				}}
			>
				Dismiss All
			</Button>
		</div>
	);
};

export const ComplexPromiseExample = () => {
	const toast = useToast();

	const handleComplexOperation = () => {
		const promise = fetch("/api/save").then((response) => {
			if (!response.ok) {
				throw new Error("Failed to save");
			}
			return response.json();
		});

		toast.promise(promise, {
			loading: {
				title: "Saving changes...",
				description: "Please wait while we save your data",
			},
			success: (data: any) => ({
				title: "Changes saved!",
				description: `Successfully saved ${data?.count || 0} items`,
				action: {
					label: "View",
					onClick: () => console.log("View saved items"),
				},
			}),
			error: (error: Error) => ({
				title: "Save failed",
				description: error.message || "An unexpected error occurred",
				action: {
					label: "Retry",
					onClick: () => handleComplexOperation(),
				},
			}),
		});
	};

	return <Button onClick={handleComplexOperation}>Complex Promise</Button>;
};
