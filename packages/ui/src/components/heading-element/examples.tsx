import { HeadingElement } from "@patternmode/ui";
import React from "react";

export function DefaultExample() {
  return (
    <div className="space-y-4">
      <HeadingElement level={1}>Heading Level 1</HeadingElement>
      <HeadingElement level={2}>Heading Level 2</HeadingElement>
      <HeadingElement level={3}>Heading Level 3</HeadingElement>
    </div>
  );
}

export function AllLevelsExample() {
  return (
    <div className="space-y-3">
      <HeadingElement level={1}>H1 - Main Page Title</HeadingElement>
      <HeadingElement level={2}>H2 - Section Title</HeadingElement>
      <HeadingElement level={3}>H3 - Subsection Title</HeadingElement>
      <HeadingElement level={4}>H4 - Sub-subsection Title</HeadingElement>
      <HeadingElement level={5}>H5 - Minor Heading</HeadingElement>
      <HeadingElement level={6}>H6 - Smallest Heading</HeadingElement>
    </div>
  );
}

export function StyledExample() {
  return (
    <div className="space-y-4">
      <HeadingElement level={1} className="text-4xl font-bold text-blue-600">
        Custom Styled H1
      </HeadingElement>
      <HeadingElement
        level={2}
        className="text-2xl font-semibold text-green-600 border-b-2 border-green-200 pb-2"
      >
        Styled H2 with Border
      </HeadingElement>
      <HeadingElement
        level={3}
        className="text-lg font-medium text-purple-600 bg-purple-50 p-3 rounded-lg"
      >
        H3 with Background
      </HeadingElement>
    </div>
  );
}

export function AccessibilityExample() {
  return (
    <div className="space-y-4">
      <HeadingElement
        level={1}
        id="main-title"
        className="text-3xl font-bold"
        aria-label="Main page title"
      >
        Accessible Main Title
      </HeadingElement>
      <HeadingElement
        level={2}
        id="section-1"
        className="text-xl font-semibold"
      >
        Section with ID
      </HeadingElement>
      <HeadingElement level={3} className="sr-only">
        Screen Reader Only Heading
      </HeadingElement>
    </div>
  );
}

export function SemanticHierarchyExample() {
  return (
    <div className="space-y-4 max-w-2xl">
      <HeadingElement level={1} className="text-3xl font-bold text-gray-900">
        The Importance of Semantic HTML
      </HeadingElement>

      <p className="text-gray-600">
        Understanding how to structure content with proper heading hierarchy is
        crucial for accessibility and SEO.
      </p>

      <HeadingElement
        level={2}
        className="text-2xl font-semibold text-gray-800 mt-6 mb-3"
      >
        Why Semantic Headings Matter
      </HeadingElement>

      <p className="text-gray-600 mb-4">
        Screen readers and search engines rely on heading structure to
        understand content organization.
      </p>

      <HeadingElement
        level={3}
        className="text-xl font-medium text-gray-700 mt-4 mb-2"
      >
        Accessibility Benefits
      </HeadingElement>

      <p className="text-gray-600 mb-4">
        Proper heading levels help users navigate content efficiently.
      </p>

      <HeadingElement
        level={3}
        className="text-xl font-medium text-gray-700 mt-4 mb-2"
      >
        SEO Advantages
      </HeadingElement>

      <p className="text-gray-600">
        Search engines use heading structure to understand page content
        hierarchy.
      </p>
    </div>
  );
}
export const /**
              *
              */
  HeadingElementExample = DefaultExample;
