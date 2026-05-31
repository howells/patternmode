import { PageShell } from "@howells/site-ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Patternmode",
	description: "Component catalog for Patternmode interface primitives.",
};

interface CatalogEntry {
	description: string;
	href: string;
	title: string;
}

const components: CatalogEntry[] = [
	{
		title: "Stacksheet",
		description:
			"Typed Sheet Stacks with push, navigate, replace, and composable Sheet Parts.",
		href: "/stacksheet",
	},
	{
		title: "Aperto",
		description:
			"Thumbnail-to-expanded media transitions with image, video, and keyboard navigation.",
		href: "/aperto",
	},
	{
		title: "Deck",
		description:
			"Card Decks with cyclic stacks, finite advance flows, velocity gestures, and keyboard control.",
		href: "/deck",
	},
	{
		title: "Swatch",
		description:
			"Color, gradient, image, and weighted palette swatches with selection affordances.",
		href: "/swatch",
	},
	{
		title: "ScrollFrame",
		description:
			"Radix-backed scroll containers with eased fades and movement controls.",
		href: "/scrollframe",
	},
	{
		title: "Tags",
		description:
			"Composable tag pills and token inputs with keyboard entry, suggestions, and duplicate prevention.",
		href: "/tags",
	},
];

function CatalogCard({ description, href, title }: CatalogEntry) {
	return (
		<a className="catalog-card" href={href}>
			<div
				className="catalog-card-preview"
				data-component={title.toLowerCase()}
			>
				{title === "Stacksheet" ? (
					<div className="preview-stacksheet" aria-hidden="true">
						<div className="preview-panel" />
						<div className="preview-panel" />
						<div className="preview-panel" />
					</div>
				) : title === "Deck" ? (
					<div className="preview-deck" aria-hidden="true">
						<div className="preview-deck-card" />
						<div className="preview-deck-card" />
						<div className="preview-deck-card" />
					</div>
				) : title === "Swatch" ? (
					<div className="preview-swatch-set" aria-hidden="true">
						<span />
						<span />
						<span />
						<span />
					</div>
				) : title === "ScrollFrame" ? (
					<div className="preview-scroll-area" aria-hidden="true">
						<span />
						<span />
						<span />
						<span />
						<span />
					</div>
				) : title === "Tags" ? (
					<div className="preview-tags" aria-hidden="true">
						<span />
						<span />
						<span />
						<span />
					</div>
				) : (
					<div className="preview-aperto" aria-hidden="true">
						<div className="preview-thumb" />
						<div className="preview-thumb" />
						<div className="preview-thumb" />
						<div className="preview-thumb" />
					</div>
				)}
			</div>
			<div className="catalog-card-body">
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
		</a>
	);
}

function PlaceholderCard() {
	return (
		<div className="catalog-card catalog-card-placeholder">
			<div className="catalog-card-preview catalog-card-preview-placeholder">
				<svg
					aria-hidden="true"
					fill="none"
					height="24"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.2"
					viewBox="0 0 24 24"
					width="24"
				>
					<path d="M12 5v14M5 12h14" />
				</svg>
			</div>
			<div className="catalog-card-body">
				<h2>More coming</h2>
				<p>New components are in progress.</p>
			</div>
		</div>
	);
}

export default function Home() {
	return (
		<PageShell>
			<header className="catalog-intro">
				<h1>Patternmode</h1>
				<p>
					Focused React interface components. {components.length} shipped, more
					on the way.
				</p>
			</header>

			<div className="catalog-grid">
				{components.map((entry) => (
					<CatalogCard key={entry.href} {...entry} />
				))}
				<PlaceholderCard />
			</div>
		</PageShell>
	);
}
