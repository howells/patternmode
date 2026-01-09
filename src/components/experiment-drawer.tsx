"use client";

import { CheckCircle2, Copy, X } from "lucide-react";
import { useState } from "react";
import { Drawer } from "vaul";
import type { ExperimentMetadata } from "@/lib/experiments";

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
  const [activeTab, setActiveTab] = useState<"code" | "install">("code");
  const [copied, setCopied] = useState(false);

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
        <Drawer.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        <Drawer.Content className="fixed top-0 right-0 bottom-0 flex w-full flex-col bg-card outline-none sm:w-1/2">
          <Drawer.Description className="sr-only">
            Experiment details and code for {experiment.title}
          </Drawer.Description>
          {/* Header */}
          <div className="flex items-center justify-between border-border border-b p-6">
            <div>
              <Drawer.Title className="font-semibold text-foreground text-xl">
                {experiment.title}
              </Drawer.Title>
              <p className="mt-1 text-muted-foreground text-sm">
                {experiment.description}
              </p>
            </div>
            <button
              aria-label="Close drawer"
              className="rounded-lg p-2 transition-colors hover:bg-muted"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Preview Area */}
          <div className="flex flex-1 items-center justify-center border-border border-b p-8">
            <div className="w-full max-w-md">
              {/* Dynamic import will render here */}
              <div className="rounded-lg border border-border bg-background p-8 text-center text-muted-foreground">
                Preview of {experiment.title}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-border border-b px-6">
            <div className="flex gap-4">
              <button
                className={`border-b-2 pt-4 pb-3 font-medium text-sm transition-colors ${
                  activeTab === "code"
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("code")}
              >
                Code
              </button>
              <button
                className={`border-b-2 pt-4 pb-3 font-medium text-sm transition-colors ${
                  activeTab === "install"
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("install")}
              >
                Install
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="overflow-auto p-6">
            {activeTab === "code" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground text-sm">
                    {experiment.id}.tsx
                  </span>
                  <button
                    className="flex items-center gap-2 rounded-lg bg-accent px-3 py-1.5 font-medium text-accent-foreground text-sm transition-colors hover:bg-accent/90"
                    onClick={() => handleCopy("// Code will be here")}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-card-dark p-4 text-card-dark-foreground text-sm">
                  <code>// Component code will be displayed here</code>
                </pre>
              </div>
            )}

            {activeTab === "install" && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-semibold text-foreground">
                    Dependencies
                  </h3>
                  <div className="space-y-2">
                    {experiment.dependencies.map((dep) => (
                      <div
                        className="flex items-center justify-between rounded-lg bg-muted p-3"
                        key={dep}
                      >
                        <code className="text-sm">{dep}</code>
                        <button
                          aria-label={`Copy ${dep} installation command`}
                          className="text-accent text-sm hover:text-accent/80"
                          onClick={() =>
                            handleCopy(
                              dep.startsWith("@/")
                                ? `// Copy ${dep} to your project`
                                : `pnpm add ${dep}`
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-foreground">
                    Setup Checklist
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">□</span>
                      <span>Install dependencies with pnpm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">□</span>
                      <span>Copy lib/motion.ts to your project</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">□</span>
                      <span>Ensure shadcn CSS variables in globals.css</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
