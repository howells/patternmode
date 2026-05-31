"use client";

import { ScrollFrame } from "@patternmode/scrollframe";
import { joinClassNames } from "@patternmode/system";
import * as Popover from "@radix-ui/react-popover";
import { Slot } from "@radix-ui/react-slot";
import {
	type ClipboardEvent,
	createContext,
	forwardRef,
	type KeyboardEvent,
	type MouseEvent,
	type ReactElement,
	type ReactNode,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import type {
	BadgeProps,
	BadgeVariant,
	TagItem,
	TagOptionRenderProps,
	TagProps,
	TagRenderProps,
	TagSelectorContentProps,
	TagSelectorEmptyProps,
	TagSelectorListProps,
	TagSelectorProps,
	TagSelectorRootProps,
	TagSelectorSearchProps,
	TagSelectorTriggerProps,
	TagTone,
} from "./types";

const DEFAULT_SEPARATORS = ["Enter", ","] as const;
const DEFAULT_BADGE_VARIANT = "default" satisfies BadgeVariant;
const NO_ACTIVE_OPTION = -1;
const TONE_VARIANT_MAP = {
	neutral: "secondary",
	accent: "default",
	success: "secondary",
	warning: "outline",
	danger: "destructive",
	info: "secondary",
} as const satisfies Record<TagTone, BadgeVariant>;

type CommandOption<TItem extends TagItem> =
	| {
			id: string;
			label: string;
			type: "create";
			value: string;
	  }
	| {
			id: string;
			item: TItem;
			label: string;
			type: "item";
	  };

interface TagSelectorContextValue<TItem extends TagItem> {
	activeIndex: number;
	activeOption: CommandOption<TItem> | undefined;
	ariaLabel: string | undefined;
	commandOptions: CommandOption<TItem>[];
	disabled: boolean;
	emptyMessage: ReactNode;
	filteredOptions: TItem[];
	inputId: string;
	listboxId: string;
	name: string | undefined;
	onSearchInput: (query: string) => void;
	open: boolean;
	placeholder: string;
	query: string;
	removeItem: (item: TItem) => void;
	renderOption: ((props: TagOptionRenderProps<TItem>) => ReactNode) | undefined;
	renderTag: ((props: TagRenderProps<TItem>) => ReactNode) | undefined;
	resolveDraft: (draft: string) => Promise<void>;
	resolveDrafts: (drafts: readonly string[]) => Promise<void>;
	selectCommandOption: (option: CommandOption<TItem>) => Promise<void>;
	serializeItem: (item: TItem) => string;
	separators: readonly string[];
	setActiveIndex: (index: number | ((currentIndex: number) => number)) => void;
	setOpen: (open: boolean) => void;
	value: readonly TItem[];
}

const TagSelectorContext =
	createContext<TagSelectorContextValue<TagItem> | null>(null);

function useTagSelectorContext<TItem extends TagItem>() {
	const context = useContext(TagSelectorContext);
	if (!context) {
		throw new Error(
			"TagSelector parts must be rendered inside <TagSelector.Root>.",
		);
	}

	return context as unknown as TagSelectorContextValue<TItem>;
}

function normalizeTag(value: string): string {
	return value.trim().replace(/\s+/g, " ");
}

function normalizeComparable(value: string): string {
	return normalizeTag(value).toLocaleLowerCase();
}

function splitPastedTags(value: string): string[] {
	return value.split(/[,\n\r\t]+/).flatMap((part) => {
		const tag = normalizeTag(part);
		return tag ? [tag] : [];
	});
}

function defaultFilterOption(item: TagItem, query: string): boolean {
	return item.label.toLocaleLowerCase().includes(query.toLocaleLowerCase());
}

function getTagVariant(variant: BadgeVariant | undefined, tone?: TagTone) {
	return variant ?? (tone ? TONE_VARIANT_MAP[tone] : "secondary");
}

function getNextIndex(currentIndex: number, length: number): number {
	if (length === 0) {
		return NO_ACTIVE_OPTION;
	}

	return currentIndex < 0 ? 0 : (currentIndex + 1) % length;
}

function getPreviousIndex(currentIndex: number, length: number): number {
	if (length === 0) {
		return NO_ACTIVE_OPTION;
	}

	return currentIndex <= 0 ? length - 1 : currentIndex - 1;
}

export function Badge(props: BadgeProps): ReactElement {
	const {
		asChild = false,
		className,
		variant = DEFAULT_BADGE_VARIANT,
		...badgeProps
	} = props;
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			data-variant={variant}
			className={joinClassNames("patternmode-badge", className)}
			{...badgeProps}
		/>
	);
}

