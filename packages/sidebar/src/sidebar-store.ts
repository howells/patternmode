import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
	// State
	state: "collapsed" | "open" | "pinned" | "locked";
	isHovering: boolean;
	isMobile: boolean;
	isExpanded: boolean;
    shouldOffsetContent: boolean;
    isHydrated: boolean;

	// Computed getters
	get effectiveWidth(): string;

	// Actions
	setState: (state: "collapsed" | "open" | "pinned" | "locked") => void;
	setHovering: (hovering: boolean) => void;
	setMobile: (mobile: boolean) => void;
	togglePin: () => void;
	toggleOpen: () => void;
	toggleLock: () => void;
}

export const useSidebar = create<SidebarStore>()(
    persist(
        (set, get) => ({
			// Initial state
			state: "collapsed",
			isHovering: false,
			isMobile: false,
            isExpanded: false,
            shouldOffsetContent: false,
            isHydrated: false,

			// Computed values using getters
			get effectiveWidth() {
				return get().isExpanded
					? "var(--sidebar-open-width)"
					: "var(--sidebar-collapsed-width)";
			},

			// Actions
			setState: (state) => {
				const { isHovering, isMobile } = get();
				const isExpanded = isMobile
					? state === "open"
					: state === "pinned" ||
						state === "open" ||
						(state === "collapsed" && isHovering);
				const shouldOffsetContent = !isMobile && state === "pinned";
				set({ state, isExpanded, shouldOffsetContent });
			},
			setHovering: (isHovering) => {
				const { state, isMobile } = get();
				const isExpanded = isMobile
					? state === "open"
					: state === "pinned" ||
						state === "open" ||
						(state === "collapsed" && isHovering);
				const shouldOffsetContent = !isMobile && state === "pinned";
				set({ isHovering, isExpanded, shouldOffsetContent });
			},
			setMobile: (isMobile) => {
				const { state, isHovering } = get();
				const isExpanded = isMobile
					? state === "open"
					: state === "pinned" ||
						state === "open" ||
						(state === "collapsed" && isHovering);
				const shouldOffsetContent = !isMobile && state === "pinned";
				set({ isMobile, isExpanded, shouldOffsetContent });
			},

			togglePin: () =>
				set((state) => {
					const newState =
						state.state === "pinned" ? "collapsed" : ("pinned" as const);
					const isExpanded = state.isMobile ? false : newState === "pinned";
					const shouldOffsetContent = !state.isMobile && newState === "pinned";
					return { state: newState, isExpanded, shouldOffsetContent };
				}),

			toggleOpen: () =>
				set((state) => {
					const newState =
						state.state === "open" ? "collapsed" : ("open" as const);
					const isExpanded = newState === "open";
					const shouldOffsetContent = false;
					return { state: newState, isExpanded, shouldOffsetContent };
				}),

			toggleLock: () =>
				set((state) => {
					const newState =
						state.state === "locked" ? "collapsed" : ("locked" as const);
					const isExpanded = false;
					const shouldOffsetContent = false;
					return { state: newState, isExpanded, shouldOffsetContent };
				}),
        }),
        {
            name: "sidebar-state",
            // Persist only the user's choice: pinned or locked
            partialize: (state) => ({
                isPinned: state.state === "pinned",
                isLocked: state.state === "locked",
            }),
            // On hydration, derive runtime state and flags from the booleans
            merge: (persisted, current) => {
                const p = persisted as Partial<SidebarStore> & {
                    isPinned?: boolean;
                    isLocked?: boolean;
                };
                let nextState: SidebarStore["state"] = current.state;
                if (p.isPinned) nextState = "pinned";
                else if (p.isLocked) nextState = "locked";
                else nextState = "collapsed";

                // On hydration we never restore ephemeral "open"; only pinned/locked/collapsed
                const isExpanded = current.isMobile
                    ? false
                    : nextState === "pinned" ||
                      (nextState === "collapsed" && current.isHovering);
                const shouldOffsetContent = !current.isMobile && nextState === "pinned";

                return {
                    ...current,
                    state: nextState,
                    isExpanded,
                    shouldOffsetContent,
                } satisfies SidebarStore;
            },
            onRehydrateStorage: () => (state) => {
                // Mark hydration complete to prevent premature hover-expansion
                if (state) {
                    state.isHydrated = true;
                }
            },
        },
    ),
);
