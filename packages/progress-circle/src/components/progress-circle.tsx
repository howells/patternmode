import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { ProgressCircleProps } from "../types";
import { progressCircleVariants } from "../variants";

const ProgressCircle = ({
  className,
  size = "md",
  strokeWidth = 8,
  value = 0,
  max = 100,
  radius,
  children,
  label,
  showValue = true,
  valueFormatter = (v: number | null, m: number) =>
    v == null ? "" : `${Math.round((v / m) * 100)}%`,
  ...props
}: ProgressCircleProps) => {
  const {
    root,
    svg,
    track,
    indicator,
    content,
    label: labelClass,
    value: valueClass,
  } = progressCircleVariants({ size });
  const R = radius ? radius : 20; // base viewBox uses 40x40
  const r = R - strokeWidth / 2;
  const circumference = 2 * Math.PI * r;
  const numeric = typeof value === "number" ? value : null;
  const clamped = numeric == null ? 0 : Math.max(0, Math.min(max, numeric));
  const pct = max > 0 ? clamped / max : 0;
  const dash = pct * circumference;
  const sizeStyle = radius ? { width: R * 2, height: R * 2 } : undefined;

  return (
    <div
      aria-label={props["aria-label"] ?? label ?? "Progress circle"}
      className={cx(root(), className)}
      data-testid="progress-circle"
      role="img"
      style={sizeStyle}
      {...props}
    >
      <svg className={svg()} viewBox={`0 0 ${R * 2} ${R * 2}`}>
        <circle
          className={track()}
          cx={R}
          cy={R}
          r={r}
          strokeWidth={strokeWidth}
        />
        <circle
          className={indicator()}
          cx={R}
          cy={R}
          r={r}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeDashoffset={0}
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className={content()}>
        {children ? (
          children
        ) : (
          <div className="flex flex-col items-center">
            {showValue ? (
              <span className={valueClass()}>
                {valueFormatter(numeric, max)}
              </span>
            ) : null}
            {label ? <span className={labelClass()}>{label}</span> : null}
          </div>
        )}
      </div>
    </div>
  );
};

ProgressCircle.displayName = "ProgressCircle";

export { ProgressCircle };
