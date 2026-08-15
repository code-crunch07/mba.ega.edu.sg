# EGA × Glasgow Caledonian University — MBA landing page

Next.js 14 (App Router) + TypeScript. No CSS framework — the design system is
plain CSS custom properties in `app/globals.css`, so there is nothing to learn
before editing it.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
npm run typecheck            # tsc --noEmit
npm run lint                 # next lint
```

Node 18.17+ required.

## Where things live

```
app/
  layout.tsx        metadata, viewport, Noto Serif stylesheet
  page.tsx          section order
  globals.css       the entire design system
  icon.svg          favicon
  api/lead/route.ts form endpoint (server-side validation)
components/
  Header.tsx        sticky nav + mobile menu          (client)
  Sections.tsx      Hero, ImageBand, WhyNow, Curriculum, Outcomes, Award, ClosingCta
  LeadForm.tsx      validation, submit, success state (client)
  PhoneField.tsx    country code picker with flags    (client)
  Reveal.tsx        scroll-in animation wrapper       (client)
  Footer.tsx
  Icons.tsx         all inline SVGs
lib/
  content.ts        every piece of copy, stats, modules, outcomes, credentials
  countries.ts      52 country calling codes
```

**To change wording, edit `lib/content.ts`.** Components read from it; you
should not need to touch JSX for a copy change.

## Before you go live

1. **Salary table** — `OUTCOMES` in `lib/content.ts` holds indicative ranges.
   Verify them against your own 2026 salary source and replace.
2. **Lead delivery** — `app/api/lead/route.ts` currently logs the lead. Set
   `LEAD_WEBHOOK_URL` (see `.env.example`) or replace the TODO block with your
   HubSpot / Zoho call. Credentials stay server-side; never put them in a
   component marked `'use client'`.
3. **Images** — photography is hotlinked from `mba.ega.edu.sg`. Hosts are
   allow-listed in `next.config.mjs`. If you serve this from a new domain,
   confirm hotlinking is permitted, or copy the files into `public/` and change
   `IMAGES` in `lib/content.ts` to local paths.
4. **Footer links** — `/about`, `/privacy`, `/edutrust`, `/fee-protection` and
   `/student-contract` are placeholders. Point them at the real pages.
5. **GCU logo** — confirm usage rights for the header lock-up.
6. **Analytics** — add GA4 / Meta Pixel in `app/layout.tsx` and fire a
   conversion event where `setSent(true)` is called in `LeadForm.tsx`.

## Notes on decisions

- **Fonts** load from Google Fonts via `<link>` rather than `next/font/google`
  so the project builds in CI without outbound access to
  `fonts.googleapis.com`. `app/layout.tsx` documents the one-line swap to
  self-hosting if you prefer it.
- **The country picker** is a button/listbox rather than a native `<select>`
  because option elements cannot render flag images. It is keyboard operable
  (arrows, Enter, Escape), closes on outside click, and mirrors its value into
  hidden inputs so a plain form POST carries `dialCode` and `country`.
- **`Reveal`** renders the same markup on server and client and only adds the
  `in` class after mount, so there is no hydration mismatch.
- **Static export**: if you need `output: 'export'`, add
  `images: { unoptimized: true }` to `next.config.mjs` — and note the API route
  will not work, so point the form at an external endpoint instead.

## Verified

`npm run typecheck`, `npm run lint` and `npm run build` all pass clean.
Rendered and checked at 320, 360, 390, 430, 768, 820, 1024, 1280 and 1440px —
no horizontal overflow, no console errors, no hydration warnings.
