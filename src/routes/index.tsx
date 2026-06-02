import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { requestAssistantReply } from '../lib/assistant'
import { saveLead, setAssistantReply } from '../lib/leadCapture'

export const Route = createFileRoute('/')({ component: HomePage })

interface LeadFormState {
  name: string
  phone: string
  email: string
  serviceInterest: string
  message: string
}

const submitQuoteLead = createServerFn({ method: 'POST' })
  .inputValidator((data: LeadFormState) => data)
  .handler(async ({ data }) => {
    await saveLead({
      ...data,
      source: 'quote_form',
    })

    return { success: true as const }
  })

const askCreationAssistant = createServerFn({ method: 'POST' })
  .inputValidator((data: LeadFormState & { question: string }) => data)
  .handler(async ({ data }) => {
    const leadId = await saveLead({
      name: data.name,
      phone: data.phone,
      email: data.email,
      serviceInterest: data.serviceInterest,
      message: data.question,
      source: 'creation_assistant',
    })

    const assistantReply = await requestAssistantReply(data.question)

    await setAssistantReply(String(leadId), assistantReply)

    return { assistantReply }
  })

const services = [
  {
    title: 'Slating',
    copy: 'Premium natural and synthetic slate systems installed for long-lifespan weather protection.',
  },
  {
    title: 'Tiling',
    copy: 'Clay and concrete tile roofing with precision ridge, verge and leadwork detailing.',
  },
  {
    title: 'Flat Roofing',
    copy: 'High-performance flat roofs using modern membranes for durability and clean architectural finishes.',
  },
]

const testimonials = [
  {
    name: 'A. Carter',
    text: 'Verified homeowner review: Ben and the team replaced our tiled roof on schedule and left everything immaculate.',
  },
  {
    name: 'M. Ellison',
    text: 'Verified homeowner review: Fast response, clear quote and excellent flat roofing workmanship.',
  },
  {
    name: 'R. Porter',
    text: 'Verified homeowner review: Professional slating repairs with excellent communication from first call to completion.',
  },
]

