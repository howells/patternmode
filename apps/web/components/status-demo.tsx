"use client";

import { StatusMark } from "@patternmode/status";
import { useReducer } from "react";

import { OptionBar } from "./option-bar";

const scaleValues = [0, 25, 50, 75, 100] as const;
const scaleColors: Record<(typeof scaleValues)[number], string> = {
  0: "#77756d",
  100: "#27734d",
  25: "#7f6a35",
  50: "#315c4b",
  75: "#2d6659",
};
const NULL_COLOR = "#77756d";

type ScaleStep = (typeof scaleValues)[number] | "null";
type StatusDemoStyle = "border" | "fill";
interface StatusDemoState {
  step: ScaleStep;
  style: StatusDemoStyle;
}
type StatusDemoAction =
  | { step: ScaleStep; type: "set-step" }
  | { style: StatusDemoStyle; type: "set-style" };

const initialState: StatusDemoState = {
  step: 50,
  style: "fill",
};

const statusDemoReducer = (state: StatusDemoState, action: StatusDemoAction): StatusDemoState => {
  switch (action.type) {
    case "set-step": {
      return { ...state, step: action.step };
    }
    case "set-style": {
      return { ...state, style: action.style };
    }
    default: {
      return state;
    }
  }
};

const getColor = (step: ScaleStep) => {
  if (step === "null") {return NULL_COLOR;}
  return scaleColors[step];
};

const getLabel = (step: ScaleStep) => {
  if (step === "null") {return "Null";}
  return `${step}%`;
};

const getMarkProps = (step: ScaleStep) => {
  if (step === "null") {return { status: "null" as const };}
  return { value: step };
};

export const StatusDemo = () => {
  const [{ step, style }, dispatch] = useReducer(statusDemoReducer, initialState);
  const hasFill = style === "fill";
  const hasBorder = style === "border";

  return (
    <div className="status-demo">
      <div className="status-demo-cell status-demo-cell--full status-demo-preview">
        <StatusMark
          border={hasBorder}
          color={getColor(step)}
          fill={hasFill}
          label={getLabel(step)}
          size="2xl"
          trackColor="#edeae2"
          {...getMarkProps(step)}
        />
      </div>

      <div className="status-demo-cell status-demo-cell--full">
        <div className="status-demo-states" role="group" aria-label="Status values">
          <button
            aria-pressed={step === "null"}
            className="status-demo-state-item"
            onClick={() => dispatch({ step: "null", type: "set-step" })}
            type="button"
          >
            <StatusMark
              border={hasBorder}
              color={NULL_COLOR}
              fill={hasFill}
              label="Null"
              size="xl"
              status="null"
              tone={step === "null" ? "accent" : "muted"}
              trackColor="#edeae2"
            />
            <span>—</span>
          </button>
          {scaleValues.map((v) => (
            <button
              aria-pressed={step === v}
              className="status-demo-state-item"
              key={v}
              onClick={() => dispatch({ step: v, type: "set-step" })}
              type="button"
            >
              <StatusMark
                border={hasBorder}
                color={scaleColors[v]}
                fill={hasFill}
                label={`${v}%`}
                size="xl"
                tone={step === v ? "accent" : "muted"}
                trackColor="#edeae2"
                value={v}
              />
              <span>{v}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="status-demo-cell status-demo-cell--full status-demo-controls">
        <OptionBar
          label="Style"
          onChange={(nextStyle) => dispatch({ style: nextStyle, type: "set-style" })}
          options={[
            { label: "fill", value: "fill" as const },
            { label: "border", value: "border" as const },
          ]}
          value={style}
        />
      </div>
    </div>
  );
};
