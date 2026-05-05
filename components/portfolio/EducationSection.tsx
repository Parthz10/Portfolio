import { GraduationCap } from 'lucide-react'
import { education } from '@/lib/portfolio-data'

export default function EducationSection() {
  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold text-white">Education</h2>
      <div className="space-y-3">
        {education.map((item) => (
          <article key={item.school} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-5 transition-all hover:border-white/15 hover:bg-white/[0.05]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-[#0078d4]" />
                <h3 className="text-[15px] font-medium text-white">{item.program}</h3>
              </div>
              <span className="rounded-sm border border-[#0078d4]/35 bg-[#0078d4]/15 px-2.5 py-0.5 text-[11px] text-[#60a5fa]">{item.badge}</span>
            </div>
            <p className="mt-2 text-[13px] text-[#0078d4]">
              {item.link ? (
                <a href={item.link} target="_blank" rel="noreferrer" className="hover:underline">{item.school}</a>
              ) : (
                item.school
              )} - {item.location} - {item.date}
            </p>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-white/50">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
