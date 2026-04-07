import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";
import { GalleryImage } from "./gallery-image";
import { ImageSkeleton } from "./image-skeleton";
import { LoadingImage } from "./loading-image";

/**
 * Gallery image components with loading states and crossfade transitions.
 * Framework-agnostic: accepts any image element as children.
 */
const galleryMeta: Meta<typeof GalleryImage> = {
  title: "Gallery",
  component: GalleryImage,
  parameters: {
    builder: {
      category: "display",
      icon: "image",
    },
    docs: {
      description: {
        component:
          "Gallery image components with loading states and crossfade transitions. Framework-agnostic \u2014 works with next/image, native img, or any image component.",
      },
    },
  },
};

export default galleryMeta;
type GalleryStory = StoryObj<typeof galleryMeta>;

/**
 * Base gallery image with loading skeleton and crossfade.
 */
export const Base: GalleryStory = {
  decorators: [
    (Story) => (
      <div className="relative aspect-video w-64 overflow-hidden rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <LoadingImage>
      <img
        alt="Sample content"
        className="absolute inset-0 size-full object-cover"
        height={225}
        src="https://picsum.photos/seed/base/400/225"
        width={400}
      />
    </LoadingImage>
  ),
};

/**
 * Skeleton loading placeholder.
 */
export const Skeleton: GalleryStory = {
  render: () => (
    <div className="relative aspect-video w-64 overflow-hidden rounded-lg">
      <ImageSkeleton />
    </div>
  ),
};

/**
 * LoadingImage with skeleton while loading.
 */
export const LoadingImageStory: GalleryStory = {
  name: "LoadingImage",
  parameters: {
    docs: {
      description: {
        story:
          "Shows skeleton shimmer while image loads, then fades in. Accepts any image element as children.",
      },
    },
  },
  render: () => (
    <div className="relative aspect-video w-64 overflow-hidden rounded-lg">
      <LoadingImage>
        <img
          alt="Sample content"
          className="absolute inset-0 size-full object-cover"
          height={225}
          src="https://picsum.photos/seed/loading/400/225"
          width={400}
        />
      </LoadingImage>
    </div>
  ),
};

function CrossfadeDemoComponent() {
  const images = [
    "https://picsum.photos/seed/gallery1/400/225",
    "https://picsum.photos/seed/gallery2/400/225",
    "https://picsum.photos/seed/gallery3/400/225",
  ];
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video w-64 overflow-hidden rounded-lg">
        <GalleryImage src={images[index] ?? images[0] ?? ""}>
          {(props) => (
            <img
              {...props}
              alt="Gallery item"
              className={`absolute inset-0 size-full object-cover ${props.className ?? ""}`}
              height={225}
              width={400}
            />
          )}
        </GalleryImage>
      </div>
      <button
        className="w-fit rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-secondary"
        onClick={() => setIndex((i) => (i + 1) % images.length)}
        type="button"
      >
        Change Image ({index + 1}/{images.length})
      </button>
    </div>
  );
}

/**
 * GalleryImage crossfade on src change.
 */
export const CrossfadeDemo: GalleryStory = {
  parameters: {
    docs: {
      description: {
        story:
          "Click to change image and see crossfade transition. Uses render prop pattern for framework-agnostic image rendering.",
      },
    },
  },
  render: () => <CrossfadeDemoComponent />,
};
