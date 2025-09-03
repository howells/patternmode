import { Button } from "./component";

export const TestButton = () => <Button variant="primary">Test Button</Button>;

export const ClickableButton = () => (
  <Button
    onClick={() => {
      /* handle click */
    }}
    variant="primary"
  >
    Click Me
  </Button>
);
