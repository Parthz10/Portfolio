'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { contactSchema, type ContactFormValues } from '@/lib/contact-schema'
import { profile } from '@/lib/portfolio-data'

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (values: ContactFormValues) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      toast.error('Message could not be sent')
      return
    }

    toast.success('Message sent')
    reset()
  }

  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold text-white">Contact</h2>
      <div className="mb-5 rounded-lg border border-white/[0.07] bg-white/[0.03] p-4 text-xs text-white/50">
        <div className="text-sm font-medium text-white">{profile.name}</div>
        <div className="mt-1">{profile.location} · {profile.phone} · {profile.email}</div>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[#93c5fd] hover:underline">
          LinkedIn profile
        </a>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
        <label className="block">
          <span className="mb-1 block text-xs text-white/45">Name</span>
          <input {...register('name')} className="w-full rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-[13px] text-white outline-none transition-all placeholder:text-white/30 focus:border-[#0078d4]/60 focus:bg-white/[0.08]" />
          {errors.name && <span className="mt-1 block text-xs text-red-300">{errors.name.message}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-white/45">Email</span>
          <input {...register('email')} className="w-full rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-[13px] text-white outline-none transition-all placeholder:text-white/30 focus:border-[#0078d4]/60 focus:bg-white/[0.08]" />
          {errors.email && <span className="mt-1 block text-xs text-red-300">{errors.email.message}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-white/45">Message</span>
          <textarea {...register('message')} rows={6} className="w-full resize-none rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-[13px] text-white outline-none transition-all placeholder:text-white/30 focus:border-[#0078d4]/60 focus:bg-white/[0.08]" />
          {errors.message && <span className="mt-1 block text-xs text-red-300">{errors.message.message}</span>}
        </label>
        <button type="submit" disabled={isSubmitting} className="rounded-md bg-[#0078d4] px-5 py-2 text-[13px] text-white transition-colors hover:bg-[#0078d4]/85 disabled:opacity-60">
          {isSubmitting ? 'Sending' : 'Send message'}
        </button>
      </form>
    </section>
  )
}
