"use client";

import React from "react";

interface ComponentExampleRendererProps {
  componentId: string;
  exampleId?: string; // Make optional since we might render all examples
}

interface ExampleWithMetadata {
  id: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  component: React.ComponentType;
}

// Dynamic component renderer that loads and renders all examples from the self-contained examples files
export function ComponentExampleRenderer({
  componentId,
  exampleId,
}: ComponentExampleRendererProps) {
  const [examples, setExamples] = React.useState<ExampleWithMetadata[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadExamples() {
      try {
        setLoading(true);
        setError(null);

        // Import the examples module from the UI package
        console.log(`Loading examples for componentId: ${componentId}`);
        console.log(`Import path: @patternmode/ui/components/${componentId}/examples`);

        const examplesModule = await import(`@patternmode/ui/components/${componentId}/examples`);

        console.log('Examples module loaded successfully');
        console.log('Examples module keys:', Object.keys(examplesModule));

        // Look for any exported array that ends with "_EXAMPLES"
        const examplesRegistryKey = Object.keys(examplesModule).find(key =>
          key.endsWith('_EXAMPLES') && Array.isArray(examplesModule[key as keyof typeof examplesModule])
        );

        console.log('Found registry key:', examplesRegistryKey);

        if (examplesRegistryKey) {
          // New self-contained format - get all examples from registry
          const examplesRegistry = examplesModule[examplesRegistryKey as keyof typeof examplesModule] as ExampleWithMetadata[];
          console.log('Examples registry:', examplesRegistry.map(ex => ({ id: ex.id, title: ex.title })));

          if (exampleId) {
            // If specific example requested, filter to just that one
            const example = examplesRegistry.find((ex: ExampleWithMetadata) => ex.id === exampleId);
            if (!example) {
              console.error(`Example with ID "${exampleId}" not found in registry`);
              setError(`Example with ID "${exampleId}" not found in registry`);
              return;
            }
            setExamples([example]);
          } else {
            // Render all examples
            console.log(`Setting ${examplesRegistry.length} examples`);
            setExamples(examplesRegistry);
          }
        } else {
          // Fallback to legacy format if no registry found
          console.log('No examples registry found, trying legacy format');
          if (exampleId) {
            const componentName =
              exampleId
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join("") + "Example";

            const Component = examplesModule[componentName as keyof typeof examplesModule];

            if (!Component || typeof Component !== 'function') {
              setError(
                `Example component "${componentName}" not found in ${componentId}/examples`
              );
              return;
            }

            // Create a mock example for legacy format
            setExamples([{
              id: exampleId,
              title: componentName,
              description: `Legacy example: ${componentName}`,
              component: Component as React.ComponentType
            }]);
          } else {
            console.log('No examples registry found and no specific example ID provided');
            setError("No examples registry found and no specific example ID provided");
          }
        }
      } catch (err) {
        console.error("Error loading examples:", err);
        console.error("Error details:", {
          message: (err as Error).message,
          stack: (err as Error).stack,
          componentId,
          exampleId
        });
        setError("Failed to load examples: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadExamples();
  }, [componentId, exampleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80px] text-zinc-500">
        <div className="animate-pulse">Loading examples...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-zinc-500 p-4 border border-zinc-200 rounded bg-zinc-50 dark:bg-zinc-900">
        <p className="font-medium">Example preview</p>
        <p className="text-xs mt-1">Interactive example coming soon</p>
        <p className="text-xs mt-1 text-zinc-400">{error}</p>
      </div>
    );
  }

  if (examples.length === 0) {
    return (
      <div className="text-amber-600 text-xs p-4 border border-amber-200 rounded bg-amber-50 dark:bg-amber-950/20">
        <p className="font-medium">No Examples Found</p>
        <p className="text-xs mt-1">
          Could not find any examples for {componentId}
        </p>
      </div>
    );
  }

  try {
    return (
      <div className="space-y-8">
        {examples.map((example) => (
          <div key={example.id} className="space-y-4">
            {/* Example Header */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {example.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {example.description}
              </p>
              {example.category && (
                <div className="flex gap-2 items-center">
                  <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-400">
                    {example.category}
                  </span>
                  {example.tags && example.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded text-blue-600 dark:text-blue-400">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Example Component */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 bg-white dark:bg-zinc-950">
              <div className="flex justify-center">
                <example.component />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (renderError) {
    return (
      <div className="text-red-500 text-sm p-4 border border-red-200 rounded bg-red-50 dark:bg-red-950/20">
        <p className="font-medium">Render Error</p>
        <p className="text-xs mt-1">{(renderError as Error).message}</p>
      </div>
    );
  }
}
