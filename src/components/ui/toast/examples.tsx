"use client";

import React from "react";
import { useToast } from "./toast";
import { Button } from "../button/button";

export function DefaultExample() {
  const toast = useToast();

  return (
    <Button
      onClick={() => {
        toast.success("Success!", "Your changes have been saved.");
      }}
    >
      Show Toast
    </Button>
  );
}