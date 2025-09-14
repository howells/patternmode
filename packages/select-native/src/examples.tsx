"use client";

import { SelectNative } from "./components/select-native";

export const DefaultExample = () => (
  <SelectNative className="w-[220px]" defaultValue="">
    <option disabled value="">
      Select an option
    </option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="orange">Orange</option>
  </SelectNative>
);

export const WithLabelExample = () => (
  <div className="flex w-[240px] flex-col gap-1">
    <span className="text-sm">Favorite fruit</span>
    <SelectNative defaultValue="">
      <option disabled value="">
        Select a fruit
      </option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </SelectNative>
  </div>
);

export const WithGroupsExample = () => (
  <SelectNative defaultValue="">
    <option disabled value="">
      Select a value
    </option>
    <optgroup label="Fruits">
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
    </optgroup>
    <optgroup label="Vegetables">
      <option value="carrot">Carrot</option>
      <option value="broccoli">Broccoli</option>
    </optgroup>
  </SelectNative>
);

export const ErrorStateExample = () => (
  <SelectNative defaultValue="" hasError>
    <option disabled value="">
      Select a value
    </option>
    <option value="a">A</option>
  </SelectNative>
);

export const DisabledExample = () => (
  <SelectNative defaultValue="" disabled>
    <option disabled value="">
      Disabled
    </option>
  </SelectNative>
);

export const MultipleExample = () => (
  <SelectNative className="h-24" defaultValue={["apple", "banana"]} multiple>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="orange">Orange</option>
  </SelectNative>
);
