import * as React from "react";
import { Button } from "./component";

export const TestButton = () => (
  <Button variant="default">Test Button</Button>
);

export const ClickableButton = () => (
  <Button variant="default" onClick={() => { /* handle click */ }}>
    Click Me
  </Button>
);
