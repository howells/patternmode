import { execFileSync } from "node:child_process";

export const dynamic = "force-static";

const readRevision = (): string => {
  const fromVercel = globalThis.process.env.VERCEL_GIT_COMMIT_SHA;
  if (fromVercel !== undefined && fromVercel !== "") {
    return fromVercel;
  }
  // Fails the build when there is no git checkout either, rather than
  // shipping a deployment that cannot say what it was built from.
  return execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: process.cwd(),
    encoding: "utf-8",
  }).trim();
};

/**
 * The commit this deployment was built from, written once at build time. The
 * response never changes within a deployment and every deployment has its own
 * URL cache, so it carries the static default (revalidate on every request).
 */
export const GET = () => Response.json({ revision: readRevision() });
