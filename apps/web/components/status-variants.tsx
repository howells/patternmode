import { StatusMark } from "@patternmode/status";

import { VariantCell, VariantsBlock } from "./variant-cells";
import "./status-demo.css";

const TRACK = "var(--border)";

export const StatusVariants = () => (
  <VariantsBlock
    id="status-variants-title"
    lead="Values from 0 to 100 snap to the nearest quarter. Colours come from your theme."
  >
    <VariantCell code='variant="fill" | "border"' name="Fill and border">
      <StatusMark size="lg" tone="accent" trackColor={TRACK} value={75} variant="fill" />
      <StatusMark size="lg" tone="accent" trackColor={TRACK} value={75} variant="border" />
    </VariantCell>
    <VariantCell code='tone="accent" | "muted"' name="Accent and muted">
      <StatusMark size="lg" tone="accent" trackColor={TRACK} value={50} />
      <StatusMark size="lg" tone="muted" trackColor={TRACK} value={50} />
    </VariantCell>
    <VariantCell code='status="null" | value={0}' name="Unknown and empty">
      <StatusMark size="lg" status="null" tone="muted" />
      <StatusMark size="lg" tone="accent" trackColor={TRACK} value={0} />
    </VariantCell>
    <VariantCell code='size="2xs" to "3xl"' name="Sizes">
      {(["2xs", "xs", "base", "xl"] as const).map((size) => (
        <StatusMark key={size} size={size} tone="accent" trackColor={TRACK} value={75} />
      ))}
    </VariantCell>
    <VariantCell code="color, trackColor" name="Your own colours">
      <div className="status-ground">
        <StatusMark color="#9b3d32" size="lg" trackColor="#efe2dc" value={25} />
        <StatusMark color="#d9a441" size="lg" trackColor="#f3ead6" value={75} />
      </div>
    </VariantCell>
    <VariantCell code="--patternmode-status-surface" name="On a dark card">
      <div className="status-ground status-ground--dark">
        <StatusMark color="#7fa898" size="lg" trackColor="#3a3935" value={50} />
        <StatusMark color="#a3a199" size="lg" status="null" />
      </div>
    </VariantCell>
  </VariantsBlock>
);
