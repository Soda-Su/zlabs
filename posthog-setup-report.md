<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Z Labs Next.js App Router project. Here is a summary of all changes made:

**Initialization:**
- Created `instrumentation-client.ts` at the project root — initializes `posthog-js` with the reverse proxy (`/ingest`), `defaults: "2026-01-30"`, and `capture_exceptions: true` for automatic error tracking.
- Updated `next.config.mjs` to add PostHog reverse proxy rewrites (`/ingest/static/*`, `/ingest/array/*`, `/ingest/:path*`) and `skipTrailingSlashRedirect: true`.
- Set `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` in `.env.local`.

**Event tracking:**

| Event | Description | File |
|---|---|---|
| `beta_email_submitted` | User submits their email in the hero or footer invite form to begin the beta access flow. Properties: `variant`, `email`. Also calls `posthog.identify`. | `app/invite-form.tsx` |
| `apply_modal_opened` | The beta access application modal opens on the home page. Properties: `email_prefilled`. | `app/home-apply-shell.tsx` |
| `apply_modal_dismissed` | User closes the beta access application modal without submitting (overlay click, X button, or Escape key). | `app/home-apply-shell.tsx` |
| `beta_profile_submitted` | User successfully submits the full beta access application form. Properties: `current_role`, `company`. Also calls `posthog.identify` with name, email, role, company. | `app/apply/application-form.tsx` |
| `beta_profile_submission_failed` | Beta access application form submission fails. Properties: `error_message`. Also calls `posthog.captureException`. | `app/apply/application-form.tsx` |
| `story_viewed` | User views an editorial story page. Properties: `story_slug`, `story_title`. | `app/stories/academic-to-tech/page.tsx`, `app/stories/genai-knowledge-workers/page.tsx`, `app/stories/a-quieter-room-for-serious-people/page.tsx` |

**New files created:**
- `instrumentation-client.ts` — PostHog initialization
- `app/stories/story-view-tracker.tsx` — Minimal client component for story view tracking

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/401536/dashboard/1521006
- **Beta conversion funnel** (story viewed → email submitted → modal opened → profile submitted): https://us.posthog.com/project/401536/insights/4LF4unca
- **Beta email submissions over time:** https://us.posthog.com/project/401536/insights/kuT9wbCZ
- **Beta profiles submitted over time:** https://us.posthog.com/project/401536/insights/3CBiZVgC
- **Story views by story** (breakdown by `story_slug`): https://us.posthog.com/project/401536/insights/oEcFskle
- **Apply modal: opened vs dismissed:** https://us.posthog.com/project/401536/insights/xbjUUaYL

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
