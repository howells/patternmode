"use client";

import React from "react";
import { Avatar } from "./avatar";

interface AvatarExampleProps {
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  square?: boolean;
  dynamicBackground?: boolean;
  showWithImage?: boolean;
  showInitials?: boolean;
  [key: string]: unknown;
}

export function AvatarExample({
  size = "base",
  square = false,
  dynamicBackground = false,
  showWithImage = false,
  showInitials = true,
  ...props
}: AvatarExampleProps) {
  if (showWithImage) {
    return (
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
        alt="John Doe"
        size={size}
        square={square}
        {...props}
      />
    );
  }

  if (showInitials) {
    return (
      <Avatar
        initials="JD"
        alt="John Doe"
        size={size}
        square={square}
        dynamicBackground={dynamicBackground}
        {...props}
      />
    );
  }

  return (
    <Avatar
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
      alt="John Doe"
      size={size}
      square={square}
      {...props}
    />
  );
}

// Default export for the preview system
export default function Example() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Avatar</h3>
        <div className="space-y-6">
          <div>
            <p className="text-xs text-zinc-500 mb-3">Size variants</p>
            <div className="flex items-end gap-4">
              <div className="text-center space-y-2">
                <AvatarExample size="xs" />
                <span className="text-xs text-zinc-400">xs</span>
              </div>
              <div className="text-center space-y-2">
                <AvatarExample size="sm" />
                <span className="text-xs text-zinc-400">sm</span>
              </div>
              <div className="text-center space-y-2">
                <AvatarExample size="base" />
                <span className="text-xs text-zinc-400">base</span>
              </div>
              <div className="text-center space-y-2">
                <AvatarExample size="lg" />
                <span className="text-xs text-zinc-400">lg</span>
              </div>
              <div className="text-center space-y-2">
                <AvatarExample size="xl" />
                <span className="text-xs text-zinc-400">xl</span>
              </div>
              <div className="text-center space-y-2">
                <AvatarExample size="2xl" />
                <span className="text-xs text-zinc-400">2xl</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-3">With images</p>
            <div className="flex items-center gap-4">
              <AvatarExample showWithImage size="sm" />
              <AvatarExample showWithImage size="base" />
              <AvatarExample showWithImage size="lg" />
            </div>
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-3">Square variants</p>
            <div className="flex items-center gap-4">
              <AvatarExample square size="sm" />
              <AvatarExample square size="base" />
              <AvatarExample square size="lg" />
            </div>
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-3">Dynamic backgrounds</p>
            <div className="flex items-center gap-4">
              <Avatar initials="AB" alt="Alice Brown" dynamicBackground />
              <Avatar initials="CD" alt="Charlie Davis" dynamicBackground />
              <Avatar initials="EF" alt="Emma Foster" dynamicBackground />
              <Avatar initials="GH" alt="George Harris" dynamicBackground />
            </div>
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-3">Avatar group</p>
            <div className="flex -space-x-2">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt="User 1"
                size="sm"
                className="ring-2 ring-white dark:ring-zinc-950"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
                alt="User 2"
                size="sm"
                className="ring-2 ring-white dark:ring-zinc-950"
              />
              <Avatar
                initials="MJ"
                alt="User 3"
                size="sm"
                dynamicBackground
                className="ring-2 ring-white dark:ring-zinc-950"
              />
              <div className="flex items-center justify-center size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 ring-2 ring-white dark:ring-zinc-950">
                +2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
