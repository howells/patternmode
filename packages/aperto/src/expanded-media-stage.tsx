import {
	AnimatePresence,
	m,
	type TargetAndTransition,
	type Transition,
} from "motion/react";
import { useApertoContext } from "./context";
import { ApertoExpandedMedia } from "./media-rendering";
import { getMediaKey } from "./media-utils";
import type {
	ApertoMediaItem,
	NavigationMotionPresetName,
	RenderImage,
	RenderVideo,
} from "./types";

export type NavigationDirection = -1 | 0 | 1;

interface NavigationMotionPreset {
	offset: number;
	scale: number;
	transition: Transition;
}

interface NavigationAnimationCustom {
	direction: NavigationDirection;
	offset: number;
	scale: number;
}

const NAVIGATION_MOTION_PRESETS: Record<
	NavigationMotionPresetName,
	NavigationMotionPreset
> = {
	float: {
		offset: 96,
		scale: 0.97,
		transition: {
			opacity: { duration: 0.34, ease: [0.45, 0, 0.2, 1] },
			scale: { damping: 26, mass: 1.15, stiffness: 80, type: "spring" },
			x: { damping: 26, mass: 1.15, stiffness: 80, type: "spring" },
		},
	},
	glide: {
		offset: 58,
		scale: 0.984,
		transition: {
			opacity: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
			scale: { damping: 28, mass: 0.95, stiffness: 150, type: "spring" },
			x: { damping: 28, mass: 0.95, stiffness: 150, type: "spring" },
		},
	},
	snap: {
		offset: 38,
		scale: 0.996,
		transition: {
			opacity: { duration: 0.12, ease: [0.2, 0, 0, 1] },
			scale: { damping: 34, mass: 0.7, stiffness: 420, type: "spring" },
			x: { damping: 34, mass: 0.7, stiffness: 420, type: "spring" },
		},
	},
};

const REDUCED_EXPANDED_MEDIA_TRANSITION: Transition = {
	duration: 0.12,
	ease: "linear",
};

const expandedMediaVariants = {
	center: {
		opacity: 1,
		scale: 1,
		x: 0,
	},
	enter: ({
		direction,
		offset,
		scale,
	}: NavigationAnimationCustom): TargetAndTransition => ({
		opacity: 0,
		scale: direction === 0 ? 1 : scale,
		x: direction * offset,
	}),
	exit: ({
		direction,
		offset,
		scale,
	}: NavigationAnimationCustom): TargetAndTransition => ({
		opacity: 0,
		scale: direction === 0 ? 1 : scale,
		x: direction * -offset,
	}),
};

const reducedExpandedMediaVariants = {
	center: {
		opacity: 1,
		x: 0,
	},
	enter: {
		opacity: 0,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: 0,
	},
};

export function ApertoExpandedMediaStage({
	direction,
	index,
	item,
	navigationMotion,
	renderImage,
	renderVideo,
}: {
	direction: NavigationDirection;
	index: number;
	item: ApertoMediaItem;
	navigationMotion: NavigationMotionPresetName;
	renderImage?: RenderImage;
	renderVideo?: RenderVideo;
}) {
	const ctx = useApertoContext();
	const preset = NAVIGATION_MOTION_PRESETS[navigationMotion];
	const transition = ctx.reduceMotion
		? REDUCED_EXPANDED_MEDIA_TRANSITION
		: preset.transition;
	const variants = ctx.reduceMotion
		? reducedExpandedMediaVariants
		: expandedMediaVariants;
	const animationCustom: NavigationAnimationCustom = {
		direction,
		offset: preset.offset,
		scale: preset.scale,
	};

	return (
		<AnimatePresence custom={animationCustom} initial={false} mode="sync">
			<m.div
				animate="center"
				custom={animationCustom}
				data-navigation-direction={direction}
				data-navigation-motion={navigationMotion}
				data-slot="aperto-media-stage"
				exit="exit"
				initial="enter"
				key={getMediaKey(item, index)}
				transition={transition}
				variants={variants}
			>
				<ApertoExpandedMedia
					item={item}
					renderImage={renderImage}
					renderVideo={renderVideo}
				/>
			</m.div>
		</AnimatePresence>
	);
}
