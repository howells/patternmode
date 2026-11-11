// @vitest-environment jsdom

import { act, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { usePrefersReducedMotion } from "./react";

type ChangeListener = () => void;

const installMatchMedia = (initial: boolean) => {
  let matches = initial;
  const listeners = new Set<ChangeListener>();
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      addEventListener: (_type: "change", listener: ChangeListener) => listeners.add(listener),
      get matches() {
        return matches;
      },
      media: query,
      removeEventListener: (_type: "change", listener: ChangeListener) =>
        listeners.delete(listener),
    })),
  );
  return {
    listeners,
    set: (next: boolean) => {
      matches = next;
      for (const listener of listeners) {
        listener();
      }
    },
  };
};

const ServerProbe = () => String(usePrefersReducedMotion());

describe(usePrefersReducedMotion, () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("follows the preference live while mounted", () => {
    const media = installMatchMedia(false);
    const { result, unmount } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      media.set(true);
    });
    expect(result.current).toBe(true);

    act(() => {
      media.set(false);
    });
    expect(result.current).toBe(false);

    unmount();
    expect(media.listeners.size).toBe(0);
  });

  it("reads true at mount when reduced motion is already on", () => {
    installMatchMedia(true);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it("is false where matchMedia is missing, as in jsdom", () => {
    expect(window.matchMedia).toBeUndefined();
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it("renders false on the server", () => {
    installMatchMedia(true);
    expect(renderToString(createElement(ServerProbe))).toBe("false");
  });
});
