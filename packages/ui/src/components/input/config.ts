import type { ComponentConfig } from "../../types/component-types";
import { Type } from "lucide-react";
import { Input } from "./component";
import {
  DefaultExample,
  FileExample,
  MixedPrefixSuffixExample,
  NumberExample,
  PasswordExample,
  PrefixSuffixIconsExample,
  PrefixSuffixStylingExample,
  PrefixSuffixTextExample,
  SearchExample,
  SizesExample,
  StatesExample,
  TypesExample,
} from "./examples";

export const inputConfig: ComponentConfig = {
  id: "input",
  name: "Input",
  description: "Single-line text input field with validation support and various styling options including prefix/suffix content, multiple input types, and comprehensive form integration.",
  category: "controls",
  featured: true,
  icon: Type,
  importStatement: `import { Input } from "@patternmode/ui/input";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic text input with placeholder",
      component: DefaultExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Small, base, and large input sizes",
      component: SizesExample,
    },
    {
      id: "types",
      title: "Input Types",
      description: "Various HTML input types including text, email, password, search, and number",
      component: TypesExample,
    },
    {
      id: "states",
      title: "States",
      description: "Different input states including normal, disabled, error, and required",
      component: StatesExample,
    },
    {
      id: "search",
      title: "Search Input",
      description: "Search input with automatic search icon",
      component: SearchExample,
    },
    {
      id: "password",
      title: "Password Input",
      description: "Password input with built-in visibility toggle",
      component: PasswordExample,
    },
    {
      id: "number",
      title: "Number Input",
      description: "Number inputs with and without stepper controls",
      component: NumberExample,
    },
    {
      id: "file",
      title: "File Input",
      description: "Styled file input for file uploads",
      component: FileExample,
    },
    {
      id: "prefix-suffix-text",
      title: "Prefix & Suffix Text",
      description: "Text prefix and suffix for URLs, currencies, and domains",
      component: PrefixSuffixTextExample,
    },
    {
      id: "prefix-suffix-styling",
      title: "Prefix & Suffix Styling",
      description: "Comparison of styled vs unstyled prefix and suffix content",
      component: PrefixSuffixStylingExample,
    },
    {
      id: "prefix-suffix-icons",
      title: "Prefix & Suffix Icons",
      description: "Icon prefix and suffix for enhanced visual context",
      component: PrefixSuffixIconsExample,
    },
    {
      id: "mixed-prefix-suffix",
      title: "Mixed Prefix & Suffix",
      description: "Combining text and icons in prefix and suffix areas",
      component: MixedPrefixSuffixExample,
    },
  ],
  components: [
    {
      name: "Input",
      description: "Single-line text input field with comprehensive customization options",
      component: Input,
    },
  ],
};
