"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage, AvatarWithFallback } from "./component";

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
      <div className="flex flex-col items-center gap-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=16&h=16&fit=crop&crop=face"
          alt="John Doe"
          size="2xs"
        />
        <span className="text-xs">2xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face"
          alt="John Doe"
          size="xs"
        />
        <span className="text-xs">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          alt="John Doe"
          size="sm"
        />
        <span className="text-xs">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
          alt="John Doe"
          size="base"
        />
        <span className="text-xs">base</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
          alt="John Doe"
          size="lg"
        />
        <span className="text-xs">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
          alt="John Doe"
          size="xl"
        />
        <span className="text-xs">xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
          alt="John Doe"
          size="2xl"
        />
        <span className="text-xs">2xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"
          alt="John Doe"
          size="3xl"
        />
        <span className="text-xs">3xl</span>
      </div>
    </div>
  );
};

// Initials with different sizes
export const InitialsExample = () => {
  return (
    <div className="flex items-end gap-4">
      <Avatar initials="AB" alt="Alice Brown" size="2xs" />
      <Avatar initials="CD" alt="Charlie Davis" size="xs" />
      <Avatar initials="EF" alt="Emma Foster" size="sm" />
      <Avatar initials="GH" alt="George Harris" size="base" />
      <Avatar initials="IJ" alt="Isabella Jones" size="lg" />
      <Avatar initials="KL" alt="Kevin Lee" size="xl" />
      <Avatar initials="MN" alt="Maria Nelson" size="2xl" />
      <Avatar initials="OP" alt="Oliver Parker" size="3xl" />
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
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
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
    <div className="grid grid-cols-4 gap-4">
      {users.map(user => (
        <div key={user.initials} className="flex flex-col items-center gap-2">
          <Avatar
            initials={user.initials}
            alt={user.name}
            dynamicBackground
            size="lg"
          />
          <span className="text-xs text-center">{user.name}</span>
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
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
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
      {users.map(user => (
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
            <div className="font-medium truncate">
              {user.name}
            </div>
            <div className="text-xs text-zinc-500 truncate">{user.email}</div>
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
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
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
      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Team Members (Small)</h4>
        <div className="flex -space-x-2">
          {users.map((user, index) => (
            <Avatar
              key={index}
              src={user.avatar}
              initials={user.initials}
              alt={user.name}
              size="sm"
              dynamicBackground={!user.avatar}
            />
          ))}
          <Avatar
            text="+3"
            alt="3 more members"
            size="sm"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold">
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
            />
          ))}
          <Avatar
            text="+5"
            alt="5 more contributors"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
};
