import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentSource, EnvironmentState, Path } from '@kuoki/environment';
import { get } from 'lodash-es';
import { map, Observable } from 'rxjs';

export interface FirebaseEnv extends EnvironmentState {
  useEmulators: boolean;
  apiKey: string;
  authDomain: string;
  databaseURL?: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export class FirebaseEnvTypeError extends TypeError {
  constructor() {
    super('This is not a valid Firebase Environment JSON');
    this.name = 'FirebaseEnvJsonTypeError';
  }
}

export function hasPropertyOfType(obj: object, path: string, type: string): boolean {
  return typeof get(obj, path) === type;
}

export function hasOptionalPropertyOfType(obj: object, path: string, type: string): boolean {
  const value = get(obj, path);
  return value == null || typeof value === type;
}

function isFirebaseEnv(value: unknown): value is FirebaseEnv {
  return (
    typeof value === 'object' &&
    value !== null &&
    hasOptionalPropertyOfType(value, 'useEmulators', 'boolean') &&
    hasPropertyOfType(value, 'apiKey', 'string') &&
    hasPropertyOfType(value, 'authDomain', 'string') &&
    hasOptionalPropertyOfType(value, 'databaseURL', 'string') &&
    hasPropertyOfType(value, 'projectId', 'string') &&
    hasPropertyOfType(value, 'storageBucket', 'string') &&
    hasPropertyOfType(value, 'messagingSenderId', 'string') &&
    hasPropertyOfType(value, 'appId', 'string') &&
    hasOptionalPropertyOfType(value, 'measurementId', 'string')
  );
}

function asFirebaseEnv(value: FirebaseEnv & { useEmulators?: boolean }): FirebaseEnv {
  return {
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
}

function toFirebaseEnv(response: unknown): FirebaseEnv {
  if (isFirebaseEnv(response)) {
    return asFirebaseEnv(response);
  } else {
    throw new FirebaseEnvTypeError();
  }
}

@Injectable({ providedIn: 'root' })
export class FirebaseEnvSource implements EnvironmentSource {
  readonly id = 'FirebaseEnvSource';
  readonly isRequired = true;
  readonly path: Path = 'firebase';

  constructor(protected readonly http: HttpClient) {}

  load(): Observable<FirebaseEnv> {
    return this.http
      .get<FirebaseEnv>(`assets/firebase-env.json`)
      .pipe(map((response: unknown) => toFirebaseEnv(response)));
  }
}
