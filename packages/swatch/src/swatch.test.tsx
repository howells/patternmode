// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type {
  ButtonHTMLAttributes,
  ReactNode,
  PointerEvent as ReactPointerEvent,
  SVGProps,
} from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  DistributionBar,
  DistributionDisplay,
  getDistributionBoundaryPercent,
  getDistributionTotal,
  getSwatchAtmosphereBackground,
  getSwatchColorsBackground,
  moveDistributionBoundary,
  removeDistributionSegment,
  SWATCH_SHAPES,
  SWATCH_SIZES,
  Swatch,
  type SwatchSize,
  updateDistributionSegment,
} from "./index";

interface MockPanInfo {
  offset: {
    x: number;
    y: number;
  };
}

interface MockMotionButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragEnd" | "onDragStart"
> {
  children?: ReactNode;
  drag?: string;
  dragElastic?: number;
  dragMomentum?: boolean;
  dragSnapToOrigin?: boolean;
  onDrag?: (event: PointerEvent, info: MockPanInfo) => void;
  onDragEnd?: (event: PointerEvent, info: MockPanInfo) => void;
  onDragStart?: (event: PointerEvent, info: MockPanInfo) => void;
  transformTemplate?: () => string;
}

vi.mock("motion/react", () => {
  const MockMotionButton = ({
    children,
    drag: _drag,
    dragElastic: _dragElastic,
    dragMomentum: _dragMomentum,
    dragSnapToOrigin: _dragSnapToOrigin,
    onDrag,
    onDragEnd,
    onDragStart,
    transformTemplate: _transformTemplate,
    ...props
  }: MockMotionButtonProps) => {
    const getPanInfo = (event: ReactPointerEvent<HTMLButtonElement>) => ({
      offset: {
        x: Number(event.currentTarget.dataset.offsetX ?? 0),
        y: Number(event.currentTarget.dataset.offsetY ?? 0),
      },
    });

    return (
      <button
        {...props}
        onPointerDown={(event) => {
          props.onPointerDown?.(event);
          onDragStart?.(event.nativeEvent, getPanInfo(event));
        }}
        onPointerMove={(event) => {
          props.onPointerMove?.(event);
          onDrag?.(event.nativeEvent, getPanInfo(event));
        }}
        onPointerUp={(event) => {
          props.onPointerUp?.(event);
          onDragEnd?.(event.nativeEvent, getPanInfo(event));
        }}
      >
        {children}
      </button>
    );
  };
  const LazyMotion = ({ children }: { children: ReactNode }) => <>{children}</>;
  const motionComponents = {
    button: MockMotionButton,
  };

  return {
    domMax: {},
    LazyMotion,
    m: motionComponents,
    motion: motionComponents,
  };
});

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return <svg data-testid="check-icon" {...props} />;
}

afterEach(() => {
  cleanup();
});

