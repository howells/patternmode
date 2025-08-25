import type { Radio as BaseRadio } from "@base-ui-components/react/radio";
import type { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import type { Size } from "@patternmode/config/sizes";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { radioGroupVariants, radioVariants } from "./variants";

export type RadioProps = React.ComponentPropsWithoutRef<typeof BaseRadio.Root>;

export type RadioGroupProps = { orientation?: VariantProps<typeof radioGroupVariants>["orientation"]; size?: VariantProps<typeof radioGroupVariants>["size"]; } & React.ComponentPropsWithoutRef<typeof BaseRadioGroup> & { ref?: React.RefObject<React.ElementRef<typeof BaseRadioGroup> | null> };

export type RadioIndicatorProps = { size?: Size; variant?: VariantProps<typeof radioVariants>["variant"]; } & React.ComponentPropsWithoutRef<typeof BaseRadio.Indicator> & { ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Indicator> | null> };

export type RadioItemProps = { size?: Size; variant?: VariantProps<typeof radioVariants>["variant"]; } & React.ComponentPropsWithoutRef<typeof BaseRadio.Root> & { ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null> };

export type RadioLabelProps = { size?: Size; } & React.ComponentPropsWithoutRef<"label"> & { ref?: React.RefObject<HTMLLabelElement | null> };

export type RadioCardProps = { size?: Size; children?: React.ReactNode; indicator?: React.ReactNode; showIndicator?: boolean; } & React.ComponentPropsWithoutRef<typeof BaseRadio.Root> & { ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null> };

export type RadioOptionProps = { value: string; label: React.ReactNode; description?: React.ReactNode; disabled?: boolean; size?: Size; } & { ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null> };

export type RadioCardOptionProps = { value: string; title: React.ReactNode; description?: React.ReactNode; disabled?: boolean; size?: Size; showIndicator?: boolean; } & { ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null> };

