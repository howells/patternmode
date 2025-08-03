"use client";

import React from "react";

import { Tag } from "./component";

// Basic tags example
export const DefaultExample = () => {
  return (
    <div className="flex gap-2">
      <Tag value="Design" />
      <Tag value="Development" />
      <Tag value="Marketing" />
    </div>
  );
};

// Tags with labels
export const WithLabelsExample = () => {
  return (
    <div className="flex gap-2">
      <Tag label="Department" value="Engineering" />
      <Tag label="Location" value="San Francisco" />
      <Tag label="Team" value="Frontend" />
    </div>
  );
};

// Tags with counts
export const WithCountsExample = () => {
  return (
    <div className="flex gap-2">
      <Tag value="Issues" count={12} />
      <Tag value="Pull Requests" count="3 open" />
      <Tag value="Contributors" count={45} />
    </div>
  );
};

// Dismissible tags
export const DismissibleExample = () => {
  const [tags, setTags] = React.useState([
    { id: "1", value: "React" },
    { id: "2", value: "TypeScript" },
    { id: "3", value: "Next.js" },
  ]);

  const handleDismiss = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <div className="flex gap-2">
      {tags.map(tag => (
        <Tag
          key={tag.id}
          value={tag.value}
          dismissible
          onDismiss={() => handleDismiss(tag.id)}
        />
      ))}
    </div>
  );
};

// Tags with avatars
export const WithAvatarsExample = () => {
  return (
    <div className="flex gap-2">
      <Tag value="John Doe" avatar={{ initials: "JD" }} />
      <Tag value="Jane Smith" avatar={{ initials: "JS" }} dismissible />
      <Tag value="Alex Johnson" avatar={{ initials: "AJ" }} count="Admin" />
    </div>
  );
};

// Complex tags with all features
export const ComplexExample = () => {
  const [teamMembers, setTeamMembers] = React.useState([
    { id: "1", name: "Sarah Chen", role: "Lead Designer", initials: "SC" },
    { id: "2", name: "Mike Johnson", role: "Developer", initials: "MJ" },
    { id: "3", name: "Lisa Wang", role: "Product Manager", initials: "LW" },
  ]);

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Team Members</h4>
        <div className="flex flex-wrap gap-2">
          {teamMembers.map(member => (
            <Tag
              key={member.id}
              value={member.name}
              count={member.role}
              avatar={{ initials: member.initials }}
              dismissible
              onDismiss={() => handleRemoveMember(member.id)}
              className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 ring-blue-200 dark:ring-blue-800"
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Project Status</h4>
        <div className="flex flex-wrap gap-2">
          <Tag
            label="Status"
            value="In Progress"
            className="bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 ring-yellow-200 dark:ring-yellow-800"
          />
          <Tag
            label="Priority"
            value="High"
            className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 ring-red-200 dark:ring-red-800"
          />
          <Tag
            label="Due"
            value="2 days"
            className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 ring-orange-200 dark:ring-orange-800"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Technologies</h4>
        <div className="flex flex-wrap gap-2">
          <Tag value="React" count="18.2.0" />
          <Tag value="TypeScript" count="5.0" />
          <Tag value="Next.js" count="14.0" />
          <Tag value="Tailwind" count="3.4" />
        </div>
      </div>
    </div>
  );
};

// Colored tags example
export const ColoredExample = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Status Tags</h4>
        <div className="flex flex-wrap gap-2">
          <Tag
            value="Active"
            className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 ring-green-200 dark:ring-green-800"
          />
          <Tag
            value="Pending"
            className="bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 ring-yellow-200 dark:ring-yellow-800"
          />
          <Tag
            value="Inactive"
            className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 ring-red-200 dark:ring-red-800"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Priority Tags</h4>
        <div className="flex flex-wrap gap-2">
          <Tag
            value="Low"
            className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 ring-blue-200 dark:ring-blue-800"
          />
          <Tag
            value="Medium"
            className="bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 ring-purple-200 dark:ring-purple-800"
          />
          <Tag
            value="High"
            className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 ring-orange-200 dark:ring-orange-800"
          />
          <Tag
            value="Critical"
            className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 ring-red-200 dark:ring-red-800"
          />
        </div>
      </div>
    </div>
  );
};
