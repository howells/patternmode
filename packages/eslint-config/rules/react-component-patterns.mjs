/**
 * React Component Pattern Rules
 *
 * Enforces consistent React component patterns across the codebase.
 * Specifically enforces React.forwardRef pattern for all React components.
 */

/**
 * Rules to enforce React.forwardRef pattern for all React components
 */
export const reactComponentPatternRules = {
  // Enforce React.forwardRef pattern for all React components (extends base rules)
  "no-restricted-syntax": [
    "error",
    // Keep existing base rules
    "TSEnumDeclaration[const=true]",
    "TSExportAssignment",
    // Add React component restrictions
    {
      selector:
        "VariableDeclaration > VariableDeclarator[id.name=/^[A-Z]/][init.type=ArrowFunctionExpression]",
      message:
        "React components should use React.forwardRef pattern instead of arrow functions. Use: const ComponentName = React.forwardRef<RefType, PropsType>((props, ref) => { ... });",
    },
    {
      selector: "FunctionDeclaration[id.name=/^[A-Z]/]",
      message:
        "React components should use const with React.forwardRef pattern instead of function declarations. Use: const ComponentName = React.forwardRef<RefType, PropsType>((props, ref) => { ... });",
    },
    {
      selector:
        "VariableDeclaration > VariableDeclarator[id.name=/^[A-Z]/][init.type=MemberExpression]",
      message:
        "React components should use React.forwardRef pattern instead of component aliases. Use: const ComponentName = React.forwardRef<RefType, PropsType>((props, ref) => <BaseComponent.Root {...props} />);",
    },
    {
      selector:
        "VariableDeclaration > VariableDeclarator[id.name=/^[A-Z]/][init.type=CallExpression][init.callee.name=forwardRef]",
      message:
        "Use React.forwardRef instead of importing forwardRef separately. Use: const ComponentName = React.forwardRef<RefType, PropsType>((props, ref) => { ... });",
    },
  ],
};

/**
 * Configuration for React component pattern enforcement
 */
export const reactComponentPatternConfig = {
  name: "react-component-patterns",
  files: ["**/src/components/**/*.tsx", "**/components/**/*.tsx"],
  rules: reactComponentPatternRules,
};
