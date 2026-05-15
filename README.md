# lp-roaster

Landing Page Roaster is a rapid MVP for reviewing landing page screenshots with an AI vision model. Upload a PNG, JPG, or WebP screenshot, choose the roast intensity, and get a structured UX and copy teardown with practical fixes.

## Stack

- Next.js App Router
- React + TypeScript
- Custom CSS, no Tailwind, Mantine, or AntD
- OpenRouter vision via the OpenAI-compatible SDK
- Zod for request and response validation

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Set the required environment variable:

```bash
OPENROUTER_API_KEY=sk-or-v1-your-key
```

Optional environment variables:

```bash
OPENROUTER_MODEL=google/gemini-3.1-flash-lite
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_APP_TITLE=Landing Page Roaster
OPENROUTER_SITE_URL=http://localhost:3000
```

The UI also exposes a small allowlist of popular OpenRouter vision models. Submitted model IDs are validated server-side; arbitrary model IDs are rejected.

## Commands

```bash
pnpm dev
pnpm lint
pnpm test
pnpm build
```

## API Contract

`POST /api/roast` accepts `multipart/form-data`:

- `screenshot`: PNG, JPG, or WebP under 4 MB
- `intensity`: `helpful`, `spicy`, or `savage`
- `focusAreas`: one or more of `visual-hierarchy`, `messaging`, `cta`, `trust`, `conversion-friction`, `accessibility`
- `model` (optional): one of the server allowlisted OpenRouter vision models

The response is structured JSON containing score, roast, findings, hero copy rewrites, action plan, model, and latency.

## Deploy To Vercel

1. Push this repo to `https://github.com/wilodem/lp-roaster.git`.
2. Import the GitHub repo in Vercel.
3. Add `OPENROUTER_API_KEY` to Vercel Environment Variables.
4. Deploy with the default Next.js settings.

The app is intentionally single-service: no database, auth, queue, vector store, or background worker.

## Git And Versioning

Use Conventional Commits:

```bash
git commit -m "feat: add landing page roaster mvp"
git commit -m "fix: handle oversized screenshots"
git commit -m "docs: explain OpenRouter setup"
```

The package starts at `0.1.0`. Future bumps can be created with:

```bash
pnpm version:bump
pnpm version:patch
pnpm version:minor
pnpm version:major
```

The bump script updates `package.json`, prepends `CHANGELOG.md`, creates a release commit, and tags it as `vX.Y.Z`.

## Roadmap

Planned follow-up work is tracked in [ROADMAP.md](ROADMAP.md). Keep it practical: small MVP hardening, critique quality improvements, and only later optional capture/export features.
