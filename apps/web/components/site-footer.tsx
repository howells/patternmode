import { GITHUB_URL, NPM_URL, REGISTRY_URL } from "@/lib/home-sections";

export const SiteFooter = () => (
  <footer className="site-footer">
    <p className="site-footer-credit">Patternmode by Daniel Howells. MIT licence.</p>
    <ul className="site-footer-links">
      <li>
        <a href={GITHUB_URL}>GitHub</a>
      </li>
      <li>
        <a href={NPM_URL}>npm</a>
      </li>
      <li>
        <a href={REGISTRY_URL}>Registry</a>
      </li>
    </ul>
  </footer>
);
