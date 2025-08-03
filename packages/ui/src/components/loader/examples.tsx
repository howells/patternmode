"use client";

import React from "react";

import { Loader } from "./component";

export const DefaultExample = () => {
  return <Loader aria-label="Loading" />;
};

export const SizesExample = () => {
  return (
    <div className="flex items-center gap-4">
      <Loader size="xs" aria-label="Loading" />
      <Loader size="sm" aria-label="Loading" />
      <Loader size="base" aria-label="Loading" />
      <Loader size="lg" aria-label="Loading" />
      <Loader size="xl" aria-label="Loading" />
    </div>
  );
};

export const WithLabelExample = () => {
  return (
    <Loader label="Loading content..." />
  );
};

export const InButtonExample = () => {
  return (
    <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md opacity-50 cursor-not-allowed">
      <Loader size="sm" aria-label="Submitting" />
      <span>Submitting...</span>
    </button>
  );
};

export const CenteredExample = () => {
  return (
    <div className="text-center py-8">
      <Loader size="lg" aria-label="Loading content" />
      <p className="mt-2 text-zinc-600">Please wait...</p>
    </div>
  );
};
