import { useState } from "react";
import { ChannelSlider } from "./index";

interface ControlledChannelSliderProps {
  readonly background: string;
  readonly onCommit: (value: number) => void;
}

/** A controlled slider for browser tests; shipped code never imports it. */
export const ControlledChannelSlider = ({ background, onCommit }: ControlledChannelSliderProps) => {
  const [value, setValue] = useState(10);
  return (
    <div style={{ width: 400 }}>
      <ChannelSlider
        label="Lightness"
        background={background}
        size="xl"
        value={value}
        onValueChange={setValue}
        onValueCommitted={(nextValue) => {
          onCommit(nextValue);
        }}
      />
    </div>
  );
};
