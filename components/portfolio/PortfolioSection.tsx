'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { projects } from '@/lib/portfolio-data'

const data = [
  { name: 'SEO', value: 45 },
  { name: 'Articles', value: 60 },
  { name: 'Records', value: 200 },
  { name: 'Accuracy', value: 95 },
]

export default function PortfolioSection() {
  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold text-white">Portfolio</h2>
      <div className="grid grid-cols-[1.3fr_1fr] gap-4">
        <div className="h-72 rounded-lg border border-white/[0.07] bg-white/[0.03] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#2b2b2b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
              <Bar dataKey="value" fill="#0078d4" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {projects.map((project) => (
            <article key={project.title} className="rounded-lg border border-white/[0.07] border-l-2 border-l-[#0078d4] bg-white/[0.03] p-4">
              <h3 className="text-sm font-medium text-white">{project.title}</h3>
              <p className="mt-1 text-[11px] text-[#0078d4]">{project.tech}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/45">{project.points[0]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
