import { describe, expect, it } from 'vitest'
import { normalizeLeadInput } from './leadCapture'

describe('normalizeLeadInput', () => {
  it('trims form fields and keeps source values', () => {
    const input = normalizeLeadInput({
      name: '  Ben  ',
      phone: ' 07919 435511 ',
      email: '  hello@example.com ',
      serviceInterest: ' Slating ',
      message: ' Need urgent repair ',
      source: 'quote_form',
      assistantReply: '  reply  ',
    })

    expect(input).toEqual({
      name: 'Ben',
      phone: '07919 435511',
      email: 'hello@example.com',
      serviceInterest: 'Slating',
      message: 'Need urgent repair',
      source: 'quote_form',
      assistantReply: 'reply',
    })
  })

  it('normalizes empty optional values to undefined', () => {
    const input = normalizeLeadInput({
      name: 'Name',
      phone: 'Phone',
      email: '   ',
      serviceInterest: '   ',
      message: 'Question',
      source: 'creation_assistant',
    })

    expect(input.email).toBeUndefined()
    expect(input.serviceInterest).toBeUndefined()
    expect(input.assistantReply).toBeUndefined()
  })
})
