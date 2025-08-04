"use client";

import { Calendar, Globe, Mail, MapPin, Phone, Shield, Star, Tag, User, Users, Zap } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

// UI Components - organized by category
import {
  // Layout & Display Components
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  Fieldset,
  // Form Components
  Form,

  FormControl,
  FormDescription,
  FormError,
  FormField,

  FormLabel,
  Heading,
  // Input Components
  Input,
  NumberField,
  RadioGroup,
  RadioGroupItem,
  // Selection Components
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,

  SelectValue,
  Slider,
  Switch,
  TagInput,
  Text,
  Textarea,
} from "@patternmode/ui";

// Comprehensive form validation schema
const formSchema = z.object({
  // Basic text inputs
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),

  // Address fields
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City name is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),

  // Number fields
  age: z.number().min(18, "Must be at least 18 years old").max(120, "Age must be realistic"),
  salary: z.number().min(0, "Salary cannot be negative"),
  experience: z.number().min(0, "Experience cannot be negative").max(50, "Experience must be realistic"),

  // Selection fields
  country: z.string().min(1, "Please select a country"),
  jobTitle: z.string().min(1, "Please select a job title"),

  // Multi-value fields
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  interests: z.array(z.string()).min(1, "Please add at least one interest"),

  // Boolean fields
  newsletter: z.boolean(),
  terms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
  marketing: z.boolean(),

  // Range/slider fields
  satisfaction: z.number().min(1).max(10),
  budget: z.number().min(1000).max(100000),

  // Text area
  bio: z.string().min(10, "Bio must be at least 10 characters").max(500, "Bio cannot exceed 500 characters"),
  comments: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const skillOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
];

const interestOptions = [
  { value: "web-development", label: "Web Development", leftIcon: Globe },
  { value: "mobile-development", label: "Mobile Development", leftIcon: Phone },
  { value: "devops", label: "DevOps", leftIcon: Zap },
  { value: "machine-learning", label: "Machine Learning", leftIcon: Star },
  { value: "cybersecurity", label: "Cybersecurity", leftIcon: Shield },
  { value: "ui-ux", label: "UI/UX Design", leftIcon: User },
];

