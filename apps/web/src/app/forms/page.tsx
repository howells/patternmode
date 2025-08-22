"use client";

import type { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import type { NumberField as BaseNumberField } from "@base-ui-components/react/number-field";
import type { Slider as BaseSlider } from "@base-ui-components/react/slider";
import type { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import type { LucideIcon } from "lucide-react";

// UI Component imports
import { Button } from "@patternmode/button";
import { Card, CardContent, CardDescription, CardHeader, CardHeading } from "@patternmode/ui/components/card";
import { Checkbox } from "@patternmode/ui/components/checkbox";
import { Divider } from "@patternmode/ui/components/divider";
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "@patternmode/ui/components/field";
import { Form, FormControl, FormDescription, FormError, FormField, FormLabel } from "@patternmode/ui/components/form";
import { Grid, GridCell } from "@patternmode/ui/components/grid";
import { IconContainer } from "@patternmode/ui/components/icon-container";
import { Input } from "@patternmode/ui/components/input";
import { NumberField } from "@patternmode/ui/components/number-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@patternmode/ui/components/select";
import { Slider } from "@patternmode/ui/components/slider";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import { Switch } from "@patternmode/ui/components/switch";
import { TagInput } from "@patternmode/ui/components/tag-input";
import { Text } from "@patternmode/ui/components/text";
import { Textarea } from "@patternmode/ui/components/textarea";
import { Clipboard, Factory, Mail, MapPin, Package, Phone, Settings, Star, TrendingUp, User } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { PageHeader } from "@/components/page-header";

// Define the type locally since it's not exported
type GlobalSemanticVariant = "info" | "success" | "warning" | "error" | "neutral" | "positive";

// Company Information Schema
const companyInfoSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City name is required"),
  country: z.string().min(1, "Please select a country"),
});

// Product Configuration Schema
const productConfigSchema = z.object({
  paperclipType: z.string().min(1, "Please select a paperclip type"),
  material: z.string().min(1, "Please select a material"),
  coating: z.string().min(1, "Please select a coating"),
  size: z.string().min(1, "Please select a size"),
  color: z.array(z.string()).min(1, "Please select at least one color"),
  quantity: z.number().min(100, "Minimum order is 100 units").max(1000000, "Maximum order is 1,000,000 units"),
});

// Quality Control Schema
const qualityControlSchema = z.object({
  tensileStrength: z.number().min(1).max(10),
  corrosionResistance: z.number().min(1).max(10),
  bendability: z.number().min(1).max(10),
  qualityInspection: z.boolean(),
  certificationRequired: z.boolean(),
  specialRequirements: z.string().optional(),
});

