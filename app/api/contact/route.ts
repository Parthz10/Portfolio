import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = schema.parse(body)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  })

  await transporter.sendMail({
    from: data.email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio contact from ${data.name}`,
    text: data.message,
  })

  return NextResponse.json({ success: true })
}
