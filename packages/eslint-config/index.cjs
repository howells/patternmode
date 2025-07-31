const antfu = require('@antfu/eslint-config').default;

const base = () => antfu({
  typescript: true,
  formatters: true,
  lessOpinionated: true,
});

const nextjs = () => antfu({
  typescript: true,
  nextjs: true,
  formatters: true,
  lessOpinionated: true,
});

const react = () => antfu({
  typescript: true,
  react: true,
  formatters: true,
  lessOpinionated: true,
});

module.exports = { base, nextjs, react };