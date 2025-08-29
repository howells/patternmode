"use client";

import * as React from "react";
import { Button } from "@patternmode/button";
import {
	Sheet,
	SheetBody,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./component";

export function SheetPreview() {
	return (
		<Sheet>
            <SheetTrigger>
                <Button variant="outline" type="button">Open Sheet</Button>
            </SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Preview Sheet</SheetTitle>
					<SheetDescription>
						Use this panel to preview content.
					</SheetDescription>
				</SheetHeader>
				<SheetBody>
					<div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						<p>
							Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
						</p>
					</div>
				</SheetBody>
				<SheetFooter>
					<SheetClose className="px-3 py-2 rounded border">Close</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

export const sheetPreviewProps = [];
