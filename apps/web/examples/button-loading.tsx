"use client";

import { Button } from "@patternmode/ui/components/button";

export default function ButtonLoadingExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Saving</Button>
      <Button loading loadingLabel="Processing...">
        Submit
      </Button>
    </div>
  );
}
