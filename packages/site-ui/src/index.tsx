import type { ReactNode } from "react";

export interface PropEntry {
	defaultValue?: string;
	description: string;
	name: string;
	required?: boolean;
	type: string;
}

export interface ApiSection {
	description: string;
	name: string;
	props: PropEntry[];
}

export function PageShell({ children }: { children: ReactNode }) {
	return <main className="site-shell">{children}</main>;
}

export function Intro({
	description,
	links,
	title,
}: {
	description: string;
	links?: ReactNode;
	title: string;
}) {
	return (
		<header className="intro">
			<div>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			{links ? <nav aria-label="Product links">{links}</nav> : null}
		</header>
	);
}

export function ProductSection({
	children,
	description,
	id,
	title,
}: {
	children: ReactNode;
	description: string;
	id: string;
	title: string;
}) {
	return (
		<section
			aria-labelledby={`${id}-title`}
			className="product-section"
			id={id}
		>
			<div className="product-heading">
				<h2 id={`${id}-title`}>{title}</h2>
				<p>{description}</p>
			</div>
			{children}
		</section>
	);
}

export function DocsBlock({
	children,
	title,
}: {
	children: ReactNode;
	title: string;
}) {
	return (
		<section className="docs-block">
			<div className="docs-header">
				<h3>{title}</h3>
			</div>
			{children}
		</section>
	);
}

export function CodeBlock({
	children,
	install = false,
}: {
	children: string;
	install?: boolean;
}) {
	return (
		<pre className={install ? "code-block code-block-install" : "code-block"}>
			<code>{children}</code>
		</pre>
	);
}

export function ApiTable({ sections }: { sections: ApiSection[] }) {
	return (
		<div className="api-list">
			{sections.map((section) => (
				<section className="api-section" key={section.name}>
					<div className="api-section-header">
						<h4>
							<code>{section.name}</code>
						</h4>
						<p>{section.description}</p>
					</div>
					<dl className="prop-list">
						{section.props.map((prop) => (
							<div className="prop-row" key={prop.name}>
								<dt>
									<code>{prop.name}</code>
									{prop.required ? (
										<span className="required-marker" title="required">
											*
										</span>
									) : null}
								</dt>
								<dd>
									<span className="prop-type">{prop.type}</span>
									{prop.defaultValue ? (
										<span className="prop-default">{prop.defaultValue}</span>
									) : null}
									<span className="prop-description">{prop.description}</span>
								</dd>
							</div>
						))}
					</dl>
				</section>
			))}
		</div>
	);
}

export function LinkSet({ children }: { children: ReactNode }) {
	return <div className="link-set">{children}</div>;
}
