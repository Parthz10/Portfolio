interface WindowsLogoProps {
  size?: 'boot' | 'taskbar'
}

export function WindowsLogo({ size = 'taskbar' }: WindowsLogoProps) {
  const square = size === 'boot' ? 34 : 15
  const gap = size === 'boot' ? 4 : 1
  const radius = size === 'boot' ? 2 : 1
  const total = square * 2 + gap

  return (
    <svg width={total} height={total} viewBox={`0 0 ${total} ${total}`} aria-hidden="true">
      <rect width={square} height={square} rx={radius} fill="#F25022" />
      <rect x={square + gap} width={square} height={square} rx={radius} fill="#7FBA00" />
      <rect y={square + gap} width={square} height={square} rx={radius} fill="#00A4EF" />
      <rect x={square + gap} y={square + gap} width={square} height={square} rx={radius} fill="#FFB900" />
    </svg>
  )
}