export default function FormsPage() {
  const [formData, setFormData] = useState<Partial<FormData>>({
    newsletter: false,
    terms: false,
    marketing: false,
    satisfaction: 5,
    budget: 25000,
    skills: [],
    interests: [],
  });

  const [submitResult, setSubmitResult] = useState<string | null>(null);

  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log("Form submitted:", data);
    setSubmitResult("Form submitted successfully! Check the console for details.");
    setTimeout(() => setSubmitResult(null), 5000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <Heading level={1} className="mb-4">
            Comprehensive Form System Documentation
          </Heading>
          <Text className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            A complete showcase of all form components in our UI system, demonstrating validation,
            accessibility, and various input types.
          </Text>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge bordered>Form</Badge>
            <Badge bordered>Field</Badge>
            <Badge bordered>Input</Badge>
            <Badge bordered>Select</Badge>
            <Badge bordered>Checkbox</Badge>
            <Badge bordered>Radio</Badge>
            <Badge bordered>Switch</Badge>
            <Badge bordered>Slider</Badge>
            <Badge bordered>NumberField</Badge>
            <Badge bordered>TagInput</Badge>
            <Badge bordered>Textarea</Badge>
          </div>
        </div>

        {submitResult && (
          <Card className="mb-8 p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <Text className="text-green-800 dark:text-green-200">{submitResult}</Text>
          </Card>
        )}

        <Card className="p-8">
          <Form schema={formSchema} onValidSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <Fieldset>
              <Heading level={2} className="mb-6 flex items-center gap-2">
                <User className="size-5" />
                Personal Information
              </Heading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="firstName">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      prefixIcon={User}
                    />
                  </FormControl>
                  <FormDescription>
                    Your legal first name as it appears on official documents
                  </FormDescription>
                  <FormError />
                </FormField>

                <FormField name="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your last name"
                      prefixIcon={User}
                    />
                  </FormControl>
                  <FormDescription>
                    Your legal last name as it appears on official documents
                  </FormDescription>
                  <FormError />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="email">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      prefixIcon={Mail}
                    />
                  </FormControl>
                  <FormDescription>
                    We'll use this email for account notifications and updates
                  </FormDescription>
                  <FormError />
                </FormField>

                <FormField name="phone">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      prefixIcon={Phone}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: For account recovery and important notifications
                  </FormDescription>
                  <FormError />
                </FormField>
              </div>
            </Fieldset>

            <Divider />

            {/* Address Information Section */}
            <Fieldset>
              <Heading level={2} className="mb-6 flex items-center gap-2">
                <MapPin className="size-5" />
                Address Information
              </Heading>

              <FormField name="address">
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main Street, Apt 4B"
                    prefixIcon={MapPin}
                  />
                </FormControl>
                <FormDescription>
                  Your complete street address including apartment/unit number
                </FormDescription>
                <FormError />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField name="city">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" />
                  </FormControl>
                  <FormError />
                </FormField>

                <FormField name="country">
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
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="jp">Japan</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select your country of residence
                  </FormDescription>
                  <FormError />
                </FormField>

                <FormField name="zipCode">
                  <FormLabel>ZIP/Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="10001" />
                  </FormControl>
                  <FormError />
                </FormField>
              </div>
            </Fieldset>

            <Divider />

            {/* Professional Information Section */}
            <Fieldset>
              <Heading level={2} className="mb-6 flex items-center gap-2">
                <Users className="size-5" />
                Professional Information
              </Heading>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field name="age">
                  <FieldLabel>Age</FieldLabel>
                  <FieldControl
                    render={({ ref, ...props }) => (
                      <NumberField
                        ref={ref}
                        placeholder="25"
                        min={18}
                        max={120}
                        {...props}
                      />
                    )}
                  />
                  <FieldDescription>
                    Must be 18 or older
                  </FieldDescription>
                  <FieldError />
                </Field>

                <Field name="experience">
                  <FieldLabel>Years of Experience</FieldLabel>
                  <FieldControl
                    render={({ ref, ...props }) => (
                      <NumberField
                        ref={ref}
                        placeholder="5"
                        min={0}
                        max={50}
                        {...props}
                      />
                    )}
                  />
                  <FieldDescription>
                    Years of professional experience
                  </FieldDescription>
                  <FieldError />
                </Field>

                <Field name="salary">
                  <FieldLabel>Expected Salary</FieldLabel>
                  <FieldControl
                    render={({ ref, ...props }) => (
                      <NumberField
                        ref={ref}
                        placeholder="75000"
                        min={0}
                        prefixText="$"
                        {...props}
                      />
                    )}
                  />
                  <FieldDescription>
                    Annual salary expectation
                  </FieldDescription>
                  <FieldError />
                </Field>
              </div>

              <FormField name="jobTitle">
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger>
                      <SelectValue>Select your job title</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                      <SelectItem value="backend-developer">Backend Developer</SelectItem>
                      <SelectItem value="fullstack-developer">Full Stack Developer</SelectItem>
                      <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                      <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                      <SelectItem value="product-manager">Product Manager</SelectItem>
                      <SelectItem value="data-scientist">Data Scientist</SelectItem>
                      <SelectItem value="qa-engineer">QA Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Your current or desired job title
                </FormDescription>
                <FormError />
              </FormField>
            </Fieldset>

            <Divider />

            {/* Skills and Interests Section */}
            <Fieldset>
              <Heading level={2} className="mb-6 flex items-center gap-2">
                <Star className="size-5" />
                Skills & Interests
              </Heading>

              <FormField name="skills">
                <FormLabel>Technical Skills</FormLabel>
                <FormControl>
                  <TagInput
                    options={skillOptions}
                    placeholder="Select your skills"
                    selectedPlaceholder="Add more skills"
                    emptyMessage="No skills found"
                    maxTags={8}
                    value={formData.skills || []}
                    onValueChange={values => setFormData(prev => ({ ...prev, skills: values }))}
                  />
                </FormControl>
                <FormDescription>
                  Select up to 8 technical skills that best describe your expertise
                </FormDescription>
                <FormError />
              </FormField>

              <FormField name="interests">
                <FormLabel>Professional Interests</FormLabel>
                <FormControl>
                  <TagInput
                    options={interestOptions}
                    placeholder="Select your interests"
                    selectedPlaceholder="Add more interests"
                    emptyMessage="No interests found"
                    allowCreate={true}
                    maxTags={5}
                    value={formData.interests || []}
                    onValueChange={values => setFormData(prev => ({ ...prev, interests: values }))}
                  />
                </FormControl>
                <FormDescription>
                  Choose areas you're passionate about or want to explore
                </FormDescription>
                <FormError />
              </FormField>
            </Fieldset>

            <Divider />

            {/* Preferences Section */}
            <Fieldset>
              <Heading level={2} className="mb-6 flex items-center gap-2">
                <Zap className="size-5" />
                Preferences & Ratings
              </Heading>

              <div className="space-y-6">
                <Field name="satisfaction">
                  <FieldLabel>Overall Satisfaction (1-10)</FieldLabel>
                  <FieldControl
                    render={({ ref, ...props }) => (
                      <Slider
                        ref={ref}
                        min={1}
                        max={10}
                        step={1}
                        showValue={true}
                        value={[formData.satisfaction || 5]}
                        onValueChange={values => setFormData(prev => ({ ...prev, satisfaction: values[0] }))}
                        {...props}
                      />
                    )}
                  />
                  <FieldDescription>
                    Rate your overall satisfaction with our platform
                  </FieldDescription>
                  <FieldError />
                </Field>

                <Field name="budget">
                  <FieldLabel>Project Budget Range ($1,000 - $100,000)</FieldLabel>
                  <FieldControl
                    render={({ ref, ...props }) => (
                      <Slider
                        ref={ref}
                        min={1000}
                        max={100000}
                        step={1000}
                        showValue={true}
                        value={[formData.budget || 25000]}
                        onValueChange={values => setFormData(prev => ({ ...prev, budget: values[0] }))}
                        {...props}
                      />
                    )}
                  />
                  <FieldDescription>
                    What's your typical project budget range?
                  </FieldDescription>
                  <FieldError />
                </Field>
              </div>
            </Fieldset>

            <Divider />

            {/* Text Areas Section */}
            <Fieldset>
              <Heading level={2} className="mb-6">
                Additional Information
              </Heading>

              <FormField name="bio">
                <FormLabel>Professional Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your professional background, achievements, and what drives you in your career..."
                    minRows={4}
                    maxRows={8}
                  />
                </FormControl>
                <FormDescription>
                  Share your professional story in 10-500 characters
                </FormDescription>
                <FormError />
              </FormField>

              <FormField name="comments">
                <FormLabel>Additional Comments (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional information you'd like to share..."
                    minRows={3}
                    maxRows={6}
                  />
                </FormControl>
                <FormDescription>
                  Optional: Any other details you think would be helpful
                </FormDescription>
                <FormError />
              </FormField>
            </Fieldset>

            <Divider />

            {/* Checkboxes and Switches Section */}
            <Fieldset>
              <Heading level={2} className="mb-6">
                Preferences & Agreements
              </Heading>

              <div className="space-y-4">
                <Field name="newsletter">
                  <div className="flex items-center space-x-3">
                    <FieldControl
                      render={({ ref, ...props }) => (
                        <Switch
                          ref={ref}
                          checked={formData.newsletter}
                          onCheckedChange={checked => setFormData(prev => ({ ...prev, newsletter: checked }))}
                          {...props}
                        />
                      )}
                    />
                    <div>
                      <FieldLabel>Newsletter Subscription</FieldLabel>
                      <FieldDescription>
                        Receive weekly updates about new features and industry insights
                      </FieldDescription>
                    </div>
                  </div>
                  <FieldError />
                </Field>

                <Field name="marketing">
                  <div className="flex items-center space-x-3">
                    <FieldControl
                      render={({ ref, ...props }) => (
                        <Checkbox
                          ref={ref}
                          checked={formData.marketing}
                          onCheckedChange={checked => setFormData(prev => ({ ...prev, marketing: checked }))}
                          {...props}
                        />
                      )}
                    />
                    <div>
                      <FieldLabel>Marketing Communications</FieldLabel>
                      <FieldDescription>
                        Allow us to send you promotional emails and special offers
                      </FieldDescription>
                    </div>
                  </div>
                  <FieldError />
                </Field>

                <FormField name="terms">
                  <div className="flex items-start space-x-3">
                    <FormControl>
                      <Checkbox
                        checked={formData.terms}
                        onCheckedChange={checked => setFormData(prev => ({ ...prev, terms: checked }))}
                      />
                    </FormControl>
                    <div>
                      <FormLabel>Terms and Conditions *</FormLabel>
                      <FormDescription>
                        I agree to the
                        {" "}
                        <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                        {" "}
                        and
                        {" "}
                        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                      </FormDescription>
                      <FormError />
                    </div>
                  </div>
                </FormField>
              </div>
            </Fieldset>

            <Divider />

            {/* Submit Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" className="sm:min-w-32">
                Submit Form
              </Button>
            </div>
          </Form>
        </Card>

        <Card className="mt-8 p-6 bg-zinc-50 dark:bg-zinc-800">
          <Heading level={3} className="mb-4">
            Components Demonstrated
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <Text className="font-semibold mb-2">Form Components:</Text>
              <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
                <li>• Form (with Zod validation)</li>
                <li>• FormField, FormLabel, FormControl</li>
                <li>• FormDescription, FormError</li>
                <li>• Field, FieldLabel, FieldControl</li>
                <li>• FieldDescription, FieldError</li>
                <li>• Fieldset</li>
              </ul>
            </div>
            <div>
              <Text className="font-semibold mb-2">Input Components:</Text>
              <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
                <li>• Input (with prefixes/icons)</li>
                <li>• NumberField (with steppers)</li>
                <li>• Textarea (auto-resizing)</li>
                <li>• Select, SelectTrigger, SelectValue</li>
                <li>• TagInput (with creation)</li>
              </ul>
            </div>
            <div>
              <Text className="font-semibold mb-2">Control Components:</Text>
              <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
                <li>• Checkbox</li>
                <li>• Switch</li>
                <li>• RadioGroup, RadioGroupItem</li>
                <li>• Slider (with value display)</li>
                <li>• Button (submit/outline)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
