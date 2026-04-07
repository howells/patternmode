"use client";

import { Button } from "@patternmode/ui/components/button";
import { Flex } from "@patternmode/ui/components/flex";
import { ArrowRight, Mail, Plus } from "lucide-react";

export default function ButtonIconsExample() {
  return (
    <Flex gap="sm" wrap="wrap" align="center">
      <Button icon={Plus}>Add item</Button>
      <Button icon={Mail} variant="secondary">
        Send email
      </Button>
      <Button suffixIcon={ArrowRight} variant="outline">
        Continue
      </Button>
    </Flex>
  );
}
