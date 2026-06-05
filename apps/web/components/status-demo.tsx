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
type StatusDemoVariant = "border" | "fill";
interface StatusDemoState {
  step: ScaleStep;
  variant: StatusDemoVariant;
}
type StatusDemoAction =
  | { step: ScaleStep; type: "set-step" }
  | { type: "set-variant"; variant: StatusDemoVariant };

const initialState: StatusDemoState = {
  step: 50,
  variant: "fill",
};

const statusDemoReducer = (state: StatusDemoState, action: StatusDemoAction): StatusDemoState => {
  switch (action.type) {
    case "set-step": {
      return { ...state, step: action.step };
    }
    case "set-variant": {
      return { ...state, variant: action.variant };
    }
    default: {
      return state;
    }
  }
};

const getColor = (step: ScaleStep) => {
  if (step === "null") {
    return NULL_COLOR;
  }
  return scaleColors[step];
};

const getLabel = (step: ScaleStep) => {
  if (step === "null") {
    return "Null";
  }
  return `${step}%`;
};

const getMarkProps = (step: ScaleStep) => {
  if (step === "null") {
    return { status: "null" as const };
  }
  return { value: step };
};

export const StatusDemo = () => {
  const [{ step, variant }, dispatch] = useReducer(statusDemoReducer, initialState);

  return (
    <div className="status-demo">
      <div className="status-demo-cell status-demo-cell--full status-demo-preview">
        <StatusMark
          color={getColor(step)}
          label={getLabel(step)}
          size="2xl"
          trackColor="#edeae2"
          variant={variant}
          {...getMarkProps(step)}
        />
      </div>

      <div className="status-demo-cell status-demo-cell--full">
        <fieldset className="status-demo-states" aria-label="Status values">
          <button
            aria-pressed={step === "null"}
            className="status-demo-state-item"
            onClick={() => dispatch({ step: "null", type: "set-step" })}
            type="button"
          >
            <StatusMark
              color={NULL_COLOR}
              label="Null"
              size="xl"
              status="null"
              tone={step === "null" ? "accent" : "muted"}
              trackColor="#edeae2"
              variant={variant}
            />
            <span aria-hidden="true" className="status-demo-null-label" />
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
                color={scaleColors[v]}
                label={`${v}%`}
                size="xl"
                tone={step === v ? "accent" : "muted"}
                trackColor="#edeae2"
                variant={variant}
                value={v}
              />
              <span>{v}</span>
            </button>
          ))}
        </fieldset>
      </div>

      <div className="status-demo-cell status-demo-cell--full status-demo-controls">
        <OptionBar
          label="Variant"
          onChange={(nextVariant) => dispatch({ type: "set-variant", variant: nextVariant })}
          options={[
            { label: "fill", value: "fill" as const },
            { label: "border", value: "border" as const },
          ]}
          value={variant}
        />
      </div>
    </div>
  );
};
