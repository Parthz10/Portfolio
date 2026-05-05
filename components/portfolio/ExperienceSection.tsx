import { Briefcase } from 'lucide-react'
import { experience } from '@/lib/portfolio-data'

export default function ExperienceSection() {
  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold text-white">Experience</h2>
      {experience.map((item) => (
        <article key={item.title} className="mb-3 rounded-lg border border-white/[0.07] bg-white/[0.03] p-5 transition-all hover:border-white/15 hover:bg-white/[0.05]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <Briefcase size={14} className="text-[#0078d4]" />
              <h3 className="text-[15px] font-medium text-white">{item.title}</h3>
            </div>
            <span className="rounded bg-white/[0.06] px-2 py-0.5 text-right text-[11px] text-white/40">{item.date}</span>
          </div>
          <p className="mt-1 mb-2 text-[13px] text-[#0078d4]">{item.org} - {item.location}</p>
          <p className="text-[13px] leading-relaxed text-white/50">{item.description}</p>
          <div className="mt-3 space-y-1">
            {item.achievements.map((achievement) => (
              <div key={achievement} className="flex gap-2 text-xs text-white/45">
                <span className="text-[#0078d4]">›</span>
                {achievement}
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  )
}
