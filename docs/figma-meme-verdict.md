# Figma Handoff - Meme Verdict

Use this as the Figma spec for the `Meme verdict` slot if the app is pushed into a design file.

Figma file: https://www.figma.com/design/eYqYb1t9elVie5IrOfKbvQ

## Placement

- Results panel only, directly after `Action plan`.
- Full-width card using the existing 8px radius, 1px border, and 16px internal padding.
- Desktop layout: two columns, media on the left and copy/source on the right.
- Mobile layout: one column, title row stacked, media above copy.

## Anatomy

- Eyebrow: `Meme verdict`
- Heading: `The final read`
- Media: local image or looping muted video from `public/memes/imgflip/`
- Overlay caption: bold, uppercase, Impact-style white text with dark outline/shadow
- Copy: template name, generated reason, and a low-emphasis `Template source: Imgflip` link

## Responsive Rules

- Media frame keeps a dark background and `object-fit: contain` so wide and vertical templates never crop.
- Caption sits inside the media frame near the bottom and wraps without covering the adjacent reason copy.
- Media max height is 320px on desktop; mobile stacks the content and lets the frame keep the same containment behavior.
- Reason copy should wrap naturally and never overlay the media.
- Source attribution should be barely visible: muted gray, smaller than body copy, and not bold.

## States

- Loaded image template
- Loaded video template
- Missing template fallback with accessible label

## Empty Result And Sample Preview

- Default empty result state should stay calm and point back to the upload as step 1.
- Sample result is hidden by default behind a small secondary `See sample result` toggle.
- Expanded sample preview reuses the existing sample score, roast, findings, and action plan blocks.
- Desktop variant keeps the placeholder centered in the result panel; mobile variant keeps the placeholder compact before the collapsed sample toggle.
