import * as React from "react";
import { Progress, ProgressIndicator, ProgressTrack } from "./component";

export const TestProgress = () => (
  <Progress value={75}>
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  </Progress>
);
