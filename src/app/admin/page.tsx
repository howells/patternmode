"use client";

import { CheckCircle2, Loader2, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  approveExperiment,
  deleteExperiment,
  generateExperiment,
  getAllExperiments,
} from "@/app/actions/experiments";
import type { ExperimentMetadata } from "@/lib/experiments";

export default function AdminPage() {
  const [generating, setGenerating] = useState(false);
  const [experiments, setExperiments] = useState<ExperimentMetadata[]>([]);
  const [theme, setTheme] = useState("Random");
  const [error, setError] = useState<string | null>(null);

  // Load experiments
  useEffect(() => {
    loadExperiments();
  }, []);

  async function loadExperiments() {
    const result = await getAllExperiments();
    if (result.success) {
      setExperiments(result.experiments);
    } else {
      setError(result.error || "Failed to load experiments");
    }
  }

  async function handleGenerate() {
    setGenerating(true);
    setError(null);

    const result = await generateExperiment(theme);

    if (result.success) {
      await loadExperiments();
    } else {
      setError(result.error || "Generation failed");
    }

    setGenerating(false);
  }

  async function handleApprove(id: string) {
    setError(null);
    const result = await approveExperiment(id);
    if (result.success) {
      await loadExperiments();
    } else {
      setError(result.error || "Failed to approve experiment");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this experiment?")) return;

    setError(null);
    const result = await deleteExperiment(id);
    if (result.success) {
      await loadExperiments();
    } else {
      setError(result.error || "Failed to delete experiment");
    }
  }

  const pendingExperiments = experiments.filter((exp) => !exp.approved);
  const approvedExperiments = experiments.filter((exp) => exp.approved);

  return (
    <div className="space-y-8">
      {/* Generate Section */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 font-semibold text-foreground text-lg">
          Generate Experiment
        </h2>
        <div className="space-y-4">
          <div>
            <label
              className="mb-2 block font-medium text-foreground text-sm"
              htmlFor="theme-select"
            >
              Theme
            </label>
            <select
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              id="theme-select"
              onChange={(e) => setTheme(e.target.value)}
              value={theme}
            >
              <option>Random</option>
              <option>Magnetic Interactions</option>
              <option>Spring Physics</option>
              <option>Particle Effects</option>
              <option>Liquid Motion</option>
              <option>Elastic Animations</option>
            </select>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-accent-foreground text-sm transition-colors hover:bg-accent/90 disabled:opacity-50"
            disabled={generating}
            onClick={handleGenerate}
          >
            {generating && <Loader2 className="h-4 w-4 animate-spin" />}
            {generating ? "Generating..." : "Generate Experiment"}
          </button>
        </div>
      </section>

      {/* Review Queue */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 font-semibold text-foreground text-lg">
          Review Queue ({pendingExperiments.length})
        </h2>
        {pendingExperiments.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No experiments pending review
          </p>
        ) : (
          <div className="space-y-4">
            {pendingExperiments.map((exp) => (
              <div
                className="rounded-lg border border-border bg-background p-4"
                key={exp.id}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{exp.title}</h3>
                    <p className="mt-1 text-muted-foreground text-sm">
                      {exp.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {exp.mechanics.map((mechanic) => (
                        <span
                          className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs"
                          key={mechanic}
                        >
                          {mechanic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      aria-label={`Approve ${exp.title}`}
                      className="rounded-lg bg-accent p-2 text-accent-foreground hover:bg-accent/90"
                      onClick={() => handleApprove(exp.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                    <button
                      aria-label={`Delete ${exp.title}`}
                      className="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-red-500 hover:text-white"
                      onClick={() => handleDelete(exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Approved Library */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 font-semibold text-foreground text-lg">
          Approved Library ({approvedExperiments.length})
        </h2>
        {approvedExperiments.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No approved experiments yet
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {approvedExperiments.map((exp) => (
              <div
                className="rounded-lg border border-border bg-background p-4"
                key={exp.id}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{exp.title}</h3>
                    <p className="mt-1 text-muted-foreground text-sm">
                      {exp.description}
                    </p>
                  </div>
                  <button
                    aria-label={`Delete ${exp.title}`}
                    className="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-red-500 hover:text-white"
                    onClick={() => handleDelete(exp.id)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
