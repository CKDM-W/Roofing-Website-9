interface OpenRouterChoice {
  message?: { content?: string }
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[]
}

const CREATION_ASSISTANT_PROMPT = `You are Creation Assistant for Creation Roofing in Peterborough, UK.\nProvide concise, practical roofing guidance and always invite users to request a free quote from Ben on 07919 435511.`

export async function requestAssistantReply(customerMessage: string) {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    return 'Thanks for your message. Ben can provide an immediate free quote on 07919 435511 while our assistant setup is finishing.'
  }

  const model = process.env.OPENROUTER_MODEL ?? 'openai/gpt-4o-mini'
  const headers = new Headers({
    'Content-Type': 'application/json',
    'HTTP-Referer': process.env.SITE_URL ?? 'https://creationroofing.co.uk',
    'X-Title': 'Creation Roofing Assistant',
  })
  headers.set('Authorization', ['Bearer', apiKey].join(' '))

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: CREATION_ASSISTANT_PROMPT },
        { role: 'user', content: customerMessage },
      ],
      temperature: 0.4,
    }),
  })

  if (!response.ok) {
    return 'Thanks for your question. Please call Ben on 07919 435511 for immediate advice and a free quote.'
  }

  const json = (await response.json()) as OpenRouterResponse

  return (
    json.choices?.[0]?.message?.content?.trim() ||
    'Thanks for your question. Please call Ben on 07919 435511 for immediate advice and a free quote.'
  )
}
