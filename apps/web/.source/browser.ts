// @ts-nocheck
import { browser } from "fumadocs-mdx/runtime/browser";
import type * as Config from "../source.config";

const create = browser<
  typeof Config,
  import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
    DocData: {};
  }
>();
const browserCollections = {
  docs: create.doc("docs", {
    "docs/index.mdx": () => import("../content/docs/index.mdx?collection=docs"),
    "docs/installation.mdx": () =>
      import("../content/docs/installation.mdx?collection=docs"),
    "docs/motion.mdx": () =>
      import("../content/docs/motion.mdx?collection=docs"),
    "docs/responsive.mdx": () =>
      import("../content/docs/responsive.mdx?collection=docs"),
    "docs/tokens.mdx": () =>
      import("../content/docs/tokens.mdx?collection=docs"),
    "components/alert.mdx": () =>
      import("../content/components/alert.mdx?collection=docs"),
    "components/badge.mdx": () =>
      import("../content/components/badge.mdx?collection=docs"),
    "components/button.mdx": () =>
      import("../content/components/button.mdx?collection=docs"),
    "components/card.mdx": () =>
      import("../content/components/card.mdx?collection=docs"),
    "components/dialog.mdx": () =>
      import("../content/components/dialog.mdx?collection=docs"),
    "components/flex.mdx": () =>
      import("../content/components/flex.mdx?collection=docs"),
    "components/heading.mdx": () =>
      import("../content/components/heading.mdx?collection=docs"),
    "components/input.mdx": () =>
      import("../content/components/input.mdx?collection=docs"),
    "components/select.mdx": () =>
      import("../content/components/select.mdx?collection=docs"),
    "components/tabs.mdx": () =>
      import("../content/components/tabs.mdx?collection=docs"),
    "ecosystem/colorscope.mdx": () =>
      import("../content/ecosystem/colorscope.mdx?collection=docs"),
    "ecosystem/stacksheet.mdx": () =>
      import("../content/ecosystem/stacksheet.mdx?collection=docs"),
    "patterns/transition.mdx": () =>
      import("../content/patterns/transition.mdx?collection=docs"),
  }),
};
export default browserCollections;
