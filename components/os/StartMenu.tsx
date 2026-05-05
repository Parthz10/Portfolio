'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, FileText, Power, RotateCw } from 'lucide-react'
import { SECTIONS } from '@/lib/sections'
import { useOSStore } from '@/lib/os-store'
import type { SectionId } from '@/types/os'

export default function StartMenu({ onClose, onOpenResume }: { onClose: () => void; onOpenResume?: () => void }) {
  const [powerOpen, setPowerOpen] = useState(false)
  const [shutDown, setShutDown] = useState(false)
  const setActiveSection = useOSStore((state) => state.setActiveSection)
  const openPortfolioWindow = useOSStore((state) => state.openPortfolioWindow)

  const openSection = (id: SectionId) => {
    setActiveSection(id)
    openPortfolioWindow()
    onClose()
  }

  if (shutDown) {
    return <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black text-sm text-white/80">It is now safe to turn off your computer.</div>
  }

  return (
    <motion.div
      className="fixed bottom-14 left-1/2 z-[2400] h-[600px] w-[640px] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-[rgba(32,32,44,0.96)] shadow-[0_-16px_60px_rgba(0,0,0,0.5)] backdrop-blur-[60px]"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="p-7">
        <input
          aria-label="Start menu search"
          placeholder="Search for apps, settings, and documents"
          className="h-10 w-full rounded-full border border-white/10 bg-white/10 px-5 text-[13px] text-white outline-none placeholder:text-white/45"
        />
        <div className="mt-7 flex items-center justify-between text-sm font-medium text-white/85">
          <span>Pinned</span>
          <button type="button" className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs text-white/70">
            All apps <ChevronRight size={13} />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-6 gap-y-2">
          {SECTIONS.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => openSection(section.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') openSection(section.id)
                }}
                className="flex h-[88px] w-[88px] flex-col items-center justify-center gap-2 rounded-lg hover:bg-white/[0.08]"
              >
                <Icon size={32} className="text-white/80" />
                <span className="max-w-[72px] text-center text-xs text-white/75">{section.label}</span>
              </button>
            )
          })}
        </div>
        <div className="mt-8 flex items-center justify-between text-sm font-medium text-white/85">
          <span>Recommended</span>
          <button type="button" className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs text-white/70">
            More <ChevronRight size={13} />
          </button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {['Resume.pdf', 'Contact Sheet'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (item === 'Resume.pdf') {
                  onOpenResume?.()
                  onClose()
                }
              }}
              className="flex h-12 items-center gap-3 rounded-md px-2 text-left hover:bg-white/[0.08]"
            >
              <FileText size={22} className="text-white/70" />
              <span className="text-xs text-white/75">{item}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/[0.07] px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-sm font-semibold text-white">P</div>
          <span className="text-[13px] text-white/80">Parth Pokharel</span>
        </div>
        <div className="relative">
          <button type="button" aria-label="Power" onClick={() => setPowerOpen(!powerOpen)} className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10">
            <Power size={18} className="text-white/80" />
          </button>
          <AnimatePresence>
            {powerOpen && (
              <motion.div
                className="absolute bottom-11 right-0 w-36 rounded-lg border border-white/10 bg-[#2b2b2b] py-1 shadow-xl"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
                <button type="button" className="flex h-8 w-full items-center px-3 text-xs text-white/75 hover:bg-white/10">Sleep</button>
                <button type="button" onClick={() => setShutDown(true)} className="flex h-8 w-full items-center px-3 text-xs text-white/75 hover:bg-white/10">Shut down</button>
                <button type="button" onClick={() => window.location.reload()} className="flex h-8 w-full items-center gap-2 px-3 text-xs text-white/75 hover:bg-white/10">
                  <RotateCw size={12} /> Restart
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
