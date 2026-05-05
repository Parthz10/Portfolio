'use client'

import { Download, FileText, X } from 'lucide-react'

const resumeHref = '/documents/parth-cv-ai-data.pdf'

export default function ResumeViewer({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[2300] flex items-center justify-center bg-black/25 backdrop-blur-[2px]">
      <section
        className="os-chrome flex h-[min(760px,calc(100vh-88px))] w-[min(980px,calc(100vw-64px))] flex-col overflow-hidden rounded-lg shadow-[0_32px_80px_rgba(0,0,0,0.62),0_0_0_1px_rgba(255,255,255,0.08)]"
        style={{
          background: 'rgba(20,20,30,0.97)',
          backdropFilter: 'blur(40px) saturate(150%)',
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.14)',
        }}
      >
        <div className="flex h-8 shrink-0 items-center border-b border-white/[0.06] bg-[rgba(32,32,32,0.98)]">
          <div className="flex min-w-0 flex-1 items-center gap-2 pl-3">
            <FileText size={16} className="text-[#0078d4]" />
            <span className="truncate text-xs font-normal tracking-[0.01em] text-white/80">
              Parth Pokharel - AI & Data CV.pdf
            </span>
          </div>
          <a
            href={resumeHref}
            download="Parth-Pokharel-AI-Data-CV.pdf"
            className="flex h-8 w-[46px] items-center justify-center hover:bg-white/[0.09]"
            aria-label="Download CV"
          >
            <Download size={12} className="text-white/70" />
          </a>
          <button
            type="button"
            aria-label="Close resume"
            onClick={onClose}
            className="flex h-8 w-[46px] items-center justify-center hover:bg-[#c42b1c]"
          >
            <X size={12} className="text-white/70" />
          </button>
        </div>
        <div className="min-h-0 flex-1 bg-[#11111b]">
          <iframe
            title="Parth Pokharel AI and Data CV"
            src={`${resumeHref}#toolbar=1&navpanes=0&view=FitH`}
            className="h-full w-full border-0"
          />
        </div>
      </section>
    </div>
  )
}
