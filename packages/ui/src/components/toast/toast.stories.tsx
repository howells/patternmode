import * as React from "react";
import { useToast } from "./component";

export const TestToast = () => {
  const { toast } = useToast();

  return (
    <button type="button" onClick={() => toast({ title: "Test Toast", description: "This is a test toast message" })}>
      Show Toast
    </button>
  );
};
