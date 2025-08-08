import React, { createContext, useContext } from "react";

// Generic link props that most router Link components can accept
export type GenericLinkProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  [key: string]: unknown;
};

export type LinkComponent = React.ComponentType<GenericLinkProps>;

const FallbackAnchor: LinkComponent = ({ href, children, ...rest }: GenericLinkProps) => (
  <a href={href} {...rest}>
    {children}
  </a>
);

const LinkContext = createContext<LinkComponent | null>(null);

// Registry (no hooks) for environments where context would force client components
let registeredLinkComponent: LinkComponent | null = null;

export function setLinkComponent(component: LinkComponent) {
  registeredLinkComponent = component;
}

export function getLinkComponent(): LinkComponent {
  return registeredLinkComponent ?? FallbackAnchor;
}

export function LinkProvider({ component, children }: { component: LinkComponent; children: React.ReactNode }) {
  return (
    <LinkContext.Provider value={component}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinkComponent(): LinkComponent {
  const ctx = useContext(LinkContext);
  return ctx ?? getLinkComponent();
}