export function Tag(props: TagProps): ReactElement {
	const {
		children,
		className,
		disabled = false,
		icon: Icon,
		onRemove,
		removeLabel,
		selected = false,
		size = "base",
		tone,
		variant,
		...tagProps
	} = props;

	function handleRemove(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		onRemove?.();
	}

	return (
		<Badge
			{...tagProps}
			className={joinClassNames("patternmode-tag", className)}
			data-disabled={disabled ? "true" : undefined}
			data-selected={selected ? "true" : undefined}
			data-size={size}
			data-slot="tag"
			data-testid="patternmode-tag"
			variant={getTagVariant(variant, tone)}
		>
			{Icon ? (
				<span aria-hidden="true" className="patternmode-tag__icon">
					<Icon focusable="false" />
				</span>
			) : null}
			<span className="patternmode-tag__label">{children}</span>
			{onRemove ? (
				<button
					aria-label={removeLabel ?? "Remove tag"}
					className="patternmode-tag__remove"
					disabled={disabled}
					onClick={handleRemove}
					type="button"
				>
					<svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
						<path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
					</svg>
				</button>
			) : null}
		</Badge>
	);
}

const TagSelectorRoot = forwardRef<HTMLDivElement, TagSelectorRootProps>(
	function TagSelectorRoot(props, ref) {
		const {
			"aria-label": ariaLabel,
			children,
			className,
			disabled = false,
			emptyMessage = "No tags found.",
			filterOption = defaultFilterOption,
			id,
			name,
			onChange,
			onCreateItem,
			onSearchChange,
			options,
			placeholder = "Select tags",
			renderOption,
			renderTag,
			searchValue,
			separators = DEFAULT_SEPARATORS,
			serializeItem = (item) => item.id,
			value,
			...rootProps
		} = props;
		const generatedId = useId();
		const rootId = id ?? generatedId;
		const inputId = `${rootId}-search`;
		const listboxId = `${rootId}-listbox`;
		const [open, setOpen] = useState(false);
		const [internalQuery, setInternalQuery] = useState("");
		const [activeIndex, setActiveIndex] = useState(NO_ACTIVE_OPTION);
		const query = searchValue ?? internalQuery;
		const selectedIds = useMemo(
			() => new Set(value.map((item) => item.id)),
			[value],
		);
		const filteredOptions = useMemo(
			() => options.filter((item) => filterOption(item, query)),
			[filterOption, options, query],
		);
		const exactMatches = useMemo(() => {
			const normalizedQuery = normalizeComparable(query);
			if (!normalizedQuery) {
				return [];
			}

			return options.filter(
				(item) => normalizeComparable(item.label) === normalizedQuery,
			);
		}, [options, query]);
		const canCreate =
			Boolean(onCreateItem) &&
			Boolean(normalizeTag(query)) &&
			exactMatches.length === 0;
		const commandOptions = useMemo<CommandOption<TagItem>[]>(() => {
			const itemOptions: CommandOption<TagItem>[] = filteredOptions.map(
				(item) => ({
					id: `${listboxId}-option-${item.id}`,
					item,
					label: item.label,
					type: "item",
				}),
			);

			if (canCreate) {
				itemOptions.push({
					id: `${listboxId}-create`,
					label: `Create "${normalizeTag(query)}"`,
					type: "create",
					value: normalizeTag(query),
				});
			}

			return itemOptions;
		}, [canCreate, filteredOptions, listboxId, query]);
		const activeOption = commandOptions[activeIndex];

		function updateQuery(nextQuery: string) {
			if (searchValue === undefined) {
				setInternalQuery(nextQuery);
			}
			onSearchChange?.(nextQuery);
			setActiveIndex(NO_ACTIVE_OPTION);
		}

		function removeItem(item: TagItem) {
			onChange(value.filter((selectedItem) => selectedItem.id !== item.id));
		}

		async function resolveDrafts(drafts: readonly string[]) {
			if (disabled) {
				return;
			}

			const nextValue = [...value];
			const nextIds = new Set(nextValue.map((item) => item.id));
			let changed = false;

			const resolvedDrafts = await Promise.all(
				drafts.map(async (draft) => {
					const normalizedDraft = normalizeTag(draft);
					if (!normalizedDraft) {
						return null;
					}

					const matches = options.filter(
						(item) =>
							normalizeComparable(item.label) ===
							normalizeComparable(normalizedDraft),
					);

					if (matches.length === 1) {
						const [match] = matches;
						return match && !match.disabled ? match : null;
					}

					if (matches.length === 0 && onCreateItem) {
						return onCreateItem(normalizedDraft);
					}
					return null;
				}),
			);

			for (const item of resolvedDrafts) {
				if (item && !nextIds.has(item.id)) {
					nextValue.push(item);
					nextIds.add(item.id);
					changed = true;
				}
			}

			if (changed) {
				onChange(nextValue);
				updateQuery("");
			}
		}

		async function resolveDraft(draft: string) {
			await resolveDrafts([draft]);
		}

		async function selectCommandOption(option: CommandOption<TagItem>) {
			if (disabled) {
				return;
			}

			if (option.type === "create") {
				await resolveDraft(option.value);
				return;
			}

			const isSelected = selectedIds.has(option.item.id);
			if (option.item.disabled && !isSelected) {
				return;
			}

			if (isSelected) {
				removeItem(option.item);
			} else {
				onChange([...value, option.item]);
			}
		}

		const contextValue: TagSelectorContextValue<TagItem> = {
			activeIndex,
			activeOption,
			ariaLabel,
			commandOptions,
			disabled,
			emptyMessage,
			filteredOptions,
			inputId,
			listboxId,
			name,
			onSearchInput: updateQuery,
			open,
			placeholder,
			query,
			removeItem,
			renderOption: renderOption as
				| ((props: TagOptionRenderProps<TagItem>) => ReactNode)
				| undefined,
			renderTag: renderTag as
				| ((props: TagRenderProps<TagItem>) => ReactNode)
				| undefined,
			resolveDraft,
			resolveDrafts,
			selectCommandOption,
			serializeItem,
			separators,
			setActiveIndex,
			setOpen,
			value,
		};

		function handleOpenChange(nextOpen: boolean) {
			setOpen(nextOpen);
			if (!nextOpen) {
				setActiveIndex(NO_ACTIVE_OPTION);
			}
		}

		return (
			<TagSelectorContext.Provider value={contextValue}>
				<Popover.Root onOpenChange={handleOpenChange} open={open}>
					<div
						{...rootProps}
						className={joinClassNames("patternmode-tag-selector", className)}
						data-disabled={disabled ? "true" : undefined}
						data-slot="tag-selector"
						id={rootId}
						ref={ref}
					>
						{name
							? value.map((item) => (
									<input
										key={item.id}
										name={name}
										type="hidden"
										value={serializeItem(item)}
									/>
								))
							: null}
						{children}
					</div>
				</Popover.Root>
			</TagSelectorContext.Provider>
		);
	},
);

