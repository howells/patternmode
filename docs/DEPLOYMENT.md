# Deployment Guide

This guide covers the CI/CD pipeline and deployment process for the Patternmode project.

## Overview

The project uses a GitHub Actions workflow for continuous integration and deployment to Vercel. The pipeline ensures that component pages are generated and the application is properly built before deployment.

## Prerequisites

### GitHub Secrets

Set up the following secrets in your GitHub repository settings:

#### Vercel Deployment Secrets
- `VERCEL_TOKEN` - Your Vercel personal access token
- `VERCEL_ORG_ID` - Your Vercel organization ID  
- `VERCEL_PROJECT_ID` - Your Vercel project ID
- `VERCEL_PREVIEW_URL` - Your Vercel app URL (for E2E tests)

#### Turbo Cache Secrets (Optional)
- `TURBO_TOKEN` - Your Turbo remote cache token
- `TURBO_TEAM` - Your Turbo team name

### Getting Vercel IDs

1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Get your IDs: `vercel env ls`

## Build Process

The build process follows this order:

1. **Install Dependencies** - `pnpm install`
2. **Generate Component Pages** - `pnpm generate:pages`
3. **Type Check** - `pnpm typecheck`
4. **Lint** - `pnpm lint`  
5. **Build Application** - `pnpm build`
6. **Deploy to Vercel**
7. **Run E2E Tests** (post-deployment)

## Pipeline Stages

### 1. Lint and Test
- Runs on all push/PR events
- Performs type checking, linting, and unit tests
- Must pass before deployment

### 2. Build and Deploy
- Runs only on main/master branch pushes
- Generates component pages from configs
- Builds and deploys to Vercel
- Uses Turbo cache for optimization

### 3. E2E Tests
- Runs after successful deployment
- Tests the live application
- Uses Playwright for browser testing

## Local Development

### First Time Setup
```bash
# Install dependencies
pnpm install

# Generate component pages
pnpm generate:pages

# Start development server
pnpm dev
```

### Before Committing
```bash
# Run full validation
pnpm typecheck
pnpm lint
pnpm test:run

# Generate pages if you added new components
pnpm generate:pages
```

## Manual Deployment

If you need to deploy manually:

```bash
# Generate pages and build
pnpm generate:pages
pnpm build

# Deploy using Vercel CLI
cd apps/web
vercel --prod
```

## Component Page Generation

The `generate-component-pages.js` script:

- Scans all component configs in `packages/ui/src/components/*/config.ts`
- Generates Next.js pages in `apps/web/src/app/ui/components/*/page.tsx`
- Must run before build to ensure all component pages exist
- Automatically runs via `prebuild` hook in the web app

## Turbo Configuration

The build process uses Turbo for:
- Task orchestration and dependency management
- Build caching (local and remote)
- Parallel execution of tasks

Key Turbo tasks:
- `generate:pages` - Generate component pages
- `build` - Build applications (depends on page generation)
- `typecheck` - Type checking
- `lint` - Code linting
- `test:run` - Unit tests

## Vercel Configuration

The `vercel.json` includes:

- **Build Command**: Runs the full monorepo build with page generation
- **Install Command**: Uses pnpm for dependency installation
- **Output Directory**: Points to `apps/web/.next`
- **Security Headers**: Adds basic security headers
- **Runtime**: Uses Node.js 20.x for API routes

## Troubleshooting

### Build Failures

1. **Missing Component Pages**: Ensure `generate:pages` runs before build
2. **Type Errors**: Run `pnpm typecheck` locally first
3. **Dependency Issues**: Clear cache with `pnpm store prune`

### Deployment Issues

1. **Vercel Build Failures**: Check build logs in Vercel dashboard
2. **Environment Variables**: Ensure all required secrets are set
3. **Memory Issues**: Consider upgrading Vercel plan for larger builds

### E2E Test Failures

1. **Base URL**: Ensure `VERCEL_PREVIEW_URL` is set correctly
2. **Timing Issues**: Add proper waits in Playwright tests
3. **Browser Dependencies**: Ensure Playwright browsers are installed

## Monitoring

- **GitHub Actions**: Monitor workflow runs in GitHub Actions tab
- **Vercel Dashboard**: View deployment status and logs
- **Turbo Cache**: Monitor cache hit rates for performance

## Security

- All secrets should be stored in GitHub repository settings
- Use least-privilege access tokens
- Regularly rotate tokens and credentials
- Monitor for dependency vulnerabilities with `pnpm audit`