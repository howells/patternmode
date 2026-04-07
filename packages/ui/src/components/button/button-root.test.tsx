import type { SVGProps } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Button } from "./button-root";

function StartIcon(props: SVGProps<SVGSVGElement>) {
  return <svg data-testid="start-icon" {...props} />;
}

function EndIcon(props: SVGProps<SVGSVGElement>) {
  return <svg data-testid="end-icon" {...props} />;
}

describe("Button", () => {
  it("renders the loading label instead of children while loading", () => {
    const markup = renderToStaticMarkup(
      <Button loading loadingLabel="Saving…">
        Save
      </Button>,
    );

    expect(markup).toContain("Saving…");
    expect(markup).not.toContain(">Save<");
    expect(markup).toContain('data-component="spinner"');
  });

  it("renders only the leading icon for icon-only buttons", () => {
    const markup = renderToStaticMarkup(
      <Button icon={StartIcon} size="icon-base" suffixIcon={EndIcon} />,
    );

    expect(markup).toContain('data-testid="start-icon"');
    expect(markup).not.toContain('data-testid="end-icon"');
  });

  it("passes undecorated asChild content through directly", () => {
    const markup = renderToStaticMarkup(
      <Button asChild>
        <a href="/patternmodels">PatternModels</a>
      </Button>,
    );

    expect(markup).toContain('<a href="/patternmodels"');
    expect(markup).toContain(">PatternModels</a>");
    expect(markup).not.toContain('data-testid="start-icon"');
  });

  it("composes decorations into asChild content when icons are present", () => {
    const markup = renderToStaticMarkup(
      <Button asChild icon={StartIcon} suffixIcon={EndIcon}>
        <a href="/patternmodels">PatternModels</a>
      </Button>,
    );

    expect(markup).toContain('<a href="/patternmodels"');
    expect(markup).toContain('data-testid="start-icon"');
    expect(markup).toContain('data-testid="end-icon"');
    expect(markup).toContain(">PatternModels<");
  });
});
