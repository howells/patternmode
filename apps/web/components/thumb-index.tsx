"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";
import { useRef } from "react";

import { catalogue, plateNumber } from "@/lib/catalogue";

const Icon = ({ path, size = 18 }: { path: string; size?: number }) => (
  <svg
    aria-hidden="true"
    fill="none"
    height={size}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size}
  >
    <path d={path} />
  </svg>
);

const CHEVRON_PREVIOUS = "M15 18l-6-6 6-6";
const CHEVRON_NEXT = "M9 18l6-6-6-6";
const CHEVRON_UP = "M6 15l6-6 6 6";
const CROSS = "M6 6l12 12M18 6L6 18";

const useCurrentIndex = () => {
  const pathname = usePathname();
  const slug = pathname.split("/")[1] ?? "";
  return catalogue.findIndex((entry) => entry.slug === slug);
};

/**
 * The fore-edge of the book: one tab per component down the right side of the
 * screen, the current one cut out into the page. Desktop only; phones get the
 * page-turn bar below.
 */
const EdgeIndex = ({ current }: { current: number }) => (
  <nav aria-label="Components" className="edge-index">
    <ol className="edge-index-list">
      {catalogue.map((entry, index) => (
        <li key={entry.slug}>
          <Link
            aria-current={index === current ? "page" : undefined}
            className="edge-tab"
            href={`/${entry.slug}`}
          >
            <span className="edge-tab-name">{entry.name}</span>
            <span className="edge-tab-number">{plateNumber(index)}</span>
          </Link>
        </li>
      ))}
    </ol>
    <Link aria-current={current === -1 ? "page" : undefined} className="edge-index-home" href="/">
      Patternmode
    </Link>
  </nav>
);

/**
 * Every component in a bottom sheet, read down two columns. Escape, the close
 * button and a tap outside all dismiss it; choosing a link closes it as the
 * page changes underneath.
 */
const IndexSheet = ({
  current,
  dialogRef,
}: {
  current: number;
  dialogRef: RefObject<HTMLDialogElement | null>;
}) => {
  const close = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      aria-labelledby="index-sheet-title"
      className="index-sheet"
      ref={dialogRef}
      // Native light dismiss: a tap on the backdrop closes the sheet.
      {...{ closedby: "any" }}
    >
      <div className="index-sheet-head">
        <h2 className="index-sheet-title" id="index-sheet-title">
          Components
        </h2>
        <button aria-label="Close" className="index-sheet-close" onClick={close} type="button">
          <Icon path={CROSS} />
        </button>
      </div>
      <ol className="index-sheet-list">
        {catalogue.map((item, index) => (
          <li key={item.slug}>
            <Link
              aria-current={index === current ? "page" : undefined}
              className="index-sheet-link"
              href={`/${item.slug}`}
              onClick={close}
            >
              <span className="index-sheet-number">{plateNumber(index)}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
      <Link className="index-sheet-home" href="/" onClick={close}>
        All components
      </Link>
    </dialog>
  );
};

/**
 * Phone and tablet: previous and next either side of the current name, which
 * opens the full index in a sheet. The strip of ticks along the top is the
 * thumb index in miniature.
 */
const PageTurn = ({ current }: { current: number }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const entry = catalogue[current];
  const previous = catalogue[current - 1];
  const next = catalogue[current + 1];

  if (entry === undefined) {
    return null;
  }

  return (
    <>
      <nav aria-label="Components" className="page-turn">
        <ol aria-hidden="true" className="page-turn-ticks">
          {catalogue.map((tick, index) => (
            <li data-current={index === current ? "" : undefined} key={tick.slug} />
          ))}
        </ol>
        <div className="page-turn-row">
          {previous === undefined ? (
            <span className="page-turn-step" />
          ) : (
            <Link
              aria-label={`Previous: ${previous.name}`}
              className="page-turn-step"
              href={`/${previous.slug}`}
            >
              <Icon path={CHEVRON_PREVIOUS} />
            </Link>
          )}
          <button
            aria-haspopup="dialog"
            className="page-turn-current"
            onClick={() => {
              dialogRef.current?.showModal();
            }}
            type="button"
          >
            <span className="page-turn-name">{entry.name}</span>
            <span className="page-turn-count">
              {current + 1} of {catalogue.length}
              <Icon path={CHEVRON_UP} size={12} />
            </span>
          </button>
          {next === undefined ? (
            <span className="page-turn-step" />
          ) : (
            <Link
              aria-label={`Next: ${next.name}`}
              className="page-turn-step"
              href={`/${next.slug}`}
            >
              <Icon path={CHEVRON_NEXT} />
            </Link>
          )}
        </div>
      </nav>
      <IndexSheet current={current} dialogRef={dialogRef} />
    </>
  );
};

export const ThumbIndex = () => {
  const current = useCurrentIndex();
  return (
    <>
      <EdgeIndex current={current} />
      <PageTurn current={current} />
    </>
  );
};
