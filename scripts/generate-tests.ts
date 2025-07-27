#!/usr/bin/env tsx

import { generateAllComponentTests, generatePlaywrightTests } from '../tests/utils/simple-test-generator'

console.log('🚀 Starting test generation...\n')

console.log('📦 Generating Vitest component tests...')
generateAllComponentTests()

console.log('\n🎭 Generating Playwright preview page tests...')
const playwrightTestCount = generatePlaywrightTests()

console.log('\n✅ Test generation complete!')
console.log(`📊 Summary:`)
console.log(`   • Component tests: 104 components`)
console.log(`   • Preview page tests: ${playwrightTestCount} pages`)
console.log(`\n▶️  To run tests:`)
console.log(`   pnpm test        # Run Vitest component tests`)
console.log(`   pnpm test:e2e    # Run Playwright tests`)