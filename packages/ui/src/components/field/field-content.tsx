import {
  Children,
  type ComponentPropsWithoutRef,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "../../utils/cn";
import { useFieldContext } from "./field-context";

function withFieldControlProps(children: ReactNode, fieldId: string) {
  let wired = false;

  return Children.map(children, (child) => {
    if (!isValidElement(child) || wired) {
      return child;
    }

    const childProps = child.props as {
      "aria-describedby"?: string;
      "aria-errormessage"?: string;
      id?: string;
    };

    wired = true;

    return cloneElement(
      child as ReactElement<{
        "aria-describedby"?: string;
        "aria-errormessage"?: string;
        id?: string;
      }>,
      {
        "aria-describedby": [
          childProps["aria-describedby"],
          `${fieldId}-description`,
          `${fieldId}-error`,
        ]
          .filter(Boolean)
          .join(" "),
        "aria-errormessage":
          childProps["aria-errormessage"] ?? `${fieldId}-error`,
        id: childProps.id ?? fieldId,
      }
    );
  });
}

function FieldContent({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const context = useFieldContext();

  return (
    <div
      className={cn("flex min-w-0 flex-1 flex-col gap-1.5", className)}
      data-slot="field-content"
      {...props}
    >
      {context ? withFieldControlProps(children, context.fieldId) : children}
    </div>
  );
}

export { FieldContent };
