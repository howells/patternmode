"use client";

import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Avatar } from "../avatar/avatar";
import { Button } from "../button/button";
import { StackedList } from "@patternmode/ui";

// Example component for preview system
export const StackedListExample = ({
  showDividers = true,
  gap = 0,
  padding = 4,
  ...props
}: {
  showDividers?: boolean;
  gap?: number;
  padding?: number;
  [key: string]: unknown;
}) => {
  // Sample data for the list
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Wilson",
      role: "Product Manager",
      initials: "SW",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Senior Developer",
      initials: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      initials: "ER",
    },
    {
      id: 4,
      name: "David Kim",
      role: "DevOps Engineer",
      initials: "DK",
    },
  ];

  return (
    <StackedList
      showDividers={showDividers}
      gap={gap as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24}
      padding={
        padding as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24
      }
      {...props}
    >
      <StackedList.Header
        title="Team Members"
        description="Manage your team and their permissions."
        actions={
          <Button size="sm" variant="outline">
            Add Member
          </Button>
        }
      />

      {teamMembers.length > 0 ? (
        teamMembers.map((member) => (
          <StackedList.Item
            key={member.id}
            left={
              <Avatar
                initials={member.initials}
                alt={member.name}
                className="size-10"
              />
            }
            right={
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm" variant="ghost">
                  <MoreHorizontal className="size-4" />
                </Button>
              </div>
            }
          >
            <StackedList.Content
              title={member.name}
              description={member.role}
            />
          </StackedList.Item>
        ))
      ) : (
        <StackedList.Empty
          title="No team members"
          description="Get started by adding your first team member."
          action={<Button variant="default">Add Team Member</Button>}
        />
      )}
    </StackedList>
  );
};
