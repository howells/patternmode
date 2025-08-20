"use client";

import { Separator } from "./component";

export const DefaultExample = () => {
	return (
		<div className="space-y-4">
			<div className="text-sm text-zinc-900 dark:text-zinc-50">
				Content above separator
			</div>
			<Separator />
			<div className="text-sm text-zinc-900 dark:text-zinc-50">
				Content below separator
			</div>
		</div>
	);
};

export const WithTextExample = () => {
	return (
		<div className="space-y-4 p-4 border rounded-lg">
			<div className="text-center">
				<h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
					Sign In
				</h3>
				<p className="text-sm text-zinc-600 dark:text-zinc-400">
					Enter your email and password
				</p>
			</div>
			<div className="space-y-3">
				<input
					type="email"
					placeholder="Email address"
					className="w-full px-3 py-2 border  dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
				/>
				<input
					type="password"
					placeholder="Password"
					className="w-full px-3 py-2 border  dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
				/>
				<button
					type="button"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
				>
					Sign In
				</button>
			</div>
			<Separator>or</Separator>
			<button
				type="button"
				className="w-full border  dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-50 font-medium py-2 px-4 rounded-md transition-colors"
			>
				Continue with Google
			</button>
		</div>
	);
};

export const VerticalExample = () => {
	return (
		<nav className="flex items-center h-8 space-x-4 p-4 border rounded-lg">
			<a
				href="#"
				className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400"
			>
				Home
			</a>
			<Separator orientation="vertical" className="h-4" />
			<a
				href="#"
				className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400"
			>
				About
			</a>
			<Separator orientation="vertical" className="h-4" />
			<a
				href="#"
				className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400"
			>
				Contact
			</a>
			<Separator orientation="vertical" className="h-4" />
			<a
				href="#"
				className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400"
			>
				Blog
			</a>
		</nav>
	);
};

export const VariantsExample = () => {
	return (
		<div className="space-y-6">
			<div>
				<div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
					Subtle Variant
				</div>
				<Separator variant="subtle" />
			</div>
			<div>
				<div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
					Default Variant
				</div>
				<Separator variant="default" />
			</div>
			<div>
				<div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
					Strong Variant
				</div>
				<Separator variant="strong" />
			</div>
		</div>
	);
};

export const SizesExample = () => {
	return (
		<div className="space-y-6">
			<div>
				<div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
					Small Size
				</div>
				<Separator size="sm" />
			</div>
			<div>
				<div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
					Medium Size (Default)
				</div>
				<Separator size="md" />
			</div>
			<div>
				<div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
					Large Size
				</div>
				<Separator size="lg" />
			</div>
			<div>
				<div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
					Large Size with Text
				</div>
				<Separator size="lg" spacing="lg">
					Section Break
				</Separator>
			</div>
		</div>
	);
};

export const ContentSectionsExample = () => {
	return (
		<div className="max-w-2xl space-y-8">
			<section>
				<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
					Introduction
				</h2>
				<p className="text-zinc-700 dark:text-zinc-300">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco.
				</p>
			</section>

			<Separator spacing="lg">Chapter 1</Separator>

			<section>
				<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
					Getting Started
				</h2>
				<p className="text-zinc-700 dark:text-zinc-300">
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
					dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt.
				</p>
			</section>

			<Separator />

			<section>
				<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
					Advanced Topics
				</h2>
				<p className="text-zinc-700 dark:text-zinc-300">
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem
					accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
					ab illo inventore veritatis.
				</p>
			</section>
		</div>
	);
};
