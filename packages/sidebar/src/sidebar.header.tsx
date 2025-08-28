interface SidebarHeaderProps {
	children: React.ReactNode;
}

export const SidebarHeader = ({ children }: SidebarHeaderProps) => {
	return <div className="flex-shrink-0 p-2.5">{children}</div>;
};
