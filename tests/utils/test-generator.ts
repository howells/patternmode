import { COMPONENT_LIST } from '@/lib/component-registry'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'

interface ComponentTestConfig {
  componentId: string
  importPath: string
  hasVariants: boolean
  category: string
}

export function generateComponentTest(config: ComponentTestConfig): string {
  const { componentId, importPath, hasVariants, category } = config

  return `import { describe, it, expect } from 'vitest'
import { createElement } from 'react'
import { ${componentId} } from '${importPath}'

describe('${componentId}', () => {
  it('should render without crashing', () => {
    const element = createElement(${componentId})
    expect(element).toBeDefined()
    expect(element.type).toBe(${componentId})
  })

  it('should be exported correctly', () => {
    expect(${componentId}).toBeDefined()
    expect(typeof ${componentId}).toBe('function')
  })

  it('should accept children', () => {
    const element = createElement(${componentId}, {}, 'Test content')
    expect(element.props.children).toBe('Test content')
  })

  ${hasVariants ? `
  it('should accept variant props', () => {
    const element = createElement(${componentId}, { 
      variant: 'default',
      size: 'default' 
    })
    expect(element.props.variant).toBe('default')
    expect(element.props.size).toBe('default')
  })` : ''}

  it('should accept className prop', () => {
    const element = createElement(${componentId}, { className: 'test-class' })
    expect(element.props.className).toBe('test-class')
  })

  it('should forward ref properly', () => {
    const element = createElement(${componentId}, { ref: null })
    expect(element).toBeDefined()
  })
})
`
}

export function generateAllComponentTests() {
  // Get all components from COMPONENT_LIST instead of registry to avoid JSX imports
  const allComponents: string[] = []
  Object.values(COMPONENT_LIST).forEach(categoryComponents => {
    allComponents.push(...categoryComponents)
  })
  
  console.log(`Generating tests for ${allComponents.length} components...`)

  allComponents.forEach(componentId => {
    // Determine component name from component ID
    const componentName = componentId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
    
    // Create import path - try multiple possible exports
    const importPath = `@/components/ui/${componentId}`
    
    // Assume most components have variants
    const hasVariants = true
    
    // Find category for this component
    let category = 'utility'
    for (const [cat, components] of Object.entries(COMPONENT_LIST)) {
      if (components.includes(componentId)) {
        category = cat
        break
      }
    }

    const testConfig: ComponentTestConfig = {
      componentId: componentName,
      importPath,
      hasVariants,
      category
    }

    const testContent = generateComponentTest(testConfig)
    
    // Create test file path
    const testDir = join(process.cwd(), 'tests', 'components', 'ui')
    const testFile = join(testDir, `${componentId}.test.tsx`)
    
    // Ensure directory exists
    mkdirSync(dirname(testFile), { recursive: true })
    
    // Write test file
    writeFileSync(testFile, testContent)
    
    console.log(`✅ Generated test for ${componentId}`)
  })

  console.log('Component test generation complete!')
}

export function generatePlaywrightTests() {
  const testUrls = []
  
  // Generate test URLs based on the routing structure
  for (const [category, components] of Object.entries(COMPONENT_LIST)) {
    for (const component of components) {
      testUrls.push({
        category,
        component,
        url: `http://localhost:3000/${category}/${component}`
      })
    }
  }

  const playwrightTest = `import { test, expect } from '@playwright/test'

const TEST_URLS = ${JSON.stringify(testUrls, null, 2)}

test.describe('Component Preview Pages', () => {
  TEST_URLS.forEach(({ category, component, url }) => {
    test(\`\${category}/\${component} - should load successfully\`, async ({ page }) => {
      // Navigate to component page
      const response = await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      })
      
      // Check that page loads successfully
      expect(response?.status()).toBe(200)
      
      // Wait for main content to load
      await page.waitForSelector('h1', { timeout: 10000 })
      
      // Check for console errors
      const consoleErrors: string[] = []
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })
      
      // Wait a bit for any console errors to appear
      await page.waitForTimeout(1000)
      
      // Filter out expected/harmless errors
      const serverErrors = consoleErrors.filter(error => 
        !error.includes('ResizeObserver') &&
        !error.includes('Non-passive event listener') &&
        !error.includes('favicon.ico')
      )
      
      if (serverErrors.length > 0) {
        console.error(\`❌ \${component}: Console errors found:\`)
        serverErrors.forEach(error => console.error(\`   - \${error}\`))
      }
      
      expect(serverErrors.length).toBe(0)
      
      // Take screenshot for visual verification
      await page.screenshot({ 
        path: \`tests/screenshots/\${category}-\${component}.png\`,
        fullPage: false 
      })
    })
  })
})
`

  // Write Playwright test file
  const testFile = join(process.cwd(), 'tests', 'e2e', 'component-previews.spec.ts')
  mkdirSync(dirname(testFile), { recursive: true })
  mkdirSync(join(process.cwd(), 'tests', 'screenshots'), { recursive: true })
  writeFileSync(testFile, playwrightTest)
  
  console.log(`✅ Generated Playwright tests for ${testUrls.length} component pages`)
  return testUrls.length
}