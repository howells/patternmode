export type HomeSectionId = "components" | "install" | "theme" | "type";

export interface SiteNavItem {
  external?: boolean;
  href: string;
  id: HomeSectionId | "github";
  label: string;
  /** The contents number shown before the label on wider screens. */
  number?: string;
}

export const GITHUB_URL = "https://github.com/howells/patternmode";
export const NPM_URL = "https://www.npmjs.com/org/patternmode";
export const REGISTRY_URL = "https://patternmode.com/r/theme.json";

export const homeSections: HomeSectionId[] = ["theme", "type", "components", "install"];

export const siteNav: SiteNavItem[] = [
  { href: "/#theme", id: "theme", label: "Theme", number: "01" },
  { href: "/#type", id: "type", label: "Type", number: "02" },
  { href: "/#components", id: "components", label: "Components", number: "03" },
  { href: "/#install", id: "install", label: "Install", number: "04" },
  { external: true, href: GITHUB_URL, id: "github", label: "GitHub" },
];
