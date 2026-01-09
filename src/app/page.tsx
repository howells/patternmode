"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { ExperimentDrawer } from "@/components/experiment-drawer";
import { ExperimentGrid } from "@/components/experiment-grid";
import { ThemeCustomizer } from "@/components/theme-customizer";
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

  const handleExperimentClick = (experiment: ExperimentMetadata) => {
    setSelectedExperiment(experiment);
    setDrawerOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Minimal header - floating, no borders */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-4">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-soft">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-foreground tracking-tight">
                patternmode
              </h1>
              <p className="text-muted-foreground text-xs">
                motion experiments
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {experiments.length === 0 ? (
          <motion.div
            className="flex min-h-[60vh] items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                No experiments yet
              </p>
              {process.env.NODE_ENV === "development" && (
                <a
                  className="mt-4 inline-block rounded-xl bg-accent px-5 py-2.5 font-medium text-white text-sm shadow-soft transition-all hover:shadow-soft-lg hover:scale-[1.02]"
                  href="/admin"
                >
                  Create your first
                </a>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ExperimentGrid
              experiments={experiments}
              onExperimentClick={handleExperimentClick}
            />
          </motion.div>
        )}
      </div>

      {/* Drawer */}
      <ExperimentDrawer
        experiment={selectedExperiment}
        onOpenChange={setDrawerOpen}
        open={drawerOpen}
      />

      {/* Theme Customizer */}
      <ThemeCustomizer />
    </main>
  );
}
