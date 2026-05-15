# Agent Notes

This repo is a rapid Next.js MVP for a recruiting task. Keep changes small, visible, and easy to run.

Read [docs/technical-guidelines.md](docs/technical-guidelines.md) for the repo's lightweight engineering standards before changing React/Next.js components, API handlers, AI boundaries, or tests.

## Product

- The first screen is the usable tool, not a marketing page.
- The user uploads one landing page screenshot and gets an AI UX/copy critique.
- Keep the output structured: score, roast, findings, rewrites, action plan.

## Stack Rules

- Use Next.js App Router and TypeScript.
- Use custom CSS in `app/globals.css`.
- Do not add Tailwind, Mantine, AntD, shadcn, auth, DB, RAG, Qdrant, queues, or SaaS boilerplate or any related libraries or tools to the mentioned stack.
- Keep OpenRouter calls server-side only.
- Keep `OPENROUTER_API_KEY` as the only required env var.

## API

- `POST /api/roast` consumes `multipart/form-data`.
- Max upload size is 4 MB.
- Supported MIME types: `image/png`, `image/jpeg`, `image/webp`.
- Model output must validate against `roastAnalysisSchema`.

## Verification

Checklist before handing off:

- API changes update the Zod schema, README API contract, and Route Handler tests together.
- UI changes preserve accessible labels plus loading and error states; consider a browser smoke test for changed flows.
- AI changes update `docs/llm/README.md` when the prompt, model contract, allowlist, or response shape changes.
- Run lint, tests, and build.

Run before handing off:

```bash
pnpm lint
pnpm test
pnpm build
```

Use Conventional Commits for implementation commits and keep release tags in `vX.Y.Z` format.
