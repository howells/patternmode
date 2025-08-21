import { create } from 'zustand';

interface SidebarStore {
  // State
  state: 'collapsed' | 'open' | 'pinned';
  isHovering: boolean;
  isMobile: boolean;
  isExpanded: boolean;

  // Computed getters
  get effectiveWidth(): string;

  // Actions
  setState: (state: 'collapsed' | 'open' | 'pinned') => void;
  setHovering: (hovering: boolean) => void;
  setMobile: (mobile: boolean) => void;
  togglePin: () => void;
  toggleOpen: () => void;
}

export const useSidebar = create<SidebarStore>((set, get) => ({
  // Initial state
  state: 'collapsed',
  isHovering: false,
  isMobile: false,
  isExpanded: false,

  // Computed values using getters

  get effectiveWidth() {
    return get().isExpanded
      ? 'var(--sidebar-open-width)'
      : 'var(--sidebar-collapsed-width)';
  },

  // Actions
  setState: (state) => {
    const { isHovering, isMobile } = get();
    const isExpanded = isMobile
      ? state === 'open'
      : state === 'pinned' || state === 'open' || (state === 'collapsed' && isHovering);
    set({ state, isExpanded });
  },
  setHovering: (isHovering) => {
    const { state, isMobile } = get();
    const isExpanded = isMobile
      ? state === 'open'
      : state === 'pinned' || state === 'open' || (state === 'collapsed' && isHovering);
    console.log('setHovering calculation:', { state, isHovering, isMobile, isExpanded });
    set({ isHovering, isExpanded });
  },
  setMobile: (isMobile) => {
    const { state, isHovering } = get();
    const isExpanded = isMobile
      ? state === 'open'
      : state === 'pinned' || state === 'open' || (state === 'collapsed' && isHovering);
    set({ isMobile, isExpanded });
  },

  togglePin: () => set((state) => {
    const newState = state.state === 'pinned' ? 'collapsed' : 'pinned';
    const isExpanded = state.isMobile
      ? newState === 'open'
      : newState === 'pinned' || newState === 'open' || (newState === 'collapsed' && state.isHovering);
    return { state: newState, isExpanded };
  }),

  toggleOpen: () => set((state) => {
    const newState = state.state === 'open' ? 'collapsed' : 'open';
    const isExpanded = state.isMobile
      ? newState === 'open'
      : newState === 'pinned' || newState === 'open' || (newState === 'collapsed' && state.isHovering);
    return { state: newState, isExpanded };
  }),
}));