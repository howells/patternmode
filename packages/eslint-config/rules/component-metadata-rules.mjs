/**
 * Component Metadata Rules
 *
 * Custom ESLint rules to enforce required JSDoc metadata for React components.
 * Ensures all components have @icon and @category tags.
 */

/**
 * Custom rule to require @icon and @category tags in JSDoc comments for React components
 */
const requireComponentMetadata = {
  meta: {
    type: "problem",
    docs: {
      description: "require @icon and @category tags in JSDoc comments for React components",
      category: "Best Practices",
    },
    fixable: null,
    schema: [],
    messages: {
      missingIcon: "React component '{{name}}' is missing @icon tag in JSDoc comment",
      missingCategory: "React component '{{name}}' is missing @category tag in JSDoc comment",
      missingJSDoc: "React component '{{name}}' is missing JSDoc comment",
      invalidCategory: "React component '{{name}}' has invalid @category '{{category}}'. Must be one of: {{validCategories}}",
    },
  },
  create(context) {
    const validCategories = [
      "inputs",
      "layout",
      "navigation",
      "feedback",
      "overlay",
      "data",
      "media",
      "utility",
      "forms",
      "charts",
      "text",
    ];

    /**
     * Check if a node is the main React component (matches directory name or is the primary export)
     */
    function isMainComponent(node) {
      if (!node.id?.name || !/^[A-Z]/.test(node.id.name)) {
        return false;
      }

      const filename = context.getFilename();
      const componentDirName = filename.split("/").slice(-2, -1)[0]; // Get directory name
      const expectedComponentName = componentDirName?.split("-").map(word =>
        word.charAt(0).toUpperCase() + word.slice(1),
      ).join("");

      // Only check the main component that matches the directory name
      return node.id.name === expectedComponentName;
    }

    /**
     * Get JSDoc comment for a node
     */
    function getJSDocComment(node) {
      const sourceCode = context.getSourceCode();

      // For VariableDeclarator, we need to look at the parent VariableDeclaration
      const targetNode = node.type === "VariableDeclarator" ? node.parent : node;
      const comments = sourceCode.getCommentsBefore(targetNode);

      // Find the last JSDoc comment (/** */) that's close to the declaration
      for (let i = comments.length - 1; i >= 0; i--) {
        const comment = comments[i];
        if (comment.type === "Block" && comment.value.startsWith("*")) {
          // Check if the comment is reasonably close to the declaration (within 5 lines)
          const commentEndLine = comment.loc.end.line;
          const nodeStartLine = targetNode.loc.start.line;
          if (nodeStartLine - commentEndLine <= 5) {
            return comment;
          }
        }
      }
      return null;
    }

    /**
     * Parse JSDoc tags from comment
     */
    function parseJSDocTags(comment) {
      const tags = {};
      const lines = comment.value.split("\n");

      for (const line of lines) {
        const match = line.match(/^\s*\*\s*@(\w+)\s+(.+)$/);
        if (match) {
          const [, tagName, tagValue] = match;
          tags[tagName] = tagValue.trim();
        }
      }

      return tags;
    }

    /**
     * Check component for required metadata
     */
    function checkComponent(node) {
      const componentName = node.id?.name;
      if (!componentName) { return; }

      const jsDocComment = getJSDocComment(node);
      if (!jsDocComment) {
        context.report({
          node,
          messageId: "missingJSDoc",
          data: { name: componentName },
        });
        return;
      }

      const tags = parseJSDocTags(jsDocComment);

      // Check for @icon tag
      if (!tags.icon) {
        context.report({
          node,
          messageId: "missingIcon",
          data: { name: componentName },
        });
      }

      // Check for @category tag
      if (!tags.category) {
        context.report({
          node,
          messageId: "missingCategory",
          data: { name: componentName },
        });
      }
      else if (!validCategories.includes(tags.category)) {
        context.report({
          node,
          messageId: "invalidCategory",
          data: {
            name: componentName,
            category: tags.category,
            validCategories: validCategories.join(", "),
          },
        });
      }
    }

    return {
      VariableDeclarator(node) {
        if (isMainComponent(node)) {
          checkComponent(node);
        }
      },
      FunctionDeclaration(node) {
        if (isMainComponent(node)) {
          checkComponent(node);
        }
      },
    };
  },
};

/**
 * Custom rules for component metadata
 */
export const componentMetadataRules = {
  "require-component-metadata": requireComponentMetadata,
};

/**
 * Configuration for component metadata rules
 */
export const componentMetadataConfig = {
  name: "component-metadata-rules",
  files: ["**/src/components/**/*.tsx", "**/components/**/*.tsx"],
  ignores: ["**/examples.tsx", "**/examples/**/*.tsx"],
  plugins: {
    "component-metadata": {
      rules: componentMetadataRules,
    },
  },
  rules: {
    "component-metadata/require-component-metadata": "error",
  },
};
