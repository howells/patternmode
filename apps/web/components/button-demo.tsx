"use client";

import { Button } from "@howells/button";
import type { SVGProps } from "react";

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.8"
			viewBox="0 0 20 20"
			{...props}
		>
			<path d="M4 10h11" />
			<path d="m11 6 4 4-4 4" />
		</svg>
	);
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.8"
			viewBox="0 0 20 20"
			{...props}
		>
			<path d="M10 4v12" />
			<path d="M4 10h12" />
		</svg>
	);
}

export function ButtonDemo() {
	return (
		<section className="button-demo">
			<div className="button-demo-row">
				<Button>Default</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="brand">Brand</Button>
			</div>
			<div className="button-demo-row">
				<Button icon={PlusIcon}>New item</Button>
				<Button suffixIcon={ArrowRightIcon} variant="secondary">
					Continue
				</Button>
				<Button dot="#315c4b" variant="outline">
					Synced
				</Button>
				<Button loading loadingLabel="Saving">
					Save
				</Button>
				<Button aria-label="Create" icon={PlusIcon} size="icon-base" />
			</div>
			<div className="button-demo-responsive">
				<Button
					responsiveMode="container"
					size={{ base: "xs", md: "base", xl: "lg" }}
					suffixIcon={ArrowRightIcon}
					variant="secondary"
				>
					Container sized
				</Button>
				<Button
					appearance="dashed"
					size={{ base: "sm", md: "lg" }}
					variant="outline"
				>
					Viewport sized
				</Button>
			</div>
		</section>
	);
}
