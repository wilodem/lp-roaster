# LLM Notes

## Prompt Strategy

The app sends a single screenshot to an OpenRouter vision model. The prompt asks the model to act as a senior UX and conversion copywriter, assess only visible evidence, and return JSON only.

The critique is intentionally split into:

- `summary`: page type, audience, score, one-line verdict
- `roast`: memorable but useful critique
- `findings`: evidence-backed UX/copy issues
- `rewrites`: improved headline, subheadline, CTA
- `actionPlan`: prioritized next fixes

The server adds `meta` after validation, because model and latency are runtime facts rather than model-generated content.

## Model Contract

The route uses OpenRouter chat completions with:

- text prompt
- image data URL
- `response_format: json_schema`
- OpenRouter `response-healing` for malformed JSON recovery
- `provider.require_parameters` so routing does not silently ignore structured output requirements

The parsed model output is validated again with Zod before being returned to the client.

The UI can request one of a small server-validated OpenRouter model allowlist from the collapsed Advanced settings panel:

- `google/gemini-3.1-flash-lite` - default fast-value demo model
- `openai/gpt-5.4-mini` - balanced recognizable-provider option
- `x-ai/grok-4.3` - sharp, efficient output-cost option
- `anthropic/claude-sonnet-4.6` - strongest routine UX/copy critique option
- `anthropic/claude-opus-4.7` - premium deeper critique option

All allowlisted models were checked against OpenRouter metadata on 2026-05-15 for image input, text output, `response_format`, and `structured_outputs`. The server still accepts `OPENROUTER_MODEL` as an operator-controlled fallback when no UI model is submitted. Approximate prices are kept in the allowlist and exposed as a hover/focus/tap tooltip in Advanced settings, so cost context remains available without making token prices part of the first-run upload flow.

Gemini and Grok use `provider.require_parameters: true` so OpenRouter only routes to endpoints that explicitly support the full structured-output request. OpenAI receives `response_format: json_schema` without strict provider routing. Anthropic receives the JSON shape in the prompt only, because OpenRouter/Anthropic can reject the multimodal request when native schema parameters are forwarded. The app still parses and validates every response with Zod before returning it.

Prompt-shaped responses are normalized for common near misses before validation, such as category casing, `score` or `priority` strings, and alternate field names like `why`, `fix`, or `nextSteps`.

## Edge Cases

- Missing screenshot: 400 with a human-readable message.
- Empty file: 400.
- Unsupported MIME type: 400.
- Screenshot over 4 MB: 400.
- Missing `OPENROUTER_API_KEY`: clear 500 config error.
- Unknown submitted model ID: 400 request validation error.
- Invalid model JSON: clear retryable 500 error.

## AI Usage In Development

AI assistance was used to compare task options, choose the Landing Page Roaster direction, shape the UX architecture, design the schema-first AI response, and implement the prototype quickly while keeping the scope small.
