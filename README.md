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

## Invite Flow

The homepage email field validates locally and opens the application page with
the email prefilled:

```text
/apply?email=name@company.com
```

## Membership Applications

The `/apply` page submits to a server-only API route at
`/api/applications`, which writes into Airtable. Do not expose Airtable tokens
with `NEXT_PUBLIC_` variables.

Required server environment variables:

```bash
AIRTABLE_API_KEY="pat_your_airtable_token"
AIRTABLE_BASE_ID="app_your_base_id"
AIRTABLE_APPLICATIONS_TABLE="Applications"
```

The Airtable table should include these fields:

```text
Full name
Email
LinkedIn / website
Current role
Company / institution
Highest degree
Field of expertise
Circle
Building now
Why Z Labs
Contribution
Referral source
Status
Source
Submitted at
```

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
