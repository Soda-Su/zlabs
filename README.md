# Z Labs Landing Page

OpenAI-inspired minimalist landing page for Z Labs, built with Next.js,
Tailwind CSS, Lucide Icons, and `next/font`.

## Local Setup

This project expects Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Waitlist Flow

The homepage email field validates locally and opens the waitlist page with
the email prefilled:

```text
/apply?email=name@company.com
```

## Priority Waitlist

The `/apply` page collects a lightweight profile and submits it to Formspree,
which sends the profile to `chatwithsoda@gmail.com`.

The submission includes:

- Full name
- Email
- LinkedIn
- Current role
- Company / institution
- Representative work
- Quiet question

## Verification

Run these once Node/npm are available:

```bash
npm run lint
npm run build
```

## Visual Direction

- The editorial image slots use CSS-generated gradient panels inspired by
  OpenAI-style news visuals.
- The gradients are original Z Labs visual treatments and do not use OpenAI
  assets.
