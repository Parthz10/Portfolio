'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { SECTIONS } from '@/lib/sections'
import { useOSStore } from '@/lib/os-store'
import type { SectionId } from '@/types/os'
import SystemTray from './SystemTray'
import { WindowsLogo } from './WindowsLogo'

function TaskbarAppIcon({ id, label, icon: Icon }: { id: SectionId; label: string; icon: typeof SECTIONS[number]['icon'] }) {
  const activeSection = useOSStore((state) => state.activeSection)
  const windows = useOSStore((state) => state.windows)
  const setActiveSection = useOSStore((state) => state.setActiveSection)
  const restoreWindow = useOSStore((state) => state.restoreWindow)
  const openPortfolioWindow = useOSStore((state) => state.openPortfolioWindow)
  const [showPreview, setShowPreview] = useState(false)
  const [hovering, setHovering] = useState(false)
  const isOpen = windows.some((windowState) => windowState.id === 'portfolio')
  const isActive = isOpen && activeSection === id && windows.some((windowState) => windowState.focused && !windowState.minimized)

  useEffect(() => {
    if (!hovering) {
      setShowPreview(false)
      return
    }
    const timeout = window.setTimeout(() => setShowPreview(true), 400)
    return () => window.clearTimeout(timeout)
  }, [hovering])

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={label}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setShowPreview(true)}
        onBlur={() => setShowPreview(false)}
        onClick={() => {
          setActiveSection(id)
          if (isOpen) restoreWindow('portfolio')
          else openPortfolioWindow()
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setActiveSection(id)
            restoreWindow('portfolio')
          }
        }}
        className="relative flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10"
      >
        <Icon size={20} className="text-white/70 hover:text-white" />
        {isOpen && (
          <span
            className="absolute bottom-1 h-[3px] rounded-full bg-[#0078d4]"
            style={{ width: isActive ? 14 : 6 }}
          />
        )}
      </button>
      {showPreview && (
        <div className="absolute bottom-12 left-1/2 z-[2500] h-36 w-52 -translate-x-1/2 rounded-lg border border-white/10 bg-[#2b2b2b] shadow-xl">
          <div className="flex h-7 items-center gap-2 border-b border-white/10 px-2 text-[11px] text-white/70">
            <Icon size={13} />
            {label}
          </div>
          <div className="flex h-[116px] items-center justify-center bg-[#1a1a2e] text-xs text-white/30">
            Portfolio section
          </div>
        </div>
      )}
    </div>
  )
}

export default function Taskbar() {
  const startMenuOpen = useOSStore((state) => state.startMenuOpen)
  const setStartMenuOpen = useOSStore((state) => state.setStartMenuOpen)
  const searchOpen = useOSStore((state) => state.searchOpen)
  const setSearchOpen = useOSStore((state) => state.setSearchOpen)

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[2000] flex h-12 items-center px-2"
      style={{
        background: 'rgba(20,20,30,0.85)',
        backdropFilter: 'blur(40px) saturate(180%)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center">
        <button
          type="button"
          aria-label="Start"
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className={`flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 ${startMenuOpen ? 'bg-white/15' : ''}`}
        >
          <WindowsLogo />
        </button>
      </div>
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">
        <button
          type="button"
          onClick={() => setSearchOpen(!searchOpen)}
          className="flex h-8 w-48 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.08] px-3 hover:bg-white/[0.12]"
        >
          <Search size={14} className="text-white/55" />
          <span className="text-[13px] text-white/50">Search</span>
        </button>
        {SECTIONS.map((section) => (
          <TaskbarAppIcon key={section.id} {...section} />
        ))}
      </div>
      <div className="ml-auto flex items-center">
        <SystemTray />
      </div>
    </div>
  )
}
