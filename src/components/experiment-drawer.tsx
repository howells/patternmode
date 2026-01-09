"use client";

import { Drawer } from "vaul";
import { type ExperimentMetadata } from "@/lib/experiments";
import { X, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

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
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!experiment) return null;

  return (
    <Drawer.Root
      direction="right"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        <Drawer.Content className="fixed right-0 top-0 bottom-0 w-full sm:w-1/2 bg-card flex flex-col outline-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-6">
            <div>
              <Drawer.Title className="text-xl font-semibold text-foreground">
                {experiment.title}
              </Drawer.Title>
              <p className="text-sm text-muted-foreground mt-1">
                {experiment.description}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-lg p-2 hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Preview Area */}
          <div className="flex-1 flex items-center justify-center p-8 border-b border-border">
            <div className="w-full max-w-md">
              {/* Dynamic import will render here */}
              <div className="rounded-lg border border-border bg-background p-8 text-center text-muted-foreground">
                Preview of {experiment.title}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border px-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("code")}
                className={`pb-3 pt-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "code"
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveTab("install")}
                className={`pb-3 pt-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "install"
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Install
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-auto">
            {activeTab === "code" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {experiment.id}.tsx
                  </span>
                  <button
                    onClick={() => handleCopy("// Code will be here")}
                    className="flex items-center gap-2 rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
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
                <pre className="rounded-lg bg-card-dark p-4 text-sm text-card-dark-foreground overflow-x-auto">
                  <code>// Component code will be displayed here</code>
                </pre>
              </div>
            )}

            {activeTab === "install" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Dependencies
                  </h3>
                  <div className="space-y-2">
                    {experiment.dependencies.map((dep) => (
                      <div
                        key={dep}
                        className="flex items-center justify-between rounded-lg bg-muted p-3"
                      >
                        <code className="text-sm">{dep}</code>
                        <button
                          onClick={() =>
                            handleCopy(
                              dep.startsWith("@/")
                                ? `// Copy ${dep} to your project`
                                : `pnpm add ${dep}`
                            )
                          }
                          className="text-sm text-accent hover:text-accent/80"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Setup Checklist
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
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
                      <span>
                        Ensure shadcn CSS variables in globals.css
                      </span>
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
