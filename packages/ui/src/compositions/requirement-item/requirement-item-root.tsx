import { cn } from "@patternmode/ui/utils/cn";
import { CheckIcon, XIcon } from "lucide-react";
import { Icon } from "../../components/icon";

interface RequirementItemProps {
  /** Optional additional class names */
  className?: string;
  /** The requirement label text */
  label: string;
  /** Whether the requirement has been met */
  met: boolean;
  /** Optional test ID for the component */
  testId?: string;
}

/**
 * Displays a requirement item with a check/x icon indicating met/unmet status.
 * Useful for password requirements, form validation lists, etc.
 *
 * @example
 * ```tsx
 * <RequirementItem label="At least 8 characters" met={password.length >= 8} />
 * <RequirementItem label="One uppercase letter" met={/[A-Z]/.test(password)} />
 * ```
 */
export function RequirementItem({
  label,
  met,
  testId,
  className,
}: RequirementItemProps) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-testid={testId}
    >
      <Icon
        className={met ? "text-green-500" : "text-gray-300"}
        icon={met ? CheckIcon : XIcon}
        size="xs"
      />
      <span className={cn("text-sm", met ? "text-green-600" : "text-gray-500")}>
        {label}
      </span>
    </div>
  );
}
