import { cx } from "@patternmode/utils/cx";
import type { DescriptionDetailsProps } from "../types";
import { descriptionDetailsVariants } from "../variants";

const DescriptionDetails = ({
  className,
  ...props
}: DescriptionDetailsProps) => {
  return (
    <dd {...props} className={cx(descriptionDetailsVariants(), className)} />
  );
};

DescriptionDetails.displayName = "DescriptionDetails";

export { DescriptionDetails };
