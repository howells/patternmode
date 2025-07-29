"use client";

import React from "react";
import { Button } from "../button";
import { Checkbox } from "../checkbox/checkbox";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "../description-list/description-list";
import { Dot } from "../dot/dot";
import { Fieldset, FieldsetLegend } from "../fieldset/fieldset";
import { Form, FormControl, FormField } from "../form/form";
import { Subheading } from "../subheading/subheading";
import { Text } from "../text/text";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@patternmode/ui";

// Config example ID: "default" -> export name: DefaultExample
export function DefaultExample() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open Sheet
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form className="py-4">
          <Fieldset>
            <FormField name="name" label="Name">
              <FormControl defaultValue="Daniel Howells" />
            </FormField>
            <FormField name="username" label="Username">
              <FormControl defaultValue="@howells" />
            </FormField>
          </Fieldset>
        </Form>
        <SheetFooter>
          <SheetClose render={<Button type="submit" />}>
            Save changes
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// Config example ID: "sides" -> export name: SidesExample
// Note: This sheet implementation only supports right-side drawer
export function SidesExample() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Basic Sheet
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Welcome</SheetTitle>
            <SheetDescription>
              This is a basic sheet example with simple content.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <Text size="sm" className="text-zinc-600 dark:text-zinc-400">
              This sheet demonstrates the basic usage of the sheet component
              with minimal content and styling.
            </Text>
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-4">
              <Subheading className="mb-2">Quick Tips</Subheading>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <li>• Sheets slide in from the right</li>
                <li>• Click outside to close</li>
                <li>• Press Escape to dismiss</li>
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Settings Sheet
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Application Settings</SheetTitle>
            <SheetDescription>
              Configure your application preferences
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <Form>
              <Fieldset>
                <FieldsetLegend>Display</FieldsetLegend>
                <FormField
                  name="theme"
                  label="Theme"
                  description="Choose your preferred color scheme"
                >
                  <FormControl render={<select />} defaultValue="system">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </FormControl>
                </FormField>
                <FormField
                  name="animations"
                  label="Enable Animations"
                  description="Show smooth transitions and effects"
                >
                  <Checkbox defaultChecked />
                </FormField>
              </Fieldset>
            </Form>
          </div>
          <SheetFooter>
            <SheetClose render={<Button variant="outline" />}>
              Cancel
            </SheetClose>
            <Button>Save Settings</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Contact Form
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Get in Touch</SheetTitle>
            <SheetDescription>
              Send us a message and we&apos;ll get back to you soon.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <Form>
              <Fieldset>
                <FieldsetLegend>Contact Information</FieldsetLegend>
                <FormField name="name" label="Your Name" required>
                  <FormControl placeholder="Enter your full name" />
                </FormField>
                <FormField name="email" label="Email Address" required>
                  <FormControl type="email" placeholder="your@email.com" />
                </FormField>
                <FormField name="subject" label="Subject" required>
                  <FormControl placeholder="What's this about?" />
                </FormField>
                <FormField
                  name="message"
                  label="Message"
                  description="Tell us more about your inquiry"
                  required
                >
                  <FormControl
                    render={<textarea className="min-h-[100px] resize-none" />}
                    placeholder="Type your message here..."
                  />
                </FormField>
              </Fieldset>
            </Form>
          </div>
          <SheetFooter>
            <SheetClose render={<Button variant="outline" />}>
              Cancel
            </SheetClose>
            <Button>Send Message</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Information
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>About This Component</SheetTitle>
            <SheetDescription>
              Learn more about the sheet component and its features.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-6">
            <div>
              <Subheading className="mb-4">Key Features</Subheading>
              <DescriptionList>
                <DescriptionTerm>
                  <div className="flex items-center gap-2">
                    <Dot variant="info" size="sm" />
                    Accessible
                  </div>
                </DescriptionTerm>
                <DescriptionDetails>
                  <Text size="xs">
                    Built with ARIA support and keyboard navigation
                  </Text>
                </DescriptionDetails>

                <DescriptionTerm>
                  <div className="flex items-center gap-2">
                    <Dot variant="success" size="sm" />
                    Responsive
                  </div>
                </DescriptionTerm>
                <DescriptionDetails>
                  <Text size="xs">
                    Adapts to different screen sizes automatically
                  </Text>
                </DescriptionDetails>

                <DescriptionTerm>
                  <div className="flex items-center gap-2">
                    <Dot variant="purple" size="sm" />
                    Customizable
                  </div>
                </DescriptionTerm>
                <DescriptionDetails>
                  <Text size="xs">
                    Easy to style and extend with your design system
                  </Text>
                </DescriptionDetails>
              </DescriptionList>
            </div>

            <div>
              <Subheading className="mb-4">Component Details</Subheading>
              <DescriptionList>
                <DescriptionTerm>Components</DescriptionTerm>
                <DescriptionDetails>8 components</DescriptionDetails>

                <DescriptionTerm>Bundle Size</DescriptionTerm>
                <DescriptionDetails>2.1kb gzipped</DescriptionDetails>

                <DescriptionTerm>Dependencies</DescriptionTerm>
                <DescriptionDetails>Base UI Dialog</DescriptionDetails>

                <DescriptionTerm>Browser Support</DescriptionTerm>
                <DescriptionDetails>
                  Modern browsers (ES2020+)
                </DescriptionDetails>
              </DescriptionList>
            </div>
          </div>
          <SheetFooter>
            <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
            <Button>View Documentation</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Additional examples (not referenced in config but good to have)

