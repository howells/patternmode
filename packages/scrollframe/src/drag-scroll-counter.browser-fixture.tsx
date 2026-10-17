import { useState } from "react";
import { ScrollFrame } from "./index";

const Rail = ({ onActivate }: { onActivate: () => void }) => (
  <ScrollFrame aria-label="Winners" axes="horizontal" dragScroll style={{ width: "240px" }}>
    <div style={{ display: "flex", gap: "8px", width: "900px" }}>
      {["one", "two", "three", "four", "five", "six"].map((name) => (
        <button
          key={name}
          onClick={onActivate}
          style={{ flex: "0 0 140px", height: "80px" }}
          type="button"
        >
          {name}
        </button>
      ))}
    </div>
  </ScrollFrame>
);

/** A drag-scrollable rail of buttons beside a count of activations; shipped code never imports it. */
export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <output data-slot="activations">{count}</output>
      <Rail
        onActivate={() => {
          setCount((value) => value + 1);
        }}
      />
    </div>
  );
};
