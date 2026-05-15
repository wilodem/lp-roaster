# Technical Guidelines

This document is the lightweight engineering source of truth for `lp-roaster`. Keep it practical: the app is a small MVP, so prefer clear boundaries and focused tests over framework churn or broad abstractions.

## Next.js And React

- Use the Next.js App Router. Route UI lives under `app/`, with thin route files such as `app/page.tsx` delegating to focused components.
- Treat Server Components as the default. Add `"use client"` only when a component needs local state, event handlers, refs, effects, browser APIs, file inputs, clipboard access, or drag-and-drop.
- Push client components as low in the tree as the feature allows. Keep server-only data fetching, SDK calls, environment variables, and AI integration out of client components.
- Put reusable UI in `app/components`, domain and integration helpers in `app/lib`, shared TypeScript response shapes in `app/types`, and runtime validation in Zod schemas.
- Keep TypeScript strict. Prefer explicit domain types and schema-derived validation over loosely shaped objects.

## Styling

- Use custom CSS in `app/globals.css`.
- Do not add Tailwind, Mantine, AntD, shadcn, auth scaffolds, dashboards, or SaaS boilerplate.
- Use existing visual patterns before inventing new ones. Lucide icons are fine when they support an existing control or state.
- Keep the first screen as the usable roaster tool, not a marketing landing page.

## API And AI Boundary

- Use Route Handlers for public API surfaces, uploads, and OpenRouter integration. `POST /api/roast` is the current public API contract.
- Validate request fields and files before calling side-effectful AI code. Use `parseRoastForm`, `validateScreenshotFile`, and the Zod schemas as the request boundary.
- Keep OpenRouter calls server-side only. Client components should call the local API route, never the OpenRouter SDK or OpenRouter credentials directly.
- Keep prompt construction, model allowlists, structured output schemas, and model response parsing in `app/lib`.
- Validate model output with `roastModelOutputSchema` before returning it. Add runtime metadata, such as model and latency, on the server after validation.
- Return predictable JSON errors. Use 400 responses for invalid user input and 500 responses for configuration or upstream analysis failures.

## Testing

- Use Vitest as the default test runner with the Node environment configured in `vitest.config.ts`.
- Write unit tests for pure or mostly pure `app/lib` behavior, such as file validation, request parsing, schema handling, prompt/model JSON parsing, and error messages.
- Write Route Handler tests by importing the handler directly and mocking AI integration boundaries, as `tests/roast-route.test.ts` does for `analyzeLandingPageScreenshot`.
- Do not make live OpenRouter calls in automated tests. Keep test fixtures small and deterministic.
- Avoid snapshots for this MVP; assert meaningful behavior, response status, parsed payloads, and boundary calls.
- For future browser coverage, add a single Playwright smoke test that verifies the home empty state, upload preview, and mocked `/api/roast` loading, error, and success states.

## Change Checklist

- API changes: update the Zod schema, TypeScript response/request types, README API contract, and Route Handler tests together.
- UI changes: keep accessibility labels and loading/error states intact; consider whether the planned Playwright smoke test should cover the changed flow.
- AI changes: update the prompt notes in `docs/llm/README.md` when the prompt, model contract, allowlist, or response shape changes.
- Before handing off implementation work, run `pnpm lint`, `pnpm test`, and `pnpm build`.
