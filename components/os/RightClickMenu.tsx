'use client'

import { useEffect, useRef } from 'react'

interface RightClickMenuProps {
  x: number
  y: number
  onDismiss: () => void
}

const items = ['View >', 'Sort by >', 'Refresh', '-', 'New >', '-', 'Display settings', 'Personalize']

export default function RightClickMenu({ x, y, onDismiss }: RightClickMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) onDismiss()
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [onDismiss])

  return (
    <div
      ref={ref}
      className="fixed z-[3000] w-52 rounded-lg border border-white/10 bg-[#2b2b2b] py-1 text-[13px] text-white/85 shadow-2xl"
      style={{ left: x, top: y }}
      onClick={(event) => event.stopPropagation()}
    >
      {items.map((item, index) =>
        item === '-' ? (
          <div key={index} className="my-1 h-px bg-white/10" />
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => {
              if (item === 'Refresh') window.location.reload()
              onDismiss()
            }}
            className="flex h-8 w-full items-center px-4 text-left hover:bg-white/10"
          >
            {item}
          </button>
        ),
      )}
    </div>
  )
}
