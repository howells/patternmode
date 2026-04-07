"use client";

import { Flex } from "@patternmode/ui/components/flex";
import { Slider } from "@patternmode/ui/components/slider";
import { Text } from "@patternmode/ui/components/text";
import { type ReactNode, useCallback, useState } from "react";

interface ThemeCustomizerProps {
  children: ReactNode;
}

function ThemeCustomizer({ children }: ThemeCustomizerProps) {
  const [hue, setHue] = useState(241);
  const [radius, setRadius] = useState(0.5);

  const handleHueChange = useCallback((value: number[]) => {
    setHue(value[0] ?? 241);
  }, []);

  const handleRadiusChange = useCallback((value: number[]) => {
    setRadius(value[0] ?? 0.5);
  }, []);

  const customProperties: Record<string, string> = {
    "--color-accent": `oklch(0.588 0.158 ${hue})`,
    "--color-ring": `oklch(0.588 0.158 ${hue})`,
    "--color-accent-subtle": `oklch(0.96 0.03 ${hue})`,
    "--radius-md": `${radius}rem`,
    "--radius-lg": `${radius * 1.5}rem`,
    "--radius-xl": `${radius * 2}rem`,
  };

  return (
    <div>
      <div className="border-y border-border/60 bg-surface-subtle/50">
        <div className="mx-auto w-full max-w-2xl px-6 py-6">
          <Text
            variant="muted"
            weight="medium"
            size="sm"
            className="mb-5 uppercase tracking-widest text-[0.7rem]"
          >
            Customize
          </Text>

          <Flex direction="row" gap="2xl" align="flex-end">
            <div className="flex-1">
              <Flex
                align="center"
                justify="space-between"
                className="mb-1"
                gap="sm"
              >
                <Text variant="muted" size="sm">
                  Accent Hue
                </Text>
                <Text
                  variant="muted"
                  size="sm"
                  className="font-mono tabular-nums text-[0.8rem]"
                >
                  {hue}
                </Text>
              </Flex>
              <Slider
                defaultValue={[241]}
                max={360}
                min={0}
                onValueChange={handleHueChange}
                step={1}
                value={[hue]}
              />
            </div>

            <div className="flex-1">
              <Flex
                align="center"
                justify="space-between"
                className="mb-1"
                gap="sm"
              >
                <Text variant="muted" size="sm">
                  Border Radius
                </Text>
                <Text
                  variant="muted"
                  size="sm"
                  className="font-mono tabular-nums text-[0.8rem]"
                >
                  {radius.toFixed(2)}rem
                </Text>
              </Flex>
              <Slider
                defaultValue={[0.5]}
                max={1.25}
                min={0.25}
                onValueChange={handleRadiusChange}
                step={0.05}
                value={[radius]}
              />
            </div>
          </Flex>
        </div>
      </div>

      <div style={customProperties as React.CSSProperties}>{children}</div>
    </div>
  );
}

export { ThemeCustomizer };
