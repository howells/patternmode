import type { PreviewProps } from "@patternmode/ui/types/preview-props-type";

import { DescriptionDetails, DescriptionList, DescriptionTerm } from "@patternmode/ui/components/description-list";
import { Icon } from "@patternmode/icon";
import { Tooltip } from "@patternmode/tooltip";
import { cx } from "@patternmode/ui/utils/cx";
import { HelpCircle } from "lucide-react";
import React from "react";

type PropFieldProps = {
  prop: PreviewProps;
  children: React.ReactNode;
  className?: string;
};

export function PropField({ prop, children, className }: PropFieldProps) {
  return (
    <DescriptionList size="xs" truncateTerms>
      <DescriptionTerm className="text-xs flex items-center self-center space-x-1">
        <span className="truncate">{prop.name}</span>
        {prop.description && (
          <Tooltip content={prop.description}>
            <Icon size="xs" icon={HelpCircle} />
          </Tooltip>
        )}
      </DescriptionTerm>
      <DescriptionDetails className={cx("self-center ", className)}>
        {children}
      </DescriptionDetails>
    </DescriptionList>
  );
}
