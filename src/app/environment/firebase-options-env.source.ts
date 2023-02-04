import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentSource, Path } from '@kuoki/environment';
import { map, Observable } from 'rxjs';

import { asFirebaseOptionsEnv, FirebaseOptionsEnv } from './firebase-options-env.model';

export const FIREBASE_OPTIONS_ENV_PATH = 'assets/firebase-options-env.json';

@Injectable({ providedIn: 'root' })
export class FirebaseOptionsEnvSource implements EnvironmentSource {
  readonly id = 'FirebaseOptionsEnvSource';
  readonly isRequired = true;
  readonly path: Path = 'firebase';

  constructor(private readonly _http: HttpClient) {}

  load(): Observable<FirebaseOptionsEnv> {
    return this._http
      .get<FirebaseOptionsEnv>(FIREBASE_OPTIONS_ENV_PATH)
      .pipe(map((response: unknown): FirebaseOptionsEnv => asFirebaseOptionsEnv(response)));
  }
}
