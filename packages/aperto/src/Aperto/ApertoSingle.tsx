"use client";

import { ApertoClose } from "../aperto-close";
import { ApertoContent } from "../aperto-content";
import { ApertoDescription } from "../aperto-description";
import { ApertoOverlay } from "../aperto-overlay";
import { ApertoPortal } from "../aperto-portal";
import { ApertoRoot } from "../aperto-root";
import { ApertoTitle } from "../aperto-title";
import { ApertoTrigger } from "../aperto-trigger";
import { ApertoExpandedMedia, ApertoThumbnailMedia } from "../media-rendering";
import { getDescriptionProps, getMediaLabel } from "../media-utils";
import type { ApertoProps } from "./ApertoTypes";

export function ApertoSingle({
	classNames,
	dismissible,
	media,
	renderImage,
	renderVideo,
}: ApertoProps) {
	const label = getMediaLabel(media);
	const title = media.title ?? label;

	return (
		<ApertoRoot dismissible={dismissible}>
			<ApertoTrigger
				aria-label={`Open ${label}`}
				className={classNames?.thumbnail}
			>
				<ApertoThumbnailMedia
					item={media}
					renderImage={renderImage}
					renderVideo={renderVideo}
				/>
			</ApertoTrigger>
			<ApertoPortal>
				<ApertoOverlay className={classNames?.overlay} />
				<ApertoContent
					className={classNames?.content}
					{...getDescriptionProps(media)}
				>
					<ApertoExpandedMedia
						item={media}
						renderImage={renderImage}
						renderVideo={renderVideo}
					/>
					<ApertoTitle>{title}</ApertoTitle>
					{media.description ? (
						<ApertoDescription>{media.description}</ApertoDescription>
					) : null}
					<ApertoClose
						aria-label="Close"
						className={classNames?.closeButton}
						type="button"
					/>
				</ApertoContent>
			</ApertoPortal>
		</ApertoRoot>
	);
}
