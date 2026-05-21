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

function run(command, args, options = {}) {
	execFileSync(command, args, {
		cwd: root,
		stdio: "inherit",
		...options,
	});
}

rmSync(packDir, { force: true, recursive: true });
mkdirSync(packDir, { recursive: true });

run("pnpm", [
	"--filter",
	"@howells/stacksheet",
	"pack",
	"--pack-destination",
	packDir,
]);
run("pnpm", [
	"--filter",
	"@howells/aperto",
	"pack",
	"--pack-destination",
	packDir,
]);

const stacksheetTarball = readdirSync(packDir).find((file) =>
	file.startsWith("howells-stacksheet-"),
);
const apertoTarball = readdirSync(packDir).find((file) =>
	file.startsWith("howells-aperto-"),
);

if (!stacksheetTarball || !apertoTarball) {
	throw new Error("Expected package tarballs were not created.");
}

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
				"@howells/aperto": `file:${resolve(packDir, apertoTarball)}`,
				"@howells/stacksheet": `file:${resolve(packDir, stacksheetTarball)}`,
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
import "@howells/stacksheet/styles.css";
import "@howells/aperto/styles.css";

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

import { Aperto, type ApertoMediaItem } from "@howells/aperto";
import { createStacksheet } from "@howells/stacksheet";

const media: ApertoMediaItem[] = [
  { id: "one", type: "image", src: "/one.jpg", alt: "One" },
];

const { StacksheetProvider } = createStacksheet();

export function Demo() {
  return (
    <StacksheetProvider>
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
      </Aperto.Group>
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
