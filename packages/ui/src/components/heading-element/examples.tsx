import React from "react";
import { HeadingElement } from "./component";

export const DefaultExample = () => {
  return <HeadingElement>Default Heading</HeadingElement>;
};

export const AllLevelsExample = () => {
  return (
    <div className="space-y-4">
      <HeadingElement level={1}>Heading Level 1</HeadingElement>
      <HeadingElement level={2}>Heading Level 2</HeadingElement>
      <HeadingElement level={3}>Heading Level 3</HeadingElement>
      <HeadingElement level={4}>Heading Level 4</HeadingElement>
      <HeadingElement level={5}>Heading Level 5</HeadingElement>
      <HeadingElement level={6}>Heading Level 6</HeadingElement>
    </div>
  );
};

export const WithCustomClassExample = () => {
  return (
    <HeadingElement
      level={2}
      className="text-blue-600 font-bold"
    >
      Custom Styled Heading
    </HeadingElement>
  );
};
