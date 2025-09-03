"use client";

import { Avatar } from "@patternmode/avatar";
import { Button } from "@patternmode/button";
import { Checkbox } from "@patternmode/checkbox";
import { Fieldset } from "@patternmode/fieldset";
import { Grid, GridCell } from "@patternmode/grid";
import { Input } from "@patternmode/input";
import { ScrollArea } from "@patternmode/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@patternmode/select";
import { HStack, Stack, VStack } from "@patternmode/stack";
import { Textarea } from "@patternmode/textarea";
import React from "react";
import type { FieldSchema } from "./component";
import { FieldArray } from "./component";

const EMPTY_OPTIONS_ARRAY: Array<{ label: string; value: string }> = [];

// Example 1: Simple contact list
export function ContactListExample() {
  const [contacts, setContacts] = React.useState([
    { name: "John Doe", email: "john@example.com", phone: "+1 (555) 123-4567" },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
    },
  ]);

  const contactSchema: FieldSchema[] = [
    {
      key: "name",
      type: "input",
      defaultValue: "",
      label: "Full Name",
      placeholder: "Enter full name...",
      required: true,
    },
    {
      key: "email",
      type: "input",
      defaultValue: "",
      label: "Email Address",
      placeholder: "Enter email address...",
      required: true,
      props: { type: "email" },
    },
    {
      key: "phone",
      type: "input",
      defaultValue: "",
      label: "Phone Number",
      placeholder: "Enter phone number...",
      props: { type: "tel" },
    },
  ];

  return (
    <Stack className="w-96 max-w-full">
      <ScrollArea className="h-96">
        <FieldArray
          addButtonText="Add Contact"
          componentMap={{
            input: ({
              value,
              onChange,
              ...props
            }: {
              value: string;
              onChange: (v: string) => void;
            } & React.ComponentProps<typeof Input>) => (
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e.target.value)
                }
                value={value || ""}
                {...props}
              />
            ),
          }}
          itemLabel="Contact"
          items={contacts}
          maxItems={10}
          minItems={1}
          onItemsChange={setContacts}
          schema={contactSchema}
          showItemLabels={true}
        />
      </ScrollArea>
    </Stack>
  );
}

// Example 2: FAQ Builder
export function FAQBuilderExample() {
  const [faqs, setFaqs] = React.useState([
    {
      question: "What is FieldArray?",
      answer:
        "FieldArray is a generic component for managing dynamic lists of structured data with configurable field schemas.",
    },
    {
      question: "How do I customize field types?",
      answer:
        "Use the componentMap prop to provide custom components for different field types, or extend the default component map.",
    },
  ]);

  const faqSchema: FieldSchema[] = [
    {
      key: "question",
      type: "input",
      defaultValue: "",
      label: "Question",
      placeholder: "Enter the question...",
      required: true,
    },
    {
      key: "answer",
      type: "textarea",
      defaultValue: "",
      label: "Answer",
      placeholder: "Enter the answer...",
      required: true,
    },
  ];

  return (
    <Stack className="w-96 max-w-full">
      <ScrollArea className="h-96">
        <FieldArray
          addButtonText="Add FAQ Item"
          componentMap={{
            input: ({
              value,
              onChange,
              ...props
            }: {
              value: string;
              onChange: (v: string) => void;
            } & React.ComponentProps<typeof Input>) => (
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e.target.value)
                }
                value={value || ""}
                {...props}
              />
            ),
            textarea: ({
              value,
              onChange,
              ...props
            }: {
              value: string;
              onChange: (v: string) => void;
            } & React.ComponentProps<typeof Textarea>) => (
              <Textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  onChange(e.target.value)
                }
                value={value || ""}
                {...props}
              />
            ),
          }}
          itemLabel="FAQ"
          items={faqs}
          minItems={1}
          onItemsChange={setFaqs}
          schema={faqSchema}
          showItemLabels={true}
        />
      </ScrollArea>
    </Stack>
  );
}