const TagSelectorTrigger = forwardRef<
	HTMLButtonElement,
	TagSelectorTriggerProps
>(function TagSelectorTrigger(
	{ className, onClick, onKeyDown, placeholder, tabIndex, ...triggerProps },
	ref,
) {
	const context = useTagSelectorContext();
	const label = context.ariaLabel;

	function handleTriggerClick(event: MouseEvent<HTMLButtonElement>) {
		onClick?.(event);
		if (context.disabled) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
		onKeyDown?.(event);
		if (event.defaultPrevented || context.disabled) {
			return;
		}

		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			context.setOpen(!context.open);
		}
	}

	return (
		<Popover.Trigger asChild>
			<button
				{...triggerProps}
				aria-controls={context.open ? context.listboxId : undefined}
				aria-disabled={context.disabled}
				aria-expanded={context.open}
				aria-label={label}
				className={joinClassNames(
					"patternmode-tag-selector__trigger",
					className,
				)}
				onClick={handleTriggerClick}
				onKeyDown={handleKeyDown}
				data-slot="tag-selector-trigger"
				ref={ref}
				role="combobox"
				tabIndex={context.disabled ? undefined : (tabIndex ?? 0)}
				type="button"
			>
				<ScrollFrame
					axes="horizontal"
					className="patternmode-tag-selector__scroll"
					contentClassName="patternmode-tag-selector__scroll-content"
					controls={false}
					data-testid="tag-selector-selected-scroll"
					fades="end"
					scrollbars="hidden"
				>
					{context.value.length > 0 ? (
						context.value.map((item) => {
							const removeProps = {
								"aria-label": `Remove ${item.label}`,
								disabled: context.disabled,
								onClick: (event: MouseEvent<HTMLButtonElement>) => {
									event.preventDefault();
									event.stopPropagation();
									if (!context.disabled) {
										context.removeItem(item);
									}
								},
								type: "button" as const,
							};

							return (
								<span
									className="patternmode-tag-selector__selected-item"
									key={item.id}
								>
									{context.renderTag ? (
										context.renderTag({
											disabled: context.disabled,
											item,
											removeProps,
											selected: true,
										})
									) : (
										<Tag
											disabled={context.disabled}
											size="sm"
											variant={item.variant}
										>
											{item.label}
										</Tag>
									)}
								</span>
							);
						})
					) : (
						<span className="patternmode-tag-selector__placeholder">
							{placeholder ?? context.placeholder}
						</span>
					)}
				</ScrollFrame>
			</button>
		</Popover.Trigger>
	);
});

