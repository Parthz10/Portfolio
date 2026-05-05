export type Screen = 'boot' | 'login' | 'desktop'

export type SectionId =
  | 'home'
  | 'experience'
  | 'skills'
  | 'portfolio'
  | 'certifications'
  | 'education'
  | 'contact'

export interface WindowState {
  id: string
  title: string
  section: SectionId
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
  maximized: boolean
  focused: boolean
  zIndex: number
}

export interface OSState {
  screen: Screen
  windows: WindowState[]
  activeSection: SectionId
  startMenuOpen: boolean
  searchOpen: boolean
  topZIndex: number
  setScreen: (s: Screen) => void
  setActiveSection: (s: SectionId) => void
  openPortfolioWindow: () => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  focusWindow: (id: string) => void
  moveWindow: (id: string, x: number, y: number) => void
  resizeWindow: (id: string, w: number, h: number) => void
  setStartMenuOpen: (v: boolean) => void
  setSearchOpen: (v: boolean) => void
  signOut: () => void
}
