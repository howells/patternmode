import { Dot } from "./component";

export const DotExample = () => (
  <div className="flex items-center gap-3">
    <Dot variant="success" />
    <Dot variant="warning" />
    <Dot variant="error" />
  </div>
);
