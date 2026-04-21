import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const scriptArgs = new Set(process.argv.slice(2));

const sourceEntry = path.join(root, "src", "main.tsx");
const scanExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".css"]);
const skipDirectories = new Set([".git", ".astro", "dist", "node_modules"]);
const conventionallyUsedPackages = new Set([
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "autoprefixer",
  "eslint",
  "jsdom",
  "postcss",
  "typescript",
  "vite",
  "vitest",
]);

function normalizePath(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function collectFiles(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (skipDirectories.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, files);
      continue;
    }

    if (scanExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function resolveLocalImport(specifier, importer) {
  const basePath = specifier.startsWith("@/")
    ? path.join(root, "src", specifier.slice(2))
    : specifier.startsWith(".")
      ? path.resolve(path.dirname(importer), specifier)
      : null;

  if (!basePath) {
    return null;
  }

  const candidates = [
    basePath,
    ...[".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".css"].map((extension) => `${basePath}${extension}`),
    ...[".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".css"].map((extension) => path.join(basePath, `index${extension}`)),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) ?? null;
}

function getPackageName(specifier) {
  if (!specifier || specifier.startsWith(".") || specifier.startsWith("/") || specifier.startsWith("@/")) {
    return null;
  }

  if (specifier.startsWith("@")) {
    return specifier.split("/").slice(0, 2).join("/");
  }

  return specifier.split("/")[0];
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const packageRefs = new Set();
  const localRefs = new Set();
  const patterns = [
    /import\s+(?:[^"'`]+?from\s+)?["'`]([^"'`]+)["'`]/g,
    /export\s+[^"'`]*?from\s+["'`]([^"'`]+)["'`]/g,
    /require\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
    /@import\s+["'`]([^"'`]+)["'`]/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content))) {
      const specifier = match[1];
      const resolved = resolveLocalImport(specifier, filePath);

      if (resolved) {
        localRefs.add(resolved);
        continue;
      }

      const packageName = getPackageName(specifier);
      if (packageName) {
        packageRefs.add(packageName);
      }
    }
  }

  return { localRefs: [...localRefs], packageRefs: [...packageRefs] };
}

const files = collectFiles(root);
const graph = new Map();
for (const file of files) {
  graph.set(file, scanFile(file));
}

const reachableSourceFiles = new Set();
const pending = fs.existsSync(sourceEntry) ? [sourceEntry] : [];
while (pending.length > 0) {
  const file = pending.pop();
  if (!file || reachableSourceFiles.has(file)) {
    continue;
  }

  reachableSourceFiles.add(file);
  const entry = graph.get(file);
  if (!entry) {
    continue;
  }

  for (const localRef of entry.localRefs) {
    if (localRef.includes(`${path.sep}src${path.sep}`) || normalizePath(localRef).startsWith("src/")) {
      pending.push(localRef);
    }
  }
}

const declaredPackages = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

const allRefs = new Map();
const reachableRefs = new Map();
const orphanSourceRefs = new Map();

for (const [file, { packageRefs }] of graph.entries()) {
  const relativeFile = normalizePath(file);
  const isSourceFile = relativeFile.startsWith("src/");
  const isReachableSourceFile = reachableSourceFiles.has(file);

  for (const packageName of packageRefs) {
    if (!allRefs.has(packageName)) {
      allRefs.set(packageName, []);
      reachableRefs.set(packageName, []);
      orphanSourceRefs.set(packageName, []);
    }

    allRefs.get(packageName).push(relativeFile);

    if (isReachableSourceFile) {
      reachableRefs.get(packageName).push(relativeFile);
    } else if (isSourceFile) {
      orphanSourceRefs.get(packageName).push(relativeFile);
    }
  }
}

const unusedPackages = [];
const orphanOnlyPackages = [];
const orphanOnlyPackageNames = new Set();

for (const packageName of Object.keys(declaredPackages).sort()) {
  if (conventionallyUsedPackages.has(packageName)) {
    continue;
  }

  const refs = allRefs.get(packageName) ?? [];
  const liveRefs = reachableRefs.get(packageName) ?? [];
  const orphanRefs = orphanSourceRefs.get(packageName) ?? [];
  const nonSourceRefs = refs.filter((file) => !file.startsWith("src/"));

  if (liveRefs.length === 0 && orphanRefs.length > 0 && nonSourceRefs.length === 0) {
    orphanOnlyPackages.push({ packageName, refs: orphanRefs.sort() });
    orphanOnlyPackageNames.add(packageName);
  }
}

const orphanPeerSupportPackages = [];

for (const packageName of Object.keys(declaredPackages).sort()) {
  if (conventionallyUsedPackages.has(packageName)) {
    continue;
  }

  const refs = allRefs.get(packageName) ?? [];
  if (refs.length > 0) {
    continue;
  }

  const supportedBy = [];
  for (const orphanPackageName of orphanOnlyPackageNames) {
    const manifestPath = path.join(root, "node_modules", orphanPackageName, "package.json");
    if (!fs.existsSync(manifestPath)) {
      continue;
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (manifest.peerDependencies && manifest.peerDependencies[packageName]) {
      supportedBy.push(orphanPackageName);
    }
  }

  if (supportedBy.length > 0) {
    orphanPeerSupportPackages.push({ packageName, supportedBy: supportedBy.sort() });
    continue;
  }

  unusedPackages.push(packageName);
}

if (unusedPackages.length === 0) {
  console.log("No fully unused direct dependencies found.");
} else {
  console.log("Unused direct dependencies:");
  for (const packageName of unusedPackages) {
    console.log(`- ${packageName}`);
  }
}

if (orphanPeerSupportPackages.length > 0) {
  console.log("\nDirect dependencies only kept to satisfy orphan-only source files:");
  for (const { packageName, supportedBy } of orphanPeerSupportPackages) {
    console.log(`- ${packageName}: peer for ${supportedBy.join(", ")}`);
  }
}

if (orphanOnlyPackages.length > 0) {
  console.log("\nDependencies referenced only from source files that are not reachable from src/main.tsx:");
  for (const { packageName, refs } of orphanOnlyPackages) {
    console.log(`- ${packageName}: ${refs.join(", ")}`);
  }
}

if (scriptArgs.has("--strict") && (unusedPackages.length > 0 || orphanOnlyPackages.length > 0)) {
  process.exitCode = 1;
}
