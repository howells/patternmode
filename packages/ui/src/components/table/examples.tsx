"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "./component";

export const DefaultExample = () => {
  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>Editor</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableRoot>
  );
};

export const WithCaptionExample = () => {
  return (
    <TableRoot>
      <Table>
        <TableCaption>Employee Directory</TableCaption>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>Engineering</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>john.doe@company.com</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>Design</TableCell>
            <TableCell>UX Designer</TableCell>
            <TableCell>jane.smith@company.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableRoot>
  );
};

export const WithFooterExample = () => {
  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Quantity</TableHeaderCell>
            <TableHeaderCell className="text-right">Price</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Widget A</TableCell>
            <TableCell>5</TableCell>
            <TableCell className="text-right">$25.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Widget B</TableCell>
            <TableCell>3</TableCell>
            <TableCell className="text-right">$45.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Widget C</TableCell>
            <TableCell>2</TableCell>
            <TableCell className="text-right">$30.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFoot>
          <TableRow>
            <TableCell className="font-semibold">Total</TableCell>
            <TableCell className="font-semibold">10</TableCell>
            <TableCell className="text-right font-semibold">$100.00</TableCell>
          </TableRow>
        </TableFoot>
      </Table>
    </TableRoot>
  );
};

export const InteractiveExample = () => {
  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>User</TableHeaderCell>
            <TableHeaderCell>Last Active</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
            <TableCell>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                Active
              </span>
            </TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>2 minutes ago</TableCell>
            <TableCell>
              <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Edit
              </button>
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
            <TableCell>
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                Away
              </span>
            </TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>1 hour ago</TableCell>
            <TableCell>
              <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Edit
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableRoot>
  );
};

export const NumericDataExample = () => {
  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Metric</TableHeaderCell>
            <TableHeaderCell className="text-right">Value</TableHeaderCell>
            <TableHeaderCell className="text-right">Change</TableHeaderCell>
            <TableHeaderCell className="text-right">Percentage</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Revenue</TableCell>
            <TableCell className="text-right font-mono">$45,231</TableCell>
            <TableCell className="text-right font-mono text-green-600">+$4,231</TableCell>
            <TableCell className="text-right font-mono text-green-600">+10.3%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell className="text-right font-mono">2,431</TableCell>
            <TableCell className="text-right font-mono text-green-600">+180</TableCell>
            <TableCell className="text-right font-mono text-green-600">+8.0%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Conversion</TableCell>
            <TableCell className="text-right font-mono">3.2%</TableCell>
            <TableCell className="text-right font-mono text-red-600">-0.1%</TableCell>
            <TableCell className="text-right font-mono text-red-600">-3.1%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableRoot>
  );
};
