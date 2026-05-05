'use client'

import { ChangeEvent, useMemo, useState } from 'react'
import { Mic, Search } from 'lucide-react'
import { SECTIONS } from '@/lib/sections'
import { useOSStore } from '@/lib/os-store'

export default function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const setActiveSection = useOSStore((state) => state.setActiveSection)
  const openPortfolioWindow = useOSStore((state) => state.openPortfolioWindow)

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return SECTIONS.slice(0, 4)
    return SECTIONS.filter((section) => `${section.label} ${section.description}`.toLowerCase().includes(normalized))
  }, [query])

  return (
    <div className="fixed bottom-14 left-1/2 z-[2400] h-[500px] w-[640px] -translate-x-1/2 rounded-xl border border-white/10 bg-[rgba(32,32,44,0.97)] p-6 shadow-[0_-16px_60px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
      <div className="flex h-12 items-center gap-3 rounded-lg bg-white/[0.08] px-4">
        <Search size={18} className="text-white/55" />
        <input
          autoFocus
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
          placeholder="Type here to search"
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/40"
        />
        <Mic size={18} className="text-white/45" />
      </div>
      <div className="mt-7 text-sm font-medium text-white/80">Suggested</div>
      <div className="mt-3 space-y-1">
        {results.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                setActiveSection(section.id)
                openPortfolioWindow()
                onClose()
              }}
              className="flex h-14 w-full items-center gap-3 rounded-md px-3 text-left hover:bg-white/[0.08]"
            >
              <Icon size={22} className="text-white/75" />
              <span>
                <span className="block text-sm text-white/85">{section.label}</span>
                <span className="block text-xs text-white/40">Portfolio section</span>
              </span>
            </button>
          )
        })}
      </div>
      {results.length === 0 && <div className="mt-32 text-center text-sm text-white/45">No results for &quot;{query}&quot;</div>}
    </div>
  )
}