// Production Preferences Schema
const productionPreferencesSchema = z.object({
  rushOrder: z.boolean(),
  packagingType: z.string().min(1, "Please select packaging type"),
  deliveryDate: z.string().min(1, "Please select delivery timeframe"),
  newsletter: z.boolean(),
  terms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

type ProductConfig = z.infer<typeof productConfigSchema>;
type QualityControl = z.infer<typeof qualityControlSchema>;
type ProductionPreferences = z.infer<typeof productionPreferencesSchema>;

const paperclipTypes = [
  { value: "standard", label: "Standard Paperclip" },
  { value: "jumbo", label: "Jumbo Paperclip" },
  { value: "mini", label: "Mini Paperclip" },
  { value: "butterfly", label: "Butterfly Clip" },
  { value: "binder", label: "Binder Clip" },
  { value: "specialty", label: "Specialty Shape" },
];

const materials = [
  { value: "steel", label: "Galvanized Steel" },
  { value: "stainless", label: "Stainless Steel" },
  { value: "brass", label: "Brass" },
  { value: "aluminum", label: "Aluminum" },
  { value: "plastic", label: "Plastic Coated" },
];

const colorOptions = [
  { value: "silver", label: "Silver", leftIcon: Star },
  { value: "gold", label: "Gold", leftIcon: Star },
  { value: "black", label: "Black", leftIcon: Star },
  { value: "white", label: "White", leftIcon: Star },
  { value: "red", label: "Red", leftIcon: Star },
  { value: "blue", label: "Blue", leftIcon: Star },
  { value: "green", label: "Green", leftIcon: Star },
  { value: "rainbow", label: "Rainbow Mix", leftIcon: Star },
];

const ComposedCardHeader = ({ Icon, iconVariant, heading, description }: { Icon: LucideIcon; iconVariant: GlobalSemanticVariant; heading: string; description: string }) => {
  return (
    <CardHeader border>
      <HStack gap={3} align="center">
        <IconContainer icon={Icon} variant={iconVariant} size="sm" />
        <VStack gap={1}>
          <CardHeading>{heading}</CardHeading>
          <CardDescription>{description}</CardDescription>
        </VStack>
      </HStack>
    </CardHeader>
  );
};

export default function FormsPage() {
  const [productData, setProductData] = useState<Partial<ProductConfig>>({
    color: [],
    quantity: 1000,
  });
  const [qualityData, setQualityData] = useState<Partial<QualityControl>>({
    tensileStrength: 5,
    corrosionResistance: 5,
    bendability: 5,
    qualityInspection: false,
    certificationRequired: false,
  });
  const [preferencesData, setPreferencesData] = useState<Partial<ProductionPreferences>>({
    rushOrder: false,
    newsletter: false,
    terms: false,
  });

  const [submitResults, setSubmitResults] = useState<Record<string, string>>({});

  const handleSubmit = (formType: string) => async (data: Record<string, unknown>) => {
    console.log(`${formType} submitted:`, data);
    setSubmitResults(prev => ({
      ...prev,
      [formType]: `${formType} submitted successfully! Check the console for details.`,
    }));
    setTimeout(() => {
      setSubmitResults((prev) => {
        const newResults = { ...prev };
        delete newResults[formType];
        return newResults;
      });
    }, 3000);
  };

  return (
    <>
      <PageHeader
        title="Paperclip Factory Order System"
        description="Complete form system for custom paperclip manufacturing orders, demonstrating all form components and validation patterns."

      />

      <VStack gap={8} padding={8}>
        {/* Company Information Form */}
        <Card>
          <CardHeader border>
            <HStack gap={3} align="center">
              <IconContainer icon={Factory} variant="info" size="sm" />
              <VStack gap={1}>
                <CardHeading>Company Information</CardHeading>
                <CardDescription>Basic input components with validation</CardDescription>
              </VStack>
            </HStack>
          </CardHeader>
          <CardContent>
            {submitResults.company && (
              <Card padding={3}>
                <Text>{submitResults.company}</Text>
              </Card>
            )}
            <Form schema={companyInfoSchema} onValidSubmit={handleSubmit("company")}>
              <VStack gap={6}>
                <Grid columns={{ md: 2 }} gap={4}>
                  <GridCell>
                    <FormField name="companyName">
                      <VStack gap={2}>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Acme Paperclip Corp"
                            prefixIcon={Factory}
                          />
                        </FormControl>
                        <FormDescription>
                          Your company's legal business name
                        </FormDescription>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                  <GridCell>
                    <FormField name="contactPerson">
                      <VStack gap={2}>
                        <FormLabel>Contact Person</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Smith"
                            prefixIcon={User}
                          />
                        </FormControl>
                        <FormDescription>
                          Primary contact for this order
                        </FormDescription>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                </Grid>

                <Grid columns={{ md: 2 }} gap={4}>
                  <GridCell>
                    <FormField name="email">
                      <VStack gap={2}>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="orders@company.com"
                            prefixIcon={Mail}
                          />
                        </FormControl>
                        <FormDescription>
                          For order confirmations and updates
                        </FormDescription>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                  <GridCell>
                    <FormField name="phone">
                      <VStack gap={2}>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            prefixIcon={Phone}
                          />
                        </FormControl>
                        <FormDescription>
                          For urgent order communications
                        </FormDescription>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                </Grid>

                <FormField name="address">
                  <VStack gap={2}>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Industrial Ave, Suite 100"
                        prefixIcon={MapPin}
                      />
                    </FormControl>
                    <FormDescription>
                      Complete address for paperclip delivery
                    </FormDescription>
                    <FormError />
                  </VStack>
                </FormField>

                <Grid columns={{ md: 2 }} gap={4}>
                  <GridCell>
                    <FormField name="city">
                      <VStack gap={2}>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Manufacturing City" />
                        </FormControl>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                  <GridCell>
                    <FormField name="country">
                      <VStack gap={2}>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue>Select country</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                              <SelectItem value="jp">Japan</SelectItem>
                              <SelectItem value="cn">China</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Country for shipping calculations
                        </FormDescription>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                </Grid>

                <HStack gap={4} justify="end">
                  <Button type="submit">Save Company Info</Button>
                </HStack>
              </VStack>
            </Form>
          </CardContent>
        </Card>

        {/* Product Configuration Form */}
        <Card>
          <CardHeader border>
            <HStack gap={3} align="center">
              <IconContainer icon={Package} variant="success" size="sm" />
              <VStack gap={1}>
                <CardHeading>Product Configuration</CardHeading>
                <CardDescription>Select components, number fields, and tag inputs</CardDescription>
              </VStack>
            </HStack>
          </CardHeader>
          <CardContent>
            {submitResults.product && (
              <Card padding={3}>
                <Text>{submitResults.product}</Text>
              </Card>
            )}
            <Form schema={productConfigSchema} onValidSubmit={handleSubmit("product")}>
              <VStack gap={6}>
                <Grid columns={{ md: 2 }} gap={4}>
                  <GridCell>
                    <FormField name="paperclipType">
                      <VStack gap={2}>
                        <FormLabel>Paperclip Type</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue>Choose paperclip type</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {paperclipTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Select the style of paperclip to manufacture
                        </FormDescription>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                  <GridCell>
                    <FormField name="material">
                      <VStack gap={2}>
                        <FormLabel>Material</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue>Choose material</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {materials.map(material => (
                                <SelectItem key={material.value} value={material.value}>
                                  {material.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Base material for paperclip construction
                        </FormDescription>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                </Grid>

                <Grid columns={{ md: 3 }} gap={4}>
                  <GridCell>
                    <FormField name="coating">
                      <VStack gap={2}>
                        <FormLabel>Coating</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue>Select coating</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Coating</SelectItem>
                              <SelectItem value="zinc">Zinc Plated</SelectItem>
                              <SelectItem value="nickel">Nickel Plated</SelectItem>
                              <SelectItem value="powder">Powder Coated</SelectItem>
                              <SelectItem value="vinyl">Vinyl Coated</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                  <GridCell>
                    <FormField name="size">
                      <VStack gap={2}>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue>Select size</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mini">Mini (19mm)</SelectItem>
                              <SelectItem value="standard">Standard (28mm)</SelectItem>
                              <SelectItem value="large">Large (33mm)</SelectItem>
                              <SelectItem value="jumbo">Jumbo (50mm)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                  <GridCell>
                    <Field name="quantity">
                      <VStack gap={2}>
                        <FieldLabel>Quantity</FieldLabel>
                        <FieldControl
                          render={({ ref, ...props }) => {
                            const { defaultValue, ...filteredProps } = props;
                            return (
                              <NumberField
                                ref={ref as React.RefObject<React.ElementRef<typeof BaseNumberField.Root> | null>}
                                placeholder="1000"
                                min={100}
                                max={1000000}
                                value={productData.quantity}
                                onChange={value => setProductData(prev => ({ ...prev, quantity: value }))}
                                {...filteredProps}
                              />
                            );
                          }}
                        />
                        <FieldDescription>
                          Number of paperclips (100 - 1,000,000)
                        </FieldDescription>
                        <FieldError />
                      </VStack>
                    </Field>
                  </GridCell>
                </Grid>

                <FormField name="color">
                  <VStack gap={2}>
                    <FormLabel>Colors</FormLabel>
                    <FormControl>
                      <TagInput
                        options={colorOptions}
                        placeholder="Select colors"
                        selectedPlaceholder="Add more colors"
                        emptyMessage="No colors found"
                        maxTags={5}
                        value={productData.color || []}
                        onValueChange={values => setProductData(prev => ({ ...prev, color: values }))}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose up to 5 colors for your paperclip order
                    </FormDescription>
                    <FormError />
                  </VStack>
                </FormField>

                <HStack gap={4} justify="end">
                  <Button type="submit">Configure Product</Button>
                </HStack>
              </VStack>
            </Form>
          </CardContent>
        </Card>

        {/* Quality Control Form */}
        <Card>
          <ComposedCardHeader Icon={Settings} iconVariant="warning" heading="Quality Control Specifications" description="Sliders, checkboxes, and text areas" />
          <CardContent>
            {submitResults.quality && (
              <Card padding={3}>
                <Text>{submitResults.quality}</Text>
              </Card>
            )}
            <Form schema={qualityControlSchema} onValidSubmit={handleSubmit("quality")}>
              <VStack gap={6}>
                <VStack gap={4}>
                  <Field name="tensileStrength">
                    <VStack gap={2}>
                      <FieldLabel>Tensile Strength Requirement (1-10)</FieldLabel>
                      <FieldControl
                        render={({ ref, ...props }) => {
                          const { defaultValue, ...filteredProps } = props;
                          return (
                            <Slider
                              {...filteredProps}
                              ref={ref as React.RefObject<React.ElementRef<typeof BaseSlider.Root> | null>}
                              min={1}
                              max={10}
                              step={1}
                              showValue={true}
                              value={[qualityData.tensileStrength || 5]}
                              onValueChange={values => setQualityData(prev => ({ ...prev, tensileStrength: values[0] }))}
                            />
                          );
                        }}
                      />
                      <FieldDescription>
                        Required strength for paperclip durability (higher = stronger)
                      </FieldDescription>
                      <FieldError />
                    </VStack>
                  </Field>

                  <Field name="corrosionResistance">
                    <VStack gap={2}>
                      <FieldLabel>Corrosion Resistance Level (1-10)</FieldLabel>
                      <FieldControl
                        render={({ ref, ...props }) => {
                          const { defaultValue, ...filteredProps } = props;
                          return (
                            <Slider
                              {...filteredProps}
                              ref={ref as React.RefObject<React.ElementRef<typeof BaseSlider.Root> | null>}
                              min={1}
                              max={10}
                              step={1}
                              showValue={true}
                              value={[qualityData.corrosionResistance || 5]}
                              onValueChange={values => setQualityData(prev => ({ ...prev, corrosionResistance: values[0] }))}
                            />
                          );
                        }}
                      />
                      <FieldDescription>
                        Resistance to rust and environmental damage
                      </FieldDescription>
                      <FieldError />
                    </VStack>
                  </Field>

                  <Field name="bendability">
                    <VStack gap={2}>
                      <FieldLabel>Bendability Factor (1-10)</FieldLabel>
                      <FieldControl
                        render={({ ref, ...props }) => {
                          const { defaultValue, ...filteredProps } = props;
                          return (
                            <Slider
                              {...filteredProps}
                              ref={ref as React.RefObject<React.ElementRef<typeof BaseSlider.Root> | null>}
                              min={1}
                              max={10}
                              step={1}
                              showValue={true}
                              value={[qualityData.bendability || 5]}
                              onValueChange={values => setQualityData(prev => ({ ...prev, bendability: values[0] }))}
                            />
                          );
                        }}
                      />
                      <FieldDescription>
                        How easily the paperclip should bend without breaking
                      </FieldDescription>
                      <FieldError />
                    </VStack>
                  </Field>
                </VStack>

                <Grid columns={{ md: 2 }} gap={6}>
                  <GridCell>
                    <Field name="qualityInspection">
                      <HStack gap={3} align="center">
                        <FieldControl
                          render={({ ref, ...props }) => (
                            <Checkbox
                              ref={ref as React.RefObject<React.ElementRef<typeof BaseCheckbox.Root> | null>}
                              checked={qualityData.qualityInspection}
                              onCheckedChange={checked => setQualityData(prev => ({ ...prev, qualityInspection: checked }))}
                              {...props}
                            />
                          )}
                        />
                        <VStack gap={1}>
                          <FieldLabel>Quality Inspection Required</FieldLabel>
                          <FieldDescription>
                            Include detailed quality control inspection report
                          </FieldDescription>
                        </VStack>
                      </HStack>
                      <FieldError />
                    </Field>
                  </GridCell>
                  <GridCell>
                    <Field name="certificationRequired">
                      <HStack gap={3} align="center">
                        <FieldControl
                          render={({ ref, ...props }) => (
                            <Checkbox
                              ref={ref as React.RefObject<React.ElementRef<typeof BaseCheckbox.Root> | null>}
                              checked={qualityData.certificationRequired}
                              onCheckedChange={checked => setQualityData(prev => ({ ...prev, certificationRequired: checked }))}
                              {...props}
                            />
                          )}
                        />
                        <VStack gap={1}>
                          <FieldLabel>ISO Certification</FieldLabel>
                          <FieldDescription>
                            Require ISO 9001 quality management certification
                          </FieldDescription>
                        </VStack>
                      </HStack>
                      <FieldError />
                    </Field>
                  </GridCell>
                </Grid>

                <FormField name="specialRequirements">
                  <VStack gap={2}>
                    <FormLabel>Special Requirements (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special manufacturing requirements, custom packaging instructions, or quality specifications..."
                        minRows={3}
                        maxRows={6}
                      />
                    </FormControl>
                    <FormDescription>
                      Additional specifications or custom requirements for your order
                    </FormDescription>
                    <FormError />
                  </VStack>
                </FormField>

                <HStack gap={4} justify="end">
                  <Button type="submit">Set Quality Standards</Button>
                </HStack>
              </VStack>
            </Form>
          </CardContent>
        </Card>

        {/* Production Preferences Form */}
        <Card>
          <CardHeader border>
            <HStack gap={3} align="center">
              <IconContainer icon={TrendingUp} variant="positive" size="sm" />
              <VStack gap={1}>
                <CardHeading>Production Preferences</CardHeading>
                <CardDescription>Switches, radio groups, and agreement checkboxes</CardDescription>
              </VStack>
            </HStack>
          </CardHeader>
          <CardContent>
            {submitResults.preferences && (
              <Card padding={3}>
                <Text>{submitResults.preferences}</Text>
              </Card>
            )}
            <Form schema={productionPreferencesSchema} onValidSubmit={handleSubmit("preferences")}>
              <VStack gap={6}>
                <Field name="rushOrder">
                  <HStack gap={3} align="center">
                    <FieldControl
                      render={({ ref, ...props }) => (
                        <Switch
                          ref={ref as React.RefObject<React.ElementRef<typeof BaseSwitch.Root> | null>}
                          checked={preferencesData.rushOrder}
                          onCheckedChange={checked => setPreferencesData(prev => ({ ...prev, rushOrder: checked }))}
                          {...props}
                        />
                      )}
                    />
                    <VStack gap={1}>
                      <FieldLabel>Rush Order</FieldLabel>
                      <FieldDescription>
                        Expedite production for faster delivery (additional charges apply)
                      </FieldDescription>
                    </VStack>
                  </HStack>
                  <FieldError />
                </Field>

                <Grid columns={{ md: 2 }} gap={4}>
                  <GridCell>
                    <FormField name="packagingType">
                      <VStack gap={2}>
                        <FormLabel>Packaging Type</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue>Select packaging</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bulk">Bulk Boxes</SelectItem>
                              <SelectItem value="retail">Retail Packages</SelectItem>
                              <SelectItem value="custom">Custom Branding</SelectItem>
                              <SelectItem value="eco">Eco-Friendly</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          How you'd like your paperclips packaged
                        </FormDescription>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                  <GridCell>
                    <FormField name="deliveryDate">
                      <VStack gap={2}>
                        <FormLabel>Delivery Timeframe</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue>Select timeframe</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-week">1 Week</SelectItem>
                              <SelectItem value="2-weeks">2 Weeks</SelectItem>
                              <SelectItem value="1-month">1 Month</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          When you need the order delivered
                        </FormDescription>
                        <FormError />
                      </VStack>
                    </FormField>
                  </GridCell>
                </Grid>

                <Divider />

                <VStack gap={4}>
                  <Field name="newsletter">
                    <HStack gap={3} align="center">
                      <FieldControl
                        render={({ ref, ...props }) => (
                          <Switch
                            ref={ref as React.RefObject<React.ElementRef<typeof BaseSwitch.Root> | null>}
                            checked={preferencesData.newsletter}
                            onCheckedChange={checked => setPreferencesData(prev => ({ ...prev, newsletter: checked }))}
                            {...props}
                          />
                        )}
                      />
                      <VStack gap={1}>
                        <FieldLabel>Manufacturing Newsletter</FieldLabel>
                        <FieldDescription>
                          Receive updates about new paperclip designs and manufacturing innovations
                        </FieldDescription>
                      </VStack>
                    </HStack>
                    <FieldError />
                  </Field>

                  <FormField name="terms">
                    <HStack gap={3} align="start">
                      <FormControl>
                        <Checkbox
                          checked={preferencesData.terms}
                          onCheckedChange={checked => setPreferencesData(prev => ({ ...prev, terms: checked }))}
                        />
                      </FormControl>
                      <VStack gap={1}>
                        <FormLabel>Manufacturing Agreement *</FormLabel>
                        <FormDescription>
                          I agree to the Manufacturing Terms and Quality Assurance Policy
                        </FormDescription>
                        <FormError />
                      </VStack>
                    </HStack>
                  </FormField>
                </VStack>

                <HStack gap={4} justify="end">
                  <Button type="button" variant="outline">Save Preferences</Button>
                  <Button type="submit">Complete Order</Button>
                </HStack>
              </VStack>
            </Form>
          </CardContent>
        </Card>

        {/* Component Documentation */}
        <Card>
          <CardHeader border>
            <HStack gap={3} align="center">
              <IconContainer icon={Clipboard} variant="neutral" size="sm" />
              <VStack gap={1}>
                <CardHeading>Form Components Demonstrated</CardHeading>
                <CardDescription>Complete overview of all form components used</CardDescription>
              </VStack>
            </HStack>
          </CardHeader>
          <CardContent>
            <Grid columns={{ md: 2, lg: 4 }} gap={4}>
              <GridCell>
                <VStack gap={2}>
                  <Text>Basic Inputs:</Text>
                  <VStack gap={1}>
                    <Text>• Input (with prefixes)</Text>
                    <Text>• NumberField</Text>
                    <Text>• Textarea</Text>
                  </VStack>
                </VStack>
              </GridCell>
              <GridCell>
                <VStack gap={2}>
                  <Text>Selection:</Text>
                  <VStack gap={1}>
                    <Text>• Select dropdowns</Text>
                    <Text>• TagInput (multi-select)</Text>
                    <Text>• RadioGroup</Text>
                  </VStack>
                </VStack>
              </GridCell>
              <GridCell>
                <VStack gap={2}>
                  <Text>Controls:</Text>
                  <VStack gap={1}>
                    <Text>• Checkbox</Text>
                    <Text>• Switch</Text>
                    <Text>• Slider (with values)</Text>
                  </VStack>
                </VStack>
              </GridCell>
              <GridCell>
                <VStack gap={2}>
                  <Text>Form System:</Text>
                  <VStack gap={1}>
                    <Text>• Zod validation</Text>
                    <Text>• Error handling</Text>
                    <Text>• Field descriptions</Text>
                  </VStack>
                </VStack>
              </GridCell>
            </Grid>
          </CardContent>
        </Card>
      </VStack>
    </>
  );
}