describe("Swatch", () => {
  it("renders a solid color swatch with contrast metadata", () => {
    render(<Swatch aria-label="Olive" color="#315c4b" />);

    const swatch = screen.getByLabelText("Olive");
    expect(swatch).toHaveClass("patternmode-swatch");
    expect(swatch).toHaveAttribute("data-slot", "swatch");
    expect(swatch).toHaveAttribute("data-shape", "circle");
    expect(swatch).toHaveAttribute("data-size", "base");
    expect(swatch).toHaveAttribute("data-tone", "dark");
    expect(swatch).toHaveStyle({ "--patternmode-swatch-fill": "#315c4b" });
  });

  it("renders weighted color stops as a single fill", () => {
    render(
      <Swatch
        aria-label="Palette"
        colors={[
          { color: "#315c4b", ratio: 60 },
          { color: "#e1ebe5", ratio: 40 },
        ]}
      />
    );

    expect(screen.getByLabelText("Palette")).toHaveStyle({
      "--patternmode-swatch-fill":
        "linear-gradient(90deg, #315c4b 0% 60%, #e1ebe5 60% 100%)",
    });
  });

  it("clamps invalid weighted palette ratios", () => {
    expect(
      getSwatchColorsBackground([
        { color: "#111111", ratio: -4 },
        { color: "#222222", ratio: 2 },
        { color: "#333333", ratio: Number.NaN },
      ])
    ).toBe(
      "linear-gradient(90deg, #111111 0% 0%, #222222 0% 100%, #333333 100% 100%)"
    );

    expect(
      getSwatchColorsBackground([
        { color: "#111111", ratio: 0 },
        { color: "#222222", ratio: -1 },
      ])
    ).toBe("linear-gradient(90deg, #111111 0% 50%, #222222 50% 100%)");
  });

  it("shows selected and removable affordances", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(
      <Swatch
        aria-label="Selected"
        color="#fbfbf9"
        icon={CheckIcon}
        onRemove={onRemove}
        selected
      />
    );

    const swatch = screen.getByRole("group", { name: "Selected" });
    expect(swatch).toHaveAttribute("data-selected", "true");
    expect(swatch).toHaveAttribute("data-tone", "light");
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove Selected" }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("applies shared object sizing to media children", () => {
    render(
      <Swatch aria-label="Sample" objectFit="contain" objectPosition="top left">
        <img alt="Sample media" src="/sample.jpg" />
      </Swatch>
    );

    const media = screen.getByAltText("Sample media").parentElement;
    expect(media).toHaveStyle({
      height: "100%",
      objectFit: "contain",
      objectPosition: "top left",
      width: "100%",
    });
  });

  it("supports extended swatch sizes through 7xl", () => {
    expect(SWATCH_SIZES).toEqual([
      "2xs",
      "xs",
      "sm",
      "base",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
      "7xl",
    ]);

    render(
      <Swatch aria-label="Huge" color="#315c4b" size={"7xl" as SwatchSize} />
    );

    expect(screen.getByLabelText("Huge")).toHaveStyle({
      "--patternmode-swatch-size": "6rem",
    });
  });

  it("renders a block-shaped swatch that fills its container", () => {
    expect(SWATCH_SHAPES).toContain("block");
    render(<Swatch aria-label="Band" color="#315c4b" shape="block" />);
    expect(screen.getByLabelText("Band")).toHaveAttribute(
      "data-shape",
      "block"
    );
  });

  it("builds a layered radial atmosphere from color stops", () => {
    expect(
      getSwatchAtmosphereBackground(["#315c4b", "#d9a441", "#9b3d32"])
    ).toBe(
      "radial-gradient(ellipse at 30% 42%, #315c4bcc 0%, transparent 58%), " +
        "radial-gradient(ellipse at 72% 58%, #d9a44199 0%, transparent 53%), " +
        "radial-gradient(ellipse at 45% 65%, #9b3d3277 0%, transparent 66%)"
    );
  });

  it("shifts atmosphere pools with density and gravity", () => {
    const background = getSwatchAtmosphereBackground(["#315c4b"], {
      density: 1,
      gravity: 1,
    });
    // density 1 → tight reach (50%); gravity 1 with a -1 pool sign → 42 - 8.
    expect(background).toBe(
      "radial-gradient(ellipse at 30% 34%, #315c4bcc 0%, transparent 50%)"
    );
  });

  it("renders an atmosphere texture as a radial-gradient fill", () => {
    render(
      <Swatch
        aria-label="Atmosphere"
        colors={["#315c4b", "#d9a441", "#9b3d32"]}
        texture="atmosphere"
      />
    );

    const swatch = screen.getByLabelText("Atmosphere");
    const fill = swatch.style.getPropertyValue("--patternmode-swatch-fill");
    expect(fill).toContain("radial-gradient(ellipse at 30% 42%, #315c4bcc");
    expect(swatch).not.toHaveAttribute("density");
    expect(swatch).not.toHaveAttribute("gravity");
  });

  it("omits the scrim for a flat swatch so the fill reads as the exact color", () => {
    const { container } = render(
      <Swatch aria-label="Cell" color="#315c4b" flat shape="block" />
    );
    const swatch = screen.getByLabelText("Cell");
    expect(swatch).toHaveAttribute("data-flat", "true");
    expect(container.querySelector(".patternmode-swatch__scrim")).toBeNull();
  });
});

describe("DistributionBar math", () => {
  it("moves a boundary while preserving the distribution total", () => {
    const segments = [
      { id: "a", color: "#315c4b", value: 48 },
      { id: "b", color: "#d9a441", value: 30 },
      { id: "c", color: "#9b3d32", value: 22 },
    ];

    const next = moveDistributionBoundary(segments, 0, 8, 6);

    expect(next.map((segment) => segment.value)).toEqual([56, 22, 22]);
    expect(getDistributionTotal(next)).toBe(100);
    expect(getDistributionBoundaryPercent(next, 0)).toBe(56);
  });

  it("clamps a moved boundary so adjacent segments keep a minimum value", () => {
    const segments = [
      { id: "a", color: "#315c4b", value: 48 },
      { id: "b", color: "#d9a441", value: 30 },
      { id: "c", color: "#9b3d32", value: 22 },
    ];

    const next = moveDistributionBoundary(segments, 1, 40, 8);

    expect(next.map((segment) => segment.value)).toEqual([48, 44, 8]);
    expect(getDistributionTotal(next)).toBe(100);
  });

  it("removes a segment and redistributes its value across remaining segments", () => {
    const segments = [
      { id: "a", color: "#315c4b", value: 50 },
      { id: "b", color: "#d9a441", value: 30 },
      { id: "c", color: "#9b3d32", value: 20 },
    ];

    const next = removeDistributionSegment(segments, "b");

    expect(next.map((segment) => segment.value)).toEqual([71.4, 28.6]);
    expect(getDistributionTotal(next)).toBe(100);
  });

  it("updates a segment without changing the distribution values", () => {
    const segments = [
      { id: "a", color: "#315c4b", label: "Evergreen", value: 48 },
      { id: "b", color: "#d9a441", label: "Saffron", value: 30 },
    ];

    const next = updateDistributionSegment(segments, "a", {
      color: "#e1ebe5",
      id: "sage",
      label: "Sage",
    });

    expect(next).toEqual([
      { id: "sage", color: "#e1ebe5", label: "Sage", value: 48 },
      { id: "b", color: "#d9a441", label: "Saffron", value: 30 },
    ]);
  });
});

