import { loader } from "fumadocs-core/source";
import { docs } from "@/.source/server";

export const source = loader({
  source: docs.toFumadocsSource(),
  // Content spans multiple top-level sections: /docs, /components, /patterns, /ecosystem
  baseUrl: "/",
});
