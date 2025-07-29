import { cx } from "../../lib/utils";
import Link from "next/link";
import { tv, type VariantProps } from "tailwind-variants";

const textVariants = tv({
  base: "m-0 text-current leading-relaxed",
  variants: {
    size: {
      "2xs": "text-2xs",
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface TextProps
  extends React.ComponentPropsWithoutRef<"p">,
    VariantProps<typeof textVariants> {}

export function Text({ className, size, ...props }: TextProps) {
  return (
    <p
      data-slot="text"
      {...props}
      className={cx(textVariants({ size }), className)}
    />
  );
}

export function TextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={cx(
        className,
        "text-current underline decoration-current/50 data-hover:decoration-current"
      )}
    />
  );
}

export function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong {...props} className={cx(className, "font-medium text-current")} />
  );
}

export function Code({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={cx(
        className,
        "rounded-sm border border-current/10 bg-current/5 px-0.5 text-sm font-medium text-current sm:text-[0.8125rem]"
      )}
    />
  );
}
