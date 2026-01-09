"use client";

import { RefreshCcw, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { ExperimentDrawer } from "@/components/experiment-drawer";
import { ExperimentGrid } from "@/components/experiment-grid";
import type { ExperimentMetadata } from "@/lib/experiments";

export default function HomePage() {
  const [experiments, setExperiments] = useState<ExperimentMetadata[]>([]);
  const [selectedExperiment, setSelectedExperiment] =
    useState<ExperimentMetadata | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Load experiments on mount
  useEffect(() => {
    async function loadExperiments() {
      const response = await fetch("/api/experiments");
      const data = await response.json();
      setExperiments(data.experiments);
    }
    loadExperiments();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExperimentClick = (experiment: ExperimentMetadata) => {
    setSelectedExperiment(experiment);
    setDrawerOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-border border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-2xl text-foreground">
                UI Experiments
              </h1>
              <p className="mt-1 text-muted-foreground text-sm">
                AI-generated motion components
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-medium text-sm transition-colors hover:bg-muted"
                onClick={handleRefresh}
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-medium text-sm transition-colors hover:bg-muted">
                <Settings className="h-4 w-4" />
                Theme
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <div className="container mx-auto px-6 py-8">
        {experiments.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">
                No experiments yet. Generate your first one!
              </p>
              {process.env.NODE_ENV === "development" && (
                <a
                  className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 font-medium text-accent-foreground text-sm hover:bg-accent/90"
                  href="/admin"
                >
                  Go to Admin Panel
                </a>
              )}
            </div>
          </div>
        ) : (
          <ExperimentGrid
            experiments={experiments}
            onExperimentClick={handleExperimentClick}
          />
        )}
      </div>

      {/* Drawer */}
      <ExperimentDrawer
        experiment={selectedExperiment}
        onOpenChange={setDrawerOpen}
        open={drawerOpen}
      />
    </main>
  );
}
