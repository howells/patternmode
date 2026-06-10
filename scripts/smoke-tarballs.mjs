import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const packDir = path.join(root, ".pack");
const fixtureDir = path.join(packDir, "next-consumer");
const packages = [
  { name: "@patternmode/system", tarballPrefix: "patternmode-system-" },
  { name: "@patternmode/stacksheet", tarballPrefix: "patternmode-stacksheet-" },
  { name: "@patternmode/aperto", tarballPrefix: "patternmode-aperto-" },
  { name: "@patternmode/deck", tarballPrefix: "patternmode-deck-" },
  {
    name: "@patternmode/scrollframe",
    tarballPrefix: "patternmode-scrollframe-",
  },
  { name: "@patternmode/status", tarballPrefix: "patternmode-status-" },
  { name: "@patternmode/swatch", tarballPrefix: "patternmode-swatch-" },
  { name: "@patternmode/tags", tarballPrefix: "patternmode-tags-" },
];

/**
 * @param {string} command Command to execute.
 * @param {readonly string[]} args Command arguments.
 * @param {import("node:child_process").ExecFileSyncOptions} [options] Extra exec options.
 */
const run = (command, args, options = {}) => {
  execFileSync(command, args, {
    cwd: root,
    stdio: "inherit",
    ...options,
  });
};

rmSync(packDir, { force: true, recursive: true });
mkdirSync(packDir, { recursive: true });

for (const pkg of packages) {
  run("pnpm", ["--filter", pkg.name, "pack", "--pack-destination", packDir]);
}

/** @type {Record<string, string>} */
const tarballs = {};
for (const pkg of packages) {
  const tarball = readdirSync(packDir).find((file) => file.startsWith(pkg.tarballPrefix));
  if (tarball === undefined) {
    throw new Error(`Expected tarball was not created for ${pkg.name}.`);
  }
  tarballs[pkg.name] = tarball;
}

/**
 * @param {string} packageName Package name.
 * @returns {string} Absolute tarball path.
 */
const getTarballPath = (packageName) => {
  const tarball = tarballs[packageName];
  if (typeof tarball !== "string") {
    throw new TypeError(`Missing tarball for ${packageName}.`);
  }
  return path.resolve(packDir, tarball);
};
const tarballDependencies = {
  "@patternmode/aperto": `file:${getTarballPath("@patternmode/aperto")}`,
  "@patternmode/deck": `file:${getTarballPath("@patternmode/deck")}`,
  "@patternmode/scrollframe": `file:${getTarballPath("@patternmode/scrollframe")}`,
  "@patternmode/stacksheet": `file:${getTarballPath("@patternmode/stacksheet")}`,
  "@patternmode/status": `file:${getTarballPath("@patternmode/status")}`,
  "@patternmode/swatch": `file:${getTarballPath("@patternmode/swatch")}`,
  "@patternmode/system": `file:${getTarballPath("@patternmode/system")}`,
  "@patternmode/tags": `file:${getTarballPath("@patternmode/tags")}`,
};

mkdirSync(path.join(fixtureDir, "app"), { recursive: true });
writeFileSync(
  path.join(fixtureDir, "package.json"),
  JSON.stringify(
    {
      dependencies: {
        ...tarballDependencies,
        next: "^16.2.6",
        react: "^19.2.3",
        "react-dom": "^19.2.3",
      },
      devDependencies: {
        "@types/node": "^24.10.3",
        "@types/react": "^19.2.14",
        "@types/react-dom": "^19.2.3",
        typescript: "^6.0.3",
      },
      name: "@howells/tarball-consumer",
      pnpm: {
        overrides: tarballDependencies,
      },
      private: true,
      scripts: {
        build: "next build",
        typecheck: "tsc --noEmit",
      },
      type: "module",
    },
    null,
    2,
  ),
);
writeFileSync(path.join(fixtureDir, "next.config.mjs"), "export default {};\n");
writeFileSync(
  path.join(fixtureDir, "tsconfig.json"),
  JSON.stringify(
    {
      compilerOptions: {
        allowJs: true,
        esModuleInterop: true,
        incremental: true,
        jsx: "preserve",
        lib: ["dom", "dom.iterable", "esnext"],
        module: "esnext",
        moduleResolution: "bundler",
        noEmit: true,
        plugins: [{ name: "next" }],
        resolveJsonModule: true,
        skipLibCheck: true,
        strict: true,
        target: "es2017",
      },
      exclude: ["node_modules"],
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    },
    null,
    2,
  ),
);
writeFileSync(
  path.join(fixtureDir, "next-env.d.ts"),
  '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n',
);
writeFileSync(
  path.join(fixtureDir, "app", "layout.tsx"),
  `import type { ReactNode } from "react";
import "@patternmode/aperto/styles.css";
import "@patternmode/deck/styles.css";
import "@patternmode/scrollframe/styles.css";
import "@patternmode/stacksheet/styles.css";
import "@patternmode/status/styles.css";
import "@patternmode/swatch/styles.css";
import "@patternmode/tags/styles.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
`,
);
writeFileSync(
  path.join(fixtureDir, "app", "page.tsx"),
  `import { Demo } from "./demo";

export default function Page() {
  return <Demo />;
}
`,
);
writeFileSync(
  path.join(fixtureDir, "app", "demo.tsx"),
  `"use client";

import { Aperto, type ApertoMediaItem } from "@patternmode/aperto";
import { Deck } from "@patternmode/deck";
import { ScrollFrame } from "@patternmode/scrollframe";
import { createStacksheet } from "@patternmode/stacksheet";
import { StatusMark } from "@patternmode/status";
import { Swatch } from "@patternmode/swatch";
import { Tag, TagSelector } from "@patternmode/tags";

const media: ApertoMediaItem[] = [
  { id: "one", type: "image", src: "/one.jpg", alt: "One" },
];

const { StacksheetProvider } = createStacksheet();

export function Demo() {
  return (
    <StacksheetProvider>
      <main>
        <Aperto.Group media={media}>
          <Aperto.Thumbnail index={0} />
        </Aperto.Group>
        <Deck aria-label="Smoke cards">
          <Deck.Card>Card one</Deck.Card>
          <Deck.Card>Card two</Deck.Card>
        </Deck>
        <ScrollFrame aria-label="Smoke scroller">
          <div>Scrollable content</div>
        </ScrollFrame>
        <StatusMark value={75} label="Smoke status" />
        <Swatch color="#ff3355" aria-label="Smoke swatch" />
        <Tag>Smoke tag</Tag>
        <TagSelector
          onChange={() => {}}
          options={[{ id: "one", label: "One" }]}
          value={[{ id: "one", label: "One" }]}
        />
      </main>
    </StacksheetProvider>
  );
}
`,
);

if (existsSync(path.join(fixtureDir, "node_modules"))) {
  rmSync(path.join(fixtureDir, "node_modules"), { force: true, recursive: true });
}

execFileSync("pnpm", ["install", "--ignore-workspace", "--no-lockfile"], {
  cwd: fixtureDir,
  stdio: "inherit",
});
execFileSync("pnpm", ["typecheck"], { cwd: fixtureDir, stdio: "inherit" });
execFileSync("pnpm", ["build"], { cwd: fixtureDir, stdio: "inherit" });

cpSync(path.join(fixtureDir, ".next"), path.join(packDir, "next-consumer-build"), {
  force: true,
  recursive: true,
});

console.log("Tarball consumer smoke test passed.");
