"use client";

import { RadioGroupItem } from "./components/radio-group-item";
import { RadioGroupRoot } from "./components/radio-group-root";

export const DefaultExample = () => (
  <RadioGroupRoot defaultValue="1" name="example">
    <RadioGroupItem value="1">Default</RadioGroupItem>
    <RadioGroupItem value="2">Comfortable</RadioGroupItem>
    <RadioGroupItem value="3">Compact</RadioGroupItem>
  </RadioGroupRoot>
);

export const SizeExample = () => (
  <div className="flex items-center gap-2">
    <RadioGroupRoot defaultValue="1">
      <RadioGroupItem size="1" value="1" />
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="2">
      <RadioGroupItem size="2" value="2" />
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="3">
      <RadioGroupItem size="3" value="3" />
    </RadioGroupRoot>
  </div>
);

export const VariantExample = () => (
  <div className="flex gap-2">
    <div className="flex flex-col gap-2">
      <RadioGroupRoot defaultValue="1">
        <RadioGroupItem value="1" variant="surface">
          Surface
        </RadioGroupItem>
        <RadioGroupItem value="2" variant="surface">
          Surface
        </RadioGroupItem>
      </RadioGroupRoot>
    </div>

    <div className="flex flex-col gap-2">
      <RadioGroupRoot defaultValue="3">
        <RadioGroupItem value="3" variant="classic">
          Classic
        </RadioGroupItem>
        <RadioGroupItem value="4" variant="classic">
          Classic
        </RadioGroupItem>
      </RadioGroupRoot>
    </div>

    <div className="flex flex-col gap-2">
      <RadioGroupRoot defaultValue="5">
        <RadioGroupItem value="5" variant="soft">
          Soft
        </RadioGroupItem>
        <RadioGroupItem value="6" variant="soft">
          Soft
        </RadioGroupItem>
      </RadioGroupRoot>
    </div>
  </div>
);

export const ColorExample = () => (
  <div className="flex gap-2">
    <RadioGroupRoot defaultValue="1">
      <RadioGroupItem color="indigo" value="1">
        Indigo
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="2">
      <RadioGroupItem color="cyan" value="2">
        Cyan
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="3">
      <RadioGroupItem color="orange" value="3">
        Orange
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="4">
      <RadioGroupItem color="crimson" value="4">
        Crimson
      </RadioGroupItem>
    </RadioGroupRoot>
  </div>
);

export const HighContrastExample = () => (
  <div className="grid grid-cols-2 gap-2">
    <RadioGroupRoot defaultValue="1">
      <RadioGroupItem color="indigo" value="1">
        Normal
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="2">
      <RadioGroupItem color="indigo" highContrast value="2">
        High Contrast
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="3">
      <RadioGroupItem color="cyan" value="3">
        Normal
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="4">
      <RadioGroupItem color="cyan" highContrast value="4">
        High Contrast
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="5">
      <RadioGroupItem color="orange" value="5">
        Normal
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="6">
      <RadioGroupItem color="orange" highContrast value="6">
        High Contrast
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="7">
      <RadioGroupItem color="crimson" value="7">
        Normal
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="8">
      <RadioGroupItem color="crimson" highContrast value="8">
        High Contrast
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="9">
      <RadioGroupItem color="gray" value="9">
        Normal
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="10">
      <RadioGroupItem color="gray" highContrast value="10">
        High Contrast
      </RadioGroupItem>
    </RadioGroupRoot>
  </div>
);

export const AlignmentExample = () => (
  <div className="flex flex-col gap-3">
    <RadioGroupRoot defaultValue="1">
      <RadioGroupItem size="1" value="1">
        Small Size
      </RadioGroupItem>
      <RadioGroupItem size="1" value="2">
        Another Small
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="3">
      <RadioGroupItem size="2" value="3">
        Medium Size
      </RadioGroupItem>
      <RadioGroupItem size="2" value="4">
        Another Medium
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="5">
      <RadioGroupItem size="3" value="5">
        Large Size
      </RadioGroupItem>
      <RadioGroupItem size="3" value="6">
        Another Large
      </RadioGroupItem>
    </RadioGroupRoot>
  </div>
);

export const DisabledExample = () => (
  <div className="flex flex-col gap-2">
    <RadioGroupRoot defaultValue="2">
      <RadioGroupItem value="1">Off</RadioGroupItem>
      <RadioGroupItem value="2">On</RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot defaultValue="2">
      <RadioGroupItem disabled value="1">
        Off
      </RadioGroupItem>
      <RadioGroupItem disabled value="2">
        On
      </RadioGroupItem>
    </RadioGroupRoot>
  </div>
);
