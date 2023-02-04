import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentSource } from '@kuoki/environment';
import { map, Observable } from 'rxjs';

import { AppEnv, asAppEnv } from './app-env.model';

export const APP_ENV_PATH = 'assets/app-env.json';

@Injectable({ providedIn: 'root' })
export class AppEnvSource implements EnvironmentSource {
  readonly id = 'AppEnvSource';
  readonly isRequired = true;

  constructor(private readonly _http: HttpClient) {}

  load(): Observable<AppEnv> {
    return this._http.get<AppEnv>(APP_ENV_PATH).pipe(map((response: unknown): AppEnv => asAppEnv(response)));
  }
}
