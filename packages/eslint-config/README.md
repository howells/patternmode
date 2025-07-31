# @patternmode/eslint-config

Shared ESLint configuration for the PatternMode monorepo, built on top of [@antfu/eslint-config](https://github.com/antfu/eslint-config).

## Configurations

### Base
For general TypeScript projects:
```js
import { base } from '@patternmode/eslint-config';

export default base();
```

### Next.js
For Next.js applications:
```js
import { nextjs } from '@patternmode/eslint-config';

export default nextjs();
```

### React
For React libraries and components:
```js
import { react } from '@patternmode/eslint-config';

export default react();
```

## Features

- TypeScript support
- Formatters (Prettier integration)
- Less opinionated defaults
- Framework-specific rules (Next.js, React)