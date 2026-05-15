# LLM Notes

## Prompt Strategy

The app sends a single screenshot to an OpenRouter vision model. The prompt asks the model to act as a senior UX and conversion copywriter, assess only visible evidence, and return JSON only.

The critique is intentionally split into:

- `summary`: page type, audience, score, one-line verdict
- `roast`: memorable but useful critique
- `findings`: evidence-backed UX/copy issues
- `rewrites`: improved headline, subheadline, CTA
- `actionPlan`: prioritized next fixes
- `meta`: model and latency

## Model Contract

The route uses OpenRouter chat completions with:

- text prompt
- image data URL
- `response_format: json_schema`

The parsed model output is validated again with Zod before being returned to the client.

## Edge Cases

- Missing screenshot: 400 with a human-readable message.
- Empty file: 400.
- Unsupported MIME type: 400.
- Screenshot over 4 MB: 400.
- Missing `OPENROUTER_API_KEY`: clear 500 config error.
- Invalid model JSON: clear retryable 500 error.

## AI Usage In Development

AI assistance was used to compare task options, choose the Landing Page Roaster direction, shape the UX architecture, design the schema-first AI response, and implement the prototype quickly while keeping the scope small.
