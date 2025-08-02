import * as fs from "node:fs";
import * as path from "node:path";
import * as ts from "typescript";

type PropDoc = {
  name: string;
  type: string;
  description: string;
  defaultValue?: any;
  required?: boolean;
};

/**
 * Extract prop documentation from TypeScript interface with JSDoc comments
 */
export function extractPropsFromInterface(
  sourceFile: ts.SourceFile,
  interfaceName: string,
): PropDoc[] {
  const props: PropDoc[] = [];

  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node) && node.name.text === interfaceName) {
      node.members.forEach((member) => {
        if (ts.isPropertySignature(member) && member.name) {
          const propName = member.name.getText(sourceFile);
          const propType = member.type?.getText(sourceFile) || "unknown";
          const isOptional = !!member.questionToken;

          // Extract JSDoc comment
          const jsDocTags = ts.getJSDocTags(member);
          const description = jsDocTags
            .find(tag => tag.tagName?.text === "description")
            ?.comment
            ?.toString() || "";

          const defaultValueTag = jsDocTags
            .find(tag => tag.tagName?.text === "default");
          const defaultValue = defaultValueTag?.comment?.toString();

          props.push({
            name: propName,
            type: propType,
            description,
            defaultValue,
            required: !isOptional,
          });
        }
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return props;
}

/**
 * Generate prop config from component file
 */
export function generatePropConfig(componentPath: string): PropDoc[] {
  const program = ts.createProgram([componentPath], {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
  });

  const sourceFile = program.getSourceFile(componentPath);
  if (!sourceFile) {
    throw new Error(`Could not load source file: ${componentPath}`);
  }

  // Look for props interfaces (e.g., TextareaProps, ButtonProps)
  const props = extractPropsFromInterface(sourceFile, "TextareaProps");

  return props;
}