describe("DistributionBar", () => {
  it("renders a non-interactive display without boundary handles", () => {
    render(
      <DistributionDisplay
        aria-label="Assigned finish distribution: 79% assigned, 21% unassigned"
        emptyValue={21}
        legend="summary"
        segments={[
          { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 38 },
          { id: "saffron", color: "#d9a441", label: "Saffron", value: 24 },
          { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 17 },
        ]}
      />
    );

    expect(
      screen.getByLabelText(
        "Assigned finish distribution: 79% assigned, 21% unassigned"
      )
    ).toHaveClass("patternmode-distribution-display");
    expect(screen.getByText("79% assigned")).toBeInTheDocument();
    expect(screen.getByText("21% unassigned")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders selectable segments and emits the chosen segment", async () => {
    const user = userEvent.setup();
    const onSegmentSelect = vi.fn();
    render(
      <DistributionDisplay
        aria-label="Selectable finish distribution"
        legend={false}
        onSegmentSelect={onSegmentSelect}
        segments={[
          { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 60 },
          { id: "saffron", color: "#d9a441", label: "Saffron", value: 40 },
        ]}
        selectedSegmentId="evergreen"
      />
    );

    const evergreen = screen.getByRole("button", { name: "Evergreen 60%" });
    expect(evergreen).toHaveAttribute("aria-pressed", "true");
    expect(evergreen).toHaveAttribute("data-selected", "true");

    const saffron = screen.getByRole("button", { name: "Saffron 40%" });
    expect(saffron).toHaveAttribute("aria-pressed", "false");
    await user.click(saffron);
    expect(onSegmentSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "saffron" })
    );
  });

  it("renders segment percentages for display legends", () => {
    render(
      <DistributionDisplay
        aria-label="Weighted finish display"
        segments={[
          { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 2 },
          { id: "saffron", color: "#d9a441", label: "Saffron", value: 3 },
          { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 5 },
        ]}
      />
    );

    expect(screen.getByText("Evergreen 20%")).toBeInTheDocument();
    expect(screen.getByText("Saffron 30%")).toBeInTheDocument();
    expect(screen.getByText("Oxblood 50%")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders adjustable boundary handles and emits updated values", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <DistributionBar
        aria-label="Finish distribution"
        onChange={onChange}
        segments={[
          { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 48 },
          { id: "saffron", color: "#d9a441", label: "Saffron", value: 30 },
          { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 22 },
        ]}
      />
    );

    expect(
      screen.getByRole("group", { name: "Finish distribution" })
    ).toHaveClass("patternmode-distribution-bar");
    expect(screen.getByText("Evergreen 48%")).toBeInTheDocument();
    expect(screen.getByText("Saffron 30%")).toBeInTheDocument();

    await user.keyboard("{Tab}");
    await user.keyboard("{ArrowRight}");

    expect(onChange).toHaveBeenCalledWith([
      { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 49 },
      { id: "saffron", color: "#d9a441", label: "Saffron", value: 29 },
      { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 22 },
    ]);
  });

  it("emits updated segment values while a boundary handle is dragged", () => {
    const onChange = vi.fn();

    render(
      <DistributionBar
        aria-label="Finish distribution"
        onChange={onChange}
        segments={[
          { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 48 },
          { id: "saffron", color: "#d9a441", label: "Saffron", value: 30 },
          { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 22 },
        ]}
      />
    );

    const group = screen.getByRole("group", { name: "Finish distribution" });
    const track = group.querySelector(".patternmode-distribution-bar__track");
    const handle = screen.getByRole("button", {
      name: "Adjust Evergreen and Saffron distribution",
    });
    if (!track) {
      throw new Error("Distribution bar track was not rendered");
    }
    track.getBoundingClientRect = () =>
      ({
        width: 100,
      }) as DOMRect;
    handle.dataset.offsetX = "10";

    fireEvent.pointerDown(handle);
    fireEvent.pointerMove(handle);

    expect(onChange).toHaveBeenCalledWith([
      { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 58 },
      { id: "saffron", color: "#d9a441", label: "Saffron", value: 20 },
      { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 22 },
    ]);
  });

  it("renders derived percentages in the legend for weighted values", () => {
    render(
      <DistributionBar
        aria-label="Weighted finish distribution"
        segments={[
          { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 2 },
          { id: "saffron", color: "#d9a441", label: "Saffron", value: 3 },
          { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 5 },
        ]}
      />
    );

    expect(screen.getByText("Evergreen 20%")).toBeInTheDocument();
    expect(screen.getByText("Saffron 30%")).toBeInTheDocument();
    expect(screen.getByText("Oxblood 50%")).toBeInTheDocument();
  });
});
