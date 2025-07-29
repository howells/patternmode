// Re-export DateRangePicker from date-picker

/**
 * Date Range Picker Components
 * 
 * Re-exports DateRangePicker and related types from the date-picker module
 * for convenient access. The DateRangePicker provides functionality for
 * selecting date ranges with preset options and custom range selection.
 * 
 * @see ../date-picker/date-picker - Main implementation
 * 
 * @example
 * ```tsx
 * // Import from date-range-picker for convenience
 * import { DateRangePicker } from '../date-range-picker';
 * 
 * // Use the component (same API as date-picker)
 * <DateRangePicker 
 *   value={dateRange}
 *   onChange={setDateRange}
 *   presets={customPresets}
 * />
 * ```
 */
export { 
  /** Date range picker component for selecting date ranges */
  DateRangePicker, 
  /** Type for date range objects with start and end dates */
  type DateRange, 
  /** Type for date range preset configurations */
  type DateRangePreset 
} from "../date-picker/date-picker";