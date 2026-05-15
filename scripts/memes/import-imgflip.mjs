import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");
const assetDir = path.join(rootDir, "public/memes/imgflip");
const manifestPath = path.join(rootDir, "app/lib/meme-library.ts");
const docsPath = path.join(rootDir, "docs/meme-library.md");

const imageLimit = 48;
const gifLimit = 8;
const maxBytes = 1_750_000;

const blockedNamePatterns = [
  /\bbernie\b/i,
  /\bbiden\b/i,
  /\btrump\b/i,
  /\bbush\b/i,
  /\bobama\b/i,
  /\bhitler\b/i,
  /\b9\/11\b/i,
  /\bgun\b/i,
  /\bgrave\b/i,
  /\bdead\b/i,
  /\bkill/i,
  /\bdrown/i,
  /\bslap/i,
  /\bschool bus\b/i,
  /\bno bitches\b/i,
  /\bnaked\b/i,
  /\bsucking\b/i,
];

const tagRules = [
  {
    tag: "unclear-cta",
    patterns: [
      /button/i,
      /choice/i,
      /simply/i,
      /offer/i,
      /think/i,
      /paths/i,
      /exit/i,
      /pigeon/i,
      /butterfly/i,
    ],
  },
  {
    tag: "generic-copy",
    patterns: [/drake/i, /gru/i, /change/i, /mind/i, /same picture/i, /mocking/i, /scroll/i, /ancient/i],
  },
  {
    tag: "missing-trust",
    patterns: [/skeleton/i, /pablo/i, /trophy/i, /pain/i, /safe/i, /achievement/i, /letter/i],
  },
  {
    tag: "visual-chaos",
    patterns: [/distracted/i, /yelling/i, /expanding/i, /clown/i, /chopper/i, /conspiracy/i, /table/i],
  },
  {
    tag: "overpromising",
    patterns: [/always/i, /disaster/i, /trade/i, /cinema/i, /oprah/i, /tape/i, /cheers/i],
  },
  {
    tag: "slow-decision",
    patterns: [/waiting/i, /thinking/i, /skeleton/i, /confused/i, /wall/i, /disappearing/i, /reading/i],
  },
];

const fallbackTags = {
  image: ["generic-copy", "unclear-cta"],
  video: ["slow-decision", "visual-chaos"],
};

async function main() {
  await mkdir(assetDir, { recursive: true });

  const [imageMemes, gifMemes] = await Promise.all([fetchMemes("image"), fetchMemes("gif")]);
  const selected = [
    ...selectMemes(imageMemes, "image", imageLimit),
    ...selectMemes(gifMemes, "video", gifLimit),
  ];

  const templates = [];

  for (const meme of selected) {
    const template = await downloadTemplate(meme);

    if (template) {
      templates.push(template);
    }
  }

  await removeStaleAssets(new Set(templates.map((template) => path.basename(template.localPath))));
  await writeFile(manifestPath, buildManifest(templates), "utf8");
  await writeFile(docsPath, buildDocs(templates), "utf8");

  console.log(`Imported ${templates.length} Imgflip templates.`);
  console.log(`Assets: ${path.relative(rootDir, assetDir)}`);
  console.log(`Manifest: ${path.relative(rootDir, manifestPath)}`);
  console.log(`Docs: ${path.relative(rootDir, docsPath)}`);
}

async function removeStaleAssets(activeFileNames) {
  const files = await readdir(assetDir);

  await Promise.all(
    files
      .filter((fileName) => !activeFileNames.has(fileName))
      .map((fileName) => rm(path.join(assetDir, fileName), { force: true })),
  );
}

