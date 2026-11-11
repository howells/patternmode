import { parse as parseCss } from "postcss";
import { z } from "zod";

const recordSchema = z.record(z.string(), z.unknown());

/**
 * @param {unknown} value Candidate value.
 * @returns {value is Record<string, unknown>} Whether the value is a non-null object.
 */
const isPlainRecord = (value) => recordSchema.safeParse(value).success;

/**
 * Convert plain CSS text into the shadcn registry-item `css` object form.
 * Rules become { selector: { prop: value } }; at-rules become
 * { "@layer components": { ...nested } }. Throws on duplicate keys rather
 * than silently merging order-dependent CSS.
 * @param {string} cssText Raw CSS source.
 * @param {string} sourceLabel Human-readable origin for error messages.
 * @returns {Record<string, unknown>} The registry-item `css` object.
 */
export const cssToRegistryObject = (cssText, sourceLabel) => {
  const root = parseCss(cssText, { from: sourceLabel });
  /**
   * @param {import("postcss").Container} container A postcss container node.
   * @returns {Record<string, unknown>} Nested object for the container.
   */
  const walk = (container) => {
    /** @type {Record<string, unknown>} */
    const out = {};
    /**
     * @param {string} key Object key.
     * @param {unknown} value Object value.
     * @returns {void}
     */
    const setKey = (key, value) => {
      if (key in out) {
        const existing = out[key];
        if (isPlainRecord(existing) && isPlainRecord(value)) {
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            if (nestedKey in existing) {
              throw new Error(
                `duplicate declaration "${nestedKey}" under "${key}" in ${sourceLabel}`,
              );
            }
            existing[nestedKey] = nestedValue;
          }
          return;
        }
        throw new Error(`duplicate key "${key}" in ${sourceLabel}`);
      }
      out[key] = value;
    };
    for (const node of container.nodes ?? []) {
      if (node.type === "rule") {
        setKey(node.selector, walk(node));
      } else if (node.type === "atrule") {
        setKey(node.params ? `@${node.name} ${node.params}` : `@${node.name}`, walk(node));
      } else if (node.type === "decl") {
        const value = node.value.replaceAll(/\s+/gu, " ").trim();
        setKey(node.prop, value + (node.important ? " !important" : ""));
      }
    }
    return out;
  };
  return walk(root);
};
