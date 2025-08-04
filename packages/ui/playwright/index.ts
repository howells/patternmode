import { beforeMount, afterMount } from '@playwright/experimental-ct-react/hooks';

// Set NODE_ENV for testing
process.env.NODE_ENV = 'test';

// Import Tailwind 4 styles for testing
import './styles.css';

beforeMount(async ({ App }) => {
  // Add any global setup here
  console.log('Mounting component for testing...');
});

afterMount(async ({ App }) => {
  // Add any cleanup here if needed
});