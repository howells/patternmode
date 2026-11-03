import { execFileSync } from "node:child_process";

export const dynamic = "force-static";

/** Baked into the prebuilt deployment so production identifies its source. */
export const GET = () => {
  const revision = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: process.cwd(),
    encoding: "utf-8",
  }).trim();

  return Response.json({ revision }, { headers: { "Cache-Control": "no-store" } });
};
