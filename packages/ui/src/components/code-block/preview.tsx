"use client";

import React from "react";
import { CodeBlock } from "./component";

export const CodeBlockExample = () => (
  <CodeBlock language="typescript">
    {`interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(data: Partial<User>): User {
  return {
    id: Date.now(),
    name: data.name || "Anonymous",
    email: data.email || "",
  };
}`}
  </CodeBlock>
);

export default CodeBlockExample;
