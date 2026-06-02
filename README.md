# Creation Roofing Website

Premium high-conversion roofing website built with **React + TanStack Start**, **Tailwind CSS v4**, and a **Convex** lead backend.

## Local development

```bash
npm install
npm run dev
```

## Required environment variables

- `CONVEX_URL` – Convex deployment URL used to persist all lead and assistant inquiries.
- `OPENROUTER_API_KEY` – OpenRouter key for the Creation Assistant chatbot.
- `OPENROUTER_MODEL` (optional) – defaults to `openai/gpt-4o-mini`.
- `SITE_URL` (optional) – sent to OpenRouter request headers.

## Convex setup

This repo includes:

- `convex/schema.ts` – lead capture data model.
- `convex/leads.ts` – mutations/queries for quote and chatbot inquiries.

Run your normal Convex workflow (`npx convex dev` / `npx convex deploy`) to provision the backend.

## Build & test

```bash
npm run test
npm run build
```

`vite build` runs through TanStack Start + Vinxi/Nitro, and is ready for Vercel with the Nitro `vercel` preset.
