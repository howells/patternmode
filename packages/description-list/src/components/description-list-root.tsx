import { cx } from "@patternmode/utils/cx";
import type { DescriptionListProps } from "../types";
import { descriptionListVariants } from "../variants";

/**
 * Root container for description lists with semantic HTML structure.
 */
const DescriptionList = ({
  className,
  columns,
  termWidth,
  valueWidth = "1fr",
  size = "base",
  border = true,
  truncateTerms = false,
  ...props
}: DescriptionListProps) => {
  return (
    <dl
      {...props}
      className={cx(
        descriptionListVariants({
          columns: columns ? undefined : "default",
          size,
          border,
          truncateTerms,
        }),
        className
      )}
      data-testid="description-list"
      style={
        columns || termWidth
          ? {
              gridTemplateColumns:
                columns ?? `${termWidth ?? "auto"} ${valueWidth}`,
            }
          : undefined
      }
    />
  );
};

export { DescriptionList };
