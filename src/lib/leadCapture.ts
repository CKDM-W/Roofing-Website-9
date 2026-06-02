import { ConvexHttpClient } from 'convex/browser'

export type LeadSource = 'quote_form' | 'creation_assistant'

export interface LeadCaptureInput {
  name: string
  phone: string
  email?: string
  serviceInterest?: string
  message: string
  source: LeadSource
  assistantReply?: string
}

let convexClient: ConvexHttpClient | null = null

function getConvexClient() {
  const convexUrl = process.env.CONVEX_URL

  if (!convexUrl) {
    throw new Error('Missing CONVEX_URL environment variable')
  }

  if (!convexClient) {
    convexClient = new ConvexHttpClient(convexUrl)
  }

  return convexClient
}

export function normalizeLeadInput(input: LeadCaptureInput) {
  return {
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || undefined,
    serviceInterest: input.serviceInterest?.trim() || undefined,
    message: input.message.trim(),
    source: input.source,
    assistantReply: input.assistantReply?.trim() || undefined,
  }
}

export async function saveLead(input: LeadCaptureInput) {
  const client = getConvexClient()
  const lead = normalizeLeadInput(input)

  return client.mutation('leads:saveLead', lead)
}

export async function setAssistantReply(leadId: string, assistantReply: string) {
  const client = getConvexClient()

  await client.mutation('leads:setAssistantReply', {
    leadId,
    assistantReply: assistantReply.trim(),
  })
}
