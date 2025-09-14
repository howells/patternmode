"use client";

import {
  Bold,
  Bookmark,
  Eye,
  EyeOff,
  Heart,
  Italic,
  Pause,
  Play,
  Star,
  Underline,
  Volume2,
  VolumeX,
} from "lucide-react";
import React from "react";

import { Toggle } from ".";

export function DefaultExample() {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <Toggle onPressedChange={setIsPressed} pressed={isPressed}>
      Toggle me
    </Toggle>
  );
}

export function WithIconExample() {
  const [isBold, setIsBold] = React.useState(false);

  return (
    <Toggle onPressedChange={setIsBold} pressed={isBold}>
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}

export function WithIconAndTextExample() {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <Toggle onPressedChange={setIsVisible} pressed={isVisible}>
      {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      {isVisible ? "Hide" : "Show"}
    </Toggle>
  );
}

export function VariantsExample() {
  const [defaultPressed, setDefaultPressed] = React.useState(false);
  const [outlinePressed, setOutlinePressed] = React.useState(false);
  const [ghostPressed, setGhostPressed] = React.useState(false);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Default
        </h4>
        <Toggle
          onPressedChange={setDefaultPressed}
          pressed={defaultPressed}
          variant="default"
        >
          <Bold className="h-4 w-4" />
          Bold
        </Toggle>
      </div>

      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Outline
        </h4>
        <Toggle
          onPressedChange={setOutlinePressed}
          pressed={outlinePressed}
          variant="outline"
        >
          <Italic className="h-4 w-4" />
          Italic
        </Toggle>
      </div>

      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Ghost
        </h4>
        <Toggle
          onPressedChange={setGhostPressed}
          pressed={ghostPressed}
          variant="ghost"
        >
          <Underline className="h-4 w-4" />
          Underline
        </Toggle>
      </div>
    </div>
  );
}

export function SizesExample() {
  const [smallPressed, setSmallPressed] = React.useState(false);
  const [defaultPressed, setDefaultPressed] = React.useState(false);
  const [largePressed, setLargePressed] = React.useState(false);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Small
        </h4>
        <Toggle
          onPressedChange={setSmallPressed}
          pressed={smallPressed}
          size="sm"
        >
          <Heart className="h-3 w-3" />
        </Toggle>
      </div>

      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Default
        </h4>
        <Toggle
          onPressedChange={setDefaultPressed}
          pressed={defaultPressed}
          size="base"
        >
          <Star className="h-4 w-4" />
        </Toggle>
      </div>

      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Large
        </h4>
        <Toggle
          onPressedChange={setLargePressed}
          pressed={largePressed}
          size="lg"
        >
          <Bookmark className="h-5 w-5" />
        </Toggle>
      </div>
    </div>
  );
}

export function PlayPauseExample() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <Toggle onPressedChange={setIsPlaying} pressed={isPlaying} size="lg">
      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      {isPlaying ? "Pause" : "Play"}
    </Toggle>
  );
}

export function MuteExample() {
  const [isMuted, setIsMuted] = React.useState(false);

  return (
    <Toggle onPressedChange={setIsMuted} pressed={isMuted} variant="ghost">
      {isMuted ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Toggle>
  );
}

export function DisabledExample() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Disabled (Unpressed)
        </h4>
        <Toggle disabled pressed={false}>
          <Bold className="h-4 w-4" />
          Bold
        </Toggle>
      </div>

      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          Disabled (Pressed)
        </h4>
        <Toggle disabled pressed={true}>
          <Italic className="h-4 w-4" />
          Italic
        </Toggle>
      </div>
    </div>
  );
}

export function ToolbarExample() {
  const [formatting, setFormatting] = React.useState({
    bold: false,
    italic: false,
    underline: false,
  });

  return (
    <div className="flex items-center gap-1 rounded-md border bg-white p-1 dark:border-zinc-700 dark:bg-zinc-950">
      <Toggle
        onPressedChange={(pressed) =>
          setFormatting((prev) => ({ ...prev, bold: pressed }))
        }
        pressed={formatting.bold}
        size="sm"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={(pressed) =>
          setFormatting((prev) => ({ ...prev, italic: pressed }))
        }
        pressed={formatting.italic}
        size="sm"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={(pressed) =>
          setFormatting((prev) => ({ ...prev, underline: pressed }))
        }
        pressed={formatting.underline}
        size="sm"
      >
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
