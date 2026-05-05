interface StatCardProps {
  value: string
  label: string
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-4 text-center transition-all hover:border-[#0078d4]/40 hover:shadow-[0_0_0_1px_rgba(0,120,212,0.3)]">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">{label}</div>
    </div>
  )
}
