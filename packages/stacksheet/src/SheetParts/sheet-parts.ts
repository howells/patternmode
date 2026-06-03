import { SheetBack } from "./sheet-back";
import { SheetBody } from "./sheet-body";
import { SheetClose } from "./sheet-close";
import { SheetDescription } from "./sheet-description";
import { SheetFooter } from "./sheet-footer";
import { SheetHandle } from "./sheet-handle";
import { SheetHeader } from "./sheet-header";
import { SheetTitle } from "./sheet-title";

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
