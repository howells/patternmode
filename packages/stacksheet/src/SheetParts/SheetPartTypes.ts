import type { CSSProperties, ReactNode } from "react";

export interface SheetPartProps {
	asChild?: boolean;
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
}

export interface SheetOptionalContentPartProps {
	asChild?: boolean;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
}

export type SheetBackProps = SheetOptionalContentPartProps;
export type SheetBodyProps = SheetPartProps;
export type SheetCloseProps = SheetOptionalContentPartProps;
export type SheetDescriptionProps = SheetPartProps;
export type SheetFooterProps = SheetPartProps;
export type SheetHandleProps = SheetOptionalContentPartProps;
export type SheetHeaderProps = SheetPartProps;
export type SheetTitleProps = SheetPartProps;
