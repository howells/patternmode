"use client";

import { Loader } from ".";

export const DefaultExample = () => {
  return <Loader aria-label="Loading" />;
};

export const SizesExample = () => {
  return (
    <div className="flex items-center gap-4">
      <Loader aria-label="Loading" size="xs" />
      <Loader aria-label="Loading" size="sm" />
      <Loader aria-label="Loading" size="base" />
      <Loader aria-label="Loading" size="lg" />
      <Loader aria-label="Loading" size="xl" />
    </div>
  );
};

export const WithLabelExample = () => {
  return <Loader label="Loading content..." />;
};

export const InButtonExample = () => {
  return (
    <button
      className="flex cursor-not-allowed items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white opacity-50"
      disabled
      type="button"
    >
      <Loader aria-label="Submitting" size="sm" />
      <span>Submitting...</span>
    </button>
  );
};

export const CenteredExample = () => {
  return (
    <div className="py-8 text-center">
      <Loader aria-label="Loading content" size="lg" />
      <p className="mt-2 text-zinc-600">Please wait...</p>
    </div>
  );
};
