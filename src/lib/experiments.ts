import fs from "node:fs/promises";
import path from "node:path";

export interface ExperimentMetadata {
  id: string;
  title: string;
  description: string;
  mechanics: string[];
  dependencies: string[];
  filePath: string;
  approved: boolean;
  featured: boolean;
  generatedAt: string;
}

export interface ExperimentManifest {
  experiments: ExperimentMetadata[];
  stats: {
    total: number;
    approved: number;
    byMechanic: Record<string, number>;
  };
}

const MANIFEST_PATH = path.join(process.cwd(), "data/experiments-manifest.json");

/**
 * Load manifest from filesystem
 */
export async function loadManifest(): Promise<ExperimentManifest> {
  const content = await fs.readFile(MANIFEST_PATH, "utf-8");
  return JSON.parse(content);
}

/**
 * Save manifest to filesystem
 */
export async function saveManifest(manifest: ExperimentManifest): Promise<void> {
  await fs.writeFile(
    MANIFEST_PATH,
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );
}

/**
 * Get all approved experiments
 */
export async function getApprovedExperiments(): Promise<ExperimentMetadata[]> {
  const manifest = await loadManifest();
  return manifest.experiments.filter((exp) => exp.approved);
}

/**
 * Get random selection of experiments
 */
export function selectRandomExperiments(
  experiments: ExperimentMetadata[],
  count: number
): ExperimentMetadata[] {
  const shuffled = [...experiments].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Mark featured experiments (randomly select ~10%)
 */
export function markFeatured(
  experiments: ExperimentMetadata[]
): ExperimentMetadata[] {
  const featuredCount = Math.max(1, Math.floor(experiments.length * 0.1));
  const shuffled = [...experiments].sort(() => Math.random() - 0.5);

  return shuffled.map((exp, idx) => ({
    ...exp,
    featured: idx < featuredCount,
  }));
}

/**
 * Update experiment in manifest
 */
export async function updateExperiment(
  id: string,
  updates: Partial<ExperimentMetadata>
): Promise<void> {
  const manifest = await loadManifest();
  const index = manifest.experiments.findIndex((exp) => exp.id === id);

  if (index === -1) {
    throw new Error(`Experiment ${id} not found`);
  }

  manifest.experiments[index] = {
    ...manifest.experiments[index],
    ...updates,
  };

  // Update stats
  manifest.stats.total = manifest.experiments.length;
  manifest.stats.approved = manifest.experiments.filter(
    (exp) => exp.approved
  ).length;

  await saveManifest(manifest);
}

/**
 * Add new experiment to manifest
 */
export async function addExperiment(
  experiment: ExperimentMetadata
): Promise<void> {
  const manifest = await loadManifest();
  manifest.experiments.push(experiment);

  // Update stats
  manifest.stats.total = manifest.experiments.length;
  manifest.stats.approved = manifest.experiments.filter(
    (exp) => exp.approved
  ).length;

  // Update mechanics count
  for (const mechanic of experiment.mechanics) {
    manifest.stats.byMechanic[mechanic] =
      (manifest.stats.byMechanic[mechanic] || 0) + 1;
  }

  await saveManifest(manifest);
}

/**
 * Delete experiment from manifest
 */
export async function deleteExperiment(id: string): Promise<void> {
  const manifest = await loadManifest();
  const index = manifest.experiments.findIndex((exp) => exp.id === id);

  if (index === -1) {
    throw new Error(`Experiment ${id} not found`);
  }

  const experiment = manifest.experiments[index];
  manifest.experiments.splice(index, 1);

  // Update stats
  manifest.stats.total = manifest.experiments.length;
  manifest.stats.approved = manifest.experiments.filter(
    (exp) => exp.approved
  ).length;

  // Update mechanics count
  for (const mechanic of experiment.mechanics) {
    manifest.stats.byMechanic[mechanic] =
      Math.max(0, (manifest.stats.byMechanic[mechanic] || 0) - 1);
  }

  await saveManifest(manifest);
}
