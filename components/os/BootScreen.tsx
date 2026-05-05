'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOSStore } from '@/lib/os-store'
import { WindowsLogo } from './WindowsLogo'

export default function BootScreen() {
  const setScreen = useOSStore((state) => state.setScreen)

  useEffect(() => {
    const timeout = window.setTimeout(() => setScreen('login'), 3000)
    return () => window.clearTimeout(timeout)
  }, [setScreen])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <WindowsLogo size="boot" />
      <div className="mt-12 flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.span
            key={index}
            className="h-2 w-2 rounded-full bg-white"
            animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1, 0.7] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </motion.div>
  )
}
