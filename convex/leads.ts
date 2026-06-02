import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const saveLead = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    serviceInterest: v.optional(v.string()),
    message: v.string(),
    source: v.string(),
    assistantReply: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const leadId = await ctx.db.insert('leads', {
      ...args,
      createdAt: Date.now(),
    })

    return leadId
  },
})

export const setAssistantReply = mutation({
  args: {
    leadId: v.id('leads'),
    assistantReply: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.leadId, {
      assistantReply: args.assistantReply,
    })
  },
})

export const listRecentLeads = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const max = Math.min(args.limit ?? 100, 200)

    return ctx.db
      .query('leads')
      .withIndex('by_createdAt')
      .order('desc')
      .take(max)
  },
})
