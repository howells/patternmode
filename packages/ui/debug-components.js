// Debug script to test component validation for context-menu, responsive-drawer, toast
const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

function kebabToPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function validateComponent(componentDir) {
  const componentsDir = join(process.cwd(), 'src', 'components');
  const componentFilePath = join(componentsDir, componentDir, `${componentDir}.tsx`);

  console.log(`\n=== ${componentDir.toUpperCase()} ===`);
  console.log('Component file path:', componentFilePath);
  console.log('File exists:', existsSync(componentFilePath));

  if (!existsSync(componentFilePath)) {
    return { error: 'File not found' };
  }

  const content = readFileSync(componentFilePath, 'utf8');
  const lines = content.split('\n');

  console.log('Total lines:', lines.length);

  // Find component definition
  let componentName = null;
  let componentLineIndex = -1;

  const componentPatterns = [
    /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*React\.forwardRef/,
    /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=/,
    /^(?:export\s+)?function\s+([A-Z][a-zA-Z0-9]*)\s*\(/,
  ];

  const expectedComponentName = kebabToPascalCase(componentDir);
  const candidateComponents = [];

  // First pass: collect all component candidates
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    for (const pattern of componentPatterns) {
      const match = line.match(pattern);
      if (match) {
        const name = match[1];

        if (name.includes('Internal') || name.includes('Util') ||
            name.includes('Helper') || name.startsWith('use') ||
            name.includes('Context') || name.includes('Provider') ||
            name.includes('Config') || name.includes('Schema')) {
          continue;
        }

        candidateComponents.push({ name, lineIndex: i });
        console.log(`Found candidate: ${name} at line ${i + 1}`);
      }
    }
  }

  console.log(`Expected component name: ${expectedComponentName}`);
  console.log('All candidates:', candidateComponents.map(c => c.name));

  // Second pass: prioritize the component that matches the expected name
  const exactMatch = candidateComponents.find(c => c.name === expectedComponentName);
  if (exactMatch) {
    componentName = exactMatch.name;
    componentLineIndex = exactMatch.lineIndex;
    console.log(`Found exact match: ${componentName} at line ${componentLineIndex + 1}`);
  } else if (candidateComponents.length > 0) {
    const firstCandidate = candidateComponents[0];
    componentName = firstCandidate.name;
    componentLineIndex = firstCandidate.lineIndex;
    console.log(`Using first candidate: ${componentName} at line ${componentLineIndex + 1}`);
  }

  console.log('Final component name:', componentName);
  console.log('Final component line index:', componentLineIndex, '(1-indexed:', componentLineIndex + 1, ')');
  
  if (!componentName) {
    return { error: 'No component found' };
  }

  // Look for JSDoc
  let jsdocStart = -1;
  let jsdocEnd = -1;
  let jsdocBlock = '';

  console.log('\nLooking for JSDoc...');
  
  for (let i = componentLineIndex - 1; i >= Math.max(0, componentLineIndex - 50); i--) {
    const line = lines[i].trim();

    if (line === '*/') {
      jsdocEnd = i;
      console.log('Found JSDoc end at line:', i + 1);
    }
    else if (line === '/**' && jsdocEnd > i) {
      jsdocStart = i;
      console.log('Found JSDoc start at line:', i + 1);
      break;
    }

    // Stop if we hit non-comment, non-empty line
    if (line && !line.startsWith('*') && !line.startsWith('//') &&
        line !== '*/' && !line.startsWith('import') &&
        !line.startsWith('const') && !line.startsWith('type') &&
        !line.startsWith('interface') && !line.startsWith('export')) {
      break;
    }
  }

  const hasJSDoc = jsdocStart >= 0 && jsdocEnd >= 0;
  console.log('Has JSDoc:', hasJSDoc);

  if (hasJSDoc) {
    jsdocBlock = lines.slice(jsdocStart, jsdocEnd + 1).join('\n');
    console.log('JSDoc block length:', jsdocBlock.length);
    
    // Test patterns
    const patterns = {
      component: /@component/.test(jsdocBlock),
      name: /@name\s+.+/.test(jsdocBlock),
      id: /@id\s+[\w-]+/.test(jsdocBlock),
      icon: /@icon\s+\w+/.test(jsdocBlock),
      category: /@category\s+\w+/.test(jsdocBlock),
      paramProps: /@param\s+props\s*-/.test(jsdocBlock),
      see: /@see\s+/.test(jsdocBlock),
    };

    console.log('Pattern matches:', patterns);
    
    // Show JSDoc content
    console.log('\nJSDoc content:');
    console.log(jsdocBlock);
  }

  return {
    componentName,
    componentLineIndex,
    hasJSDoc,
    jsdocStart,
    jsdocEnd
  };
}

// Test the three components
['context-menu', 'responsive-drawer', 'toast'].forEach(componentDir => {
  const result = validateComponent(componentDir);
  console.log(`\nResult for ${componentDir}:`, result);
});