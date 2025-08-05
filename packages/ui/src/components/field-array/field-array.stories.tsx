import * as React from "react";
import { FieldArray } from "./component";

export const TestFieldArray = () => (
  <FieldArray
    items={[{ id: "1", name: "Item 1" }]}
    onItemsChange={() => {}}
    schema={[
      { key: "name", type: "input", defaultValue: "", label: "Name" },
    ]}
  >
    Test FieldArray
  </FieldArray>
);
