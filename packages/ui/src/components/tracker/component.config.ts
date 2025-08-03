import type { ComponentConfig } from "../../lib/component-config-types";
import { Target } from "lucide-react";
import { Tracker } from "./component";
import {
  BugTrackingExample,
  CustomColorExample,
  DefaultExample,
  DeploymentPipelineExample,
  MinimalExample,
  ProjectProgressExample,
  SalesQuarterExample,
  ServerMonitoringExample,
  SystemStatusExample,
  TaskCompletionExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "tracker",
  name: "Tracker",
  description: "Visual progress tracker component for displaying steps, stages, or progress through a process using colored blocks. Each block can have custom colors, tooltips, and hover effects to provide detailed information about different stages.",
  category: "visual",
  icon: Target,
  importStatement: `import { Tracker } from "@patternmode/ui/tracker";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic progress tracker showing completion steps",
      component: DefaultExample,
    },
    {
      id: "project-progress",
      title: "Project Progress",
      description: "Project progress tracker with detailed task breakdown",
      component: ProjectProgressExample,
    },
    {
      id: "system-status",
      title: "System Status",
      description: "System health monitoring with status indicators",
      component: SystemStatusExample,
    },
    {
      id: "server-monitoring",
      title: "Server Monitoring",
      description: "Server infrastructure monitoring dashboard",
      component: ServerMonitoringExample,
    },
    {
      id: "deployment-pipeline",
      title: "Deployment Pipeline",
      description: "CI/CD deployment pipeline progress visualization",
      component: DeploymentPipelineExample,
    },
    {
      id: "task-completion",
      title: "Task Completion",
      description: "Project milestone and task completion tracker",
      component: TaskCompletionExample,
    },
    {
      id: "custom-color",
      title: "Custom Colors",
      description: "Tracker with custom color scheme and styling",
      component: CustomColorExample,
    },
    {
      id: "sales-quarter",
      title: "Sales Performance",
      description: "Quarterly sales performance tracking",
      component: SalesQuarterExample,
    },
    {
      id: "bug-tracking",
      title: "Bug Tracking",
      description: "Bug priority distribution and tracking",
      component: BugTrackingExample,
    },
    {
      id: "minimal",
      title: "Minimal",
      description: "Simple tracker without tooltips",
      component: MinimalExample,
    },
  ],
  components: [
    {
      name: "Tracker",
      description: "Visual progress indicator using colored blocks with optional tooltips and hover effects.",
      component: Tracker,
      primary: true,
    },
  ],
};
