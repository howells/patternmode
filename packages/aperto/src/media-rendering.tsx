import type { ReactNode } from "react";
import type { ApertoMediaItem, RenderImage, RenderVideo } from "./types";

export function getMediaLabel(item: ApertoMediaItem): string {
	return item.title ?? item.alt ?? "media";
}

export function getMediaKey(item: ApertoMediaItem, index: number): string {
	return item.id ?? `${item.type}:${item.src}:${index}`;
}

export function getDescriptionProps(item: ApertoMediaItem): {
	"aria-describedby"?: undefined;
} {
	return item.description ? {} : { "aria-describedby": undefined };
}

function renderDefaultImage(props: Parameters<RenderImage>[0]): ReactNode {
	const { item: _item, variant: _variant, ...imageProps } = props;
	return <img {...imageProps} alt={imageProps.alt ?? ""} />;
}

function renderDefaultVideo(props: Parameters<RenderVideo>[0]): ReactNode {
	const { item: _item, variant, ...videoProps } = props;
	if (variant === "thumbnail") {
		return (
			<img alt={videoProps["aria-label"] ?? ""} src={props.item.thumbnailSrc} />
		);
	}
	return <video {...videoProps} />;
}

export function renderThumbnail(
	item: ApertoMediaItem,
	renderImage?: RenderImage,
	renderVideo?: RenderVideo,
): ReactNode {
	if (item.type === "image") {
		const imageProps: Parameters<RenderImage>[0] = {
			alt: "",
			height: item.height,
			item,
			src: item.thumbnailSrc ?? item.src,
			variant: "thumbnail",
			width: item.width,
		};
		return (renderImage ?? renderDefaultImage)(imageProps);
	}

	const videoProps: Parameters<RenderVideo>[0] = {
		"aria-label": item.alt ?? item.title ?? "Video thumbnail",
		height: item.height,
		item,
		poster: item.poster,
		src: item.thumbnailSrc,
		variant: "thumbnail",
		width: item.width,
	};
	return (renderVideo ?? renderDefaultVideo)(videoProps);
}

export function renderExpandedMedia(
	item: ApertoMediaItem,
	renderImage?: RenderImage,
	renderVideo?: RenderVideo,
): ReactNode {
	if (item.type === "image") {
		const imageProps: Parameters<RenderImage>[0] = {
			alt: item.alt,
			height: item.height,
			item,
			src: item.src,
			variant: "expanded",
			width: item.width,
		};
		return (renderImage ?? renderDefaultImage)(imageProps);
	}

	const videoProps: Parameters<RenderVideo>[0] = {
		"aria-label": item.alt ?? item.title ?? "Video",
		controls: true,
		height: item.height,
		item,
		poster: item.poster,
		src: item.src,
		variant: "expanded",
		width: item.width,
	};
	return (renderVideo ?? renderDefaultVideo)(videoProps);
}

export function renderTransitionMedia(item: ApertoMediaItem): ReactNode {
	if (item.type === "image") {
		return <img alt="" src={item.src} />;
	}

	return <img alt="" src={item.poster ?? item.thumbnailSrc} />;
}
