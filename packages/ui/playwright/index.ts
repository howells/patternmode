import { beforeMount, afterMount } from '@playwright/experimental-ct-react/hooks';

// Set NODE_ENV for testing


// Import Tailwind 4 styles for testing
import './styles.css';
import '../src/styles/typography.css';
import '../src/styles/globals.css';

beforeMount(async () => {
  // Add any global setup here
  console.log('Mounting component for testing...');
});

afterMount(async () => {
  // Add any cleanup here if needed
});