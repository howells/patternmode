import type { RenderImage } from "@patternmode/aperto";
import Image from "next/image";

const isUrl = (value: string | Blob | undefined): value is string => typeof value === "string";

/** Aperto's image slot filled with next/image, sized for a thumbnail or the expanded panel. */
export const renderApertoImage: RenderImage = ({ alt, item, src, variant }) => (
  <Image
    alt={alt ?? ""}
    fill
    loading={variant === "thumbnail" ? "eager" : "lazy"}
    sizes={variant === "thumbnail" ? "165px" : "90vw"}
    src={isUrl(src) ? src : item.src}
  />
);
