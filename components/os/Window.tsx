'use client'

import { PointerEvent, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FolderOpen, Maximize2, Minimize2, Square, X } from 'lucide-react'
import { SECTIONS } from '@/lib/sections'
import { useOSStore } from '@/lib/os-store'
import type { SectionId, WindowState } from '@/types/os'
import HomeSection from '@/components/portfolio/HomeSection'
import ExperienceSection from '@/components/portfolio/ExperienceSection'
import SkillsSection from '@/components/portfolio/SkillsSection'
import PortfolioSection from '@/components/portfolio/PortfolioSection'
import CertificationsSection from '@/components/portfolio/CertificationsSection'
import EducationSection from '@/components/portfolio/EducationSection'
import ContactSection from '@/components/portfolio/ContactSection'

const minWidth = 640
const minHeight = 440

function SectionContent({ section }: { section: SectionId }) {
  const sections = {
    home: <HomeSection />,
    experience: <ExperienceSection />,
    skills: <SkillsSection />,
    portfolio: <PortfolioSection />,
    certifications: <CertificationsSection />,
    education: <EducationSection />,
    contact: <ContactSection />,
  }

  return sections[section]
}

export default function Window({ windowData: win }: { windowData: WindowState }) {
  const moveWindow = useOSStore((state) => state.moveWindow)
  const resizeWindow = useOSStore((state) => state.resizeWindow)
  const focusWindow = useOSStore((state) => state.focusWindow)
  const minimizeWindow = useOSStore((state) => state.minimizeWindow)
  const maximizeWindow = useOSStore((state) => state.maximizeWindow)
  const restoreWindow = useOSStore((state) => state.restoreWindow)
  const closeWindow = useOSStore((state) => state.closeWindow)
  const activeSection = useOSStore((state) => state.activeSection)
  const setActiveSection = useOSStore((state) => state.setActiveSection)
  const isDragging = useRef(false)
  const [snapPreview, setSnapPreview] = useState(false)

  const handleTitleBarPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('.win-controls')) return
    if (win.maximized) return

    focusWindow(win.id)
    event.currentTarget.setPointerCapture(event.pointerId)
    const startX = event.clientX - win.x
    const startY = event.clientY - win.y
    isDragging.current = true

    const onMove = (moveEvent: globalThis.PointerEvent) => {
      if (!isDragging.current) return
      const newX = Math.max(0, Math.min(window.innerWidth - 80, moveEvent.clientX - startX))
      const newY = Math.max(0, moveEvent.clientY - startY)
      setSnapPreview(newY < 5)
      moveWindow(win.id, newX, newY)
    }

    const onUp = () => {
      isDragging.current = false
      setSnapPreview(false)
      const currentWindow = useOSStore.getState().windows.find((item) => item.id === win.id)
      if (currentWindow && currentWindow.y < 5) maximizeWindow(win.id)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const handleResizePointerDown = (event: PointerEvent<HTMLDivElement>, edge: string) => {
    event.preventDefault()
    event.stopPropagation()
    focusWindow(win.id)
    const startX = event.clientX
    const startY = event.clientY
    const start = { x: win.x, y: win.y, width: win.width, height: win.height }

    const onMove = (moveEvent: globalThis.PointerEvent) => {
      let x = start.x
      let y = start.y
      let width = start.width
      let height = start.height
      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY

      if (edge.includes('e')) width = Math.max(minWidth, start.width + dx)
      if (edge.includes('s')) height = Math.max(minHeight, start.height + dy)
      if (edge.includes('w')) {
        width = Math.max(minWidth, start.width - dx)
        x = start.x + (start.width - width)
      }
      if (edge.includes('n')) {
        height = Math.max(minHeight, start.height - dy)
        y = start.y + (start.height - height)
      }

      moveWindow(win.id, Math.max(0, x), Math.max(0, y))
      resizeWindow(win.id, width, height)
    }

    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const shellStyle = win.maximized
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)',
        borderRadius: 0,
        borderStyle: 'none',
        borderWidth: 0,
        borderColor: 'transparent',
      }
    : {
        position: 'fixed' as const,
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: win.focused ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.08)',
      }

  if (win.minimized) return null

  return (
    <>
      {snapPreview && <div className="fixed inset-x-2 top-2 z-[1900] h-[calc(100vh-64px)] rounded-lg border border-[#0078d4]/70 bg-[#0078d4]/20" />}
      <motion.div
        className="os-chrome flex overflow-hidden rounded-lg shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]"
        style={{
          ...shellStyle,
          zIndex: win.zIndex,
          background: 'rgba(20,20,30,0.97)',
          backdropFilter: 'blur(40px) saturate(150%)',
          display: 'flex',
          flexDirection: 'column',
        }}
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        onPointerDown={() => focusWindow(win.id)}
      >
        <div
          className="flex h-8 shrink-0 items-center border-b border-white/[0.06]"
          style={{ background: win.focused ? 'rgba(32,32,32,0.98)' : 'rgba(43,43,43,0.95)' }}
          onPointerDown={handleTitleBarPointerDown}
          onDoubleClick={() => (win.maximized ? restoreWindow(win.id) : maximizeWindow(win.id))}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 pl-3">
            <FolderOpen size={16} className="text-cyan-400" />
            <span className={`truncate text-xs font-normal tracking-[0.01em] ${win.focused ? 'text-white/80' : 'text-white/45'}`}>
              {win.title}
            </span>
          </div>
          <div className="win-controls flex h-8">
            <button type="button" aria-label="Minimize" onClick={() => minimizeWindow(win.id)} className="flex h-8 w-[46px] items-center justify-center hover:bg-white/[0.09]">
              <Minimize2 size={10} className="text-white/70" />
            </button>
            <button type="button" aria-label="Maximize" onClick={() => (win.maximized ? restoreWindow(win.id) : maximizeWindow(win.id))} className="flex h-8 w-[46px] items-center justify-center hover:bg-white/[0.09]">
              {win.maximized ? <Maximize2 size={10} className="text-white/70" /> : <Square size={10} className="text-white/70" />}
            </button>
            <button type="button" aria-label="Close" onClick={() => closeWindow(win.id)} className="flex h-8 w-[46px] items-center justify-center hover:bg-[#c42b1c] hover:text-white">
              <X size={12} className="text-white/70" />
            </button>
          </div>
        </div>
        <div className="flex min-h-0 flex-1">
          <aside className="flex w-[220px] shrink-0 flex-col border-r border-white/[0.055] bg-white/[0.018]">
            <div className="border-b border-white/[0.055] px-4 py-3">
              <div className="text-[11px] uppercase tracking-[0.14em] text-white/30">Portfolio</div>
            </div>
            <nav className="py-2">
              {SECTIONS.map((section) => {
                const Icon = section.icon
                const active = activeSection === section.id
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') setActiveSection(section.id)
                    }}
                    className={`mx-1.5 my-px flex h-9 w-[calc(100%-12px)] items-center gap-2.5 rounded px-3 text-[13px] font-normal ${
                      active
                        ? 'ml-1 border-l-2 border-[#0078d4] bg-[#0078d4]/25 pl-3.5 text-white'
                        : 'text-white/60 hover:bg-white/[0.07] hover:text-white/90'
                    }`}
                  >
                    <Icon size={16} />
                    {section.label}
                  </button>
                )
              })}
            </nav>
            <div className="mt-auto border-t border-white/[0.055] p-3">
              <div className="flex items-center gap-2.5 rounded px-2 py-2 hover:bg-white/[0.07]">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-xs font-semibold text-white">P</div>
                <div>
                  <div className="text-xs text-white/80">Parth Pokharel</div>
                  <div className="text-[10px] text-white/40">Local Account</div>
                </div>
              </div>
            </div>
          </aside>
          <main className="min-w-0 flex-1 overflow-y-auto">
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionContent section={activeSection} />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
        {!win.maximized &&
          ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'].map((edge) => (
            <div
              key={edge}
              onPointerDown={(event) => handleResizePointerDown(event, edge)}
              className="absolute"
              style={{
                top: edge.includes('n') ? -4 : edge.includes('s') ? 'calc(100% - 8px)' : 8,
                bottom: edge.includes('s') ? -4 : edge.includes('n') ? 'calc(100% - 8px)' : 8,
                left: edge.includes('w') ? -4 : edge.includes('e') ? 'calc(100% - 8px)' : 8,
                right: edge.includes('e') ? -4 : edge.includes('w') ? 'calc(100% - 8px)' : 8,
                cursor:
                  edge === 'n' || edge === 's'
                    ? 'ns-resize'
                    : edge === 'e' || edge === 'w'
                      ? 'ew-resize'
                      : edge === 'ne' || edge === 'sw'
                        ? 'nesw-resize'
                        : 'nwse-resize',
              }}
            />
          ))}
      </motion.div>
    </>
  )
}
