// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { Aperto, type ApertoMediaItem } from "./index";

afterEach(() => {
  cleanup();
});

describe("Aperto", () => {
  it("opens a single media item from the default thumbnail", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem = {
      type: "image",
      src: "/large.jpg",
      thumbnailSrc: "/thumb.jpg",
      alt: "A mountain at sunrise",
      title: "Morning ridge",
      description: "A warm sunrise over a quiet mountain ridge.",
    };

    render(<Aperto media={media} />);

    await user.click(
      screen.getByRole("button", { name: "Open Morning ridge" }),
    );

    expect(
      screen.getByRole("dialog", { name: "Morning ridge" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: media.alt })).toHaveAttribute(
      "src",
      media.src,
    );
    expect(
      screen.getByText("A warm sunrise over a quiet mountain ridge."),
    ).toBeInTheDocument();
  });

  it("opens the represented media item from a thumbnail inside a group", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        type: "image",
        src: "/first-large.jpg",
        thumbnailSrc: "/first-thumb.jpg",
        alt: "Ceramic vessels on linen",
        title: "Studio table",
      },
      {
        type: "image",
        src: "/second-large.jpg",
        thumbnailSrc: "/second-thumb.jpg",
        alt: "A quiet reading nook",
        title: "Soft afternoon",
      },
    ];

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
      </Aperto.Group>,
    );

    await user.click(
      screen.getByRole("button", { name: "Open Soft afternoon" }),
    );

    expect(
      screen.getByRole("dialog", { name: "Soft afternoon" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "A quiet reading nook" }),
    ).toHaveAttribute("src", "/second-large.jpg");
  });

  it("navigates between media items in an open group", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        type: "image",
        src: "/first-large.jpg",
        alt: "Ceramic vessels on linen",
        title: "Studio table",
      },
      {
        type: "image",
        src: "/second-large.jpg",
        alt: "A quiet reading nook",
        title: "Soft afternoon",
      },
    ];

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));
    await user.click(screen.getByRole("button", { name: "Next media" }));

    expect(
      screen.getByRole("dialog", { name: "Soft afternoon" }),
    ).toBeInTheDocument();
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("renders centered svg icons for group controls", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        type: "image",
        src: "/first-large.jpg",
        alt: "Ceramic vessels on linen",
        title: "Studio table",
      },
      {
        type: "image",
        src: "/second-large.jpg",
        alt: "A quiet reading nook",
        title: "Soft afternoon",
      },
    ];

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));

    expect(
      screen
        .getByRole("button", { name: "Previous media" })
        .querySelector("svg"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next media" }).querySelector("svg"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close" }).querySelector("svg"),
    ).toBeInTheDocument();
  });

  it("tracks navigation direction on the expanded media stage", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        type: "image",
        src: "/first-large.jpg",
        alt: "Ceramic vessels on linen",
        title: "Studio table",
      },
      {
        type: "image",
        src: "/second-large.jpg",
        alt: "A quiet reading nook",
        title: "Soft afternoon",
      },
    ];

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));

    expect(
      screen
        .getByRole("img", { name: "Ceramic vessels on linen" })
        .closest('[data-slot="aperto-media-stage"]'),
    ).toHaveAttribute("data-navigation-direction", "0");

    await user.click(screen.getByRole("button", { name: "Next media" }));

    expect(
      screen
        .getByRole("img", { name: "A quiet reading nook" })
        .closest('[data-slot="aperto-media-stage"]'),
    ).toHaveAttribute("data-navigation-direction", "1");

    await user.click(screen.getByRole("button", { name: "Previous media" }));

    expect(
      screen
        .getByRole("img", { name: "Ceramic vessels on linen" })
        .closest('[data-slot="aperto-media-stage"]'),
    ).toHaveAttribute("data-navigation-direction", "-1");
  });

  it("applies the selected expanded navigation motion preset", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        type: "image",
        src: "/first-large.jpg",
        alt: "Ceramic vessels on linen",
        title: "Studio table",
      },
      {
        type: "image",
        src: "/second-large.jpg",
        alt: "A quiet reading nook",
        title: "Soft afternoon",
      },
    ];

    render(
      <Aperto.Group media={media} navigationMotion="snap">
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));
    await user.click(screen.getByRole("button", { name: "Next media" }));

    expect(
      screen
        .getByRole("img", { name: "A quiet reading nook" })
        .closest('[data-slot="aperto-media-stage"]'),
    ).toHaveAttribute("data-navigation-motion", "snap");
  });

  it("navigates between media items with left and right arrow keys", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        type: "image",
        src: "/first-large.jpg",
        alt: "Ceramic vessels on linen",
        title: "Studio table",
      },
      {
        type: "image",
        src: "/second-large.jpg",
        alt: "A quiet reading nook",
        title: "Soft afternoon",
      },
    ];

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));
    screen.getByRole("button", { name: "Close" }).focus();

    await user.keyboard("{ArrowRight}");

    expect(
      screen.getByRole("dialog", { name: "Soft afternoon" }),
    ).toBeInTheDocument();
    expect(screen.getByText("2 / 2")).toBeInTheDocument();

    await user.keyboard("{ArrowLeft}");

    expect(
      screen.getByRole("dialog", { name: "Studio table" }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  it("keeps group content mounted while switching media", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        type: "image",
        src: "/first-large.jpg",
        alt: "Ceramic vessels on linen",
        title: "Studio table",
      },
      {
        type: "image",
        src: "/second-large.jpg",
        alt: "A quiet reading nook",
        title: "Soft afternoon",
      },
    ];

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));
    const openedContent = document.querySelector(
      '[data-slot="aperto-content"]',
    );

    await user.click(screen.getByRole("button", { name: "Next media" }));

    expect(document.querySelector('[data-slot="aperto-content"]')).toBe(
      openedContent,
    );
    expect(
      screen.getByRole("dialog", { name: "Soft afternoon" }),
    ).toBeInTheDocument();
  });

  it("uses the custom image renderer for thumbnails and expanded media", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem = {
      type: "image",
      src: "/large.jpg",
      thumbnailSrc: "/thumb.jpg",
      alt: "Minimal kitchen shelf",
      title: "Oak and stone",
    };

    const { container } = render(
      <Aperto
        media={media}
        renderImage={({ item: _item, variant, ...props }) => (
          <img
            {...props}
            alt={props.alt ?? ""}
            data-rendered-by="custom-image"
            data-variant={variant}
          />
        )}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Open Oak and stone" }),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-variant="thumbnail"]'),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Open Oak and stone" }),
    );

    expect(
      screen.getByRole("img", { name: "Minimal kitchen shelf" }),
    ).toHaveAttribute("data-rendered-by", "custom-image");
    expect(
      screen.getByRole("img", { name: "Minimal kitchen shelf" }),
    ).toHaveAttribute("data-variant", "expanded");
  });

  it("renders video media with a thumbnail and expanded controls", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem = {
      type: "video",
      src: "/film.mp4",
      thumbnailSrc: "/film-thumb.jpg",
      poster: "/film-poster.jpg",
      alt: "A slow interior pan",
      title: "Quiet room study",
    };

    render(<Aperto media={media} />);

    await user.click(
      screen.getByRole("button", { name: "Open Quiet room study" }),
    );

    expect(screen.getByLabelText("A slow interior pan")).toHaveAttribute(
      "src",
      "/film.mp4",
    );
    expect(screen.getByLabelText("A slow interior pan")).toHaveAttribute(
      "poster",
      "/film-poster.jpg",
    );
  });

  it("supports a controlled active media item", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        type: "image",
        src: "/first-large.jpg",
        alt: "Ceramic vessels on linen",
        title: "Studio table",
      },
      {
        type: "image",
        src: "/second-large.jpg",
        alt: "A quiet reading nook",
        title: "Soft afternoon",
      },
    ];
    const changes: number[] = [];

    render(
      <Aperto.Group
        index={1}
        media={media}
        onIndexChange={(nextIndex) => changes.push(nextIndex)}
      >
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));

    expect(changes).toEqual([0]);
    expect(
      screen.getByRole("dialog", { name: "Soft afternoon" }),
    ).toBeInTheDocument();
  });
});