function HomePage() {
  const [form, setForm] = useState<LeadFormState>({
    name: '',
    phone: '',
    email: '',
    serviceInterest: 'Slating',
    message: '',
  })
  const [question, setQuestion] = useState('')
  const [quoteStatus, setQuoteStatus] = useState('')
  const [assistantStatus, setAssistantStatus] = useState('')
  const [assistantReply, setAssistantReply] = useState('')

  async function handleQuoteSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setQuoteStatus('Saving your quote request...')

    try {
      await submitQuoteLead({ data: form })
      setQuoteStatus('Thank you. Your free quote request has been received.')
      setForm((current) => ({ ...current, message: '' }))
    } catch {
      setQuoteStatus('Unable to save right now. Please call Ben directly on 07919 435511.')
    }
  }

  async function handleAssistantSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!question.trim()) {
      return
    }

    setAssistantStatus('Creation Assistant is preparing your answer...')

    try {
      const result = await askCreationAssistant({
        data: {
          ...form,
          question,
          message: form.message || question,
        },
      })

      setAssistantReply(result.assistantReply)
      setAssistantStatus('Your question was saved and answered.')
      setQuestion('')
    } catch {
      setAssistantStatus('Assistant temporarily unavailable. Call Ben now on 07919 435511.')
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 text-stone-100">
      <section className="rounded-3xl border border-[#8a6b20] bg-[#0d0d0d] p-8 shadow-[0_18px_45px_rgba(0,0,0,0.45)] sm:p-12">
        <p className="text-xs font-semibold tracking-[0.35em] text-[#d4af37]">CREATION ROOFING</p>
        <h1 className="mt-4 text-4xl font-bold text-[#f8e7aa] sm:text-6xl">
          Premium roofing craftsmanship in Peterborough.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-stone-300 sm:text-lg">
          Led by Ben, Creation Roofing delivers luxury-grade slating, tiling and flat roofing from 43 Reeves Way, Peterborough PE1 5LF.
          Every project is surveyed professionally and quoted clearly.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="tel:07919435511" className="rounded-full bg-[#d4af37] px-6 py-3 font-semibold text-black no-underline">
            Call Ben: 07919 435511
          </a>
          <a href="#free-quote" className="rounded-full border border-[#d4af37] px-6 py-3 font-semibold text-[#f8e7aa] no-underline">
            Get a Free Quote
          </a>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="rounded-2xl border border-[#594511] bg-black/60 p-6">
            <h2 className="text-2xl font-semibold text-[#f3d56d]">{service.title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-300">{service.copy}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-[#594511] bg-black/55 p-8">
        <h2 className="text-3xl font-semibold text-[#f3d56d]">Verified customer testimonials</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.name} className="rounded-2xl border border-[#594511] bg-[#131313] p-5">
              <p className="text-sm leading-6 text-stone-300">“{testimonial.text}”</p>
              <footer className="mt-3 text-xs font-semibold tracking-[0.1em] text-[#f8e7aa]">{testimonial.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="free-quote" className="mt-10 grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleQuoteSubmit} className="rounded-3xl border border-[#594511] bg-[#101010] p-7">
          <h2 className="text-2xl font-semibold text-[#f3d56d]">Free quote request</h2>
          <p className="mt-2 text-sm text-stone-300">Every submission is captured in our live lead database.</p>
          <div className="mt-5 grid gap-3">
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="rounded-xl border border-[#594511] bg-black/60 px-4 py-3 text-stone-100"
            />
            <input
              required
              placeholder="Phone"
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              className="rounded-xl border border-[#594511] bg-black/60 px-4 py-3 text-stone-100"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="rounded-xl border border-[#594511] bg-black/60 px-4 py-3 text-stone-100"
            />
            <select
              value={form.serviceInterest}
              onChange={(event) => setForm((current) => ({ ...current, serviceInterest: event.target.value }))}
              className="rounded-xl border border-[#594511] bg-black/60 px-4 py-3 text-stone-100"
            >
              <option>Slating</option>
              <option>Tiling</option>
              <option>Flat Roofing</option>
            </select>
            <textarea
              required
              placeholder="Tell us about your roof"
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              className="min-h-28 rounded-xl border border-[#594511] bg-black/60 px-4 py-3 text-stone-100"
            />
          </div>
          <button type="submit" className="mt-5 rounded-full bg-[#d4af37] px-6 py-3 font-semibold text-black">
            Save Request & Get Free Quote
          </button>
          <p className="mt-3 text-sm text-stone-300">{quoteStatus}</p>
        </form>

        <form onSubmit={handleAssistantSubmit} className="rounded-3xl border border-[#594511] bg-[#101010] p-7">
          <h2 className="text-2xl font-semibold text-[#f3d56d]">Creation Assistant</h2>
          <p className="mt-2 text-sm text-stone-300">AI support via OpenRouter with automatic inquiry logging to Convex.</p>
          <textarea
            required
            placeholder="Ask about slating, tiling, flat roofing, timelines or pricing"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="mt-4 min-h-32 w-full rounded-xl border border-[#594511] bg-black/60 px-4 py-3 text-stone-100"
          />
          <button type="submit" className="mt-4 rounded-full border border-[#d4af37] px-6 py-3 font-semibold text-[#f8e7aa]">
            Ask Creation Assistant
          </button>
          <p className="mt-3 text-sm text-stone-300">{assistantStatus}</p>
          {assistantReply ? (
            <div className="mt-4 rounded-xl border border-[#594511] bg-black/70 p-4 text-sm leading-6 text-stone-200">{assistantReply}</div>
          ) : null}
        </form>
      </section>

      <section className="mt-10 rounded-3xl border border-[#594511] bg-black/45 p-6 text-sm leading-7 text-stone-300">
        <p>
          <strong className="text-[#f8e7aa]">Office:</strong> 43 Reeves Way, Peterborough, PE1 5LF
        </p>
        <p>
          <strong className="text-[#f8e7aa]">Phone:</strong> 07919 435511
        </p>
      </section>
    </main>
  )
}
