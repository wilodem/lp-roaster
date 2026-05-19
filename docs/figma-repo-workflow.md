# Figma Repo Workflow

This project uses Figma Professional, so official Figma Code Connect is not available for this file. Keep this document as the lightweight replacement: the repo remains the source of truth, while Figma stays a synchronized design and handoff canvas.

Figma file: https://www.figma.com/design/i1frP3uoM5i4FMzUI5JQx5/Landing-Page-Roaster?node-id=2-2

## Code Connect Status

- Do not add `@figma/code-connect`, `.figma.ts`, `.figma.tsx`, or `figma.config.json` while the account is on Figma Professional.
- Do not publish Code Connect mappings from this repo until the Figma workspace is upgraded to Organization or Enterprise.
- Keep component naming in Figma close to the future code component names so the project can migrate to Code Connect later without renaming the canvas from scratch.

## Source Of Truth

- App UI: `app/components/roaster-app.tsx`
- App styles: `app/globals.css`
- LLM prompt and response contract: `app/lib/roast-prompt.ts`, `app/lib/roast-schema.ts`, `app/types/roast.ts`
- Prompt notes: `docs/llm/README.md`

When UI and Figma differ, update the app first, verify it locally, then sync Figma.

## Sync Workflow

1. Change the app or prompt in the repo.
2. Run `pnpm lint`, `pnpm test`, and `pnpm build` for source changes.
3. For UI changes, compare the live app against the Figma state with screenshots or browser smoke checks.
4. Update the matching Figma nodes through MCP, preserving the component-style names below.
5. Update this map if node ids, section order, or major UI anatomy changes.

## Figma Node Map

| Area | Figma nodes | Code anchor |
| --- | --- | --- |
| Canvas | `2:2` `Landing Page Roaster MVP` | Whole app in `RoasterApp` |
| Screen states | `2:3` Empty upload, `84:12` Ready to roast, `2:88` Analyzing, `2:165` Results, `54:2` Error | `workspaceState`, `EmptyResults`, `LoadingState`, `Results` |
| Header and title | Header text in every screen: `2:4`, `2:5`, `67:2`, `84:13`, `84:14`, `84:106`, `2:166`, `2:167`, `67:4`, `54:3`, `54:4`, `67:5` | `.topbar`, `.hero-subcopy` |
| `BenefitPill` | Empty: `2:6`, `2:8`, `2:10`; Ready: `84:15`, `84:19`, `84:23`; Analyzing: `2:91`, `2:93`, `2:95`; Results: `2:168`, `2:170`, `2:172`; Error: `54:5`, `54:9`, `54:13` | `.benefit-list > span`, `Check` icon |
| `InputPanel` | Empty `2:12`, Ready `84:27`, Analyzing `2:97`, Results `2:174`, Error `54:17` | `.tool-panel.input-panel`, `.panel-heading` |
| `UploadDropzone` | Empty `25:6`, Ready `84:31`, Analyzing `25:59`, Results `25:112`, Error `54:21` | `.dropzone`, `.upload-icon`, `.upload-text`, `.upload-meta` |
| `PrimaryActionButton` | Empty hidden `25:22`, Ready `84:54`, Analyzing `25:75`, Results `25:128`, Error `54:44` | `.primary-action`, `WandSparkles`, `LoaderCircle` |
| `ScreenshotPreview` | Empty `25:10`, Ready `84:42`, Analyzing `25:63`, Results `25:116`, Error `54:32` | `.preview-frame`, `MockLandingPage` |
| `AdvancedSettingsSummary` | Empty `25:25`, Ready `84:65`, Analyzing `25:78`, Results `25:131`, Error `54:55` | `.tuning-panel`, `.tuning-summary` |
| `AdvancedSettingsExpanded` | Empty reference `67:27`, Ready reference `84:107` | `.tuning-body`, `.segmented`, `.chip-grid`, `.model-option-grid` |
| `ModelOption` | Empty `67:59`, `67:66`, `67:70`, `67:74`, `67:78`; Ready `84:139`, `84:146`, `84:150`, `84:154`, `84:158` | `.model-option`, `.model-choice`, `.model-price-trigger` |
| `ModelPriceTooltip` | Empty `67:63`, Ready `84:143` | `.model-price-tooltip` |
| `ResultPanel` | `2:220` | `.tool-panel.result-panel`, `Results` |
| `ResultHero` | `129:2` score tile, `129:5` eyebrow, `129:6` verdict, `129:7` audience, `129:8` copy button, `129:11` divider | `.result-hero`, `.score-tile`, `.audience-line`, `CopyButton` |
| `CopyButton` | `129:8` | `.copy-button`, `CopyButton` |
| `RoastReadout` | `129:12` spicy roast | `.roast-readout`, `.roast-strip` |
| `MemeVerdict` | `129:16`, media `129:19`, template/reason/source `129:21`-`129:23` | `.meme-panel`, `MemeVerdict` |
| `FindingCard` | `129:26`, `129:33`, `129:40`, `129:47` | `.findings-grid`, `.finding-card` |
| `Fixes` | Copy fix `129:56`, action plan `129:68` | `.fixes-section`, `.rewrite-panel`, `.action-list`, `.action-item` |
| `TechnicalDetails` | Collapsed `129:86`, expanded reference `129:90` | `.technical-panel`, `TechnicalDetails` |
| `EmptyResultPanel` | Empty `2:58`, Ready `84:75`, Error `54:165` | `.empty-start`, `EmptyResults` |
| `LoadingResultPanel` | `2:143` | `.loading-state`, `.loading-track`, `.loading-steps` |
| `ErrorBanner` | `54:159` | `.error-banner` |
| `AnnotationCard` | Empty/ready annotations: `2:63`-`2:83`, `67:82`, `84:81`-`84:101`, `84:162`; results annotations: `2:256`-`2:271`, `111:6`; error annotations: `54:139`-`54:154` | Figma-only handoff notes |

## Naming Rules

- Use PascalCase names for reusable Figma element groups that should eventually become code components: `BenefitPill`, `InputPanel`, `UploadDropzone`, `PrimaryActionButton`, `AdvancedSettingsSummary`, `ModelOption`, `ScoreTile`, `FindingCard`, `AnnotationCard`.
- Keep state suffixes after a slash, for example `BenefitPill / No signup required` or `ModelOption / Balanced`.
- Keep Figma-only explanatory blocks named `AnnotationCard / ...` so they are not mistaken for app UI.
- Keep live UI text labels in text layer names only when helpful; the parent frame name should describe the component role.

## Future Upgrade Path

If the Figma workspace is upgraded to Organization or Enterprise:

1. Publish the reusable Figma components to a team library.
2. Add Code Connect tooling only after the published components exist.
3. Map reusable components first, not whole screens: `BenefitPill`, `PrimaryActionButton`, `ModelOption`, `ScoreTile`, `FindingCard`, `CopyButton`.
4. Preserve this file as the implementation checklist while creating `.figma.ts` templates.
