# Roble Media Lab V2

A production-oriented Next.js 15 website built from the existing Roble Media Lab one-page site and official brand assets.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production checks

```bash
npm run typecheck
npm run build
npm start
```

## Content

Core business information, services, FAQs, and article metadata live in `content/site.ts`. Article bodies are currently in `app/blog/[slug]/page.tsx`. Replace or expand these with MDX or a CMS when publishing at scale.

## Deployment

Set:

```bash
NEXT_PUBLIC_SITE_URL=https://roblemedialab.co.ke
```

The contact form is a Jotform embed; its form id lives in `content/site.ts` (`jotformId`).

The project can be deployed on a Next.js-compatible host. For Cloudflare, use its current Next.js deployment adapter and configure WAF, rate limits, caching, and bot protection at the account level.

## Important launch checks

- Confirm the production domain.
- Review the privacy policy and terms with qualified local counsel.
- Confirm Jotform and Zoho Bookings privacy settings.
- Add a real social-sharing image before launch.
- Configure analytics only after choosing a consent and privacy approach.