const TagSelectorContent = forwardRef<HTMLDivElement, TagSelectorContentProps>(
	function TagSelectorContent(
		{ align = "start", className, sideOffset = 6, ...contentProps },
		ref,
	) {
		return (
			<Popover.Portal>
				<Popover.Content
					{...contentProps}
					align={align}
					className={joinClassNames(
						"patternmode-tag-selector__content",
						className,
					)}
					data-slot="tag-selector-content"
					ref={ref}
					sideOffset={sideOffset}
				/>
			</Popover.Portal>
		);
	},
);

const TagSelectorSearch = forwardRef<HTMLInputElement, TagSelectorSearchProps>(
	function TagSelectorSearch(
		{ "aria-label": ariaLabel, className, onKeyDown, onPaste, ...searchProps },
		ref,
	) {
		const context = useTagSelectorContext();
		const localRef = useRef<HTMLInputElement | null>(null);
		const searchLabel =
			ariaLabel ??
			(context.ariaLabel ? `Search ${context.ariaLabel}` : "Search tags");

		useEffect(() => {
			if (context.open) {
				localRef.current?.focus();
			}
		}, [context.open]);

		function setRefs(node: HTMLInputElement | null) {
			localRef.current = node;
			if (typeof ref === "function") {
				ref(node);
			} else if (ref) {
				ref.current = node;
			}
		}

		async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
			onKeyDown?.(event);
			if (event.defaultPrevented) {
				return;
			}

			if (event.key === "ArrowDown") {
				event.preventDefault();
				context.setActiveIndex((currentIndex) =>
					getNextIndex(currentIndex, context.commandOptions.length),
				);
				return;
			}

			if (event.key === "ArrowUp") {
				event.preventDefault();
				context.setActiveIndex((currentIndex) =>
					getPreviousIndex(currentIndex, context.commandOptions.length),
				);
				return;
			}

			if (event.key === "Enter" && context.activeOption) {
				event.preventDefault();
				await context.selectCommandOption(context.activeOption);
				return;
			}

			if (event.key === "Enter" || context.separators.includes(event.key)) {
				event.preventDefault();
				await context.resolveDraft(context.query);
				return;
			}

			if (
				event.key === "Backspace" &&
				context.query === "" &&
				context.value.length > 0
			) {
				event.preventDefault();
				const lastItem = context.value.at(-1);
				if (lastItem) {
					context.removeItem(lastItem);
				}
			}
		}

		async function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
			onPaste?.(event);
			if (event.defaultPrevented) {
				return;
			}

			const pastedTags = splitPastedTags(event.clipboardData.getData("text"));
			if (pastedTags.length <= 1) {
				return;
			}

			event.preventDefault();
			await context.resolveDrafts(pastedTags);
		}

		return (
			<input
				{...searchProps}
				aria-activedescendant={context.activeOption?.id}
				aria-autocomplete="list"
				aria-controls={context.listboxId}
				aria-label={searchLabel}
				className={joinClassNames(
					"patternmode-tag-selector__search",
					className,
				)}
				disabled={context.disabled}
				id={context.inputId}
				onChange={(event) => context.onSearchInput(event.target.value)}
				onKeyDown={handleKeyDown}
				onPaste={handlePaste}
				ref={setRefs}
				type="text"
				value={context.query}
			/>
		);
	},
);

