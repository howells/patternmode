import Image from "next/image";
import React from "react";

import { Avatar, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@patternmode/ui";

export type AvatarOption = {
  value: string;
  label: string;
  preview?: string; // Optional preview URL (could be different from value)
};

type AvatarSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: AvatarOption[];
};

export function AvatarSelect({ value, onValueChange, options }: AvatarSelectProps) {
  const selectedOption = options.find(option => option.value === value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="overflow-hidden">
        <div className="flex items-center gap-2 truncate w-full">
          {selectedOption
            ? (
                <>
                  {selectedOption.preview && (
                    <Avatar
                      src={selectedOption.preview}
                      alt={selectedOption.label}
                      size="2xs"
                      ImageComponent={Image}
                    />
                  )}
                  <span className="truncate">{selectedOption.label}</span>
                </>
              )
            : (
                <span className="text-muted-foreground">Select an avatar</span>
              )}
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              {option.preview && (
                <Avatar
                  src={option.preview}
                  alt={option.label}
                  size="xs"
                />
              )}
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Predefined image sets for common use cases
export const AVATAR_IMAGES: AvatarOption[] = [
  { value: "", label: "No image" },
  {
    value: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    label: "John Doe",
    preview: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    label: "Jane Smith",
    preview: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    label: "Mike Johnson",
    preview: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
  },
];
