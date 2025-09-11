import type { ComponentConfig } from "@patternmode/config/component-types";
import { Eye } from "lucide-react";
import { PreviewCard } from "./components/preview-card";
import { PreviewCardArrow } from "./components/preview-card-arrow";
import { PreviewCardBody } from "./components/preview-card-body";
import { PreviewCardContent } from "./components/preview-card-content";
import { PreviewCardDescription } from "./components/preview-card-description";
import { PreviewCardFooter } from "./components/preview-card-footer";
import { PreviewCardHeader } from "./components/preview-card-header";
import { PreviewCardHeading } from "./components/preview-card-heading";
import { PreviewCardImage } from "./components/preview-card-image";
import { PreviewCardPortal } from "./components/preview-card-portal";
import { PreviewCardPositioner } from "./components/preview-card-positioner";
import { PreviewCardTrigger } from "./components/preview-card-trigger";
import {
  DefaultExample,
  UserProfileExample,
  WithImageExample,
} from "./examples";

export const previewCardConfig: ComponentConfig = {
  id: "preview-card",
  name: "Preview Card",
  description:
    "A comprehensive preview card system for displaying rich content previews with hover interactions. Built on Base UI PreviewCard for creating link previews, content cards, and contextual information displays.",
  category: "media",
  icon: Eye,
  importStatement: `import { PreviewCard, PreviewCardTrigger, PreviewCardContent, PreviewCardArrow, PreviewCardImage, PreviewCardHeader, PreviewCardHeading, PreviewCardDescription, PreviewCardBody, PreviewCardFooter } from "@patternmode/preview-card";`,
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
      name: "Preview Card",
      description: "Root container for hover-triggered content previews.",
      component: PreviewCard,
      primary: true,
    },
    {
      name: "Preview Card Trigger",
      description: "Interactive element that shows preview on hover.",
      component: PreviewCardTrigger,
    },
    {
      name: "Preview Card Content",
      description: "Main content container with positioning.",
      component: PreviewCardContent,
    },
    {
      name: "Preview Card Arrow",
      description: "Visual arrow pointing to trigger element.",
      component: PreviewCardArrow,
    },
    {
      name: "Preview Card Image",
      description: "Header image with consistent aspect ratio.",
      component: PreviewCardImage,
    },
    {
      name: "Preview Card Header",
      description: "Container for title and description.",
      component: PreviewCardHeader,
    },
    {
      name: "Preview Card Heading",
      description: "Heading component with prominent typography.",
      component: PreviewCardHeading,
    },
    {
      name: "Preview Card Description",
      description: "Description text with muted styling.",
      component: PreviewCardDescription,
    },
    {
      name: "Preview Card Body",
      description: "Main content area between header and footer.",
      component: PreviewCardBody,
    },
    {
      name: "Preview Card Footer",
      description: "Footer section for actions and metadata.",
      component: PreviewCardFooter,
    },
    {
      name: "Preview Card Portal",
      description: "Portal for rendering outside DOM tree.",
      component: PreviewCardPortal,
    },
    {
      name: "Preview Card Positioner",
      description: "Smart positioning with collision detection.",
      component: PreviewCardPositioner,
    },
  ],
};