// Example 3: Product Variants
export function ProductVariantsExample() {
  const [variants, setVariants] = React.useState([
    { name: "Small", price: 19.99, stock: 50, available: true },
    { name: "Medium", price: 24.99, stock: 30, available: true },
    { name: "Large", price: 29.99, stock: 0, available: false },
  ]);

  const variantSchema: FieldSchema[] = [
    {
      key: "name",
      type: "input",
      defaultValue: "",
      label: "Variant Name",
      placeholder: "e.g., Small, Red, XL...",
      required: true,
    },
    {
      key: "price",
      type: "number",
      defaultValue: 0,
      label: "Price ($)",
      placeholder: "0.00",
      required: true,
      props: { step: "0.01", min: "0" },
    },
    {
      key: "stock",
      type: "number",
      defaultValue: 0,
      label: "Stock Quantity",
      placeholder: "0",
      props: { min: "0" },
    },
    {
      key: "available",
      type: "checkbox",
      defaultValue: true,
      label: "Available for Purchase",
    },
  ];

  return (
    <Stack className="w-96 max-w-full">
      <ScrollArea className="h-96">
        <FieldArray
          addButtonText="Add Variant"
          componentMap={{
            input: ({
              value,
              onChange,
              ...props
            }: {
              value: string;
              onChange: (v: string) => void;
            } & React.ComponentProps<typeof Input>) => (
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e.target.value)
                }
                value={value || ""}
                {...props}
              />
            ),
            number: ({
              value,
              onChange,
              ...props
            }: {
              value: number;
              onChange: (v: number) => void;
            } & React.ComponentProps<typeof Input>) => (
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(Number(e.target.value) || 0)
                }
                type="number"
                value={value || ""}
                {...props}
              />
            ),
            checkbox: ({
              value,
              onChange,
              label,
              ...props
            }: {
              value: boolean;
              onChange: (v: boolean) => void;
              label?: string;
            } & React.ComponentProps<typeof Checkbox>) => (
              <HStack align="center" className="cursor-pointer" gap={2}>
                <Checkbox
                  checked={!!value}
                  onCheckedChange={(checked: boolean) => onChange(!!checked)}
                  {...props}
                />
                <span className="text-sm">{label}</span>
              </HStack>
            ),
          }}
          itemLabel="Variant"
          items={variants}
          maxItems={20}
          minItems={1}
          onItemsChange={setVariants}
          schema={variantSchema}
          showItemLabels={true}
        />
      </ScrollArea>
    </Stack>
  );
}

// Example 5: Custom Render Function
export function CustomRenderExample() {
  type TeamMember = {
    name: string;
    role: string;
    department: string;
  };

  const [team, setTeam] = React.useState<TeamMember[]>([
    { name: "Alice Johnson", role: "admin", department: "Engineering" },
    { name: "Bob Wilson", role: "user", department: "Design" },
  ]);

  const teamSchema: FieldSchema[] = [
    {
      key: "name",
      type: "input",
      defaultValue: "",
      label: "Full Name",
      required: true,
    },
    {
      key: "role",
      type: "select",
      defaultValue: "user",
      label: "Role",
      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
        { label: "Manager", value: "manager" },
      ],
    },
    {
      key: "department",
      type: "input",
      defaultValue: "",
      label: "Department",
    },
  ];

  return (
    <Stack className="w-96 max-w-full">
      <ScrollArea className="h-96">
        <FieldArray
          addButtonText="Add Team Member"
          componentMap={{
            input: (props: Record<string, unknown>) => {
              const { value, onChange, ...rest } = props as {
                value?: string;
                onChange?: (v: string) => void;
              } & Record<string, unknown>;
              return (
                <Input
                  onChange={(e) => onChange?.(e.target.value)}
                  value={value || ""}
                  {...(rest as Record<string, unknown>)}
                />
              );
            },
            select: ({
              value,
              onChange,
              options = EMPTY_OPTIONS_ARRAY,
              ...props
            }: {
              value: string;
              onChange: (v: string) => void;
              options?: Array<{ label: string; value: string }>;
            } & React.ComponentProps<typeof Select>) => (
              <Select
                onValueChange={(v: unknown) => onChange(String(v))}
                value={value || ""}
                {...props}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ),
          }}
          itemLabel="Member"
          items={team}
          minItems={1}
          onItemsChange={setTeam}
          renderItem={(item, _index, { updateItem, removeItem }) => (
            <Fieldset>
              <HStack align="center" justify="between">
                <HStack align="center" gap={3}>
                  <Avatar
                    dynamicBackground
                    initials={
                      item.name && typeof item.name === "string"
                        ? item.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                        : "?"
                    }
                    size="base"
                  />
                  <VStack gap={1}>
                    <div className="font-medium text-sm">
                      {item.name || "Unnamed Member"}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {item.role} • {item.department}
                    </div>
                  </VStack>
                </HStack>
                <Button
                  className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
                  onClick={removeItem}
                  size="sm"
                  variant="ghost"
                >
                  Remove
                </Button>
              </HStack>

              <Grid columns={{ sm: 1, md: 3 }} gap={4}>
                {teamSchema.map((field) => (
                  <GridCell key={field.key}>
                    <VStack gap={1}>
                      <div className="font-medium text-sm text-zinc-700 dark:text-zinc-300">
                        {field.label}
                      </div>
                      {field.type === "select" ? (
                        <Select
                          onValueChange={(value: unknown) =>
                            updateItem({ [field.key]: String(value) })
                          }
                          value={String(
                            ((item as Record<string, unknown>)[
                              field.key
                            ] as string) || ""
                          )}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateItem({ [field.key]: e.target.value })
                          }
                          placeholder={field.placeholder}
                          value={String(
                            ((item as Record<string, unknown>)[
                              field.key
                            ] as string) || ""
                          )}
                        />
                      )}
                    </VStack>
                  </GridCell>
                ))}
              </Grid>
            </Fieldset>
          )}
          schema={teamSchema}
          showItemLabels={true}
        />
      </ScrollArea>
    </Stack>
  );
}