async function fetchMemes(type) {
  const response = await fetch(`https://api.imgflip.com/get_memes?type=${type}`);

  if (!response.ok) {
    throw new Error(`Imgflip ${type} template fetch failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  if (!payload.success || !Array.isArray(payload.data?.memes)) {
    throw new Error(`Imgflip ${type} template response had an unexpected shape.`);
  }

  return payload.data.memes;
}

function selectMemes(memes, mediaType, limit) {
  return memes
    .filter((meme) => !blockedNamePatterns.some((pattern) => pattern.test(meme.name)))
    .slice(0, limit)
    .map((meme) => ({
      sourceId: String(meme.id),
      name: meme.name,
      sourceUrl: meme.url,
      width: Number(meme.width),
      height: Number(meme.height),
      boxCount: Number(meme.box_count),
      mediaType,
    }));
}

async function downloadTemplate(meme) {
  const extension = getExtension(meme.sourceUrl);
  const slug = slugify(meme.name);
  const fileName = `${meme.sourceId}-${slug}.${extension}`;
  const filePath = path.join(assetDir, fileName);
  const localPath = `/memes/imgflip/${fileName}`;
  const existing = await readExisting(filePath);

  if (existing) {
    return buildTemplate(meme, localPath, existing.byteLength);
  }

  const response = await fetch(meme.sourceUrl);

  if (!response.ok) {
    console.warn(`Skipping ${meme.name}: ${response.status} ${response.statusText}`);
    return null;
  }

  const contentLength = Number(response.headers.get("content-length"));

  if (contentLength && contentLength > maxBytes) {
    console.warn(`Skipping ${meme.name}: ${contentLength} bytes exceeds ${maxBytes}.`);
    return null;
  }

  const bytes = Buffer.from(await response.arrayBuffer());

  if (bytes.byteLength > maxBytes) {
    console.warn(`Skipping ${meme.name}: ${bytes.byteLength} bytes exceeds ${maxBytes}.`);
    return null;
  }

  await writeFile(filePath, bytes);

  return buildTemplate(meme, localPath, bytes.byteLength);
}

async function readExisting(filePath) {
  try {
    return await readFile(filePath);
  } catch {
    return null;
  }
}

function buildTemplate(meme, localPath, byteSize) {
  const tags = inferTags(meme.name, meme.mediaType);

  return {
    id: `imgflip-${meme.sourceId}`,
    sourceId: meme.sourceId,
    name: meme.name,
    localPath,
    sourceUrl: meme.sourceUrl,
    sourcePageUrl: buildSourcePageUrl(meme),
    width: meme.width,
    height: meme.height,
    boxCount: meme.boxCount,
    mediaType: meme.mediaType,
    byteSize,
    tags,
  };
}

function inferTags(name, mediaType) {
  const tags = new Set();

  for (const rule of tagRules) {
    if (rule.patterns.some((pattern) => pattern.test(name))) {
      tags.add(rule.tag);
    }
  }

  if (tags.size === 0) {
    for (const tag of fallbackTags[mediaType]) {
      tags.add(tag);
    }
  }

  return [...tags].slice(0, 3);
}

function buildSourcePageUrl(meme) {
  const slug = slugify(meme.name);
  const section = meme.mediaType === "video" ? "gif-templates" : "memegenerator";

  return `https://imgflip.com/${section}/${meme.sourceId}/${slug}`;
}

function getExtension(url) {
  const extension = new URL(url).pathname.split(".").pop()?.toLowerCase();

  if (extension && /^[a-z0-9]+$/.test(extension)) {
    return extension === "jpeg" ? "jpg" : extension;
  }

  return "jpg";
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function buildManifest(templates) {
  return `export type MemeTag =
  | "unclear-cta"
  | "generic-copy"
  | "missing-trust"
  | "visual-chaos"
  | "overpromising"
  | "slow-decision";

export type MemeMediaType = "image" | "video";

export type MemeTemplate = {
  id: string;
  sourceId: string;
  name: string;
  localPath: string;
  sourceUrl: string;
  sourcePageUrl: string;
  width: number;
  height: number;
  boxCount: number;
  mediaType: MemeMediaType;
  byteSize: number;
  tags: MemeTag[];
};

export const MEME_TEMPLATES = ${JSON.stringify(templates, null, 2)} satisfies MemeTemplate[];

export const MEME_TEMPLATE_IDS = MEME_TEMPLATES.map((template) => template.id);

export function getMemeTemplate(templateId: string) {
  return MEME_TEMPLATES.find((template) => template.id === templateId) ?? null;
}

export function formatMemeTemplateOptions() {
  return MEME_TEMPLATES.map(
    (template) =>
      \`- \${template.id}: \${template.name}; media=\${template.mediaType}; tags=\${template.tags.join(", ")}\`,
  ).join("\\n");
}
`;
}

function buildDocs(templates) {
  const rows = templates
    .map(
      (template) =>
        `| \`${template.id}\` | ${escapeMarkdown(template.name)} | ${template.mediaType} | ${template.width}x${template.height} | ${template.tags.join(", ")} | [Imgflip](${template.sourcePageUrl}) |`,
    )
    .join("\n");

  return `# Meme Library

This project keeps a local Imgflip-derived template library so the runtime app does not call Imgflip, does not need Imgflip credentials, and still works with only \`OPENROUTER_API_KEY\` configured.

## Import Rules

- Source endpoint: \`https://api.imgflip.com/get_memes\` with \`type=image\` and \`type=gif\`.
- Captioning endpoints are intentionally not used because \`/caption_image\` requires an Imgflip account and \`/caption_gif\` is Premium.
- The importer keeps a small private-MVP library, filters obvious politics, violent wording, adult wording, and very large assets, then stores files under \`public/memes/imgflip/\`.
- The model classifies the finished roast into one local \`templateId\` and writes a short overlay \`caption\`; it does not generate meme images.

## Templates

| ID | Name | Media | Size | Tags | Source |
| --- | --- | --- | --- | --- | --- |
${rows}

## Refreshing

Run:

\`\`\`bash
pnpm memes:import
\`\`\`

Review the generated manifest and this document before committing, because Imgflip's popular-template order can change over time.
`;
}

function escapeMarkdown(value) {
  return value.replace(/\|/g, "\\|");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
