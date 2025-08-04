// Script to build CSS for Playwright testing
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function buildCSS() {
  try {
    console.log('Building CSS for Playwright tests...');
    
    // Use tailwindcss CLI to build the CSS
    await execAsync('pnpm exec tailwindcss -i ./playwright/input.css -o ./playwright/output.css', {
      cwd: process.cwd()
    });
    
    console.log('CSS built successfully for Playwright tests');
  } catch (error) {
    console.error('Failed to build CSS:', error);
  }
}

buildCSS();