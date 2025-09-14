import { cx } from "@patternmode/utils/cx";
import type { DescriptionTermProps } from "../types";
import { descriptionTermVariants } from "../variants";

const DescriptionTerm = ({ className, ...props }: DescriptionTermProps) => {
  return (
    <dt
      {...props}
      className={cx(descriptionTermVariants(), className)}
      title={typeof props.children === "string" ? props.children : undefined}
    />
  );
};

DescriptionTerm.displayName = "DescriptionTerm";

export { DescriptionTerm };
