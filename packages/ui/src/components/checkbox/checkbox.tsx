// Tremor Checkbox [v1.0.0] - Base UI

import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import React from "react";

import { cx, focusRing } from "../../lib/utils";

/**
 * Props for the Checkbox component.
 *
 * @interface CheckboxProps
 * @augments React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>
 * @example
 * ```tsx
 * <Checkbox checked={isAccepted} onCheckedChange={setIsAccepted} />
 * ```
 */
type CheckboxProps = {
  /**
   * Checked state of the checkbox.
   *
   * - `true`: Checkbox is checked
   * - `false`: Checkbox is unchecked
   * - `"indeterminate"`: Checkbox shows indeterminate state (partial selection).
   */
  checked?: boolean | "indeterminate";
} & Omit<React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>, "checked">;

/**
 * A versatile checkbox input component with full accessibility support and indeterminate state capabilities.
 *
 * Built on Base UI's Checkbox primitive, this component provides comprehensive checkbox functionality
 * with support for checked, unchecked, and indeterminate states. Features smooth animations, 
 * accessible keyboard navigation, and form integration. The indeterminate state is particularly
 * useful for "select all" scenarios and hierarchical selection interfaces.
 *
 * @inheritdoc
 *
 * **Key Features:**
 * - **Three-State Support**: Checked, unchecked, and indeterminate states for complex selection scenarios
 * - **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
 * - **Form Integration**: Native form support with name, value, and validation attributes
 * - **Visual Feedback**: Clear hover, focus, disabled, and selection state indicators
 * - **Smooth Animations**: Fluid transitions between states with visual polish
 * - **Touch Optimized**: Proper touch targets and mobile interaction support
 * - **Keyboard Navigation**: Space bar activation and focus management
 *
 * **Advanced Capabilities:**
 * - **Indeterminate State**: Perfect for parent checkboxes in hierarchical lists
 * - **Form Validation**: Integration with form libraries and validation states  
 * - **Custom Styling**: Flexible appearance customization while maintaining accessibility
 * - **Event Handling**: Comprehensive change event support for controlled and uncontrolled usage
 * - **State Management**: Compatible with various state management solutions
 *
 * **Common Use Cases:**
 * - Terms and conditions acceptance in forms
 * - Multi-select interfaces with individual item selection
 * - "Select all" functionality with indeterminate parent states
 * - Settings toggles and preference selections
 * - Table row selection and bulk actions
 * - Filter options in search and discovery interfaces
 * - Feature enablement in configuration panels
 * - Consent management and privacy controls
 *
 * **Accessibility:**
 * - Full ARIA checkbox implementation with proper roles and states
 * - Keyboard activation with Space bar and Enter key support
 * - Screen reader announcements for state changes and labels
 * - Focus management with visible focus indicators
 * - High contrast support and customizable focus styles
 * - Support for assistive input methods and switch controls
 *
 * @category inputs
 * @icon CheckSquare
 * @example
 * ```tsx
 * // Basic uncontrolled checkbox
 * <Checkbox defaultChecked />
 *
 * // Controlled checkbox with change handler
 * <Checkbox 
 *   checked={isAccepted} 
 *   onCheckedChange={setIsAccepted}
 * />
 *
 * // Indeterminate state for "select all" scenarios
 * <Checkbox 
 *   checked={selectedCount === 0 ? false : selectedCount === totalCount ? true : "indeterminate"}
 *   onCheckedChange={(checked) => {
 *     if (checked === true) selectAll();
 *     else if (checked === false) deselectAll();
 *   }}
 * />
 *
 * // Form integration with validation
 * <div className="space-y-2">
 *   <label className="flex items-center gap-2">
 *     <Checkbox 
 *       name="terms"
 *       checked={formData.termsAccepted}
 *       onCheckedChange={(checked) => 
 *         setFormData(prev => ({ ...prev, termsAccepted: !!checked }))
 *       }
 *     />
 *     <span className="text-sm">I accept the terms and conditions</span>
 *   </label>
 *   {errors.terms && (
 *     <p className="text-sm text-red-600">{errors.terms}</p>
 *   )}
 * </div>
 *
 * // Multi-select list with parent/child relationship
 * <div className="space-y-2">
 *   <label className="flex items-center gap-2 font-medium">
 *     <Checkbox 
 *       checked={getParentState(selectedItems, allItems)}
 *       onCheckedChange={handleSelectAll}
 *     />
 *     <span>Select All Items</span>
 *   </label>
 *   <div className="ml-6 space-y-1">
 *     {items.map(item => (
 *       <label key={item.id} className="flex items-center gap-2">
 *         <Checkbox 
 *           checked={selectedItems.includes(item.id)}
 *           onCheckedChange={(checked) => 
 *             toggleItemSelection(item.id, !!checked)
 *           }
 *         />
 *         <span className="text-sm">{item.name}</span>
 *       </label>
 *     ))}
 *   </div>
 * </div>
 *
 * // Settings panel with feature toggles
 * <div className="space-y-4">
 *   <h3 className="font-semibold">Notification Settings</h3>
 *   <div className="space-y-3">
 *     <label className="flex items-center gap-3">
 *       <Checkbox 
 *         checked={settings.emailNotifications}
 *         onCheckedChange={(checked) => 
 *           updateSetting('emailNotifications', !!checked)
 *         }
 *       />
 *       <div>
 *         <div className="font-medium">Email Notifications</div>
 *         <div className="text-sm text-zinc-600">
 *           Receive updates via email
 *         </div>
 *       </div>
 *     </label>
 *     
 *     <label className="flex items-center gap-3">
 *       <Checkbox 
 *         checked={settings.pushNotifications}
 *         onCheckedChange={(checked) => 
 *           updateSetting('pushNotifications', !!checked)
 *         }
 *         disabled={!settings.emailNotifications}
 *       />
 *       <div className={settings.emailNotifications ? '' : 'opacity-50'}>
 *         <div className="font-medium">Push Notifications</div>
 *         <div className="text-sm text-zinc-600">
 *           Instant notifications on your device
 *         </div>
 *       </div>
 *     </label>
 *   </div>
 * </div>
 *
 * // Table row selection
 * <table className="w-full">
 *   <thead>
 *     <tr>
 *       <th className="w-12">
 *         <Checkbox 
 *           checked={getRowSelectionState(selectedRows, allRows)}
 *           onCheckedChange={handleSelectAllRows}
 *         />
 *       </th>
 *       <th>Name</th>
 *       <th>Email</th>
 *       <th>Role</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     {users.map(user => (
 *       <tr key={user.id}>
 *         <td>
 *           <Checkbox 
 *             checked={selectedRows.includes(user.id)}
 *             onCheckedChange={(checked) => 
 *               toggleRowSelection(user.id, !!checked)
 *             }
 *           />
 *         </td>
 *         <td>{user.name}</td>
 *         <td>{user.email}</td>
 *         <td>{user.role}</td>
 *       </tr>
 *     ))}
 *   </tbody>
 * </table>
 *
 * // Disabled states for read-only display
 * <div className="space-y-2">
 *   <label className="flex items-center gap-2">
 *     <Checkbox checked disabled />
 *     <span className="text-sm">Feature enabled (read-only)</span>
 *   </label>
 *   <label className="flex items-center gap-2">
 *     <Checkbox checked={false} disabled />
 *     <span className="text-sm">Feature disabled (read-only)</span>
 *   </label>
 * </div>
 * ```
 */
