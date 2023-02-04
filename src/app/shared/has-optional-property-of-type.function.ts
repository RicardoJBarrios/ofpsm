import { get } from 'lodash-es';

export function hasOptionalPropertyOfType(obj: object, path: string, type: string): boolean {
  const value = get(obj, path);
  return value == null || typeof value === type;
}
