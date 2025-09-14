import type { ComponentConfig } from "@patternmode/config/component-types";
import { Type } from "lucide-react";
import { Input } from "./components/input";
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
  description:
    "Single-line text input field with validation support and various styling options including prefix/suffix content, multiple input types, and comprehensive form integration.",
  category: "controls",
  featured: true,
  icon: Type,
  importStatement: `import { Input } from "@patternmode/input";`,
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
      description:
        "Various HTML input types including text, email, password, search, and number",
      component: TypesExample,
    },
    {
      id: "password",
      title: "Password",
      description: "Password input with toggle visibility icon",
      component: PasswordExample,
    },
    {
      id: "search",
      title: "Search",
      description: "Search input with search icon",
      component: SearchExample,
    },
    {
      id: "prefix-suffix-text",
      title: "Prefix & Suffix Text",
      description: "Input with prefix and suffix text",
      component: PrefixSuffixTextExample,
    },
    {
      id: "prefix-suffix-icons",
      title: "Prefix & Suffix Icons",
      description: "Input with prefix and suffix icons",
      component: PrefixSuffixIconsExample,
    },
    {
      id: "prefix-suffix-styling",
      title: "Prefix & Suffix Styling",
      description: "Input with custom prefix/suffix styling options",
      component: PrefixSuffixStylingExample,
    },
    {
      id: "mixed-prefix-suffix",
      title: "Mixed Prefix/Suffix",
      description: "Combining text and icons",
      component: MixedPrefixSuffixExample,
    },
    {
      id: "number",
      title: "Number",
      description: "Number input with stepper controls",
      component: NumberExample,
    },
    {
      id: "file",
      title: "File",
      description: "File input styling",
      component: FileExample,
    },
    {
      id: "states",
      title: "States",
      description: "Disabled and error states",
      component: StatesExample,
    },
  ],
  components: [
    { name: "Input", description: "Text input field", component: Input },
  ],
};
