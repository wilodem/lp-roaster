import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const forcedBump = process.argv[2];
const allowedBumps = new Set(["patch", "minor", "major"]);

if (forcedBump && !allowedBumps.has(forcedBump)) {
  fail("Usage: pnpm version:bump [patch|minor|major]");
}

assertCleanWorkingTree();

const packagePath = new URL("../../package.json", import.meta.url);
const changelogPath = new URL("../../CHANGELOG.md", import.meta.url);
const pkg = JSON.parse(readFileSync(packagePath, "utf8"));
const currentVersion = String(pkg.version);
const commits = readCommitsSinceLastTag();
const bump = forcedBump ?? inferBump(commits);
const nextVersion = bumpVersion(currentVersion, bump);

pkg.version = nextVersion;
writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
writeFileSync(changelogPath, renderChangelog(nextVersion, commits, readFileSync(changelogPath, "utf8")));

run("git", ["add", "package.json", "CHANGELOG.md"]);
run("git", ["commit", "-m", `chore(release): v${nextVersion}`]);
run("git", ["tag", `v${nextVersion}`]);

console.log(`Released v${nextVersion}`);

function assertCleanWorkingTree() {
  const status = run("git", ["status", "--porcelain"], { allowFailure: true });

  if (status.trim()) {
    fail("Working tree must be clean before running a version bump.");
  }
}

function readCommitsSinceLastTag() {
  const lastTag = run("git", ["describe", "--tags", "--match", "v*", "--abbrev=0"], { allowFailure: true }).trim();
  const range = lastTag ? `${lastTag}..HEAD` : "HEAD";
  const output = run("git", ["log", range, "--format=%B%x1e"], { allowFailure: true }).trim();

  return output
    .split("\x1e")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function inferBump(commits) {
  if (commits.some((commit) => commit.includes("BREAKING CHANGE") || /^[a-z]+(?:\([^)]+\))?!:/.test(commit))) {
    return "major";
  }

  if (commits.some((commit) => commit.startsWith("feat"))) {
    return "minor";
  }

  return "patch";
}

function bumpVersion(version, bump) {
  const [major, minor, patch] = version.split(".").map(Number);

  if ([major, minor, patch].some((part) => Number.isNaN(part))) {
    fail(`Invalid package version: ${version}`);
  }

  if (bump === "major") return `${major + 1}.0.0`;
  if (bump === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

function renderChangelog(version, commits, previous) {
  const date = new Date().toISOString().slice(0, 10);
  const lines = commits.length
    ? commits.map((commit) => `- ${commit.split("\n")[0]}`).join("\n")
    : "- Version bump.";
  const entry = `# Changelog\n\n## ${version} - ${date}\n\n${lines}\n\n`;

  return previous.replace(/^# Changelog\s*\n+/u, entry);
}

function run(command, args, options = {}) {
  try {
    return execFileSync(command, args, {
      cwd: new URL("../../", import.meta.url),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    if (options.allowFailure) {
      return error.stdout?.toString() ?? "";
    }

    throw error;
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
