import { SheetBack } from "./SheetBack";
import { SheetBody } from "./SheetBody";
import { SheetClose } from "./SheetClose";
import { SheetDescription } from "./SheetDescription";
import { SheetFooter } from "./SheetFooter";
import { SheetHandle } from "./SheetHandle";
import { SheetHeader } from "./SheetHeader";
import { SheetTitle } from "./SheetTitle";

/**
 * Composable Sheet Parts for building custom Sheet layouts.
 *
 * Use with `layout="composable"` on the provider to opt into composable mode:
 * no auto header or scroll wrapper, full control over the Sheet structure.
 *
 * `Sheet.Title` and `Sheet.Description` are linked to the Panel's
 * `aria-labelledby` and `aria-describedby` via matching IDs.
 */
export const Sheet = {
  Back: SheetBack,
  Body: SheetBody,
  Close: SheetClose,
  Description: SheetDescription,
  Footer: SheetFooter,
  Handle: SheetHandle,
  Header: SheetHeader,
  Title: SheetTitle,
} as const;