function TagSelectorOption<TItem extends TagItem>({
	item,
	option,
}: {
	item?: TItem;
	option?: CommandOption<TItem>;
}) {
	const context = useTagSelectorContext<TagItem>();
	const resolvedOption =
		option ??
		(item
			? { id: item.id, item, label: item.label, type: "item" as const }
			: undefined);

	if (!resolvedOption) {
		return null;
	}

	const isCreate = resolvedOption.type === "create";
	const optionItem = isCreate ? undefined : resolvedOption.item;
	const selected = optionItem
		? context.value.some((selectedItem) => selectedItem.id === optionItem.id)
		: false;
	const disabled =
		context.disabled || Boolean(optionItem?.disabled && !selected);
	const active =
		context.commandOptions[context.activeIndex]?.id === resolvedOption.id;
	const optionProps = {
		"aria-selected": selected,
		className: "patternmode-tag-selector__option",
		"data-active": active ? "true" : undefined,
		"data-slot": "tag-selector-option",
		disabled,
		id: resolvedOption.id,
		onClick: () => context.selectCommandOption(resolvedOption),
		role: "option",
	};

	if (optionItem && context.renderOption) {
		return (
			<TagSelectorRenderedOption
				active={active}
				disabled={disabled}
				item={optionItem}
				optionProps={optionProps}
				renderOption={context.renderOption}
				selected={selected}
			/>
		);
	}

	return (
		<button type="button" {...optionProps}>
			<span
				aria-hidden="true"
				className="patternmode-tag-selector__option-icon"
			>
				{isCreate ? (
					<svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
						<path d="M10 4.5v11M4.5 10h11" />
					</svg>
				) : selected ? (
					<svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
						<path d="M4.5 10.5l3.25 3.25 7.75-8" />
					</svg>
				) : null}
			</span>
			<span className="patternmode-tag-selector__option-label">
				{resolvedOption.label}
			</span>
		</button>
	);
}

function TagSelectorRenderedOption({
	active,
	disabled,
	item,
	optionProps,
	renderOption: render,
	selected,
}: {
	active: boolean;
	disabled: boolean;
	item: TagItem;
	optionProps: TagOptionRenderProps<TagItem>["optionProps"];
	renderOption: NonNullable<TagSelectorContextValue<TagItem>["renderOption"]>;
	selected: boolean;
}) {
	return (
		<>
			{render({
				active,
				disabled,
				item,
				optionProps,
				selected,
			})}
		</>
	);
}

const TagSelectorEmpty = forwardRef<HTMLDivElement, TagSelectorEmptyProps>(
	function TagSelectorEmpty({ className, ...emptyProps }, ref) {
		return (
			<div
				{...emptyProps}
				className={joinClassNames("patternmode-tag-selector__empty", className)}
				data-slot="tag-selector-empty"
				ref={ref}
			/>
		);
	},
);

const TagSelectorList = forwardRef<HTMLDivElement, TagSelectorListProps>(
	function TagSelectorList({ children, className, ...listProps }, ref) {
		const context = useTagSelectorContext();

		return (
			<div
				{...listProps}
				className={joinClassNames("patternmode-tag-selector__list", className)}
				data-slot="tag-selector-list"
				id={context.listboxId}
				ref={ref}
			>
				{context.commandOptions.length > 0 ? (
					context.commandOptions.map((option) => (
						<TagSelectorOption key={option.id} option={option} />
					))
				) : children ? (
					children
				) : (
					<TagSelectorEmpty>{context.emptyMessage}</TagSelectorEmpty>
				)}
			</div>
		);
	},
);

function TagSelectorBase(props: TagSelectorProps<TagItem>): ReactElement {
	const {
		children,
		contentClassName,
		emptyMessage = "No tags found.",
		placeholder = "Select tags",
		searchPlaceholder,
		triggerClassName,
		...rootProps
	} = props;

	return (
		<TagSelectorRoot
			{...rootProps}
			emptyMessage={emptyMessage}
			placeholder={placeholder}
		>
			{children ?? (
				<>
					<TagSelectorTrigger
						className={triggerClassName}
						placeholder={placeholder}
					/>
					<TagSelectorContent className={contentClassName}>
						<TagSelectorSearch placeholder={searchPlaceholder} />
						<TagSelectorList>
							<TagSelectorEmpty>{emptyMessage}</TagSelectorEmpty>
						</TagSelectorList>
					</TagSelectorContent>
				</>
			)}
		</TagSelectorRoot>
	);
}

const TagSelector = Object.assign(TagSelectorBase, {
	Content: TagSelectorContent,
	Empty: TagSelectorEmpty,
	List: TagSelectorList,
	Option: TagSelectorOption,
	Root: TagSelectorRoot,
	Search: TagSelectorSearch,
	Trigger: TagSelectorTrigger,
});

export { TagSelector };
