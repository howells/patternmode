import { Thumbnail } from "@patternmode/thumbnail";
import Image from "next/image";

/**
 * Small drawings of each component for the contents page, in the colours the
 * demos use. Every preview is decorative: the row's link carries the name.
 */

const Photo = ({ className, src }: { className?: string; src: string }) => (
  <Image alt="" className={className} height={848} sizes="160px" src={src} width={1264} />
);

/**
 * The preview is itself a verge: the middle row draws its controls, the outer
 * two hold the space for theirs and reveal them when the plate is pointed at.
 */
const VergePreview = () => (
  <div className="preview-verge" aria-hidden="true">
    {[0, 1, 2].map((row) => (
      <div className="preview-verge-row" key={row}>
        <span className="preview-verge-dot" />
        <span className="preview-verge-dot" />
      </div>
    ))}
  </div>
);

const BRIOLETTE_FACETS = [
  { fill: "#3f7a62", points: "92,64 78,88.2 112.5,92" },
  { fill: "#5e9178", points: "78,88.2 112.5,92 64,120" },
  { fill: "#b9873a", points: "78,88.2 50,88.2 64,120" },
  { fill: "#d9a441", points: "50,88.2 64,120 15.5,92" },
  { fill: "#c46a4f", points: "50,88.2 36,64 15.5,92" },
  { fill: "#9c3b33", points: "36,64 15.5,92 15.5,36" },
  { fill: "#7e4a5c", points: "36,64 50,39.8 15.5,36" },
  { fill: "#56657f", points: "50,39.8 15.5,36 64,8" },
  { fill: "#4d7b8a", points: "50,39.8 78,39.8 64,8" },
  { fill: "#5f8f86", points: "78,39.8 64,8 112.5,36" },
  { fill: "#315c4b", points: "78,39.8 92,64 112.5,36" },
  { fill: "#24473a", points: "92,64 112.5,36 112.5,92" },
  { fill: "#e8dfcb", points: "92,64 78,88.2 50,88.2 36,64 50,39.8 78,39.8" },
];

const ApertoPreview = () => (
  <div className="preview-aperto" aria-hidden="true">
    <Photo className="preview-thumb" src="/media/earth-corridor.jpg" />
    <Photo className="preview-thumb" src="/media/light-study.jpg" />
    <Photo className="preview-thumb" src="/media/rammed-light.jpg" />
    <Photo className="preview-thumb" src="/media/slit-window.jpg" />
  </div>
);

const BriolettePreview = () => (
  <div className="preview-briolette" aria-hidden="true">
    <svg viewBox="0 0 128 128">
      {BRIOLETTE_FACETS.map((facet) => (
        <polygon fill={facet.fill} key={facet.points} points={facet.points} />
      ))}
    </svg>
  </div>
);

const ChannelPreview = () => (
  <div className="preview-channel" aria-hidden="true">
    <span className="preview-channel-track">
      <span className="preview-channel-thumb" />
    </span>
    <span className="preview-channel-track">
      <span className="preview-channel-thumb" />
      <span className="preview-channel-thumb" />
    </span>
  </div>
);

const DeckPreview = () => (
  <div className="preview-deck" aria-hidden="true">
    <Photo className="preview-deck-card" src="/media/concrete-room.jpg" />
    <Photo className="preview-deck-card" src="/media/warm-chamber.jpg" />
    <Photo className="preview-deck-card" src="/media/light-study.jpg" />
  </div>
);

const HaloPreview = () => (
  <div className="preview-halo" aria-hidden="true">
    <svg fill="none" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="preview-halo-saturation" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c4553f" />
        </linearGradient>
        <linearGradient id="preview-halo-lightness" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#1d1b16" />
        </linearGradient>
        <linearGradient id="preview-halo-hue" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#c4553f" />
          <stop offset="0.25" stopColor="#d9a441" />
          <stop offset="0.5" stopColor="#5e9178" />
          <stop offset="0.75" stopColor="#4d7b8a" />
          <stop offset="1" stopColor="#7e4a5c" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="54" fill="url(#preview-halo-saturation)" r="34" />
      <circle cx="60" cy="54" fill="url(#preview-halo-lightness)" r="34" />
      <path className="preview-halo-arc" d="M98.6 60.8A39.2 39.2 0 0 1 21.4 60.8" />
      <circle className="preview-halo-thumb" cx="74" cy="40" r="5" />
    </svg>
  </div>
);

const ParquetPreview = () => (
  <div className="preview-parquet" aria-hidden="true">
    <svg viewBox="0 0 128 128">
      <rect fill="#315c4b" height="122" rx="2.5" width="60" x="3" y="3" />
      <rect fill="#d9a441" height="60" rx="2.5" width="58" x="67" y="3" />
      <rect fill="#9c3b33" height="58" rx="2.5" width="28" x="67" y="67" />
      <rect fill="#e8dfcb" height="58" rx="2.5" width="26" x="99" y="67" />
    </svg>
  </div>
);

const ScrollFramePreview = () => (
  <div className="preview-scroll-area" aria-hidden="true">
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
);

const StacksheetPreview = () => (
  <div className="preview-stacksheet" aria-hidden="true">
    <div className="preview-panel" />
    <div className="preview-panel" />
    <div className="preview-panel" />
  </div>
);

const StatusPreview = () => (
  <div className="preview-status-set" aria-hidden="true">
    <span />
    <span />
    <span />
    <span />
  </div>
);

const SwatchPreview = () => (
  <div className="preview-swatch-set" aria-hidden="true">
    <span />
    <span />
    <span />
    <span />
  </div>
);

const TagsPreview = () => (
  <div className="preview-tags" aria-hidden="true">
    <span />
    <span />
    <span />
    <span />
  </div>
);

const ThumbnailPreview = () => (
  <Thumbnail aria-hidden="true" className="preview-thumbnail" radius={6} raised size={null}>
    <Photo src="/media/warm-chamber.jpg" />
  </Thumbnail>
);

export const PlatePreview = ({ name }: { name: string }) => {
  switch (name) {
    case "Aperto": {
      return <ApertoPreview />;
    }
    case "Briolette": {
      return <BriolettePreview />;
    }
    case "Channel": {
      return <ChannelPreview />;
    }
    case "Deck": {
      return <DeckPreview />;
    }
    case "Halo": {
      return <HaloPreview />;
    }
    case "Parquet": {
      return <ParquetPreview />;
    }
    case "ScrollFrame": {
      return <ScrollFramePreview />;
    }
    case "Stacksheet": {
      return <StacksheetPreview />;
    }
    case "Status": {
      return <StatusPreview />;
    }
    case "Swatch": {
      return <SwatchPreview />;
    }
    case "Tags": {
      return <TagsPreview />;
    }
    case "Thumbnail": {
      return <ThumbnailPreview />;
    }
    default: {
      return <VergePreview />;
    }
  }
};
