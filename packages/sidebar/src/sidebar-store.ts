import { create } from 'zustand';

interface SidebarStore {
  // State
  state: 'collapsed' | 'open' | 'pinned';
  isHovering: boolean;
  isMobile: boolean;
  
  // Computed getters
  get isExpanded(): boolean;
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
  
  // Computed values using getters
  get isExpanded() {
    const { state, isHovering, isMobile } = get();
    if (isMobile) {
      return state === 'open';
    }
    return state === 'pinned' || (state === 'open' && isHovering);
  },
  
  get effectiveWidth() {
    return get().isExpanded 
      ? 'var(--sidebar-open-width)' 
      : 'var(--sidebar-collapsed-width)';
  },
  
  // Actions
  setState: (state) => set({ state }),
  setHovering: (isHovering) => set({ isHovering }),
  setMobile: (isMobile) => set({ isMobile }),
  
  togglePin: () => set((state) => ({
    state: state.state === 'pinned' ? 'collapsed' : 'pinned'
  })),
  
  toggleOpen: () => set((state) => ({
    state: state.state === 'open' ? 'collapsed' : 'open'
  })),
}));