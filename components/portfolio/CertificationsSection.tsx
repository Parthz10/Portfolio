import { ExternalLink } from 'lucide-react'
import { assessments, certifications } from '@/lib/portfolio-data'

export default function CertificationsSection() {
  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold text-white">Certifications</h2>
      <div className="grid grid-cols-[1.4fr_0.9fr] gap-6">
        <div className="max-h-[460px] overflow-y-auto pr-2">
          {certifications.map((item) => (
            <a
              key={`${item.title}-${item.date}`}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="-mx-2 flex items-start justify-between gap-3 border-b border-white/[0.055] px-2 py-3 transition-colors hover:rounded-md hover:bg-white/[0.04]"
            >
              <span>
                <span className="block text-[13px] font-medium text-white/80">{item.title}</span>
                <span className="mt-0.5 block text-xs text-[#0078d4]">{item.issuer}</span>
                <span className="mt-1 block text-[11px] leading-relaxed text-white/40">{item.date} · {item.credential}</span>
              </span>
              <ExternalLink size={14} className="mt-1 shrink-0 text-white/35" />
            </a>
          ))}
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium text-white/80">Assessments</h3>
          {assessments.map((item) => (
            <article key={item.title} className="mb-3 rounded-lg border border-white/[0.07] bg-white/[0.03] p-4">
              <div className="text-[13px] font-medium text-white">{item.title}</div>
              <div className="mt-1 text-lg font-semibold text-[#93c5fd]">{item.score}</div>
              <div className="text-[11px] text-white/40">{item.date}</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.highlights.map((highlight) => (
                  <span key={highlight} className="rounded-sm border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/55">
                    {highlight}
                  </span>
                ))}
              </div>
            </article>
          ))}
          <p className="mt-4 text-xs leading-relaxed text-white/40">
            Every certificate item links either to its external verification page or to the exact page in the bundled certificate PDF.
          </p>
        </div>
      </div>
    </section>
  )
}
