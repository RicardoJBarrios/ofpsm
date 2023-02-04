import { FirebaseOptions } from '@angular/fire/app';
import { EnvironmentState } from '@kuoki/environment';
import { isNil, omitBy } from 'lodash-es';

import { hasOptionalPropertyOfType, hasPropertyOfType } from '../shared';

export interface FirebaseOptionsEnv extends FirebaseOptions, EnvironmentState {
  useEmulators: boolean;
  apiKey: NonNullable<FirebaseOptions['apiKey']>;
  projectId: NonNullable<FirebaseOptions['projectId']>;
  appId: NonNullable<FirebaseOptions['appId']>;
}

export class FirebaseOptionsEnvTypeError extends TypeError {
  constructor() {
    super('This is not a valid Firebase Options Environment JSON');
    this.name = 'FirebaseOptionsEnvTypeError';
  }
}

function isFirebaseOptionsEnv(value: unknown): value is FirebaseOptionsEnv {
  return (
    typeof value === 'object' &&
    value !== null &&
    hasPropertyOfType(value, 'apiKey', 'string') &&
    hasPropertyOfType(value, 'projectId', 'string') &&
    hasPropertyOfType(value, 'appId', 'string') &&
    hasOptionalPropertyOfType(value, 'useEmulators', 'boolean') &&
    hasOptionalPropertyOfType(value, 'authDomain', 'string') &&
    hasOptionalPropertyOfType(value, 'databaseURL', 'string') &&
    hasOptionalPropertyOfType(value, 'storageBucket', 'string') &&
    hasOptionalPropertyOfType(value, 'messagingSenderId', 'string') &&
    hasOptionalPropertyOfType(value, 'measurementId', 'string') &&
    hasOptionalPropertyOfType(value, 'locationId', 'string')
  );
}

export function asFirebaseOptionsEnv(value: unknown): FirebaseOptionsEnv {
  if (!isFirebaseOptionsEnv(value)) {
    throw new FirebaseOptionsEnvTypeError();
  }

  const obj: FirebaseOptionsEnv = {
    useEmulators: value.useEmulators || false,
    apiKey: value.apiKey,
    authDomain: value.authDomain,
    databaseURL: value.databaseURL,
    projectId: value.projectId,
    storageBucket: value.storageBucket,
    messagingSenderId: value.messagingSenderId,
    appId: value.appId,
    measurementId: value.measurementId
  };

  return omitBy(obj, isNil) as FirebaseOptionsEnv;
}
