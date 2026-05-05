import { Code2, Database, LineChart, MessageSquare } from 'lucide-react'
import ProgressBar from '@/components/ui/ProgressBar'
import { skills } from '@/lib/portfolio-data'

const icons = [Code2, LineChart, Database, MessageSquare]

export default function SkillsSection() {
  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold text-white">Skills</h2>
      <div className="grid grid-cols-2 gap-4">
        {skills.map((group, index) => {
          const Icon = icons[index]
          return (
            <article key={group.title} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
                <Icon size={16} className="text-[#0078d4]" />
                {group.title}
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="rounded-sm border border-white/[0.09] bg-white/[0.06] px-2 py-0.5 text-[11px] text-white/60">
                    {skill}
                  </span>
                ))}
              </div>
              <ProgressBar value={group.pct} />
            </article>
          )
        })}
      </div>
    </section>
  )
}
