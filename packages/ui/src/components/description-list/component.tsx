import type { DescriptionDetailsProps, DescriptionListProps, DescriptionTermProps } from "./types";

import { cx } from "../../lib/utils";
import { descriptionDetailsVariants, descriptionListVariants, descriptionTermVariants } from "./variants";

/**
 * Root container for description lists with semantic HTML structure.
 */
const DescriptionList = ({ className, ...props }: DescriptionListProps) => {
  return (
    <dl
      {...props}
      data-testid="description-list"
      className={cx(descriptionListVariants(), className)}
    />
  );
};

const DescriptionTerm = ({ className, ...props }: DescriptionTermProps) => {
  return (
    <dt
      {...props}
      className={cx(descriptionTermVariants(), className)}
    />
  );
};

const DescriptionDetails = ({
  className,
  ...props
}: DescriptionDetailsProps) => {
  return (
    <dd
      {...props}
      className={cx(descriptionDetailsVariants(), className)}
    />
  );
};

export { DescriptionDetails, DescriptionList, DescriptionTerm };
