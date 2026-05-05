'use client'

import { AnimatePresence } from 'framer-motion'
import { useOSStore } from '@/lib/os-store'
import BootScreen from './BootScreen'
import Desktop from './Desktop'
import LoginScreen from './LoginScreen'

export default function OSProvider() {
  const screen = useOSStore((state) => state.screen)

  return (
    <AnimatePresence mode="wait">
      {screen === 'boot' && <BootScreen key="boot" />}
      {screen === 'login' && <LoginScreen key="login" />}
      {screen === 'desktop' && <Desktop key="desktop" />}
    </AnimatePresence>
  )
}
