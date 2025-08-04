import { cx } from "../../lib/utils";

type DescriptionListProps = {
  /**
   * Additional CSS classes for styling.
   * Applied to the root dl element.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"dl">;

type DescriptionTermProps = {
  /**
   * Additional CSS classes for styling.
   * Applied to the dt element for term labels.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"dt">;

type DescriptionDetailsProps = {
  /**
   * Additional CSS classes for styling.
   * Applied to the dd element for term descriptions.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"dd">;

/**
 * Root container for description lists with semantic HTML structure.
 */
const DescriptionList = ({ className, ...props }: DescriptionListProps) => {
  return (
    <dl
      {...props}
      data-testid="description-list"
      className={cx(
        className,
        "grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,--spacing(80))_auto] sm:text-sm/6",
      )}
    />
  );
};

const DescriptionTerm = ({ className, ...props }: DescriptionTermProps) => {
  return (
    <dt
      {...props}
      className={cx(
        className,
        "col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5",
      )}
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
      className={cx(
        className,
        "pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:nth-2:border-none dark:text-white dark:sm:border-white/5",
      )}
    />
  );
};

export { DescriptionDetails, DescriptionList, DescriptionTerm };
