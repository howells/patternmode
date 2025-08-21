interface SidebarHeaderProps {
	children: React.ReactNode;
}

export const SidebarHeader = ({ children }: SidebarHeaderProps) => {
	return <div className="p-2.5">{children}</div>;
};