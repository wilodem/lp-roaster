"use client";

import {
  AlertTriangle,
  Check,
  Clipboard,
  Flame,
  ImageUp,
  LoaderCircle,
  ScanSearch,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RoastAnalysis, RoastIntensity } from "@/app/types/roast";

type RoastPayload = {
  analysis: RoastAnalysis;
  error?: string;
  detail?: string;
};

const intensityOptions: Array<{ value: RoastIntensity; label: string; detail: string }> = [
  { value: "helpful", label: "Helpful", detail: "Clean critique" },
  { value: "spicy", label: "Spicy", detail: "Default heat" },
  { value: "savage", label: "Savage", detail: "Sharpest useful take" },
];

const focusOptions = [
  { value: "visual-hierarchy", label: "Hierarchy" },
  { value: "messaging", label: "Messaging" },
  { value: "cta", label: "CTA" },
  { value: "trust", label: "Trust" },
  { value: "conversion-friction", label: "Friction" },
  { value: "accessibility", label: "A11y" },
];

const categoryLabels: Record<string, string> = {
  "visual-hierarchy": "Hierarchy",
  messaging: "Messaging",
  cta: "CTA",
  trust: "Trust",
  "conversion-friction": "Friction",
  accessibility: "A11y",
};

export function RoasterApp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<RoastIntensity>("spicy");
  const [focusAreas, setFocusAreas] = useState<string[]>(["visual-hierarchy", "messaging", "cta"]);
  const [analysis, setAnalysis] = useState<RoastAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(
    () => () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    },
    [],
  );

  const selectedFileMeta = useMemo(() => {
    if (!file) return "PNG, JPG, or WebP under 4 MB";
    return `${file.name} / ${(file.size / 1024 / 1024).toFixed(2)} MB`;
  }, [file]);

  function handleFiles(files: FileList | null) {
    const nextFile = files?.[0];

    if (!nextFile) return;

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const nextPreviewUrl = URL.createObjectURL(nextFile);
    previewUrlRef.current = nextPreviewUrl;
    setFile(nextFile);
    setPreviewUrl(nextPreviewUrl);
    setAnalysis(null);
    setError(null);
  }

  function toggleFocusArea(value: string) {
    setFocusAreas((current) => {
      if (current.includes(value)) {
        return current.length === 1 ? current : current.filter((item) => item !== value);
      }

      return [...current, value];
    });
  }

  async function handleSubmit() {
    if (!file) {
      setError("Upload a screenshot first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setCopied(null);

    try {
      const formData = new FormData();
      formData.append("screenshot", file);
      formData.append("intensity", intensity);
      focusAreas.forEach((area) => formData.append("focusAreas", area));

      const response = await fetch("/api/roast", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as RoastPayload;

      if (!response.ok || !payload.analysis) {
        throw new Error(payload.detail ? `${payload.error}: ${payload.detail}` : payload.error ?? "Roast failed.");
      }

      setAnalysis(payload.analysis);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Roast failed.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyText(key: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1400);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">AI UX critique</p>
          <h1>Landing Page Roaster</h1>
        </div>
        <div className="stack-pills" aria-label="Project stack">
          <span>Next.js</span>
          <span>OpenRouter vision</span>
          <span>No RAG</span>
        </div>
      </header>

      <section className="workspace" aria-label="Roaster workspace">
        <div className="tool-panel input-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Screenshot</p>
              <h2>Give the page something to answer for</h2>
            </div>
            <ImageUp aria-hidden="true" />
          </div>

          <button
            className={`dropzone ${isDragging ? "is-dragging" : ""}`}
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              handleFiles(event.dataTransfer.files);
            }}
          >
            <input
              ref={inputRef}
              className="sr-only"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => handleFiles(event.target.files)}
            />
            <span className="upload-icon">
              <ScanSearch aria-hidden="true" />
            </span>
            <span className="upload-text">{file ? "Replace screenshot" : "Upload screenshot"}</span>
            <span className="upload-meta">{selectedFileMeta}</span>
          </button>

          <div className="preview-frame" aria-label="Screenshot preview">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="Uploaded landing page screenshot preview" />
            ) : (
              <MockLandingPage />
            )}
          </div>

          <div className="control-block">
            <div className="control-label">
              <span>Roast intensity</span>
              <Flame aria-hidden="true" />
            </div>
            <div className="segmented" role="radiogroup" aria-label="Roast intensity">
              {intensityOptions.map((option) => (
                <button
                  key={option.value}
                  className={intensity === option.value ? "is-selected" : ""}
                  type="button"
                  role="radio"
                  aria-checked={intensity === option.value}
                  onClick={() => setIntensity(option.value)}
                >
                  <strong>{option.label}</strong>
                  <span>{option.detail}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="control-block">
            <div className="control-label">
              <span>Focus areas</span>
              <Sparkles aria-hidden="true" />
            </div>
            <div className="chip-grid" aria-label="Focus areas">
              {focusOptions.map((option) => {
                const isSelected = focusAreas.includes(option.value);

                return (
                  <button
                    key={option.value}
                    className={isSelected ? "chip is-selected" : "chip"}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleFocusArea(option.value)}
                  >
                    {isSelected ? <Check aria-hidden="true" /> : null}
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {error ? (
            <div className="error-banner" role="alert">
              <AlertTriangle aria-hidden="true" />
              <span>{error}</span>
            </div>
          ) : null}

          <button className="primary-action" type="button" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <LoaderCircle className="spin" aria-hidden="true" /> : <WandSparkles aria-hidden="true" />}
            <span>{isLoading ? "Analyzing screenshot" : "Roast this page"}</span>
          </button>
        </div>

        <div className="tool-panel result-panel" aria-live="polite">
          {isLoading ? (
            <LoadingState />
          ) : analysis ? (
            <Results analysis={analysis} copied={copied} onCopy={copyText} />
          ) : (
            <EmptyResults />
          )}
        </div>
      </section>
    </main>
  );
}

function EmptyResults() {
  return (
    <div className="empty-results">
      <div className="empty-mark">
        <WandSparkles aria-hidden="true" />
      </div>
      <p className="eyebrow">Result</p>
      <h2>Ready for a screenshot.</h2>
      <p>Pick the heat level, upload the page, and the critique lands here.</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="loading-state">
      <div className="loading-header">
        <LoaderCircle className="spin" aria-hidden="true" />
        <div>
          <p className="eyebrow">Analyzing</p>
          <h2>Reading hierarchy, copy, trust, and CTA clarity.</h2>
        </div>
      </div>
      <div className="loading-track" aria-hidden="true">
        <span />
      </div>
      <div className="loading-steps">
        <span>Extracting visible signals</span>
        <span>Separating jokes from fixes</span>
        <span>Writing next-step recommendations</span>
      </div>
    </div>
  );
}

function Results({
  analysis,
  copied,
  onCopy,
}: {
  analysis: RoastAnalysis;
  copied: string | null;
  onCopy: (key: string, value: string) => Promise<void>;
}) {
  const summaryText = [
    `Score: ${analysis.summary.score}/100`,
    `Verdict: ${analysis.summary.verdict}`,
    "",
    `Roast: ${analysis.roast.title}`,
    analysis.roast.body,
    "",
    "Top fixes:",
    ...analysis.actionPlan.map((item) => `${item.priority}. ${item.label} - ${item.rationale}`),
  ].join("\n");

  const rewriteText = [
    `Headline: ${analysis.rewrites.headline}`,
    `Subheadline: ${analysis.rewrites.subheadline}`,
    `CTA: ${analysis.rewrites.cta}`,
  ].join("\n");

  return (
    <div className="results">
      <div className="result-hero">
        <div className="score-tile" aria-label={`Score ${analysis.summary.score} out of 100`}>
          <span>{analysis.summary.score}</span>
          <small>/100</small>
        </div>
        <div>
          <p className="eyebrow">{analysis.summary.pageType}</p>
          <h2>{analysis.summary.verdict}</h2>
          <p>{analysis.summary.audience}</p>
        </div>
        <CopyButton
          label="Copy summary"
          copied={copied === "summary"}
          onClick={() => onCopy("summary", summaryText)}
        />
      </div>

      <section className="roast-strip" aria-label="Roast">
        <div>
          <p className="eyebrow">{analysis.roast.severity} roast</p>
          <h3>{analysis.roast.title}</h3>
          <p>{analysis.roast.body}</p>
        </div>
      </section>

      <section className="findings-grid" aria-label="Findings">
        {analysis.findings.map((finding) => (
          <article className="finding-card" key={`${finding.category}-${finding.issue}`}>
            <div className="finding-topline">
              <span>{categoryLabels[finding.category] ?? finding.category}</span>
              <span>
                {finding.impact} impact / {finding.effort} effort
              </span>
            </div>
            <h3>{finding.issue}</h3>
            <p>{finding.evidence}</p>
            <strong>{finding.whyItMatters}</strong>
            <p>{finding.recommendation}</p>
          </article>
        ))}
      </section>

      <section className="rewrite-panel" aria-label="Suggested hero rewrite">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Rewrite</p>
            <h3>Sharper hero copy</h3>
          </div>
          <CopyButton label="Copy rewrite" copied={copied === "rewrite"} onClick={() => onCopy("rewrite", rewriteText)} />
        </div>
        <dl>
          <div>
            <dt>Headline</dt>
            <dd>{analysis.rewrites.headline}</dd>
          </div>
          <div>
            <dt>Subheadline</dt>
            <dd>{analysis.rewrites.subheadline}</dd>
          </div>
          <div>
            <dt>CTA</dt>
            <dd>{analysis.rewrites.cta}</dd>
          </div>
        </dl>
      </section>

      <section className="action-list" aria-label="Action plan">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Action plan</p>
            <h3>Fix in this order</h3>
          </div>
          <span className="model-pill">{analysis.meta.model}</span>
        </div>
        {analysis.actionPlan.map((item) => (
          <div className="action-item" key={item.priority}>
            <span>{item.priority}</span>
            <div>
              <strong>{item.label}</strong>
              <p>{item.rationale}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function CopyButton({ label, copied, onClick }: { label: string; copied: boolean; onClick: () => void }) {
  return (
    <button className="copy-button" type="button" title={label} onClick={onClick}>
      {copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

function MockLandingPage() {
  return (
    <div className="mock-page" aria-hidden="true">
      <div className="mock-nav">
        <span />
        <span />
        <span />
      </div>
      <div className="mock-hero">
        <span className="mock-title" />
        <span className="mock-title short" />
        <span className="mock-copy" />
        <span className="mock-copy narrow" />
        <span className="mock-cta" />
      </div>
      <div className="mock-side">
        <span />
        <span />
      </div>
    </div>
  );
}
