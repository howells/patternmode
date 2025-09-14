import { ChevronLeft, ChevronRight } from "lucide-react";

export const ChevronComponent = ({
  orientation = "right",
  ...chevronProps
}: {
  orientation?: "left" | "up" | "down" | "right";
  [key: string]: any;
}) => {
  if (orientation === "left") {
    return (
      <ChevronLeft aria-hidden="true" className="h-4 w-4" {...chevronProps} />
    );
  }
  return (
    <ChevronRight aria-hidden="true" className="h-4 w-4" {...chevronProps} />
  );
};

