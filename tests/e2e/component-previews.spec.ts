import { test, expect } from '@playwright/test'

test.describe('Component Preview Pages', () => {
  test('text/code-block - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/text/code-block', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ code-block: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ code-block: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ code-block: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ code-block: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/text-code-block.png',
      fullPage: false 
    })
  })
  test('text/heading - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/text/heading', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ heading: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ heading: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ heading: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ heading: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/text-heading.png',
      fullPage: false 
    })
  })
  test('text/heading-element - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/text/heading-element', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ heading-element: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ heading-element: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ heading-element: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ heading-element: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/text-heading-element.png',
      fullPage: false 
    })
  })
  test('text/kbd - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/text/kbd', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ kbd: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ kbd: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ kbd: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ kbd: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/text-kbd.png',
      fullPage: false 
    })
  })
  test('text/label - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/text/label', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ label: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ label: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ label: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ label: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/text-label.png',
      fullPage: false 
    })
  })
  test('text/subheading - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/text/subheading', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ subheading: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ subheading: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ subheading: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ subheading: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/text-subheading.png',
      fullPage: false 
    })
  })
  test('text/text - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/text/text', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ text: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ text: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ text: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ text: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/text-text.png',
      fullPage: false 
    })
  })
  test('layout/card - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/layout/card', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ card: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ card: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ card: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ card: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/layout-card.png',
      fullPage: false 
    })
  })
  test('layout/grid - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/layout/grid', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ grid: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ grid: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ grid: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ grid: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/layout-grid.png',
      fullPage: false 
    })
  })
  test('layout/separator - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/layout/separator', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ separator: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ separator: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ separator: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ separator: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/layout-separator.png',
      fullPage: false 
    })
  })
  test('layout/stack - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/layout/stack', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ stack: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ stack: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ stack: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ stack: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/layout-stack.png',
      fullPage: false 
    })
  })
  test('navigation/breadcrumbs - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/navigation/breadcrumbs', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ breadcrumbs: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ breadcrumbs: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ breadcrumbs: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ breadcrumbs: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/navigation-breadcrumbs.png',
      fullPage: false 
    })
  })
  test('navigation/command - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/navigation/command', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ command: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ command: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ command: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ command: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/navigation-command.png',
      fullPage: false 
    })
  })
  test('navigation/menu - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/navigation/menu', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ menu: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ menu: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ menu: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ menu: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/navigation-menu.png',
      fullPage: false 
    })
  })
  test('navigation/menu-bar - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/navigation/menu-bar', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ menu-bar: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ menu-bar: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ menu-bar: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ menu-bar: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/navigation-menu-bar.png',
      fullPage: false 
    })
  })
  test('navigation/navbar - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/navigation/navbar', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ navbar: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ navbar: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ navbar: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ navbar: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/navigation-navbar.png',
      fullPage: false 
    })
  })
  test('navigation/navigation-menu - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/navigation/navigation-menu', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ navigation-menu: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ navigation-menu: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ navigation-menu: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ navigation-menu: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/navigation-navigation-menu.png',
      fullPage: false 
    })
  })
  test('navigation/pagination - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/navigation/pagination', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ pagination: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ pagination: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ pagination: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ pagination: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/navigation-pagination.png',
      fullPage: false 
    })
  })
  test('navigation/sidebar - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/navigation/sidebar', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ sidebar: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ sidebar: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ sidebar: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ sidebar: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/navigation-sidebar.png',
      fullPage: false 
    })
  })
  test('navigation/tab-navigation - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/navigation/tab-navigation', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ tab-navigation: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ tab-navigation: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ tab-navigation: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ tab-navigation: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/navigation-tab-navigation.png',
      fullPage: false 
    })
  })
  test('navigation/tabs - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/navigation/tabs', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ tabs: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ tabs: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ tabs: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ tabs: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/navigation-tabs.png',
      fullPage: false 
    })
  })
  test('navigation/toolbar - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/navigation/toolbar', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ toolbar: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ toolbar: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ toolbar: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ toolbar: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/navigation-toolbar.png',
      fullPage: false 
    })
  })
  test('feedback/badge - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/feedback/badge', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ badge: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ badge: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ badge: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ badge: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/feedback-badge.png',
      fullPage: false 
    })
  })
  test('feedback/callout - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/feedback/callout', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ callout: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ callout: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ callout: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ callout: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/feedback-callout.png',
      fullPage: false 
    })
  })
  test('feedback/dot - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/feedback/dot', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ dot: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ dot: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ dot: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ dot: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/feedback-dot.png',
      fullPage: false 
    })
  })
  test('feedback/loader - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/feedback/loader', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ loader: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ loader: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ loader: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ loader: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/feedback-loader.png',
      fullPage: false 
    })
  })
  test('feedback/meter - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/feedback/meter', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ meter: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ meter: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ meter: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ meter: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/feedback-meter.png',
      fullPage: false 
    })
  })
  test('feedback/progress - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/feedback/progress', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ progress: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ progress: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ progress: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ progress: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/feedback-progress.png',
      fullPage: false 
    })
  })
  test('feedback/progress-circle - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/feedback/progress-circle', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ progress-circle: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ progress-circle: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ progress-circle: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ progress-circle: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/feedback-progress-circle.png',
      fullPage: false 
    })
  })
  test('feedback/skeleton - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/feedback/skeleton', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ skeleton: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ skeleton: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ skeleton: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ skeleton: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/feedback-skeleton.png',
      fullPage: false 
    })
  })
  test('feedback/tag - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/feedback/tag', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ tag: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ tag: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ tag: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ tag: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/feedback-tag.png',
      fullPage: false 
    })
  })
  test('feedback/toast - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/feedback/toast', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ toast: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ toast: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ toast: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ toast: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/feedback-toast.png',
      fullPage: false 
    })
  })
  test('overlay/alert-dialog - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/overlay/alert-dialog', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ alert-dialog: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ alert-dialog: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ alert-dialog: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ alert-dialog: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/overlay-alert-dialog.png',
      fullPage: false 
    })
  })
  test('overlay/context-menu - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/overlay/context-menu', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ context-menu: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ context-menu: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ context-menu: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ context-menu: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/overlay-context-menu.png',
      fullPage: false 
    })
  })
  test('overlay/dialog - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/overlay/dialog', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ dialog: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ dialog: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ dialog: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ dialog: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/overlay-dialog.png',
      fullPage: false 
    })
  })
  test('overlay/drawer - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/overlay/drawer', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ drawer: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ drawer: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ drawer: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ drawer: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/overlay-drawer.png',
      fullPage: false 
    })
  })
  test('overlay/popover - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/overlay/popover', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ popover: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ popover: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ popover: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ popover: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/overlay-popover.png',
      fullPage: false 
    })
  })
  test('overlay/responsive-drawer - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/overlay/responsive-drawer', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ responsive-drawer: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ responsive-drawer: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ responsive-drawer: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ responsive-drawer: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/overlay-responsive-drawer.png',
      fullPage: false 
    })
  })
  test('overlay/sheet - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/overlay/sheet', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ sheet: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ sheet: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ sheet: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ sheet: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/overlay-sheet.png',
      fullPage: false 
    })
  })
  test('overlay/tooltip - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/overlay/tooltip', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ tooltip: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ tooltip: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ tooltip: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ tooltip: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/overlay-tooltip.png',
      fullPage: false 
    })
  })
  test('data/accordion - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/data/accordion', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ accordion: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ accordion: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ accordion: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ accordion: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/data-accordion.png',
      fullPage: false 
    })
  })
  test('data/collapsible - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/data/collapsible', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ collapsible: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ collapsible: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ collapsible: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ collapsible: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/data-collapsible.png',
      fullPage: false 
    })
  })
  test('data/description-list - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/data/description-list', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ description-list: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ description-list: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ description-list: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ description-list: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/data-description-list.png',
      fullPage: false 
    })
  })
  test('data/preview-card - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/data/preview-card', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ preview-card: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ preview-card: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ preview-card: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ preview-card: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/data-preview-card.png',
      fullPage: false 
    })
  })
  test('data/stacked-list - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/data/stacked-list', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ stacked-list: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ stacked-list: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ stacked-list: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ stacked-list: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/data-stacked-list.png',
      fullPage: false 
    })
  })
  test('data/table - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/data/table', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ table: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ table: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ table: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ table: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/data-table.png',
      fullPage: false 
    })
  })
  test('media/avatar - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/media/avatar', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ avatar: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ avatar: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ avatar: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ avatar: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/media-avatar.png',
      fullPage: false 
    })
  })
  test('media/carousel - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/media/carousel', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ carousel: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ carousel: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ carousel: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ carousel: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/media-carousel.png',
      fullPage: false 
    })
  })
  test('utility/copy-button - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/utility/copy-button', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ copy-button: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ copy-button: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ copy-button: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ copy-button: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/utility-copy-button.png',
      fullPage: false 
    })
  })
  test('utility/empty-state - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/utility/empty-state', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ empty-state: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ empty-state: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ empty-state: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ empty-state: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/utility-empty-state.png',
      fullPage: false 
    })
  })
  test('utility/inspector - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/utility/inspector', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ inspector: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ inspector: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ inspector: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ inspector: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/utility-inspector.png',
      fullPage: false 
    })
  })
  test('utility/scroll-area - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/utility/scroll-area', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ scroll-area: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ scroll-area: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ scroll-area: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ scroll-area: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/utility-scroll-area.png',
      fullPage: false 
    })
  })
  test('utility/touch-target - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/utility/touch-target', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ touch-target: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ touch-target: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ touch-target: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ touch-target: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/utility-touch-target.png',
      fullPage: false 
    })
  })
  test('utility/tracker - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/utility/tracker', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ tracker: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ tracker: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ tracker: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ tracker: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/utility-tracker.png',
      fullPage: false 
    })
  })
  test('utility/icon - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/utility/icon', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ icon: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ icon: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ icon: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ icon: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/utility-icon.png',
      fullPage: false 
    })
  })
  test('inputs/button - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/button', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ button: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ button: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ button: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ button: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-button.png',
      fullPage: false 
    })
  })
  test('inputs/calendar - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/calendar', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ calendar: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ calendar: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ calendar: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ calendar: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-calendar.png',
      fullPage: false 
    })
  })
  test('inputs/checkbox - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/checkbox', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ checkbox: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ checkbox: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ checkbox: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ checkbox: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-checkbox.png',
      fullPage: false 
    })
  })
  test('inputs/checkbox-group - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/checkbox-group', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ checkbox-group: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ checkbox-group: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ checkbox-group: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ checkbox-group: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-checkbox-group.png',
      fullPage: false 
    })
  })
  test('inputs/combobox - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/combobox', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ combobox: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ combobox: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ combobox: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ combobox: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-combobox.png',
      fullPage: false 
    })
  })
  test('inputs/date-picker - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/date-picker', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ date-picker: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ date-picker: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ date-picker: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ date-picker: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-date-picker.png',
      fullPage: false 
    })
  })
  test('inputs/date-range-picker - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/date-range-picker', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ date-range-picker: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ date-range-picker: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ date-range-picker: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ date-range-picker: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-date-range-picker.png',
      fullPage: false 
    })
  })
  test('inputs/dismiss-button - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/dismiss-button', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ dismiss-button: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ dismiss-button: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ dismiss-button: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ dismiss-button: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-dismiss-button.png',
      fullPage: false 
    })
  })
  test('inputs/icon-select - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/icon-select', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ icon-select: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ icon-select: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ icon-select: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ icon-select: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-icon-select.png',
      fullPage: false 
    })
  })
  test('inputs/input - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/input', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ input: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for specific "Component not found" errors with paths
    const componentNotFoundErrors = await page.locator('text=Component not found:').count()
    if (componentNotFoundErrors > 0) {
      console.error('❌ input: Found "Component not found" errors')
      
      // Try to get the full error message including tried paths
      const errorElements = await page.locator('text=Component not found:').all()
      for (const errorElement of errorElements) {
        const parentElement = await errorElement.locator('..').first()
        const fullErrorText = await parentElement.textContent()
        console.error('   Component error:', fullErrorText?.slice(0, 200) + '...')
      }
    }
    expect(componentNotFoundErrors).toBe(0)

    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined',
      'Tried paths:'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ input: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ input: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ input: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-input.png',
      fullPage: false 
    })
  })
  test('inputs/number-field - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/number-field', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ number-field: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ number-field: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ number-field: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ number-field: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-number-field.png',
      fullPage: false 
    })
  })
  test('inputs/radio - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/radio', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ radio: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ radio: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ radio: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ radio: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-radio.png',
      fullPage: false 
    })
  })
  test('inputs/radio-card-group - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/radio-card-group', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ radio-card-group: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ radio-card-group: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ radio-card-group: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ radio-card-group: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-radio-card-group.png',
      fullPage: false 
    })
  })
  test('inputs/radio-group - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/radio-group', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ radio-group: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ radio-group: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ radio-group: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ radio-group: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-radio-group.png',
      fullPage: false 
    })
  })
  test('inputs/select - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/select', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ select: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ select: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ select: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ select: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-select.png',
      fullPage: false 
    })
  })
  test('inputs/select-native - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/select-native', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ select-native: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ select-native: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ select-native: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ select-native: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-select-native.png',
      fullPage: false 
    })
  })
  test('inputs/slider - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/slider', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ slider: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ slider: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ slider: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ slider: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-slider.png',
      fullPage: false 
    })
  })
  test('inputs/split-button - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/split-button', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ split-button: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ split-button: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ split-button: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ split-button: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-split-button.png',
      fullPage: false 
    })
  })
  test('inputs/switch - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/switch', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ switch: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ switch: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ switch: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ switch: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-switch.png',
      fullPage: false 
    })
  })
  test('inputs/textarea - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/textarea', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ textarea: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ textarea: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ textarea: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ textarea: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-textarea.png',
      fullPage: false 
    })
  })
  test('inputs/toggle - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/toggle', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ toggle: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ toggle: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ toggle: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ toggle: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-toggle.png',
      fullPage: false 
    })
  })
  test('inputs/toggle-group - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/inputs/toggle-group', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ toggle-group: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ toggle-group: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ toggle-group: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ toggle-group: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/inputs-toggle-group.png',
      fullPage: false 
    })
  })
  test('forms/field - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/forms/field', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ field: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ field: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ field: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ field: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/forms-field.png',
      fullPage: false 
    })
  })
  test('forms/fieldset - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/forms/fieldset', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ fieldset: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ fieldset: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ fieldset: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ fieldset: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/forms-fieldset.png',
      fullPage: false 
    })
  })
  test('forms/form - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/forms/form', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ form: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ form: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ form: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ form: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/forms-form.png',
      fullPage: false 
    })
  })
  test('forms/tag-input - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/forms/tag-input', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ tag-input: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ tag-input: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ tag-input: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ tag-input: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/forms-tag-input.png',
      fullPage: false 
    })
  })
  test('charts/area-chart - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/charts/area-chart', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ area-chart: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ area-chart: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ area-chart: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ area-chart: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/charts-area-chart.png',
      fullPage: false 
    })
  })
  test('charts/bar-chart - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/charts/bar-chart', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ bar-chart: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ bar-chart: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ bar-chart: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ bar-chart: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/charts-bar-chart.png',
      fullPage: false 
    })
  })
  test('charts/bar-list - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/charts/bar-list', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ bar-list: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ bar-list: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ bar-list: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ bar-list: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/charts-bar-list.png',
      fullPage: false 
    })
  })
  test('charts/category-bar - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/charts/category-bar', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ category-bar: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ category-bar: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ category-bar: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ category-bar: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/charts-category-bar.png',
      fullPage: false 
    })
  })
  test('charts/combo-chart - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/charts/combo-chart', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ combo-chart: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ combo-chart: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ combo-chart: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ combo-chart: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/charts-combo-chart.png',
      fullPage: false 
    })
  })
  test('charts/donut-chart - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/charts/donut-chart', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ donut-chart: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ donut-chart: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ donut-chart: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ donut-chart: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/charts-donut-chart.png',
      fullPage: false 
    })
  })
  test('charts/line-chart - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/charts/line-chart', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ line-chart: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ line-chart: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ line-chart: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ line-chart: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/charts-line-chart.png',
      fullPage: false 
    })
  })
  test('charts/spark-chart - should load successfully', async ({ page }) => {
    // Set up console error tracking before navigation
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate to component page
    const response = await page.goto('http://localhost:3000/ui/charts/spark-chart', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Check that page loads successfully
    expect(response?.status()).toBe(200)
    
    // Wait for main content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Critical: Check for "Example Load Error" text on the page
    const exampleLoadErrors = await page.locator('text=Example Load Error').count()
    if (exampleLoadErrors > 0) {
      console.error('❌ spark-chart: Found "Example Load Error" on page')
      
      // Try to get more details about the error
      const errorElements = await page.locator('text=Example Load Error').all()
      for (const errorElement of errorElements) {
        const errorText = await errorElement.textContent()
        console.error('   Error details:', errorText)
      }
    }
    expect(exampleLoadErrors).toBe(0)
    
    // Check for other error indicators in the UI
    const errorTexts = [
      'Error:',
      'Failed to load',
      'Component not found',
      'TypeError',
      'ReferenceError',
      'Cannot read',
      'is not defined'
    ]
    
    for (const errorText of errorTexts) {
      const errorCount = await page.locator(`text=${errorText}`).count()
      if (errorCount > 0) {
        console.error('❌ spark-chart: Found error indicator: "' + errorText + '"')
        expect(errorCount).toBe(0)
      }
    }
    
    // Wait a bit more for any async errors to appear
    await page.waitForTimeout(2000)
    
    // Filter out expected/harmless console errors
    const serverErrors = consoleErrors.filter(error => 
      !error.includes('ResizeObserver') &&
      !error.includes('Non-passive event listener') &&
      !error.includes('favicon.ico') &&
      !error.includes('404') && // Ignore 404s for missing assets
      !error.includes('net::ERR_FAILED') &&
      !error.includes('lucide-react') && // Ignore lucide icon errors
      !error.includes('Name in Lucide DynamicIcon not found')
    )
    
    if (serverErrors.length > 0) {
      console.error('❌ spark-chart: Console errors found:')
      serverErrors.forEach(error => console.error('   - ' + error))
    }
    
    expect(serverErrors.length).toBe(0)
    
    // Check that component examples are actually rendered
    const componentExamples = await page.locator([
      '[data-testid="component-example"]',
      '[data-testid="example"]', 
      '.component-example',
      '.example-container',
      '[class*="example"]',
      '.preview-container',
      '[data-testid*="preview"]'
    ].join(', ')).count()
    
    if (componentExamples === 0) {
      console.warn('⚠️ spark-chart: No component examples found on page')
      // Also check if there are any interactive elements that suggest working components
      const interactiveElements = await page.locator('button, input, select, [role="button"], [role="textbox"]').count()
      if (interactiveElements > 0) {
        console.log('   But found ' + interactiveElements + ' interactive elements, component may be working')
      }
    }
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/charts-spark-chart.png',
      fullPage: false 
    })
  })
})
