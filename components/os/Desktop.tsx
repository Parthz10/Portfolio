'use client'

import { useEffect, useRef, useState } from 'react'
import { FileText, FolderOpen } from 'lucide-react'
import { useOSStore } from '@/lib/os-store'
import RightClickMenu from './RightClickMenu'
import Taskbar from './Taskbar'
import Window from './Window'
import StartMenu from './StartMenu'
import SearchBar from './SearchBar'
import ResumeViewer from './ResumeViewer'

const desktopIcons = [
  { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
  { id: 'resume', label: 'Resume', icon: FileText },
]

export default function Desktop() {
  const windows = useOSStore((state) => state.windows)
  const openPortfolioWindow = useOSStore((state) => state.openPortfolioWindow)
  const setActiveSection = useOSStore((state) => state.setActiveSection)
  const startMenuOpen = useOSStore((state) => state.startMenuOpen)
  const searchOpen = useOSStore((state) => state.searchOpen)
  const setStartMenuOpen = useOSStore((state) => state.setStartMenuOpen)
  const setSearchOpen = useOSStore((state) => state.setSearchOpen)
  const [selected, setSelected] = useState<string | null>(null)
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)
  const [resumeOpen, setResumeOpen] = useState(false)
  const openedOnce = useRef(false)

  useEffect(() => {
    if (!openedOnce.current) {
      openedOnce.current = true
      openPortfolioWindow()
    }
  }, [openPortfolioWindow])

  const openDesktopItem = (id: string) => {
    if (id === 'resume') {
      setResumeOpen(true)
      return
    }

    setActiveSection('portfolio')
    openPortfolioWindow()
  }

  return (
    <div
      className="os-chrome wallpaper fixed inset-0 overflow-hidden"
      onClick={() => {
        setMenu(null)
        setSelected(null)
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        setMenu({ x: event.clientX, y: event.clientY })
      }}
    >
      <div className="fixed inset-0 bottom-12 bg-[url('/wallpaper.jpg')] bg-cover bg-center" />
      <div className="fixed inset-0 bottom-12 wallpaper" />
      <div className="relative z-10 grid w-44 grid-cols-2 gap-x-2 gap-y-3 p-4">
        {desktopIcons.map((item) => {
          const Icon = item.icon
          const isSelected = selected === item.id
          return (
            <button
              key={item.id}
              type="button"
              tabIndex={0}
              onClick={(event) => {
                event.stopPropagation()
                setSelected(item.id)
              }}
              onDoubleClick={(event) => {
                event.stopPropagation()
                openDesktopItem(item.id)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') openDesktopItem(item.id)
              }}
              className={`flex w-20 flex-col items-center gap-1 rounded-md border px-1 py-1.5 ${
                isSelected ? 'border-blue-400/40 bg-blue-500/20' : 'border-transparent'
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                <Icon size={26} className="text-white/85" />
              </span>
              <span className="text-center text-xs text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
      {windows.map((windowState) => (
        <Window key={windowState.id} windowData={windowState} />
      ))}
      {menu && <RightClickMenu x={menu.x} y={menu.y} onDismiss={() => setMenu(null)} />}
      {resumeOpen && <ResumeViewer onClose={() => setResumeOpen(false)} />}
      {startMenuOpen && <StartMenu onClose={() => setStartMenuOpen(false)} onOpenResume={() => setResumeOpen(true)} />}
      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
      <Taskbar />
    </div>
  )
}
