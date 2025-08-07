/**
 * Component Configuration Validators
 *
 * Validation functions to ensure component configurations are complete and valid.
 */

import type { ComponentConfig } from "./component-types";

/**
 * Validation helper to ensure configuration is complete
 */
export function validateConfig(config: ComponentConfig): string[] {
  const errors: string[] = [];

  if (!config.id) {
    errors.push("Missing id");
  }
  if (!config.name) {
    errors.push("Missing name");
  }
  if (!config.description) {
    errors.push("Missing description");
  }
  if (!config.category) {
    errors.push("Missing category");
  }
  if (!config.importStatement) {
    errors.push("Missing importStatement");
  }
  if (!config.examples || config.examples.length === 0) {
    errors.push("Missing examples");
  }

  return errors;
}
