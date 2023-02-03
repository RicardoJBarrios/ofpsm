import { get } from 'lodash-es';

export function hasPropertyOfType(obj: object, path: string, type: string): boolean {
  return typeof get(obj, path) === type;
}
