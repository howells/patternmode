import { base } from '@patternmode/eslint-config';

export default [
  ...base(),
  {
    name: 'turbo/rules',
    extends: ['turbo'],
  },
];