import { Mail, MapPin, Phone } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import { profile, stats } from '@/lib/portfolio-data'

const tags = ['Python', 'Data Analysis', 'Machine Learning', 'SEO Analytics', 'Content Strategy', 'Automation']

export default function HomeSection() {
  return (
    <section>
      <p className="mb-1 text-sm tracking-wide text-white/45">Hello, I&apos;m</p>
      <h1 className="font-display text-5xl italic text-white">
        Parth <span className="bg-gradient-to-r from-[#0078d4] to-violet-500 bg-clip-text text-transparent">Pokharel</span>
      </h1>
      <p className="mt-4 mb-6 max-w-2xl text-sm leading-relaxed text-white/50">{profile.summary}</p>
      <div className="mb-8 flex flex-wrap gap-5">
        <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 text-xs text-white/45 hover:text-white">
          <Mail size={12} /> {profile.email}
        </a>
        <a href={`tel:${profile.phone.replaceAll(' ', '')}`} className="flex items-center gap-1.5 text-xs text-white/45 hover:text-white">
          <Phone size={12} /> {profile.phone}
        </a>
        <span className="flex items-center gap-1.5 text-xs text-white/45"><MapPin size={12} /> {profile.location}</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {profile.cvLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[#0078d4]/35 bg-[#0078d4]/15 px-3 py-1.5 text-xs text-[#93c5fd] transition-colors hover:bg-[#0078d4]/25"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-sm border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/60 transition-all hover:border-[#0078d4]/50 hover:bg-[#0078d4]/20 hover:text-white">
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}
