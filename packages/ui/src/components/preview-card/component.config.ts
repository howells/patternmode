import type { ComponentConfig } from "../../lib/component-config-types";
import { Eye } from "lucide-react";
import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBody,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardFooter,
  PreviewCardHeader,
  PreviewCardHeading,
  PreviewCardImage,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
} from "./component";
import { DefaultExample, UserProfileExample, WithImageExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "preview-card",
  name: "PreviewCard",
  description: "A comprehensive preview card system for displaying rich content previews with hover interactions. Built on Base UI PreviewCard for creating link previews, content cards, and contextual information displays.",
  category: "media",
  icon: Eye,
  importStatement: `import { PreviewCard, PreviewCardTrigger, PreviewCardContent, PreviewCardArrow, PreviewCardImage, PreviewCardHeader, PreviewCardHeading, PreviewCardDescription, PreviewCardBody, PreviewCardFooter } from "@patternmode/ui/preview-card";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic preview card with title and description",
      component: DefaultExample,
    },
    {
      id: "with-image",
      title: "With Image",
      description: "Preview card with header image and arrow",
      component: WithImageExample,
    },
    {
      id: "user-profile",
      title: "User Profile",
      description: "Preview card for user profile information",
      component: UserProfileExample,
    },
  ],
  components: [
    {
      name: "PreviewCard",
      description: "Root container for hover-triggered content previews.",
      component: PreviewCard,
      primary: true,
    },
    {
      name: "PreviewCardTrigger",
      description: "Interactive element that shows preview on hover.",
      component: PreviewCardTrigger,
    },
    {
      name: "PreviewCardContent",
      description: "Main content container with positioning.",
      component: PreviewCardContent,
    },
    {
      name: "PreviewCardArrow",
      description: "Visual arrow pointing to trigger element.",
      component: PreviewCardArrow,
    },
    {
      name: "PreviewCardImage",
      description: "Header image with consistent aspect ratio.",
      component: PreviewCardImage,
    },
    {
      name: "PreviewCardHeader",
      description: "Container for title and description.",
      component: PreviewCardHeader,
    },
    {
      name: "PreviewCardHeading",
      description: "Heading component with prominent typography.",
      component: PreviewCardHeading,
    },
    {
      name: "PreviewCardDescription",
      description: "Description text with muted styling.",
      component: PreviewCardDescription,
    },
    {
      name: "PreviewCardBody",
      description: "Main content area between header and footer.",
      component: PreviewCardBody,
    },
    {
      name: "PreviewCardFooter",
      description: "Footer section for actions and metadata.",
      component: PreviewCardFooter,
    },
    {
      name: "PreviewCardPortal",
      description: "Portal for rendering outside DOM tree.",
      component: PreviewCardPortal,
    },
    {
      name: "PreviewCardPositioner",
      description: "Smart positioning with collision detection.",
      component: PreviewCardPositioner,
    },
  ],
};
