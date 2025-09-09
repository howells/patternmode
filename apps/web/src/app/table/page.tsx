import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@patternmode/table";
import { Heading } from "@patternmode/heading";
import { Text } from "@patternmode/text";
import { Stack } from "@patternmode/stack";
import { cx } from "@patternmode/utils/cx";

export const metadata = { title: "Table Demo" };

export default function TableDemoPage() {
  const rows = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "Editor",
      status: "Pending",
    },
    {
      name: "Carla Gomez",
      email: "carla@example.com",
      role: "Viewer",
      status: "Disabled",
    },
  ] as const;

  return (
    <main className={cx("mx-auto w-full max-w-4xl p-6 bg-white dark:bg-zinc-950")}>
      <Stack gap={2}>
        <Heading level={1}>Table</Heading>
        <Text size="sm" className="text-zinc-600 dark:text-zinc-400">
          Demo of @patternmode/table primitives rendered at /table.
        </Text>
      </Stack>

      <Stack gap={2} className="mt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Name</TableHead>
                <TableHead scope="col">Email</TableHead>
                <TableHead scope="col">Role</TableHead>
                <TableHead scope="col">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.email}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell>{r.role}</TableCell>
                  <TableCell>{r.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-medium" colSpan={3}>
                  Total
                </TableCell>
                <TableCell className="text-right">{rows.length} members</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <Text size="sm" className="mt-1 text-center text-zinc-500 dark:text-zinc-400">
          Team directory
        </Text>
      </Stack>
    </main>
  );
}
