import type { ComponentConfig } from "@/lib/component-config-types";

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
      code: `<DescriptionList>
  <DescriptionTerm>Name</DescriptionTerm>
  <DescriptionDetails>John Doe</DescriptionDetails>
  <DescriptionTerm>Email</DescriptionTerm>
  <DescriptionDetails>john@example.com</DescriptionDetails>
  <DescriptionTerm>Role</DescriptionTerm>
  <DescriptionDetails>Software Engineer</DescriptionDetails>
</DescriptionList>`,
    },
    {
      id: "user-profile",
      title: "User Profile",
      description:
        "Display comprehensive user profile information with contact details and employment information.",
      code: `<DescriptionList>
  <DescriptionTerm>Full Name</DescriptionTerm>
  <DescriptionDetails>Sarah Johnson</DescriptionDetails>
  <DescriptionTerm>Username</DescriptionTerm>
  <DescriptionDetails>@sarahj</DescriptionDetails>
  <DescriptionTerm>Email Address</DescriptionTerm>
  <DescriptionDetails>sarah.johnson@company.com</DescriptionDetails>
  <DescriptionTerm>Department</DescriptionTerm>
  <DescriptionDetails>Product Design</DescriptionDetails>
  <DescriptionTerm>Location</DescriptionTerm>
  <DescriptionDetails>San Francisco, CA</DescriptionDetails>
  <DescriptionTerm>Start Date</DescriptionTerm>
  <DescriptionDetails>March 15, 2023</DescriptionDetails>
</DescriptionList>`,
    },
    {
      id: "project-details",
      title: "Project Information",
      description:
        "Show project details with status indicators and rich content formatting.",
      code: `<DescriptionList>
  <DescriptionTerm>Project Name</DescriptionTerm>
  <DescriptionDetails>Patternmode Component Library</DescriptionDetails>
  <DescriptionTerm>Status</DescriptionTerm>
  <DescriptionDetails>
    <span className="inline-flex items-center gap-1">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      Active Development
    </span>
  </DescriptionDetails>
  <DescriptionTerm>Technologies</DescriptionTerm>
  <DescriptionDetails>React, TypeScript, Tailwind CSS, Base UI</DescriptionDetails>
  <DescriptionTerm>Team Size</DescriptionTerm>
  <DescriptionDetails>5 developers</DescriptionDetails>
  <DescriptionTerm>Budget</DescriptionTerm>
  <DescriptionDetails>$150,000</DescriptionDetails>
</DescriptionList>`,
    },
    {
      id: "system-info",
      title: "System Information",
      description:
        "Display technical system information with monospace formatting for values.",
      code: `<DescriptionList>
  <DescriptionTerm>Operating System</DescriptionTerm>
  <DescriptionDetails>macOS Sonoma 14.5</DescriptionDetails>
  <DescriptionTerm>Node.js Version</DescriptionTerm>
  <DescriptionDetails>v20.11.0</DescriptionDetails>
  <DescriptionTerm>Package Manager</DescriptionTerm>
  <DescriptionDetails>pnpm 8.15.4</DescriptionDetails>
  <DescriptionTerm>Memory Usage</DescriptionTerm>
  <DescriptionDetails>
    <span className="font-mono text-sm">2.4 GB / 16 GB</span>
  </DescriptionDetails>
  <DescriptionTerm>CPU Usage</DescriptionTerm>
  <DescriptionDetails>
    <span className="font-mono text-sm">12%</span>
  </DescriptionDetails>
</DescriptionList>`,
    },
    {
      id: "product-specs",
      title: "Product Specifications",
      description:
        "Showcase product specifications with emphasized pricing and detailed technical information.",
      code: `<DescriptionList>
  <DescriptionTerm>Model</DescriptionTerm>
  <DescriptionDetails>MacBook Pro 16-inch</DescriptionDetails>
  <DescriptionTerm>Processor</DescriptionTerm>
  <DescriptionDetails>Apple M3 Pro chip</DescriptionDetails>
  <DescriptionTerm>Memory</DescriptionTerm>
  <DescriptionDetails>18GB unified memory</DescriptionDetails>
  <DescriptionTerm>Storage</DescriptionTerm>
  <DescriptionDetails>512GB SSD</DescriptionDetails>
  <DescriptionTerm>Display</DescriptionTerm>
  <DescriptionDetails>16.2-inch Liquid Retina XDR display</DescriptionDetails>
  <DescriptionTerm>Price</DescriptionTerm>
  <DescriptionDetails className="font-semibold text-green-600">$2,499</DescriptionDetails>
</DescriptionList>`,
    },
    {
      id: "order-details",
      title: "Order Information",
      description:
        "Display order details with status indicators and formatted addresses.",
      code: `<DescriptionList>
  <DescriptionTerm>Order Number</DescriptionTerm>
  <DescriptionDetails>#ORD-2024-001234</DescriptionDetails>
  <DescriptionTerm>Order Date</DescriptionTerm>
  <DescriptionDetails>January 15, 2024</DescriptionDetails>
  <DescriptionTerm>Customer</DescriptionTerm>
  <DescriptionDetails>Jane Smith</DescriptionDetails>
  <DescriptionTerm>Status</DescriptionTerm>
  <DescriptionDetails>
    <span className="inline-flex items-center gap-1 text-blue-600">
      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      Processing
    </span>
  </DescriptionDetails>
  <DescriptionTerm>Shipping Address</DescriptionTerm>
  <DescriptionDetails>
    123 Main Street<br />
    New York, NY 10001
  </DescriptionDetails>
  <DescriptionTerm>Total Amount</DescriptionTerm>
  <DescriptionDetails className="font-semibold">$129.99</DescriptionDetails>
</DescriptionList>`,
    },
    {
      id: "api-endpoint",
      title: "API Documentation",
      description:
        "Document API endpoints with code formatting and status code information.",
      code: `<DescriptionList>
  <DescriptionTerm>Endpoint</DescriptionTerm>
  <DescriptionDetails>
    <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm">
      GET /api/users/:id
    </code>
  </DescriptionDetails>
  <DescriptionTerm>Description</DescriptionTerm>
  <DescriptionDetails>Retrieve a specific user by their unique identifier</DescriptionDetails>
  <DescriptionTerm>Authentication</DescriptionTerm>
  <DescriptionDetails>Bearer token required</DescriptionDetails>
  <DescriptionTerm>Rate Limit</DescriptionTerm>
  <DescriptionDetails>100 requests per minute</DescriptionDetails>
  <DescriptionTerm>Status Codes</DescriptionTerm>
  <DescriptionDetails>
    <div className="space-y-1">
      <div><code className="text-green-600">200</code> - Success</div>
      <div><code className="text-red-600">404</code> - User not found</div>
      <div><code className="text-red-600">401</code> - Unauthorized</div>
    </div>
  </DescriptionDetails>
</DescriptionList>`,
    },
    {
      id: "event-details",
      title: "Event Information",
      description:
        "Display event details with venue information and registration status.",
      code: `<DescriptionList>
  <DescriptionTerm>Event Name</DescriptionTerm>
  <DescriptionDetails>React Conference 2024</DescriptionDetails>
  <DescriptionTerm>Date & Time</DescriptionTerm>
  <DescriptionDetails>March 20, 2024 at 9:00 AM PST</DescriptionDetails>
  <DescriptionTerm>Venue</DescriptionTerm>
  <DescriptionDetails>
    Moscone Center<br />
    San Francisco, CA
  </DescriptionDetails>
  <DescriptionTerm>Capacity</DescriptionTerm>
  <DescriptionDetails>2,500 attendees</DescriptionDetails>
  <DescriptionTerm>Registration</DescriptionTerm>
  <DescriptionDetails>
    <span className="inline-flex items-center gap-1 text-green-600">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      Open
    </span>
  </DescriptionDetails>
  <DescriptionTerm>Ticket Price</DescriptionTerm>
  <DescriptionDetails>$299 (Early Bird: $199)</DescriptionDetails>
</DescriptionList>`,
    },
  ],
};
