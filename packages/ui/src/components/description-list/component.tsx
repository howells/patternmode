import { cx } from "../../utils/cx";
import type {
	DescriptionDetailsProps,
	DescriptionListProps,
	DescriptionTermProps,
} from "./types";
import {
	descriptionDetailsVariants,
	descriptionListVariants,
	descriptionTermVariants,
} from "./variants";

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
			data-testid="description-list"
			className={cx(
				descriptionListVariants({
					columns: columns ? undefined : "default",
					size,
					border,
					truncateTerms,
				}),
				className,
			)}
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

const DescriptionTerm = ({ className, ...props }: DescriptionTermProps) => {
	return (
		<dt
			{...props}
			className={cx(descriptionTermVariants(), className)}
			title={typeof props.children === "string" ? props.children : undefined}
		/>
	);
};

const DescriptionDetails = ({
	className,
	...props
}: DescriptionDetailsProps) => {
	return (
		<dd {...props} className={cx(descriptionDetailsVariants(), className)} />
	);
};

export { DescriptionDetails, DescriptionList, DescriptionTerm };
