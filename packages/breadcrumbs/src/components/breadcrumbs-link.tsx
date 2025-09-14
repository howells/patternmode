import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cx } from "@patternmode/utils/cx";
import type { BreadcrumbLinkProps } from "../types";
import { breadcrumbVariants } from "../variants";

const BreadcrumbLink = ({
  ref,
  className,
  render,
  ...props
}: BreadcrumbLinkProps) => {
  const { link } = breadcrumbVariants();

  const element = useRender({
    render: render ?? (
      <a href="/">
        <span className="sr-only">Breadcrumb link</span>
      </a>
    ),
    ref,
    props: mergeProps<"a">({ className: cx(link(), className) }, props),
  });

  return element;
};

BreadcrumbLink.displayName = "BreadcrumbLink";

export { BreadcrumbLink };
