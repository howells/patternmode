import * as React from "react";
import { BarList } from "./component";

export const TestBarList = () => (
  <BarList
    data={[{ key: "key", value: 1, name: "name" }]}
    valueFormatter={value => `$${value.toLocaleString()}`}
    showAnimation
    onValueChange={() => {}}
    sortOrder="descending"
  >
    Test BarList
  </BarList>
);
