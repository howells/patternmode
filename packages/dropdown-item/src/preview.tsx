import { User } from "lucide-react";
import { DropdownItem } from "./component";
import type { DropdownItemProps } from "./types";

export function DropdownItemPreview(props: Omit<DropdownItemProps, "ref">) {
  const { ...restProps } = props;
  return (
    <div className="w-64 p-2">
      <DropdownItem leftIcon={User} {...restProps}>
        Dropdown Item Option
      </DropdownItem>
    </div>
  );
}

export const dropdownItemPreviewProps = [
  { name: "highlighted", type: "boolean", defaultValue: false },
  { name: "selected", type: "boolean", defaultValue: false },
  { name: "hint", type: "string", defaultValue: "" },
  { name: "variant", type: "select", options: ["default", "destructive"], defaultValue: "default" },
];