export function SheetExample() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open Sheet
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Project Details</SheetTitle>
          <SheetDescription>
            View and manage your project information and settings.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div>
            <Subheading level={3} className="mb-4">
              Project Information
            </Subheading>
            <DescriptionList>
              <DescriptionTerm>Project Name</DescriptionTerm>
              <DescriptionDetails>Patternmode Design System</DescriptionDetails>

              <DescriptionTerm>Status</DescriptionTerm>
              <DescriptionDetails>
                <Dot variant="success" label="Active" animated />
              </DescriptionDetails>

              <DescriptionTerm>Last Updated</DescriptionTerm>
              <DescriptionDetails>2 hours ago</DescriptionDetails>

              <DescriptionTerm>Team Size</DescriptionTerm>
              <DescriptionDetails>5 developers</DescriptionDetails>

              <DescriptionTerm>Technologies</DescriptionTerm>
              <DescriptionDetails>
                React, TypeScript, Tailwind CSS
              </DescriptionDetails>
            </DescriptionList>
          </div>

          <div>
            <Subheading level={3} className="mb-4">
              Recent Activity
            </Subheading>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Dot variant="success" size="sm" />
                <Text size="sm" className="text-zinc-600 dark:text-zinc-400">
                  Database backup completed
                </Text>
              </div>
              <div className="flex items-center gap-3">
                <Dot variant="info" size="sm" />
                <Text size="sm" className="text-zinc-600 dark:text-zinc-400">
                  New deployment successful
                </Text>
              </div>
              <div className="flex items-center gap-3">
                <Dot variant="warning" size="sm" />
                <Text size="sm" className="text-zinc-600 dark:text-zinc-400">
                  Performance metrics updated
                </Text>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
          <Button>View Full Report</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function SheetWithForm() {
  return (
    <Sheet>
      <SheetTrigger render={<Button />}>Edit Profile</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Update your profile information and account preferences.
          </SheetDescription>
        </SheetHeader>
        <Form className="py-4">
          <Fieldset>
            <FieldsetLegend>Personal Information</FieldsetLegend>
            <FormField name="name" label="Full Name" required>
              <FormControl defaultValue="Daniel Howells" />
            </FormField>
            <FormField
              name="email"
              label="Email Address"
              description="We'll never share your email with anyone else"
              required
            >
              <FormControl type="email" defaultValue="daniel@howells.dev" />
            </FormField>
            <FormField
              name="bio"
              label="Bio"
              description="Tell us a little about yourself"
            >
              <FormControl
                render={<textarea className="min-h-[80px] resize-none" />}
                defaultValue="Full-stack developer passionate about creating beautiful and functional user interfaces."
              />
            </FormField>
          </Fieldset>

          <Fieldset>
            <FieldsetLegend>Preferences</FieldsetLegend>
            <FormField
              name="notifications"
              label="Email Notifications"
              description="Receive updates about your account"
            >
              <Checkbox defaultChecked />
            </FormField>
            <FormField
              name="newsletter"
              label="Newsletter Subscription"
              description="Get weekly updates and tips"
            >
              <Checkbox />
            </FormField>
          </Fieldset>
        </Form>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
          <Button type="submit">Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
