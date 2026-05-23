import { execFileSync } from "node:child_process";
import {
	cpSync,
	existsSync,
	mkdirSync,
	readdirSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const root = process.cwd();
const packDir = join(root, ".pack");
const fixtureDir = join(packDir, "next-consumer");
const packages = [
	{ name: "@patternmode/system", tarballPrefix: "patternmode-system-" },
	{ name: "@patternmode/stacksheet", tarballPrefix: "patternmode-stacksheet-" },
	{ name: "@patternmode/aperto", tarballPrefix: "patternmode-aperto-" },
	{ name: "@patternmode/deck", tarballPrefix: "patternmode-deck-" },
	{ name: "@patternmode/scrollframe", tarballPrefix: "patternmode-scrollframe-" },
	{ name: "@patternmode/swatch", tarballPrefix: "patternmode-swatch-" },
];

function run(command, args, options = {}) {
	execFileSync(command, args, {
		cwd: root,
		stdio: "inherit",
		...options,
	});
}

rmSync(packDir, { force: true, recursive: true });
mkdirSync(packDir, { recursive: true });

for (const pkg of packages) {
	run("pnpm", [
		"--filter",
		pkg.name,
		"pack",
		"--pack-destination",
		packDir,
	]);
}

const tarballs = Object.fromEntries(
	packages.map((pkg) => {
		const tarball = readdirSync(packDir).find((file) =>
			file.startsWith(pkg.tarballPrefix),
		);
		if (!tarball) {
			throw new Error(`Expected tarball was not created for ${pkg.name}.`);
		}
		return [pkg.name, tarball];
	}),
);

mkdirSync(join(fixtureDir, "app"), { recursive: true });
writeFileSync(
	join(fixtureDir, "package.json"),
	JSON.stringify(
		{
			name: "@howells/tarball-consumer",
			private: true,
			type: "module",
			scripts: {
				build: "next build",
				typecheck: "tsc --noEmit",
			},
			dependencies: {
				"@patternmode/aperto": `file:${resolve(packDir, tarballs["@patternmode/aperto"])}`,
				"@patternmode/deck": `file:${resolve(packDir, tarballs["@patternmode/deck"])}`,
				"@patternmode/scrollframe": `file:${resolve(packDir, tarballs["@patternmode/scrollframe"])}`,
				"@patternmode/stacksheet": `file:${resolve(packDir, tarballs["@patternmode/stacksheet"])}`,
				"@patternmode/swatch": `file:${resolve(packDir, tarballs["@patternmode/swatch"])}`,
				"@patternmode/system": `file:${resolve(packDir, tarballs["@patternmode/system"])}`,
				next: "^16.2.6",
				react: "^19.2.3",
				"react-dom": "^19.2.3",
			},
			pnpm: {
				overrides: {
					"@patternmode/system": `file:${resolve(packDir, tarballs["@patternmode/system"])}`,
				},
			},
			devDependencies: {
				"@types/node": "^24.10.3",
				"@types/react": "^19.2.14",
				"@types/react-dom": "^19.2.3",
				typescript: "^6.0.3",
			},
		},
		null,
		2,
	),
);
writeFileSync(join(fixtureDir, "next.config.mjs"), "export default {};\n");
writeFileSync(
	join(fixtureDir, "tsconfig.json"),
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
	join(fixtureDir, "next-env.d.ts"),
	'/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n',
);
writeFileSync(
	join(fixtureDir, "app", "layout.tsx"),
	`import type { ReactNode } from "react";
import "@patternmode/aperto/styles.css";
import "@patternmode/deck/styles.css";
import "@patternmode/scrollframe/styles.css";
import "@patternmode/stacksheet/styles.css";
import "@patternmode/swatch/styles.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
`,
);
writeFileSync(
	join(fixtureDir, "app", "page.tsx"),
	`import { Demo } from "./demo";

export default function Page() {
  return <Demo />;
}
`,
);
writeFileSync(
	join(fixtureDir, "app", "demo.tsx"),
	`"use client";

import { Aperto, type ApertoMediaItem } from "@patternmode/aperto";
import { Deck } from "@patternmode/deck";
import { ScrollFrame } from "@patternmode/scrollframe";
import { createStacksheet } from "@patternmode/stacksheet";
import { Swatch } from "@patternmode/swatch";

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
        <Swatch color="#ff3355" aria-label="Smoke swatch" />
      </main>
    </StacksheetProvider>
  );
}
`,
);

if (existsSync(join(fixtureDir, "node_modules"))) {
	rmSync(join(fixtureDir, "node_modules"), { force: true, recursive: true });
}

execFileSync("pnpm", ["install", "--ignore-workspace", "--no-lockfile"], {
	cwd: fixtureDir,
	stdio: "inherit",
});
execFileSync("pnpm", ["typecheck"], { cwd: fixtureDir, stdio: "inherit" });
execFileSync("pnpm", ["build"], { cwd: fixtureDir, stdio: "inherit" });

cpSync(join(fixtureDir, ".next"), join(packDir, "next-consumer-build"), {
	force: true,
	recursive: true,
});

console.log("Tarball consumer smoke test passed.");
