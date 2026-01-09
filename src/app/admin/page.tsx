"use client";

import { useState } from "react";

export default function AdminPage() {
  const [generating, setGenerating] = useState(false);

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
            <select id="theme-select" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option>Random</option>
              <option>Magnetic Interactions</option>
              <option>Spring Physics</option>
              <option>Particle Effects</option>
            </select>
          </div>
          <button
            disabled={generating}
            className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            {generating ? "Generating..." : "Generate Experiment"}
          </button>
        </div>
      </section>

      {/* Review Queue */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Review Queue
        </h2>
        <p className="text-sm text-muted-foreground">
          No experiments pending review
        </p>
      </section>

      {/* Approved Library */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Approved Library
        </h2>
        <p className="text-sm text-muted-foreground">
          No approved experiments yet
        </p>
      </section>
    </div>
  );
}
