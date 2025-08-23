import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
	// State
	state: "collapsed" | "open" | "pinned" | "locked";
	isHovering: boolean;
	isMobile: boolean;
	isExpanded: boolean;
	shouldOffsetContent: boolean;

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

			togglePin: () => set((state) => {
				const newState = state.state === "pinned" ? "collapsed" : "pinned";
				const isExpanded = state.isMobile
					? newState === "open"
					: newState === "pinned" || newState === "open";
				const shouldOffsetContent = !state.isMobile && newState === "pinned";
				return { state: newState, isExpanded, shouldOffsetContent };
			}),

			toggleOpen: () => set((state) => {
				const newState = state.state === "open" ? "collapsed" : "open";
				const isExpanded = state.isMobile
					? newState === "open"
					: newState === "pinned" || newState === "open";
				const shouldOffsetContent = !state.isMobile && newState === "pinned";
				return { state: newState, isExpanded, shouldOffsetContent };
			}),

			toggleLock: () => set((state) => {
				const newState = state.state === "locked" ? "collapsed" : "locked";
				const isExpanded = state.isMobile
					? newState === "open"
					: newState === "pinned" || newState === "open";
				const shouldOffsetContent = !state.isMobile && newState === "pinned";
				return { state: newState, isExpanded, shouldOffsetContent };
			}),
		}),
		{
			name: "sidebar-state",
			partialize: (state) => ({
				isPinned: state.state === "pinned",
				isLocked: state.state === "locked",
			}), // Persist both pinned and locked states
			onRehydrateStorage: () => (state, error) => {
				// Restore the pinned or locked state when rehydrating
				if (state && !error) {
					const persistedState = state as any;
					if (persistedState.isPinned) {
						state.state = "pinned";
					} else if (persistedState.isLocked) {
						state.state = "locked";
					}
					// Recalculate computed values
					const isExpanded = !state.isMobile && state.state === "pinned";
					const shouldOffsetContent = !state.isMobile && state.state === "pinned";
					state.isExpanded = isExpanded;
					state.shouldOffsetContent = shouldOffsetContent;
				}
			},
		},
	),
);
