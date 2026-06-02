import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  leads: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    serviceInterest: v.optional(v.string()),
    message: v.string(),
    source: v.string(),
    assistantReply: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index('by_createdAt', ['createdAt'])
    .index('by_source', ['source']),
})
