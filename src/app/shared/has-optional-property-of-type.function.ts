import { get } from 'lodash-es';

/**
 * Check if the property at path has the indicated type or is nil.
 *
 * @param obj The object to query.
 * @param path The path of the property to get.
 * @param type A string indicating the type of the value at path.
 * @returns True if the property at path has the indicated type or is nil.
 */
export function hasOptionalPropertyOfType(obj: object, path: string, type: string): boolean {
  const value = get(obj, path);
  return value == null || typeof value === type;
}
