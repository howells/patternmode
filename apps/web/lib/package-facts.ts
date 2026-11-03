import aperto from "../../../packages/aperto/package.json";
import briolette from "../../../packages/briolette/package.json";
import channel from "../../../packages/channel/package.json";
import deck from "../../../packages/deck/package.json";
import halo from "../../../packages/halo/package.json";
import parquet from "../../../packages/parquet/package.json";
import scrollframe from "../../../packages/scrollframe/package.json";
import stacksheet from "../../../packages/stacksheet/package.json";
import status from "../../../packages/status/package.json";
import swatch from "../../../packages/swatch/package.json";
import tags from "../../../packages/tags/package.json";
import thumbnail from "../../../packages/thumbnail/package.json";
import verge from "../../../packages/verge/package.json";

export interface PackageFacts {
  licence: string;
  needs: string[];
  version: string;
}

/*
 * The workspace manifests, imported at build time, so the page states the
 * release the site was built against rather than a version typed into copy.
 */
const MANIFESTS = {
  "@patternmode/aperto": aperto,
  "@patternmode/briolette": briolette,
  "@patternmode/channel": channel,
  "@patternmode/deck": deck,
  "@patternmode/halo": halo,
  "@patternmode/parquet": parquet,
  "@patternmode/scrollframe": scrollframe,
  "@patternmode/stacksheet": stacksheet,
  "@patternmode/status": status,
  "@patternmode/swatch": swatch,
  "@patternmode/tags": tags,
  "@patternmode/thumbnail": thumbnail,
  "@patternmode/verge": verge,
};

const hasManifest = (packageName: string): packageName is keyof typeof MANIFESTS =>
  Object.hasOwn(MANIFESTS, packageName);

const PEER_ORDER = ["react", "react-dom"];

export const readPackageFacts = (packageName: string): PackageFacts => {
  if (!hasManifest(packageName)) {
    throw new Error(`No workspace manifest for ${packageName}`);
  }
  const manifest = MANIFESTS[packageName];
  const peers = Object.keys(manifest.peerDependencies);
  const needs = [
    ...PEER_ORDER.filter((name) => peers.includes(name)),
    ...peers.filter((name) => !PEER_ORDER.includes(name)).toSorted(),
  ];

  return {
    licence: manifest.license,
    needs,
    version: manifest.version,
  };
};
