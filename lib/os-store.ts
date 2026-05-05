'use client'

import { create } from 'zustand'
import type { OSState, WindowState } from '@/types/os'

const getDefaultWindow = (zIndex = 11): WindowState => {
  const vw = typeof window === 'undefined' ? 1260 : window.innerWidth
  const vh = typeof window === 'undefined' ? 760 : window.innerHeight

  return {
    id: 'portfolio',
    title: 'Parth Pokharel - Portfolio',
    section: 'home',
    x: 80,
    y: 20,
    width: Math.min(1100, Math.max(640, vw - 160)),
    height: Math.min(680, Math.max(440, vh - 96)),
    minimized: false,
    maximized: false,
    focused: true,
    zIndex,
  }
}

export const useOSStore = create<OSState>((set, get) => ({
  screen: 'boot',
  windows: [],
  activeSection: 'home',
  startMenuOpen: false,
  searchOpen: false,
  topZIndex: 10,

  setScreen: (screen) => set({ screen }),
  setActiveSection: (activeSection) =>
    set((state) => ({
      activeSection,
      windows: state.windows.map((windowState) =>
        windowState.id === 'portfolio' ? { ...windowState, section: activeSection } : windowState,
      ),
    })),
  openPortfolioWindow: () => {
    const existing = get().windows.find((windowState) => windowState.id === 'portfolio')
    if (existing) {
      get().restoreWindow('portfolio')
      return
    }

    set((state) => {
      const zIndex = state.topZIndex + 1
      return {
        topZIndex: zIndex,
        windows: [getDefaultWindow(zIndex)],
      }
    })
  },
  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((windowState) => windowState.id !== id),
    })),
  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((windowState) =>
        windowState.id === id ? { ...windowState, minimized: true, focused: false } : windowState,
      ),
    })),
  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((windowState) =>
        windowState.id === id ? { ...windowState, maximized: true, minimized: false } : windowState,
      ),
    })),
  restoreWindow: (id) => {
    const zIndex = get().topZIndex + 1
    set((state) => ({
      topZIndex: zIndex,
      windows: state.windows.map((windowState) =>
        windowState.id === id
          ? { ...windowState, minimized: false, maximized: false, focused: true, zIndex }
          : { ...windowState, focused: false },
      ),
    }))
  },
  focusWindow: (id) => {
    const zIndex = get().topZIndex + 1
    set((state) => ({
      topZIndex: zIndex,
      windows: state.windows.map((windowState) =>
        windowState.id === id
          ? { ...windowState, focused: true, zIndex }
          : { ...windowState, focused: false },
      ),
    }))
  },
  moveWindow: (id, x, y) =>
    set((state) => ({
      windows: state.windows.map((windowState) =>
        windowState.id === id ? { ...windowState, x, y } : windowState,
      ),
    })),
  resizeWindow: (id, width, height) =>
    set((state) => ({
      windows: state.windows.map((windowState) =>
        windowState.id === id ? { ...windowState, width, height } : windowState,
      ),
    })),
  setStartMenuOpen: (startMenuOpen) => set({ startMenuOpen, searchOpen: false }),
  setSearchOpen: (searchOpen) => set({ searchOpen, startMenuOpen: false }),
  signOut: () =>
    set({
      screen: 'login',
      windows: [],
      activeSection: 'home',
      startMenuOpen: false,
      searchOpen: false,
      topZIndex: 10,
    }),
}))
