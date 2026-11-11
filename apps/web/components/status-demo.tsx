"use client";

import { StatusMark } from "@patternmode/status";
import { useState } from "react";

import "./status-demo.css";

const TRACK = "var(--border)";

type Step = 0 | 25 | 50 | 75 | 100 | "null";

const STEPS: Step[] = ["null", 0, 25, 50, 75, 100];

const markProps = (step: Step) =>
  step === "null"
    ? ({ status: "null", tone: "muted" } as const)
    : ({ tone: "accent", value: step } as const);

const stepLabel = (step: Step) => (step === "null" ? "Not measured" : String(step));

export const StatusDemo = () => {
  const [step, setStep] = useState<Step>(50);

  return (
    <div className="status-demo">
      <fieldset aria-label="Status values" className="status-demo-steps">
        {STEPS.map((value) => (
          <button
            aria-pressed={step === value}
            className="status-demo-step"
            key={value}
            onClick={() => {
              setStep(value);
            }}
            type="button"
          >
            <StatusMark
              label={stepLabel(value)}
              size="2xl"
              trackColor={TRACK}
              {...markProps(value)}
            />
            <span>{stepLabel(value)}</span>
          </button>
        ))}
      </fieldset>

      <ul className="status-demo-list">
        <li>
          <StatusMark size="2xs" tone="accent" trackColor={TRACK} value={100} />
          Colour audit
        </li>
        <li>
          <StatusMark size="2xs" trackColor={TRACK} {...markProps(step)} />
          Type roles
        </li>
        <li>
          <StatusMark size="2xs" status="null" tone="muted" />
          Dark mode review
        </li>
      </ul>
    </div>
  );
};
