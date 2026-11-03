import Image from "next/image";

/*
 * Drawings of each component for the Home catalogue, taken from the accepted
 * Paper tiles. They are pictures, not demos: every one is aria-hidden and the
 * tile's link carries the name. The working component is one click away.
 */

const EVERGREEN = "#315C4B";
const SAFFRON = "#D9A441";
const OXBLOOD = "#9B3D32";
const LINEN = "#E8DCC4";
const MINT = "oklch(90% 0.020 162)";

const Photo = ({ className, sizes, src }: { className?: string; sizes: string; src: string }) => (
  <Image alt="" className={className} height={848} sizes={sizes} src={src} width={1264} />
);

const Chevron = ({
  direction,
  stroke,
}: {
  direction: "down" | "left" | "right";
  stroke: string;
}) => {
  const d = { down: "M3 6l5 5 5-5", left: "M10 3L5 8l5 5", right: "M6 3l5 5-5 5" }[direction];
  return (
    <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 16 16" width="12">
      <path d={d} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
};

const Cross = ({ size = 14, stroke }: { size?: number; stroke: string }) => (
  <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 16 16" width={size}>
    <path d="M4 4l8 8M12 4l-8 8" stroke={stroke} strokeLinecap="round" strokeWidth="1.5" />
  </svg>
);

const StacksheetPreview = () => (
  <div className="preview-stage relative overflow-hidden">
    <div className="absolute top-8 left-8 flex w-105 max-w-[45%] flex-col gap-2.5">
      <span className="h-2.5 w-30 rounded-fixture-bar bg-fixture-line-strong" />
      <span className="h-2 w-70 max-w-full rounded-fixture-bar bg-fixture-line" />
      <span className="h-2 w-60 max-w-full rounded-fixture-bar bg-fixture-line" />
    </div>
    <span className="absolute inset-0 bg-fixture-scrim" />
    <span className="absolute top-11 right-24 size-75 rounded-xl border border-border bg-card opacity-70" />
    <span className="absolute top-8 right-15 size-75 rounded-xl border border-border bg-card shadow-fixture-sheet" />
    <div className="absolute top-5 right-6 flex size-75 flex-col rounded-xl border border-border bg-card shadow-fixture-sheet-top">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-border pr-3 pl-2">
        <span className="flex items-center gap-1.5 type-ui">
          <Chevron direction="left" stroke="var(--foreground)" />
          Sample order
        </span>
        <Cross stroke="var(--muted-foreground)" />
      </div>
      <div className="flex flex-col gap-3.5 p-4">
        <span className="text-4xl leading-9 tracking-fixture-figure">18.90</span>
        <span className="flex flex-col">
          <span className="flex h-8 items-center justify-between border-b border-border type-ui">
            <span className="text-muted-foreground">Swatches</span>6
          </span>
          <span className="flex h-8 items-center justify-between border-b border-border type-ui">
            <span className="text-muted-foreground">Shipped</span>28 Oct
          </span>
        </span>
      </div>
    </div>
  </div>
);

const ring = "shadow-fixture-ring";

const SwatchPreview = () => (
  <div className="preview-stage flex flex-col items-center justify-center gap-7">
    <div className="flex items-center gap-3.5">
      <span className={`size-10 rounded-full ${ring}`} style={{ background: EVERGREEN }} />
      <span
        className="size-10 rounded-full"
        style={{
          background: SAFFRON,
          boxShadow:
            "inset 0 0 0 1px #00000014, 0 0 0 2px var(--muted), 0 0 0 3.5px var(--foreground)",
        }}
      />
      <span
        className={`size-10 rounded-full ${ring}`}
        style={{ background: `linear-gradient(in oklab 135deg, ${LINEN}, ${OXBLOOD})` }}
      />
      <span
        className="relative size-10 overflow-hidden rounded-full"
        style={{
          background:
            "repeating-conic-gradient(rgb(229 226 218) 0% 25%, #fff 0% 50%) 0 0 / 10px 10px",
        }}
      >
        <span className="absolute inset-0 bg-fixture-evergreen-wash" />
      </span>
      <span className={`relative size-10 rounded-full bg-fixture-sage-muted opacity-45 ${ring}`}>
        <svg className="absolute inset-0" height="40" viewBox="0 0 40 40" width="40">
          <path d="M10 30L30 10" stroke="#23231F" strokeLinecap="round" strokeWidth="1.5" />
        </svg>
      </span>
    </div>
    <span className={`flex h-10 w-42 overflow-hidden rounded-full ${ring}`}>
      <span className="h-full w-[60%]" style={{ background: EVERGREEN }} />
      <span className="h-full w-[40%] bg-fixture-sage" />
    </span>
  </div>
);

const SCROLL_ROWS: [string, string][] = [
  ["Pushed sheet", "09:41"],
  ["Palette saved", "09:38"],
  ["Tag added", "09:12"],
  ["Image opened", "08:57"],
  ["Deck finished", "08:40"],
];

const ScrollFramePreview = () => (
  <div className="preview-stage flex items-center justify-center">
    <div className="relative flex h-42.5 w-58 flex-col overflow-hidden rounded-lg border border-border bg-card px-3.5">
      {SCROLL_ROWS.map(([label, time], index) => (
        <span
          className={`flex h-9 shrink-0 items-center justify-between type-ui ${index < SCROLL_ROWS.length - 1 ? "border-b border-border" : ""}`}
          key={label}
        >
          {label}
          <span className="type-meta text-muted-foreground">{time}</span>
        </span>
      ))}
      <span className="absolute bottom-0 left-0 h-18 w-full bg-linear-to-b from-fixture-clear to-card" />
      <span className="absolute bottom-2.5 left-1/2 flex size-7.5 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card shadow-fixture-control">
        <Chevron direction="down" stroke="var(--foreground)" />
      </span>
    </div>
  </div>
);

const ThumbnailPreview = () => (
  <div className="preview-stage flex flex-col items-center justify-center gap-5">
    <span className="relative h-34.25 w-51 overflow-hidden rounded-lg shadow-fixture-photo">
      <Photo className="size-full object-cover" sizes="204px" src="/media/light-study.jpg" />
      <span className="absolute inset-0 rounded-lg shadow-fixture-edge" />
    </span>
    <span className="flex gap-2">
      {["/media/earth-corridor.jpg", "/media/warm-chamber.jpg", "/media/rammed-light.jpg"].map(
        (src) => (
          <span className="relative size-8 overflow-hidden rounded-md" key={src}>
            <Photo className="size-full object-cover" sizes="32px" src={src} />
            <span className="absolute inset-0 rounded-md shadow-fixture-edge" />
          </span>
        ),
      )}
    </span>
  </div>
);

const VERGE_ROWS = [
  { color: EVERGREEN, name: "Evergreen" },
  { active: true, color: SAFFRON, name: "Saffron" },
  { color: OXBLOOD, name: "Oxblood" },
];

const VergePreview = () => (
  <div className="preview-stage flex items-center justify-center">
    <div className="flex w-62 flex-col rounded-lg border border-border bg-card p-1">
      {VERGE_ROWS.map((row) => (
        <span
          className={`flex h-10 items-center gap-2.5 rounded-md pr-1 pl-2.5 type-ui ${row.active === true ? "bg-muted" : ""}`}
          key={row.name}
        >
          <span className="size-4 shrink-0 rounded-full" style={{ background: row.color }} />
          <span className="grow">{row.name}</span>
          <span className="flex h-8 w-16 shrink-0 justify-end">
            {row.active === true ? (
              <>
                <span className="flex size-8 items-center justify-center">
                  <svg fill="none" height="14" viewBox="0 0 16 16" width="14">
                    <path
                      d="M11 2.5l2.5 2.5L6 12.5H3.5V10z"
                      stroke="var(--foreground)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                <span className="flex size-8 items-center justify-center">
                  <svg height="14" viewBox="0 0 16 16" width="14">
                    <circle cx="3.5" cy="8" fill="var(--foreground)" r="1.25" />
                    <circle cx="8" cy="8" fill="var(--foreground)" r="1.25" />
                    <circle cx="12.5" cy="8" fill="var(--foreground)" r="1.25" />
                  </svg>
                </span>
              </>
            ) : null}
          </span>
        </span>
      ))}
    </div>
  </div>
);

const NOT_KNOWN = (
  <svg height="28" viewBox="0 0 28 28" width="28">
    <circle
      cx="14"
      cy="14"
      fill="none"
      r="11.5"
      stroke="oklch(56.2% 0.012 95.3)"
      strokeDasharray="2.5 3"
      strokeWidth="1.5"
    />
  </svg>
);

const FILLED_PATHS = [
  "",
  "M14 14L14 2A12 12 0 0 1 26 14Z",
  "M14 2A12 12 0 0 1 14 26Z",
  "M14 14L14 2A12 12 0 1 1 2 14Z",
];
const RING_PATHS = [
  "",
  "M14 3A11 11 0 0 1 25 14",
  "M14 3A11 11 0 0 1 14 25",
  "M14 3A11 11 0 1 1 3 14",
];

const StatusPreview = () => (
  <div className="preview-stage flex flex-col items-center justify-center gap-5">
    <span className="flex gap-4">
      {NOT_KNOWN}
      {FILLED_PATHS.map((d) => (
        <svg height="28" key={d || "empty"} viewBox="0 0 28 28" width="28">
          <circle cx="14" cy="14" fill={MINT} r="12" />
          {d === "" ? null : <path d={d} fill="var(--ring)" />}
        </svg>
      ))}
      <svg height="28" viewBox="0 0 28 28" width="28">
        <circle cx="14" cy="14" fill="var(--ring)" r="12" />
      </svg>
    </span>
    <span className="flex gap-4">
      {NOT_KNOWN}
      {RING_PATHS.map((d) => (
        <svg fill="none" height="28" key={d || "empty"} viewBox="0 0 28 28" width="28">
          <circle cx="14" cy="14" r="11" stroke={MINT} strokeWidth="2" />
          {d === "" ? null : (
            <path d={d} stroke="var(--ring)" strokeLinecap="round" strokeWidth="2" />
          )}
        </svg>
      ))}
      <svg fill="none" height="28" viewBox="0 0 28 28" width="28">
        <circle cx="14" cy="14" r="11" stroke="var(--ring)" strokeWidth="2" />
      </svg>
    </span>
    <span className="flex w-59 justify-between type-meta text-muted-foreground">
      <span>Not known</span>
      <span>Done</span>
    </span>
  </div>
);

const DeckPreview = () => (
  <div className="preview-stage relative overflow-hidden">
    <span className="absolute top-7.5 left-1/2 h-42.5 w-35 -translate-x-1/2 overflow-hidden rounded-fixture-card opacity-55 shadow-fixture-card-back">
      <Photo className="size-full object-cover" sizes="140px" src="/media/slit-window.jpg" />
    </span>
    <span className="absolute top-10.5 left-1/2 h-44 w-40 -translate-x-1/2 overflow-hidden rounded-fixture-card opacity-80 shadow-fixture-photo">
      <Photo className="size-full object-cover" sizes="160px" src="/media/concrete-room.jpg" />
    </span>
    <span className="absolute top-14 left-1/2 size-45 -translate-x-1/2 overflow-hidden rounded-fixture-card shadow-fixture-card-front">
      <Photo className="size-full object-cover" sizes="180px" src="/media/warm-chamber.jpg" />
    </span>
  </div>
);

const ParquetPreview = () => (
  <div className="preview-stage flex items-center justify-center">
    <span className="flex h-44 w-62 gap-0.75 overflow-hidden rounded-lg">
      <span className="flex w-25.75 shrink-0 items-end p-2.5" style={{ background: EVERGREEN }}>
        <span className="type-meta text-fixture-on-dark">Evergreen 42%</span>
      </span>
      <span className="flex grow flex-col gap-0.75">
        <span className="h-21 shrink-0" style={{ background: SAFFRON }} />
        <span className="flex grow gap-0.75">
          <span className="w-21 shrink-0" style={{ background: OXBLOOD }} />
          <span className="grow" style={{ background: LINEN }} />
        </span>
      </span>
    </span>
  </div>
);

const HaloPreview = () => (
  <div className="preview-stage flex flex-col items-center justify-center gap-1.5">
    <span
      className={`relative size-37 overflow-hidden rounded-full ${ring}`}
      style={{
        backgroundImage:
          "linear-gradient(in oklab 0deg, #000 0%, #0000 50%, #fff0 50%, #fff 100%), linear-gradient(in oklab 90deg, #808080 0%, #FF4400 100%)",
      }}
    >
      <span className="absolute top-9.5 left-15.25 size-5.5 rounded-full bg-fixture-halo shadow-fixture-halo-thumb" />
    </span>
    <svg height="30" viewBox="0 0 148 30" width="148">
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="halo-preview-hue"
          x1="0"
          x2="148"
          y1="0"
          y2="0"
        >
          <stop offset="0" stopColor="hsl(0 80% 55%)" />
          <stop offset="0.17" stopColor="hsl(60 80% 55%)" />
          <stop offset="0.33" stopColor="hsl(120 60% 45%)" />
          <stop offset="0.5" stopColor="hsl(180 60% 45%)" />
          <stop offset="0.67" stopColor="hsl(240 60% 60%)" />
          <stop offset="0.83" stopColor="hsl(300 60% 55%)" />
          <stop offset="1" stopColor="hsl(360 80% 55%)" />
        </linearGradient>
      </defs>
      <path
        d="M10 6 Q74 34 138 6"
        fill="none"
        stroke="url(#halo-preview-hue)"
        strokeLinecap="round"
        strokeWidth="8"
      />
      <circle cx="17" cy="9.2" fill="hsl(16 80% 55%)" r="6" stroke="#fff" strokeWidth="2.5" />
    </svg>
    <span className="type-data text-muted-foreground">16 · 48 · 69</span>
  </div>
);

const glassThumb = "absolute top-1 size-6 rounded-full bg-fixture-glass shadow-fixture-glass-thumb";

const ChannelPreview = () => (
  <div className="preview-stage flex flex-col justify-center gap-5.5 px-10">
    <span className="flex flex-col gap-2">
      <span className="flex justify-between type-ui">
        Lightness<span className="type-data text-muted-foreground">62</span>
      </span>
      <span
        className={`relative h-8 rounded-full ${ring}`}
        style={{
          backgroundImage: `linear-gradient(in oklab 90deg, #111110, ${EVERGREEN}, #F4F7F5)`,
        }}
      >
        <span className={glassThumb} style={{ left: "calc(62% - 12px)" }} />
      </span>
    </span>
    <span className="flex flex-col gap-2">
      <span className="flex justify-between type-ui">
        Chroma range<span className="type-data text-muted-foreground">20–70</span>
      </span>
      <span
        className={`relative h-8 rounded-full ${ring}`}
        style={{ backgroundImage: `linear-gradient(in oklab 90deg, #8F8D86, ${SAFFRON})` }}
      >
        <span className={glassThumb} style={{ left: "calc(20% - 4px)" }} />
        <span className={glassThumb} style={{ left: "calc(70% - 20px)" }} />
      </span>
    </span>
  </div>
);

const roundButton =
  "absolute flex size-7 items-center justify-center rounded-full bg-fixture-dark-control";

const ApertoPreview = () => (
  <div className="preview-stage relative flex flex-col items-center justify-center gap-3">
    <span className="h-40.25 w-60 overflow-hidden rounded-md">
      <Photo className="size-full object-cover" sizes="240px" src="/media/slit-window.jpg" />
    </span>
    <span className="flex w-60 justify-between type-meta">
      <span className="text-fixture-dark-text">Slit window</span>
      <span className="text-fixture-dark-muted">3 of 6</span>
    </span>
    <span className={`${roundButton} top-26 left-3.5`}>
      <Chevron direction="left" stroke="#fff" />
    </span>
    <span className={`${roundButton} top-26 right-3.5`}>
      <Chevron direction="right" stroke="#fff" />
    </span>
    <span className={`${roundButton} top-3.5 right-3.5`}>
      <Cross size={12} stroke="#fff" />
    </span>
  </div>
);

/* Facet geometry and colours from the Paper drawing; the outlined facet is the selection. */
const FACETS: [string, string][] = [
  ["31.9,129.9 62.5,139.8 61.5,139.2", "#3F381D"],
  ["99.4,139.2 61.5,139.2 62.5,139.8", "#401E24"],
  ["127.7,114.3 126.7,113.7 99.4,139.2", "#5C2B58"],
  ["142.8,86.6 126.7,113.7 127.7,114.3", "#6E3572"],
  ["5.2,61.4 8.8,99.5 12.6,74.0", "#557E3B"],
  ["31.9,129.9 28.3,114.3 8.8,99.5", "#495829"],
  ["116.1,18.1 118.1,32.8 139.2,48.5", "#A080AA"],
  ["142.8,86.6 139.2,48.5 133.8,73.1", "#955A99"],
  ["5.2,61.4 12.6,74.0 20.3,33.7", "#6D9752"],
  ["51.5,18.1 48.6,8.8 20.3,33.7", "#8DAE82"],
  ["51.5,18.1 85.5,8.2 48.6,8.8", "#97B591"],
  ["31.9,129.9 61.5,139.2 28.3,114.3", "#524D26"],
  ["116.1,18.1 85.5,8.2 118.1,32.8", "#B091B6"],
  ["142.8,86.6 133.8,73.1 126.7,113.7", "#924487"],
  ["94.8,129.0 61.5,139.2 99.4,139.2", "#53272F"],
  ["94.8,129.0 99.4,139.2 126.7,113.7", "#622E49"],
  ["12.6,74.0 8.8,99.5 28.3,114.3", "#617537"],
  ["118.1,32.8 133.8,73.1 139.2,48.5", "#AB75A7"],
  ["20.3,33.7 12.6,74.0 39.8,48.5", "#94A967"],
  ["51.5,18.1 20.3,33.7 39.8,48.5", "#A5B682"],
  ["80.1,32.8 118.1,32.8 85.5,8.2", "#C29AA1"],
  ["51.5,18.1 80.1,32.8 85.5,8.2", "#C2BB9C"],
  ["61.5,139.2 65.2,113.7 28.3,114.3", "#695131"],
  ["94.8,129.0 65.2,113.7 61.5,139.2", "#693A31"],
  ["126.7,113.7 133.8,73.1 105.5,98.0", "#9C4975"],
  ["94.8,129.0 126.7,113.7 105.5,98.0", "#823D56"],
  ["38.3,86.6 12.6,74.0 28.3,114.3", "#8C8E43"],
  ["106.9,59.8 133.8,73.1 118.1,32.8", "#B77F9C"],
  ["51.5,18.1 39.8,48.5 80.1,32.8", "#C2BD92"],
  ["38.3,86.6 39.8,48.5 12.6,74.0", "#A7A95C"],
  ["38.3,86.6 28.3,114.3 65.2,113.7", "#887240"],
  ["106.9,59.8 118.1,32.8 80.1,32.8", "#C3929B"],
  ["94.8,129.0 105.5,98.0 65.2,113.7", "#873F40"],
  ["106.9,59.8 105.5,98.0 133.8,73.1", "#B06881"],
  ["39.8,48.5 72.3,73.1 80.1,32.8", "#C1A785"],
  ["38.3,86.6 72.3,73.1 39.8,48.5", "#B59F6A"],
  ["72.3,73.1 65.2,113.7 105.5,98.0", "#A85E4F"],
  ["106.9,59.8 80.1,32.8 72.3,73.1", "#C39087"],
  ["106.9,59.8 72.3,73.1 105.5,98.0", "#B66B6C"],
];
const SELECTED_FACET = "38.3,86.6 65.2,113.7 72.3,73.1";

const BriolettePreview = () => (
  <div className="preview-stage flex flex-col items-center justify-center gap-4">
    <svg height="148" viewBox="0 0 148 148" width="148">
      {FACETS.map(([points, fill]) => (
        <polygon
          fill={fill}
          key={points}
          points={points}
          stroke="#F4F2EC"
          strokeLinejoin="round"
          strokeWidth="0.8"
        />
      ))}
      <polygon
        fill="#A97C4F"
        points={SELECTED_FACET}
        stroke="#23231F"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
    <span className="flex items-center gap-2">
      <span className="size-3.5 rounded-full bg-fixture-bronze" />
      <span className="type-data text-muted-foreground">#A97C4F</span>
    </span>
  </div>
);

const TagsPreview = () => (
  <div className="preview-stage flex justify-center pt-10">
    <span className="flex w-85 max-w-[calc(100%-2rem)] flex-col gap-1.5">
      <span className="flex h-10 items-center gap-1.5 rounded-lg border border-ring bg-card px-1.5 shadow-fixture-focus">
        {["Accessible", "Keyboard first"].map((tag) => (
          <span
            className="flex h-6.5 items-center gap-1 rounded-md bg-muted pr-1.5 pl-2.25 type-ui"
            key={tag}
          >
            {tag}
            <Cross size={10} stroke="var(--muted-foreground)" />
          </span>
        ))}
      </span>
      <span className="flex flex-col gap-0.5 rounded-lg border border-border bg-card p-1 shadow-fixture-menu">
        <span className="flex h-9 items-center border-b border-border px-2 type-ui">touch</span>
        <span className="flex h-8.5 items-center rounded-md bg-muted px-2 type-ui">
          Touch friendly
        </span>
        <span className="flex h-8.5 items-center px-2 type-ui text-muted-foreground">
          Create “touch”
        </span>
      </span>
    </span>
  </div>
);

const DRAWINGS = {
  aperto: ApertoPreview,
  briolette: BriolettePreview,
  channel: ChannelPreview,
  deck: DeckPreview,
  halo: HaloPreview,
  parquet: ParquetPreview,
  scrollframe: ScrollFramePreview,
  stacksheet: StacksheetPreview,
  status: StatusPreview,
  swatch: SwatchPreview,
  tags: TagsPreview,
  thumbnail: ThumbnailPreview,
  verge: VergePreview,
};

const hasDrawing = (slug: string): slug is keyof typeof DRAWINGS => Object.hasOwn(DRAWINGS, slug);

/** The catalogue tile's drawing for one component. Every slug has one. */
export const CatalogueDrawing = ({ slug }: { slug: string }) => {
  if (!hasDrawing(slug)) {
    throw new Error(`No catalogue drawing for "${slug}"`);
  }
  const Drawing = DRAWINGS[slug];
  return <Drawing />;
};
