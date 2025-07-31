import antfu from '@antfu/eslint-config';

export const base = () => antfu({
  typescript: true,
  formatters: true,
  lessOpinionated: true,
});

export const nextjs = () => antfu({
  typescript: true,
  nextjs: true,
  formatters: true,
  lessOpinionated: true,
});

export const react = () => antfu({
  typescript: true,
  react: true,
  formatters: true,
  lessOpinionated: true,
});