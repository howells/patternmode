import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@patternmode/description-list";
import { Icon } from "@patternmode/icon";
import { Tooltip } from "@patternmode/tooltip";
import { cx } from "@patternmode/utils/cx";
import { HelpCircle } from "lucide-react";
import type React from "react";
import type { PreviewProps } from "@/types/preview-props";

type PropFieldProps = {
  prop: PreviewProps;
  children: React.ReactNode;
  className?: string;
};

export function PropField({ prop, children, className }: PropFieldProps) {
  return (
    <DescriptionList size="xs" truncateTerms>
      <DescriptionTerm className="flex items-center space-x-1 self-center text-xs">
        <span className="truncate">{prop.name}</span>
        {prop.description && (
          <Tooltip
            content={prop.description}
            render={<span className="inline-flex" />}
          >
            <Icon icon={HelpCircle} size="xs" />
          </Tooltip>
        )}
      </DescriptionTerm>
      <DescriptionDetails className={cx("self-center", className)}>
        {children}
      </DescriptionDetails>
    </DescriptionList>
  );
}
