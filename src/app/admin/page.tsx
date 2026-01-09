"use client";

import { useState, useEffect } from "react";
import {
  generateExperiment,
  approveExperiment,
  deleteExperiment,
  getAllExperiments,
} from "@/app/actions/experiments";
import { type ExperimentMetadata } from "@/lib/experiments";
import { Loader2, CheckCircle2, X, Trash2 } from "lucide-react";

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
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Generate Experiment
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="theme-select" className="block text-sm font-medium text-foreground mb-2">
              Theme
            </label>
            <select
              id="theme-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
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
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {generating && <Loader2 className="h-4 w-4 animate-spin" />}
            {generating ? "Generating..." : "Generate Experiment"}
          </button>
        </div>
      </section>

      {/* Review Queue */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Review Queue ({pendingExperiments.length})
        </h2>
        {pendingExperiments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No experiments pending review
          </p>
        ) : (
          <div className="space-y-4">
            {pendingExperiments.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.mechanics.map((mechanic) => (
                        <span
                          key={mechanic}
                          className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {mechanic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(exp.id)}
                      aria-label={`Approve ${exp.title}`}
                      className="rounded-lg bg-accent p-2 text-accent-foreground hover:bg-accent/90"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      aria-label={`Delete ${exp.title}`}
                      className="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-red-500 hover:text-white"
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
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Approved Library ({approvedExperiments.length})
        </h2>
        {approvedExperiments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No approved experiments yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvedExperiments.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {exp.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    aria-label={`Delete ${exp.title}`}
                    className="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-red-500 hover:text-white"
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
