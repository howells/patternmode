"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@patternmode/ui/components/tabs";

export default function TabsExample() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-body text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </TabsContent>
      <TabsContent value="security">
        <p className="text-body text-muted-foreground">
          Update your password and two-factor authentication.
        </p>
      </TabsContent>
      <TabsContent value="notifications">
        <p className="text-body text-muted-foreground">
          Choose which notifications you want to receive.
        </p>
      </TabsContent>
    </Tabs>
  );
}
