import { get } from 'lodash-es';

/**
 * Check if the property at path has the indicated type.
 *
 * @param obj The object to query.
 * @param path The path of the property to get.
 * @param type A string indicating the expected type of the value at path.
 * @returns True if the property at path has the indicated type.
 */
export function hasPropertyOfType(obj: object, path: string, type: string): boolean {
  return typeof get(obj, path) === type;
}
