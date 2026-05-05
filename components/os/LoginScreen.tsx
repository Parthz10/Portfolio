'use client'

import { KeyboardEvent, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useClock } from '@/lib/use-clock'
import { useOSStore } from '@/lib/os-store'

function Avatar() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-cyan-500 to-violet-600 text-4xl font-bold text-white">
        P
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/avatar.jpg"
      alt="Parth Pokharel"
      onError={() => setFailed(true)}
      className="h-24 w-24 rounded-full border-2 border-white/20 object-cover object-top"
    />
  )
}

export default function LoginScreen() {
  const now = useClock()
  const setScreen = useOSStore((state) => state.setScreen)
  const openPortfolioWindow = useOSStore((state) => state.openPortfolioWindow)
  const [pin, setPin] = useState('')

  const enterDesktop = () => {
    setScreen('desktop')
    window.setTimeout(() => openPortfolioWindow(), 80)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') enterDesktop()
  }

  return (
    <motion.div
      className="wallpaper fixed inset-0 flex h-screen flex-col items-center justify-center gap-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="absolute inset-0 backdrop-blur-[20px] brightness-[0.6]" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-[72px] font-black leading-none tracking-[-2px] text-white">
          {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
        <div className="mt-2 text-[17px] font-light text-white/70">
          {now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        <div className="mt-12 flex flex-col items-center">
          <Avatar />
          <div className="mt-3 text-base font-normal text-white">Parth Pokharel</div>
          <div className="mt-4 flex h-9 w-[280px] overflow-hidden rounded-[2px] border border-white/30 bg-white/[0.12]">
            <input
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="PIN"
              aria-label="PIN"
              type="password"
              className="h-full min-w-0 flex-1 bg-transparent px-3 text-center text-sm text-white outline-none placeholder:text-white/50"
            />
            <button
              type="button"
              aria-label="Sign in"
              onClick={enterDesktop}
              className="flex h-9 w-8 items-center justify-center border-l border-white/20 bg-white/[0.15] text-white hover:bg-white/25"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <button type="button" className="mt-3 text-xs text-white/60 hover:underline">
            Sign-in options
          </button>
        </div>
      </div>
    </motion.div>
  )
}
