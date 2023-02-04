import { EnvironmentState } from '@kuoki/environment';
import { isNil, omitBy } from 'lodash-es';

import { hasPropertyOfType } from '../shared';

export interface AppEnv extends EnvironmentState {
  name: string;
  production: boolean;
}

export class AppEnvTypeError extends TypeError {
  constructor() {
    super('This is not a valid App Environment JSON');
    this.name = 'AppEnvTypeError';
  }
}

function isAppEnv(value: unknown): value is AppEnv {
  return (
    typeof value === 'object' &&
    value !== null &&
    hasPropertyOfType(value, 'name', 'string') &&
    hasPropertyOfType(value, 'production', 'boolean')
  );
}

export function asAppEnv(value: unknown): AppEnv {
  if (!isAppEnv(value)) {
    throw new AppEnvTypeError();
  }

  const obj: AppEnv = {
    name: value.name,
    production: value.production
  };

  return omitBy(obj, isNil) as AppEnv;
}
