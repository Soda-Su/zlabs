<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your project. The project already had a solid PostHog foundation in place — `posthog-js` was installed, `instrumentation-client.ts` initialized PostHog using the `NEXT_PUBLIC_POSTHOG_KEY` env variable, and `next.config.mjs` had the reverse-proxy rewrites configured. Several critical events were already being captured across the conversion funnel. The wizard verified and updated the environment variables, added the missing `story_cta_clicked` event via a new `StoryCTALink` client component, and connected it across all three story pages.

| Event | Description | File |
|---|---|---|
| `beta_email_submitted` | User enters email in hero or footer invite form | `app/invite-form.tsx` |
| `apply_modal_opened` | Apply modal opens (with `email_prefilled` flag) | `app/home-apply-shell.tsx` |
| `apply_modal_dismissed` | Apply modal closed without submitting | `app/home-apply-shell.tsx` |
| `beta_profile_submitted` | Full beta application successfully submitted | `app/apply/application-form.tsx` |
| `beta_profile_submission_failed` | Beta application submission failed (with error message) | `app/apply/application-form.tsx` |
| `story_viewed` | User viewed a story page (with slug and title) | `app/stories/story-view-tracker.tsx` |
| `story_cta_clicked` | User clicked "Share your beta profile" CTA from a story aside | `app/stories/story-cta-link.tsx` |

User identification (`posthog.identify`) is called in `invite-form.tsx` on valid email submit and in `application-form.tsx` on successful profile submission. Exception capture (`posthog.captureException`) is called in `application-form.tsx` on submission errors.

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/401536/dashboard/1521103
- **Beta conversion funnel** (email → modal → profile submit): https://us.posthog.com/project/401536/insights/o5yroh8T
- **Story views over time** (broken down by story slug): https://us.posthog.com/project/401536/insights/dozXDohy
- **Story-to-application funnel** (viewed → CTA → submitted): https://us.posthog.com/project/401536/insights/QRguLExH
- **Apply modal: opened vs dismissed**: https://us.posthog.com/project/401536/insights/nsgQqL9u
- **Beta submission errors** (successes vs failures): https://us.posthog.com/project/401536/insights/qWncWeGO

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
