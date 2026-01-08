import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import {
  loadManifest,
  saveManifest,
  getApprovedExperiments,
  selectRandomExperiments,
  markFeatured,
  updateExperiment,
  addExperiment,
  deleteExperiment,
  type ExperimentMetadata,
  type ExperimentManifest,
} from "./experiments";

const TEST_MANIFEST_PATH = path.join(
  process.cwd(),
  "data/experiments-manifest.json"
);

describe("experiments utilities", () => {
  let originalManifest: string;

  // Backup and restore manifest before/after tests
  beforeEach(async () => {
    originalManifest = await fs.readFile(TEST_MANIFEST_PATH, "utf-8");
  });

  afterEach(async () => {
    await fs.writeFile(TEST_MANIFEST_PATH, originalManifest, "utf-8");
  });

  const createTestExperiment = (
    overrides: Partial<ExperimentMetadata> = {}
  ): ExperimentMetadata => ({
    id: `exp-${Date.now()}-${Math.random()}`,
    title: "Test Experiment",
    description: "A test experiment",
    mechanics: ["hover", "scroll"],
    dependencies: ["framer-motion"],
    filePath: "/experiments/test.tsx",
    approved: false,
    featured: false,
    generatedAt: new Date().toISOString(),
    ...overrides,
  });

  describe("loadManifest", () => {
    it("should load manifest from filesystem", async () => {
      const manifest = await loadManifest();

      expect(manifest).toHaveProperty("experiments");
      expect(manifest).toHaveProperty("stats");
      expect(Array.isArray(manifest.experiments)).toBe(true);
      expect(manifest.stats).toHaveProperty("total");
      expect(manifest.stats).toHaveProperty("approved");
      expect(manifest.stats).toHaveProperty("byMechanic");
    });
  });

  describe("saveManifest", () => {
    it("should save manifest to filesystem", async () => {
      const testManifest: ExperimentManifest = {
        experiments: [createTestExperiment({ id: "test-save" })],
        stats: {
          total: 1,
          approved: 0,
          byMechanic: { hover: 1, scroll: 1 },
        },
      };

      await saveManifest(testManifest);
      const loaded = await loadManifest();

      expect(loaded.experiments).toHaveLength(1);
      expect(loaded.experiments[0].id).toBe("test-save");
      expect(loaded.stats.total).toBe(1);
    });

    it("should format JSON with proper indentation", async () => {
      const testManifest: ExperimentManifest = {
        experiments: [],
        stats: { total: 0, approved: 0, byMechanic: {} },
      };

      await saveManifest(testManifest);
      const content = await fs.readFile(TEST_MANIFEST_PATH, "utf-8");

      // Check that it's properly formatted (has newlines and indentation)
      expect(content).toContain("\n");
      expect(content).toContain("  ");
    });
  });

  describe("getApprovedExperiments", () => {
    it("should return only approved experiments", async () => {
      const manifest: ExperimentManifest = {
        experiments: [
          createTestExperiment({ id: "exp-1", approved: true }),
          createTestExperiment({ id: "exp-2", approved: false }),
          createTestExperiment({ id: "exp-3", approved: true }),
        ],
        stats: { total: 3, approved: 2, byMechanic: {} },
      };
      await saveManifest(manifest);

      const approved = await getApprovedExperiments();

      expect(approved).toHaveLength(2);
      expect(approved.every((exp) => exp.approved)).toBe(true);
      expect(approved.map((exp) => exp.id)).toEqual(["exp-1", "exp-3"]);
    });

    it("should return empty array when no approved experiments", async () => {
      const manifest: ExperimentManifest = {
        experiments: [
          createTestExperiment({ approved: false }),
          createTestExperiment({ approved: false }),
        ],
        stats: { total: 2, approved: 0, byMechanic: {} },
      };
      await saveManifest(manifest);

      const approved = await getApprovedExperiments();

      expect(approved).toHaveLength(0);
    });
  });

  describe("selectRandomExperiments", () => {
    it("should return requested number of experiments", () => {
      const experiments = [
        createTestExperiment({ id: "exp-1" }),
        createTestExperiment({ id: "exp-2" }),
        createTestExperiment({ id: "exp-3" }),
        createTestExperiment({ id: "exp-4" }),
        createTestExperiment({ id: "exp-5" }),
      ];

      const selected = selectRandomExperiments(experiments, 3);

      expect(selected).toHaveLength(3);
      expect(experiments).toHaveLength(5); // Original unchanged
    });

    it("should return all experiments if count exceeds available", () => {
      const experiments = [
        createTestExperiment({ id: "exp-1" }),
        createTestExperiment({ id: "exp-2" }),
      ];

      const selected = selectRandomExperiments(experiments, 5);

      expect(selected).toHaveLength(2);
    });

    it("should not mutate original array", () => {
      const experiments = [
        createTestExperiment({ id: "exp-1" }),
        createTestExperiment({ id: "exp-2" }),
        createTestExperiment({ id: "exp-3" }),
      ];
      const originalOrder = experiments.map((exp) => exp.id);

      selectRandomExperiments(experiments, 2);

      expect(experiments.map((exp) => exp.id)).toEqual(originalOrder);
    });

    it("should return different results on multiple calls (probabilistic)", () => {
      const experiments = Array.from({ length: 20 }, (_, i) =>
        createTestExperiment({ id: `exp-${i}` })
      );

      // Run multiple times and check we get different orderings
      const results = Array.from({ length: 10 }, () =>
        selectRandomExperiments(experiments, 5)
          .map((exp) => exp.id)
          .join(",")
      );

      const uniqueResults = new Set(results);
      // Should have at least some variety (not all identical)
      expect(uniqueResults.size).toBeGreaterThan(1);
    });
  });

  describe("markFeatured", () => {
    it("should mark approximately 10% as featured", () => {
      const experiments = Array.from({ length: 50 }, (_, i) =>
        createTestExperiment({ id: `exp-${i}` })
      );

      const marked = markFeatured(experiments);

      const featuredCount = marked.filter((exp) => exp.featured).length;
      expect(featuredCount).toBe(5); // 10% of 50
    });

    it("should mark at least 1 as featured even with small sets", () => {
      const experiments = Array.from({ length: 3 }, (_, i) =>
        createTestExperiment({ id: `exp-${i}` })
      );

      const marked = markFeatured(experiments);

      const featuredCount = marked.filter((exp) => exp.featured).length;
      expect(featuredCount).toBeGreaterThanOrEqual(1);
    });

    it("should return same number of experiments", () => {
      const experiments = Array.from({ length: 10 }, (_, i) =>
        createTestExperiment({ id: `exp-${i}` })
      );

      const marked = markFeatured(experiments);

      expect(marked).toHaveLength(10);
    });

    it("should not mutate original array", () => {
      const experiments = [
        createTestExperiment({ id: "exp-1", featured: false }),
        createTestExperiment({ id: "exp-2", featured: false }),
      ];

      markFeatured(experiments);

      expect(experiments.every((exp) => exp.featured === false)).toBe(true);
    });

    it("should preserve other experiment properties", () => {
      const experiments = [
        createTestExperiment({
          id: "exp-1",
          title: "Original Title",
          approved: true,
        }),
      ];

      const marked = markFeatured(experiments);

      expect(marked[0].title).toBe("Original Title");
      expect(marked[0].approved).toBe(true);
      expect(marked[0].id).toBe("exp-1");
    });
  });

  describe("addExperiment", () => {
    it("should add experiment to manifest", async () => {
      const experiment = createTestExperiment({ id: "new-exp" });

      await addExperiment(experiment);
      const manifest = await loadManifest();

      expect(manifest.experiments).toHaveLength(1);
      expect(manifest.experiments[0].id).toBe("new-exp");
    });

    it("should update total count stat", async () => {
      const exp1 = createTestExperiment({ id: "exp-1" });
      const exp2 = createTestExperiment({ id: "exp-2" });

      await addExperiment(exp1);
      await addExperiment(exp2);
      const manifest = await loadManifest();

      expect(manifest.stats.total).toBe(2);
    });

    it("should update approved count stat", async () => {
      const exp1 = createTestExperiment({ id: "exp-1", approved: true });
      const exp2 = createTestExperiment({ id: "exp-2", approved: false });
      const exp3 = createTestExperiment({ id: "exp-3", approved: true });

      await addExperiment(exp1);
      await addExperiment(exp2);
      await addExperiment(exp3);
      const manifest = await loadManifest();

      expect(manifest.stats.approved).toBe(2);
    });

    it("should update mechanics count", async () => {
      const exp1 = createTestExperiment({
        id: "exp-1",
        mechanics: ["hover", "click"],
      });
      const exp2 = createTestExperiment({
        id: "exp-2",
        mechanics: ["hover", "scroll"],
      });

      await addExperiment(exp1);
      await addExperiment(exp2);
      const manifest = await loadManifest();

      expect(manifest.stats.byMechanic.hover).toBe(2);
      expect(manifest.stats.byMechanic.click).toBe(1);
      expect(manifest.stats.byMechanic.scroll).toBe(1);
    });
  });

  describe("updateExperiment", () => {
    it("should update experiment fields", async () => {
      const experiment = createTestExperiment({
        id: "exp-update",
        title: "Original",
      });
      await addExperiment(experiment);

      await updateExperiment("exp-update", {
        title: "Updated Title",
        approved: true,
      });
      const manifest = await loadManifest();

      expect(manifest.experiments[0].title).toBe("Updated Title");
      expect(manifest.experiments[0].approved).toBe(true);
    });

    it("should update approved count when approval changes", async () => {
      const exp1 = createTestExperiment({ id: "exp-1", approved: false });
      const exp2 = createTestExperiment({ id: "exp-2", approved: false });
      await addExperiment(exp1);
      await addExperiment(exp2);

      await updateExperiment("exp-1", { approved: true });
      const manifest = await loadManifest();

      expect(manifest.stats.approved).toBe(1);
    });

    it("should throw error for non-existent experiment", async () => {
      await expect(
        updateExperiment("non-existent", { title: "Test" })
      ).rejects.toThrow("Experiment non-existent not found");
    });

    it("should preserve unchanged fields", async () => {
      const experiment = createTestExperiment({
        id: "exp-preserve",
        title: "Original",
        description: "Original description",
      });
      await addExperiment(experiment);

      await updateExperiment("exp-preserve", { title: "Updated" });
      const manifest = await loadManifest();

      expect(manifest.experiments[0].description).toBe("Original description");
    });

    it("should not update mechanics stats (as per spec)", async () => {
      const experiment = createTestExperiment({
        id: "exp-mech",
        mechanics: ["hover"],
      });
      await addExperiment(experiment);

      await updateExperiment("exp-mech", { mechanics: ["click", "scroll"] });
      const manifest = await loadManifest();

      // Stats should still show original mechanics
      expect(manifest.stats.byMechanic.hover).toBe(1);
      expect(manifest.stats.byMechanic.click).toBeUndefined();
      expect(manifest.stats.byMechanic.scroll).toBeUndefined();
    });
  });

  describe("deleteExperiment", () => {
    it("should remove experiment from manifest", async () => {
      const experiment = createTestExperiment({ id: "exp-delete" });
      await addExperiment(experiment);

      await deleteExperiment("exp-delete");
      const manifest = await loadManifest();

      expect(manifest.experiments).toHaveLength(0);
    });

    it("should update total count stat", async () => {
      const exp1 = createTestExperiment({ id: "exp-1" });
      const exp2 = createTestExperiment({ id: "exp-2" });
      await addExperiment(exp1);
      await addExperiment(exp2);

      await deleteExperiment("exp-1");
      const manifest = await loadManifest();

      expect(manifest.stats.total).toBe(1);
    });

    it("should update approved count stat", async () => {
      const exp1 = createTestExperiment({ id: "exp-1", approved: true });
      const exp2 = createTestExperiment({ id: "exp-2", approved: true });
      await addExperiment(exp1);
      await addExperiment(exp2);

      await deleteExperiment("exp-1");
      const manifest = await loadManifest();

      expect(manifest.stats.approved).toBe(1);
    });

    it("should update mechanics count", async () => {
      const exp1 = createTestExperiment({
        id: "exp-1",
        mechanics: ["hover", "click"],
      });
      const exp2 = createTestExperiment({
        id: "exp-2",
        mechanics: ["hover"],
      });
      await addExperiment(exp1);
      await addExperiment(exp2);

      await deleteExperiment("exp-1");
      const manifest = await loadManifest();

      expect(manifest.stats.byMechanic.hover).toBe(1);
      expect(manifest.stats.byMechanic.click).toBe(0);
    });

    it("should throw error for non-existent experiment", async () => {
      await expect(deleteExperiment("non-existent")).rejects.toThrow(
        "Experiment non-existent not found"
      );
    });

    it("should not go below zero for mechanics count", async () => {
      const experiment = createTestExperiment({
        id: "exp-1",
        mechanics: ["hover"],
      });
      await addExperiment(experiment);

      await deleteExperiment("exp-1");
      const manifest = await loadManifest();

      expect(manifest.stats.byMechanic.hover).toBe(0);
    });
  });

  describe("integration: full workflow", () => {
    it("should handle complete CRUD cycle", async () => {
      // Create
      const exp1 = createTestExperiment({
        id: "workflow-1",
        title: "First",
        mechanics: ["hover"],
        approved: false,
      });
      await addExperiment(exp1);

      let manifest = await loadManifest();
      expect(manifest.experiments).toHaveLength(1);
      expect(manifest.stats.total).toBe(1);
      expect(manifest.stats.approved).toBe(0);

      // Update
      await updateExperiment("workflow-1", { approved: true });
      manifest = await loadManifest();
      expect(manifest.stats.approved).toBe(1);

      // Add more
      const exp2 = createTestExperiment({
        id: "workflow-2",
        mechanics: ["hover", "scroll"],
        approved: true,
      });
      await addExperiment(exp2);
      manifest = await loadManifest();
      expect(manifest.stats.total).toBe(2);
      expect(manifest.stats.approved).toBe(2);
      expect(manifest.stats.byMechanic.hover).toBe(2);
      expect(manifest.stats.byMechanic.scroll).toBe(1);

      // Delete
      await deleteExperiment("workflow-1");
      manifest = await loadManifest();
      expect(manifest.stats.total).toBe(1);
      expect(manifest.stats.approved).toBe(1);
      expect(manifest.stats.byMechanic.hover).toBe(1);
    });
  });
});
