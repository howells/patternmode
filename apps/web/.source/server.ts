// @ts-nocheck

import { server } from "fumadocs-mdx/runtime/server";
import * as __fd_glob_9 from "../content/components/alert.mdx?collection=docs";
import * as __fd_glob_10 from "../content/components/badge.mdx?collection=docs";
import * as __fd_glob_11 from "../content/components/button.mdx?collection=docs";
import * as __fd_glob_12 from "../content/components/card.mdx?collection=docs";
import * as __fd_glob_13 from "../content/components/dialog.mdx?collection=docs";
import * as __fd_glob_14 from "../content/components/flex.mdx?collection=docs";
import * as __fd_glob_15 from "../content/components/heading.mdx?collection=docs";
import * as __fd_glob_16 from "../content/components/input.mdx?collection=docs";
import { default as __fd_glob_0 } from "../content/components/meta.json?collection=docs";
import * as __fd_glob_17 from "../content/components/select.mdx?collection=docs";
import * as __fd_glob_18 from "../content/components/tabs.mdx?collection=docs";
import * as __fd_glob_4 from "../content/docs/index.mdx?collection=docs";
import * as __fd_glob_5 from "../content/docs/installation.mdx?collection=docs";
import { default as __fd_glob_1 } from "../content/docs/meta.json?collection=docs";
import * as __fd_glob_6 from "../content/docs/motion.mdx?collection=docs";
import * as __fd_glob_7 from "../content/docs/responsive.mdx?collection=docs";
import * as __fd_glob_8 from "../content/docs/tokens.mdx?collection=docs";
import * as __fd_glob_19 from "../content/ecosystem/colorscope.mdx?collection=docs";
import { default as __fd_glob_3 } from "../content/ecosystem/meta.json?collection=docs";
import * as __fd_glob_20 from "../content/ecosystem/stacksheet.mdx?collection=docs";
import { default as __fd_glob_2 } from "../content/patterns/meta.json?collection=docs";
import * as __fd_glob_21 from "../content/patterns/transition.mdx?collection=docs";
import type * as Config from "../source.config";

const create = server<
  typeof Config,
  import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
    DocData: {};
  }
>({ doc: { passthroughs: ["extractedReferences"] } });

export const docs = await create.docs(
  "docs",
  "content",
  {
    "components/meta.json": __fd_glob_0,
    "docs/meta.json": __fd_glob_1,
    "patterns/meta.json": __fd_glob_2,
    "ecosystem/meta.json": __fd_glob_3,
  },
  {
    "docs/index.mdx": __fd_glob_4,
    "docs/installation.mdx": __fd_glob_5,
    "docs/motion.mdx": __fd_glob_6,
    "docs/responsive.mdx": __fd_glob_7,
    "docs/tokens.mdx": __fd_glob_8,
    "components/alert.mdx": __fd_glob_9,
    "components/badge.mdx": __fd_glob_10,
    "components/button.mdx": __fd_glob_11,
    "components/card.mdx": __fd_glob_12,
    "components/dialog.mdx": __fd_glob_13,
    "components/flex.mdx": __fd_glob_14,
    "components/heading.mdx": __fd_glob_15,
    "components/input.mdx": __fd_glob_16,
    "components/select.mdx": __fd_glob_17,
    "components/tabs.mdx": __fd_glob_18,
    "ecosystem/colorscope.mdx": __fd_glob_19,
    "ecosystem/stacksheet.mdx": __fd_glob_20,
    "patterns/transition.mdx": __fd_glob_21,
  },
);
