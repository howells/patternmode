"use client";

import React from "react";

import { Tracker } from "./component";

export function DefaultExample() {
  const data = [
    { color: "bg-emerald-500", tooltip: "Step 1: Completed" },
    { color: "bg-blue-500", tooltip: "Step 2: In Progress" },
    { color: "bg-zinc-300", tooltip: "Step 3: Pending" },
  ];

  return <Tracker data={data} />;
}

export function ProjectProgressExample() {
  const data = [
    { color: "bg-emerald-500", tooltip: "Completed tasks: 85%" },
    { color: "bg-blue-500", tooltip: "In progress: 10%" },
    { color: "bg-amber-500", tooltip: "Pending review: 3%" },
    { color: "bg-red-500", tooltip: "Failed: 2%" },
  ];

  return <Tracker data={data} hoverEffect />;
}

export function SystemStatusExample() {
  const data = [
    { color: "bg-emerald-500", tooltip: "Healthy services: 95%" },
    { color: "bg-amber-500", tooltip: "Warning: 4%" },
    { color: "bg-red-500", tooltip: "Critical: 1%" },
  ];

  return <Tracker data={data} />;
}

export function ServerMonitoringExample() {
  const data = [
    { color: "bg-green-500", tooltip: "Web Server: Online (99.9% uptime)" },
    { color: "bg-green-500", tooltip: "Database: Online (99.8% uptime)" },
    { color: "bg-red-500", tooltip: "Cache Server: Offline (maintenance)" },
    { color: "bg-green-500", tooltip: "CDN: Online (99.9% uptime)" },
    { color: "bg-yellow-500", tooltip: "API Gateway: Warning (high latency)" },
  ];

  return <Tracker data={data} hoverEffect />;
}

export function DeploymentPipelineExample() {
  const data = [
    { color: "bg-emerald-600", tooltip: "Code Review: Passed" },
    { color: "bg-emerald-600", tooltip: "Unit Tests: 98% coverage" },
    { color: "bg-emerald-600", tooltip: "Integration Tests: Passed" },
    { color: "bg-blue-500", tooltip: "Staging Deploy: In Progress" },
    { color: "bg-zinc-300", tooltip: "Production Deploy: Waiting" },
  ];

  return <Tracker data={data} />;
}

export function TaskCompletionExample() {
  const data = [
    { color: "bg-emerald-500", tooltip: "Research: Complete (5 days)" },
    { color: "bg-emerald-500", tooltip: "Design: Complete (3 days)" },
    { color: "bg-emerald-500", tooltip: "Prototyping: Complete (4 days)" },
    { color: "bg-amber-500", tooltip: "Development: 75% complete (2 days remaining)" },
    { color: "bg-zinc-300", tooltip: "Testing: Not started" },
    { color: "bg-zinc-300", tooltip: "Review: Not started" },
    { color: "bg-zinc-300", tooltip: "Launch: Not started" },
  ];

  return <Tracker data={data} hoverEffect className="w-96" />;
}

export function CustomColorExample() {
  const data = [
    { color: "bg-purple-500", tooltip: "Planning Phase: Complete" },
    { color: "bg-purple-500", tooltip: "Design Phase: Complete" },
    { color: "bg-indigo-500", tooltip: "Development: 80% Complete" },
    { color: "bg-pink-500", tooltip: "Testing: 50% Complete" },
    { color: "bg-gray-300", tooltip: "Deployment: Not Started" },
  ];

  return <Tracker data={data} defaultBackgroundColor="bg-gray-200" />;
}

export function SalesQuarterExample() {
  const data = [
    { color: "bg-emerald-500", tooltip: "Q1: 120% of target ($2.4M)" },
    { color: "bg-emerald-400", tooltip: "Q2: 105% of target ($2.1M)" },
    { color: "bg-red-500", tooltip: "Q3: 85% of target ($1.7M)" },
    { color: "bg-blue-500", tooltip: "Q4: Current quarter (On track)" },
  ];

  return <Tracker data={data} hoverEffect />;
}

export function BugTrackingExample() {
  const data = [
    { color: "bg-red-600", tooltip: "Critical bugs: 2" },
    { color: "bg-orange-500", tooltip: "High priority: 8" },
    { color: "bg-yellow-500", tooltip: "Medium priority: 15" },
    { color: "bg-green-500", tooltip: "Low priority: 23" },
    { color: "bg-gray-400", tooltip: "Feature requests: 12" },
  ];

  return <Tracker data={data} hoverEffect />;
}

export function MinimalExample() {
  const data = [
    { color: "bg-green-500" },
    { color: "bg-green-500" },
    { color: "bg-yellow-500" },
    { color: "bg-gray-300" },
  ];

  return <Tracker data={data} />;
}
