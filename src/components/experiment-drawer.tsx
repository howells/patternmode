"use client";

import { CheckCircle2, Code, Copy, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import type { ExperimentMetadata } from "@/lib/experiments";
import { ExperimentPreview } from "./experiment-preview";

interface ExperimentDrawerProps {
  experiment: ExperimentMetadata | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExperimentDrawer({
  experiment,
  open,
  onOpenChange,
}: ExperimentDrawerProps) {
  const [codeOpen, setCodeOpen] = useState(false);
  const [code, setCode] = useState<string>("");
  const [highlighted, setHighlighted] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Load component code when experiment changes
  useEffect(() => {
    if (experiment?.filePath) {
      fetch(`/api/experiments/${experiment.id}/code`)
        .then((res) => res.json())
        .then((data) => {
          setCode(data.code || "// Code not available");
          setHighlighted(data.highlighted || "");
        })
        .catch(() => {
          setCode("// Failed to load code");
          setHighlighted("");
        });
    }
  }, [experiment]);

  // Reset code panel when drawer closes
  useEffect(() => {
    if (!open) {
      setCodeOpen(false);
    }
  }, [open]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  if (!experiment) return null;

  return (
    <Drawer.Root direction="right" onOpenChange={onOpenChange} open={open}>
      <Drawer.Portal>
        {/* Solid overlay */}
        <Drawer.Overlay className="fixed inset-0 bg-foreground/40" />

        <Drawer.Content className="fixed top-0 right-0 bottom-0 outline-none">
          <Drawer.Description className="sr-only">
            Experiment details and code for {experiment.title}
          </Drawer.Description>

          {/* Component Preview Panel */}
          <motion.div
            className="relative flex h-full flex-col w-[520px]"
            style={{ backgroundColor: "rgb(255 255 255)" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4">
              <div className="flex-1">
                <Drawer.Title className="font-semibold text-foreground text-xl">
                  {experiment.title}
                </Drawer.Title>
                <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                  {experiment.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {experiment.mechanics.map((mechanic) => (
                    <span
                      className="rounded-full bg-accent/10 px-2.5 py-1 text-accent text-xs font-medium"
                      key={mechanic}
                    >
                      {mechanic}
                    </span>
                  ))}
                </div>
              </div>
              <button
                aria-label="Close drawer"
                className="ml-4 rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Live Preview Area - full height */}
            <div className="flex-1 bg-muted m-6 mt-0 rounded-2xl overflow-hidden">
              <div className="flex h-full w-full items-center justify-center p-8">
                <ExperimentPreview
                  experimentId={experiment.id}
                  className="h-full w-full"
                />
              </div>
            </div>

            {/* Toggle Code Button */}
            <div className="p-6 pt-0">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 font-medium text-background text-sm transition-all hover:bg-foreground/90"
                onClick={() => setCodeOpen(!codeOpen)}
              >
                <Code className="h-4 w-4" />
                {codeOpen ? "Hide Code" : "View Code"}
              </button>
            </div>
          </motion.div>

          {/* Code Panel - overlays on top */}
          <AnimatePresence>
            {codeOpen && (
              <motion.div
                className="absolute top-4 right-4 bottom-4 w-[460px] flex flex-col overflow-hidden rounded-2xl shadow-soft-lg"
                style={{ backgroundColor: "rgb(28 28 30)" }}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Code Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCodeOpen(false)}
                      className="rounded-lg p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Close code panel"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <span className="font-medium text-white/90 text-sm">
                      {experiment.id}.tsx
                    </span>
                  </div>
                  <button
                    className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 font-medium text-white text-sm transition-all hover:bg-white/20"
                    onClick={() => handleCopy(code)}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Code Content - HTML from Shiki is trusted (server-generated from our own source files) */}
                <div className="flex-1 overflow-auto px-4 py-4 shiki-container">
                  {highlighted ? (
                    <div
                      className="text-sm leading-relaxed [&_pre]:!bg-transparent [&_code]:font-mono"
                      dangerouslySetInnerHTML={{ __html: highlighted }}
                    />
                  ) : (
                    <pre className="text-card-dark-foreground/90 text-sm leading-relaxed font-mono whitespace-pre-wrap">
                      <code>{code}</code>
                    </pre>
                  )}
                </div>

                {/* Dependencies */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white/50 text-xs uppercase tracking-wide">
                      Dependencies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {experiment.dependencies.map((dep) => (
                      <button
                        key={dep}
                        onClick={() =>
                          handleCopy(
                            dep.startsWith("@/")
                              ? `// Copy ${dep} to your project`
                              : `pnpm add ${dep}`
                          )
                        }
                        className="rounded-md bg-white/5 px-2 py-1 text-white/70 text-xs font-mono hover:bg-white/10 transition-colors"
                      >
                        {dep}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
