# Roadmap

Landing Page Roaster is intentionally small for the recruiting MVP. This roadmap tracks useful follow-up work without turning the project into a SaaS platform.

## 0.1.x - MVP Hardening

- Add a sample screenshot flow so reviewers can test without preparing a file.
- Add a mock-analysis mode for demos without spending model tokens.
- Improve upload errors with exact file size and accepted types.
- Add one browser-level smoke test for the empty, loading, and error states.
- Keep optional tuning controls collapsed by default so first-time users see the upload promise before model and cost tradeoffs.

## 0.2.x - Better Critique Quality

- Refine the compact allowlisted OpenRouter model selector as model pricing and routing quality change.
- Add per-finding confidence and evidence snippets.
- Add a visual hierarchy checklist that the prompt can reference.
- Add a local Imgflip-derived meme verdict that classifies each roast into one offline template.
- Add a compact export format for sharing the teardown in Slack or GitHub issues.
- Add screenshot crop guidance for full-page versus above-the-fold analysis.

## Later

- Optional URL-to-screenshot capture.
- Side-by-side before/after hero rewrite mode.
- Lightweight evaluation set for prompt regressions.
- Vercel preview deployment smoke checks once the project is connected to Vercel Git Integration.
