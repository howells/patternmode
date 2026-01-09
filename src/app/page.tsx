"use client";

import { ExperimentGrid } from "@/components/experiment-grid";
import { ExperimentDrawer } from "@/components/experiment-drawer";
import { type ExperimentMetadata } from "@/lib/experiments";
import { RefreshCcw, Settings } from "lucide-react";
import { useState, useEffect } from "react";

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
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                UI Experiments
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                AI-generated motion components
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
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
                  href="/admin"
                  className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90"
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
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </main>
  );
}
