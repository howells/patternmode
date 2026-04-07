"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import { useContext } from "react";

type InputOTPProps = React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
};

/**
 * One-time password input component for verification codes.
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState("");
 *
 * <InputOTP maxLength={6} value={value} onChange={setValue}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 */
function InputOTP({ className, containerClassName, ...props }: InputOTPProps) {
  return (
    <OTPInput
      className={cn("disabled:cursor-not-allowed", className)}
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      data-slot="input-otp"
      {...props}
    />
  );
}

/**
 * InputOTPGroup UI component.
 * Import from "@patternmode/ui/compositions/input-otp".
 */
function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      data-slot="input-otp-group"
      {...props}
    />
  );
}

type InputOTPSlotProps = React.ComponentProps<"div"> & {
  index: number;
};

/**
 * InputOTPSlot UI component.
 * Import from "@patternmode/ui/compositions/input-otp".
 */
function InputOTPSlot({ index, className, ...props }: InputOTPSlotProps) {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border border-border bg-input text-base shadow-xs outline-none transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        "aria-invalid:border-destructive",
        "data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-2 data-[active=true]:ring-ring/20",
        "data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20",
        className,
      )}
      data-active={isActive}
      data-slot="input-otp-slot"
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-pulse bg-foreground" />
        </div>
      )}
    </div>
  );
}

/**
 * InputOTPSeparator UI component.
 * Import from "@patternmode/ui/compositions/input-otp".
 */
function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div aria-hidden="true" data-slot="input-otp-separator" {...props}>
      <MinusIcon className="size-4 text-muted-foreground" />
    </div>
  );
}

export type { InputOTPProps, InputOTPSlotProps };
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
