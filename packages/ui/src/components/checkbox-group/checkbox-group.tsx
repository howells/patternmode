// Checkbox Group Component [v1.0.0]

import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import * as React from "react";

import { cx } from "../../lib/utils";
import { Checkbox } from "../checkbox/checkbox";

/**
 * Props for the CheckboxGroup component.
 *
 * @interface CheckboxGroupProps
 * @augments React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup>
 * @example
 * ```tsx
 * <CheckboxGroup value={selectedOptions} onValueChange={setSelectedOptions}>
 *   <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
 *   <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
 * </CheckboxGroup>
 * ```
 */
type CheckboxGroupProps = {
  /**
   * Optional label text displayed above the checkbox group.
   * Provides context and improves accessibility for screen readers.
   */
  label?: string;
  /**
   * ID for the label element to establish proper ARIA relationships.
   * Used for aria-labelledby attribute on the group container.
   */
  labelId?: string;
  /**
   * Additional CSS classes to apply to the group container.
   */
  className?: string;
  /**
   * Child checkbox elements, typically CheckboxGroupItem components.
   * Each child should have a unique value prop for proper state management.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup>;

/**
 * A powerful checkbox group component for managing multiple checkbox selections with comprehensive state management and accessibility.
 *
 * Built on Base UI's CheckboxGroup primitive, this component provides centralized state management for multiple 
 * checkbox selections with full accessibility support. Ideal for multi-select scenarios like preference settings, 
 * feature selections, filter options, and permission management. Supports both controlled and uncontrolled modes
 * with flexible styling and validation integration.
 *
 * @inheritdoc
 *
 * **Key Features:**
 * - **Multi-Select Management**: Centralized state for multiple checkbox selections with array-based values
 * - **Accessibility Excellence**: Full ARIA support, proper semantic grouping, and keyboard navigation
 * - **Controlled & Uncontrolled**: Support for both controlled state management and default value patterns
 * - **Flexible Labeling**: Optional group labels with proper ARIA relationships
 * - **Individual Control**: Per-item disabled states while maintaining group coherence
 * - **Form Integration**: Native form support with name attributes and validation compatibility
 * - **Visual Consistency**: Coordinated styling across all group items
 *
 * **Advanced Capabilities:**
 * - **Dynamic Items**: Add/remove checkbox items programmatically with maintained state
 * - **Validation Support**: Integration with form libraries and validation frameworks
 * - **Custom Layouts**: Flexible arrangement of checkboxes (vertical, horizontal, grid)
 * - **State Persistence**: Compatible with state management solutions and local storage
 * - **Event Handling**: Comprehensive change events with current and previous selections
 * - **Performance Optimized**: Efficient re-renders and state updates for large lists
 *
 * **Common Use Cases:**
 * - User preference panels and settings management
 * - Multi-select filters in search and discovery interfaces
 * - Permission and role management systems
 * - Feature toggle groups in configuration panels
 * - Newsletter and notification subscription management
 * - Product category and tag selection
 * - Task and project assignment interfaces
 * - Survey and questionnaire multi-response questions
 *
 * **Accessibility:**
 * - ARIA checkbox group implementation with proper roles and relationships
 * - Keyboard navigation between items with Tab and arrow key support
 * - Screen reader announcements for group context and individual selections
 * - Focus management with visible focus indicators throughout the group
 * - Proper labeling hierarchy and semantic structure
 * - Support for assistive technologies and alternative input methods
 *
 * @category inputs
 * @icon CheckSquare
 * @example
 * ```tsx
 * // Basic checkbox group with label
 * <CheckboxGroup label="Select your interests">
 *   <CheckboxGroupItem value="tech">Technology</CheckboxGroupItem>
 *   <CheckboxGroupItem value="design">Design</CheckboxGroupItem>
 *   <CheckboxGroupItem value="business">Business</CheckboxGroupItem>
 *   <CheckboxGroupItem value="marketing">Marketing</CheckboxGroupItem>
 * </CheckboxGroup>
 *
 * // Controlled checkbox group with state management
 * <CheckboxGroup
 *   label="Notification Preferences"
 *   value={selectedNotifications}
 *   onValueChange={setSelectedNotifications}
 * >
 *   <CheckboxGroupItem value="email">Email notifications</CheckboxGroupItem>
 *   <CheckboxGroupItem value="push">Push notifications</CheckboxGroupItem>
 *   <CheckboxGroupItem value="sms">SMS notifications</CheckboxGroupItem>
 *   <CheckboxGroupItem value="weekly">Weekly digest</CheckboxGroupItem>
 * </CheckboxGroup>
 *
 * // With default selections and individual disabled items
 * <CheckboxGroup
 *   label="Feature Access"
 *   defaultValue={['basic', 'analytics']}
 * >
 *   <CheckboxGroupItem value="basic">Basic Features</CheckboxGroupItem>
 *   <CheckboxGroupItem value="analytics">Analytics Dashboard</CheckboxGroupItem>
 *   <CheckboxGroupItem value="advanced">Advanced Tools</CheckboxGroupItem>
 *   <CheckboxGroupItem value="enterprise" disabled>
 *     Enterprise Features (Upgrade Required)
 *   </CheckboxGroupItem>
 * </CheckboxGroup>
 *
 * // Form integration with validation
 * <form onSubmit={handleSubmit}>
 *   <div className="space-y-4">
 *     <CheckboxGroup
 *       label="Required Skills"
 *       value={formData.skills}
 *       onValueChange={(skills) => 
 *         setFormData(prev => ({ ...prev, skills }))
 *       }
 *     >
 *       <CheckboxGroupItem value="javascript">JavaScript</CheckboxGroupItem>
 *       <CheckboxGroupItem value="react">React</CheckboxGroupItem>
 *       <CheckboxGroupItem value="typescript">TypeScript</CheckboxGroupItem>
 *       <CheckboxGroupItem value="nodejs">Node.js</CheckboxGroupItem>
 *     </CheckboxGroup>
 *     {errors.skills && (
 *       <p className="text-sm text-red-600">{errors.skills}</p>
 *     )}
 *   </div>
 *   <button type="submit">Submit Application</button>
 * </form>
 *
 * // Complex multi-category selection
 * <div className="space-y-6">
 *   <CheckboxGroup label="Content Categories">
 *     <CheckboxGroupItem value="articles">
 *       <div className="flex items-center justify-between w-full">
 *         <div>
 *           <div className="font-medium">Articles</div>
 *           <div className="text-sm text-zinc-500">
 *             In-depth technical articles
 *           </div>
 *         </div>
 *         <span className="text-sm text-zinc-400">Weekly</span>
 *       </div>
 *     </CheckboxGroupItem>
 *     
 *     <CheckboxGroupItem value="tutorials">
 *       <div className="flex items-center justify-between w-full">
 *         <div>
 *           <div className="font-medium">Tutorials</div>
 *           <div className="text-sm text-zinc-500">
 *             Step-by-step learning guides
 *           </div>
 *         </div>
 *         <span className="text-sm text-zinc-400">Bi-weekly</span>
 *       </div>
 *     </CheckboxGroupItem>
 *     
 *     <CheckboxGroupItem value="news">
 *       <div className="flex items-center justify-between w-full">
 *         <div>
 *           <div className="font-medium">Industry News</div>
 *           <div className="text-sm text-zinc-500">
 *             Latest tech industry updates
 *           </div>
 *         </div>
 *         <span className="text-sm text-zinc-400">Daily</span>
 *       </div>
 *     </CheckboxGroupItem>
 *   </CheckboxGroup>
 * </div>
 *
 * // Horizontal layout with custom styling
 * <CheckboxGroup 
 *   label="Quick Filters"
 *   className="flex-row flex-wrap gap-x-6"
 *   value={activeFilters}
 *   onValueChange={setActiveFilters}
 * >
 *   <CheckboxGroupItem value="featured">Featured</CheckboxGroupItem>
 *   <CheckboxGroupItem value="sale">On Sale</CheckboxGroupItem>
 *   <CheckboxGroupItem value="new">New Arrivals</CheckboxGroupItem>
 *   <CheckboxGroupItem value="bestseller">Best Sellers</CheckboxGroupItem>
 * </CheckboxGroup>
 *
 * // Permission management system
 * <div className="space-y-4">
 *   <h3 className="text-lg font-semibold">User Permissions</h3>
 *   <CheckboxGroup
 *     label="Content Management"
 *     value={userPermissions.content}
 *     onValueChange={(permissions) => 
 *       updateUserPermissions('content', permissions)
 *     }
 *   >
 *     <CheckboxGroupItem value="read">View Content</CheckboxGroupItem>
 *     <CheckboxGroupItem value="create">Create Content</CheckboxGroupItem>
 *     <CheckboxGroupItem value="edit">Edit Content</CheckboxGroupItem>
 *     <CheckboxGroupItem value="delete">Delete Content</CheckboxGroupItem>
 *     <CheckboxGroupItem value="publish">Publish Content</CheckboxGroupItem>
 *   </CheckboxGroup>
 * </div>
 *
 * // Disabled group state
 * <CheckboxGroup 
 *   label="Unavailable Features" 
 *   disabled
 *   defaultValue={['feature1']}
 * >
 *   <CheckboxGroupItem value="feature1">Feature 1 (Locked)</CheckboxGroupItem>
 *   <CheckboxGroupItem value="feature2">Feature 2 (Locked)</CheckboxGroupItem>
 *   <CheckboxGroupItem value="feature3">Feature 3 (Locked)</CheckboxGroupItem>
 * </CheckboxGroup>
 *
 * // Dynamic checkbox generation
 * <CheckboxGroup
 *   label="Available Integrations"
 *   value={selectedIntegrations}
 *   onValueChange={setSelectedIntegrations}
 * >
 *   {availableIntegrations.map(integration => (
 *     <CheckboxGroupItem 
 *       key={integration.id} 
 *       value={integration.id}
 *       disabled={!integration.available}
 *     >
 *       <div className="flex items-center gap-3">
 *         <img 
 *           src={integration.icon} 
 *           alt={integration.name}
 *           className="w-5 h-5"
 *         />
 *         <div>
 *           <div className="font-medium">{integration.name}</div>
 *           <div className="text-sm text-zinc-500">
 *             {integration.description}
 *           </div>
 *         </div>
 *       </div>
 *     </CheckboxGroupItem>
 *   ))}
 * </CheckboxGroup>
 * ```
 */
/**
 * Group component for managing multiple related checkbox selections.
 *
 * @id checkbox-group
 * @name CheckboxGroup
 * @icon CheckSquare
 * @category inputs
 * @component
 * @param props - Component properties.
 * @param props.label - Optional label text displayed above the checkbox group.
 * @param props.labelId - ID for the label element to establish proper ARIA relationships.
 * @param props.className - Additional CSS classes to apply to the group container.
 * @param props.children - Child checkbox elements, typically CheckboxGroupItem components.
 * @param props.value - Array of selected values when controlled.
 * @param props.defaultValue - Array of initially selected values when uncontrolled.
 * @param props.onValueChange - Callback fired when selection changes.
 * @param props.disabled - Whether all checkboxes in the group are disabled.
 * @param props.name - Name attribute for form integration.
 */
const CheckboxGroup = ({ ref, className, label, labelId, children, ...props }: CheckboxGroupProps & { ref?: React.RefObject<React.ElementRef<typeof BaseCheckboxGroup> | null> }) => (
  <BaseCheckboxGroup
    ref={ref}
    aria-labelledby={labelId}
    className={cx(
      "flex flex-col items-start gap-2 text-zinc-900 dark:text-zinc-50",
      className,
    )}
    {...props}
  >
    {label && (
      <div
        className="font-medium text-sm text-zinc-900 dark:text-zinc-50"
        id={labelId}
      >
        {label}
      </div>
    )}
    {children}
  </BaseCheckboxGroup>
);
CheckboxGroup.displayName = "CheckboxGroup";

/**
 * Props for the CheckboxGroupItem component.
 *
 * @interface CheckboxGroupItemProps
 * @example
 * ```tsx
 * <CheckboxGroupItem value="option1" disabled={isDisabled}>
 *   Option Label
 * </CheckboxGroupItem>
 * ```
 */
type CheckboxGroupItemProps = {
  /**
   * Unique value identifier for this checkbox item within the group.
   * Used by the parent CheckboxGroup to track selection state.
   */
  value: string;
  /**
   * Optional name attribute for the underlying checkbox input.
   * Useful for form submission and accessibility when needed.
   */
  name?: string;
  /**
   * Label content displayed next to the checkbox.
   * Can be simple text or complex React elements for rich layouts.
   */
  children: React.ReactNode;
  /**
   * Whether this specific checkbox item is disabled.
   * When disabled, the item becomes unclickable and visually dimmed.
   */
  disabled?: boolean;
  /**
   * Additional CSS classes to apply to the label container.
   * Allows for custom styling while maintaining accessibility.
   */
  className?: string;
};

/**
 * Individual checkbox item component designed for use within CheckboxGroup containers.
 *
 * This component creates a complete checkbox input with integrated label that automatically
 * participates in the parent CheckboxGroup's state management. Each item represents a single
 * selectable option with its own value, styling, and disabled state. The component maintains
 * proper accessibility relationships and provides consistent visual feedback across all states.
 *
 * **Key Features:**
 * - **Automatic Integration**: Seamlessly connects with parent CheckboxGroup state
 * - **Flexible Content**: Supports both simple text and complex React element labels
 * - **Individual Control**: Per-item disabled states independent of group settings
 * - **Accessibility Built-in**: Proper ARIA relationships and keyboard navigation
 * - **Visual Feedback**: Clear hover, focus, and selection state indicators
 * - **Form Compatible**: Native form integration with name and value attributes.
 *
 * **Design Patterns:**
 * - **Simple Labels**: Plain text labels for straightforward options
 * - **Rich Content**: Complex layouts with descriptions, icons, and additional metadata
 * - **Status Indicators**: Visual cues for item states (new, featured, recommended)
 * - **Grouped Information**: Hierarchical content with primary and secondary text.
 *
 * @example
 * ```tsx
 * // Simple text label
 * <CheckboxGroupItem value="newsletters">
 *   Subscribe to newsletters
 * </CheckboxGroupItem>
 *
 * // Rich content with description
 * <CheckboxGroupItem value="premium">
 *   <div className="flex flex-col">
 *     <span className="font-medium">Premium Features</span>
 *     <span className="text-sm text-zinc-500">
 *       Advanced tools and priority support
 *     </span>
 *   </div>
 * </CheckboxGroupItem>
 *
 * // With status indicator and pricing
 * <CheckboxGroupItem value="enterprise">
 *   <div className="flex items-center justify-between w-full">
 *     <div>
 *       <span className="font-medium">Enterprise Plan</span>
 *       <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
 *         Popular
 *       </span>
 *     </div>
 *     <span className="font-bold">$99/mo</span>
 *   </div>
 * </CheckboxGroupItem>
 *
 * // Disabled item with explanation
 * <CheckboxGroupItem value="beta" disabled>
 *   <div className="flex items-center gap-2">
 *     <span>Beta Features</span>
 *     <span className="text-xs text-zinc-400">(Coming Soon)</span>
 *   </div>
 * </CheckboxGroupItem>
 *
 * // With icon and metadata
 * <CheckboxGroupItem value="integration">
 *   <div className="flex items-center gap-3">
 *     <img src="/api-icon.svg" alt="API" className="w-5 h-5" />
 *     <div>
 *       <div className="font-medium">API Integration</div>
 *       <div className="text-sm text-zinc-500">
 *         Connect with external services
 *       </div>
 *     </div>
 *   </div>
 * </CheckboxGroupItem>
 * ```
 */
const CheckboxGroupItem = ({ ref, value, name, children, disabled, className, ...props }: CheckboxGroupItemProps & { ref?: React.RefObject<HTMLLabelElement | null> }) => (
  <label
    ref={ref}
    className={cx(
      "flex items-center gap-2 cursor-pointer",
      disabled && "cursor-not-allowed opacity-50",
      className,
    )}
    {...props}
  >
    <Checkbox
      name={name}
      value={value}
      disabled={disabled}
      className="size-4"
    />
    <span className="text-sm font-medium select-none">{children}</span>
  </label>
);
CheckboxGroupItem.displayName = "CheckboxGroupItem";

export {
  CheckboxGroup,
  CheckboxGroupItem,
  type CheckboxGroupItemProps,
  type CheckboxGroupProps,
};
