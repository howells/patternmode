import { beforeMount, afterMount } from '@playwright/experimental-ct-react/hooks';

// Set NODE_ENV for testing


// Import Tailwind 4 styles for testing
import './styles.css';
import "./typography.css"
import "./globals.css"

beforeMount(async ({ App }) => {
  // Add any global setup here
  console.log('Mounting component for testing...');
});

afterMount(async ({ App }) => {
  // Add any cleanup here if needed
});