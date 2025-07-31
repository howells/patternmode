// Fieldset Component [v1.0.0] - Tremor Style

/**
 * Fieldset Components
 *
 * Components for grouping related form fields with semantic HTML structure.
 * Built on Base UI Fieldset (https://base-ui.com/react/components/fieldset)
 * using native fieldset elements for accessibility and proper form organization.
 *
 * Features:
 * - Semantic HTML fieldset structure
 * - Accessible form field grouping
 * - Styled legend with border separator
 * - Disabled state support
 * - Flexible layout and spacing
 *
 * @example
 * ```tsx
 * // Basic fieldset
 * <Fieldset>
 *   <FieldsetLegend>Personal Information</FieldsetLegend>
 *   <Field>
 *     <FieldLabel>First Name</FieldLabel>
 *     <FieldControl placeholder="Enter your first name" />
 *   </Field>
 *   <Field>
 *     <FieldLabel>Last Name</FieldLabel>
 *     <FieldControl placeholder="Enter your last name" />
 *   </Field>
 * </Fieldset>
 *
 * // Contact information group
 * <Fieldset>
 *   <FieldsetLegend>Contact Details</FieldsetLegend>
 *   <Field>
 *     <FieldLabel>Email Address</FieldLabel>
 *     <FieldControl type="email" placeholder="your@email.com" />
 *   </Field>
 *   <Field>
 *     <FieldLabel>Phone Number</FieldLabel>
 *     <FieldControl type="tel" placeholder="(555) 123-4567" />
 *   </Field>
 *   <Field>
 *     <FieldLabel>Address</FieldLabel>
 *     <FieldControl placeholder="Street address" />
 *   </Field>
 * </Fieldset>
 *
 * // Settings form section
 * <Fieldset>
 *   <FieldsetLegend>Notification Preferences</FieldsetLegend>
 *   <Field>
 *     <FieldLabel>Email Notifications</FieldLabel>
 *     <FieldControl type="checkbox" />
 *     <FieldDescription>
 *       Receive email updates about your account
 *     </FieldDescription>
 *   </Field>
 *   <Field>
 *     <FieldLabel>SMS Notifications</FieldLabel>
 *     <FieldControl type="checkbox" />
 *     <FieldDescription>
 *       Receive text message alerts
 *     </FieldDescription>
 *   </Field>
 * </Fieldset>
 *
 * // Disabled fieldset
 * <Fieldset disabled>
 *   <FieldsetLegend>Billing Information</FieldsetLegend>
 *   <Field>
 *     <FieldLabel>Credit Card</FieldLabel>
 *     <FieldControl placeholder="**** **** **** 1234" disabled />
 *   </Field>
 *   <Field>
 *     <FieldLabel>Expiry Date</FieldLabel>
 *     <FieldControl placeholder="MM/YY" disabled />
 *   </Field>
 * </Fieldset>
 * ```
 */

import { cx } from "../../lib/utils";
import { Fieldset as BaseFieldset } from "@base-ui-components/react/fieldset";
import * as React from "react";
import { Subheading } from "../subheading/subheading";

/**
 * Root fieldset component for grouping related form fields.
 *
 * Based on Base UI Fieldset (https://base-ui.com/react/components/fieldset),
 * provides semantic HTML fieldset structure for accessible form organization.
 * Groups related form controls with proper semantic meaning.
 *
 * @param className - Additional CSS classes
 *
 *
 * @id fieldset
 * @name Fieldset
 * @component
 * @example
 * ```tsx
 * <Fieldset>
 *   <FieldsetLegend>User Information</FieldsetLegend>
 *   <Field>
 *     <FieldLabel>Name</FieldLabel>
 *     <FieldControl placeholder="Enter your name" />
 *   </Field>
 *   <Field>
 *     <FieldLabel>Email</FieldLabel>
 *     <FieldControl type="email" placeholder="your@email.com" />
 *   </Field>
 * </Fieldset>
 * ```
 */
const Fieldset = React.forwardRef<
  React.ElementRef<typeof BaseFieldset.Root>,
  React.ComponentPropsWithoutRef<typeof BaseFieldset.Root>
>(({ className, ...props }, ref) => (
  <BaseFieldset.Root
    ref={ref}
    className={cx(
      // base
      "flex flex-col gap-4 border-0 p-0",
      // spacing
      "m-0",
      className
    )}
    {...props}
  />
));
Fieldset.displayName = "Fieldset";

/**
 * Fieldset legend component for labeling field groups.
 *
 * Provides an accessible label for the fieldset group using semantic HTML.
 * Styled as a section heading with border separator and disabled state support.
 *
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * <FieldsetLegend>Account Settings</FieldsetLegend>
 * <FieldsetLegend>Payment Information</FieldsetLegend>
 * <FieldsetLegend>Shipping Address</FieldsetLegend>
 * ```
 */
const FieldsetLegend = React.forwardRef<
  React.ElementRef<typeof BaseFieldset.Legend>,
  React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend>
>(({ className, ...props }, ref) => (
  <BaseFieldset.Legend
    ref={ref}
    className={cx(
      // base
      "text-lg font-medium leading-6",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // border
      "border-b border-zinc-200 dark:border-zinc-800",
      // spacing
      "pb-3",
      // disabled
      "data-disabled:text-zinc-400 dark:data-disabled:text-zinc-600",
      className
    )}
    render={(legendProps) => <Subheading {...legendProps} />}
    {...props}
  />
));
FieldsetLegend.displayName = "FieldsetLegend";

export { Fieldset, FieldsetLegend };