/**
 * Checkbox input component for boolean selections with indeterminate state support.
 *
 * @id checkbox
 * @name Checkbox
 * @icon CheckSquare
 * @category inputs
 * @component
 * @param props - Component properties.
 * @param props.checked - Checked state of the checkbox (true, false, or "indeterminate").
 * @param props.defaultChecked - Default checked state when uncontrolled.
 * @param props.onCheckedChange - Callback fired when the checked state changes.
 * @param props.name - Name attribute for form integration.
 * @param props.value - Value attribute for form integration.
 * @param props.disabled - Whether the checkbox is disabled.
 * @param props.required - Whether the checkbox is required in forms.
 * @param props.readOnly - Whether the checkbox is read-only.
 * @param props.className - Additional CSS classes.
 */
const Checkbox = ({ ref: forwardedRef, className, checked, ...props }: CheckboxProps & { ref?: React.RefObject<React.ElementRef<typeof BaseCheckbox.Root> | null> }) => {
  // Convert indeterminate to Base UI's format
  const baseUIProps = {
    ...props,
    checked: checked === "indeterminate" ? false : checked,
    indeterminate: checked === "indeterminate",
  };

  return (
    <BaseCheckbox.Root
      ref={forwardedRef}
      {...baseUIProps}
      className={cx(
        // base
        "relative inline-flex size-4 shrink-0 appearance-none items-center justify-center rounded-sm shadow-xs outline-hidden ring-1 ring-inset transition duration-100 enabled:cursor-pointer",
        // text color
        "text-white dark:text-zinc-50",
        // background color
        "bg-white dark:bg-zinc-950",
        // ring color
        "ring-zinc-300 dark:ring-zinc-800",
        // disabled
        "data-disabled:bg-zinc-100 data-disabled:text-zinc-400 data-disabled:ring-zinc-300",
        "dark:data-disabled:bg-zinc-800 dark:data-disabled:text-zinc-500 dark:data-disabled:ring-zinc-700",
        // checked and enabled - Base UI uses data-checked instead of data-[state=checked]
        "enabled:data-checked:bg-blue-500 enabled:data-checked:ring-0 enabled:data-checked:ring-transparent",
        // indeterminate - Base UI has data-indeterminate attribute
        "enabled:data-[indeterminate]:bg-blue-500 enabled:data-[indeterminate]:ring-0 enabled:data-[indeterminate]:ring-transparent",
        // focus
        focusRing,
        className,
      )}
    >
      <BaseCheckbox.Indicator className="flex size-full items-center justify-center">
        {checked === "indeterminate"
          ? (
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  x1="4"
                  x2="12"
                  y1="8"
                  y2="8"
                >
                </line>
              </svg>
            )
          : (
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2 5.59998L6.79999 9.99998L4.79999 7.99998"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                </path>
              </svg>
            )}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
};

Checkbox.displayName = "Checkbox";

export { Checkbox, type CheckboxProps };
