'use client'

import { useState } from 'react'
import { Battery, Bluetooth, ChevronUp, Plane, Sun, Volume2, Wifi } from 'lucide-react'
import { useClock } from '@/lib/use-clock'
import { useOSStore } from '@/lib/os-store'

export default function SystemTray() {
  const now = useClock()
  const signOut = useOSStore((state) => state.signOut)
  const [quickOpen, setQuickOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const toggles = [
    { label: 'WiFi', icon: Wifi, on: true },
    { label: 'Bluetooth', icon: Bluetooth, on: false },
    { label: 'Airplane', icon: Plane, on: false },
    { label: 'Saver', icon: Battery, on: true },
  ]

  return (
    <>
      <div className="flex items-center gap-0">
        <button type="button" className="h-8 w-5 text-xs text-white/60 hover:bg-white/10" onClick={() => setQuickOpen(true)}>
          ^
        </button>
        {[Wifi, Volume2, Battery].map((Icon, index) => (
          <button
            key={index}
            type="button"
            aria-label="Quick settings"
            onClick={() => setQuickOpen(!quickOpen)}
            className="flex h-8 w-6 items-center justify-center hover:bg-white/10"
          >
            <Icon size={15} className="text-white/75" />
          </button>
        ))}
        <div className="mx-1 h-4 w-px bg-white/15" />
        <button
          type="button"
          onClick={() => setCalendarOpen(!calendarOpen)}
          className="flex h-12 w-[72px] flex-col items-center justify-center hover:bg-white/10"
        >
          <span className="text-xs font-normal text-white/90">
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[10px] text-white/60">{now.toLocaleDateString()}</span>
        </button>
        <button type="button" aria-label="Notifications" className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/10">
          <ChevronUp size={14} className="text-white/60" />
        </button>
      </div>
      {quickOpen && (
        <div className="fixed bottom-14 right-2 z-[2600] w-80 rounded-xl border border-white/10 bg-[rgba(32,32,44,0.97)] p-4 shadow-[0_-8px_32px_rgba(0,0,0,0.4)] backdrop-blur-3xl">
          <div className="grid grid-cols-4 gap-2">
            {toggles.map((toggle) => {
              const Icon = toggle.icon
              return (
                <button
                  key={toggle.label}
                  type="button"
                  className={`flex h-16 flex-col items-center justify-center gap-1 rounded-lg ${
                    toggle.on ? 'bg-[#0078d4]/80' : 'bg-white/[0.08]'
                  }`}
                >
                  <Icon size={18} className="text-white" />
                  <span className="text-[10px] text-white/85">{toggle.label}</span>
                </button>
              )
            })}
          </div>
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-3 text-xs text-white/60">
              <Sun size={16} />
              <input type="range" defaultValue={72} className="w-full" aria-label="Brightness" />
            </label>
            <label className="flex items-center gap-3 text-xs text-white/60">
              <Volume2 size={16} />
              <input type="range" defaultValue={46} className="w-full" aria-label="Volume" />
            </label>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-xs text-white/70">Parth Pokharel</span>
            <button type="button" onClick={signOut} className="rounded-md bg-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/15">
              Sign out
            </button>
          </div>
        </div>
      )}
      {calendarOpen && (
        <div className="fixed bottom-14 right-2 z-[2600] w-72 rounded-xl border border-white/10 bg-[rgba(32,32,44,0.97)] p-4 shadow-[0_-8px_32px_rgba(0,0,0,0.4)] backdrop-blur-3xl">
          <div className="text-sm text-white/80">{now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] text-white/45">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
              <span key={d}>{d}</span>
            ))}
            {Array.from({ length: 35 }).map((_, index) => (
              <span key={index} className={`rounded py-1 ${index === now.getDate() ? 'bg-[#0078d4] text-white' : 'text-white/60'}`}>
                {index + 1 <= 31 ? index + 1 : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
