"use client";

import { Badge } from "../badge/component";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRoot,
	TableRow,
} from "./component";

const tableData = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		role: "Admin",
		status: "Active",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		role: "Editor",
		status: "Active",
	},
	{
		id: 3,
		name: "Bob Johnson",
		email: "bob@example.com",
		role: "User",
		status: "Inactive",
	},
	{
		id: 4,
		name: "Alice Brown",
		email: "alice@example.com",
		role: "User",
		status: "Active",
	},
	{
		id: 5,
		name: "Charlie Wilson",
		email: "charlie@example.com",
		role: "Editor",
		status: "Pending",
	},
];

export type TablePreviewProps = {
	/**
	 * Number of table rows to display.
	 * Controls how many data rows are shown in the table.
	 */
	rowCount?: 2 | 3 | 4 | 5;
	/**
	 * Whether to show status badges.
	 * Displays colorful status indicators when enabled.
	 */
	showStatus?: boolean;
	/**
	 * Whether to show row hover effects.
	 * Enables hover highlighting for better row identification.
	 */
	showHover?: boolean;
	/**
	 * Whether to show alternating row colors.
	 * Creates zebra striping for easier row scanning.
	 */
	showStripes?: boolean;
	/**
	 * Table size variant.
	 * Controls the padding and spacing within table cells.
	 */
	size?: "sm" | "md" | "lg";
	/**
	 * Whether to show the ID column.
	 * Displays a numeric identifier column when enabled.
	 */
	showIdColumn?: boolean;
};

export function TablePreview({
	rowCount = 4,
	showStatus = true,
	showHover = true,
	showStripes = false,
	size: _size = "md",
	showIdColumn = false,
}: TablePreviewProps = {}) {
	const displayedRows = tableData.slice(0, rowCount);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Active":
				return "emerald";
			case "Inactive":
				return "red";
			case "Pending":
				return "orange";
			default:
				return "zinc";
		}
	};

	return (
		<div className="p-8">
			<TableRoot>
				<Table className={`${showHover ? "hover:cursor-pointer" : ""}`}>
					<TableHead>
						<TableRow>
							{showIdColumn && <TableHeaderCell>ID</TableHeaderCell>}
							<TableHeaderCell>Name</TableHeaderCell>
							<TableHeaderCell>Email</TableHeaderCell>
							<TableHeaderCell>Role</TableHeaderCell>
							{showStatus && <TableHeaderCell>Status</TableHeaderCell>}
						</TableRow>
					</TableHead>
					<TableBody>
						{displayedRows.map((row, index) => (
							<TableRow
								key={row.id}
								className={`
                  ${showHover ? "hover:bg-zinc-50 dark:hover:bg-zinc-900/50" : ""}
                  ${showStripes && index % 2 === 1 ? "bg-zinc-50/50 dark:bg-zinc-900/25" : ""}
                `}
							>
								{showIdColumn && (
									<TableCell className="font-mono text-sm text-zinc-500">
										{row.id}
									</TableCell>
								)}
								<TableCell className="font-medium">{row.name}</TableCell>
								<TableCell className="text-zinc-600 dark:text-zinc-400">
									{row.email}
								</TableCell>
								<TableCell>
									<span className="text-sm">{row.role}</span>
								</TableCell>
								{showStatus && (
									<TableCell>
										<Badge color={getStatusColor(row.status)}>
											{row.status}
										</Badge>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableRoot>
		</div>
	);
}

// Preview props for prop explorer
export const tablePreviewProps = [
	{
		name: "showBorders",
		type: "boolean",
		description:
			"Whether to show table borders - adds borders around cells when enabled.",
		defaultValue: true,
	},
	{
		name: "showStripes",
		type: "boolean",
		description:
			"Whether to show striped rows - alternates row background colors when enabled.",
		defaultValue: false,
	},
	{
		name: "showHeader",
		type: "boolean",
		description:
			"Whether to show table header - displays column headers when enabled.",
		defaultValue: true,
	},
	{
		name: "showFooter",
		type: "boolean",
		description:
			"Whether to show table footer - displays footer row when enabled.",
		defaultValue: false,
	},
	{
		name: "size",
		type: "select",
		description:
			"Table size variant - affects padding and text size throughout the table.",
		options: ["sm", "default", "lg"],
		defaultValue: "default",
	},
];
