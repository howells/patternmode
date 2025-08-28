"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./component";

export const BasicTableExample = () => (
	<Table>
		<TableCaption>Example table.</TableCaption>
		<TableHeader>
			<TableRow>
				<TableHead>Item</TableHead>
				<TableHead>Qty</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<TableRow>
				<TableCell>Apples</TableCell>
				<TableCell>5</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Oranges</TableCell>
				<TableCell>3</TableCell>
			</TableRow>
		</TableBody>
		<TableFooter>
			<TableRow>
				<TableCell colSpan={2}>Total: 8</TableCell>
			</TableRow>
		</TableFooter>
	</Table>
);
