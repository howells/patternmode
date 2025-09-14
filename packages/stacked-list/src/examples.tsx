"use client";

import { Avatar } from "@patternmode/avatar";
import { Badge } from "@patternmode/badge";
import { Button } from "@patternmode/button";
import { Card } from "@patternmode/card";
import { Calendar, FileText, UserPlus } from "lucide-react";
import { StackedList } from ".";

export function DefaultExample() {
  return (
    <StackedList>
      <StackedList.Header
        actions={
          <Button size="sm" variant="outline">
            Add Member
          </Button>
        }
        description="Manage your team and their permissions."
        title="Team Members"
      />
      <StackedList.Item
        left={<Avatar alt="John Doe" initials="JD" />}
        right={
          <Button size="sm" variant="outline">
            Edit
          </Button>
        }
      >
        <StackedList.Content description="Software Engineer" title="John Doe" />
      </StackedList.Item>
      <StackedList.Item
        left={<Avatar alt="Jane Smith" initials="JS" />}
        right={
          <Button size="sm" variant="outline">
            Edit
          </Button>
        }
      >
        <StackedList.Content description="Product Manager" title="Jane Smith" />
      </StackedList.Item>
    </StackedList>
  );
}

export function InCardExample() {
  return (
    <Card padding={0}>
      <StackedList>
        <StackedList.Header
          description="Latest updates from your team."
          title="Recent Activity"
        />
        <StackedList.Item
          left={<Avatar alt="Alice Brown" initials="AB" />}
          right={<span className="text-sm text-zinc-500">2h ago</span>}
        >
          <StackedList.Content
            description="Updated project documentation"
            title="Alice Brown"
          />
        </StackedList.Item>
        <StackedList.Item
          left={<Avatar alt="Bob Wilson" initials="BW" />}
          right={<span className="text-sm text-zinc-500">5h ago</span>}
        >
          <StackedList.Content
            description="Merged pull request #42"
            title="Bob Wilson"
          />
        </StackedList.Item>
      </StackedList>
    </Card>
  );
}

export function WithIconsExample() {
  return (
    <StackedList>
      <StackedList.Item
        left={<FileText className="size-5 text-zinc-500" />}
        right={<Badge variant="warning">Updated</Badge>}
      >
        <StackedList.Content
          description="Updated project requirements and specifications"
          title="Project Documentation"
        />
      </StackedList.Item>
      <StackedList.Item
        left={<Calendar className="size-5 text-zinc-500" />}
        right={<Badge variant="default">Scheduled</Badge>}
      >
        <StackedList.Content
          description="Weekly sync with the development team"
          title="Team Meeting"
        />
      </StackedList.Item>
    </StackedList>
  );
}

export function InteractiveExample() {
  return (
    <StackedList>
      <StackedList.Item
        as="a"
        href="/users/carol"
        left={<Avatar alt="Carol Davis" initials="CD" />}
        right={<Badge variant="success">Active</Badge>}
      >
        <StackedList.Content
          description="Marketing Manager"
          title="Carol Davis"
        />
      </StackedList.Item>
      <StackedList.Item
        as="button"
        left={<Avatar alt="David Miller" initials="DM" />}
        onClick={() => {
          /* noop */
        }}
        right={<Badge variant="warning">Away</Badge>}
      >
        <StackedList.Content
          description="Sales Representative"
          title="David Miller"
        />
      </StackedList.Item>
    </StackedList>
  );
}

export function EmptyStateExample() {
  return (
    <StackedList>
      <StackedList.Header
        description="Manage your team and their permissions."
        title="Team Members"
      />
      <StackedList.Empty
        action={<Button variant="primary">Add Team Member</Button>}
        description="Get started by adding your first team member."
        icon={<UserPlus className="size-12" />}
        title="No team members"
      />
    </StackedList>
  );
}

export function SimpleListExample() {
  return (
    <StackedList>
      <StackedList.Item>
        <StackedList.Content
          description="A simple list item without additional elements"
          title="First Item"
        />
      </StackedList.Item>
      <StackedList.Item>
        <StackedList.Content
          description="Another simple list item"
          title="Second Item"
        />
      </StackedList.Item>
      <StackedList.Item>
        <StackedList.Content
          description="The last item in this simple list"
          title="Third Item"
        />
      </StackedList.Item>
    </StackedList>
  );
}
