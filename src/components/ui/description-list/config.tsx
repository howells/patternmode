import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DescriptionListExample, DefaultExample, UserProfileExample, ProjectDetailsExample, SystemInfoExample, ProductSpecsExample, OrderDetailsExample, ApiEndpointExample, EventDetailsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "description-list",
  name: "Description List",
  description:
    "Components for creating structured description lists using semantic HTML. Provides organized display of term-definition pairs with responsive layouts and consistent styling across light and dark themes.",
  category: "data" as const,
  icon: "List",

  installation: {
    npm: "Built into Patternmode",
  },
  importStatement: `import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/ui/description-list";`,
  componentId: "DescriptionListExample",
  props: [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for styling customization",
      defaultValue: "",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Description List",
      description:
        "A simple description list with term-definition pairs for displaying structured information.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "user-profile",
      title: "User Profile",
      description:
        "Display comprehensive user profile information with contact details and employment information.",
      code: jsxToString(<UserProfileExample />),
    },
    {
      id: "project-details",
      title: "Project Information",
      description:
        "Show project details with status indicators and rich content formatting.",
      code: jsxToString(<ProjectDetailsExample />),,
    {
      id: "system-info",
      title: "System Information",
      description:
        "Display technical system information with monospace formatting for values.",
      code: jsxToString(<SystemInfoExample />),,
    },
    {
      id: "product-specs",
      title: "Product Specifications",
      description:
        "Showcase product specifications with emphasized pricing and detailed technical information.",
      code: jsxToString(<ProductSpecsExample />),,
    {
      id: "order-details",
      title: "Order Information",
      description:
        "Display order details with status indicators and formatted addresses.",
      code: jsxToString(<OrderDetailsExample />),,
    {
      id: "api-endpoint",
      title: "API Documentation",
      description:
        "Document API endpoints with code formatting and status code information.",
      code: jsxToString(<ApiEndpointExample />),,
    },
    {
      id: "event-details",
      title: "Event Information",
      description:
        "Display event details with venue information and registration status.",
      code: jsxToString(<EventDetailsExample />),,
    },
  ],
};
