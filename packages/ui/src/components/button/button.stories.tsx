import * as React from "react";
import { Button } from "./component";

export const TestButton = () => (
  <Button variant="primary">Test Button</Button>
);

export const ClickableButton = () => (
  <Button variant="primary" onClick={() => { /* handle click */ }}>
    Click Me
  </Button>
);
