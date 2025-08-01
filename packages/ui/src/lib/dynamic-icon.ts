// Wrapper for lucide-react dynamic icon to handle import issues
// This provides a stable import path for DynamicIcon functionality

// Import the dynamic module directly using require for better compatibility
// eslint-disable-next-line ts/no-require-imports
const dynamicModule = require("lucide-react/dynamic.mjs");

export const DynamicIcon = dynamicModule.DynamicIcon;
