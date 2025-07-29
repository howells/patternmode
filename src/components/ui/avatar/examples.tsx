"use client";

import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarWithFallback,
} from "@patternmode/ui";

// Basic avatar examples
export const DefaultExample = () => {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        alt="John Doe"
      />
      <Avatar initials="JD" alt="John Doe" />
      <Avatar initials="AB" alt="Alice Brown" dynamicBackground />
    </div>
  );
};

// Size variants
export const SizeVariantsExample = () => {
  return (
    <div className="flex items-end gap-4">
      <div className="text-center space-y-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face"
          alt="John Doe"
          size="xs"
        />
        <p className="text-xs text-zinc-500">xs (24px)</p>
      </div>
      <div className="text-center space-y-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          alt="John Doe"
          size="sm"
        />
        <p className="text-xs text-zinc-500">sm (32px)</p>
      </div>
      <div className="text-center space-y-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
          alt="John Doe"
          size="base"
        />
        <p className="text-xs text-zinc-500">base (40px)</p>
      </div>
      <div className="text-center space-y-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
          alt="John Doe"
          size="lg"
        />
        <p className="text-xs text-zinc-500">lg (48px)</p>
      </div>
      <div className="text-center space-y-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
          alt="John Doe"
          size="xl"
        />
        <p className="text-xs text-zinc-500">xl (64px)</p>
      </div>
      <div className="text-center space-y-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
          alt="John Doe"
          size="2xl"
        />
        <p className="text-xs text-zinc-500">2xl (80px)</p>
      </div>
      <div className="text-center space-y-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"
          alt="John Doe"
          size="3xl"
        />
        <p className="text-xs text-zinc-500">3xl (96px)</p>
      </div>
    </div>
  );
};

// Initials with different sizes
export const InitialsExample = () => {
  return (
    <div className="flex items-end gap-4">
      <Avatar initials="AB" alt="Alice Brown" size="xs" />
      <Avatar initials="CD" alt="Charlie Davis" size="sm" />
      <Avatar initials="EF" alt="Emma Foster" size="base" />
      <Avatar initials="GH" alt="George Harris" size="lg" />
      <Avatar initials="IJ" alt="Isabella Jones" size="xl" />
      <Avatar initials="KL" alt="Kevin Lee" size="2xl" />
      <Avatar initials="MN" alt="Maria Nelson" size="3xl" />
    </div>
  );
};

// Square variants
export const SquareVariantsExample = () => {
  return (
    <div className="flex items-end gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
        alt="John Doe"
        square
        size="sm"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
        alt="Jane Smith"
        square
        size="base"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
        alt="Mike Johnson"
        square
        size="lg"
      />
      <Avatar initials="AB" alt="Alice Brown" square size="xl" />
      <Avatar
        initials="CD"
        alt="Charlie Davis"
        square
        size="2xl"
        dynamicBackground
      />
    </div>
  );
};

// Dynamic background colors
export const DynamicBackgroundExample = () => {
  const users = [
    { initials: "AB", name: "Alice Brown" },
    { initials: "CD", name: "Charlie Davis" },
    { initials: "EF", name: "Emma Foster" },
    { initials: "GH", name: "George Harris" },
    { initials: "IJ", name: "Isabella Jones" },
    { initials: "KL", name: "Kevin Lee" },
    { initials: "MN", name: "Maria Nelson" },
    { initials: "OP", name: "Oliver Parker" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {users.map((user) => (
        <div key={user.initials} className="text-center space-y-2">
          <Avatar
            initials={user.initials}
            alt={user.name}
            dynamicBackground
            size="lg"
          />
          <p className="text-xs text-zinc-600">{user.name}</p>
        </div>
      ))}
    </div>
  );
};

// With fallback using Base UI
export const WithFallbackExample = () => {
  return (
    <div className="flex items-center gap-4">
      <AvatarWithFallback className="size-12">
        <AvatarImage
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
          alt="John Doe"
        />
        <AvatarFallback>JD</AvatarFallback>
      </AvatarWithFallback>

      <AvatarWithFallback className="size-12">
        <AvatarImage src="/non-existent-image.jpg" alt="Broken Image" />
        <AvatarFallback>BI</AvatarFallback>
      </AvatarWithFallback>

      <AvatarWithFallback className="size-12">
        <AvatarFallback>FB</AvatarFallback>
      </AvatarWithFallback>
    </div>
  );
};

// User list example
export const UserListExample = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      initials: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      initials: "JS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: null,
      initials: "MJ",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: null,
      initials: "SW",
    },
  ];

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800"
        >
          <Avatar
            src={user.avatar}
            initials={user.initials}
            alt={user.name}
            dynamicBackground={!user.avatar}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
              {user.name}
            </p>
            <p className="text-sm text-zinc-500 truncate">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Avatar group/stack
export const AvatarGroupExample = () => {
  const users = [
    {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      initials: "JD",
    },
    {
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      initials: "JS",
    },
    {
      name: "Mike Johnson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      initials: "MJ",
    },
    {
      name: "Sarah Wilson",
      avatar: null,
      initials: "SW",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Team Members (Small)</h4>
        <div className="flex -space-x-2">
          {users.map((user, index) => (
            <Avatar
              key={index}
              src={user.avatar}
              initials={user.initials}
              alt={user.name}
              size="sm"
              dynamicBackground={!user.avatar}
              className="ring-2 ring-white dark:ring-zinc-950"
            />
          ))}
          <div className="flex items-center justify-center size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 ring-2 ring-white dark:ring-zinc-950">
            +3
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">
          Project Contributors (Large)
        </h4>
        <div className="flex -space-x-3">
          {users.map((user, index) => (
            <Avatar
              key={index}
              src={user.avatar}
              initials={user.initials}
              alt={user.name}
              size="lg"
              dynamicBackground={!user.avatar}
              className="ring-2 ring-white dark:ring-zinc-950"
            />
          ))}
          <div className="flex items-center justify-center size-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-400 ring-2 ring-white dark:ring-zinc-950">
            +5
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile header example
export const ProfileHeaderExample = () => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
        alt="John Doe"
        size="2xl"
      />
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          John Doe
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Senior Software Engineer
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          john.doe@company.com
        </p>
      </div>
    </div>
  );
};
