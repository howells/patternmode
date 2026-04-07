import type React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

function SvgBase({ children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <SvgBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </SvgBase>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <SvgBase {...props}>
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </SvgBase>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <SvgBase {...props}>
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
      <rect height="10" rx="2" width="14" x="5" y="11" />
    </SvgBase>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <SvgBase {...props}>
      <path d="M20 6L9 17l-5-5" />
    </SvgBase>
  );
}
