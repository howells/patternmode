"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

import { isComponentSlug } from "@/lib/catalogue";
import { siteNav } from "@/lib/home-sections";
import { useActiveSection } from "@/lib/shell-store";

const HOME_PANE = "#content";

/** On Home the pane scrolls, not the window, so going to the top is the pane's job. */
const scrollHomeToTop = (event: MouseEvent<HTMLAnchorElement>) => {
  const pane = document.querySelector<HTMLElement>(HOME_PANE);
  if (pane === null) {
    return;
  }
  event.preventDefault();
  pane.scrollTo({ top: 0 });
  // Leaving a section is a step Back can undo, like the contents links.
  if (window.location.hash !== "") {
    history.pushState(history.state, "", "/");
  }
  pane.focus({ preventScroll: true });
};

/**
 * On Home a contents link moves the pane directly, so a second click on the
 * section already in the address bar still goes there.
 */
const scrollHomeToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
  const pane = document.querySelector<HTMLElement>(HOME_PANE);
  const hash = href.slice(href.indexOf("#"));
  const section = pane?.querySelector<HTMLElement>(hash);
  if (pane === null || section === null || section === undefined) {
    return;
  }
  event.preventDefault();
  section.scrollIntoView({ block: "start" });
  if (window.location.hash !== hash) {
    history.pushState(history.state, "", `/${hash}`);
  }
};

const currentItem = ({
  activeSection,
  onComponent,
  onHome,
}: {
  activeSection: string | null;
  onComponent: boolean;
  onHome: boolean;
}) => {
  if (onComponent) {
    return "components";
  }
  return onHome ? activeSection : null;
};

/**
 * One compact header for every route and every scroll position: the name
 * centred over a ruled row of contents. Components stays current on all
 * thirteen component pages; on Home the current item follows the section
 * in view.
 */
export const SiteHeader = () => {
  const pathname = usePathname();
  const activeSection = useActiveSection();
  const onHome = pathname === "/";
  const onComponent = isComponentSlug(pathname.split("/")[1] ?? "");

  const currentId = currentItem({ activeSection, onComponent, onHome });
  // On Home the item marks the section in view; elsewhere it marks the page.
  const currentKind = onHome ? "location" : "page";

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-masthead">
          <Link className="site-name" href="/" onClick={onHome ? scrollHomeToTop : undefined}>
            Patternmode
          </Link>
        </div>
        <nav aria-label="Site" className="site-nav">
          <ul className="site-nav-list">
            {siteNav.map((item) => (
              <li className="site-nav-item" data-item={item.id} key={item.id}>
                {item.external === true ? (
                  <a className="site-nav-link" href={item.href} rel="noreferrer" target="_blank">
                    {item.label}
                    <span aria-hidden="true"> ↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link
                    aria-current={currentId === item.id ? currentKind : undefined}
                    className="site-nav-link"
                    href={item.href}
                    onClick={
                      onHome
                        ? (event) => {
                            scrollHomeToSection(event, item.href);
                          }
                        : undefined
                    }
                  >
                    {item.number === undefined ? null : (
                      <span aria-hidden="true" className="site-nav-number">
                        {item.number}
                      </span>
                    )}
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
