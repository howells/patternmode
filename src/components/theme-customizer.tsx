"use client";

import { motion, AnimatePresence } from "motion/react";
import { Palette, X, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

// Preset accent colors
const PRESET_COLORS = [
  { name: "Coral", value: "255 107 74" },
  { name: "Blue", value: "59 130 246" },
  { name: "Purple", value: "139 92 246" },
  { name: "Green", value: "34 197 94" },
  { name: "Pink", value: "236 72 153" },
  { name: "Orange", value: "249 115 22" },
  { name: "Teal", value: "20 184 166" },
  { name: "Indigo", value: "99 102 241" },
];

// Easing presets
const EASING_PRESETS = [
  { name: "Apple Standard", value: [0.4, 0.0, 0.2, 1.0] },
  { name: "Apple Decel", value: [0.0, 0.0, 0.2, 1.0] },
  { name: "Apple Accel", value: [0.4, 0.0, 1.0, 1.0] },
  { name: "Apple Sharp", value: [0.4, 0.0, 0.6, 1.0] },
  { name: "Ease Out Expo", value: [0.16, 1.0, 0.3, 1.0] },
  { name: "Ease Out Back", value: [0.34, 1.56, 0.64, 1.0] },
  { name: "Ease In Out Sine", value: [0.37, 0.0, 0.63, 1.0] },
  { name: "Linear", value: [0.0, 0.0, 1.0, 1.0] },
];

interface ThemeSettings {
  accentColor: string;
  easing: number[];
  easingName: string;
}

const DEFAULT_SETTINGS: ThemeSettings = {
  accentColor: "255 107 74",
  easing: [0.4, 0.0, 0.2, 1.0],
  easingName: "Apple Standard",
};

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<ThemeSettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("patternmode-theme");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        applySettings(parsed);
      } catch {
        // Invalid saved data, use defaults
      }
    }
  }, []);

  // Apply settings to CSS variables
  const applySettings = (newSettings: ThemeSettings) => {
    document.documentElement.style.setProperty(
      "--color-accent",
      newSettings.accentColor
    );
  };

  // Save and apply settings
  const updateSettings = (updates: Partial<ThemeSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    applySettings(newSettings);
    localStorage.setItem("patternmode-theme", JSON.stringify(newSettings));
  };

  // Reset to defaults
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    applySettings(DEFAULT_SETTINGS);
    localStorage.removeItem("patternmode-theme");
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-soft-lg text-foreground transition-colors hover:bg-muted"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open theme customizer"
      >
        <Palette className="h-5 w-5" />
      </motion.button>

      {/* Customizer panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-foreground/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl bg-card shadow-soft-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Customize</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetSettings}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Reset to defaults"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-6">
                {/* Accent Color */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Highlight Color
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color.name}
                        onClick={() =>
                          updateSettings({ accentColor: color.value })
                        }
                        className="group relative flex flex-col items-center gap-1.5"
                        aria-label={`Select ${color.name} color`}
                      >
                        <div
                          className={`h-10 w-10 rounded-xl transition-all ${
                            settings.accentColor === color.value
                              ? "ring-2 ring-foreground ring-offset-2 ring-offset-card scale-110"
                              : "hover:scale-105"
                          }`}
                          style={{
                            backgroundColor: `rgb(${color.value})`,
                          }}
                        />
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Easing Curve */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Animation Easing
                  </label>
                  <div className="space-y-1.5">
                    {EASING_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() =>
                          updateSettings({
                            easing: preset.value,
                            easingName: preset.name,
                          })
                        }
                        className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all ${
                          settings.easingName === preset.name
                            ? "bg-accent text-white"
                            : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        <span>{preset.name}</span>
                        {/* Mini easing curve visualization */}
                        <svg
                          width="40"
                          height="20"
                          viewBox="0 0 40 20"
                          className="opacity-60"
                        >
                          <path
                            d={`M 0 20 C ${preset.value[0] * 40} ${20 - preset.value[1] * 20}, ${preset.value[2] * 40} ${20 - preset.value[3] * 20}, 40 0`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
